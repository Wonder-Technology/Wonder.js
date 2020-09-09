'use strict';

var TypeArrayCPRepoUtils$Wonderjs = require("../../../../structure/utils/TypeArrayCPRepoUtils.bs.js");
var BufferDirectionLightCPRepoUtils$Wonderjs = require("./BufferDirectionLightCPRepoUtils.bs.js");

function getColor(index, typeArr) {
  return TypeArrayCPRepoUtils$Wonderjs.getFloat3Tuple(BufferDirectionLightCPRepoUtils$Wonderjs.getColorIndex(index), typeArr);
}

function setColor(index, data, typeArr) {
  return TypeArrayCPRepoUtils$Wonderjs.setFloat3(BufferDirectionLightCPRepoUtils$Wonderjs.getColorIndex(index), data, typeArr);
}

function getIntensity(index, typeArr) {
  return TypeArrayCPRepoUtils$Wonderjs.getFloat1(BufferDirectionLightCPRepoUtils$Wonderjs.getIntensityIndex(index), typeArr);
}

function setIntensity(index, data, typeArr) {
  return TypeArrayCPRepoUtils$Wonderjs.setFloat1(BufferDirectionLightCPRepoUtils$Wonderjs.getIntensityIndex(index), data, typeArr);
}

exports.getColor = getColor;
exports.setColor = setColor;
exports.getIntensity = getIntensity;
exports.setIntensity = setIntensity;
/* No side effect */
