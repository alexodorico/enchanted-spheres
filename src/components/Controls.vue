<template>
  <div>
    <h1>Turn: {{this.$store.state.black.turn ? "black" : "white"}}</h1>
    <h2>Priority: {{ user }}</h2>
    <h3>Black health: {{ this.$store.state.black.health }}</h3>
    <h3>White health: {{ this.$store.state.white.health }}</h3>
    <PassButton :user="user"/>
    <SpellList :user="user"/>
  </div>
</template>

<script>
import SpellList from "./SpellList";
import PassButton from "./PassButton";

export default {
  components: {
    SpellList,
    PassButton
  },
  props: {
    user: String
  },
  methods: {
    pass() {
      this.$store.dispatch("passPriority", { user: this.user });
    }
  }
};
</script>

