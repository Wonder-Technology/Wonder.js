

import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as ArrayService$Wonderjs from "../../../../../src/service/atom/ArrayService.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";

var _defer = (
   function(timeout, returnedData) {
     return new Promise((resolve, reject)=>{
     setTimeout(function(){
       resolve(returnedData)
     }, timeout)
     });
   }
    );

function calledWith(stub, arg) {
  return stub.calledWith(arg);
}

function calledWithArg2(stub, arg1, arg2) {
  return stub.calledWith(arg1, arg2);
}

function calledWithArg4(stub, arg1, arg2, arg3, arg4) {
  return stub.calledWith(arg1, arg2, arg3, arg4);
}

function deferReturns(timeout, returnedData, stub) {
  return Sinon.returns(Curry._2(_defer, timeout, returnedData), stub);
}

function returnDifferentOnEachCall(stub) {
  return ArrayService$WonderCommonlib.reduceOneParam((function (stub, i) {
                return Sinon.returns(i, Sinon.onCall(i, stub));
              }), stub, ArrayService$Wonderjs.range(0, 100));
}

export {
  _defer ,
  calledWith ,
  calledWithArg2 ,
  calledWithArg4 ,
  deferReturns ,
  returnDifferentOnEachCall ,
  
}
/* _defer Not a pure module */
