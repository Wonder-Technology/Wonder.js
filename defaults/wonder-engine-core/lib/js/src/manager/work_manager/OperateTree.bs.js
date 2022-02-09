'use strict';

var TreeNode$WonderEngineCore = require("./TreeNode.bs.js");
var IterateTree$WonderEngineCore = require("./IterateTree.bs.js");

function insertNode(tree, targetPluginName, node) {
  var isInsert = {
    contents: false
  };
  return [
          IterateTree$WonderEngineCore.postOrderCata((function (pluginName, nodeData, children) {
                  if (pluginName === targetPluginName) {
                    isInsert.contents = true;
                    return TreeNode$WonderEngineCore.buildNodeByNodeData(pluginName, nodeData, {
                                hd: node,
                                tl: children
                              });
                  } else {
                    return TreeNode$WonderEngineCore.buildNodeByNodeData(pluginName, nodeData, children);
                  }
                }), tree, undefined),
          isInsert.contents
        ];
}

exports.insertNode = insertNode;
/* No side effect */
