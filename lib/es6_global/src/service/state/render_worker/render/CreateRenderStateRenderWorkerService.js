

import * as OptionService$Wonderjs from "../../../atom/OptionService.js";
import * as BufferRenderWorkerSettingService$Wonderjs from "../../../record/render_worker/setting/BufferRenderWorkerSettingService.js";
import * as OperateRenderRenderWorkerService$Wonderjs from "./OperateRenderRenderWorkerService.js";
import * as RecordGeometryRenderWorkerService$Wonderjs from "../geometry/RecordGeometryRenderWorkerService.js";
import * as RecordTransformRenderWorkerService$Wonderjs from "../transform/RecordTransformRenderWorkerService.js";
import * as RecordPointLightRenderWorkerService$Wonderjs from "../light/point/RecordPointLightRenderWorkerService.js";
import * as RecordRenderWorkerPointLightService$Wonderjs from "../../../record/render_worker/light/point/RecordRenderWorkerPointLightService.js";
import * as AmbientLightSceneRenderWorkerService$Wonderjs from "../scene/AmbientLightSceneRenderWorkerService.js";
import * as IndexSourceTextureRenderWorkerService$Wonderjs from "../texture/IndexSourceTextureRenderWorkerService.js";
import * as RecordMeshRendererRenderWorkerService$Wonderjs from "../meshRenderer/RecordMeshRendererRenderWorkerService.js";
import * as RecordWorkerDetectRenderWorkerService$Wonderjs from "../workerDetect/RecordWorkerDetectRenderWorkerService.js";
import * as RecordBasicMaterialRenderWorkerService$Wonderjs from "../material/basic/RecordBasicMaterialRenderWorkerService.js";
import * as RecordBrowserDetectRenderWorkerService$Wonderjs from "../browserDetect/RecordBrowserDetectRenderWorkerService.js";
import * as RecordLightMaterialRenderWorkerService$Wonderjs from "../material/light/RecordLightMaterialRenderWorkerService.js";
import * as OperateSourceTextureRenderWorkerService$Wonderjs from "../texture/OperateSourceTextureRenderWorkerService.js";
import * as RecordDirectionLightRenderWorkerService$Wonderjs from "../light/direction/RecordDirectionLightRenderWorkerService.js";
import * as RecordRenderWorkerDirectionLightService$Wonderjs from "../../../record/render_worker/light/direction/RecordRenderWorkerDirectionLightService.js";
import * as RecordRenderWorkerSourceInstanceService$Wonderjs from "../../../record/render_worker/instance/RecordRenderWorkerSourceInstanceService.js";
import * as RecordBasicSourceTextureRenderWorkerService$Wonderjs from "../texture/basic_source/RecordBasicSourceTextureRenderWorkerService.js";
import * as RecordArrayBufferViewSourceTextureRenderWorkerService$Wonderjs from "../texture/arrayBufferView_source/RecordArrayBufferViewSourceTextureRenderWorkerService.js";

