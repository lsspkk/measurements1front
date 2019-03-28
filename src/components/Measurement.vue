<template>
  <div>
    <md-toolbar>
      <h3 class="md-title" style="flex: 1">Uusi mittaus</h3>
    </md-toolbar>
    <md-content>
      <p v-if="measures.length == 0">Lisää mittari</p>
      <mea-slider
        v-for="m in measures"
        v-bind:key="m.name"
        v-bind:measure="m"
        v-on:input="m.value = $event"
      ></mea-slider>

      <md-toolbar>
        <md-button class="md-raised md-primary" @click="saveMeasures()">Talleta</md-button>
      </md-toolbar>
      <md-toolbar md-elevation="0" v-if="saved.length > 0">
        <md-list style="flex:1">
          <md-list-item>Talletettu {{ saved[0].timestamp | formatDate }}</md-list-item>
          <md-list-item :key="i +'_'+m.name" v-for="(m,i) in saved">{{ m.name }}, {{ m.value}}</md-list-item>
        </md-list>
      </md-toolbar>
    </md-content>
  </div>
</template>

<script>
import Slider from "./Slider.vue";
import moment from "moment";
import Repository from "../Repository";

export default {
  name: "Measurement",
  filters: {
    formatDate(value) {
      if (value) {
        return moment(String(value)).format("DD.MM. hh:mm");
      }
    }
  },
  components: {
    "mea-slider": Slider
  },
  data() {
    return {
      measures: [],
      saved: {}
    };
  },
  mounted() {
    this.loadMeasures();
  },
  methods: {
    loadMeasures() {
      let data = Repository.getMeasures();
      data.forEach(m => {
        m["value"] = (m.max - m.min) / 2;
      });
      this.measures = data;
    },
    saveMeasures() {
      let timestamp = new Date().toISOString();
      let data = this.measures.map(m => {
        return {
          id: m.id,
          name: m.name,
          value: m.value,
          timestamp: timestamp
        };
      });
      this.saved = data;
      this.loadMeasures();
    }
  }
};
</script>

<style scoped>
.md-list {
  flex-direction: row;
}
</style>
