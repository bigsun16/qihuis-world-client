<template>
  <RouterView />
</template>

<style lang="less">

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

@font-face {
  font-family: "Quirque";
  src: url(/fonts/QuirqueVF.woff2)format("woff2-variations");
  font-weight: 125 950;
  font-stretch: 75% 125%;
  font-style: normal
}

li {
  list-style-type: none;
}

a {
  text-decoration: none !important;
  /* color: #fff; */
}
</style>
