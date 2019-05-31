

import * as OptionService$Wonderjs from "../../../atom/OptionService.js";

function setSetting(param) {
  var worker = param[/* worker */6];
  var gpu = param[/* gpu */5];
  var context = param[/* context */4];
  var isDebug = param[/* isDebug */3];
  var buffer = param[/* buffer */2];
  var memory = param[/* memory */1];
  return /* record */[
          /* canvasId */param[/* canvasId */0],
          /* memory */memory !== undefined ? memory : /* record */[
              /* maxDisposeCount */1000,
              /* maxTypeArrayPoolSize */5000,
              /* maxBigTypeArrayPoolSize */100
            ],
          /* buffer */buffer !== undefined ? buffer : /* record */[
              /* geometryPointCount */1000000,
              /* geometryCount */1000,
              /* transformCount */10000,
              /* basicMaterialCount */10000,
              /* lightMaterialCount */10000,
              /* directionLightCount */1000,
              /* pointLightCount */1000,
              /* textureCountPerMaterial */8,
              /* basicSourceTextureCount */64,
              /* arrayBufferViewSourceTextureCount */64,
              /* meshRendererCount */10000,
              /* instanceBuffer : record */[
                /* sourceInstanceCount */2,
                /* objectInstanceCountPerSourceInstance */10000
              ]
            ],
          /* isDebug */isDebug !== undefined ? isDebug : false,
          /* context */context !== undefined ? context : /* record */[
              /* alpha */true,
              /* depth */true,
              /* stencil */false,
              /* antialias */true,
              /* premultipliedAlpha */true,
              /* preserveDrawingBuffer */false
            ],
          /* gpu */gpu !== undefined ? gpu : /* record */[/* useHardwareInstance */true],
          /* worker */worker !== undefined ? worker : /* record */[/* useWorker */false]
        ];
}

function getCanvasId(param) {
  return param[/* canvasId */0];
}

function unsafeGetCanvasId(record) {
  return OptionService$Wonderjs.unsafeGet(getCanvasId(record));
}

function unsafeGetMemory(param) {
  return OptionService$Wonderjs.unsafeGet(param[/* memory */1]);
}

function unsafeGetIsDebug(param) {
  return OptionService$Wonderjs.unsafeGet(param[/* isDebug */3]);
}

function unsafeGetGPU(param) {
  return OptionService$Wonderjs.unsafeGet(param[/* gpu */5]);
}

function unsafeGetContext(param) {
  return OptionService$Wonderjs.unsafeGet(param[/* context */4]);
}

function unsafeGetWorker(param) {
  return OptionService$Wonderjs.unsafeGet(param[/* worker */6]);
}

export {
  setSetting ,
  getCanvasId ,
  unsafeGetCanvasId ,
  unsafeGetMemory ,
  unsafeGetIsDebug ,
  unsafeGetGPU ,
  unsafeGetContext ,
  unsafeGetWorker ,
  
}
/* OptionService-Wonderjs Not a pure module */
