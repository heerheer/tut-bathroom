import axios from "axios";
import dayjs from "dayjs";
import {userLocalStore, userStore} from "../stores/userStore";


export const login = async (account: { user: string, pwd: string }) => {
    let {data} = await axios.get('/api/user', {params: account})
    if (data.token) {
        return {token: data.token, loginid: data.loginid}
    } else {
        return {token: '', loginid: ''}
    }
}

export const getQRCodeUrl = async () => {
    let {data} = await axios.get('/api/qrcode', {
        headers: {
            'token': userStore.token,
            'loginid': userStore.loginid
        }
    })
    return data.pic
}
export const getUserOrders = async () => {
    let {data} = await axios.get('/api/order', {
        headers: {
            'token': userStore.token,
            'loginid': userStore.loginid
        }
    })
    return data.orders
}

export const getRoomList = async () => {
    let {data} = await axios.get('/api/room', {
        headers: {
            'token': userStore.token,
            'loginid': userStore.loginid
        }
    })
    return data.rooms
}

export const getBooks = async (room: number) => {
    let {data} = await axios.get('/api/book', {
        params: {id: room},
        headers: {
            'token': userStore.token,
            'loginid': userStore.loginid
        }
    })
    return data.books
}
export const order = async (id: number) => {
    let {data} = await axios.post('/api/order?id=' + id, {}, {
        headers: {
            'token': userStore.token,
            'loginid': userStore.loginid
        }
    })
    return data
}

export const cancel = async (id: number) => {
    let {data} = await axios.delete('/api/order?id=' + id,  {
        headers: {
            'token': userStore.token,
            'loginid': userStore.loginid
        }
    })
    return data
}

//快速预约当前时间段的
export const orderCurrentTime = async () => {

    const tran = (str: string): number => {
        return Number(str.replace(':', ''))
    }
    let now = dayjs().format('HH:mm')
    const rooms = await getRoomList()

    if (userLocalStore.value.default_room == '') {
        return {result: false, reason: 'room-undefined'}
    }
    console.log(userLocalStore.value.default_room)
    //@ts-ignore
    let room = rooms.find(x => x.name == userLocalStore.value.default_room)

    if (!room) {
        return {result: false, reason: 'room-error'}
    }
    let books = await getBooks(room!.id);
    console.log(books)
    //@ts-ignore
    let book = books!.find(x => tran(x.periodStart) <= tran(now) && tran(x.periodEnd) > tran(now))

    if (book) {
        const result = await order(book.id);

        if (result?.result) {
            console.log({message: '预约成功!\n' + dayjs(result.start).format('HH:mm:ss')+ '-' + dayjs(result.end).format('HH:mm:ss')})
            //await refreshData();
            return {result: true, reason: ''}

        } else {
            return {result: false, reason: 'order-failed'}
            console.log({message: '预约失败!'})
        }

    } else {
        return {result: false, reason: 'no-book'}
        console.log({message: '当前没有预约档位!'})
    }
}