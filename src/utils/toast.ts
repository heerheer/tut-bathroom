import {Component, createApp,} from "vue";
import HaDialog from "../components/ha-dialog.vue";
import {delay} from "./delay";

export const dialog = async (config: { delay?: number, message?: string } = {}) => {
    let {unmount, app} = showComponent(HaDialog, config)
    await delay((config.delay ?? 2000) + 250)
    unmount()

}

export const showComponent = (root: Component, props: any = {}) => {
    let app = createApp(root, props)
    let div = document.createElement('div')
    document.body.append(div)
    app.mount(div)
    return {
        unmount() {
            app.unmount();
            document.body.removeChild(div)
        }, app
    }
}