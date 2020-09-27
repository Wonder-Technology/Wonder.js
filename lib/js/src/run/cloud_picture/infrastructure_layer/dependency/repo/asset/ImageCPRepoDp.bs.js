'use strict';

var CPRepo$Wonderjs = require("../../../data/container/CPRepo.bs.js");
var ImmutableHashMap$Wonderjs = require("../../../../../../construct/domain_layer/library/structure/hash_map/ImmutableHashMap.bs.js");

function setData(id, data) {
  var po = CPRepo$Wonderjs.getImage(undefined);
  return CPRepo$Wonderjs.setImage({
              dataMap: ImmutableHashMap$Wonderjs.set(po.dataMap, id, data)
            });
}

function getData(id) {
  return ImmutableHashMap$Wonderjs.get(CPRepo$Wonderjs.getImage(undefined).dataMap, id);
}

exports.setData = setData;
exports.getData = getData;
/* CPRepo-Wonderjs Not a pure module */
