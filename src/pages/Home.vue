<template>
  <div class="flex flex-col w-full px-4 mt-5 gap-6">

    <ha-card class="h-28" v-if="!userStore.isLogin()" title="No Account Info!">
      <template v-slot:icon>
        <svg
            class="fill-indigo-700"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 576 512"
        >
          <!--! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
          <path
              d="M192 64c0-17.7-14.3-32-32-32s-32 14.3-32 32V96.2c0 54.1 23.5 104 62.2 138.3l-21 146.7c7.8 2.1 15.5 3.3 22.8 3.3c21.1 0 42-8.5 59.2-20.3c22.1-15.5 51.6-15.5 73.7 0c12.4 8.5 26.1 14.8 39.7 18l17.7-97.6c10.7-1.2 21.3-3.1 31.9-5.5l105-23.9c17.2-3.9 28-21.1 24.1-38.3s-21.1-28-38.3-24.1L400 216.6c-41 9.3-83.7 7.5-123.7-5.2c-50.2-16-84.3-62.6-84.3-115.3V64zM320 192a64 64 0 1 0 0-128 64 64 0 1 0 0 128zM306.5 389.9c-11.1-7.9-25.9-7.9-37 0C247 405.4 219.5 416 192 416c-26.9 0-55.3-10.8-77.4-26.1l0 0c-11.9-8.5-28.1-7.8-39.2 1.7c-14.4 11.9-32.5 21-50.6 25.2c-17.2 4-27.9 21.2-23.9 38.4s21.2 27.9 38.4 23.9c24.5-5.7 44.9-16.5 58.2-25C126.5 469.7 159 480 192 480c31.9 0 60.6-9.9 80.4-18.9c5.8-2.7 11.1-5.3 15.6-7.7c4.5 2.4 9.7 5.1 15.6 7.7c19.8 9 48.6 18.9 80.4 18.9c33 0 65.5-10.3 94.5-25.8c13.4 8.4 33.7 19.3 58.2 25c17.2 4 34.4-6.7 38.4-23.9s-6.7-34.4-23.9-38.4c-18.1-4.2-36.2-13.3-50.6-25.2c-11.1-9.4-27.3-10.1-39.2-1.7l0 0C439.4 405.2 410.9 416 384 416c-27.5 0-55-10.6-77.5-26.1z"/>
        </svg>
      </template>
      <template v-slot:default>
        <div class="opacity-80 font-light">
          just like a solitary swimmer
        </div>
      </template>
      <template v-slot:footer>
        <div class="flex justify-end">
          <tail-button @click="router.push('/login')" class="text-indigo-600 ">Login</tail-button>
        </div>
      </template>
    </ha-card>

    <ha-card class="h-28"
             v-if="userStore.isLogin()"
             :title="userOrder.orders.length==0?'所有预约已完成!':'你还有预约未完成!'"
    >
      <template v-slot:icon>
        <bath class="fill-indigo-600"/>
      </template>
      <template v-slot:default>
        <div class="my-3.5">

          <!-- 没有预约 -->
          <div v-if="userOrder.orders.length==0">
            <div class="flex flex-col gap-2.5">
              <div class="opacity-80">
                今日预约都已经完成啦~
              </div>
              <div class="opacity-80">
                😉明天也要好好洗澡哦!
              </div>
            </div>
          </div>

          <!-- 有预约 -->
          <div v-if="userOrder.orders.length>0">
            <transition-group appear enter-active-class="animate__animated animate__bounceIn" tag="ul" stagger="600">

              <ul v-for="order in userOrder.orders" :key="order.id">

                <div class="flex items-center justify-between p-4 bg-white border-b border-gray-200">
                  <div class="flex items-center">
                    <span class="text-sm text-gray-600">{{ order.bathRoomName }}</span>
                    <span class="ml-4 text-lg font-bold text-gray-800">{{ order.period }}</span>

                    <div v-if="order.status=='3'">
                      <!--已超时-->
                      <Exclamation class="h-6 w-6 ml-4 fill-red-500"></Exclamation>

                    </div>
                    <div v-else-if="order.status=='2'">
                      <Check></Check>
                    </div>
                    <div v-else-if="order.status=='1'">
                      <Check></Check>
                    </div>
                    <div v-else-if="order.status=='0'">
                      <Shower class="h-6 w-6 ml-4 fill-indigo-600"></Shower>
                    </div>
                  </div>
                  <button
                      v-if="order.status !=='3'"
                      @click="cancelOrder(order.id)"
                      class="px-3 py-1 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600">取消
                  </button>
                  <div v-else>
                    <span class="px-1 text-sm text-secondary">已过期</span>
                  </div>
                </div>

              </ul>
            </transition-group>

          </div>

        </div>
      </template>
      <template v-slot:panel-control>
        <svg xmlns="http://www.w3.org/2000/svg"
             class="w-5 h-5 fill-indigo-600"
             @click="getUserOrders"
             viewBox="0 0 512 512">
          <!--! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
          <path
              d="M447.5 224H456c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L397.4 96.6c-87.6-86.5-228.7-86.2-315.8 1c-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L311 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8H447.5z"/>
        </svg>
      </template>
      <template v-slot:footer>
        <div class="flex justify-end">
          <tail-button @click="showQRCode" class="text-indigo-600 ">出示二维码</tail-button>
        </div>
      </template>
    </ha-card>


    <transition leave-active-class="animate__animated animate__bounceOut">
      <ha-card
          appear="shake"
          v-if="userLocalStore.default_room==''"
          title="未设置默认浴室!"
          @loaded="loadRooms"
      >
        <template v-slot:icon>
          <sink class="fill-indigo-600"/>
        </template>
        <template v-slot:default>
          <div class="my-3.5 flex gap-2.5 items-center">
            <span>选择默认房间:</span>
            <div class="flex items-center">
              <select id="options" name="options"
                      v-model="room_selected"
                      class="border-b-2 border-b-indigo-600 block w-full pl-3 pr-10 py-2 text-base  focus:border-indigo-600 ">
                <option v-for="room in rooms">{{ room.name }}</option>
              </select>
            </div>
          </div>
        </template>
        <template v-slot:footer>
          <div class="flex justify-end">
            <tail-button @click="userLocalStore.default_room=room_selected" class="text-indigo-600 ">保存
            </tail-button>
          </div>
        </template>
      </ha-card>

    </transition>

    <ha-card class="h-28" v-if="userStore.isLogin()" title="创建新的预约">
      <template v-slot:icon>
        <shower class="fill-indigo-600"/>

      </template>
      <template v-slot:default>
        <div class="my-3.5">
          <div class="opacity-80 font-light">
            使用"快速创建"来创建时间最接近的预约!
            <br>
            或者选择时间创建任何一个预约
          </div>
        </div>

      </template>
      <template v-slot:footer>
        <div class="flex justify-end gap-3.5">
          <tail-button @click="" class="text-indigo-600 ">选择时间点</tail-button>
          <tail-button @click="quickOrder" class="text-indigo-600 ">快速新建</tail-button>
        </div>
      </template>
    </ha-card>


  </div>
