export type Order = {
    id: number;
    bathRoomId: number;
    studentId: number;
    status: number | string;
    period: string;
    bookStatusId: number;
    bathRoomName: string;
    periodStartTime: number;
    periodEndTime: number;
    enterTime?: any;
    leaveTime?: any;
    cardNo: number;
    orderNo: string;
    studentName: string;
    category: string;
    createTime: number;
    enterTimeStr: string;
    leaveTimeStr: string;
    createTimeStr: string;
}

export type NewOrderStatus = {
    id: number;
    bathRoomId: number;
    bathRoomName: string;
    maxBookNum: number;
    bookNum: number;
    period: string;
    periodStart: string;
    periodEnd: string;
    state: boolean;
    category: string;
    busy?: any;
    workDay?: any;
    remain: number;
}