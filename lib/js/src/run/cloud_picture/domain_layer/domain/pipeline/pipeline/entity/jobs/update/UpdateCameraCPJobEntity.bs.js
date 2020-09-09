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
var DpContainer$Wonderjs = require("../../../../../../../../../construct/domain_layer/dependency/container/DpContainer.bs.js");
var CameraCPRepo$Wonderjs = require("../../../../../../repo/pipeline/CameraCPRepo.bs.js");
var ResultOption$Wonderjs = require("../../../../../../../../../construct/domain_layer/library/structure/ResultOption.bs.js");
var ViewMatrixVO$Wonderjs = require("../../../../../../../../../construct/domain_layer/domain/scene/scene_graph/value_object/ViewMatrixVO.bs.js");
var UniformBufferVO$Wonderjs = require("../../../../../../../../../construct/domain_layer/domain/webgpu/core/value_object/UniformBufferVO.bs.js");
var ProjectionMatrixVO$Wonderjs = require("../../../../../../../../../construct/domain_layer/domain/scene/scene_graph/value_object/ProjectionMatrixVO.bs.js");
var TypeArrayCPRepoUtils$Wonderjs = require("../../../../../../repo/structure/utils/TypeArrayCPRepoUtils.bs.js");
var BasicCameraViewRunAPI$Wonderjs = require("../../../../../../../../../construct/external_layer/api/run/BasicCameraViewRunAPI.bs.js");
var ActiveBasicCameraViewDoService$Wonderjs = require("../../../../../../../../../construct/domain_layer/domain/scene/scene_graph/service/basic_camera_view/ActiveBasicCameraViewDoService.bs.js");
var GetComponentGameObjectDoService$Wonderjs = require("../../../../../../../../../construct/domain_layer/domain/scene/scene_graph/service/gameObject/GetComponentGameObjectDoService.bs.js");
var PerspectiveCameraProjectionRunAPI$Wonderjs = require("../../../../../../../../../construct/external_layer/api/run/PerspectiveCameraProjectionRunAPI.bs.js");
var GameObjectBasicCameraViewDoService$Wonderjs = require("../../../../../../../../../construct/domain_layer/domain/scene/scene_graph/service/basic_camera_view/GameObjectBasicCameraViewDoService.bs.js");
var UpdatePerspectiveCameraProjectionDoService$Wonderjs = require("../../../../../../../../../construct/domain_layer/domain/scene/scene_graph/service/perspective_camera_projection/UpdatePerspectiveCameraProjectionDoService.bs.js");

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
                                hd: TypeArrayCPRepoUtils$Wonderjs.setFloat32Array(0, viewInverse, cameraBufferData),
                                tl: {
                                  hd: TypeArrayCPRepoUtils$Wonderjs.setFloat32Array(16, projectionInverse, cameraBufferData),
                                  tl: {
                                    hd: TypeArrayCPRepoUtils$Wonderjs.setFloat2(32, [
                                          near,
                                          far
                                        ], cameraBufferData),
                                    tl: /* [] */0
                                  }
                                }
                              }), (function (param) {
                              Curry._3(DpContainer$Wonderjs.unsafeGetWebGPUCoreDp(undefined).buffer.setSubFloat32Data, 0, cameraBufferData, UniformBufferVO$Wonderjs.value(cameraBuffer));
                              return CameraCPRepo$Wonderjs.setCameraBufferData([
                                          cameraBuffer,
                                          cameraBufferData
                                        ]);
                            }));
              }));
}

function _updateCamera(param) {
  return Result$Wonderjs.bind(ResultOption$Wonderjs.openInverse(ActiveBasicCameraViewDoService$Wonderjs.getActiveCameraView(undefined)), (function (activeCameraView) {
                return Result$Wonderjs.bind(Result$Wonderjs.bind(Result$Wonderjs.bind(OptionSt$Wonderjs.get(GameObjectBasicCameraViewDoService$Wonderjs.getGameObject(activeCameraView)), (function (gameObject) {
                                      return Tuple2$Wonderjs.collectOption(GetComponentGameObjectDoService$Wonderjs.getTransform(gameObject), GetComponentGameObjectDoService$Wonderjs.getPerspectiveCameraProjection(gameObject));
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
  return Most.just(UpdatePerspectiveCameraProjectionDoService$Wonderjs.update(undefined));
}

exports.create = create;
exports._updateCameraBuffer = _updateCameraBuffer;
exports._updateCamera = _updateCamera;
exports.exec = exec;
/* most Not a pure module */
