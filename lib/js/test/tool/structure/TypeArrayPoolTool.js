'use strict';

var TypeArrayPoolService$Wonderjs = require("../../../src/service/record/main/typeArrayPool/TypeArrayPoolService.js");

var addFloat32TypeArrayToPool = TypeArrayPoolService$Wonderjs.addFloat32TypeArrayToPool;

var addUint16TypeArrayToPool = TypeArrayPoolService$Wonderjs.addUint16TypeArrayToPool;

var getFloat32TypeArrayFromPool = TypeArrayPoolService$Wonderjs.getFloat32TypeArrayFromPool;

var getFloat32ArrayPoolMap = TypeArrayPoolService$Wonderjs.getFloat32ArrayPoolMap;

var getUint16TypeArrayFromPool = TypeArrayPoolService$Wonderjs.getUint16TypeArrayFromPool;

var getTypeArrayFromPool = TypeArrayPoolService$Wonderjs._getTypeArrayFromPool;

exports.addFloat32TypeArrayToPool = addFloat32TypeArrayToPool;
exports.addUint16TypeArrayToPool = addUint16TypeArrayToPool;
exports.getFloat32TypeArrayFromPool = getFloat32TypeArrayFromPool;
exports.getFloat32ArrayPoolMap = getFloat32ArrayPoolMap;
exports.getUint16TypeArrayFromPool = getUint16TypeArrayFromPool;
exports.getTypeArrayFromPool = getTypeArrayFromPool;
/* No side effect */
