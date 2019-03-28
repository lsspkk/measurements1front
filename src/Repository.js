// import axios from 'axios'
import moment from 'moment'

export default {
  getMeasures () {
    let measures = [
      { id: '0', name: 'Mood', type: 'slider', min: 0, max: 100 },
      { id: '1', name: 'Energy', type: 'slider', min: 0, max: 100 }
    ]
    /*
    axios.get('/measures', {withCredentials:true}).then((res) => {
      console.log('/measures ==>\n', res.data)
      .measures = res.data
    })
    */
    return measures
  },

  getData (measureId) {
    var d = new Date()
    var values = [20, 40, 50, 20, 80, 50]
    if (measureId === '1') {
      values = [60, 40, 50, 10, 70, 60]
    }
    var data = []
    for (var i = 0; i < values.length; i++) {
      d.setDate(d.getDate() - 1)
      data[i] = ({ 'timestamp': moment(d.toISOString(), 'YYYY-MM-DDTHH:mm:ss.SSSZ'), 'value': values[i] })
    }
    return data
  }
}
