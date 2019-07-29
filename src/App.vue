<template>
  <div id="app">
    <router-view @socket-connection="setSocket" :socket="socket"/>
  </div>
</template>
<script>
export default {
  data() {
    return {
      socket: new Object()
    }
  },
  methods: {
    setSocket: function(socket) {
      this.socket = socket;
    }
  }
}
</script>
<style lang="scss">
</style>
