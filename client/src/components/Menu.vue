<template>
  <div class="menu-wrap">
    <div class="back" @click="changeShowMenu">
      <van-icon name="arrow-left" size="26px" />
    </div>
    <section class="header">
      <div class="avatar">
        <img src="@/assets/images/avatar.jpg" alt="" />
      </div>
      <p class="user">{{ username }}</p>
    </section>

    <div class="setting">
      <div class="set-item">
        <van-icon name="contact" size="0.4rem" />
        <span>个人主页</span>
      </div>
      <div class="set-item">
        <van-icon name="bullhorn-o" size="0.4rem" />
        <span>通知</span>
      </div>
      <div class="set-item">
        <van-icon name="revoke" size="0.4rem" />
        <span @click="exit">退出登录</span>
      </div>
    </div>
  </div>
</template>
  
<script setup>
// 发布订阅
// const emits = defineEmits(["changeShowMenu"]);
// const hideMenu = () => {
//   //   console.log(2);
//   emits("changeShowMenu");
//   //   console.log(3);
// };
import { inject } from "vue";
import { showToast } from 'vant';
import { useRouter } from 'vue-router';
const router = useRouter();
const changeShowMenu = inject("changeShowMenu");
const username =
  JSON.parse(localStorage.getItem("userInfo"))?.username || "未登录";
const exit = () => {
  localStorage.clear();
  showToast("退出成功");
  router.push("/login");
};
</script>
  
  <style lang="less" scoped>
.menu-wrap {
  background-color: #e8e6e8;
  padding: 1.4rem 1rem;
  box-sizing: border-box;
  .back {
    position: absolute;
    top: 15px;
    left: 15px;
  }
  .header {
    display: flex;
    flex-direction: column;
    align-items: center;
    .avatar {
      width: 2rem;
      height: 2rem;
      border-radius: 50%;
      overflow: hidden;
      margin-bottom: 10px;
      img {
        width: 100%;
      }
    }
    .user {
      color: #101010;
      font-size: 0.37333rem;
    }
  }
  .setting {
    margin-top: 1rem;
    padding-left: 30%;
    .set-item {
      height: 1.2rem;
      line-height: 1.2rem;
      span {
        font-size: 0.4rem;
        color: #101010;
        margin-left: 10px;
      }
    }
  }
}
</style>