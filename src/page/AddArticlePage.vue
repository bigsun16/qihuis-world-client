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

import { computed, onBeforeUnmount, ref, shallowRef } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { addOrUpdateArticle, uploadFile } from '@/api/request';
import { useRoute } from 'vue-router';
import { useMenuBarStore } from '@/store/PiniaStore'
import { calculateSHA256ByWorker } from '@/utils/fileUtils';

const store = useMenuBarStore()

const mode = ref("default")
// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()

const toolbarConfig = {}
const editorConfig = {
    placeholder: '请输入内容...',
    MENU_CONF: {
        uploadImage: {
            fieldName: 'wishTreeFile',
            // 单个文件的最大体积限制，默认为 2M
            maxFileSize: 100 * 1024 * 1024, // 1M
            // 最多可上传几个文件，默认为 100
            maxNumberOfFiles: 10,
            // 选择文件时的类型限制，默认为 ['image/*'] 。如不想限制，则设置为 []
            allowedFileTypes: ['jpg', 'jpeg', 'png'],
            async customUpload(file, insertFn) {
                const sha256 = await calculateSHA256ByWorker(file);
                console.log(sha256);
                const result = await uploadFile(sha256, "hahah", file);
                const { url, alt, href } = result.data;
                insertFn(url, alt, url)
            }
        },
        uploadVideo: {
            fieldName: 'wishTreeFile',
            // 单个文件的最大体积限制，默认为 2M
            maxFileSize: 100 * 1024 * 1024, // 1M
            // 最多可上传几个文件，默认为 100
            maxNumberOfFiles: 10,
            // 选择文件时的类型限制，默认为 ['image/*'] 。如不想限制，则设置为 []
            allowedFileTypes: ['mp4'],
            // 超时时间，默认为 30 秒
            timeout: 15 * 1000, // 15 秒
            async customUpload(file, insertFn) {
                const sha256 = await calculateSHA256ByWorker(file);
                console.log(sha256);
                const result = await uploadFile(sha256, "hahah", file);
                const { url, alt, href } = result.data;
                // 最后插入视频
                insertFn(url, '')
            }
        }
    }
}

const route = useRoute()
const addOrUpdte = computed(() => {
    return route.query.type
})

const article = computed(() => {
    if (route.query.type === 'update') {
        return JSON.parse(localStorage.getItem('updateArticle'))
    } else {
        const login_info = JSON.parse(localStorage.getItem('login_info'))
        return {
            categoryKey: 'null',
            title: '',
            content: '<p></p>',
            previewText: '',
            userId: login_info.loginId,
            author: login_info.username
        }
    }
})

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
    const editor = editorRef.value
    if (editor == null) return
    editor.destroy()
})

const handleCreated = (editor) => {
    editorRef.value = editor // 记录 editor 实例，重要！
}

function submit() {
    article.value.previewText = editorRef.value.getText().substring(0, 50)
    addOrUpdateArticle(article.value).then((res) => {
        if (res.code === 200) {
            if (addOrUpdte.value === 'update') {
                ElMessage.success('修改成功');
            } else {
                ElMessage.success('新增成功');
                location.reload()
            }
        } else {
            if (addOrUpdte.value === 'update') {
                ElMessage.error('修改失败');
            } else {
                ElMessage.error('新增失败');
            }
        }
    });

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

@media (max-width: 772px) {
    .addArticlePage {
        width: 100%;
        padding: 0;
        margin: 0;
    }
}
</style>