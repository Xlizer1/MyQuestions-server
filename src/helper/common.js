var db = require("../config/db");
var log4js = require("../config/logger");
var datetime = require("node-datetime");

var errorLogs = log4js.getLogger("errors"),
  debugLogs = log4js.getLogger("debugs");

var log_type = [];

module.exports = {
  getDateTime: function getDateTime(date, format) {
    var dt = date ? datetime.create(date) : datetime.create();
    var formatted = format ? dt.format(format) : dt.format("y-m-d H:M:S");
    return formatted;
  },
  addDaysToDateString: function addDaysToDateString(date, days, format) {
    var dt = date ? datetime.create(date) : datetime.create();
    dt.offsetInDays(days);
    var formatted = format ? dt.format(format) : dt.format("y-m-d H:M:S");
    return formatted;
  },
  addHoursToDateString: function addHoursToDateString(date, hours, format) {
    var dt = date ? datetime.create(date) : datetime.create();
    dt.offsetInHours(hours);
    var formatted = format ? dt.format(format) : dt.format("y-m-d H:M:S");
    return formatted;
  },
  getDayOfWeekFromDate: function getDayOfWeekFromDate(date, format) {
    var dt = date ? datetime.create(date) : datetime.create();
    var formatted = format ? dt.format(format) : dt.format("Y-m-d H:M:S");
    var ddate = new Date(formatted);
    var dayOfWeek = ddate.getDay();
    return dayOfWeek;
  },

  formatQueryDate: function formatQueryDate(dateString) {
    const dateObj = new Date(dateString);

    const year = dateObj.getUTCFullYear();
    const month = String(dateObj.getUTCMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getUTCDate() + 1).padStart(2, '0') ;

    return `${year}-${month}-${day}`;
},

  executeQuery: async function executeQuery(sql, logName, callback) {
    try {
      await db.query(
        {
          sql: sql,
          timeout: 40000,
        },
        (error, result) => {
          if (!error) {
            callback(result);
          } else {
            errorLogs.error(`${logName}sql: ${sql}`);
            errorLogs.error(logName + ": " + error);
            callback([false]);
          }
        }
      );
    } catch (e) {
      console.log("Error in common.js -> executeQuery: " + e);
    }
  },
  getResponse: function getResponse(_status, _data, _message) {
    var data;
    if (_data) data = _data;
    else data = { message: _message };
    return {
      status: _status,
      data: data,
    };
  },

  log_type: log_type,
};
