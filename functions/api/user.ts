import {getBody, getParams, jsonResponse} from "../common";
import {Util} from "../util";

export const onRequestGet = async (context: any) => {

    let {user, pwd} = getParams(context.request.url)

    let util = await Util.login(user, pwd);
    let loginid = util!.ax.headers['loginid']

    return jsonResponse({token: util?.auth ?? '', loginid})

};

