'use strict';

var Caml_option = require("rescript/lib/js/caml_option.js");
var OptionSt$WonderCommonlib = require("wonder-commonlib/lib/js/src/structure/OptionSt.bs.js");

function getBodyExn(po) {
  return OptionSt$WonderCommonlib.getExn(po.body);
}

function setBody(po, body) {
  return {
          eventRecord: po.eventRecord,
          canvas: po.canvas,
          body: Caml_option.some(body),
          browser: po.browser
        };
}

exports.getBodyExn = getBodyExn;
exports.setBody = setBody;
/* No side effect */
