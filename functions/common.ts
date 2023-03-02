export function getParams(url: string) {
    let u = new URL(url)
    //@ts-ignore
    return Object.fromEntries(u.searchParams)
}

export async function getBody(reader: any) {
    let bodyText = ''
    while (true) {
        // Read a chunk from the stream
        const {done, value} = await reader.read();
        // If done, break out of the loop
        if (done) break;
        // Otherwise, decode the chunk as UTF-8 and append it to the body text
        bodyText += new TextDecoder("utf-8").decode(value);
    }
    return bodyText
}

export function jsonResponse(data: any) {
    return new Response(JSON.stringify(data))
}