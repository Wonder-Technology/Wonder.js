

import * as Most from "most";
import * as Curry from "../../../../../../../node_modules/rescript/lib/es6/curry.js";
import * as Caml_array from "../../../../../../../node_modules/rescript/lib/es6/caml_array.js";
import * as Log$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/log/Log.bs.js";
import * as TreeNode$WonderCore from "./TreeNode.bs.js";
import * as IterateTree$WonderCore from "./IterateTree.bs.js";
import * as ListSt$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/structure/ListSt.bs.js";
import * as OperateTree$WonderCore from "./OperateTree.bs.js";
import * as POContainer$WonderCore from "../../data/POContainer.bs.js";
import * as Result$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/structure/Result.bs.js";
import * as ArraySt$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/structure/ArraySt.bs.js";
import * as OptionSt$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/structure/OptionSt.bs.js";
import * as Exception$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/structure/Exception.bs.js";
import * as MostUtils$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MostUtils.bs.js";
import * as ImmutableHashMap$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/structure/hash_map/ImmutableHashMap.bs.js";

function _getStates(param) {
  return POContainer$WonderCore.unsafeGetPO(undefined).states;
}

function _setStates(states) {
  var init = POContainer$WonderCore.unsafeGetPO(undefined);
  return POContainer$WonderCore.setPO({
              allRegisteredWorkPluginData: init.allRegisteredWorkPluginData,
              states: states,
              pluginData: init.pluginData,
              componentData: init.componentData,
              gameObjectData: init.gameObjectData,
              usedGameObjectData: init.usedGameObjectData
            });
}

function _findGroup(groupName, groups) {
  if (ArraySt$WonderCommonlib.length(ArraySt$WonderCommonlib.filter(groups, (function (param) {
                return param.name === groupName;
              }))) > 1) {
    Exception$WonderCommonlib.throwErr(Exception$WonderCommonlib.buildErr("groupName:" + groupName + " has more than one in groups"));
  }
  var group = ListSt$WonderCommonlib.getBy(ListSt$WonderCommonlib.fromArray(groups), (function (param) {
          return param.name === groupName;
        }));
  if (group !== undefined) {
    return group;
  } else {
    return Exception$WonderCommonlib.throwErr(Exception$WonderCommonlib.buildErr("groupName:" + groupName + " not in groups"));
  }
}

function _buildJobStream(execFunc) {
  var __x = Most.just(execFunc);
  return Most.map(_setStates, Most.flatMap((function (func) {
                    return Curry._1(func, POContainer$WonderCore.unsafeGetPO(undefined).states);
                  }), __x));
}

function _getExecFunc(_getExecFuncs, pipelineName, jobName) {
  while(true) {
    var getExecFuncs = _getExecFuncs;
    if (ListSt$WonderCommonlib.length(getExecFuncs) === 0) {
      return Exception$WonderCommonlib.throwErr(Exception$WonderCommonlib.buildErr(Log$WonderCommonlib.buildFatalMessage("_getExecFunc", "can't get execFunc with pipelineName:" + pipelineName + ", jobName:" + jobName, "", "", "")));
    }
    if (getExecFuncs) {
      var result = Curry._2(getExecFuncs.hd, pipelineName, jobName);
      if (!(result == null)) {
        return OptionSt$WonderCommonlib.getExn(OptionSt$WonderCommonlib.fromNullable(result));
      }
      _getExecFuncs = getExecFuncs.tl;
      continue ;
    }
    throw {
          RE_EXN_ID: "Match_failure",
          _1: [
            "WorkManager.res",
            64,
            14
          ],
          Error: new Error()
        };
  };
}

