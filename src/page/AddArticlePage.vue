<template>
    <div class="addArticlePage">
        <div class="typeAndTitle">
            <select class="form-select form-select-lg mb-3" v-model="article.categoryKey">
                <option disabled selected value="null">类型</option>
                <option :value="hobby.categoryKey" v-for="hobby in store.menuList" :key="hobby.id">
                    {{ hobby.categoryName }}</option>
            </select>
            <div class="input-group mb-3">
                <span class="input-group-text" id="inputGroup-sizing-default">标题</span>
                <input type="text" class="form-control" v-model="article.title">
            </div>
            <button class="btn btn-primary" @click="submit">提交</button>
        </div>
        <Toolbar class="Toolbar" :editor="editorRef" :defaultConfig="toolbarConfig" :mode="mode" />
        <Editor class="editorClass" v-model="article.content" :defaultConfig="editorConfig" :mode="mode"
            @onCreated="handleCreated" />
    </div>
</template>
<script setup>
import '@wangeditor/editor/dist/css/style.css' // 引入 css

import { onBeforeUnmount, onMounted, ref, shallowRef } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { addOrUpdateArticle } from '@/api/request';
import { onBeforeRouteLeave, useRoute } from 'vue-router';
import router from '@/router';
import { useMenuBarStore } from '@/store/PiniaStore'

const store = useMenuBarStore()

const article = ref({
        categoryKey: 'null',
        title: '',
        content: '<p></p>',
        previewText: '',
        userId: '',
        author: ''
    })
const mode = ref("default")
// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()

const toolbarConfig = {}
const editorConfig = { placeholder: '请输入内容...' }
const route = useRoute()
let addOrUpdte = "add"
onMounted(() => {
    window.addEventListener('beforeunload', handleBeforeUnload);
    addOrUpdte = route.query.type
})
function handleBeforeUnload(event) {
    const login_info = JSON.parse(sessionStorage.getItem('login_info'))
    if (!login_info) {
        router.push('/')
        router.go(0)
    }else{
        article.value.userId = login_info.loginId
        article.value.author = login_info.username
    }
}

onBeforeRouteLeave((to, from, next) => {
    // 在离开当前路由前执行的操作
    next();
});
// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
    window.removeEventListener('beforeunload', handleBeforeUnload);
    const editor = editorRef.value
    if (editor == null) return
    editor.destroy()
})

const handleCreated = (editor) => {
    if (addOrUpdte === 'update') {
        article.value = JSON.parse(sessionStorage.getItem('updateArticle'))
    } else {
        article.value
    }
    editorRef.value = editor // 记录 editor 实例，重要！
}

function submit() {

    article.value.previewText = editorRef.value.getText().substring(0, 50)
    addOrUpdateArticle(article.value)
    article.value = {
        categoryKey: 'null',
        title: '',
        content: '<p></p>',
        previewText: ''
    }
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

    .editorClass {
        height: 60vh !important;
        border: 1px solid #ccc;
        overflow-y: hidden;
    }
}
</style>