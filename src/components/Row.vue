<template>
  <div class="row">
    <Tile
      v-for="i in 5"
      :key="i - 1"
      :indexY="indexY"
      :user="user"
      :indexX="i - 1"
      :socket="socket"
    />
  </div>
</template>

<script>
import Tile from "./Tile";
// change to 4x4

export default {
  components: {
    Tile
  },
  props: {
    indexY: Number,
    user: String,
    socket: Object
  }
};
</script>