function createRenderState(state) {
  var settingRecord = state[/* settingRecord */1];
  var gpuDetectRecord = state[/* gpuDetectRecord */3];
  var deviceManagerRecord = state[/* deviceManagerRecord */4];
  var shaderRecord = state[/* shaderRecord */5];
  var programRecord = state[/* programRecord */6];
  var glslSenderRecord = state[/* glslSenderRecord */8];
  var sourceInstanceRecord = state[/* sourceInstanceRecord */11];
  var typeArrayPoolRecord = state[/* typeArrayPoolRecord */22];
  var vboBufferRecord = state[/* vboBufferRecord */23];
  var globalTempRecord = state[/* globalTempRecord */24];
  var jobDataRecord = state[/* jobDataRecord */30];
  var transformRecord = RecordTransformRenderWorkerService$Wonderjs.getRecord(state);
  var geometryRecord = RecordGeometryRenderWorkerService$Wonderjs.getRecord(state);
  var basicMaterialRecord = RecordBasicMaterialRenderWorkerService$Wonderjs.getRecord(state);
  var lightMaterialRecord = RecordLightMaterialRenderWorkerService$Wonderjs.getRecord(state);
  var meshRendererRecord = RecordMeshRendererRenderWorkerService$Wonderjs.getRecord(state);
  var directionLightRecord = RecordDirectionLightRenderWorkerService$Wonderjs.getRecord(state);
  var pointLightRecord = RecordPointLightRenderWorkerService$Wonderjs.getRecord(state);
  var basicSourceTextureRecord = RecordBasicSourceTextureRenderWorkerService$Wonderjs.getRecord(state);
  var arrayBufferViewSourceTextureRecord = RecordArrayBufferViewSourceTextureRenderWorkerService$Wonderjs.getRecord(state);
  var workerDetectRecord = RecordWorkerDetectRenderWorkerService$Wonderjs.getRecord(state);
  var browserDetectRecord = RecordBrowserDetectRenderWorkerService$Wonderjs.getRecord(state);
  return /* record */[
          /* sceneRecord : record */[/* ambientLight : record */[/* color */AmbientLightSceneRenderWorkerService$Wonderjs.getAmbientLightColor(state)]],
          /* vboBufferRecord */vboBufferRecord,
          /* typeArrayPoolRecord */typeArrayPoolRecord,
          /* glslSenderRecord */glslSenderRecord,
          /* programRecord */programRecord,
          /* geometryRecord : record */[
            /* vertices */geometryRecord[/* vertices */0],
            /* texCoords */geometryRecord[/* texCoords */1],
            /* normals */geometryRecord[/* normals */2],
            /* indices16 */geometryRecord[/* indices16 */3],
            /* indices32 */geometryRecord[/* indices32 */4],
            /* verticesInfos */geometryRecord[/* verticesInfos */5],
            /* texCoordsInfos */geometryRecord[/* texCoordsInfos */6],
            /* normalsInfos */geometryRecord[/* normalsInfos */7],
            /* indicesInfos */geometryRecord[/* indicesInfos */8],
            /* indicesTypeMap */geometryRecord[/* indicesTypeMap */9]
          ],
          /* cameraRecord */OperateRenderRenderWorkerService$Wonderjs.getCameraRecord(state),
          /* basicMaterialRecord : record */[
            /* shaderIndices */RecordBasicMaterialRenderWorkerService$Wonderjs.unsafeGetShaderIndices(state),
            /* colors */OptionService$Wonderjs.unsafeGet(basicMaterialRecord[/* colors */1]),
            /* textureIndices */OptionService$Wonderjs.unsafeGet(basicMaterialRecord[/* textureIndices */2]),
            /* mapUnits */RecordBasicMaterialRenderWorkerService$Wonderjs.unsafeGetMapUnits(state),
            /* isDepthTests */RecordBasicMaterialRenderWorkerService$Wonderjs.unsafeGetIsDepthTests(state),
            /* alphas */RecordBasicMaterialRenderWorkerService$Wonderjs.unsafeGetAlphas(state)
          ],
          /* lightMaterialRecord : record */[
            /* shaderIndices */RecordLightMaterialRenderWorkerService$Wonderjs.unsafeGetShaderIndices(state),
            /* diffuseColors */OptionService$Wonderjs.unsafeGet(lightMaterialRecord[/* diffuseColors */1]),
            /* specularColors */OptionService$Wonderjs.unsafeGet(lightMaterialRecord[/* specularColors */2]),
            /* shininess */OptionService$Wonderjs.unsafeGet(lightMaterialRecord[/* shininess */3]),
            /* textureIndices */OptionService$Wonderjs.unsafeGet(lightMaterialRecord[/* textureIndices */4]),
            /* diffuseMapUnits */RecordLightMaterialRenderWorkerService$Wonderjs.unsafeGetDiffuseMapUnits(state),
            /* specularMapUnits */RecordLightMaterialRenderWorkerService$Wonderjs.unsafeGetSpecularMapUnits(state)
          ],
          /* meshRendererRecord : record */[/* drawModes */meshRendererRecord[/* drawModes */0]],
          /* basicSourceTextureRecord : record */[
            /* wrapSs */OptionService$Wonderjs.unsafeGet(basicSourceTextureRecord[/* wrapSs */0]),
            /* wrapTs */OptionService$Wonderjs.unsafeGet(basicSourceTextureRecord[/* wrapTs */1]),
            /* magFilters */OptionService$Wonderjs.unsafeGet(basicSourceTextureRecord[/* magFilters */2]),
            /* minFilters */OptionService$Wonderjs.unsafeGet(basicSourceTextureRecord[/* minFilters */3]),
            /* formats */OptionService$Wonderjs.unsafeGet(basicSourceTextureRecord[/* formats */4]),
            /* types */OptionService$Wonderjs.unsafeGet(basicSourceTextureRecord[/* types */5]),
            /* isNeedUpdates */OptionService$Wonderjs.unsafeGet(basicSourceTextureRecord[/* isNeedUpdates */6]),
            /* flipYs */OptionService$Wonderjs.unsafeGet(basicSourceTextureRecord[/* flipYs */7]),
            /* sourceMap */basicSourceTextureRecord[/* sourceMap */8],
            /* glTextureMap */basicSourceTextureRecord[/* glTextureMap */9],
            /* bindTextureUnitCacheMap */basicSourceTextureRecord[/* bindTextureUnitCacheMap */10],
            /* setFlipYFunc */OperateSourceTextureRenderWorkerService$Wonderjs.setFlipY
          ],
          /* arrayBufferViewSourceTextureRecord : record */[
            /* wrapSs */OptionService$Wonderjs.unsafeGet(arrayBufferViewSourceTextureRecord[/* wrapSs */0]),
            /* wrapTs */OptionService$Wonderjs.unsafeGet(arrayBufferViewSourceTextureRecord[/* wrapTs */1]),
            /* magFilters */OptionService$Wonderjs.unsafeGet(arrayBufferViewSourceTextureRecord[/* magFilters */2]),
            /* minFilters */OptionService$Wonderjs.unsafeGet(arrayBufferViewSourceTextureRecord[/* minFilters */3]),
            /* formats */OptionService$Wonderjs.unsafeGet(arrayBufferViewSourceTextureRecord[/* formats */4]),
            /* types */OptionService$Wonderjs.unsafeGet(arrayBufferViewSourceTextureRecord[/* types */5]),
            /* isNeedUpdates */OptionService$Wonderjs.unsafeGet(arrayBufferViewSourceTextureRecord[/* isNeedUpdates */6]),
            /* flipYs */OptionService$Wonderjs.unsafeGet(arrayBufferViewSourceTextureRecord[/* flipYs */7]),
            /* widths */OptionService$Wonderjs.unsafeGet(arrayBufferViewSourceTextureRecord[/* widths */8]),
            /* heights */OptionService$Wonderjs.unsafeGet(arrayBufferViewSourceTextureRecord[/* heights */9]),
            /* sourceMap */OptionService$Wonderjs.unsafeGet(arrayBufferViewSourceTextureRecord[/* sourceMap */10]),
            /* glTextureMap */arrayBufferViewSourceTextureRecord[/* glTextureMap */11],
            /* bindTextureUnitCacheMap */arrayBufferViewSourceTextureRecord[/* bindTextureUnitCacheMap */12],
            /* setFlipYFunc */OperateSourceTextureRenderWorkerService$Wonderjs.setFlipY,
            /* textureIndexOffset */IndexSourceTextureRenderWorkerService$Wonderjs.getArrayBufferViewSourceTextureIndexOffset(state)
          ],
          /* directionLightRecord : record */[
            /* index */directionLightRecord[/* index */0],
            /* colors */directionLightRecord[/* colors */3],
            /* intensities */directionLightRecord[/* intensities */4],
            /* renderLightArr */RecordRenderWorkerDirectionLightService$Wonderjs.getRenderLightArr(directionLightRecord),
            /* directionMap */RecordRenderWorkerDirectionLightService$Wonderjs.getDirectionMap(directionLightRecord)
          ],
          /* pointLightRecord : record */[
            /* index */pointLightRecord[/* index */0],
            /* colors */pointLightRecord[/* colors */3],
            /* intensities */pointLightRecord[/* intensities */4],
            /* constants */pointLightRecord[/* constants */5],
            /* linears */pointLightRecord[/* linears */6],
            /* quadratics */pointLightRecord[/* quadratics */7],
            /* ranges */pointLightRecord[/* ranges */8],
            /* renderLightArr */RecordRenderWorkerPointLightService$Wonderjs.getRenderLightArr(pointLightRecord),
            /* positionMap */RecordRenderWorkerPointLightService$Wonderjs.getPositionMap(pointLightRecord)
          ],
          /* transformRecord : record */[
            /* localToWorldMatrices */transformRecord[/* localToWorldMatrices */0],
            /* localToWorldMatrixCacheMap */transformRecord[/* localToWorldMatrixCacheMap */4],
            /* normalMatrixCacheMap */transformRecord[/* normalMatrixCacheMap */5]
          ],
          /* sourceInstanceRecord : record */[
            /* objectInstanceTransformIndexMap */RecordRenderWorkerSourceInstanceService$Wonderjs.unsafeGetObjectInstanceTransformIndexMap(sourceInstanceRecord),
            /* objectInstanceTransformCollections */RecordRenderWorkerSourceInstanceService$Wonderjs.unsafeGetObjectInstanceTransformCollections(sourceInstanceRecord),
            /* isTransformStatics */RecordRenderWorkerSourceInstanceService$Wonderjs.unsafeGetIsTransformStaticMap(sourceInstanceRecord),
            /* matrixInstanceBufferCapacityMap */sourceInstanceRecord[/* matrixInstanceBufferCapacityMap */3],
            /* matrixFloat32ArrayMap */sourceInstanceRecord[/* matrixFloat32ArrayMap */4],
            /* isSendTransformMatrixDataMap */sourceInstanceRecord[/* isSendTransformMatrixDataMap */5]
          ],
          /* gpuDetectRecord */gpuDetectRecord,
          /* globalTempRecord */globalTempRecord,
          /* deviceManagerRecord */deviceManagerRecord,
          /* settingRecord : record */[
            /* gpu */settingRecord[/* gpu */0],
            /* instanceBuffer *//* record */[/* objectInstanceCountPerSourceInstance */BufferRenderWorkerSettingService$Wonderjs.getObjectInstanceCountPerSourceInstance(settingRecord)],
            /* textureCountPerMaterial */BufferRenderWorkerSettingService$Wonderjs.getTextureCountPerMaterial(settingRecord)
          ],
          /* workerDetectRecord : record */[/* isUseWorker */workerDetectRecord[/* isUseWorker */0]],
          /* browserDetectRecord : record */[/* browser */browserDetectRecord[/* browser */0]],
          /* jobDataRecord */jobDataRecord,
          /* shaderRecord */shaderRecord
        ];
}

export {
  createRenderState ,
  
}
/* OptionService-Wonderjs Not a pure module */
