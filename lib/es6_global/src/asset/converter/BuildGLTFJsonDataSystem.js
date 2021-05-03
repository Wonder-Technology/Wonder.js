

import * as Caml_array from "./../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as Log$WonderLog from "./../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "./../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as BufferUtils$Wonderjs from "../utils/BufferUtils.js";
import * as ArrayService$Wonderjs from "../../service/atom/ArrayService.js";
import * as ConvertCommon$Wonderjs from "./ConvertCommon.js";
import * as OptionService$Wonderjs from "../../service/atom/OptionService.js";
import * as StateDataMain$Wonderjs from "../../service/state/main/data/StateDataMain.js";
import * as IsDebugMainService$Wonderjs from "../../service/state/main/state/IsDebugMainService.js";
import * as ArrayService$WonderCommonlib from "./../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as ConvertCamerasSystem$Wonderjs from "./ConvertCamerasSystem.js";
import * as ConvertMaterialsSystem$Wonderjs from "./ConvertMaterialsSystem.js";
import * as ConvertTransformsSystem$Wonderjs from "./ConvertTransformsSystem.js";
import * as ConvertMultiPrimitivesSystem$Wonderjs from "./ConvertMultiPrimitivesSystem.js";
import * as MutableSparseMapService$WonderCommonlib from "./../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";

function _getImageComponentType(param) {
  return 0;
}

function _addAccessorData(oldAccessorIndex, param, param$1) {
  var newBufferViewOffset = param[2];
  var bufferViewDataArr = param[1];
  var accessorBufferArr = param[0];
  var oldAccessor = param$1[/* accessors */8][oldAccessorIndex];
  var oldBufferView = param$1[/* bufferViews */7][OptionService$Wonderjs.unsafeGet(oldAccessor[/* bufferView */0])];
  var byteLength = BufferUtils$Wonderjs.computeByteLengthByAccessorData(oldAccessor[/* count */2], oldAccessor[/* componentType */3], BufferUtils$Wonderjs.convertType(oldAccessor[/* type_ */4]));
  return /* tuple */[
          byteLength,
          oldAccessor[/* componentType */3],
          accessorBufferArr.length,
          ArrayService$Wonderjs.push(/* record */[
                /* bufferView */bufferViewDataArr.length,
                /* byteOffset */0,
                /* count */oldAccessor[/* count */2],
                /* componentType */oldAccessor[/* componentType */3],
                /* type_ */oldAccessor[/* type_ */4]
              ], accessorBufferArr),
          ArrayService$Wonderjs.push(/* tuple */[
                /* record */[
                  /* buffer */0,
                  /* byteOffset */BufferUtils$Wonderjs.unsafeGetAccessorByteOffset(oldAccessor) + BufferUtils$Wonderjs.unsafeGetBufferViewByteOffset(oldBufferView) | 0,
                  /* byteLength */byteLength,
                  /* byteStride */oldBufferView[/* byteStride */3]
                ],
                /* record */[
                  /* buffer */0,
                  /* byteOffset */newBufferViewOffset,
                  /* byteLength */byteLength,
                  /* byteStride */oldBufferView[/* byteStride */3]
                ],
                BufferUtils$Wonderjs.alignedLength(byteLength)
              ], bufferViewDataArr),
          newBufferViewOffset + BufferUtils$Wonderjs.alignedLength(byteLength) | 0
        ];
}

function _addBufferViewData(oldBufferViewIndex, bufferViewDataArr, newBufferViewOffset, bufferViews) {
  var oldBufferView = bufferViews[oldBufferViewIndex];
  var byteLength = oldBufferView[/* byteLength */2];
  return /* tuple */[
          byteLength,
          bufferViewDataArr.length,
          ArrayService$Wonderjs.push(/* tuple */[
                oldBufferView,
                /* record */[
                  /* buffer */0,
                  /* byteOffset */newBufferViewOffset,
                  /* byteLength */byteLength,
                  /* byteStride */oldBufferView[/* byteStride */3]
                ],
                BufferUtils$Wonderjs.alignedLength(byteLength)
              ], bufferViewDataArr),
          newBufferViewOffset + BufferUtils$Wonderjs.alignedLength(byteLength) | 0
        ];
}

