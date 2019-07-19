<template>
  <div id="spell-wrapper">
    <h2>Spells</h2>
    <div id="button-wrapper">
      <button
        v-for="(spell, i) in this.$store.state[this.user].hand"
        @click="playSpell"
        :key="i"
        :name="spell.name"
      >{{ spell.pretty }}</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    user: String
  },
  methods: {
    playSpell(e) {
      this.$store.dispatch("spellIntent", {
        name: e.target.getAttribute("name"),
        user: this.user
      });
    }
  }
};
</script>

<style lang="scss" scoped>
#spell-wrapper {
  margin-left: 2em;
}

h2 {
  text-align: center;
}

#button-wrapper {
  display: flex;
  flex-direction: column;
}

button {
  height: 34.5px;
  margin-top: 7px;
  font-size: 12px;
  background: transparent;
}
</style>

