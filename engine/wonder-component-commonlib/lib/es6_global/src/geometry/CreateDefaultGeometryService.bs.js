

import * as Main$WonderEngineCore from "../../../../../../node_modules/wonder-engine-core/lib/es6_global/src/Main.bs.js";
import * as Index$WonderComponentTypeGeometry from "../../../../../../node_modules/wonder-component-type-geometry/lib/es6_global/index.bs.js";

function create(data, param) {
  var match = Main$WonderEngineCore.createComponent(data);
  var geometry = match[1];
  var data$1 = Main$WonderEngineCore.setComponentData(Main$WonderEngineCore.setComponentData(Main$WonderEngineCore.setComponentData(Main$WonderEngineCore.setComponentData(Main$WonderEngineCore.setComponentData(match[0], geometry, Index$WonderComponentTypeGeometry.dataName.vertices, param[0]), geometry, Index$WonderComponentTypeGeometry.dataName.normals, param[2]), geometry, Index$WonderComponentTypeGeometry.dataName.tangents, param[3]), geometry, Index$WonderComponentTypeGeometry.dataName.texCoords, param[1]), geometry, Index$WonderComponentTypeGeometry.dataName.indices, param[4]);
  return [
          data$1,
          geometry
        ];
}

export {
  create ,
  
}
/* Main-WonderEngineCore Not a pure module */