function _computeDistance(param, param$1) {
  return Math.sqrt(Math.pow(param[0] - param$1[0], 2) + Math.pow(param[1] - param$1[1], 2) + Math.pow(param[2] - param$1[2], 2));
}

function _sortNodesByActiveCameraNodeWorldPosition(activeCameraNodeIndex, transforms, gltf) {
  var nodes = gltf[/* nodes */10];
  if (activeCameraNodeIndex !== undefined) {
    var worldPositionTransformArr = ConvertTransformsSystem$Wonderjs.computeWorldPositionTransforms(transforms, gltf);
    var activeCameraNodeWorldPosition = worldPositionTransformArr[activeCameraNodeIndex];
    return nodes.map((function (node, i) {
                      return /* tuple */[
                              node,
                              i
                            ];
                    })).sort((function (param, param$1) {
                    var match = _computeDistance(Caml_array.caml_array_get(worldPositionTransformArr, param[1]), activeCameraNodeWorldPosition) < _computeDistance(Caml_array.caml_array_get(worldPositionTransformArr, param$1[1]), activeCameraNodeWorldPosition);
                    if (match) {
                      return -1;
                    } else {
                      return 1;
                    }
                  })).map((function (param) {
                  return param[0];
                }));
  } else {
    return nodes;
  }
}

function _addPrimitivePointData(param, param$1, gltf) {
  var match = _addAccessorData(param[0], /* tuple */[
        param$1[1],
        param$1[2],
        param$1[3]
      ], gltf);
  var byteLength = match[0];
  return /* tuple */[
          byteLength,
          match[2],
          match[3],
          match[4],
          match[5],
          ArrayService$Wonderjs.push(/* record */[
                /* byteLength */byteLength,
                /* index */param[1],
                /* type_ */param[2],
                /* componentType */match[1]
              ], param$1[0])
        ];
}

function _addPrimitiveOptionPointData(param, param$1, gltf) {
  var newBufferViewOffset = param$1[3];
  var bufferViewDataArr = param$1[2];
  var accessorBufferArr = param$1[1];
  var streamChunkArr = param$1[0];
  var pointData = param[0];
  if (pointData !== undefined) {
    return _addPrimitivePointData(/* tuple */[
                pointData,
                param[1],
                param[2]
              ], /* tuple */[
                streamChunkArr,
                accessorBufferArr,
                bufferViewDataArr,
                newBufferViewOffset
              ], gltf);
  } else {
    return /* tuple */[
            0,
            undefined,
            accessorBufferArr,
            bufferViewDataArr,
            newBufferViewOffset,
            streamChunkArr
          ];
  }
}

function _addPrimitiveData(mesh, primitive, param, gltf) {
  var attributes = primitive[/* attributes */0];
  var match = _addPrimitivePointData(/* tuple */[
        attributes[/* position */0],
        mesh,
        /* Vertex */0
      ], /* tuple */[
        param[2],
        param[0],
        param[1],
        param[3]
      ], gltf);
  var match$1 = _addPrimitiveOptionPointData(/* tuple */[
        attributes[/* normal */1],
        mesh,
        /* Normal */1
      ], /* tuple */[
        match[5],
        match[2],
        match[3],
        match[4]
      ], gltf);
  var match$2 = _addPrimitiveOptionPointData(/* tuple */[
        attributes[/* texCoord_0 */2],
        mesh,
        /* TexCoord */2
      ], /* tuple */[
        match$1[5],
        match$1[2],
        match$1[3],
        match$1[4]
      ], gltf);
  var match$3 = _addPrimitiveOptionPointData(/* tuple */[
        primitive[/* indices */1],
        mesh,
        /* Index */3
      ], /* tuple */[
        match$2[5],
        match$2[2],
        match$2[3],
        match$2[4]
      ], gltf);
  return /* tuple */[
          match$3[4],
          match$3[2],
          match$3[3],
          match$3[5],
          /* tuple */[
            match[1],
            match$1[1],
            match$2[1],
            match$3[1]
          ]
        ];
}

