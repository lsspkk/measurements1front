<template>
  <md-card>
    <md-card-header>{{ measure.name }} : {{ measure.value }}</md-card-header>
    <input
      type="range"
      :min="measure.min"
      :max="measure.max"
      v-bind:value="measure.value"
      @input="$emit('input', $event.target.value)"
    >
  </md-card>
</template>

<script>
export default {
  props: ["measure"]
};
</script>

<style lang="css" scoped>
.md-card {
  margin: 10px 0;
}
</style>

