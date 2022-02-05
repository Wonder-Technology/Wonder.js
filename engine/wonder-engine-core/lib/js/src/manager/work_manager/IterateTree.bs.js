'use strict';

var Curry = require("rescript/lib/js/curry.js");
var Caml_option = require("rescript/lib/js/caml_option.js");
var ListSt$WonderCommonlib = require("wonder-commonlib/lib/js/src/structure/ListSt.bs.js");
var Result$WonderCommonlib = require("wonder-commonlib/lib/js/src/structure/Result.bs.js");

function postOrderCata(nodeFunc, tree, param) {
  return Curry._3(nodeFunc, tree._0, tree._1, ListSt$WonderCommonlib.map(tree._2, (function (__x) {
                    return postOrderCata(nodeFunc, __x, undefined);
                  })));
}

function postOrderCataWithParentNode(nodeFunc, tree, parentNodeOpt, param) {
  var parentNode = parentNodeOpt !== undefined ? Caml_option.valFromOption(parentNodeOpt) : undefined;
  var nodeData = tree._1;
  var pluginName = tree._0;
  return Result$WonderCommonlib.bind(ListSt$WonderCommonlib.traverseResultM(tree._2, (function (__x) {
                    var param = Caml_option.some(tree);
                    var param$1;
                    return postOrderCataWithParentNode(nodeFunc, __x, param, param$1);
                  })), (function (children) {
                return Curry._4(nodeFunc, parentNode, pluginName, nodeData, children);
              }));
}

exports.postOrderCata = postOrderCata;
exports.postOrderCataWithParentNode = postOrderCataWithParentNode;
/* No side effect */
