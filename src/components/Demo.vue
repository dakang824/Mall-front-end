<template>
  <div>
    <div class="hello">
      <h1>{{ accessToken }}</h1>
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
        default: "",
      },
    },
    computed: {
      ...mapGetters({
        accessToken: "user/accessToken",
      }),
    },
    created() {},
  };
</script>

<style scoped></style>
