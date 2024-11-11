<template>
    <el-timeline class="myTimeLine" v-infinite-scroll="load" :infinite-scroll-disabled="disabled">
        <el-timeline-item :timestamp="article.createTime" placement="top" v-for="(article, index) in articles"
            :key="index">
            <el-card class="myTimecard" @click="openArticleDetail(article)">
                <h4>{{ article.title }}</h4>
                <p class="articleText">{{ article.content }}</p>
            </el-card>
        </el-timeline-item>
        <div class="loadInfo">
            <p v-if="loading">Loading...</p>
            <p v-if="noMore">No more</p>
        </div>
    </el-timeline>
    <ThoughtArticleDetail :dialog-detail-visible="dialogDetailVisible" :article="thisArticle"
        v-model="dialogDetailVisible"></ThoughtArticleDetail>
</template>

<script setup>
import ThoughtArticleDetail from './ThoughtArticleDetail.vue'
import { ref, onMounted, computed, reactive } from 'vue';
import { requestArticleList } from '@/api/request';
import { useRoute } from 'vue-router';

let articles = ref([]);
const route = useRoute()

const currentPath = computed(() => route.path)
const sonPath = currentPath.value.substring(currentPath.value.lastIndexOf('/') + 1)
onMounted(
    async () => {
        const response = await requestArticleList(sonPath)
        console.log('###', response.data)
        articles.value = response.data
    }
);

let thisArticle = reactive({})
const dialogDetailVisible = ref(false);
const count = ref(10)
const loading = ref(false)
const noMore = computed(() => count.value >= 20)
const disabled = computed(() => loading.value || noMore.value)
const load = () => {
    loading.value = true
    setTimeout(() => {
        count.value = 21
        loading.value = false
    }, 2000)
}

function openArticleDetail(article) {
    dialogDetailVisible.value = true
    thisArticle = { ...article }
}
</script>

<style lang="less" scoped>
.myTimeLine {
    max-width: 600px !important;
    height: 100vh;
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
