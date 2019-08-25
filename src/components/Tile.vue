<template>
  <div class="tile" @click="handleClick">
    <div v-if="black" class="player black"></div>
    <div v-if="white" class="player white"></div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  props: {
    indexX: Number,
    indexY: Number,
    user: String,
    socket: Object
  },
  // data() {
  //   return {
  //     // MOVE THIS TO STORE
  //     // users can't attack from the same space twice
  //     moveSelected: false
  //   };
  // },
  methods: {
    handleClick() {
      if (
        !this.$store.state.moveSelected &&
        this.$store.state[this.$store.state.player].priority
      ) {
        const isValidMove = this.checkForValidMove();

        if (isValidMove) {
          return this.declareIntent();
        }
      }

      return false;
    },
    checkForValidMove() {
      const r = [this.indexX, this.indexY]; // requested position
      const c = this.$store.state[this.blackPriority ? "black" : "white"]
        .position; // current position
      const d = [Math.abs(c[0] - r[0]), Math.abs(c[1] - r[1])]; // distance requested
      const onBoard = r[0] <= 3 && r[1] <= 3 && (r[0] >= 0 && r[1] >= 0); // within 7x7 grid
      const validMove = (d[0] == 1 && d[1] == 0) || (d[0] == 0 && d[1] == 1); // Not diagonal and one space

      if (onBoard && validMove) {
        return true;
      }

      return false;
    },
    declareIntent() {
      const payload = {
        user: `${this.blackPriority ? "black" : "white"}`,
        coordinates: [this.indexX, this.indexY],
        name: "moveOrAttack"
      };

      this.$store.commit("selectMove");
      this.$store.dispatch("moveOrAttackIntent", { ...payload });

      this.socket.emit("action", {
        action: "moveOrAttackIntent",
        payload
      });
    }
  },
  computed: {
    ...mapState({
      blackPosition: state => state.black.position,
      whitePosition: state => state.white.position,
      blackPriority: state => state.black.priority
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
