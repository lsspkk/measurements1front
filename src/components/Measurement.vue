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
        <md-button class="md-raised md-primary" @click="saveData()">Talleta</md-button>
      </md-toolbar>
      <md-toolbar md-elevation="0" v-if="saved.length > 0">
        <p v-for="(i,s) in saved" :key="'saved'+i">{{s}}</p>
        <md-list style="flex:1">
          <md-list-item>Talletettu {{ saved[0].timestamp | formatDate }}</md-list-item>
          <md-list-item :key="i +'_'+m.name" v-for="(m,i) in saved">{{ m.name }}, {{ m.value}}</md-list-item>
        </md-list>
      </md-toolbar>
    </md-content>
    <md-content v-if="errors" class="md-accent">
      <p v-for="(e,i) in errors" :key="'error'+i">{{e}}</p>
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
      saved: [],
      errors: []
    };
  },
  mounted() {
    this.loadMeasures();
  },
  methods: {
    loadMeasures() {
      Repository.getMeasures().then(data => {
        data.forEach(m => {
          m["value"] = (m.max - m.min) / 2;
        });
        this.measures = data;
      });
    },
    saveData() {
      let timestamp = new Date().toISOString();
      var promises = [];
      var responses = (this.saved = []);
      var errors = (this.errors = []);
      let data = this.measures.map(m => {
        promises.push(
          Repository.postData(m.id, m.value, timestamp).then(res =>
            responses.push(res).catch(error => {
              console.log(error);
              errors.push(error);
            })
          )
        );
      });
      Promise.all(promises).then(this.loadMeasures());
    }
  }
};
</script>

<style scoped>
.md-list {
  flex-direction: row;
}
</style>
