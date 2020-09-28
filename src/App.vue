<template>
  <div id="app">
    <router-view class="main"></router-view>
  </div>
</template>

<style lang="scss" rel="stylesheet/scss">
  @import "assets/scss/base.scss";
  #app {
    height: 100%;
  }
  .main {
    background: #ededed;
  }
</style>
