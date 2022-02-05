'use strict';


function getBrowser(po) {
  return po.browser;
}

function setBrowser(po, browser) {
  return {
          eventRecord: po.eventRecord,
          canvas: po.canvas,
          body: po.body,
          browser: browser
        };
}

exports.getBrowser = getBrowser;
exports.setBrowser = setBrowser;
/* No side effect */
