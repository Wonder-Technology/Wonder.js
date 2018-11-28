'use strict';

var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var RandomTool$Wonderjs = require("./RandomTool.js");

function buildStubWhichReturnDifferentValue(sandbox) {
  var stub = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
  for(var i = 0; i <= 100; ++i){
    Sinon.returns(RandomTool$Wonderjs.getRandomFloat(1000), Sinon.onCall(i, stub));
  }
  return stub;
}

exports.buildStubWhichReturnDifferentValue = buildStubWhichReturnDifferentValue;
/* Sinon Not a pure module */
