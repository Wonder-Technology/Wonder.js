'use strict';

var OptionSt$WonderCommonlib = require("wonder-commonlib/lib/js/src/structure/OptionSt.bs.js");

function _createPOContainer(param) {
  return {
          po: undefined
        };
}

var poContainer = {
  po: undefined
};

function setPO(po) {
  poContainer.po = po;
  
}

function unsafeGetPO(param) {
  return OptionSt$WonderCommonlib.unsafeGet(poContainer.po);
}

exports._createPOContainer = _createPOContainer;
exports.poContainer = poContainer;
exports.setPO = setPO;
exports.unsafeGetPO = unsafeGetPO;
/* No side effect */