function _hasAddDataBefore(hasAddBeforeMap, key) {
  if (MutableSparseMapService$WonderCommonlib.has(key, hasAddBeforeMap)) {
    return MutableSparseMapService$WonderCommonlib.unsafeGet(key, hasAddBeforeMap) === true;
  } else {
    return false;
  }
}

function _addPBRImageData(diffuseTextureIndex, param, param$1, noneData) {
  var hasImageAddBeforeMap = param[4];
  var newBufferViewOffset = param[3];
  var streamChunkArr = param[2];
  var bufferViewDataArr = param[1];
  var match = param$1[2][diffuseTextureIndex];
  var imageIndex = OptionService$Wonderjs.unsafeGet(match[/* source */1]);
  var match$1 = _hasAddDataBefore(hasImageAddBeforeMap, imageIndex);
  if (match$1) {
    return /* tuple */[
            bufferViewDataArr,
            ArrayService$Wonderjs.push(/* record */[
                  /* byteLength */0,
                  /* index */imageIndex,
                  /* type_ : Image */4,
                  /* componentType */0
                ], streamChunkArr),
            undefined,
            newBufferViewOffset,
            undefined,
            hasImageAddBeforeMap
          ];
  } else {
    var image = param$1[3][imageIndex];
    var match$2 = _addBufferViewData(OptionService$Wonderjs.unsafeGet(image[/* bufferView */2]), bufferViewDataArr, newBufferViewOffset, param[0][/* bufferViews */7]);
    return /* tuple */[
            match$2[2],
            ArrayService$Wonderjs.push(/* record */[
                  /* byteLength */match$2[0],
                  /* index */imageIndex,
                  /* type_ : Image */4,
                  /* componentType */0
                ], streamChunkArr),
            match$2[1],
            match$2[3],
            /* tuple */[
              imageIndex,
              image
            ],
            MutableSparseMapService$WonderCommonlib.set(imageIndex, true, hasImageAddBeforeMap)
          ];
  }
}

function _addMetallicRoughnessImageData(pbrMetallicRoughness, param, param$1, noneData) {
  if (pbrMetallicRoughness !== undefined) {
    var baseColorTexture = pbrMetallicRoughness[/* baseColorTexture */1];
    if (baseColorTexture !== undefined) {
      return _addPBRImageData(baseColorTexture[/* index */0], /* tuple */[
                  param[0],
                  param[1],
                  param[2],
                  param[3],
                  param[4]
                ], /* tuple */[
                  param$1[0],
                  param$1[1],
                  param$1[2],
                  param$1[3]
                ], noneData);
    } else {
      return noneData;
    }
  } else {
    return noneData;
  }
}

function _addSpecularGlossinessImageData(pbrSpecularGlossiness, param, param$1, noneData) {
  var match = pbrSpecularGlossiness[/* diffuseTexture */1];
  if (match !== undefined) {
    return _addPBRImageData(match[/* index */0], /* tuple */[
                param[0],
                param[1],
                param[2],
                param[3],
                param[4]
              ], /* tuple */[
                param$1[0],
                param$1[1],
                param$1[2],
                param$1[3]
              ], noneData);
  } else {
    return noneData;
  }
}

function _addNewImage(newBufferViewIndex, imageData, newImages) {
  if (newImages !== undefined) {
    var newImages$1 = newImages;
    var tmp;
    if (newBufferViewIndex !== undefined && imageData !== undefined) {
      var match = imageData;
      var image = match[1];
      newImages$1[match[0]] = /* record */[
        /* uri */image[/* uri */0],
        /* name */image[/* name */1],
        /* bufferView */newBufferViewIndex,
        /* mimeType */image[/* mimeType */3]
      ];
      tmp = newImages$1;
    } else {
      tmp = newImages$1;
    }
    return tmp;
  } else {
    return newImages;
  }
}

