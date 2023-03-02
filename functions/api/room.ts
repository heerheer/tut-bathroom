import {Util} from "../util";
import {jsonResponse} from "../common";

export const onRequestGet = async (context: any) => {
    let util = new Util();
    util.setAuth(context.request.headers.get('token'), context.request.headers.get('loginid'))
    return jsonResponse({rooms: await util.getRoomList()})
};