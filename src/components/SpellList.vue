<template>
  <div>
    <h3>spells</h3>
    <div>
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

