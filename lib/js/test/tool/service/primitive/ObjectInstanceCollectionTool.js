'use strict';

var SourceInstanceTool$Wonderjs = require("../instance/SourceInstanceTool.js");
var ObjectInstanceCollectionService$Wonderjs = require("../../../../src/service/primitive/instance/ObjectInstanceCollectionService.js");

function addObjectInstanceTransform(sourceInstance, objectInstanceTransform, objectInstanceCountPerSourceInstance, state) {
  var match = SourceInstanceTool$Wonderjs.getRecord(state);
  return ObjectInstanceCollectionService$Wonderjs.addObjectInstanceTransform(sourceInstance, objectInstanceTransform, objectInstanceCountPerSourceInstance, /* tuple */[
              match[/* objectInstanceTransformIndexMap */1],
              match[/* objectInstanceTransformCollections */4]
            ]);
}

exports.addObjectInstanceTransform = addObjectInstanceTransform;
/* SourceInstanceTool-Wonderjs Not a pure module */
