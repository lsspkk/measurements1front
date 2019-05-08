import axios from 'axios'
import moment from 'moment'

export default {
  getMeasures () {
    // let sampledata = [
    //   { id: '0', name: 'Mood', type: 'funny', min: 0, max: 100 },
    //   { id: '1', name: 'Energy', type: 'slider', min: 0, max: 100 }
    // ]
    // return sampledata
    return axios.get('/measure', { withCredentials: true }).then((res) => {
      return res.data
    })
  },

  getData (measureId) {
    var d = new Date()
    var values = [20, 40, 50, 20, 80, 50]
    if (measureId === '1') {
      values = [60, 40, 50, 10, 70, 60]
    }
    var sampledata = []
    for (var i = 0; i < values.length; i++) {
      d.setDate(d.getDate() - 1)
      sampledata[i] = ({ 'timestamp': moment(d.toISOString(), 'YYYY-MM-DDTHH:mm:ss.SSSZ'), 'value': values[i] })
    }
    // return data
    return axios.get('/measurement/' + measureId, { withCredentials: true }).then((res) => {
      // console.log(res.data)
      return res.data
    })
  },

  postData (measureId, value, timestamp) {
    return axios({
      url: '/measurement/' + measureId,
      method: 'post',
      data: { value: value, timestamp: timestamp },
      withCredentials: true
    })
  }
}
