import {Util} from "../util";
import {getParams, jsonResponse} from "../common";

export const onRequestGet = async (context: any) => {
    let util = new Util();
    let {id} = getParams(context.request.url)
    util.setAuth(context.request.headers.get('token'), context.request.headers.get('loginid'))
    return jsonResponse({books: await util.getBooksInRoom(id)})
};