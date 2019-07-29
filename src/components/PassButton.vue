<template>
  <button @click="pass">PASS</button>
</template>

<script>
export default {
  props: {
    user: String,
    socket: Object
  },
  methods: {
    pass() {
      this.$store.dispatch("passPriority", { user: this.user });

      this.socket.emit("action", {
        action: "passPriority",
        payload: { user: this.user }
      });
    }
  }
};
</script>
