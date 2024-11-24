<template>

    <div class="container">
        <div class="cardsTitle">
            <h2>追求源于热爱</h2>
        </div>
        <div class="row cards">
            <div class="card col-lg-3 col-md-6" v-for="hobby in store.menuList" :key="hobby.id"
                @click="gotoPage(hobby.categoryKey)">
                <div class="cardTitle card-header">{{ hobby.categoryName }}</div>
                <img class="cardImg" :src="hobby.thumbImg">

                </img>
            </div>
        </div>
    </div>

</template>

<script setup>
import router from '@/router';
import { useMenuBarStore } from '@/store/PiniaStore';

const store = useMenuBarStore()

function gotoPage(hobbyKey) {
    router.push("/wish/" + hobbyKey)
}


</script>

<style lang="less" scoped>
.cardsTitle {
    margin: 60px auto;
    text-align: center;
}

.cards {
    text-align: center;

    .card {
        --bs-card-border-color: unset !important;
        margin-bottom: 20px;

        .cardImg {
            height: 250px;
            width: 250px;
            margin: 0 auto;
            border-radius: 4px;
        }

        .cardTitle {
            color: black;
        }
    }

    .card:hover {
        box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
        transform: translate3d(0, -2px, 0);
    }
}
</style>