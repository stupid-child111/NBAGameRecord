<template>
  <div class="note-publish">
    <div class="editor">
      <!-- 富文本编辑 -->
      <QuillEditor
        theme="snow"
        v-model:content="state.content"
        placeholder="请输入笔记内容"
        contentType="html"
      ></QuillEditor>
    </div>

    <div class="note-wrap">
      <!-- 笔记标题 -->
      <div class="note-cell">
        <van-field
          v-model="state.title"
          label="标题"
          placeholder="请输入笔记标题"
          clearable
        ></van-field>
      </div>
      <!-- 笔记图片 -->
      <div class="note-cell">
        <van-field label="图片上传">
          <template #input>
            <van-uploader
              :after-read="afterRead"
              v-model="state.img"
              maxCount="1"
            />
          </template>
        </van-field>
      </div>
      <!-- 笔记分类 -->
      <div class="note-cell">
        <!-- <div class="sort">
          <span>分类</span>
          <span>美食<van-icon name="arrow" /></span>
        </div> -->
        <van-field
          v-model="state.note_type"
          is-link
          readonly
          label="分类"
          placeholder="选择笔记分类"
          @click="showPicker = true"
        />
        <van-popup v-model:show="showPicker" round position="bottom">
          <van-picker
            :columns="actions"
            @cancel="showPicker = false"
            @confirm="onConfirm"
          />
        </van-popup>
      </div>
      <!-- 发布按钮 -->
      <div class="btn">
        <van-button type="primary" block @click="notePublish"
          >发布笔记</van-button
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import { reactive, ref } from "vue";
import axios from "@/api/index.js";
import { useRouter } from "vue-router";
import handleFileSlice from "@/api/fileChunk";

const router = useRouter();
const state = reactive({
  content: "",
  title: "",
  img: [],
  note_type: "2024年季后赛",
});

const actions = [
  { text: "2024年季后赛", value: "2024年季后赛" },
  { text: "2024年夏季联赛", value: "2024年夏季联赛" },
  { text: "2024年常规赛", value: "2024年常规赛" },
  { text: "2023年季后赛", value: "2023年季后赛" },
  { text: "2023年夏季联赛", value: "2023年夏季联赛" },
  { text: "2023年常规赛", value: "2023年常规赛" },
];
const showPicker = ref(false);

const onConfirm = ({ selectedOptions }) => {
  //   console.log(selectedOptions);
  showPicker.value = false;
  state.note_type = selectedOptions[0].text;
};

const afterRead = (file) => {
  //   console.log(file);
};

// 发布笔记
const notePublish = async () => {
  //需要判断需不需要大文件分片上传
  // console.log({
  //   title: state.title,
  //   note_content: state.content,
  //   head_img: state.img.length ? state.img[0].content : "",
  //   note_type: state.note_type,
  // });
  const fileInfo = state.img.length
    ? handleFileSlice(state.img[0].content)
    : {
        chunks: [""],
        totalChunks: 1,
      };
  console.log("文件分片数量：" + fileInfo.totalChunks);
  // if (fileInfo.chunks.length == 0) {
  //   const result = await axios.post("/notePublish", {
  //     title: state.title,
  //     note_content: state.content,
  //     head_img: state.img.length ? state.img[0].content : "",
  //     note_type: state.note_type,
  //   });
  // } else {
  //   console.log("大文件需要分片上传");
  // }
  const { chunks, totalChunks } = fileInfo;
  Promise.all(
    chunks.map((chunk, index) =>
      axios.post("/notePublish", {
        title: state.title,
        note_content: state.content,
        head_img: chunk,
        note_type: state.note_type,
        currentIndex: index,
        totalChunks: totalChunks,
      })
    )
  )
    .then((res) => {
      console.log("上传完成");
      setTimeout(() => {
        router.push("/noteClass");
      }, 1000);
    })
    .catch((err) => {
      console.log("文件上传失败", err);
    });
};
</script>

<style lang="less" scoped>
.note-publish {
  min-height: 100vh;
  :deep(.ql-container) {
    min-height: 200px;
  }
  .note-cell {
    border-bottom: 1px solid #d1d5db;
    .sort {
      display: flex;
      justify-content: space-between;
      line-height: 3;
      padding: 3px 16px;
      color: #323233;
    }
  }
  .btn {
    width: 80%;
    margin: 0 auto;
    margin-top: 0.75rem;
  }
}
</style>