'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var OptionSt$Wonderjs = require("../../../../../construct/domain_layer/library/structure/OptionSt.bs.js");
var ImageRepoDpRunAPI$Wonderjs = require("../../../../../construct/external_layer/api/dependency/ImageRepoDpRunAPI.bs.js");

function set(param) {
  var getData = param.getData;
  return ImageRepoDpRunAPI$Wonderjs.set({
              getData: (function (id) {
                  return OptionSt$Wonderjs.fromNullable(Curry._1(getData, id));
                })
            });
}

exports.set = set;
/* No side effect */
