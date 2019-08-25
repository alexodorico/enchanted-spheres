<template>
  <div id="enchanted-stones">
    <div id="game-wrapper">
      <Info :user="user" :socket="socket" :history="history" />
      <div id="grid">
        <Row v-for="i in 4" :key="i - 1" :user="user" :indexY="i - 1" :socket="socket" />
      </div>
    </div>
    <SpellList
      v-if="this.$store.state[this.$store.state.player].priority"
      :user="user"
      :socket="socket"
    />
  </div>
</template>

<script>
// change to 4x4
import Row from "@/components/Row";
import Info from "@/components/Info";
import SpellList from "@/components/SpellList";

export default {
  components: {
    Row,
    Info,
    SpellList
  },
  props: {
    socket: Object,
    history: Object
  },
  computed: {
    user: function() {
      return this.$store.state.player;
    }
  }
};
</script>
