

import * as ConvertChildrenDataSystem$Wonderjs from "./ConvertChildrenDataSystem.js";
import * as ConvertComponentIndexDataSystem$Wonderjs from "./ConvertComponentIndexDataSystem.js";

function convertToGameObjectIndexData(param) {
  var extensions = param[/* extensions */14];
  var materials = param[/* materials */12];
  var meshes = param[/* meshes */11];
  var nodes = param[/* nodes */10];
  var transformGameObjectIndexData = ConvertComponentIndexDataSystem$Wonderjs.convertToTransformGameObjectIndexData(nodes);
  return /* record */[
          /* childrenTransformIndexData */ConvertChildrenDataSystem$Wonderjs.convertToChildrenTransformIndexData(transformGameObjectIndexData, nodes),
          /* transformGameObjectIndexData */transformGameObjectIndexData,
          /* basicCameraViewGameObjectIndexData */ConvertComponentIndexDataSystem$Wonderjs.convertToBasicCameraViewGameObjectIndexData(nodes),
          /* perspectiveCameraProjectionGameObjectIndexData */ConvertComponentIndexDataSystem$Wonderjs.convertToPerspectiveCameraProjectionGameObjectIndexData(nodes, param[/* cameras */9]),
          /* flyCameraControllerGameObjectIndexData */ConvertComponentIndexDataSystem$Wonderjs.convertToFlyCameraControllerGameObjectIndexData(nodes),
          /* arcballCameraControllerGameObjectIndexData */ConvertComponentIndexDataSystem$Wonderjs.convertToArcballCameraControllerGameObjectIndexData(nodes),
          /* basicMaterialGameObjectIndexData */ConvertComponentIndexDataSystem$Wonderjs.convertToBasicMaterialGameObjectIndexData(nodes, meshes, materials),
          /* lightMaterialGameObjectIndexData */ConvertComponentIndexDataSystem$Wonderjs.convertToLightMaterialGameObjectIndexData(nodes, meshes, materials),
          /* directionLightGameObjectIndexData */ConvertComponentIndexDataSystem$Wonderjs.convertToLightGameObjectIndexData("directional", nodes, extensions),
          /* pointLightGameObjectIndexData */ConvertComponentIndexDataSystem$Wonderjs.convertToLightGameObjectIndexData("point", nodes, extensions),
          /* geometryGameObjectIndexData */ConvertComponentIndexDataSystem$Wonderjs.convertToGeometryGameObjectIndexData(nodes),
          /* meshRendererGameObjectIndexData */ConvertComponentIndexDataSystem$Wonderjs.convertToMeshRendererGameObjectIndexData(nodes, meshes),
          /* scriptGameObjectIndexData */ConvertComponentIndexDataSystem$Wonderjs.convertToScriptGameObjectIndexData(nodes)
        ];
}

export {
  convertToGameObjectIndexData ,
  
}
/* ConvertChildrenDataSystem-Wonderjs Not a pure module */
