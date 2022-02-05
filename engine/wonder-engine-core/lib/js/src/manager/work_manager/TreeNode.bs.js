'use strict';


function buildNode(pluginName, param, children) {
  return /* Node */{
          _0: pluginName,
          _1: {
            getExecFuncs: {
              hd: param[0],
              tl: /* [] */0
            },
            pipelineData: param[1],
            jobOrder: param[2]
          },
          _2: children
        };
}

function buildNodeByNodeData(pluginName, nodeData, children) {
  return /* Node */{
          _0: pluginName,
          _1: nodeData,
          _2: children
        };
}

function getNodeData(node) {
  return node._1;
}

function _getPluginName(node) {
  return node._0;
}

function isEqual(tree1, tree2) {
  return _getPluginName(tree1) === _getPluginName(tree2);
}

exports.buildNode = buildNode;
exports.buildNodeByNodeData = buildNodeByNodeData;
exports.getNodeData = getNodeData;
exports._getPluginName = _getPluginName;
exports.isEqual = isEqual;
/* No side effect */