function _buildJobStreams(param, param$1, groups) {
  var pipelineName = param$1[0];
  var getExecFuncs = param[1];
  var buildPipelineStreamFunc = param[0];
  return ListSt$WonderCommonlib.reduce(ListSt$WonderCommonlib.fromArray(param$1[1]), /* [] */0, (function (streams, param) {
                var name = param.name;
                if (param.type_ === "group") {
                  var group = _findGroup(name, groups);
                  var stream = Curry._4(buildPipelineStreamFunc, getExecFuncs, pipelineName, group, groups);
                  return ListSt$WonderCommonlib.push(streams, stream);
                }
                var execFunc = _getExecFunc(getExecFuncs, pipelineName, name);
                return ListSt$WonderCommonlib.push(streams, _buildJobStream(execFunc));
              }));
}

function _buildPipelineStream(getExecFuncs, pipelineName, param, groups) {
  var streams = _buildJobStreams([
        _buildPipelineStream,
        getExecFuncs
      ], [
        pipelineName,
        param.elements
      ], groups);
  return (
            param.link === "merge" ? (function (prim) {
                  return Most.mergeArray(prim);
                }) : MostUtils$WonderCommonlib.concatArray
          )(ListSt$WonderCommonlib.toArray(streams));
}

function parse(po, getExecFuncs, param) {
  var groups = param.groups;
  var group = _findGroup(param.first_group, groups);
  POContainer$WonderCore.setPO(po);
  var __x = _buildPipelineStream(getExecFuncs, param.name, group, groups);
  return Most.map((function (param) {
                return POContainer$WonderCore.unsafeGetPO(undefined);
              }), __x);
}

var ParsePipelineData = {
  _getStates: _getStates,
  _setStates: _setStates,
  _findGroup: _findGroup,
  _buildJobStream: _buildJobStream,
  _getExecFunc: _getExecFunc,
  _buildJobStreams: _buildJobStreams,
  _buildPipelineStream: _buildPipelineStream,
  parse: parse
};

function registerPlugin(po, data, jobOrders) {
  return {
          allRegisteredWorkPluginData: ListSt$WonderCommonlib.push(po.allRegisteredWorkPluginData, [
                data,
                jobOrders
              ]),
          states: po.states,
          pluginData: po.pluginData,
          componentData: po.componentData,
          gameObjectData: po.gameObjectData,
          usedGameObjectData: po.usedGameObjectData
        };
}

function unregisterPlugin(po, targetPluginName) {
  return {
          allRegisteredWorkPluginData: ListSt$WonderCommonlib.filter(po.allRegisteredWorkPluginData, (function (param) {
                  return param[0].pluginName !== targetPluginName;
                })),
          states: po.states,
          pluginData: po.pluginData,
          componentData: po.componentData,
          gameObjectData: po.gameObjectData,
          usedGameObjectData: po.usedGameObjectData
        };
}

function init(po) {
  var allRegisteredWorkPluginData = po.allRegisteredWorkPluginData;
  return ListSt$WonderCommonlib.reduce(allRegisteredWorkPluginData, {
              allRegisteredWorkPluginData: po.allRegisteredWorkPluginData,
              states: ListSt$WonderCommonlib.reduce(allRegisteredWorkPluginData, ImmutableHashMap$WonderCommonlib.createEmpty(undefined, undefined), (function (states, param) {
                      var match = param[0];
                      return ImmutableHashMap$WonderCommonlib.set(states, match.pluginName, Curry._1(match.createStateFunc, undefined));
                    })),
              pluginData: po.pluginData,
              componentData: po.componentData,
              gameObjectData: po.gameObjectData,
              usedGameObjectData: po.usedGameObjectData
            }, (function (po, param) {
                var match = param[0];
                POContainer$WonderCore.setPO(po);
                Curry._1(match.initFunc, OptionSt$WonderCommonlib.unsafeGet(ImmutableHashMap$WonderCommonlib.get(po.states, match.pluginName)));
                return POContainer$WonderCore.unsafeGetPO(undefined);
              }));
}

