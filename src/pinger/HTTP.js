module.exports = pinger
const request = require('request')

function pinger(task, callback) {
  request(task.url, resultConverter(task, new Date(), callback))
}

function resultConverter(task, startTime, callback) {
  return function(error, response, body) {
    let result = {
      status: true,
      comment: '',
      start_time: startTime,
      finish_time: new Date()
    }

    if (error) {
      result.status = false
      result.comment = error
    } else if (task.response_code.length && task.response_code.indexOf(response.statusCode) == -1) {
      result.status = false
      result.comment = `Unexpected response code: ${response.statusCode}`
    }

    callback(result)
  }
}
