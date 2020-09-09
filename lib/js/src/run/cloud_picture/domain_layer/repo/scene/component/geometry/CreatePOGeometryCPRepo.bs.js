'use strict';

var Result$Wonderjs = require("../../../../../../../construct/domain_layer/library/structure/Result.bs.js");
var POConfigCPRepo$Wonderjs = require("../../../POConfigCPRepo.bs.js");
var BufferGeometryCPRepoUtils$Wonderjs = require("./utils/BufferGeometryCPRepoUtils.bs.js");
var CreateMapComponentCPRepoUtils$Wonderjs = require("../utils/CreateMapComponentCPRepoUtils.bs.js");
var CreateTypeArrayGeometryCPRepoUtils$Wonderjs = require("./utils/CreateTypeArrayGeometryCPRepoUtils.bs.js");

function _initBufferData(geometryPointCount, geometryCount) {
  return Result$Wonderjs.mapSuccess(BufferGeometryCPRepoUtils$Wonderjs.createBuffer(geometryPointCount, geometryCount), (function (buffer) {
                return [
                        buffer,
                        CreateTypeArrayGeometryCPRepoUtils$Wonderjs.createTypeArrays(buffer, geometryPointCount, geometryCount)
                      ];
              }));
}

function createPO(param) {
  var geometryPointCount = POConfigCPRepo$Wonderjs.getGeometryPointCount(undefined);
  var geometryCount = POConfigCPRepo$Wonderjs.getGeometryCount(undefined);
  return Result$Wonderjs.mapSuccess(_initBufferData(geometryPointCount, geometryCount), (function (param) {
                var match = param[1];
                return {
                        maxIndex: 0,
                        buffer: param[0],
                        vertices: match[0],
                        normals: match[1],
                        indices: match[2],
                        verticesInfos: match[3],
                        normalsInfos: match[4],
                        indicesInfos: match[5],
                        verticesOffset: 0,
                        normalsOffset: 0,
                        indicesOffset: 0,
                        gameObjectsMap: CreateMapComponentCPRepoUtils$Wonderjs.createEmptyMap(geometryCount)
                      };
              }));
}

exports._initBufferData = _initBufferData;
exports.createPO = createPO;
/* POConfigCPRepo-Wonderjs Not a pure module */
