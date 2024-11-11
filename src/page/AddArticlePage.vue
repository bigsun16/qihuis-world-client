<template>
    <div class="addArticlePage">
        <div class="typeAndTitle">
            <select class="form-select form-select-lg mb-3" v-model="articleType">
                <option disabled selected value="thoughtPage">类型</option>
                <option :value="hobby.categoryKey" v-for="hobby in store.menuList" :key="hobby.id">{{hobby.categoryName}}</option>
            </select>
            <div class="input-group mb-3">
                <span class="input-group-text" id="inputGroup-sizing-default">标题</span>
                <input type="text" class="form-control" v-model="articleTitle">
            </div>
            <button class="btn btn-primary" @click="submit">提交</button>
        </div>
        <Toolbar class="Toolbar" :editor="editorRef" :defaultConfig="toolbarConfig" :mode="mode" />
        <Editor class="editor" v-model="valueHtml" :defaultConfig="editorConfig" :mode="mode"
            @onCreated="handleCreated" />
    </div>
</template>
<script setup>
import '@wangeditor/editor/dist/css/style.css' // 引入 css

import { onBeforeUnmount, ref, shallowRef, onMounted } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { useMenuBarStore } from '@/store/PiniaStore';

const store = useMenuBarStore()

const articleType = ref("")
const articleTitle = ref("")

const mode = ref("default")
// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()

// 内容 HTML
const valueHtml = ref('<p></p>')

const toolbarConfig = {}
const editorConfig = { placeholder: '请输入内容...' }

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
    const editor = editorRef.value
    if (editor == null) return
    editor.destroy()
})

const handleCreated = (editor) => {
    editorRef.value = editor // 记录 editor 实例，重要！
    console.log(editorRef.HTML);
}

function submit(){
    console.log("type:"+articleType.value)
    console.log("title:"+articleTitle.value)
    console.log("content:"+valueHtml.value)
}

</script>

<style lang="less" scoped>
.addArticlePage {

    margin: 0 auto;
    width: 60vw;
    height: 85vh;

    .typeAndTitle {
        display: flex;
        justify-content: start;
        justify-items: center;

        .form-select {
            width: 20%;
        }

        .input-group {
            width: 60%;
            margin: 0 50px;
        }

        .btn {
            margin-bottom: 16px;
        }
    }

    .Toolbar {
        border: 1px solid #ccc;
    }

    .editor {
        height: 60vh !important;
        border: 1px solid #ccc;
        overflow-y: hidden;
    }
}
</style>