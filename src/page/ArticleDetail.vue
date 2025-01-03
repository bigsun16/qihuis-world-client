<template>
    <el-dialog class="my-dialog" :close-on-click-modal="false" :show-close="false" style="padding: 0 ">
        <template #header>
            <div><span>{{ article.createTime }}</span></div>
            <div><span>作者：{{ article.author }}</span></div>
            <div class="dialog-header-buttons">
                <el-button class="transparent-button" @click="handleDelete"><el-icon>
                        <Delete />
                    </el-icon></el-button>
                <el-button class="transparent-button" @click="handleEdit"><el-icon>
                        <Edit />
                    </el-icon></el-button>
                <el-button class="transparent-button" @click="handleClose"><el-icon>
                        <Close />
                    </el-icon></el-button>
            </div>
        </template>
        <div class="article">
            <h4>{{ article.title }}</h4>
            <Editor class="editorClass" v-model="article.content" @onCreated="handleCreated" :mode="mode" />
        </div>
    </el-dialog>

</template>

<script setup>
import { ref, shallowRef, defineProps, defineEmits, onBeforeUnmount } from 'vue'
import { Editor } from '@wangeditor/editor-for-vue'
import { Delete, Edit, Close } from '@element-plus/icons-vue';
import router from '@/router';
import { deleteArticle } from '@/api/request';
import { ElMessage } from 'element-plus';

const props = defineProps({
    article: {
        type: Object,
        required: true
    }
});
const mode = ref("default")
const emit = defineEmits(['update:dialogDetailVisible'])

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef();
const handleCreated = (editor) => {     // 创建编辑器实例
    editor.disable()
    editorRef.value = editor // 记录 editor 实例，重要！
}
// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
    const editor = editorRef.value
    if (editor == null) return
    editor.destroy()
})

function handleEdit() {
    const loginInfo = JSON.parse(localStorage.getItem('login_info'))
    if (!loginInfo) {
        ElMessage.warning('请先登录')
    } else if (loginInfo.loginId != props.article.userId && loginInfo.roleList.indexOf('ADMINISTRATOR') === -1) {
        ElMessage.warning('只能修改自己的文章')
    } else {
        localStorage.setItem('updateArticle', JSON.stringify(props.article))
        router.push('/wish/addArticlePage?type=update')
    }
}

function handleClose() {
    emit('update:dialogDetailVisible', false)
}

function handleDelete() {
    const loginInfo = JSON.parse(localStorage.getItem('login_info'))
    if (!loginInfo) {
        ElMessage.warning('请先登录')
    } else if (loginInfo.loginId != props.article.userId && loginInfo.roleList.indexOf('ADMINISTRATOR') === -1) {
        ElMessage.warning('只能删除自己的文章')
    } else {
        deleteArticle(props.article.id).then(result => {
            if (result.code === 200) {
                ElMessage.success('删除成功')
                location.reload()
            } else {
                ElMessage.error(result.msg)
            }
        })
    }
}

</script>

<style lang="less">
.my-dialog {
    border-radius: 2px;
    box-shadow: inset 0 1px 2px -1px rgba(255, 255, 255, .5), 0 1rem 2rem 0 rgba(0, 0, 0, .4);
    width: 50vw;
    margin-top: 2rem !important;

    .el-dialog__header {
        display: flex;
        justify-content: space-between;
        background-color: #f9e2c3 !important;
        color: #958879;
        padding: 0.5rem;
        font-weight: 300;
        // text-transform: uppercase;
        font-size: clamp(1rem, 0.33vw + 1rem, 1.3rem);
    }

    .dialog-header-buttons {
        display: flex;
        justify-content: flex-end;
        gap: 10px;

        .transparent-button {
            background-color: transparent;
            /* 设置背景颜色为透明 */
            border-color: transparent;
            /* 设置边框颜色为透明 */

        }

        .transparent-button:hover {
            background-color: rgba(0, 0, 0, 0.1);
            /* 鼠标悬停时的背景颜色 */
        }
    }

    .article {
        height: 80vh;
        background-color: #fff0da;
        padding: 1.5rem;
        font-family: system-ui, sans-serif;
        font-size: clamp(1rem, 0.33vw + 1rem, 1.3rem);

        h4 {
            text-align: center
        }

        .editorClass {
            height: 70vh !important;
            // border: 1px solid #ccc;
            overflow-y: auto;
        }
    }


}

@media (max-width: 772px) {
    .my-dialog {
        width: 90vw
    }
}
</style>