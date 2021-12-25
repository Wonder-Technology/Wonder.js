

import * as OptionSt$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/structure/OptionSt.bs.js";

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

export {
  _createPOContainer ,
  poContainer ,
  setPO ,
  unsafeGetPO ,
  
}
/* No side effect */
