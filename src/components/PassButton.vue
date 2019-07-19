<template>
  <button @click="pass">Pass</button>
</template>

<script>
export default {
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


<style lang="scss" scoped>
</style>

