<template>
    <el-timeline>
        <el-scrollbar class="myTimeLine" style="overflow: auto">
            <el-timeline-item :timestamp="article.createTime" placement="top" v-for="(article, index) in articles"
                :key="index">
                <el-card class="myTimecard" @click="openArticleDetail(article)">
                    <h4>{{ article.title }}</h4>
                    <p class="articleText">{{ article.previewText }}</p>
                </el-card>
            </el-timeline-item>
        </el-scrollbar>

    </el-timeline>
    <ArticleDetail :article="thisArticle" v-model="dialogDetailVisible"
        @update:dialogDetailVisible="dialogDetailVisible = $event"></ArticleDetail>
</template>

<script setup>
import ArticleDetail from './ArticleDetail.vue'
import { ref, onMounted, computed, reactive } from 'vue';
import { requestArticleList } from '@/api/request';
import { useRoute } from 'vue-router';

let articles = ref([]);
const route = useRoute()

const currentPath = computed(() => route.path)
const pageName = currentPath.value.substring(currentPath.value.lastIndexOf('/') + 1)
onMounted(
    async () => {
        const response = await requestArticleList(pageName)
        articles.value = response.data
    }
);

let thisArticle = reactive({})
const dialogDetailVisible = ref(false)

function openArticleDetail(article) {
    dialogDetailVisible.value = true
    thisArticle = { ...article }
}
</script>

<style lang="less" scoped>
.myTimeLine {
    max-width: 600px !important;
    height: 80vh;
    margin: 0 auto;

    .myTimecard {
        background-color: #fff0da;

        .articleText {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

    }

    .loadInfo {
        text-align: center
    }
}

@media (max-width: 772px) {
    .myTimeLine {
        width: 80vw
    }
}
</style>