function _findInsertPluginName(insertElementName, allRegisteredWorkPluginData) {
  return OptionSt$WonderCommonlib.get(OptionSt$WonderCommonlib.map(ListSt$WonderCommonlib.find(allRegisteredWorkPluginData, (function (param) {
                        var match = Caml_array.get(param[0].allPipelineData, 0);
                        return ArraySt$WonderCommonlib.includesByFunc(match.groups, (function (param) {
                                      return ArraySt$WonderCommonlib.includesByFunc(param.elements, (function (param) {
                                                    return param.name === insertElementName;
                                                  }));
                                    }));
                      })), (function (param) {
                    return param[0].pluginName;
                  })));
}

function _check(registeredWorkPluginData) {
  if (ArraySt$WonderCommonlib.length(registeredWorkPluginData[0].allPipelineData) <= 1 && ArraySt$WonderCommonlib.length(registeredWorkPluginData[1]) <= 1) {
    return Result$WonderCommonlib.succeed(registeredWorkPluginData);
  } else {
    return Result$WonderCommonlib.failWith(Log$WonderCommonlib.buildErrorMessage("allPipelineData or jobOrders should has the same pipeline <= 1", "", "", "", ""));
  }
}

function _findAllSpecificPipelineRelatedData(allRegisteredWorkPluginData, targetPipelineName) {
  return Result$WonderCommonlib.bind(Result$WonderCommonlib.mapSuccess(ListSt$WonderCommonlib.traverseResultM(allRegisteredWorkPluginData, (function (param) {
                        var registeredWorkPlugin = param[0];
                        return _check([
                                    {
                                      pluginName: registeredWorkPlugin.pluginName,
                                      createStateFunc: registeredWorkPlugin.createStateFunc,
                                      initFunc: registeredWorkPlugin.initFunc,
                                      getExecFunc: registeredWorkPlugin.getExecFunc,
                                      allPipelineData: ArraySt$WonderCommonlib.filter(registeredWorkPlugin.allPipelineData, (function (param) {
                                              return param.name === targetPipelineName;
                                            }))
                                    },
                                    ArraySt$WonderCommonlib.filter(param[1], (function (param) {
                                            return param.pipelineName === targetPipelineName;
                                          }))
                                  ]);
                      })), (function (allRegisteredWorkPluginData) {
                    return ListSt$WonderCommonlib.filter(allRegisteredWorkPluginData, (function (param) {
                                  return ArraySt$WonderCommonlib.length(param[0].allPipelineData) === 1;
                                }));
                  })), (function (allRegisteredWorkPluginData) {
                return ListSt$WonderCommonlib.traverseResultM(ListSt$WonderCommonlib.map(allRegisteredWorkPluginData, (function (param) {
                                  var registeredWorkPluginData = param[0];
                                  return [
                                          registeredWorkPluginData.pluginName,
                                          registeredWorkPluginData.getExecFunc,
                                          Caml_array.get(registeredWorkPluginData.allPipelineData, 0),
                                          ArraySt$WonderCommonlib.getFirst(param[1])
                                        ];
                                })), (function (param) {
                              var pipelineData = param[2];
                              var getExecFunc = param[1];
                              var pluginName = param[0];
                              return Result$WonderCommonlib.mapSuccess(OptionSt$WonderCommonlib.sequenceResultM(OptionSt$WonderCommonlib.map(param[3], (function (param) {
                                                    var insertAction = param.insertAction;
                                                    var insertElementName = param.insertElementName;
                                                    return Result$WonderCommonlib.mapSuccess(_findInsertPluginName(insertElementName, allRegisteredWorkPluginData), (function (insertPluginName) {
                                                                  return {
                                                                          insertPluginName: insertPluginName,
                                                                          insertElementName: insertElementName,
                                                                          insertAction: insertAction
                                                                        };
                                                                }));
                                                  }))), (function (jobOrderOpt) {
                                            return {
                                                    pluginName: pluginName,
                                                    getExecFunc: getExecFunc,
                                                    pipelineData: pipelineData,
                                                    jobOrder: jobOrderOpt
                                                  };
                                          }));
                            }));
              }));
}

