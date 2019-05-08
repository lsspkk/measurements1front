<template>
  <div>
    <md-content>
    <h1>Here's measurement settings</h1>
    </md-content>
    
    <md-content >
      <div v-for="row in data" :key="row.id">
        {{ row }}
      </div>
    </md-content>
  </div>
</template>

<script>

import Repository from "../Repository";
export default {
  name: 'Settings',
  props: {
    user: String
  },
  data() {
    return {
      data: [],
      chartdata: null,
    };
  },
  mounted() {
    this.loadMeasure();
  },
  methods: {
    loadMeasure() {
      let data = this.data;
      Repository.getMeasures().then(data => this.data = data);
    },
  }
};
</script>

