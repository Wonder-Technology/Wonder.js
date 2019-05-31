

import * as BufferSettingService$Wonderjs from "../../../record/main/setting/BufferSettingService.js";
import * as CopyTransformService$Wonderjs from "../../../record/main/transform/CopyTransformService.js";
import * as OperateSettingService$Wonderjs from "../../../record/main/setting/OperateSettingService.js";
import * as WorkerDetectMainService$Wonderjs from "../workerDetect/WorkerDetectMainService.js";
import * as OperateRenderMainService$Wonderjs from "./OperateRenderMainService.js";
import * as PositionLightMainService$Wonderjs from "../light/PositionLightMainService.js";
import * as RecordGeometryMainService$Wonderjs from "../geometry/RecordGeometryMainService.js";
import * as RecordTransformMainService$Wonderjs from "../transform/RecordTransformMainService.js";
import * as RecordPointLightMainService$Wonderjs from "../light/point/RecordPointLightMainService.js";
import * as AmbientLightSceneMainService$Wonderjs from "../scene/AmbientLightSceneMainService.js";
import * as IndexSourceTextureMainService$Wonderjs from "../texture/IndexSourceTextureMainService.js";
import * as PositionPointLightMainService$Wonderjs from "../light/point/PositionPointLightMainService.js";
import * as RecordMeshRendererMainService$Wonderjs from "../meshRenderer/RecordMeshRendererMainService.js";
import * as RecordBasicMaterialMainService$Wonderjs from "../material/basic/RecordBasicMaterialMainService.js";
import * as RecordLightMaterialMainService$Wonderjs from "../material/light/RecordLightMaterialMainService.js";
import * as OperateSourceTextureMainService$Wonderjs from "../texture/OperateSourceTextureMainService.js";
import * as RecordDirectionLightMainService$Wonderjs from "../light/direction/RecordDirectionLightMainService.js";
import * as RecordSourceInstanceMainService$Wonderjs from "../instance/RecordSourceInstanceMainService.js";
import * as DirectionDirectionLightMainService$Wonderjs from "../light/direction/DirectionDirectionLightMainService.js";
import * as RecordBasicSourceTextureMainService$Wonderjs from "../texture/basic_source/RecordBasicSourceTextureMainService.js";
import * as RecordArrayBufferViewSourceTextureMainService$Wonderjs from "../texture/arrayBufferView_source/RecordArrayBufferViewSourceTextureMainService.js";

