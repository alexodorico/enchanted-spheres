<template>
  <div class="row">
    <Tile v-for="i in 7" :key="i - 1" :indexY="indexY" :user="user" :indexX="i - 1"/>
  </div>
</template>

<script>
import Tile from "./Tile";

export default {
  components: {
    Tile
  },
  props: {
    indexY: Number,
    user: String
  }
};
</script>

<style lang="scss" scoped>
.row {
  display: flex;
}
</style>


