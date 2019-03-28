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
    this.showChart();
  },
  methods: {
    loadStatistics() {
      let data = Repository.getMeasures();
      data.forEach(m => {
        m["values"] = Repository.getData(m.id);
      });
      this.data = data;
    },
    showChart() {
      var colors = ["#ad6", "#a6d", "#6ad"];
      var datasets = [];
      this.data.forEach(measure => {
        datasets.push({
          label: measure.name,
          borderColor: colors[0],
          backgroundColor: "transparent",
          data: measure.values.map(v => {
            return { x: v.timestamp, y: v.value };
          })
        });
        colors.splice(0, 1);
      });
      this.chartdata = { datasets: datasets };
    }
  }
};
</script>

