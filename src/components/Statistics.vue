<template>
  <div>
    <md-content>
      <h1>Statistics</h1>
    </md-content>
    <md-content>
      <line-chart v-if="chartdata" :chartData="chartdata" :options="options"></line-chart>
    </md-content>
    <md-content>
      <div v-for="measure in data" :key="measure.id">
        { label : "{{measure.name}}"",
        data: [
        <div
          v-for="(value,i) in measure.values"
          :key="measure.id + i"
        >{ x: {{ value.timestamp }}, y: {{ value.value }} },</div>]},
        <br>
      </div>
    </md-content>
  </div>
</template>

<script>
import Repository from "../Repository";
import LineChart from "./LineChart.vue";

export default {
  name: "Statistics",
  components: {
    "line-chart": LineChart
  },
  data() {
    return {
      data: [],
      chartdata: null,
      options: {
        scales: {
          xAxes: [
            {
              type: "time",
              distribution: "linear",
              time: {
                displayFormats: { day: "DD.MM." },
                unit: "day"
                // min: "2019-03-20T17:26:25.912Z",
                // max: "2019-03-29T17:26:25.912Z",
              }
            }
          ],
          yAxes: [{ ticks: { min: 0, max: 100 } }]
        }
      }
    };
  },
  mounted() {
    
    this.loadStatistics();
  },
  methods: {
    loadStatistics() {
      var promises = []
      var measureCall = Repository.getMeasures();
      promises.push(measureCall);
      measureCall.then(result => {
        result.forEach(m => {
          var dataCall = Repository.getData(m.id);
          promises.push(dataCall);
          dataCall.then(values => {
            m["values"] = values;
          })
        })
        Promise.all(promises).then(mv => this.showChart(mv[0]));
      })
    },
    async loadMeasures() {
      let result = await Repository.getMeasures();
      return result;
    },
    async loadValues(id) {
      return await Repository.getData(id);
    },
    showChart(mv) {
      this.data = mv;
      console.log(this.data)
      var colors = ["#ad6", "#a6d", "#6ad"];
      var datasets = [];
      for(var i=0; i < mv.length; i++ ) {
        var measure = mv[i];
        datasets.push({
          label: measure.name,
          borderColor: colors[0],
          data: measure.values.map(v => ({ x:v.timestamp, y:v.value}))
        });
          
        colors.splice(0, 1);
      }
      console.log(datasets );
      this.chartdata = { datasets: datasets };
    }
  }
};
</script>

