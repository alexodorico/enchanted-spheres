<template>
  <div class="tile" @click="moveUser">
    <div v-if="black">black</div>
    <div v-if="white">white</div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  props: {
    indexX: Number,
    indexY: Number
  },
  methods: {
    moveUser() {
      this.$store.dispatch("moveIntent", {
        user: `${this.$store.state.black.priority ? "black" : "white"}`,
        coordinates: [this.indexX, this.indexY],
        name: "move"
      });
    }
  },
  computed: {
    ...mapState({
      blackPosition: state => state.black.position,
      whitePosition: state => state.white.position
    }),
    black() {
      const x = this.blackPosition[0] === this.indexX;
      const y = this.blackPosition[1] === this.indexY;
      return x && y;
    },
    white() {
      const x = this.whitePosition[0] === this.indexX;
      const y = this.whitePosition[1] === this.indexY;
      return x && y;
    }
  }
};
</script>

<style lang="scss" scoped>
.tile {
  width: 50px;
  height: 50px;
  border: 1px solid #ddd;
}
</style>

