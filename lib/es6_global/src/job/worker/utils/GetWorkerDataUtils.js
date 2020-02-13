

import * as Most from "most";
import * as Caml_option from "../../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as JobConfigUtils$Wonderjs from "./JobConfigUtils.js";

function _createGetWorkerDataStream(flags, target) {
  return Most.filter((function (e) {
                return e.data.operateType === JobConfigUtils$Wonderjs.getOperateType(flags);
              }), Most.fromEvent("message", target));
}

function createGetMainWorkerDataStream(flags, target) {
  return Most.map((function (e) {
                return Caml_option.some(e);
              }), _createGetWorkerDataStream(flags, target));
}

function createGetOtherWorkerDataStream(flags, target) {
  return Most.take(1, _createGetWorkerDataStream(flags, target));
}

function createGetOtherWorkerNoDataStream(flags, target) {
  return Most.map((function (e) {
                return undefined;
              }), Most.take(1, _createGetWorkerDataStream(flags, target)));
}

export {
  _createGetWorkerDataStream ,
  createGetMainWorkerDataStream ,
  createGetOtherWorkerDataStream ,
  createGetOtherWorkerNoDataStream ,
  
}
/* most Not a pure module */
