<template>
  <button @click="pass">Pass for {{ this.user }}</button>
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
button {
  margin: 1rem 2rem;
  height: 50px;
  width: 100px;
  font-size: 16px;
  background-color: transparent;
}
</style>

