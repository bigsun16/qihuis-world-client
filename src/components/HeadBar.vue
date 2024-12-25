<template>
    <div id="headBar">
        <nav class="navbar navbar-dark bg-dark fixed-top">
            <div class="container-fluid">
                <div class="homeImg">
                    <div>
                        <a class="navbar-brand" href="/">
                            <img class="logoImg" src="/tree5.png" alt="">
                        </a>
                    </div>
                    <div>
                        <a class="nav-name" aria-label="Wish Tree" href="/">
                            <span>w</span><span>i</span><span>s</span><span>h</span>&nbsp;<span>T</span><span>r</span><span>e</span><span>e</span>
                        </a>
                    </div>
                </div>
                <a @click="addArticle" >
                    <i style="font-size: 2rem; color: orange;" class="bi bi-plus-circle" title="写文章"></i>
                </a>
                <a style="color: white;" @click="dialogLoginVisible = true">登录</a>
                <a style="color: white;" @click="logout">注销</a>
                <span style="color: white;">{{currentUser}}</span>>
                <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="offcanvas offcanvas-end text-bg-dark" tabindex="-1" id="offcanvasDarkNavbar"
                    aria-labelledby="offcanvasDarkNavbarLabel">
                    <div class="offcanvas-header">
                        <h5 class="nav-item offcanvas-title" id="offcanvasDarkNavbarLabel">
                            <a class="nav-link" href="/">首页</a>
                        </h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas"
                            aria-label="Close"></button>
                    </div>
                    <div class="offcanvas-body">
                        <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
                            <li class="nav-item" v-for="hobby in store.menuList" :key="hobby.id">
                                <a class="nav-link" :href="'/wish/' + hobby.categoryKey">{{ hobby.categoryName }}</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    </div>
    <LoginPage v-model="dialogLoginVisible" @update:dialogLoginVisible="dialogLoginVisible = $event"
    @update:currentUser="currentUser = $event"></LoginPage>
</template>

<script setup>
import LoginPage from '@/page/LoginPage.vue';
import { ref, onMounted } from 'vue';
import { doLogout } from '@/api/request';
import router from '@/router';
import { useMenuBarStore } from '@/store/PiniaStore'
const currentUser = ref('')

const store = useMenuBarStore()
const dialogLoginVisible = ref(false)

onMounted(() => {
    const loginInfo = sessionStorage.getItem('login_info')
    if (loginInfo) {
        currentUser.value = JSON.parse(loginInfo).username
    }
})

function addArticle() {
    let loginInfo = sessionStorage.getItem('login_info')
    if (loginInfo) {
        router.push('/wish/addArticlePage?type=add')
    } else {
        dialogLoginVisible.value = true
    }
}
function logout() {
    doLogout().then(() => {
        sessionStorage.clear();
        currentUser.value = ''
        router.go(0)
    })
}

</script>

<style lang="less" scoped>
@font-family-mono: ui-monospace, "Cascadia Code", "Source Code Pro", Menlo, Consolas, "DejaVu Sans Mono", monospace;
@font-size-sm: clamp(0.75rem, 0.18vw + 0.7rem, 1rem);
@orange: oklch(0.77 0.2 59.5);
@paper-highlight: hsl(35deg 70% 75%);
@ink-hsl: 30deg 11% 35%;
@font-size-md: clamp(1.25rem, 0.5vw + 1.2rem, 1.75rem);

#headBar {
    height: 10vh;
}

.navbar {
    height: 10vh;
    padding: 10px 0;

    .container-fluid {
        padding-right: calc(var(--bs-gutter-x)* 1.5);
        padding-left: calc(var(--bs-gutter-x)* 1.5);
    }

    .navbar-toggler {
        box-shadow: 0 0 0 0.15rem;
    }

    .homeImg {
        display: flex;
        justify-items: center;
        align-items: center;

        .navbar-brand {
            padding: 0;
        }

        .logoImg {
            height: 40px;
            filter: grayscale(100%) invert(100%) hue-rotate(30deg);
        }
    }

    .nav-name {
        // font-family: @font-family-mono;
        font-family: "Quirque", system-ui, monospace, sans-serif;
        font-size: @font-size-md;
        text-transform: uppercase;
        color: @orange !important;
        font-variation-settings: "BEND" 0;
        letter-spacing: -0.05rem;

        >span {
            line-height: 40px !important;
            display: inline-block;
            transition: 0.1s cubic-bezier(0.6, 0.04, 0.98, 0.335);
            color: @orange !important;
            transform: scaleX(-1) rotate(0deg);
            // rotate: -8deg;
        }

        &:hover,
        &:focus {
            >span {
                // rotate: 0deg !important;
                transform: none !important;
                // color: hsl(50deg 100% 0%) !important;
            }
        }
    }


    .nav-item {
        @media (-webkit-min-device-pixel-ratio: 0) and (min-resolution: 0.001dpcm) {

            .nav-link,
            .nav-link:hover {
                .amazingcolor;
            }
        }

        &:hover {
            background-color: rgba(155, 157, 158, 0.1) !important;
        }
    }

}

.amazingcolor() {
    background-image: -webkit-linear-gradient(left, #cddc39, #ff9800 25%, #cddc39 50%, #ff9800 75%, #cddc39) !important;
    -webkit-text-fill-color: transparent !important;
    -webkit-background-clip: text !important;
    background-clip: text !important;
    -webkit-background-size: 200% 100% !important;
    background-size: 200% 100% !important;
    -webkit-animation: masked-animation 2s infinite linear !important;
    animation: masked-animation 2s infinite linear !important;

    @keyframes masked-animation {
        from {
            background-position-x: 0%;
        }

        to {
            background-position-x: 100%;
        }
    }

}
</style>