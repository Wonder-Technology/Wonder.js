'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Log$Wonderjs = require("../../../../../../../construct/domain_layer/library/log/Log.bs.js");
var CPRepo$Wonderjs = require("../../../../data/container/CPRepo.bs.js");
var ListSt$Wonderjs = require("../../../../../../../construct/domain_layer/library/structure/ListSt.bs.js");
var Contract$Wonderjs = require("../../../../../../../construct/domain_layer/library/contract/Contract.bs.js");
var OptionSt$Wonderjs = require("../../../../../../../construct/domain_layer/library/structure/OptionSt.bs.js");
var ImmutableSparseMap$Wonderjs = require("../../../../../../../construct/domain_layer/library/structure/sparse_map/ImmutableSparseMap.bs.js");
var OtherConfigDpRunAPI$Wonderjs = require("../../../../../../../construct/external_layer/api/run/dependency/OtherConfigDpRunAPI.bs.js");

function getMaxIndex(param) {
  return CPRepo$Wonderjs.getBasicCameraView(undefined).maxIndex;
}

function setMaxIndex(maxIndex) {
  var init = CPRepo$Wonderjs.getBasicCameraView(undefined);
  return CPRepo$Wonderjs.setBasicCameraView({
              maxIndex: maxIndex,
              isActiveMap: init.isActiveMap,
              gameObjectMap: init.gameObjectMap
            });
}

function getGameObject(cameraView) {
  return ImmutableSparseMap$Wonderjs.getNullable(CPRepo$Wonderjs.getBasicCameraView(undefined).gameObjectMap, cameraView);
}

function setGameObject(cameraView, gameObject) {
  var cameraViewPO = CPRepo$Wonderjs.getBasicCameraView(undefined);
  return CPRepo$Wonderjs.setBasicCameraView({
              maxIndex: cameraViewPO.maxIndex,
              isActiveMap: cameraViewPO.isActiveMap,
              gameObjectMap: ImmutableSparseMap$Wonderjs.set(cameraViewPO.gameObjectMap, cameraView, gameObject)
            });
}

function isActive(cameraView) {
  return OptionSt$Wonderjs.getWithDefault(ImmutableSparseMap$Wonderjs.get(CPRepo$Wonderjs.getBasicCameraView(undefined).isActiveMap, cameraView), false);
}

function setAllNotActive(param) {
  var cameraViewPO = CPRepo$Wonderjs.getBasicCameraView(undefined);
  return CPRepo$Wonderjs.setBasicCameraView({
              maxIndex: cameraViewPO.maxIndex,
              isActiveMap: ImmutableSparseMap$Wonderjs.map(cameraViewPO.isActiveMap, (function (value) {
                      return false;
                    })),
              gameObjectMap: cameraViewPO.gameObjectMap
            });
}

function setActive(cameraView, isActive) {
  var cameraViewPO = CPRepo$Wonderjs.getBasicCameraView(undefined);
  return CPRepo$Wonderjs.setBasicCameraView({
              maxIndex: cameraViewPO.maxIndex,
              isActiveMap: ImmutableSparseMap$Wonderjs.set(cameraViewPO.isActiveMap, cameraView, isActive),
              gameObjectMap: cameraViewPO.gameObjectMap
            });
}

function getActiveBasicCameraViews(param) {
  return Contract$Wonderjs.ensureCheck(ImmutableSparseMap$Wonderjs.reducei(CPRepo$Wonderjs.getBasicCameraView(undefined).isActiveMap, (function (list, isActive, cameraView) {
                    if (isActive === true) {
                      return ListSt$Wonderjs.push(list, cameraView);
                    } else {
                      return list;
                    }
                  }), /* [] */0), (function (r) {
                return Contract$Wonderjs.test(Log$Wonderjs.buildAssertMessage("only has one active cameraView at most", "not"), (function (param) {
                              return Contract$Wonderjs.Operators.$less$eq(ListSt$Wonderjs.length(r), 1);
                            }));
              }), Curry._1(OtherConfigDpRunAPI$Wonderjs.unsafeGet(undefined).getIsDebug, undefined));
}

exports.getMaxIndex = getMaxIndex;
exports.setMaxIndex = setMaxIndex;
exports.getGameObject = getGameObject;
exports.setGameObject = setGameObject;
exports.isActive = isActive;
exports.setAllNotActive = setAllNotActive;
exports.setActive = setActive;
exports.getActiveBasicCameraViews = getActiveBasicCameraViews;
/* CPRepo-Wonderjs Not a pure module */
