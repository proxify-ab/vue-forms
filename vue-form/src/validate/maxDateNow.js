import moment from 'moment'

export default {
  getMessage(field, args) {
    return 'The specified date is greater than today\'s'
  },
  validate(value, [dateFormat]) {
    return moment().isAfter(moment(value, dateFormat))
  }
}