</template>

<script setup lang="ts">

import {onMounted, reactive, ref} from "vue";
import {useRouter} from "vue-router";
import {useLocalStorage} from '@vueuse/core'
import {showImagePreview, showFailToast} from 'vant';
import 'vant/es/image-preview/style';

import TailButton from "../components/tail-button.vue";
import HaCard from "../components/ha-card.vue";
import {userLocalStore, userStore} from "../stores/userStore";
import Bath from '../icons/Bath.vue'
import Shower from '../icons/Shower.vue'
import Sink from '../icons/Sink.vue'
import * as userUtil from "../utils/userUtil";
import {getRoomList} from "../utils/userUtil";
import Exclamation from "../icons/Exclamation.vue";
import Check from "../icons/Check.vue";


const router = useRouter()
const rooms = ref([])
const room_selected = ref('')
const userOrder = reactive({orders: []})

const showQRCode = async () => {

  let pic = await userUtil.getQRCodeUrl();
  if (pic != '') {
    showImagePreview([pic]);
  }
}

const getUserOrders = async () => {
  userOrder.orders = []
  let orders = await userUtil.getUserOrders();
  userOrder.orders = orders;
}

const autoLogin = async () => {
  //auto login
  let userInfo = JSON.parse(localStorage.user ?? '{}');
  if (!userInfo.account) {
    await router.push('/login')
  } else {
    let {token, loginid} = await userUtil.login(userInfo.account)
    userStore.token = token;
    userStore.loginid = loginid;
    userStore.user = userInfo.account.user;
    console.log('自动登入成功')
  }

}

const quickOrder = async () => {
  let {result, reason} = await userUtil.orderCurrentTime()

  if (!result) {
    if (reason == 'room-undefined') {
      //设置快速房间
    }
    if (reason == 'room-error') {
      //设置快速房间
      showFailToast({message: '房间参数错误'})
    }
  }
  console.log(result, reason)
  getUserOrders()

}

const loadRooms = async () => {
  rooms.value = await getRoomList();
}

const cancelOrder = async (id: string) => {
  await userUtil.cancel(Number(id));
  await getUserOrders()
}

onMounted(async () => {
  if (!userStore.isLogin()) {
    await autoLogin();
    await getUserOrders()
  } else {
    await getUserOrders()
  }
})
</script>

<style scoped>

</style>