export const delay = (duration: number) => {
    return new Promise((res) => {
        setTimeout(() => {
            res(0)
        }, duration)
    })
}