function _addImageData(lightMaterial, param, gltf) {
  var materials = gltf[/* materials */12];
  var textures = gltf[/* textures */4];
  var images = gltf[/* images */3];
  var hasImageAddBeforeMap = param[3];
  var newBufferViewOffset = param[2];
  var streamChunkArr = param[1];
  var bufferViewDataArr = param[0];
  var noneData = /* tuple */[
    bufferViewDataArr,
    streamChunkArr,
    undefined,
    newBufferViewOffset,
    undefined,
    hasImageAddBeforeMap
  ];
  if (lightMaterial !== undefined && materials !== undefined && textures !== undefined && images !== undefined) {
    var images$1 = images;
    var textures$1 = textures;
    var materials$1 = materials;
    var lightMaterial$1 = lightMaterial;
    var match = materials$1[lightMaterial$1];
    var extensions = match[/* extensions */2];
    var pbrMetallicRoughness = match[/* pbrMetallicRoughness */0];
    if (extensions !== undefined) {
      var khr_materials_pbrSpecularGlossiness = extensions[/* khr_materials_pbrSpecularGlossiness */0];
      if (khr_materials_pbrSpecularGlossiness !== undefined) {
        return _addSpecularGlossinessImageData(khr_materials_pbrSpecularGlossiness, /* tuple */[
                    gltf,
                    bufferViewDataArr,
                    streamChunkArr,
                    newBufferViewOffset,
                    hasImageAddBeforeMap
                  ], /* tuple */[
                    lightMaterial$1,
                    materials$1,
                    textures$1,
                    images$1
                  ], noneData);
      } else {
        return _addMetallicRoughnessImageData(pbrMetallicRoughness, /* tuple */[
                    gltf,
                    bufferViewDataArr,
                    streamChunkArr,
                    newBufferViewOffset,
                    hasImageAddBeforeMap
                  ], /* tuple */[
                    lightMaterial$1,
                    materials$1,
                    textures$1,
                    images$1
                  ], noneData);
      }
    } else {
      return _addMetallicRoughnessImageData(pbrMetallicRoughness, /* tuple */[
                  gltf,
                  bufferViewDataArr,
                  streamChunkArr,
                  newBufferViewOffset,
                  hasImageAddBeforeMap
                ], /* tuple */[
                  lightMaterial$1,
                  materials$1,
                  textures$1,
                  images$1
                ], noneData);
    }
  } else {
    return noneData;
  }
}

function _addCubemapOneFaceTextureImageData(source, param, param$1) {
  var hasImageAddBeforeMap = param$1[4];
  var newImages = param$1[3];
  var newBufferViewOffset = param$1[2];
  var streamChunkArr = param$1[1];
  var bufferViewDataArr = param$1[0];
  var match = _hasAddDataBefore(hasImageAddBeforeMap, source);
  if (match) {
    return /* tuple */[
            bufferViewDataArr,
            ArrayService$Wonderjs.push(/* record */[
                  /* byteLength */0,
                  /* index */source,
                  /* type_ : Image */4,
                  /* componentType */0
                ], streamChunkArr),
            newBufferViewOffset,
            newImages,
            hasImageAddBeforeMap
          ];
  } else {
    var image = param[0][source];
    var match$1 = _addBufferViewData(OptionService$Wonderjs.unsafeGet(image[/* bufferView */2]), bufferViewDataArr, newBufferViewOffset, param[1]);
    return /* tuple */[
            match$1[2],
            ArrayService$Wonderjs.push(/* record */[
                  /* byteLength */match$1[0],
                  /* index */source,
                  /* type_ : Image */4,
                  /* componentType */0
                ], streamChunkArr),
            match$1[3],
            _addNewImage(match$1[1], /* tuple */[
                  source,
                  image
                ], newImages),
            MutableSparseMapService$WonderCommonlib.set(source, true, hasImageAddBeforeMap)
          ];
  }
}

