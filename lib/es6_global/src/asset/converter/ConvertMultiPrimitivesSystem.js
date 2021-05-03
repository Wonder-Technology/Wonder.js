

import * as Caml_option from "./../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as ArrayService$Wonderjs from "../../service/atom/ArrayService.js";
import * as ArrayService$WonderCommonlib from "./../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as MutableSparseMapService$WonderCommonlib from "./../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";

function _buildMultiPrimitivesName(name, primitiveIndex) {
  if (name !== undefined) {
    return "" + (String(Caml_option.valFromOption(name)) + ("_" + (String(primitiveIndex) + "")));
  }
  
}

var _buildMultiPrimitivesMeshName = _buildMultiPrimitivesName;

var _buildMultiPrimitivesNodeName = _buildMultiPrimitivesName;

function isMultiPrimitives(primitives) {
  return primitives.length > 1;
}

function _buildMultiPrimitivesMeshMap(meshes) {
  return ArrayService$WonderCommonlib.reduceOneParami((function (param, param$1, meshIndex) {
                  var name = param$1[/* name */1];
                  var primitives = param$1[/* primitives */0];
                  var newMeshIndex = param[1];
                  var multiPrimitivesMeshMap = param[0];
                  var match = primitives.length > 1;
                  if (match) {
                    var newMeshDataArr = ArrayService$WonderCommonlib.reduceOneParami((function (newMeshDataArr, primitive, primitiveIndex) {
                            return ArrayService$Wonderjs.push(/* tuple */[
                                        /* record */[
                                          /* primitives : array */[primitive],
                                          /* name */_buildMultiPrimitivesName(name, primitiveIndex)
                                        ],
                                        newMeshIndex + primitiveIndex | 0
                                      ], newMeshDataArr);
                          }), /* array */[], primitives);
                    return /* tuple */[
                            MutableSparseMapService$WonderCommonlib.set(meshIndex, newMeshDataArr, multiPrimitivesMeshMap),
                            newMeshIndex + newMeshDataArr.length | 0
                          ];
                  } else {
                    return /* tuple */[
                            multiPrimitivesMeshMap,
                            newMeshIndex
                          ];
                  }
                }), /* tuple */[
                MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
                meshes.length
              ], meshes)[0];
}

function _buildNewMeshes(meshes, multiPrimitivesMeshMap) {
  return MutableSparseMapService$WonderCommonlib.reduceiValid((function (newMeshes, newMeshDataArr, param) {
                return newMeshes.concat(newMeshDataArr.map((function (param) {
                                  return param[0];
                                })));
              }), meshes.slice(), multiPrimitivesMeshMap);
}

function _buildNewNodes(nodes, multiPrimitivesMeshMap) {
  var match = ArrayService$WonderCommonlib.reduceOneParam((function (param, node) {
          var mesh = node[/* mesh */2];
          var name = node[/* name */0];
          var newNodeIndex = param[2];
          var newNodesOfMultiPrimitives = param[1];
          var newNodes = param[0];
          if (mesh !== undefined) {
            var match = MutableSparseMapService$WonderCommonlib.get(mesh, multiPrimitivesMeshMap);
            if (match !== undefined) {
              var newMeshDataArr = match;
              var newNodesOfMultiPrimitives$1 = ArrayService$WonderCommonlib.reduceOneParami((function (newNodesOfMultiPrimitives, param, primitiveIndex) {
                      return ArrayService$Wonderjs.push(/* record */[
                                  /* name */_buildMultiPrimitivesName(name, primitiveIndex),
                                  /* camera */undefined,
                                  /* mesh */param[1],
                                  /* children */undefined,
                                  /* matrix */undefined,
                                  /* translation */undefined,
                                  /* rotation */undefined,
                                  /* scale */undefined,
                                  /* extras */undefined,
                                  /* extensions */undefined
                                ], newNodesOfMultiPrimitives);
                    }), newNodesOfMultiPrimitives, newMeshDataArr);
              var newChildren = ArrayService$Wonderjs.range(newNodeIndex, (newNodeIndex + newMeshDataArr.length | 0) - 1 | 0);
              var match$1 = node[/* children */3];
              return /* tuple */[
                      ArrayService$Wonderjs.push(/* record */[
                            /* name */node[/* name */0],
                            /* camera */node[/* camera */1],
                            /* mesh */undefined,
                            /* children */match$1 !== undefined ? match$1.concat(newChildren) : newChildren,
                            /* matrix */node[/* matrix */4],
                            /* translation */node[/* translation */5],
                            /* rotation */node[/* rotation */6],
                            /* scale */node[/* scale */7],
                            /* extras */node[/* extras */8],
                            /* extensions */node[/* extensions */9]
                          ], newNodes),
                      newNodesOfMultiPrimitives$1,
                      newNodeIndex + newMeshDataArr.length | 0
                    ];
            } else {
              return /* tuple */[
                      ArrayService$Wonderjs.push(node, newNodes),
                      newNodesOfMultiPrimitives,
                      newNodeIndex
                    ];
            }
          } else {
            return /* tuple */[
                    ArrayService$Wonderjs.push(node, newNodes),
                    newNodesOfMultiPrimitives,
                    newNodeIndex
                  ];
          }
        }), /* tuple */[
        /* array */[],
        /* array */[],
        nodes.length
      ], nodes);
  return match[0].concat(match[1]);
}

function convertMultiPrimitivesToNodes(gltf) {
  var meshes = gltf[/* meshes */11];
  var multiPrimitivesMeshMap = _buildMultiPrimitivesMeshMap(meshes);
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
          /* nodes */_buildNewNodes(gltf[/* nodes */10], multiPrimitivesMeshMap),
          /* meshes */_buildNewMeshes(meshes, multiPrimitivesMeshMap),
          /* materials */gltf[/* materials */12],
          /* extensionsUsed */gltf[/* extensionsUsed */13],
          /* extensions */gltf[/* extensions */14],
          /* extras */gltf[/* extras */15]
        ];
}

export {
  _buildMultiPrimitivesName ,
  _buildMultiPrimitivesMeshName ,
  _buildMultiPrimitivesNodeName ,
  isMultiPrimitives ,
  _buildMultiPrimitivesMeshMap ,
  _buildNewMeshes ,
  _buildNewNodes ,
  convertMultiPrimitivesToNodes ,
  
}
/* ArrayService-Wonderjs Not a pure module */
