<!--
 * @Author: yukang 1172248038@qq.com
 * @Description: 侧边导航
 * @Date: 2020-10-09 21:45:43
 * @LastEditTime: 2020-11-19 12:11:07
-->
<template>
  <el-collapse-transition name="el-zoom-in-top">
    <ul v-show="show" class="sideNav" :style="'right:' + right + 'px'">
      <li
        v-for="(item, index) in list"
        :key="index"
        @click="hanldeClick(index)"
      >
        <i v-if="index === 1">{{ cartNum }}</i>
        <el-image :src="item"></el-image>
      </li>
    </ul>
  </el-collapse-transition>
</template>

<script>
  import { mapState } from "vuex";
  export default {
    components: {},
    data() {
      return {
        right: 34,
        show: false,
        list: [
          require("@/assets/imgs/side_nav-person.png"),
          // require("@/assets/imgs/side_nav-kefu.png"),
          require("@/assets/imgs/side_nav-cart.png"),
          require("@/assets/imgs/side_nav-go-top.png"),
        ],
      };
    },
    computed: {
      ...mapState({
        cartNum: (state) => state.cart.cartNum,
      }),
    },
    mounted() {
      window.addEventListener("scroll", this.handleScroll);
      window.addEventListener("resize", this.handleResize);
      this.handleResize();
      if (this.$store.state.user.userInfo)
        this.$store.dispatch("cart/getMyCartItem");
    },
    methods: {
      hanldeClick(e) {
        if (e === 1) {
          this.$utils.verifyLogin({
            success: async (e) => {
              this.$router.push({
                name: "Cart",
              });
            },
          });
        } else if (e === 2) {
          this.backTop();
        } else if (e === 0) {
          this.$utils.verifyLogin({
            success: async (e) => {
              this.$router.push({
                name: "Profile",
              });
            },
          });
        } else {
          this.$message("还没配置此页面", "warning");
        }
      },
      backTop() {
        document
          .querySelector(`body`)
          .scrollIntoView({ behavior: "smooth", block: "start" });
      },
      handleResize() {
        if (window.innerWidth > 1200) {
          this.right = (window.innerWidth - 1200) / 2 - 85;
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
        }
        if (scrollTop < 200 && this.show) {
          this.show = false;
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
        top: 10px;
        right: 10px;
        z-index: 9;
        width: 20px;
        height: 20px;
        font-size: 12px;
        line-height: 20px;
        color: #fff;
        text-align: center;
        background: #ff6000;
        border-radius: 50px;
      }

      .el-image {
        width: 70px;
        height: 70px;
        vertical-align: middle;
        cursor: pointer;
        opacity: 0.85;

        &:hover {
          opacity: 1;
          transition: all 0.2s;
          transform: scale(1.02);
        }
      }

      border-bottom: 1px solid #fff;

      &:last-child {
        border-bottom: 0;
      }
    }
  }
</style>
