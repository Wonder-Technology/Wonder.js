'use strict';

var Matrix4$WonderCommonlib = require("wonder-commonlib/lib/js/src/math/Matrix4.bs.js");
var IndexComponentUtils$WonderCommonlib = require("wonder-commonlib/lib/js/src/component/IndexComponentUtils.bs.js");
var DirtyPerspectiveCameraProjectionUtils$WonderComponentPerspectivecameraprojection = require("../utils/DirtyPerspectiveCameraProjectionUtils.bs.js");
var OperatePerspectiveCameraProjectionUtils$WonderComponentPerspectivecameraprojection = require("../utils/OperatePerspectiveCameraProjectionUtils.bs.js");

function create(state) {
  var index = state.maxIndex;
  var newIndex = IndexComponentUtils$WonderCommonlib.generateIndex(index);
  var state$1 = OperatePerspectiveCameraProjectionUtils$WonderComponentPerspectivecameraprojection.setPMatrix(DirtyPerspectiveCameraProjectionUtils$WonderComponentPerspectivecameraprojection.mark(state, index, true), index, Matrix4$WonderCommonlib.createIdentityMatrix4(undefined));
  return [
          {
            config: state$1.config,
            maxIndex: newIndex,
            dirtyMap: state$1.dirtyMap,
            pMatrixMap: state$1.pMatrixMap,
            nearMap: state$1.nearMap,
            farMap: state$1.farMap,
            fovyMap: state$1.fovyMap,
            aspectMap: state$1.aspectMap,
            gameObjectMap: state$1.gameObjectMap,
            gameObjectPerspectiveCameraProjectionMap: state$1.gameObjectPerspectiveCameraProjectionMap
          },
          index
        ];
}

exports.create = create;
/* No side effect */
