export function pngBase64ToBlob(img: string) {
    img = 'data:image/png;base64,' + img
    const arr = img.split(',')
    const mime = arr[0].match(/:(.*?);/)![1]
    const suffix = mime.split('/')[1]
    const bstr = atob(arr[1])
    let n = bstr.length
    const u8arr = new Uint8Array(n)
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
    }
    return new File([u8arr], `${'file'}.${suffix}`, {
        type: mime
    });
}
