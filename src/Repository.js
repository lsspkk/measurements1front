import axios from 'axios'
import moment from 'moment'

export default {
  getMeasures() {
    // let sampledata = [
    //   { id: '0', name: 'Mood', type: 'funny', min: 0, max: 100 },
    //   { id: '1', name: 'Energy', type: 'slider', min: 0, max: 100 }
    // ]
    // return sampledata
    return axios.get('/measure', { withCredentials: true }).then(res => res.data)
  },
  getGroups() {
    return axios.get('/group', { withCredentials: true }).then(res => res.data)
  },
  getGroupMembers(id) {
    return axios.get('/group/' + id + "/member", { withCredentials: true }).then(res => res.data)
  },
  getGroupMeasures(id) {
    return axios.get('/group/' + id + "/measure", { withCredentials: true }).then(res => res.data)
  },
  postGroupMeasure(id, measure_id) {
    return axios({
      url: '/group/' + id + '/measure',
      method: 'post',
      data: { 'add_measure_id': measure_id },
      withCredentials: true
    })
  },
  getGroupInvitations(id) {
    return axios.get('/group/' + id + "/invitation", { withCredentials: true }).then(res => res.data)
  },

  getData(measureId) {
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
    //return data
    return axios.get('/measurement/' + measureId, { withCredentials: true }).then((res) => {
      //console.log(res.data)
      return res.data
    })
  },

  putData(measureId, value, timestamp) {
    return axios({
      url: '/measurement/' + measureId,
      method: 'put',
      data: { value: value, timestamp: timestamp },
      withCredentials: true
    })
  }
}
