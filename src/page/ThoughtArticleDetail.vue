<template>
    <el-dialog class="my-dialog" v-model="localDialogVisible" :title="article.createTime" @close="handleClose">
        <div class="article">
            <h4>{{ article.title }}</h4>
            <Editor class="editor" v-model="article.content" :mode="mode"/>
        </div>
    </el-dialog>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { Editor } from '@wangeditor/editor-for-vue'
const props = defineProps({
    dialogDetailVisible: {
        type: Boolean,
        required: true,
        default: false
    },
    article: {
        type: Object,
        required: true
    }
});

const localDialogVisible = ref(props.dialogDetailVisible)

const emits = defineEmits(['updateDialogVisible'])
function handleClose() {
    localDialogVisible.value = false; // 更新props中的值
    emits('updateDialogVisible', false)
}

</script>

<style lang="less">

.my-dialog {
    border-radius: 2px;
    box-shadow: inset 0 1px 2px -1px rgba(255, 255, 255, .5), 0 1rem 2rem 0 rgba(0, 0, 0, .4);
    width: 50vw;
    margin-top: 2rem !important;
}

.article {
    background-color: #fff0da;
    padding: 1.5rem;
    font-family: system-ui, sans-serif;
    font-size: clamp(1rem, 0.33vw + 1rem, 1.3rem);

    h4 {
        text-align: center
    }
}

.el-dialog__header {
    background-color: #f9e2c3 !important;
    color: #958879;
    padding: 0.5rem;
    font-weight: 300;
    text-transform: uppercase;
    font-size: clamp(0.75rem, 0.18vw + 0.7rem, 1rem);
}

.el-dialog {
    padding: 0;
}
@media (max-width: 772px) {
    .my-dialog {
        width: 100vw
    }
}
</style>