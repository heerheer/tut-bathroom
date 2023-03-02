<template>
  <div class="w-full h-full fixed flex justify-center items-center">

    <div class="flex px-4 flex-col">
      <ha-card title="Now Login!">
        <template v-slot:icon>
          <svg class="fill-indigo-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
            <!--! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
            <path
                d="M80 96A48 48 0 1 0 80 0a48 48 0 1 0 0 96zM64 128c-35.3 0-64 28.7-64 64V320c0 17.7 14.3 32 32 32c9.8 0 18.5-4.4 24.4-11.2L80.4 485.3c2.9 17.4 19.4 29.2 36.8 26.3s29.2-19.4 26.3-36.8L123.1 352h15.7l30 134.9c3.8 17.3 20.9 28.1 38.2 24.3s28.1-20.9 24.3-38.2l-57.3-258 116.3 53.8c.5 .3 1.1 .5 1.6 .7c8.6 3.6 18 3.1 25.9-.7c3.4-1.6 6.6-3.9 9.3-6.7c3.1-3.2 5.5-7 7.1-11.4c.1-.3 .2-.7 .3-1l2.5-7.5c5.7-17.1 18.3-30.9 34.7-38.2l8-3.5c1-.4 1.9-.8 2.9-1.2l-16.9 63.5c-5.6 21.1-.1 43.6 14.7 59.7l70.7 77.1 22 88.1c4.3 17.1 21.7 27.6 38.8 23.3s27.6-21.7 23.3-38.8l-23-92.1c-1.9-7.8-5.8-14.9-11.2-20.8l-49.5-54 19.3-65.5 9.6 23c4.4 10.6 12.5 19.3 22.8 24.5l26.7 13.3c15.8 7.9 35 1.5 42.9-14.3s1.5-35-14.3-42.9L537 232.7l-15.3-36.8C504.5 154.8 464.3 128 419.7 128c-22.8 0-45.3 4.8-66.1 14l-8 3.5c-24.4 10.9-44.6 29-58.1 51.6L157.3 136.9C144.7 131 130.9 128 117 128H64zM464 96a48 48 0 1 0 0-96 48 48 0 1 0 0 96zM349.7 335.6l-25 62.4-59.4 59.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L372.3 441c4.6-4.6 8.2-10.1 10.6-16.1l14.5-36.2-40.7-44.4c-2.5-2.7-4.8-5.6-7-8.6z"/>
          </svg>
        </template>
        <template v-slot:default>
          <div class="my-3.5 px-4 max-w-4/5">
            <ha-input type="text" placeholder="Type your account" v-model:text="userLocalStore.account.user"></ha-input>
            <ha-input type="password" placeholder="Type your password" v-model:text="userLocalStore.account.pwd"></ha-input>
          </div>
        </template>
        <template v-slot:footer>
          <div class="flex justify-end text-primary">
            <tail-button @click="userLogin">Login</tail-button>
          </div>
        </template>
      </ha-card>
      <div class="my-3.5 font-light text-sm px-4">
        登入即代表你同意由 <a> heerdev.top </a>提供的tutbathroom(洗澡预约UI)<a @click="agreementShow=true">服务条款</a>
      </div>
    </div>
  </div>

  <van-popup
      v-model:show="agreementShow"
      closeable
      position="bottom"
      :style="{ height: '60%' }"
      class=""
  >
    <div class="flex flex-col items-center justify-center pt-3 gap-2.5 px-6 overflow-hidden h-full">
      <div class="text-xl font-bold">
        服务条款
      </div>
      <div class="overflow-auto pb-3.5 pt-1 px-2">
        <div>
          欢迎访问本网站（以下简称“本网站”）。本网站由我们（以下简称“我们”或“我们的”）提供。在使用本网站之前，请仔细阅读以下使用条款（以下简称“本条款”）。使用本网站即表示您同意遵守本条款。如果您不同意本条款，请勿使用本网站。
          <br>
          1. 账户和接口
          <br>
          1.1 为了使用本网站的某些功能，您可能需要注册一个账户并设置一个密码。您应当保护好您的账户和密码，不要将其泄露给任何第三方。如果您发现或怀疑您的账户或密码被盗用或滥用，请立即通知我们。
          <br>
          1.2 您同意授权我们及我们的关联公司在符合法律规定和隐私政策的前提下，使用您的账户及与您账户相关联的接口（例如API、SDK等）来提供、改进、维护和开发我们的服务。
          <br>
          1.3 您应当遵守我们对于账户和接口使用的规则和限制，并且不得以任何方式干扰、破坏或试图获取未经授权的访问权限。
          <br>
          1.4 我们保留随时暂停、终止或修改您对于账户和接口使用权利的权利，无需事先通知或承担任何责任。
        </div>
      </div>
    </div>
  </van-popup>
</template>

<script setup lang="ts">
import HaCard from "../components/ha-card.vue";
import HaInput from "../components/ha-input.vue";
import TailButton from "../components/tail-button.vue";
import {onMounted, ref} from "vue";
import {userLocalStore, userStore} from "../stores/userStore";
import {useRouter} from 'vue-router'
import {showSuccessToast, showFailToast} from 'vant'

import {login} from '../utils/userUtil'


const router = useRouter()
const x = ref('');

const agreementShow = ref(false);
const userLogin = async () => {
  let {token, loginid} = await login(userLocalStore.value.account)
  if (token) {
    userStore.user = userLocalStore.value.account.user;
    userStore.token = token;
    userStore.loginid = loginid;

    await showSuccessToast({message: '授权成功'})
    console.log('token已获取:', userStore.token)
    console.log('loginid已获取:', userStore.loginid)
    router.back()
  } else {
    await showFailToast({message: '授权失败'})
  }
}

onMounted(async () => {
  await userLogin()
})

</script>

<style scoped>

</style>