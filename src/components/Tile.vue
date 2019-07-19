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
    user: String
  },
  methods: {
    userMove() {
      this.$store.dispatch("moveIntent", {
        user: `${this.$store.state.black.priority ? "black" : "white"}`,
        coordinates: [this.indexX, this.indexY],
        name: "move"
      });
    },
    userAttack() {
      this.$store.dispatch("attackIntent", {
        user: `${this.$store.state.black.priority ? "black" : "white"}`,
        name: "attack"
      });
    },
    handleClick() {
      const isValidMove = this.checkForValidMove();
      const isAttack = this.checkForAttack();

      if (isValidMove) {
        if (isAttack) {
          this.userAttack();
        } else {
          this.userMove();
        }
      }

      return false;
    },
    checkForAttack() {
      const r = [this.indexX, this.indexY]; // requested position
      const opponent = this.$store.state.black.turn ? "white" : "black";

      if (
        r[0] === this.$store.state[opponent].position[0] &&
        r[1] === this.$store.state[opponent].position[1]
      ) {
        return true;
      }

      return false;
    },
    checkForValidMove() {
      const r = [this.indexX, this.indexY]; // requested position
      const c = this.$store.state[this.user].position; // current position
      const d = [Math.abs(c[0] - r[0]), Math.abs(c[1] - r[1])]; // distance requested
      const onBoard = r[0] <= 6 && r[1] <= 6 && (r[0] >= 0 && r[1] >= 0); // within 7x7 grid
      const validMove = (d[0] == 1 && d[1] == 0) || (d[0] == 0 && d[1] == 1); // Not diagonal and one space

      if (onBoard && validMove) {
        return true;
      }

      return false;
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
$tile-size: 80px;

.tile {
  width: $tile-size;
  height: $tile-size;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
  border-radius: 50%;
  margin: 0.25em;
}

.player {
  position: relative;
  top: $tile-size * (0.4 / 2);
  left: $tile-size * (0.4 / 2);
  width: $tile-size * 0.6;
  height: $tile-size * 0.6;
  border-radius: 50%;
}

.black {
  background-color: #000;
}

.white {
  border: 2px solid black;
}
</style>