function _addCubemapTextureImageData(cubemapTextures, param, param$1, noneData) {
  var bufferViews = param[1];
  var images = param[0];
  var match = ArrayService$WonderCommonlib.reduceOneParam((function (param, param$1) {
          var match = _addCubemapOneFaceTextureImageData(param$1[/* pxSource */3], /* tuple */[
                images,
                bufferViews
              ], /* tuple */[
                param[0],
                param[1],
                param[2],
                param[3],
                param[4]
              ]);
          var match$1 = _addCubemapOneFaceTextureImageData(param$1[/* nxSource */4], /* tuple */[
                images,
                bufferViews
              ], /* tuple */[
                match[0],
                match[1],
                match[2],
                match[3],
                match[4]
              ]);
          var match$2 = _addCubemapOneFaceTextureImageData(param$1[/* pySource */5], /* tuple */[
                images,
                bufferViews
              ], /* tuple */[
                match$1[0],
                match$1[1],
                match$1[2],
                match$1[3],
                match$1[4]
              ]);
          var match$3 = _addCubemapOneFaceTextureImageData(param$1[/* nySource */6], /* tuple */[
                images,
                bufferViews
              ], /* tuple */[
                match$2[0],
                match$2[1],
                match$2[2],
                match$2[3],
                match$2[4]
              ]);
          var match$4 = _addCubemapOneFaceTextureImageData(param$1[/* pzSource */7], /* tuple */[
                images,
                bufferViews
              ], /* tuple */[
                match$3[0],
                match$3[1],
                match$3[2],
                match$3[3],
                match$3[4]
              ]);
          var match$5 = _addCubemapOneFaceTextureImageData(param$1[/* nzSource */8], /* tuple */[
                images,
                bufferViews
              ], /* tuple */[
                match$4[0],
                match$4[1],
                match$4[2],
                match$4[3],
                match$4[4]
              ]);
          return /* tuple */[
                  match$5[0],
                  match$5[1],
                  match$5[2],
                  match$5[3],
                  match$5[4]
                ];
        }), /* tuple */[
        param$1[0],
        param$1[1],
        param$1[2],
        param$1[3],
        MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0)
      ], cubemapTextures);
  return /* tuple */[
          match[0],
          match[1],
          match[2],
          match[3]
        ];
}

function _addImageDataForCubemapTexture(param, gltf) {
  var extras = gltf[/* extras */15];
  var images = gltf[/* images */3];
  var newImages = param[3];
  var newBufferViewOffset = param[2];
  var streamChunkArr = param[1];
  var bufferViewDataArr = param[0];
  var noneData = /* tuple */[
    bufferViewDataArr,
    streamChunkArr,
    newBufferViewOffset,
    newImages
  ];
  if (extras !== undefined && images !== undefined) {
    var cubemapTextures = extras[/* cubemapTextures */6];
    if (cubemapTextures !== undefined) {
      return _addCubemapTextureImageData(cubemapTextures, /* tuple */[
                  images,
                  gltf[/* bufferViews */7]
                ], /* tuple */[
                  bufferViewDataArr,
                  streamChunkArr,
                  newBufferViewOffset,
                  newImages
                ], noneData);
    } else {
      return noneData;
    }
  } else {
    return noneData;
  }
}

function _buildNewGLTF(param, gltf) {
  return /* record */[
          /* asset */gltf[/* asset */0],
          /* scenes */gltf[/* scenes */1],
          /* scene */gltf[/* scene */2],
          /* images */param[3],
          /* textures */gltf[/* textures */4],
          /* samplers */gltf[/* samplers */5],
          /* buffers */gltf[/* buffers */6],
          /* bufferViews */param[1],
          /* accessors */param[0],
          /* cameras */gltf[/* cameras */9],
          /* nodes */gltf[/* nodes */10],
          /* meshes */param[2],
          /* materials */gltf[/* materials */12],
          /* extensionsUsed */gltf[/* extensionsUsed */13],
          /* extensions */gltf[/* extensions */14],
          /* extras */gltf[/* extras */15]
        ];
}

function _checkPointData(accessorIndex, param) {
  var hasAccessorIndexMap = param[1];
  var match = MutableSparseMapService$WonderCommonlib.get(accessorIndex, hasAccessorIndexMap);
  if (match !== undefined) {
    return /* tuple */[
            true,
            hasAccessorIndexMap
          ];
  } else {
    return /* tuple */[
            param[0],
            MutableSparseMapService$WonderCommonlib.set(accessorIndex, true, hasAccessorIndexMap)
          ];
  }
}

