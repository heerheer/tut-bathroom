import {getBody, getParams, jsonResponse} from "../common";
import {Util} from "../util";

//get直接获取所有order列表

export const onRequestGet = async (context: any) => {

    let util = new Util();
    util.setAuth(context.request.headers.get('token'), context.request.headers.get('loginid'))
    return jsonResponse({orders: await util.getOrderList()})
};

export const onRequestPost = async (context: any) => {
    let util = new Util();
    util.setAuth(context.request.headers.get('token'), context.request.headers.get('loginid'))
    let {id} = getParams(context.request.url)
    return jsonResponse(await util.order(id))
};

export const onRequestDelete = async (context: any) => {
    let util = new Util();
    util.setAuth(context.request.headers.get('token'), context.request.headers.get('loginid'))
    let {id} = getParams(context.request.url)
    return jsonResponse(await util.cancel(id))
};