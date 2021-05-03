

import * as Most from "most";
import * as Curry from "./../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Js_option from "./../../../../../../node_modules/bs-platform/lib/es6/js_option.js";
import * as BufferUtils$Wonderjs from "../../../asset/utils/BufferUtils.js";
import * as ArrayService$Wonderjs from "../../../service/atom/ArrayService.js";
import * as DataViewCommon$Wonderjs from "../../../asset/generate/DataViewCommon.js";
import * as GenerateABUtils$Wonderjs from "../../utils/GenerateABUtils.js";
import * as ArrayService$WonderCommonlib from "./../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as ImmutableHashMapService$WonderCommonlib from "./../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ImmutableHashMapService.js";

function _getHashId (arrayBuffer){
    return crypto.subtle.digest("SHA-256", arrayBuffer)
    .then(hash => {
      // here hash is an arrayBuffer, so we'll convert it to its hex version
      let result = '';
      const view = new DataView(hash);
      for (let i = 0; i < hash.byteLength; i += 4) {
        result += ('00000000' + view.getUint32(i).toString(16)).slice(-8);
      }

      return result;
    });
    };

function buildManifestData(dependencyRelation, param, buildManifestFunc) {
  var abRelativePath = param[0];
  return Most.fromPromise(_getHashId(param[1]).then((function (hashId) {
                    return Promise.resolve(Curry._2(buildManifestFunc, hashId, Js_option.getWithDefault(ArrayService$WonderCommonlib.createEmpty(/* () */0), ImmutableHashMapService$WonderCommonlib.get(abRelativePath, dependencyRelation))));
                  })));
}

function _writeBuffer(headerAndManifestJsonAlignedByteOffset, buffer, wholeArrayBuffer) {
  var uint8Array = new Uint8Array(wholeArrayBuffer);
  return BufferUtils$Wonderjs.mergeArrayBuffer(uint8Array, buffer, headerAndManifestJsonAlignedByteOffset).buffer;
}

function generateAB(bufferTotalAlignedByteLength, manifestJsonUint8Array, buffer) {
  var match = GenerateABUtils$Wonderjs.computeByteLength(bufferTotalAlignedByteLength, manifestJsonUint8Array);
  var dataView = DataViewCommon$Wonderjs.create(new ArrayBuffer(match[2]));
  var byteOffset = GenerateABUtils$Wonderjs.writeHeader(match[0], bufferTotalAlignedByteLength, dataView);
  var emptyEncodedUint8Data = GenerateABUtils$Wonderjs.getEmptyEncodedUint8Data(/* () */0);
  var match$1 = GenerateABUtils$Wonderjs.writeJson(byteOffset, /* tuple */[
        emptyEncodedUint8Data,
        match[1],
        manifestJsonUint8Array
      ], dataView);
  return _writeBuffer(match$1[0], buffer, match$1[2].buffer);
}

var All = /* module */[
  /* _getHashId */_getHashId,
  /* buildManifestData */buildManifestData,
  /* _writeBuffer */_writeBuffer,
  /* generateAB */generateAB
];

function addManifestData(dependencyRelation, param) {
  var sab = param[1];
  var sabRelativePath = param[0];
  return Most.map((function (manifestData) {
                var manifestJsonUint8Array = GenerateABUtils$Wonderjs.buildJsonUint8Array(manifestData);
                return /* tuple */[
                        manifestData[/* hashId */0],
                        sabRelativePath,
                        generateAB(BufferUtils$Wonderjs.alignedLength(sab.byteLength), manifestJsonUint8Array, sab)
                      ];
              }), buildManifestData(dependencyRelation, /* tuple */[
                  sabRelativePath,
                  sab
                ], (function (hashId, dependencyRelation) {
                    return /* record */[
                            /* hashId */hashId,
                            /* dependencyRelation */dependencyRelation
                          ];
                  })));
}

var SAB = /* module */[/* addManifestData */addManifestData];

function addManifestData$1(dependencyRelation, param) {
  var rab = param[1];
  var rabRelativePath = param[0];
  return Most.map((function (manifestData) {
                var manifestJsonUint8Array = GenerateABUtils$Wonderjs.buildJsonUint8Array(manifestData);
                return /* tuple */[
                        manifestData[/* hashId */0],
                        rabRelativePath,
                        generateAB(BufferUtils$Wonderjs.alignedLength(rab.byteLength), manifestJsonUint8Array, rab)
                      ];
              }), buildManifestData(dependencyRelation, /* tuple */[
                  rabRelativePath,
                  rab
                ], (function (hashId, dependencyRelation) {
                    return /* record */[
                            /* hashId */hashId,
                            /* dependencyRelation */dependencyRelation
                          ];
                  })));
}

var RAB = /* module */[/* addManifestData */addManifestData$1];

function _addAllRABManifestData(rabDataArr, dependencyRelation) {
  return Most.reduce((function (param, param$1) {
                var rabRelativePath = param$1[1];
                return /* tuple */[
                        ImmutableHashMapService$WonderCommonlib.set(rabRelativePath, param$1[0], param[0]),
                        ArrayService$Wonderjs.push(/* tuple */[
                              rabRelativePath,
                              param$1[2]
                            ], param[1])
                      ];
              }), /* tuple */[
              ImmutableHashMapService$WonderCommonlib.createEmpty(/* () */0),
              ArrayService$WonderCommonlib.createEmpty(/* () */0)
            ], Most.mergeArray(rabDataArr.map((function (data) {
                        return addManifestData$1(dependencyRelation, data);
                      }))));
}

function _addAllSABManifestData(wholeHashIdMap, sabDataArr, dependencyRelation) {
  return Most.reduce((function (param, param$1) {
                var sabRelativePath = param$1[1];
                return /* tuple */[
                        ImmutableHashMapService$WonderCommonlib.set(sabRelativePath, param$1[0], param[0]),
                        ArrayService$Wonderjs.push(/* tuple */[
                              sabRelativePath,
                              param$1[2]
                            ], param[1])
                      ];
              }), /* tuple */[
              wholeHashIdMap,
              ArrayService$WonderCommonlib.createEmpty(/* () */0)
            ], Most.mergeArray(sabDataArr.map((function (data) {
                        return addManifestData(dependencyRelation, data);
                      }))));
}

function addManifestData$2(dependencyRelation, param) {
  var sabDataArr = param[0];
  ImmutableHashMapService$WonderCommonlib.createEmpty(/* () */0);
  return Most.fromPromise(_addAllRABManifestData(param[1], dependencyRelation).then((function (param) {
                    var newRabDataArr = param[1];
                    return _addAllSABManifestData(param[0], sabDataArr, dependencyRelation).then((function (param) {
                                  return Promise.resolve(/* tuple */[
                                              param[0],
                                              newRabDataArr,
                                              param[1]
                                            ]);
                                }));
                  })));
}

export {
  All ,
  SAB ,
  RAB ,
  _addAllRABManifestData ,
  _addAllSABManifestData ,
  addManifestData$2 as addManifestData,
  
}
/* most Not a pure module */
