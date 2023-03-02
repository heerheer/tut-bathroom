import {reactive} from "vue";
import {useLocalStorage} from "@vueuse/core";

export const userStore = reactive({
    user: '',
    token: '',
    loginid: '',
    isLogin() {
        return userStore.user != ''
    }
})

export const userLocalStore = useLocalStorage('user', {
    account: {user: '', pwd: ''},
    default_room: ''
}, {flush: 'post', writeDefaults: true, mergeDefaults: true});