function _handleInsertedAsRootNode(treeDataList, param) {
  var nodeInsertPluginNameOpt = param[4];
  var nodeJobOrderOpt = param[3];
  var pipelineData = param[2];
  var getExecFunc = param[1];
  var pluginName = param[0];
  return ListSt$WonderCommonlib.reduce(treeDataList, [
              /* [] */0,
              undefined
            ], (function (param, treeData) {
                var insertPluginNameOpt = treeData[1];
                var insertedTreeOpt = param[1];
                var newTreeDataList = param[0];
                if (insertPluginNameOpt === undefined) {
                  return [
                          ListSt$WonderCommonlib.addInReduce(newTreeDataList, treeData),
                          insertedTreeOpt
                        ];
                }
                if (insertPluginNameOpt !== pluginName) {
                  return [
                          ListSt$WonderCommonlib.addInReduce(newTreeDataList, treeData),
                          insertedTreeOpt
                        ];
                }
                var insertedTree = TreeNode$WonderCore.buildNode(pluginName, [
                      getExecFunc,
                      pipelineData,
                      nodeJobOrderOpt
                    ], treeData[0]);
                return [
                        ListSt$WonderCommonlib.addInReduce(newTreeDataList, [
                              {
                                hd: insertedTree,
                                tl: /* [] */0
                              },
                              nodeInsertPluginNameOpt
                            ]),
                        insertedTree
                      ];
              }));
}

function _add(treeDataList, node, insertPluginNameOpt) {
  return {
          hd: [
            {
              hd: node,
              tl: /* [] */0
            },
            insertPluginNameOpt
          ],
          tl: treeDataList
        };
}

function _insertToAsChildNodeOrSameLevelTree(treeDataList, nodeInsertPluginName, node) {
  return ListSt$WonderCommonlib.reduce(treeDataList, [
              /* [] */0,
              false
            ], (function (param, param$1) {
                var insertPluginNameOpt = param$1[1];
                var sameLevelTreeList = param$1[0];
                var newTreeDataList = param[0];
                if (insertPluginNameOpt !== undefined && insertPluginNameOpt === nodeInsertPluginName) {
                  return [
                          ListSt$WonderCommonlib.addInReduce(newTreeDataList, [
                                ListSt$WonderCommonlib.push(sameLevelTreeList, node),
                                insertPluginNameOpt
                              ]),
                          true
                        ];
                }
                var match = ListSt$WonderCommonlib.reduce(sameLevelTreeList, [
                      /* [] */0,
                      false
                    ], (function (param, tree) {
                        var match = OperateTree$WonderCore.insertNode(tree, nodeInsertPluginName, node);
                        return [
                                ListSt$WonderCommonlib.addInReduce(param[0], match[0]),
                                match[1]
                              ];
                      }));
                return [
                        ListSt$WonderCommonlib.addInReduce(newTreeDataList, [
                              match[0],
                              insertPluginNameOpt
                            ]),
                        match[1]
                      ];
              }));
}

function _removeInsertedTree(treeDataList, insertedTree) {
  return ListSt$WonderCommonlib.filter(ListSt$WonderCommonlib.map(treeDataList, (function (param) {
                    return [
                            ListSt$WonderCommonlib.filter(param[0], (function (sameLevelTree) {
                                    return !TreeNode$WonderCore.isEqual(sameLevelTree, insertedTree);
                                  })),
                            param[1]
                          ];
                  })), (function (param) {
                return ListSt$WonderCommonlib.length(param[0]) > 0;
              }));
}

