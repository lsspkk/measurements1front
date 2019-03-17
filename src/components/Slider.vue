<template>
  <div>
    <input
      type="range"
      :min="measure.min"
      :max="measure.max"
      v-bind:value="measure.value"
      @input="$emit('input', $event.target.value)"
    >
    {{ measure.name }} : {{ measure.value }}
  </div>
</template>

<script>
export default {
  props: [ 'measure' ]
}
</script>

