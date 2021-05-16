

import * as CameraTool$Wonderjs from "../../../../tool/service/camera/CameraTool.js";
import * as OptionService$Wonderjs from "../../../../../src/service/atom/OptionService.js";
import * as WorkerWorkerTool$Wonderjs from "../WorkerWorkerTool.js";
import * as FrontRenderLightJobTool$Wonderjs from "../../../../tool/job/no_worker/loop/FrontRenderLightJobTool.js";
import * as TextureSourceMapService$Wonderjs from "../../../../../src/service/primitive/texture/TextureSourceMapService.js";
import * as ArrayBufferViewSourceTextureAPI$Wonderjs from "../../../../../src/api/texture/ArrayBufferViewSourceTextureAPI.js";
import * as ArrayBufferViewSourceTextureTool$Wonderjs from "../../../../tool/service/texture/ArrayBufferViewSourceTextureTool.js";
import * as InitArrayBufferViewTextureRenderWorkerTool$Wonderjs from "./InitArrayBufferViewTextureRenderWorkerTool.js";
import * as RecordArrayBufferViewSourceTextureRenderWorkerService$Wonderjs from "../../../../../src/service/state/render_worker/texture/arrayBufferView_source/RecordArrayBufferViewSourceTextureRenderWorkerService.js";

function unsafeGetSource(texture, state) {
  var match = RecordArrayBufferViewSourceTextureRenderWorkerService$Wonderjs.getRecord(state);
  return TextureSourceMapService$Wonderjs.unsafeGetSource(texture, OptionService$Wonderjs.unsafeGet(match[/* sourceMap */10]));
}

function createTwoMaps(state) {
  var match = ArrayBufferViewSourceTextureAPI$Wonderjs.createArrayBufferViewSourceTexture(state);
  var map1 = match[1];
  var match$1 = ArrayBufferViewSourceTextureAPI$Wonderjs.createArrayBufferViewSourceTexture(match[0]);
  var map2 = match$1[1];
  var source1 = ArrayBufferViewSourceTextureTool$Wonderjs.buildSource(/* () */0);
  var source2 = ArrayBufferViewSourceTextureTool$Wonderjs.buildSource(/* () */0);
  var state$1 = ArrayBufferViewSourceTextureAPI$Wonderjs.setArrayBufferViewSourceTextureSource(map1, source1, match$1[0]);
  var state$2 = ArrayBufferViewSourceTextureAPI$Wonderjs.setArrayBufferViewSourceTextureSource(map2, source2, state$1);
  var state$3 = ArrayBufferViewSourceTextureAPI$Wonderjs.setArrayBufferViewSourceTextureHeight(map1, 20, ArrayBufferViewSourceTextureAPI$Wonderjs.setArrayBufferViewSourceTextureWidth(map1, 10, state$2));
  var state$4 = ArrayBufferViewSourceTextureAPI$Wonderjs.setArrayBufferViewSourceTextureHeight(map2, 20, ArrayBufferViewSourceTextureAPI$Wonderjs.setArrayBufferViewSourceTextureWidth(map2, 10, state$3));
  return /* tuple */[
          state$4,
          /* tuple */[
            map1,
            map2
          ],
          /* tuple */[
            source1,
            source2
          ]
        ];
}

function prepareStateAndCreateTwoMaps(sandbox) {
  return createTwoMaps(InitArrayBufferViewTextureRenderWorkerTool$Wonderjs.prepareState(sandbox));
}

function prepareStateAndCreateTwoGameObjects(sandbox) {
  var state = InitArrayBufferViewTextureRenderWorkerTool$Wonderjs.prepareState(sandbox);
  var match = createTwoMaps(state);
  var match$1 = match[2];
  var match$2 = match[1];
  var match$3 = FrontRenderLightJobTool$Wonderjs.prepareGameObjectWithDiffuseMap(sandbox, match$2[0], match[0]);
  var match$4 = FrontRenderLightJobTool$Wonderjs.prepareGameObjectWithDiffuseMap(sandbox, match$2[1], match$3[0]);
  var state$1 = WorkerWorkerTool$Wonderjs.setFakeWorkersAndSetState(match$4[0]);
  var match$5 = CameraTool$Wonderjs.createCameraGameObject(state$1);
  return /* tuple */[
          match$5[0],
          /* tuple */[
            match$3[1],
            match$4[1]
          ],
          /* tuple */[
            match$3[5],
            match$4[5]
          ],
          /* tuple */[
            match$1[0],
            match$1[1]
          ]
        ];
}

export {
  unsafeGetSource ,
  createTwoMaps ,
  prepareStateAndCreateTwoMaps ,
  prepareStateAndCreateTwoGameObjects ,
  
}
/* CameraTool-Wonderjs Not a pure module */
