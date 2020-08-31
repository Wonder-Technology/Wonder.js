'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Log$Wonderjs = require("../../../../../library/log/Log.bs.js");
var Result$Wonderjs = require("../../../../../library/structure/Result.bs.js");
var Contract$Wonderjs = require("../../../../../library/contract/Contract.bs.js");
var DpContainer$Wonderjs = require("../../../../../dependency/container/DpContainer.bs.js");
var TransformEntity$Wonderjs = require("../../entity/TransformEntity.bs.js");
var GameObjectEntity$Wonderjs = require("../../entity/GameObjectEntity.bs.js");
var AddTransformDoService$Wonderjs = require("../transform/AddTransformDoService.bs.js");

function _addComponent(param, param$1) {
  var handleAddComponentFunc = param$1[2];
  var addComponentFunc = param$1[1];
  var hasComponentFunc = param$1[0];
  var component = param[1];
  var gameObject = param[0];
  return Result$Wonderjs.mapSuccess(Contract$Wonderjs.requireCheck((function (param) {
                    return Contract$Wonderjs.test(Log$Wonderjs.buildAssertMessage("this type of the component shouldn\'t be added before", "not"), (function (param) {
                                  return Contract$Wonderjs.assertFalse(Curry._1(hasComponentFunc, gameObject));
                                }));
                  }), Curry._1(DpContainer$Wonderjs.unsafeGetOtherConfigDp(undefined).getIsDebug, undefined)), (function (param) {
                Curry._2(addComponentFunc, gameObject, component);
                handleAddComponentFunc(component, gameObject);
                return GameObjectEntity$Wonderjs.create(gameObject);
              }));
}

function addTransform(gameObject, transform) {
  return _addComponent([
              GameObjectEntity$Wonderjs.value(gameObject),
              TransformEntity$Wonderjs.value(transform)
            ], [
              DpContainer$Wonderjs.unsafeGetGameObjectRepoDp(undefined).hasTransform,
              DpContainer$Wonderjs.unsafeGetGameObjectRepoDp(undefined).addTransform,
              AddTransformDoService$Wonderjs.handleAddComponent
            ]);
}

exports._addComponent = _addComponent;
exports.addTransform = addTransform;
/* No side effect */
