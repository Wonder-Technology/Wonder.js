'use strict';

var Most = require("most");
var Curry = require("bs-platform/lib/js/curry.js");
var FarVO$Wonderjs = require("../../../../../../../../../construct/domain_layer/domain/scene/scene_graph/value_object/FarVO.bs.js");
var NearVO$Wonderjs = require("../../../../../../../../../construct/domain_layer/domain/scene/scene_graph/value_object/NearVO.bs.js");
var Result$Wonderjs = require("../../../../../../../../../construct/domain_layer/library/structure/Result.bs.js");
var Tuple2$Wonderjs = require("../../../../../../../../../construct/domain_layer/library/structure/tuple/Tuple2.bs.js");
var Tuple4$Wonderjs = require("../../../../../../../../../construct/domain_layer/library/structure/tuple/Tuple4.bs.js");
var Matrix4$Wonderjs = require("../../../../../../../../../construct/domain_layer/library/structure/matrix/Matrix4.bs.js");
var OptionSt$Wonderjs = require("../../../../../../../../../construct/domain_layer/library/structure/OptionSt.bs.js");
var JobEntity$Wonderjs = require("../../../../../../../../../construct/domain_layer/domain/pipeline/pipeline/entity/JobEntity.bs.js");
var ListResult$Wonderjs = require("../../../../../../../../../construct/domain_layer/library/structure/ListResult.bs.js");
var CameraCPRepo$Wonderjs = require("../../../../../../repo/pipeline/CameraCPRepo.bs.js");
var ResultOption$Wonderjs = require("../../../../../../../../../construct/domain_layer/library/structure/ResultOption.bs.js");
var ViewMatrixVO$Wonderjs = require("../../../../../../../../../construct/domain_layer/domain/scene/scene_graph/value_object/ViewMatrixVO.bs.js");
var UniformBufferVO$Wonderjs = require("../../../../../../../../../construct/domain_layer/domain/webgpu/core/value_object/UniformBufferVO.bs.js");
var GameObjectRunAPI$Wonderjs = require("../../../../../../../../../construct/external_layer/api/run/domain/GameObjectRunAPI.bs.js");
var ProjectionMatrixVO$Wonderjs = require("../../../../../../../../../construct/domain_layer/domain/scene/scene_graph/value_object/ProjectionMatrixVO.bs.js");
var WebGPUCoreDpRunAPI$Wonderjs = require("../../../../../../../../../construct/external_layer/api/run/dependency/WebGPUCoreDpRunAPI.bs.js");
var TypeArrayCPRepoUtils$Wonderjs = require("../../../../../../../infrastructure_layer/dependency/repo/scene/component/utils/TypeArrayCPRepoUtils.bs.js");
var BasicCameraViewRunAPI$Wonderjs = require("../../../../../../../../../construct/external_layer/api/run/domain/BasicCameraViewRunAPI.bs.js");
var PerspectiveCameraProjectionRunAPI$Wonderjs = require("../../../../../../../../../construct/external_layer/api/run/domain/PerspectiveCameraProjectionRunAPI.bs.js");

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
  return ResultOption$Wonderjs.openInverseSucceedWithNone(BasicCameraViewRunAPI$Wonderjs.getActiveBasicCameraView(undefined), (function (activeCameraView) {
                return Result$Wonderjs.bind(Result$Wonderjs.bind(Result$Wonderjs.bind(OptionSt$Wonderjs.get(BasicCameraViewRunAPI$Wonderjs.getGameObject(activeCameraView)), (function (gameObject) {
                                      return Tuple2$Wonderjs.collectOption(GameObjectRunAPI$Wonderjs.getTransform(gameObject), GameObjectRunAPI$Wonderjs.getPerspectiveCameraProjection(gameObject));
                                    })), (function (param) {
                                  var cameraProjection = param[1];
                                  return Tuple4$Wonderjs.collectResult(Result$Wonderjs.bind(ResultOption$Wonderjs.openInverse(BasicCameraViewRunAPI$Wonderjs.getViewWorldToCameraMatrix(activeCameraView)), (function (viewMatrix) {
                                                    return Matrix4$Wonderjs.invert(Matrix4$Wonderjs.createIdentityMatrix4(undefined), ViewMatrixVO$Wonderjs.value(viewMatrix));
                                                  })), Result$Wonderjs.bind(OptionSt$Wonderjs.get(PerspectiveCameraProjectionRunAPI$Wonderjs.getPMatrix(cameraProjection)), (function (projectionMatrix) {
                                                    return Matrix4$Wonderjs.invert(Matrix4$Wonderjs.createIdentityMatrix4(undefined), ProjectionMatrixVO$Wonderjs.value(projectionMatrix));
                                                  })), Result$Wonderjs.mapSuccess(OptionSt$Wonderjs.get(PerspectiveCameraProjectionRunAPI$Wonderjs.getNear(cameraProjection)), NearVO$Wonderjs.value), Result$Wonderjs.mapSuccess(OptionSt$Wonderjs.get(PerspectiveCameraProjectionRunAPI$Wonderjs.getFar(cameraProjection)), FarVO$Wonderjs.value));
                                })), (function (param) {
                              return _updateCameraBuffer([
                                          param[0],
                                          param[1],
                                          param[2],
                                          param[3]
                                        ]);
                            }));
              }));
}

function exec(param) {
  return Most.just(ListResult$Wonderjs.mergeResults({
                  hd: PerspectiveCameraProjectionRunAPI$Wonderjs.update(undefined),
                  tl: {
                    hd: _updateCamera(undefined),
                    tl: /* [] */0
                  }
                }));
}

exports.create = create;
exports._updateCameraBuffer = _updateCameraBuffer;
exports._updateCamera = _updateCamera;
exports.exec = exec;
/* most Not a pure module */
