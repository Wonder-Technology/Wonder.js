'use strict';

var Most = require("most");
var MainStateTool$Wonderjs = require("../../../../tool/service/state/MainStateTool.js");
var LoaderManagerSystem$Wonderjs = require("../../../../../src/asset/LoaderManagerSystem.js");
var ReadStreamChunkSystem$Wonderjs = require("../../../../../src/asset/loader/ReadStreamChunkSystem.js");
var SparseMapService$WonderCommonlib = require("wonder-commonlib/lib/js/src/SparseMapService.js");
var LoadStreamWDBSetBinBufferChunkDataSystem$Wonderjs = require("../../../../../src/asset/loader/LoadStreamWDBSetBinBufferChunkDataSystem.js");

function load(wdbPath, fetchFunc, $staropt$star, $staropt$star$1, _) {
  var handleWhenLoadingFunc = $staropt$star !== undefined ? $staropt$star : (function (_, _$1, _$2) {
        return /* () */0;
      });
  var handleWhenLoadWholeWDBFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : (function (_, _$1, _$2) {
        return /* () */0;
      });
  return Most.drain(LoaderManagerSystem$Wonderjs.loadStreamWDB(wdbPath, /* tuple */[
                  fetchFunc,
                  handleWhenLoadingFunc,
                  (function (state, _) {
                      return state;
                    }),
                  (function (state, _) {
                      return state;
                    }),
                  handleWhenLoadWholeWDBFunc
                ], MainStateTool$Wonderjs.unsafeGetState(/* () */0)));
}

function read(param, reader) {
  return ReadStreamChunkSystem$Wonderjs.read(/* tuple */[
              param[0],
              param[1],
              /* tuple */[
                0,
                "",
                (function (_, _$1, _$2) {
                    return /* () */0;
                  })
              ],
              param[2],
              param[3]
            ], /* tuple */[
              /* array */[],
              new Uint8Array(1000000)
            ], /* tuple */[
              undefined,
              /* array */[],
              undefined,
              0,
              /* array */[],
              SparseMapService$WonderCommonlib.createEmpty(/* () */0)
            ], reader);
}

function readWithHandleWhenLoadingFunc(param, reader) {
  var match = param[2];
  return ReadStreamChunkSystem$Wonderjs.read(/* tuple */[
              param[0],
              param[1],
              /* tuple */[
                match[0],
                match[1],
                match[2]
              ],
              param[3],
              param[4]
            ], /* tuple */[
              /* array */[],
              new Uint8Array(1000000)
            ], /* tuple */[
              undefined,
              /* array */[],
              undefined,
              0,
              /* array */[],
              SparseMapService$WonderCommonlib.createEmpty(/* () */0)
            ], reader);
}

var setImageData = LoadStreamWDBSetBinBufferChunkDataSystem$Wonderjs._setImageData;

exports.load = load;
exports.read = read;
exports.readWithHandleWhenLoadingFunc = readWithHandleWhenLoadingFunc;
exports.setImageData = setImageData;
/* most Not a pure module */
