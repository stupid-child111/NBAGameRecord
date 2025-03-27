<template>
  <div class="login">
    <h1>登录</h1>
    <div class="login-wrapper">
      <div class="avator">
        <img
          :class="{ rotating: isRotating }"
          src="@/assets/images/avatar.jpg"
          alt=""
          @mouseover="startRotation"
          @mouseleave="stopRotation"
        />
      </div>
      <!-- vant表单 -->
      <van-form @submit="onSubmit">
        <van-cell-group inset>
          <van-field
            v-model="username"
            name="username"
            label="用户名"
            placeholder="用户名"
            :rules="[{ required: true, message: '请填写用户名' }]"
          />
          <van-field
            v-model="password"
            type="password"
            name="password"
            label="密码"
            placeholder="密码"
            :rules="[{ required: true, message: '请填写密码' }]"
          />
        </van-cell-group>
        <div style="margin: 16px">
          <van-button round block type="primary" native-type="submit">
            登录
          </van-button>
        </div>
      </van-form>
    </div>
    <p class="register" @click="router.push('/register')">
      新用户？点击这里注册
    </p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "@/api/index.js";
import { useRouter } from "vue-router";
// 定义数据
const username = ref("wn");
const password = ref("123");
const isRotating = ref(false);
const router = useRouter();

//向后端发送请求
const onSubmit = async (values) => {
  // 后端发请求， 将账号密码传给后端
  const res = await axios.post("/user/login", values);
  // console.log(res.token);
  localStorage.setItem("userInfo", JSON.stringify(res.data)); 
  localStorage.setItem("token", res.token);
  router.push("/noteClass");
};

// 旋转动画
const startRotation = () => {
  isRotating.value = true;
};
const stopRotation = () => {
  isRotating.value = false;
};
</script>

<style lang="less" scoped>
.login {
  position: relative;
  box-sizing: border-box;
  width: 100vw;
  height: 100vh;
  background-color: #fff;
  padding: 0 0.3rem;
  overflow: hidden;
  h1 {
    height: 0.6933rem;
    font-size: 0.48rem;
    text-align: center;
    line-height: 0.6933rem;
    margin-top: 1.12rem;
  }
  .login-wrapper {
    width: 7.44rem;
    border: 1px solid rgba(187, 187, 187);
    margin: 0 auto;
    margin-top: 1.7rem;
    border-radius: 0.3rem;
    box-shadow: 0 0 0.533rem 10px rgba(170, 170, 170, 1);
    padding-bottom: 18px;
    .avator {
      width: 2.4rem;
      height: 2.4rem;
      margin: 1rem auto 0.77rem auto;
      border-radius: 50%;
      overflow: hidden;
      img {
        width: 100%;
      }
    }
  }
  .register {
    position: absolute;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%);
  }
}
:deep(.van-field__label) {
  width: 45px;
}
@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
/* 图像样式 */
/* 鼠标悬停时的样式 */
.rotating:hover {
  animation: rotate 0.3s linear infinite;
}
</style>