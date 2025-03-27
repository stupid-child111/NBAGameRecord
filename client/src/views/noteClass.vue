<template>
  <div class="note-class-wrapper">
    <div class="note-class" :class="{ hide: showMenu }">
      <header>
        <div>
          <van-icon name="wap-nav" @click="handleChangeShowMenu" />
        </div>
        <div>
          <van-icon name="edit" @click="goToNotePublish" />
          <van-icon name="like-o" />
          <van-icon name="search" />
        </div>
      </header>
      <section>
        <div
          class="note-item"
          v-for="(item, index) in noteClassList"
          :key="index"
          :style="{ backgroundColor: item.bgColor }"
          @click="goToNoteList(item.title)"
        >
          <span class="title">{{ item.title }}</span>
        </div>
      </section>
    </div>
    <!-- menu菜单页面 -->
    <Menu class="menu" :class="{ show: showMenu }"></Menu>
    <!-- 发布订阅事件 -->
    <!-- @changeShowMenu="handleChangeShowMenu" -->
  </div>
</template>

<script setup>
import { reactive, ref, provide } from "vue";
import Menu from "@/components/Menu.vue";
import { useRouter } from "vue-router";

const router = useRouter();
const noteClassList = [
  { bgColor: "#f0aa84", title: "2024年季后赛" },
  { bgColor: "#dcf189", title: "2024年夏季联赛" },
  { bgColor: "#e0c2f1", title: "2024年常规赛" },
  { bgColor: "#c2ebf1", title: "2023年季后赛" },
  { bgColor: "#949c9d", title: "2023年夏季规赛" },
  { bgColor: "#f1c27a", title: "2023年常规赛" },
];
const showMenu = ref(false);
const handleChangeShowMenu = (value) => {
  showMenu.value = !showMenu.value;
  //   console.log(showMenu.value);
};
//使用provide/inject 来进行事件传递
// 使用provide 进行事件注册
// 使用inject 进行事件订阅
provide("changeShowMenu", handleChangeShowMenu);

// 跳到笔记列表页
const goToNoteList = (title) => {
  router.push({
    path: "/noteList",
    query: {
      title,
    },
  });
};
// 跳到笔记发布页
const goToNotePublish = () => {
  router.push("/notePublish");
};
</script>

<style lang="less" scoped>
.note-class-wrapper {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;

  .note-class {
    position: absolute;
    width: 100%;
    height: 100%;
    padding: 0 0.5866rem;
    box-sizing: border-box;
    overflow-y: scroll;
    transform: translateX(0%);
    transition: transform 0.3s;
    &.hide {
      transform: translateX(100%);
    }

    header {
      display: flex;
      justify-content: space-between;
      height: 1.2rem;
      align-items: center;
      margin: 10px 0;
      .van-icon {
        font-size: 24px;
        margin: 0 5px;
      }
    }
    section {
      width: 100%;
      .note-item {
        height: 3.2rem;
        border-radius: 0.3rem;
        margin-bottom: 0.64rem;
        box-shadow: 0 0 10px 2px #ccc;
        overflow: hidden;

        .title {
          display: block;
          margin-top: 0.5333rem;
          text-align: center;
          font-size: 0.5333rem;
          color: #fff;
        }
      }
    }
  }
  .menu {
    width: 100%;
    height: 100%;
    position: absolute;
    transform: translateX(-100%);
    transition: all 0.3s;
    &.show {
      transform: translateX(0%);
    }
  }
}
</style>