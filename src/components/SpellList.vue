<template>
  <div id="spell-section">
    <h2>spells</h2>
    <div class="spell-wrapper">
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
    user: String,
    socket: Object
  },
  methods: {
    playSpell(e) {
      this.$store.dispatch("spellIntent", {
        name: e.target.getAttribute("name"),
        user: this.user
      });

      this.socket.emit("action", {
        action: "spellIntent",
        payload: {
          name: e.target.getAttribute("name"),
          user: this.user
        }
      });
    }
  }
};
</script>
