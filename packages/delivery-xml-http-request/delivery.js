const payload = require('@bugsnag/core/lib/json-payload')
const { isoDate } = require('@bugsnag/core/lib/es-utils')

module.exports = (win = window) => ({
  sendReport: (logger, config, report, cb = () => {}) => {
    try {
      const url = config.endpoints.notify
      const req = new win.XMLHttpRequest()
      req.onreadystatechange = function () {
        if (req.readyState === win.XMLHttpRequest.DONE) cb(null);
      };
      req.open('POST', url);
      req.setRequestHeader('Content-Type', 'application/json');
      if(config.headers.length > 0){
        config.headers.forEach(function(header){
          req.setRequestHeader(header.header, header.value);
        })
      }
      req.setRequestHeader('')
      req.send(payload.report(report, config.filters))
    } catch (e) {
      logger.error(e)
    }
  },
  sendSession: (logger, config, session, cb = () => {}) => {
    try {
      const url = config.endpoints.sessions
      const req = new win.XMLHttpRequest()
      req.onreadystatechange = function () {
        if (req.readyState === win.XMLHttpRequest.DONE) cb(null)
      }
      req.open('POST', url);
      req.setRequestHeader('Content-Type', 'application/json');
      if(config.headers.length > 0){
        config.headers.forEach(function(header){
          req.setRequestHeader(header.header, header.value);
        })
      }
      req.send(payload.session(session, config.filters))
    } catch (e) {
      logger.error(e)
    }
  }
})
