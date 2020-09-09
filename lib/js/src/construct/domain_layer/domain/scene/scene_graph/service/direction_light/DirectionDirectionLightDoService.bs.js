'use strict';

var Vector3$Wonderjs = require("../../../../../library/structure/Vector3.bs.js");
var OptionSt$Wonderjs = require("../../../../../library/structure/OptionSt.bs.js");
var DirectionVO$Wonderjs = require("../../value_object/DirectionVO.bs.js");
var EulerAnglesVO$Wonderjs = require("../../value_object/EulerAnglesVO.bs.js");
var UpdateTransformDoService$Wonderjs = require("../transform/UpdateTransformDoService.bs.js");
var GetComponentGameObjectDoService$Wonderjs = require("../gameObject/GetComponentGameObjectDoService.bs.js");
var GameObjectDirectionLightDoService$Wonderjs = require("./GameObjectDirectionLightDoService.bs.js");

function getDirection(light) {
  return OptionSt$Wonderjs.open_(OptionSt$Wonderjs.map(GameObjectDirectionLightDoService$Wonderjs.getGameObject(light), (function (gameObject) {
                    return OptionSt$Wonderjs.map(GetComponentGameObjectDoService$Wonderjs.getTransform(gameObject), (function (transform) {
                                  return DirectionVO$Wonderjs.create(Vector3$Wonderjs.transformQuat(EulerAnglesVO$Wonderjs.convertToQuaternion(UpdateTransformDoService$Wonderjs.updateAndGetEulerAngles(transform)), [
                                                  0,
                                                  0,
                                                  1
                                                ]));
                                }));
                  })));
}

exports.getDirection = getDirection;
/* No side effect */
