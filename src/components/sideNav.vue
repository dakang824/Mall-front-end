<!--
 * @Author: yukang 1172248038@qq.com
 * @Description: 侧边导航
 * @Date: 2020-10-09 21:45:43
 * @LastEditTime: 2020-10-10 22:34:43
-->
<template>
  <el-collapse-transition name="el-zoom-in-top">
    <ul v-show="show" class="sideNav" :style="'right:' + right + 'px'">
      <li
        v-for="(item, index) in list"
        :key="index"
        @click="hanldeClick(index)"
      >
        <i v-if="index === 2">3</i>
        <el-image :src="item"></el-image>
      </li>
    </ul>
  </el-collapse-transition>
</template>

<script>
  export default {
    components: {},
    data() {
      return {
        right: 34,
        show: false,
        list: [
          require("@/assets/imgs/side_nav-person.png"),
          require("@/assets/imgs/side_nav-kefu.png"),
          require("@/assets/imgs/side_nav-cart.png"),
          require("@/assets/imgs/side_nav-go-top.png"),
        ],
      };
    },
    mounted() {
      window.addEventListener("scroll", this.handleScroll);
      window.addEventListener("resize", this.handleResize);
      this.handleResize();
    },
    methods: {
      hanldeClick(e) {
        if (e === 2) {
          this.$router.push({
            name: "Cart",
          });
        } else if (e === 3) {
          this.backTop();
        } else {
          this.$message("还没配置此页面", "warning");
        }
      },
      backTop() {
        let back = setInterval(() => {
          if (document.body.scrollTop || document.documentElement.scrollTop) {
            document.body.scrollTop -= 15;
            document.documentElement.scrollTop -= 15;
          } else {
            clearInterval(back);
          }
        });
      },
      handleResize() {
        if (window.innerWidth > 1614) {
          this.right = (window.innerWidth - 1614) / 2 - 120;
        } else {
          this.right = 34;
        }
      },
      handleScroll(e) {
        const scrollTop =
          window.pageYOffset ||
          document.documentElement.scrollTop ||
          document.body.scrollTop;
        if (scrollTop > 200 && !this.show) {
          this.show = true;
          console.log(2);
        }
        if (scrollTop < 200 && this.show) {
          this.show = false;
          console.log(1);
        }
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/settings";
  .sideNav {
    position: fixed;
    right: 34px;
    bottom: 150px;
    margin: auto;
    li {
      position: relative;
      i {
        position: absolute;
        top: 18px;
        right: 18px;
        z-index: 9;
        width: 27px;
        height: 27px;
        background: #ffea00;
        text-align: center;
        line-height: 30px;
        border-radius: 50px;
      }
      .el-image {
        vertical-align: middle;
        cursor: pointer;
        opacity: 0.85;
        &:hover {
          opacity: 1;
          transform: scale(1.02);
          transition: all 0.2s;
        }
      }
      border-bottom: 1px solid #fff;
      &:last-child {
        border-bottom: 0;
      }
    }
  }
</style>
