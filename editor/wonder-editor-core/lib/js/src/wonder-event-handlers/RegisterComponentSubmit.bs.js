'use strict';

var Curry = require("rescript/lib/js/curry.js");
var Main$WonderEngineCore = require("wonder-engine-core/lib/js/src/Main.bs.js");

function handler(api, e) {
  Main$WonderEngineCore.registerComponent(Curry._1(e.getData, undefined));
  Main$WonderEngineCore.createAndSetComponentState("Transform", {
        isDebug: true,
        transformCount: 10,
        float9Array1: new Float32Array([]),
        float32Array1: new Float32Array([])
      });
  var data = Main$WonderEngineCore.unsafeGetRelatedComponentData("Transform");
  var match = Main$WonderEngineCore.createComponent(data);
  console.log([
        match[1],
        Main$WonderEngineCore.getAllComponents(match[0])
      ]);
  
}

exports.handler = handler;
/* Main-WonderEngineCore Not a pure module */
