<template>
  <div class="home">
    <Row v-for="i in 7" :key="i - 1" :indexY="i - 1" />
  </div>
</template>

<script>
import Row from "@/components/Row";

export default {
  components: {
    Row
  }
};
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}
</style>
