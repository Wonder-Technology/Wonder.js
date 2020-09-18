'use strict';

var Most = require("most");
var Curry = require("bs-platform/lib/js/curry.js");
var ListSt$Wonderjs = require("../../../../library/structure/ListSt.bs.js");
var Result$Wonderjs = require("../../../../library/structure/Result.bs.js");
var Tuple2$Wonderjs = require("../../../../library/structure/tuple/Tuple2.bs.js");
var OptionSt$Wonderjs = require("../../../../library/structure/OptionSt.bs.js");
var MostUtils$Wonderjs = require("../../../../library/most/MostUtils.bs.js");
var JobDoService$Wonderjs = require("./JobDoService.bs.js");
var PipelineEntity$Wonderjs = require("../entity/PipelineEntity.bs.js");

function _findGroup(groupName, groups) {
  var group = ListSt$Wonderjs.getBy(groups, (function (param) {
          return param.name === groupName;
        }));
  if (group !== undefined) {
    return Result$Wonderjs.succeed(group);
  } else {
    return Result$Wonderjs.failWith("groupName:" + groupName + " not in groups");
  }
}

function _buildJobStream(execFunc) {
  var __x = Most.just(execFunc);
  var __x$1 = Most.flatMap((function (func) {
          return Curry._1(func, undefined);
        }), __x);
  return Most.flatMap((function (result) {
                return Result$Wonderjs.either(result, (function (s) {
                              return Most.just(s);
                            }), (function (f) {
                              return Most.throwError(f);
                            }));
              }), __x$1);
}

function _buildJobStreams(param, groups, buildPipelineStreamFunc) {
  var pipelineName = param[0];
  return ListSt$Wonderjs.traverseReduceResultM(param[1], /* [] */0, (function (streams, param) {
                var name = param.name;
                if (param.type_) {
                  return Result$Wonderjs.mapSuccess(Result$Wonderjs.bind(_findGroup(name, groups), (function (group) {
                                    return Curry._3(buildPipelineStreamFunc, pipelineName, group, groups);
                                  })), (function (stream) {
                                return ListSt$Wonderjs.push(streams, stream);
                              }));
                } else {
                  return Result$Wonderjs.mapSuccess(OptionSt$Wonderjs.get(JobDoService$Wonderjs.getExecFunc(pipelineName, name)), (function (execFunc) {
                                return ListSt$Wonderjs.push(streams, _buildJobStream(execFunc));
                              }));
                }
              }));
}

function _buildPipelineStream(pipelineName, param, groups) {
  var link = param.link;
  return Result$Wonderjs.mapSuccess(_buildJobStreams([
                  pipelineName,
                  param.elements
                ], groups, _buildPipelineStream), (function (streams) {
                return (
                          link ? MostUtils$Wonderjs.concatArray : (function (prim) {
                                return Most.mergeArray(prim);
                              })
                        )(ListSt$Wonderjs.toArray(streams));
              }));
}

function parse(param) {
  var groups = param.groups;
  var name = param.name;
  var partial_arg = PipelineEntity$Wonderjs.create(name);
  return Result$Wonderjs.mapSuccess(Result$Wonderjs.bind(_findGroup(param.firstGroup, groups), (function (group) {
                    return Result$Wonderjs.mapSuccess(_buildPipelineStream(name, group, groups), (function (pipelineStream) {
                                  return Most.map((function (param) {
                                                return Result$Wonderjs.succeed(undefined);
                                              }), pipelineStream);
                                }));
                  })), (function (param) {
                return Tuple2$Wonderjs.create(partial_arg, param);
              }));
}

exports._findGroup = _findGroup;
exports._buildJobStream = _buildJobStream;
exports._buildJobStreams = _buildJobStreams;
exports._buildPipelineStream = _buildPipelineStream;
exports.parse = parse;
/* most Not a pure module */
