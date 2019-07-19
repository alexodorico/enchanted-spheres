<template>
  <div>
    <Row v-for="i in 7" :key="i - 1" :user="user" :indexY="i - 1"/>
    <Controls :user="user"/>
  </div>
</template>

<script>
import Row from "@/components/Row";
import Controls from "@/components/Controls";

export default {
  components: {
    Row,
    Controls
  },
  computed: {
    user: function() {
      return this.$store.state.white.priority ? "white" : "black";
    }
  }
};
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}
</style>