function _checkMeshPointDataHasUniqueAccessorIndex(meshes) {
  return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("mesh -> point data has unique accessorIndex", "not"), (function (param) {
                var hasAccessorIndexMap = MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0);
                var match = ArrayService$WonderCommonlib.reduceOneParam((function (param, param$1) {
                        var primitives = param$1[/* primitives */0];
                        var hasAccessorIndexMap = param[1];
                        var isDuplicate = param[0];
                        var match = ConvertMultiPrimitivesSystem$Wonderjs.isMultiPrimitives(primitives);
                        if (match) {
                          return /* tuple */[
                                  isDuplicate,
                                  hasAccessorIndexMap
                                ];
                        } else {
                          var primitive = ConvertCommon$Wonderjs.getPrimitiveData(primitives);
                          var indices = primitive[/* indices */1];
                          var attributes = primitive[/* attributes */0];
                          var match$1 = indices !== undefined ? _checkPointData(indices, /* tuple */[
                                  isDuplicate,
                                  hasAccessorIndexMap
                                ]) : /* tuple */[
                              isDuplicate,
                              hasAccessorIndexMap
                            ];
                          var match$2 = _checkPointData(attributes[/* position */0], /* tuple */[
                                match$1[0],
                                match$1[1]
                              ]);
                          var hasAccessorIndexMap$1 = match$2[1];
                          var isDuplicate$1 = match$2[0];
                          var match$3 = attributes[/* normal */1];
                          var match$4 = match$3 !== undefined ? _checkPointData(match$3, /* tuple */[
                                  isDuplicate$1,
                                  hasAccessorIndexMap$1
                                ]) : /* tuple */[
                              isDuplicate$1,
                              hasAccessorIndexMap$1
                            ];
                          var hasAccessorIndexMap$2 = match$4[1];
                          var isDuplicate$2 = match$4[0];
                          var match$5 = attributes[/* texCoord_0 */2];
                          var match$6 = match$5 !== undefined ? _checkPointData(match$5, /* tuple */[
                                  isDuplicate$2,
                                  hasAccessorIndexMap$2
                                ]) : /* tuple */[
                              isDuplicate$2,
                              hasAccessorIndexMap$2
                            ];
                          return /* tuple */[
                                  match$6[0],
                                  match$6[1]
                                ];
                        }
                      }), /* tuple */[
                      false,
                      hasAccessorIndexMap
                    ], meshes);
                return Contract$WonderLog.assertFalse(match[0]);
              }));
}

function _addMeshAndImageData(gltf, param, param$1, noneData) {
  var newMeshes = param$1[5];
  var newBufferViewOffset = param$1[4];
  var streamChunkArr = param$1[3];
  var bufferViewDataArr = param$1[2];
  var accessorBufferArr = param$1[1];
  var match = param$1[0];
  var hasMeshAddBeforeMap = match[0];
  var mesh = param[2];
  var meshes = param[1];
  var meshData = meshes[mesh];
  var primitives = meshData[/* primitives */0];
  var match$1 = ConvertMultiPrimitivesSystem$Wonderjs.isMultiPrimitives(primitives);
  if (match$1) {
    return noneData;
  } else {
    var primitive = ConvertCommon$Wonderjs.getPrimitiveData(primitives);
    var match$2 = _hasAddDataBefore(hasMeshAddBeforeMap, mesh);
    var match$3;
    if (match$2) {
      match$3 = /* tuple */[
        newBufferViewOffset,
        accessorBufferArr,
        bufferViewDataArr,
        streamChunkArr,
        newMeshes,
        hasMeshAddBeforeMap
      ];
    } else {
      var match$4 = _addPrimitiveData(mesh, primitive, /* tuple */[
            accessorBufferArr,
            bufferViewDataArr,
            streamChunkArr,
            newBufferViewOffset
          ], gltf);
      var match$5 = match$4[4];
      newMeshes[mesh] = /* record */[
        /* primitives : array */[/* record */[
            /* attributes : record */[
              /* position */OptionService$Wonderjs.unsafeGet(match$5[0]),
              /* normal */match$5[1],
              /* texCoord_0 */match$5[2],
              /* texCoord_1 */undefined
            ],
            /* indices */match$5[3],
            /* material */primitive[/* material */2],
            /* mode */primitive[/* mode */3]
          ]],
        /* name */meshData[/* name */1]
      ];
      match$3 = /* tuple */[
        match$4[0],
        match$4[1],
        match$4[2],
        match$4[3],
        newMeshes,
        MutableSparseMapService$WonderCommonlib.set(mesh, true, hasMeshAddBeforeMap)
      ];
    }
    var match$6 = _addImageData(ConvertMaterialsSystem$Wonderjs.getLightMaterialOfNode(param[0], meshes), /* tuple */[
          match$3[2],
          match$3[3],
          match$3[0],
          match[1]
        ], gltf);
    var newImages = _addNewImage(match$6[2], match$6[4], param$1[6]);
    return /* tuple */[
            /* tuple */[
              match$3[5],
              match$6[5]
            ],
            match$3[1],
            match$6[0],
            match$6[1],
            match$6[3],
            match$3[4],
            newImages
          ];
  }
}

