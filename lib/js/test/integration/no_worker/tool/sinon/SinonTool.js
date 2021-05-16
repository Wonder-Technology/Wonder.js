'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var ArrayService$Wonderjs = require("../../../../../src/service/atom/ArrayService.js");
var ArrayService$WonderCommonlib = require("wonder-commonlib/lib/js/src/ArrayService.js");

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

function calledWithArg3(stub, arg1, arg2, arg3) {
  return stub.calledWith(arg1, arg2, arg3);
}

function calledWithArg4(stub, arg1, arg2, arg3, arg4) {
  return stub.calledWith(arg1, arg2, arg3, arg4);
}

function calledWithArg5(stub, arg1, arg2, arg3, arg4, arg5) {
  return stub.calledWith(arg1, arg2, arg3, arg4, arg5);
}

function calledWithArg6(stub, arg1, arg2, arg3, arg4, arg5, arg6) {
  return stub.calledWith(arg1, arg2, arg3, arg4, arg5, arg6);
}

function deferReturns(timeout, returnedData, stub) {
  return Sinon.returns(Curry._2(_defer, timeout, returnedData), stub);
}

function returnDifferentOnEachCall(stub) {
  return ArrayService$WonderCommonlib.reduceOneParam((function (stub, i) {
                return Sinon.returns(i, Sinon.onCall(i, stub));
              }), stub, ArrayService$Wonderjs.range(0, 100));
}

var createMethodStub = ( function(sandbox, obj, method) {
    /* sandbox.stub(obj, method); */

    obj[method] =  sandbox.stub();

    return obj[method];
}
);

exports._defer = _defer;
exports.calledWith = calledWith;
exports.calledWithArg2 = calledWithArg2;
exports.calledWithArg3 = calledWithArg3;
exports.calledWithArg4 = calledWithArg4;
exports.calledWithArg5 = calledWithArg5;
exports.calledWithArg6 = calledWithArg6;
exports.deferReturns = deferReturns;
exports.returnDifferentOnEachCall = returnDifferentOnEachCall;
exports.createMethodStub = createMethodStub;
/* _defer Not a pure module */
