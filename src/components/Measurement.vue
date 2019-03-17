<template>
  <div>
    <md-toolbar>
      <h3 class="md-title" style="flex: 1">Uusi mittaus</h3>
        <md-button class="md-raised md-primary" @click="saveMeasures()">Talleta</md-button>
    </md-toolbar>
    <md-content>
      <p v-if="measures.length == 0">Lisää mittari</p>
    <mea-slider
      v-for="m in measures"
      v-bind:key="m.name"
      v-bind:measure="m"
      v-on:input="m.value = $event"
    ></mea-slider>
    <ul>
      <li :key="i +'_'+m.name" v-for="(m,i) in measures">{{ m.name }}, {{ m.value}}</li>
    </ul>
    <h3 v-if="timestamp">Talletettu {{ timestamp | formatDate }}</h3>
    </md-content>
  </div>
</template>

<script>
import Slider from "../components/Slider.vue";
import moment from 'moment'



export default {
  name: "Measurement",
  filters: {
    'formatDate'(value) { 
      if(value) { 
      return moment(String(value)).format('DD.MM. hh:mm')
      }
    }
  },
  components: {
    "mea-slider": Slider
  },
  data() {
    return {
      measures: [],
      timestamp: ''
    };
  },
  mounted() {
    this.loadMeasures();
  },
  methods: {
    loadMeasures() {
      this.measures = [
        { id: "0", name: "Mood", type: "slider", min: 0, max: 100, value: 50 },
        { id: "1", name: "Energy", type: "slider", min: 0, max: 100, value: 50 }
      ];
      /*
      this.axios.get('/measures', {withCredentials:true}).then((res) => {
        console.log('/measures ==>\n', res.data)
        this.measures = res.data
      })
      */
    },
    saveMeasures() {
      this.timestamp = new Date().toISOString();
      console.log(this.timestamp, this.measures)
      this.loadMeasures()
    }
  }
};
</script>

