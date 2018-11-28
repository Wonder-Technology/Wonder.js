

import * as Sinon from "sinon";
import * as Js_primitive from "../../../../../../../node_modules/bs-platform/lib/es6/js_primitive.js";

function buildRenderRenderData($staropt$star, $staropt$star$1, $staropt$star$2, $staropt$star$3, $staropt$star$4, $staropt$star$5, _) {
  var basicSourceTextureData = $staropt$star !== undefined ? Js_primitive.valFromOption($staropt$star) : Sinon.match.any;
  var arrayBufferViewSourceTextureData = $staropt$star$1 !== undefined ? Js_primitive.valFromOption($staropt$star$1) : Sinon.match.any;
  var materialData = $staropt$star$2 !== undefined ? Js_primitive.valFromOption($staropt$star$2) : Sinon.match.any;
  var imguiData = $staropt$star$3 !== undefined ? Js_primitive.valFromOption($staropt$star$3) : Sinon.match.any;
  var customData = $staropt$star$4 !== undefined ? Js_primitive.valFromOption($staropt$star$4) : Sinon.match.any;
  var renderGeometryData = $staropt$star$5 !== undefined ? Js_primitive.valFromOption($staropt$star$5) : Sinon.match.any;
  return {
          operateType: Sinon.match.any,
          ambientLightData: Sinon.match.any,
          directionLightData: Sinon.match.any,
          pointLightData: Sinon.match.any,
          initData: {
            materialData: materialData,
            textureData: {
              basicSourceTextureData: basicSourceTextureData,
              arrayBufferViewSourceTextureData: arrayBufferViewSourceTextureData
            }
          },
          renderData: {
            isRender: Sinon.match.any,
            camera: Sinon.match.any,
            geometryData: renderGeometryData,
            basic: Sinon.match.any,
            light: Sinon.match.any,
            sourceInstance: Sinon.match.any
          },
          imguiData: imguiData,
          customData: customData
        };
}

export {
  buildRenderRenderData ,
  
}
/* sinon Not a pure module */
