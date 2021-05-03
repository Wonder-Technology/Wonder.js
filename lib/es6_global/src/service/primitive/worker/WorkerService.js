

import * as Curry from "./../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Log$WonderLog from "./../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";

var getSelf = (
    function(param){
      if(typeof window !== "undefined"){
        if(typeof window.fake_self_wonder !== "undefined"){
          return window.fake_self_wonder;
        }
      }

        return self;
    }
    );

var _isInOtherWorker = (
       function(worker) {
           return !!worker.location;
       }
        );

function _logMessage(data, worker) {
  var match = Curry._1(_isInOtherWorker, worker) === true;
  if (match) {
    Log$WonderLog.log("--in other worker-- post message to main worker:");
    return Log$WonderLog.logJson(data);
  } else {
    Log$WonderLog.log("**in main worker** post message to other worker:");
    return Log$WonderLog.logJson(data);
  }
}

function postMessage(data, worker) {
  worker.postMessage(data);
  return /* () */0;
}

function postMessageWithTransferData(data, transferData, worker) {
  worker.postMessage(data, transferData);
  return /* () */0;
}

export {
  getSelf ,
  _isInOtherWorker ,
  _logMessage ,
  postMessage ,
  postMessageWithTransferData ,
  
}
/* getSelf Not a pure module */
