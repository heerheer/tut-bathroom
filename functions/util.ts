import axios, {AxiosInstance} from 'axios'
import md5 from 'md5'
import {NewOrderStatus, Order} from "./types";


export class Util {
    ax: { headers: any } & any = {
        baseURL: 'http://ligong.deshineng.com:8082/brmclg/api',
        headers: {
            'Content-Type': 'application/json',
        },
        get: async function (path: string, params: any) {
            let url = this.baseURL + ((!this.baseURL.endsWith('/') && !path.startsWith('/')) ? '/' : '') + path;

            let _url = new URL(url);
            if(params){
                for (let key in params) {
                    _url.searchParams.append(key, params[key])
                }
            }
            let resp = await fetch(_url, {method: 'get', headers: this.headers})
            let data = JSON.parse(await resp.text())
            return {data, code: resp.status}
        },
        post: async function (path: string, body: any) {
            let url = this.baseURL + ((!this.baseURL.endsWith('/') && !path.startsWith('/')) ? '/' : '') + path;
            let resp = await fetch(url, {
                body: JSON.stringify(body),
                method: 'post',
                headers: this.headers
            })
            let data = JSON.parse(await resp.text())
            return {data, code: resp.status}
        }
    };

    setAuth(token: string, loginid: string) {
        this.ax.headers = {
            'Content-Type': 'application/json',
            'token': token,
            'loginid': loginid
        }
    }

    auth!: string;

    //创建一个Order助手
    static async login(user: string, pwd: string) {
        let util = new Util();
        util.ax.baseURL = 'http://ligong.deshineng.com:8082/brmclg/api';
        let {data, code} = (await util.ax.post(`/logon/login?time=${Date.now()}`, {
            code: user,
            password: md5(pwd)
        }));

        if (code === 200) {
            util.auth = data.data.token;
            util.ax.headers["token"] = util.auth;
            util.ax.headers['loginid'] = data.data.loginid;
            return util;
        } else {
            return undefined
        }

    }

    //预定指定id
    async order(id: number) {
        let resp = await this.ax?.post(`/bathRoom/bookOrder?time=${Date.now()}&bookstatusid=${id}`);
        if (resp?.data.code === 200) {
            if (resp?.data.data.succeed == 'Y') {
                let info = resp?.data.data.bookOrderList[0]

                return {
                    result: true,
                    name: info.bathRoomName,
                    start: new Date(info.periodStartTime),
                    end: new Date(info.periodEndTime)
                };
            } else {
                return {
                    result: false,
                };
            }
        } else {
            return {
                result: false,
            };
        }
    }

    /**
     * 获取用户自身预约的列表
     */
    async getOrderList(): Promise<Order[]> {
        let resp = await this.ax.get(`/bathRoom/getBookOrderList?time=${Date.now()}`, {})
        let data = resp.data;
        if (data.code === 200) {
            return (data.data.bookOrderList as Order[])
        }
        return []

    }

    /**
     * 获取指定room的可预约列表
     * @param room_id
     */
    async getBooksInRoom(room_id: number): Promise<NewOrderStatus[]> {
        ///
        let resp = await this.ax?.post(`/bathRoom/listBookStatus?time=${Date.now()}&bathroomid=${room_id}`)
        let data = resp.data;
        if (data.code === 200) {
            return data.data.bookStatusList
        }
        return []
    }

    async getRoomList(): Promise<{ id: number, name: string }[]> {
        ///
        let resp = await this.ax?.post(`/bathRoom/listRoom?time=${Date.now()}`)
        let data = resp.data;
        if (data.code === 200) {
            return data.data.bathRoomList
        }
        return []
    }


    async getQRCode() {
        let resp = await this.ax?.post(`/bathRoom/getQcode?time=${Date.now()}`, {});
        if (resp?.data.code === 200) {
            let name = resp?.data.data.picName;
            return `http://ligong.deshineng.com:8082/brmclg/download/${name[name.toString().length - 1]}/${name}.jpg`
        }
        return undefined
    }

    async cancel(id: number) {
        //
        let resp = await this.ax?.post(`/bathRoom/cancelOrder?time=${Date.now()}&bookorderid=${id}`, {});
        if (resp?.data.code === 200) {
            return true
        }
        return undefined
    }
}

/**
 * 一个预约信息
 */

