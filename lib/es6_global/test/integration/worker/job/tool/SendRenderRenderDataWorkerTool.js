

import * as Sinon from "sinon";
import * as Caml_option from "./../../../../../../../node_modules/bs-platform/lib/es6/caml_option.js";

function buildRenderRenderData($staropt$star, $staropt$star$1, $staropt$star$2, $staropt$star$3, $staropt$star$4, $staropt$star$5, $staropt$star$6, $staropt$star$7, param) {
  var basicSourceTextureData = $staropt$star !== undefined ? Caml_option.valFromOption($staropt$star) : Sinon.match.any;
  var arrayBufferViewSourceTextureData = $staropt$star$1 !== undefined ? Caml_option.valFromOption($staropt$star$1) : Sinon.match.any;
  var cubemapTextureData = $staropt$star$2 !== undefined ? Caml_option.valFromOption($staropt$star$2) : Sinon.match.any;
  var skyboxData = $staropt$star$3 !== undefined ? Caml_option.valFromOption($staropt$star$3) : Sinon.match.any;
  var materialData = $staropt$star$4 !== undefined ? Caml_option.valFromOption($staropt$star$4) : Sinon.match.any;
  var imguiData = $staropt$star$5 !== undefined ? Caml_option.valFromOption($staropt$star$5) : Sinon.match.any;
  var customData = $staropt$star$6 !== undefined ? Caml_option.valFromOption($staropt$star$6) : Sinon.match.any;
  var renderGeometryData = $staropt$star$7 !== undefined ? Caml_option.valFromOption($staropt$star$7) : Sinon.match.any;
  return {
          operateType: Sinon.match.any,
          ambientLightData: Sinon.match.any,
          directionLightData: Sinon.match.any,
          pointLightData: Sinon.match.any,
          initData: {
            materialData: materialData,
            textureData: {
              basicSourceTextureData: basicSourceTextureData,
              arrayBufferViewSourceTextureData: arrayBufferViewSourceTextureData,
              cubemapTextureData: cubemapTextureData
            }
          },
          renderData: {
            isRender: Sinon.match.any,
            camera: Sinon.match.any,
            geometryData: renderGeometryData,
            basic: Sinon.match.any,
            light: Sinon.match.any,
            sourceInstance: Sinon.match.any,
            skyboxData: skyboxData
          },
          imguiData: imguiData,
          customData: customData
        };
}

export {
  buildRenderRenderData ,
  
}
/* sinon Not a pure module */
