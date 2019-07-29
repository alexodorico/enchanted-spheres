<template>
  <div id="enchanted-stones">
    <div id="game-wrapper">
      <Info :user="user" :socket="socket"/>
      <div id="grid">
        <Row v-for="i in 5" :key="i - 1" :user="user" :indexY="i - 1" :socket="socket"/>
      </div>
    </div>
    <SpellList :user="user" :socket="socket"/>
  </div>
</template>

<script>
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
    socket: Object
  },
  computed: {
    user: function() {
      return this.$store.state.player;
    }
  }
};
</script>
