<template>
  <div>
    <div class="hello">
      <h1>{{ msg }}</h1>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Demo",
  props: {
    msg: {
      type: String,
      default: ""
    }
  },
  computed: {
    ...mapGetters({
      accessToken: "user/accessToken"
    })
  },
  created() {
    var i = "1";
    if (1 == i) {
      console.log(this.accessToken);
    }
  }
};
</script>

<style scoped></style>
