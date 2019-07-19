<template>
  <div class="home">
    <Row v-for="i in 7" :key="i - 1" :indexY="i - 1"/>
    <Controls :user="this.$store.state.white.priority ? 'white' : 'black'"/>
  </div>
</template>

<script>
import Row from "@/components/Row";
import Controls from "@/components/Controls";

export default {
  components: {
    Row,
    Controls
  }
};
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}
</style>
