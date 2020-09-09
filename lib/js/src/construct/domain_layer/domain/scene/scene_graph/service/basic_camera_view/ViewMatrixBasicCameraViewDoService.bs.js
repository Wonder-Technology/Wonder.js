'use strict';

var Result$Wonderjs = require("../../../../../library/structure/Result.bs.js");
var Matrix4$Wonderjs = require("../../../../../library/structure/matrix/Matrix4.bs.js");
var OptionSt$Wonderjs = require("../../../../../library/structure/OptionSt.bs.js");
var ViewMatrixVO$Wonderjs = require("../../value_object/ViewMatrixVO.bs.js");
var LocalToWorldMatrixVO$Wonderjs = require("../../value_object/LocalToWorldMatrixVO.bs.js");
var ModelMatrixTransformDoService$Wonderjs = require("../transform/ModelMatrixTransformDoService.bs.js");
var GetComponentGameObjectDoService$Wonderjs = require("../gameObject/GetComponentGameObjectDoService.bs.js");
var GameObjectBasicCameraViewDoService$Wonderjs = require("./GameObjectBasicCameraViewDoService.bs.js");

function getViewWorldToCameraMatrix(cameraView) {
  return OptionSt$Wonderjs.sequenceResultM(OptionSt$Wonderjs.open_(OptionSt$Wonderjs.map(GameObjectBasicCameraViewDoService$Wonderjs.getGameObject(cameraView), (function (gameObject) {
                        return OptionSt$Wonderjs.map(GetComponentGameObjectDoService$Wonderjs.getTransform(gameObject), (function (transform) {
                                      return Result$Wonderjs.mapSuccess(LocalToWorldMatrixVO$Wonderjs.invert(Matrix4$Wonderjs.createIdentityMatrix4(undefined), ModelMatrixTransformDoService$Wonderjs.getLocalToWorldMatrix(transform)), ViewMatrixVO$Wonderjs.create);
                                    }));
                      }))));
}

exports.getViewWorldToCameraMatrix = getViewWorldToCameraMatrix;
/* No side effect */
