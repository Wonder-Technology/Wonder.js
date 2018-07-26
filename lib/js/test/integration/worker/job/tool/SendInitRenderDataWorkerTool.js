'use strict';

var Sinon = require("sinon");
var Js_primitive = require("bs-platform/lib/js/js_primitive.js");

function buildInitRenderData($staropt$star, $staropt$star$1, $staropt$star$2, $staropt$star$3, $staropt$star$4, $staropt$star$5, _) {
  var isDebug = $staropt$star !== undefined ? $staropt$star : true;
  var viewportData = $staropt$star$1 !== undefined ? Js_primitive.valFromOption($staropt$star$1) : Sinon.match.any;
  var workerDetectData = $staropt$star$2 !== undefined ? Js_primitive.valFromOption($staropt$star$2) : Sinon.match.any;
  var browserDetectData = $staropt$star$3 !== undefined ? Js_primitive.valFromOption($staropt$star$3) : Sinon.match.any;
  var textureData = $staropt$star$4 !== undefined ? Js_primitive.valFromOption($staropt$star$4) : Sinon.match.any;
  var imguiData = $staropt$star$5 !== undefined ? Js_primitive.valFromOption($staropt$star$5) : Sinon.match.any;
  return {
          operateType: "INIT_RENDER",
          canvas: Sinon.match.any,
          contextConfig: Sinon.match.any,
          bufferData: Sinon.match.any,
          instanceBufferData: Sinon.match.any,
          isDebug: isDebug,
          viewportData: viewportData,
          gpuData: Sinon.match.any,
          memoryData: Sinon.match.any,
          renderConfigData: Sinon.match.any,
          workerDetectData: workerDetectData,
          browserDetectData: browserDetectData,
          textureData: textureData,
          imguiData: imguiData,
          transformData: Sinon.match.any,
          basicMaterialData: Sinon.match.any,
          lightMaterialData: Sinon.match.any,
          customGeometryData: Sinon.match.any,
          directionLightData: Sinon.match.any,
          pointLightData: Sinon.match.any,
          sourceInstanceData: Sinon.match.any
        };
}

exports.buildInitRenderData = buildInitRenderData;
/* sinon Not a pure module */
