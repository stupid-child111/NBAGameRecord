<template>
  <!-- <Suspense> -->
  <div class="note-list">
    <ul>
      <li
        v-for="(item, index) in noteList"
        :key="index"
        @click="goNoteDetail(item.id)"
      >
        <div class="img">
          <img :src="item.head_img" alt="" />
        </div>
        <div class="time">{{ item.c_time }}</div>
        <div class="title">{{ item.title }}</div>
      </li>
    </ul>
  </div>
  <!-- </Suspense> -->
</template>

<script setup>
import { ref, reactive, onBeforeMount } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "@/api/index.js";

const router = useRouter();
const route = useRoute();
const title = route.query.title;
// console.log(title);
const noteList = ref([]);

// onBeforeMount(async () => {
//   console.log("发送请求前");
//   const result = await axios.get("/findNoteListByType", {
//     params: {
//       note_type: title,
//     },
//   });
//   noteList.value = result.data;
//   console.log("请求成功后");
//   console.log(noteList.value);
// });

// const result = await axios.get("/findNoteListByType", {
//   params: {
//     note_type: title,
//   },
// });

const result = axios
  .get("/findNoteListByType", {
    params: {
      note_type: title,
    },
  })
  .then((res) => {
    noteList.value = res.data;
    // console.log(noteList.value);
  });
const goNoteDetail = (id) => {
  router.push({
    path: "/noteDetail",
    query: { id },
  });
};
</script>

<style lang="less" scoped>
.note-list {
  width: 100%;
  padding: 1rem 0.667rem 0;
  box-sizing: border-box;
  ul {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 50px;
    grid-row-gap: 30px;
    li {
      font-size: 0.37rem;
      .img {
        width: 100%;
        height: 4rem;
        border-radius: 0.27rem;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .title {
        margin-top: 5px;
      }
    }
  }
}
</style>