function buildJsonData(transforms, gltf) {
  var meshes = gltf[/* meshes */11];
  Contract$WonderLog.requireCheck((function (param) {
          return _checkMeshPointDataHasUniqueAccessorIndex(meshes);
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  var activeCameraNodeIndex = ConvertCamerasSystem$Wonderjs.getActiveCameraNodeIndex(gltf);
  var match = ArrayService$WonderCommonlib.reduceOneParam((function (param, node) {
          var mesh = node[/* mesh */2];
          var newImages = param[6];
          var newMeshes = param[5];
          var newBufferViewOffset = param[4];
          var streamChunkArr = param[3];
          var bufferViewDataArr = param[2];
          var accessorBufferArr = param[1];
          var match = param[0];
          var hasImageAddBeforeMap = match[1];
          var hasMeshAddBeforeMap = match[0];
          var noneData_000 = /* tuple */[
            hasMeshAddBeforeMap,
            hasImageAddBeforeMap
          ];
          var noneData = /* tuple */[
            noneData_000,
            accessorBufferArr,
            bufferViewDataArr,
            streamChunkArr,
            newBufferViewOffset,
            newMeshes,
            newImages
          ];
          if (mesh !== undefined) {
            return _addMeshAndImageData(gltf, /* tuple */[
                        node,
                        meshes,
                        mesh
                      ], /* tuple */[
                        /* tuple */[
                          hasMeshAddBeforeMap,
                          hasImageAddBeforeMap
                        ],
                        accessorBufferArr,
                        bufferViewDataArr,
                        streamChunkArr,
                        newBufferViewOffset,
                        newMeshes,
                        newImages
                      ], noneData);
          } else {
            return noneData;
          }
        }), /* tuple */[
        /* tuple */[
          MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
          MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0)
        ],
        /* array */[],
        /* array */[],
        /* array */[],
        0,
        /* array */[],
        /* array */[]
      ], _sortNodesByActiveCameraNodeWorldPosition(activeCameraNodeIndex, transforms, gltf));
  var match$1 = _addImageDataForCubemapTexture(/* tuple */[
        match[2],
        match[3],
        match[4],
        match[6]
      ], gltf);
  var bufferViewDataArr = match$1[0];
  return /* tuple */[
          bufferViewDataArr,
          match$1[1],
          _buildNewGLTF(/* tuple */[
                match[1],
                bufferViewDataArr.map((function (param) {
                        return param[1];
                      })),
                match[5],
                match$1[3]
              ], gltf)
        ];
}

export {
  _getImageComponentType ,
  _addAccessorData ,
  _addBufferViewData ,
  _computeDistance ,
  _sortNodesByActiveCameraNodeWorldPosition ,
  _addPrimitivePointData ,
  _addPrimitiveOptionPointData ,
  _addPrimitiveData ,
  _hasAddDataBefore ,
  _addPBRImageData ,
  _addMetallicRoughnessImageData ,
  _addSpecularGlossinessImageData ,
  _addNewImage ,
  _addImageData ,
  _addCubemapOneFaceTextureImageData ,
  _addCubemapTextureImageData ,
  _addImageDataForCubemapTexture ,
  _buildNewGLTF ,
  _checkPointData ,
  _checkMeshPointDataHasUniqueAccessorIndex ,
  _addMeshAndImageData ,
  buildJsonData ,
  
}
/* Log-WonderLog Not a pure module */
