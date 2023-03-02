import {
    makeRawPagesFunction,
    makePagesFunction,
    makeResponse, PagesFunctionEnv
} from 'vite-plugin-cloudflare-functions/worker';
import {PagesFunction,EventContext} from '@cloudflare/workers-types'
import {getBody, getParams, jsonResponse} from "../common";

export const onRequestGet = makePagesFunction((context) => {
    return jsonResponse({hello:'world'})
});

export const onRequestPost = async (context: EventContext<any,any,any>) => {
    //@ts-ignore
    let {auth} = getParams(context.request.url)
    let reader = context.request.body!.getReader();
    let json = await getBody(reader);
    return new Response(JSON.stringify((JSON.parse(json))))
}