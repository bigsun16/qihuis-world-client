<template>
    <HeadBar></HeadBar>
    <div class="grameLayout bgClass">
        <div class="left">
            <figure class="myInfo">
                <img class="myavatar" src="/boy.png" alt="靓仔照片">
                <figcaption>注意看，这个男人叫小帅</figcaption>
                <span>
                    {{ introduce }}
                </span>
            </figure>
        </div>
        <div class="content">
            <router-view />
        </div>
    </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { ref, computed } from 'vue';
import HeadBar from '../components/HeadBar.vue';

const route = useRoute()
let introduce = "这是简介这是简介这是简介这是简介这是简介"
const currentPath = computed(() => route.path)
const pageName = currentPath.value.substring(currentPath.value.lastIndexOf('/') + 1)
introduce = '这是简介这是简介这是简介这是简介这是简介' + pageName
// switch (pageName) {
//     case 'thoughtPage':
//         introduce = '这是简介这是简介这是简介这是简介这是简介'+pageName
//         break
//     case 'addArticlePage':
//         introduce = '这是简介这是简介这是简介这是简介这是简介addArticlePage'
//         break
//     default:
//         introduce = '这是简介这是简介这是简介这是简介这是简介'
//         break
// }


</script>

<style lang="less" scoped>
.bgClass {
    background-color: #ffeed6;
    height: 90vh;
}

.grameLayout {
    display: flex;

    .left {
        margin-top: 5vh;
        width: 20vw;

        .myInfo {
            margin-left: 3vh;
            margin-right: 3vh;
            text-align: center;

            .myavatar {
                max-width: 100%;
            }
        }
    }

    .content {
        margin-top: 5vh;
        width: 100%;
    }

    @media (max-width: 992px) {
        .left {
            display: none;
        }
    }

    @media (min-width: 992px) {
        .left {
            width: 20vw;
        }
    }

    @media (min-width: 1200px) {
        .left {
            width: 20vw;
        }
    }
}
</style>