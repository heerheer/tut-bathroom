import {Util} from "../util";
import {jsonResponse} from "../common";

export const onRequestGet = async (context: any) => {

    let util = new Util();
    util.setAuth(context.request.headers.get('token'), context.request.headers.get('loginid'))
    let {data, code} = await util.ax.post(`/bathRoom/getQcode?time=${Date.now()}`, {});
    if (code === 200) {
        let name = data.data.picName;
        return jsonResponse({pic: `http://ligong.deshineng.com:8082/brmclg/download/${name[name.toString().length - 1]}/${name}.jpg`})
    }
    return jsonResponse({pic: ''})

}