function _getTree(treeDataList) {
  if (ListSt$WonderCommonlib.length(treeDataList) !== 1) {
    return Result$WonderCommonlib.failWith(Log$WonderCommonlib.buildErrorMessage("treeDataList.length should be 1", "", "", "", ""));
  } else {
    return Result$WonderCommonlib.bind(OptionSt$WonderCommonlib.get(ListSt$WonderCommonlib.head(treeDataList)), (function (param) {
                  var sameLevelTreeList = param[0];
                  if (ListSt$WonderCommonlib.length(sameLevelTreeList) !== 1) {
                    return Result$WonderCommonlib.failWith(Log$WonderCommonlib.buildErrorMessage("sameLevelTreeList.length should be 1", "", "", "", ""));
                  } else {
                    return OptionSt$WonderCommonlib.get(ListSt$WonderCommonlib.head(sameLevelTreeList));
                  }
                }));
  }
}

function _buildTree(allSpecificPipelineRelatedData) {
  return _getTree(ListSt$WonderCommonlib.reduce(allSpecificPipelineRelatedData, /* [] */0, (function (treeDataList, param) {
                    var jobOrder = param.jobOrder;
                    var pipelineData = param.pipelineData;
                    var getExecFunc = param.getExecFunc;
                    var pluginName = param.pluginName;
                    if (jobOrder !== undefined) {
                      var insertPluginName = jobOrder.insertPluginName;
                      var nodeJobOrderOpt = {
                        insertElementName: jobOrder.insertElementName,
                        insertAction: jobOrder.insertAction
                      };
                      var match = _handleInsertedAsRootNode(treeDataList, [
                            pluginName,
                            getExecFunc,
                            pipelineData,
                            nodeJobOrderOpt,
                            insertPluginName
                          ]);
                      var insertedTreeOpt = match[1];
                      var treeDataList$1 = match[0];
                      if (insertedTreeOpt !== undefined) {
                        var match$1 = _insertToAsChildNodeOrSameLevelTree(treeDataList$1, insertPluginName, insertedTreeOpt);
                        var treeDataList$2 = match$1[0];
                        if (match$1[1]) {
                          return _removeInsertedTree(treeDataList$2, insertedTreeOpt);
                        } else {
                          return treeDataList$2;
                        }
                      }
                      var node = TreeNode$WonderCore.buildNode(pluginName, [
                            getExecFunc,
                            pipelineData,
                            nodeJobOrderOpt
                          ], /* [] */0);
                      var match$2 = _insertToAsChildNodeOrSameLevelTree(treeDataList$1, insertPluginName, node);
                      var treeDataList$3 = match$2[0];
                      if (match$2[1]) {
                        return treeDataList$3;
                      } else {
                        return _add(treeDataList$3, node, insertPluginName);
                      }
                    }
                    var match$3 = _handleInsertedAsRootNode(treeDataList, [
                          pluginName,
                          getExecFunc,
                          pipelineData,
                          undefined,
                          undefined
                        ]);
                    var treeDataList$4 = match$3[0];
                    if (OptionSt$WonderCommonlib.isSome(match$3[1])) {
                      return treeDataList$4;
                    } else {
                      return _add(treeDataList$4, TreeNode$WonderCore.buildNode(pluginName, [
                                      getExecFunc,
                                      pipelineData,
                                      undefined
                                    ], /* [] */0), undefined);
                    }
                  })));
}

function _buildFirstGroupElement(groups, first_group) {
  return OptionSt$WonderCommonlib.get(OptionSt$WonderCommonlib.map(ArraySt$WonderCommonlib.find(groups, (function (param) {
                        return param.name === first_group;
                      })), (function (param) {
                    return {
                            name: param.name,
                            type_: "group"
                          };
                  })));
}

function _insertElement(groups, insertAction, insertElementName, insertElement) {
  return ArraySt$WonderCommonlib.map(groups, (function (group) {
                return {
                        name: group.name,
                        link: group.link,
                        elements: ArraySt$WonderCommonlib.reduceOneParam(group.elements, (function (result, element) {
                                if (element.name === insertElementName) {
                                  if (insertAction) {
                                    return ArraySt$WonderCommonlib.push(ArraySt$WonderCommonlib.push(result, element), insertElement);
                                  } else {
                                    return ArraySt$WonderCommonlib.push(ArraySt$WonderCommonlib.push(result, insertElement), element);
                                  }
                                } else {
                                  return ArraySt$WonderCommonlib.push(result, element);
                                }
                              }), [])
                      };
              }));
}

