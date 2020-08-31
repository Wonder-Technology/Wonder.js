'use strict';

var Tuple3$Wonderjs = require("../../../../library/structure/Tuple3.bs.js");
var AngleVO$Wonderjs = require("./AngleVO.bs.js");
var Matrix4$Wonderjs = require("../../../../library/structure/Matrix4.bs.js");
var ScaleVO$Wonderjs = require("./ScaleVO.bs.js");
var PositionVO$Wonderjs = require("./PositionVO.bs.js");
var RotationVO$Wonderjs = require("./RotationVO.bs.js");
var EulerAnglesVO$Wonderjs = require("./EulerAnglesVO.bs.js");

function create(value) {
  return /* LocalToWorldMatrix */{
          _0: value
        };
}

function value(mat) {
  return mat._0;
}

function fromTranslationRotationScale(result, position, rotation, scale) {
  return /* LocalToWorldMatrix */{
          _0: Matrix4$Wonderjs.fromTranslationRotationScale(result._0, PositionVO$Wonderjs.value(position), RotationVO$Wonderjs.value(rotation), ScaleVO$Wonderjs.value(scale))
        };
}

function multiply(result, mat1, mat2) {
  return /* LocalToWorldMatrix */{
          _0: Matrix4$Wonderjs.multiply(result._0, mat1._0, mat2._0)
        };
}

function getTranslation(mat) {
  return PositionVO$Wonderjs.create(Matrix4$Wonderjs.getTranslationTuple(mat._0));
}

function getRotation(mat) {
  return RotationVO$Wonderjs.create(Matrix4$Wonderjs.getRotationTuple(mat._0));
}

function getScale(mat) {
  return ScaleVO$Wonderjs.create(Matrix4$Wonderjs.getScaleTuple(mat._0));
}

function getEulerAngles(mat) {
  return EulerAnglesVO$Wonderjs.create(Tuple3$Wonderjs.map(Matrix4$Wonderjs.getEulerAngles(mat._0), AngleVO$Wonderjs.create));
}

exports.create = create;
exports.value = value;
exports.fromTranslationRotationScale = fromTranslationRotationScale;
exports.multiply = multiply;
exports.getTranslation = getTranslation;
exports.getRotation = getRotation;
exports.getScale = getScale;
exports.getEulerAngles = getEulerAngles;
/* No side effect */
