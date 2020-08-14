

import * as Js_option from "../../../../../node_modules/bs-platform/lib/es6/js_option.js";
import * as ArrayService$Wonderjs from "../../service/atom/ArrayService.js";
import * as ConvertCommon$Wonderjs from "./ConvertCommon.js";
import * as ArrayService$WonderCommonlib from "../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";

function _createDefaultMaterial(param) {
  return /* record */[
          /* pbrMetallicRoughness *//* record */[
            /* baseColorFactor *//* array */[
              1,
              1,
              1
            ],
            /* baseColorTexture */undefined,
            /* metallicFactor */1,
            /* roughnessFactor */1,
            /* metallicRoughnessTexture */undefined
          ],
          /* name */"defaultLightMaterial",
          /* extensions */undefined
        ];
}

function _addDefaultMaterial(gltf) {
  var materials = gltf[/* materials */12];
  var defaultMaterial = _createDefaultMaterial(/* () */0);
  var match;
  if (materials !== undefined) {
    var materials$1 = materials;
    match = /* tuple */[
      materials$1.length,
      ArrayService$Wonderjs.push(defaultMaterial, materials$1)
    ];
  } else {
    match = /* tuple */[
      0,
      /* array */[defaultMaterial]
    ];
  }
  return /* tuple */[
          match[0],
          /* record */[
            /* asset */gltf[/* asset */0],
            /* scenes */gltf[/* scenes */1],
            /* scene */gltf[/* scene */2],
            /* images */gltf[/* images */3],
            /* textures */gltf[/* textures */4],
            /* samplers */gltf[/* samplers */5],
            /* buffers */gltf[/* buffers */6],
            /* bufferViews */gltf[/* bufferViews */7],
            /* accessors */gltf[/* accessors */8],
            /* cameras */gltf[/* cameras */9],
            /* nodes */gltf[/* nodes */10],
            /* meshes */gltf[/* meshes */11],
            /* materials */match[1],
            /* extensionsUsed */gltf[/* extensionsUsed */13],
            /* extensions */gltf[/* extensions */14],
            /* extras */gltf[/* extras */15]
          ]
        ];
}

function _isNeedAddDefaultMaterialByJudgeMesh(mesh, meshes) {
  var match = meshes[mesh];
  return Js_option.isNone(ConvertCommon$Wonderjs.getPrimitiveData(match[/* primitives */0])[/* material */2]);
}

function _isNeedAddDefaultMaterial(param, meshes) {
  var mesh = param[/* mesh */2];
  if (mesh !== undefined) {
    var mesh$1 = mesh;
    var extras = param[/* extras */8];
    if (extras !== undefined) {
      var match = extras;
      if (match[/* basicMaterial */2] !== undefined || match[/* lightMaterial */3] !== undefined) {
        return false;
      } else {
        return _isNeedAddDefaultMaterialByJudgeMesh(mesh$1, meshes);
      }
    } else {
      return _isNeedAddDefaultMaterialByJudgeMesh(mesh$1, meshes);
    }
  } else {
    return false;
  }
}

function _setDefaultMaterial(param) {
  var gltf = param[1];
  var meshes = gltf[/* meshes */11];
  var defaultMaterialIndex = param[0];
  return /* record */[
          /* asset */gltf[/* asset */0],
          /* scenes */gltf[/* scenes */1],
          /* scene */gltf[/* scene */2],
          /* images */gltf[/* images */3],
          /* textures */gltf[/* textures */4],
          /* samplers */gltf[/* samplers */5],
          /* buffers */gltf[/* buffers */6],
          /* bufferViews */gltf[/* bufferViews */7],
          /* accessors */gltf[/* accessors */8],
          /* cameras */gltf[/* cameras */9],
          /* nodes */ArrayService$WonderCommonlib.reduceOneParam((function (newNodes, node) {
                  var extras = node[/* extras */8];
                  var match = _isNeedAddDefaultMaterial(node, meshes);
                  if (match) {
                    var tmp;
                    if (extras !== undefined) {
                      var extras$1 = extras;
                      tmp = /* record */[
                        /* basicCameraView */extras$1[/* basicCameraView */0],
                        /* meshRenderer */extras$1[/* meshRenderer */1],
                        /* basicMaterial */undefined,
                        /* lightMaterial */defaultMaterialIndex,
                        /* flyCameraController */extras$1[/* flyCameraController */4],
                        /* arcballCameraController */extras$1[/* arcballCameraController */5],
                        /* script */extras$1[/* script */6],
                        /* isRoot */extras$1[/* isRoot */7],
                        /* isActive */extras$1[/* isActive */8]
                      ];
                    } else {
                      tmp = /* record */[
                        /* basicCameraView */undefined,
                        /* meshRenderer */undefined,
                        /* basicMaterial */undefined,
                        /* lightMaterial */defaultMaterialIndex,
                        /* flyCameraController */undefined,
                        /* arcballCameraController */undefined,
                        /* script */undefined,
                        /* isRoot */undefined,
                        /* isActive */undefined
                      ];
                    }
                    return ArrayService$Wonderjs.push(/* record */[
                                /* name */node[/* name */0],
                                /* camera */node[/* camera */1],
                                /* mesh */node[/* mesh */2],
                                /* children */node[/* children */3],
                                /* matrix */node[/* matrix */4],
                                /* translation */node[/* translation */5],
                                /* rotation */node[/* rotation */6],
                                /* scale */node[/* scale */7],
                                /* extras */tmp,
                                /* extensions */node[/* extensions */9]
                              ], newNodes);
                  } else {
                    return ArrayService$Wonderjs.push(node, newNodes);
                  }
                }), /* array */[], gltf[/* nodes */10]),
          /* meshes */gltf[/* meshes */11],
          /* materials */gltf[/* materials */12],
          /* extensionsUsed */gltf[/* extensionsUsed */13],
          /* extensions */gltf[/* extensions */14],
          /* extras */gltf[/* extras */15]
        ];
}

function convert(gltf) {
  var meshes = gltf[/* meshes */11];
  var isNeedAddDefaultMaterial = ArrayService$WonderCommonlib.reduceOneParam((function (isNeedAddDefaultMaterial, node) {
          if (isNeedAddDefaultMaterial) {
            return isNeedAddDefaultMaterial;
          } else {
            return _isNeedAddDefaultMaterial(node, meshes);
          }
        }), false, gltf[/* nodes */10]);
  if (isNeedAddDefaultMaterial) {
    return _setDefaultMaterial(_addDefaultMaterial(gltf));
  } else {
    return gltf;
  }
}

export {
  _createDefaultMaterial ,
  _addDefaultMaterial ,
  _isNeedAddDefaultMaterialByJudgeMesh ,
  _isNeedAddDefaultMaterial ,
  _setDefaultMaterial ,
  convert ,
  
}
/* ArrayService-Wonderjs Not a pure module */
