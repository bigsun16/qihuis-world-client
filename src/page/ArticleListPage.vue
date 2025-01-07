<template>
    <div class="radioGroup">
        <el-radio-group v-model="pageReq.selectType">
            <el-radio value="ALL">全部文章</el-radio>
            <el-radio value="MINE">自己文章</el-radio>
            <el-radio value="OTHERS">他人文章</el-radio>
        </el-radio-group>
    </div>
    <el-scrollbar class="myTimeLine">
        <el-timeline v-infinite-scroll="load" :infinite-scroll-disabled="disabled" infinite-scroll-immediate="true"
            infinite-scroll-distance="1">
            <el-timeline-item :timestamp="article.createTime" placement="top" v-for="(article, index) in articles"
                :key="index">
                <el-card class="myTimecard" @click="openArticleDetail(article)">
                    <h4>{{ article.title }}</h4>
                    <p class="articleText">{{ article.previewText }}</p>
                </el-card>
            </el-timeline-item>
            <div class="loadInfo">
                <p v-if="loading">Loading...</p>
                <p v-if="noMore">No more</p>
            </div>
        </el-timeline>
    </el-scrollbar>
    <ArticleDetail :article="thisArticle" v-model="dialogDetailVisible"
        @update:dialogDetailVisible="dialogDetailVisible = $event"></ArticleDetail>
</template>

<script setup>
import ArticleDetail from './ArticleDetail.vue'
import { ref, onMounted, computed, reactive, watch } from 'vue';
import { requestArticleList } from '@/api/request';
import { useRoute } from 'vue-router';

const route = useRoute()
let articles = ref([]);
const loading = ref(false);
const noMore = computed(() => pageReq.value.current >= totalPages.value);
const disabled = computed(() => loading.value || noMore.value);
const totalPages = ref(0)

const articleCategory = computed(() => {
    const currentPath = route.path
    return currentPath.substring(currentPath.lastIndexOf('/') + 1)
})

const pageReq = ref({
    current: 1,
    size: 4,
    paramValue: articleCategory.value,
    selectType: 'ALL'
});
onMounted(() => {
    selectPageData()
});
watch(() => pageReq.value.selectType, () => {
    articles.value = []
    pageReq.value.current = 1
    selectPageData()
})
const load = () => {
    if (pageReq.value.current >= totalPages.value) {
        return;
    } else {
        pageReq.value.current++
        selectPageData()
    }
};
function selectPageData() {
    loading.value = true;
    requestArticleList(pageReq.value).then(response => {
        if (response.code === 200) {
            totalPages.value = response.data.pages
            articles.value.push(...response.data.records);
        }
        loading.value = false;
    })
}


let thisArticle = reactive({})
const dialogDetailVisible = ref(false)
function openArticleDetail(article) {
    dialogDetailVisible.value = true
    thisArticle = { ...article }
}

</script>

<style lang="less" scoped>
.radioGroup {
    display: flex;
    justify-content: center;
    margin: 0 auto;
}

.myTimeLine {
    max-width: 600px !important;
    height: 75vh;
    margin: 5vh auto 0 auto;

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