function _mergeGroups(groups, insertGroups) {
  return insertGroups.concat(groups);
}

var _mergeGetExecFuncs = ListSt$WonderCommonlib.concat;

function _mergeToRootNode(tree) {
  return Result$WonderCommonlib.mapSuccess(IterateTree$WonderCore.postOrderCataWithParentNode((function (parentNodeOpt, pluginName, nodeData) {
                    var getExecFuncs = nodeData.getExecFuncs;
                    var pipelineData = nodeData.pipelineData;
                    var jobOrder = nodeData.jobOrder;
                    return function (children) {
                      var node = TreeNode$WonderCore.buildNodeByNodeData(pluginName, nodeData, children);
                      if (parentNodeOpt === undefined) {
                        return Result$WonderCommonlib.succeed(node);
                      }
                      var parentNodeData = TreeNode$WonderCore.getNodeData(parentNodeOpt);
                      return Result$WonderCommonlib.bind(OptionSt$WonderCommonlib.get(jobOrder), (function (param) {
                                    var insertAction = param.insertAction;
                                    var insertElementName = param.insertElementName;
                                    return Result$WonderCommonlib.mapSuccess(_buildFirstGroupElement(pipelineData.groups, pipelineData.first_group), (function (insertElement) {
                                                  var init = parentNodeData.pipelineData;
                                                  parentNodeData.pipelineData = {
                                                    name: init.name,
                                                    groups: pipelineData.groups.concat(_insertElement(parentNodeData.pipelineData.groups, insertAction, insertElementName, insertElement)),
                                                    first_group: init.first_group
                                                  };
                                                  parentNodeData.getExecFuncs = ListSt$WonderCommonlib.concat(parentNodeData.getExecFuncs, getExecFuncs);
                                                  return node;
                                                }));
                                  }));
                    };
                  }), tree, undefined, undefined), (function (tree) {
                var match = TreeNode$WonderCore.getNodeData(tree);
                var getExecFuncs = match.getExecFuncs;
                var pipelineData = match.pipelineData;
                return [
                        getExecFuncs,
                        pipelineData
                      ];
              }));
}

function merge(allRegisteredWorkPluginData, pipelineName) {
  return Result$WonderCommonlib.bind(Result$WonderCommonlib.bind(_findAllSpecificPipelineRelatedData(allRegisteredWorkPluginData, pipelineName), _buildTree), _mergeToRootNode);
}

var MergePipelineData = {
  _findInsertPluginName: _findInsertPluginName,
  _check: _check,
  _findAllSpecificPipelineRelatedData: _findAllSpecificPipelineRelatedData,
  _handleInsertedAsRootNode: _handleInsertedAsRootNode,
  _isInserted: OptionSt$WonderCommonlib.isSome,
  _add: _add,
  _insertToAsChildNodeOrSameLevelTree: _insertToAsChildNodeOrSameLevelTree,
  _removeInsertedTree: _removeInsertedTree,
  _getTree: _getTree,
  _buildTree: _buildTree,
  _buildFirstGroupElement: _buildFirstGroupElement,
  _insertElement: _insertElement,
  _mergeGroups: _mergeGroups,
  _mergeGetExecFuncs: _mergeGetExecFuncs,
  _mergeToRootNode: _mergeToRootNode,
  merge: merge
};

function runPipeline(po, pipelineName) {
  return Result$WonderCommonlib.mapSuccess(merge(po.allRegisteredWorkPluginData, pipelineName), (function (param) {
                return parse(po, param[0], param[1]);
              }));
}

export {
  ParsePipelineData ,
  registerPlugin ,
  unregisterPlugin ,
  init ,
  MergePipelineData ,
  runPipeline ,
  
}
/* most Not a pure module */
