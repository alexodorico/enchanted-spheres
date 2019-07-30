<template>
  <div id="recent-play">{{ history.payload.user }}: {{ history.payload.name || "pass" }}</div>
</template>

<script>
export default {
  props: {
    history: Object
  }
};
</script>
