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
    setSocket: function(connection) {
      this.socket = connection;
    }
  }
}
</script>
<style lang="scss">
</style>
