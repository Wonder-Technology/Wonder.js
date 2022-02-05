'use strict';

var CreateTypeArrayTransformUtils$OrillusionComponentWorkerUtils = require("orillusion-component-worker-utils/lib/js/src/transform/CreateTypeArrayTransformUtils.bs.js");

function createState(isDebug, transformCount, buffer) {
  var match = CreateTypeArrayTransformUtils$OrillusionComponentWorkerUtils.createTypeArrays(buffer, transformCount);
  return {
          config: {
            isDebug: isDebug
          },
          localToWorldMatrices: match[0]
        };
}

exports.createState = createState;
/* No side effect */
