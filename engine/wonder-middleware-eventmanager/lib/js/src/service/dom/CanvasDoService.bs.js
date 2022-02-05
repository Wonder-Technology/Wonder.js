'use strict';

var Caml_option = require("rescript/lib/js/caml_option.js");

function getCanvas(po) {
  return po.canvas;
}

function setCanvas(po, canvas) {
  return {
          eventRecord: po.eventRecord,
          canvas: Caml_option.some(canvas),
          body: po.body,
          browser: po.browser
        };
}

var getOffset = (function(canvas){
                var offset = [canvas.offsetLeft,  canvas.offsetTop];
                var offsetParent = canvas;

            while (offsetParent = offsetParent.offsetParent) {
                offset[0] += offsetParent.offsetLeft;
                offset[1] += offsetParent.offsetTop;
            }

            return offset;
            });

exports.getCanvas = getCanvas;
exports.setCanvas = setCanvas;
exports.getOffset = getOffset;
/* No side effect */
