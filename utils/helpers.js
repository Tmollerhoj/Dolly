const format = require('date-fns/format')

module.exports = {
  formated_date: (date) => {
    return format(date, 'MMM d, yyyy hh:mm')
  }
}
  
