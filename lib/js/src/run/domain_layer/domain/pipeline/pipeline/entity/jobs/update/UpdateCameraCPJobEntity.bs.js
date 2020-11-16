'use strict';

var Most = require("most");
var Curry = require("bs-platform/lib/js/curry.js");
var FarVO$Wonderjs = require("../../../../../../../../construct/domain_layer/domain/scene/scene_graph/value_object/FarVO.bs.js");
var NearVO$Wonderjs = require("../../../../../../../../construct/domain_layer/domain/scene/scene_graph/value_object/NearVO.bs.js");
var Result$Wonderjs = require("../../../../../../../../construct/domain_layer/library/structure/Result.bs.js");
var Tuple2$Wonderjs = require("../../../../../../../../construct/domain_layer/library/structure/tuple/Tuple2.bs.js");
var Matrix4$Wonderjs = require("../../../../../../../../construct/domain_layer/library/structure/matrix/Matrix4.bs.js");
var OptionSt$Wonderjs = require("../../../../../../../../construct/domain_layer/library/structure/OptionSt.bs.js");
var JobEntity$Wonderjs = require("../../../../../../../../construct/domain_layer/domain/pipeline/pipeline/entity/JobEntity.bs.js");
var ListResult$Wonderjs = require("../../../../../../../../construct/domain_layer/library/structure/ListResult.bs.js");
var SceneRunAPI$Wonderjs = require("../../../../../../../../construct/external_layer/api/domain/SceneRunAPI.bs.js");
var CameraCPRepo$Wonderjs = require("../../../../../../repo/pipeline/CameraCPRepo.bs.js");
var ViewMatrixVO$Wonderjs = require("../../../../../../../../construct/domain_layer/domain/scene/scene_graph/value_object/ViewMatrixVO.bs.js");
var UniformBufferVO$Wonderjs = require("../../../../../../../../construct/domain_layer/domain/webgpu/core/value_object/UniformBufferVO.bs.js");
var GameObjectRunAPI$Wonderjs = require("../../../../../../../../construct/external_layer/api/domain/GameObjectRunAPI.bs.js");
var ProjectionMatrixVO$Wonderjs = require("../../../../../../../../construct/domain_layer/domain/scene/scene_graph/value_object/ProjectionMatrixVO.bs.js");
var WebGPUCoreDpRunAPI$Wonderjs = require("../../../../../../../../construct/external_layer/api/dependency/WebGPUCoreDpRunAPI.bs.js");
var TypeArrayCPRepoUtils$Wonderjs = require("../../../../../../../infrastructure_layer/dependency/repo/utils/TypeArrayCPRepoUtils.bs.js");
var BasicCameraViewRunAPI$Wonderjs = require("../../../../../../../../construct/external_layer/api/domain/BasicCameraViewRunAPI.bs.js");
var PerspectiveCameraProjectionRunAPI$Wonderjs = require("../../../../../../../../construct/external_layer/api/domain/PerspectiveCameraProjectionRunAPI.bs.js");

function create(param) {
  return JobEntity$Wonderjs.create("update_camera");
}

function _updateCameraBuffer(param) {
  var far = param[3];
  var near = param[2];
  var projectionInverse = param[1];
  var viewInverse = param[0];
  return Result$Wonderjs.bind(OptionSt$Wonderjs.get(CameraCPRepo$Wonderjs.getCameraBufferData(undefined)), (function (param) {
                var cameraBufferData = param[1];
                var cameraBuffer = param[0];
                return Result$Wonderjs.mapSuccess(ListResult$Wonderjs.mergeResults({
                                hd: TypeArrayCPRepoUtils$Wonderjs.setFloat16WithFloat32Array(0, viewInverse, cameraBufferData),
                                tl: {
                                  hd: TypeArrayCPRepoUtils$Wonderjs.setFloat16WithFloat32Array(16, projectionInverse, cameraBufferData),
                                  tl: {
                                    hd: TypeArrayCPRepoUtils$Wonderjs.setFloat2(32, [
                                          near,
                                          far
                                        ], cameraBufferData),
                                    tl: /* [] */0
                                  }
                                }
                              }), (function (param) {
                              Curry._3(WebGPUCoreDpRunAPI$Wonderjs.unsafeGet(undefined).buffer.setSubFloat32Data, 0, cameraBufferData, UniformBufferVO$Wonderjs.value(cameraBuffer));
                              return CameraCPRepo$Wonderjs.setCameraBufferData([
                                          cameraBuffer,
                                          cameraBufferData
                                        ]);
                            }));
              }));
}

function _updateCamera(param) {
  return Result$Wonderjs.bind(OptionSt$Wonderjs.get(BasicCameraViewRunAPI$Wonderjs.getActiveBasicCameraView(SceneRunAPI$Wonderjs.getSceneGameObject(undefined))), (function (activeCameraView) {
                return Result$Wonderjs.bind(OptionSt$Wonderjs.get(GameObjectRunAPI$Wonderjs.getPerspectiveCameraProjection(BasicCameraViewRunAPI$Wonderjs.getGameObject(activeCameraView))), (function (cameraProjection) {
                              return Result$Wonderjs.bind(Tuple2$Wonderjs.collectResult(Matrix4$Wonderjs.invert(Matrix4$Wonderjs.createIdentityMatrix4(undefined), ViewMatrixVO$Wonderjs.value(BasicCameraViewRunAPI$Wonderjs.getViewWorldToCameraMatrix(activeCameraView))), Matrix4$Wonderjs.invert(Matrix4$Wonderjs.createIdentityMatrix4(undefined), ProjectionMatrixVO$Wonderjs.value(PerspectiveCameraProjectionRunAPI$Wonderjs.getPMatrix(cameraProjection)))), (function (param) {
                                            return _updateCameraBuffer([
                                                        param[0],
                                                        param[1],
                                                        NearVO$Wonderjs.value(PerspectiveCameraProjectionRunAPI$Wonderjs.getNear(cameraProjection)),
                                                        FarVO$Wonderjs.value(PerspectiveCameraProjectionRunAPI$Wonderjs.getFar(cameraProjection))
                                                      ]);
                                          }));
                            }));
              }));
}

function exec(param) {
  return Most.just(_updateCamera(undefined));
}

exports.create = create;
exports._updateCameraBuffer = _updateCameraBuffer;
exports._updateCamera = _updateCamera;
exports.exec = exec;
/* most Not a pure module */