function createRenderState(state) {
  var settingRecord = state[/* settingRecord */0];
  var transformRecord = RecordTransformMainService$Wonderjs.getRecord(state);
  var localToWorldMatrices = transformRecord[/* localToWorldMatrices */2];
  var localToWorldMatrixCacheMap = transformRecord[/* localToWorldMatrixCacheMap */19];
  var normalMatrixCacheMap = transformRecord[/* normalMatrixCacheMap */20];
  var geometryRecord = RecordGeometryMainService$Wonderjs.getRecord(state);
  var basicMaterialRecord = RecordBasicMaterialMainService$Wonderjs.getRecord(state);
  var lightMaterialRecord = RecordLightMaterialMainService$Wonderjs.getRecord(state);
  var directionLightRecord = RecordDirectionLightMainService$Wonderjs.getRecord(state);
  var pointLightRecord = RecordPointLightMainService$Wonderjs.getRecord(state);
  var meshRendererRecord = RecordMeshRendererMainService$Wonderjs.getRecord(state);
  var basicSourceTextureRecord = RecordBasicSourceTextureMainService$Wonderjs.getRecord(state);
  var arrayBufferViewSourceTextureRecord = RecordArrayBufferViewSourceTextureMainService$Wonderjs.getRecord(state);
  var sourceInstanceRecord = RecordSourceInstanceMainService$Wonderjs.getRecord(state);
  var isUseWorker = WorkerDetectMainService$Wonderjs.isUseWorker(state);
  var renderStateTransformRecord = isUseWorker ? /* record */[
      /* localToWorldMatrices */CopyTransformService$Wonderjs.unsafeGetCopiedLocalToWorldMatrices(transformRecord),
      /* localToWorldMatrixCacheMap */localToWorldMatrixCacheMap,
      /* normalMatrixCacheMap */normalMatrixCacheMap
    ] : /* record */[
      /* localToWorldMatrices */localToWorldMatrices,
      /* localToWorldMatrixCacheMap */localToWorldMatrixCacheMap,
      /* normalMatrixCacheMap */normalMatrixCacheMap
    ];
  return /* record */[
          /* sceneRecord : record */[/* ambientLight : record */[/* color */AmbientLightSceneMainService$Wonderjs.getAmbientLightColor(state)]],
          /* vboBufferRecord */state[/* vboBufferRecord */34],
          /* typeArrayPoolRecord */state[/* typeArrayPoolRecord */36],
          /* glslSenderRecord */state[/* glslSenderRecord */30],
          /* programRecord */state[/* programRecord */28],
          /* geometryRecord : record */[
            /* vertices */geometryRecord[/* vertices */2],
            /* texCoords */geometryRecord[/* texCoords */3],
            /* normals */geometryRecord[/* normals */4],
            /* indices16 */geometryRecord[/* indices16 */5],
            /* indices32 */geometryRecord[/* indices32 */6],
            /* verticesInfos */geometryRecord[/* verticesInfos */7],
            /* texCoordsInfos */geometryRecord[/* texCoordsInfos */8],
            /* normalsInfos */geometryRecord[/* normalsInfos */9],
            /* indicesInfos */geometryRecord[/* indicesInfos */10],
            /* indicesTypeMap */geometryRecord[/* indicesTypeMap */17]
          ],
          /* cameraRecord */OperateRenderMainService$Wonderjs.getCameraRecord(state),
          /* basicMaterialRecord : record */[
            /* shaderIndices */basicMaterialRecord[/* shaderIndices */2],
            /* colors */basicMaterialRecord[/* colors */3],
            /* textureIndices */basicMaterialRecord[/* textureIndices */4],
            /* mapUnits */basicMaterialRecord[/* mapUnits */5],
            /* isDepthTests */basicMaterialRecord[/* isDepthTests */6],
            /* alphas */basicMaterialRecord[/* alphas */7]
          ],
          /* lightMaterialRecord : record */[
            /* shaderIndices */lightMaterialRecord[/* shaderIndices */2],
            /* diffuseColors */lightMaterialRecord[/* diffuseColors */3],
            /* specularColors */lightMaterialRecord[/* specularColors */4],
            /* shininess */lightMaterialRecord[/* shininess */5],
            /* textureIndices */lightMaterialRecord[/* textureIndices */6],
            /* diffuseMapUnits */lightMaterialRecord[/* diffuseMapUnits */7],
            /* specularMapUnits */lightMaterialRecord[/* specularMapUnits */8]
          ],
          /* meshRendererRecord : record */[/* drawModes */meshRendererRecord[/* drawModes */2]],
          /* basicSourceTextureRecord : record */[
            /* wrapSs */basicSourceTextureRecord[/* wrapSs */1],
            /* wrapTs */basicSourceTextureRecord[/* wrapTs */2],
            /* magFilters */basicSourceTextureRecord[/* magFilters */3],
            /* minFilters */basicSourceTextureRecord[/* minFilters */4],
            /* formats */basicSourceTextureRecord[/* formats */5],
            /* types */basicSourceTextureRecord[/* types */6],
            /* isNeedUpdates */basicSourceTextureRecord[/* isNeedUpdates */7],
            /* flipYs */basicSourceTextureRecord[/* flipYs */8],
            /* sourceMap */basicSourceTextureRecord[/* sourceMap */9],
            /* glTextureMap */basicSourceTextureRecord[/* glTextureMap */10],
            /* bindTextureUnitCacheMap */basicSourceTextureRecord[/* bindTextureUnitCacheMap */11],
            /* setFlipYFunc */OperateSourceTextureMainService$Wonderjs.setFlipY
          ],
          /* arrayBufferViewSourceTextureRecord : record */[
            /* wrapSs */arrayBufferViewSourceTextureRecord[/* wrapSs */1],
            /* wrapTs */arrayBufferViewSourceTextureRecord[/* wrapTs */2],
            /* magFilters */arrayBufferViewSourceTextureRecord[/* magFilters */3],
            /* minFilters */arrayBufferViewSourceTextureRecord[/* minFilters */4],
            /* formats */arrayBufferViewSourceTextureRecord[/* formats */5],
            /* types */arrayBufferViewSourceTextureRecord[/* types */6],
            /* isNeedUpdates */arrayBufferViewSourceTextureRecord[/* isNeedUpdates */7],
            /* flipYs */arrayBufferViewSourceTextureRecord[/* flipYs */8],
            /* widths */arrayBufferViewSourceTextureRecord[/* widths */9],
            /* heights */arrayBufferViewSourceTextureRecord[/* heights */10],
            /* sourceMap */arrayBufferViewSourceTextureRecord[/* sourceMap */11],
            /* glTextureMap */arrayBufferViewSourceTextureRecord[/* glTextureMap */12],
            /* bindTextureUnitCacheMap */arrayBufferViewSourceTextureRecord[/* bindTextureUnitCacheMap */13],
            /* setFlipYFunc */OperateSourceTextureMainService$Wonderjs.setFlipY,
            /* textureIndexOffset */IndexSourceTextureMainService$Wonderjs.getArrayBufferViewSourceTextureIndexOffset(state)
          ],
          /* directionLightRecord : record */[
            /* index */directionLightRecord[/* index */0],
            /* colors */directionLightRecord[/* colors */2],
            /* intensities */directionLightRecord[/* intensities */3],
            /* renderLightArr */directionLightRecord[/* renderLightArr */4],
            /* directionMap */DirectionDirectionLightMainService$Wonderjs.buildDirectionMap(DirectionDirectionLightMainService$Wonderjs.getDirection, state)
          ],
          /* pointLightRecord : record */[
            /* index */pointLightRecord[/* index */0],
            /* colors */pointLightRecord[/* colors */2],
            /* intensities */pointLightRecord[/* intensities */3],
            /* constants */pointLightRecord[/* constants */4],
            /* linears */pointLightRecord[/* linears */5],
            /* quadratics */pointLightRecord[/* quadratics */6],
            /* ranges */pointLightRecord[/* ranges */7],
            /* renderLightArr */pointLightRecord[/* renderLightArr */8],
            /* positionMap */PositionLightMainService$Wonderjs.buildPositionMap(PositionPointLightMainService$Wonderjs.getPosition, state)
          ],
          /* transformRecord */renderStateTransformRecord,
          /* sourceInstanceRecord : record */[
            /* objectInstanceTransformIndexMap */sourceInstanceRecord[/* objectInstanceTransformIndexMap */1],
            /* objectInstanceTransformCollections */sourceInstanceRecord[/* objectInstanceTransformCollections */4],
            /* isTransformStatics */sourceInstanceRecord[/* isTransformStatics */3],
            /* matrixInstanceBufferCapacityMap */sourceInstanceRecord[/* matrixInstanceBufferCapacityMap */5],
            /* matrixFloat32ArrayMap */sourceInstanceRecord[/* matrixFloat32ArrayMap */6],
            /* isSendTransformMatrixDataMap */sourceInstanceRecord[/* isSendTransformMatrixDataMap */7]
          ],
          /* gpuDetectRecord */state[/* gpuDetectRecord */5],
          /* globalTempRecord */state[/* globalTempRecord */35],
          /* deviceManagerRecord */state[/* deviceManagerRecord */9],
          /* settingRecord : record */[
            /* gpu */OperateSettingService$Wonderjs.unsafeGetGPU(settingRecord),
            /* instanceBuffer *//* record */[/* objectInstanceCountPerSourceInstance */BufferSettingService$Wonderjs.getObjectInstanceCountPerSourceInstance(settingRecord)],
            /* textureCountPerMaterial */BufferSettingService$Wonderjs.getTextureCountPerMaterial(settingRecord)
          ],
          /* workerDetectRecord : record */[/* isUseWorker */isUseWorker],
          /* browserDetectRecord : record */[/* browser */state[/* browserDetectRecord */40][/* browser */0]],
          /* jobDataRecord */state[/* jobDataRecord */44],
          /* shaderRecord */state[/* shaderRecord */26]
        ];
}

export {
  createRenderState ,
  
}
/* BufferSettingService-Wonderjs Not a pure module */
