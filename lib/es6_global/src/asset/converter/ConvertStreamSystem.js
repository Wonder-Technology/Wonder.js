

import * as Caml_array from "../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as Caml_int32 from "../../../../../node_modules/bs-platform/lib/es6/caml_int32.js";
import * as Log$WonderLog from "../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as BufferUtils$Wonderjs from "../utils/BufferUtils.js";
import * as ArrayService$Wonderjs from "../../service/atom/ArrayService.js";
import * as ConvertCommon$Wonderjs from "./ConvertCommon.js";
import * as OptionService$Wonderjs from "../../service/atom/OptionService.js";
import * as StateDataMain$Wonderjs from "../../service/state/main/data/StateDataMain.js";
import * as DataViewCommon$Wonderjs from "../generate/DataViewCommon.js";
import * as IsDebugMainService$Wonderjs from "../../service/state/main/state/IsDebugMainService.js";
import * as ArrayService$WonderCommonlib from "../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as ConvertCamerasSystem$Wonderjs from "./ConvertCamerasSystem.js";
import * as ConvertMaterialsSystem$Wonderjs from "./ConvertMaterialsSystem.js";
import * as ConvertTransformsSystem$Wonderjs from "./ConvertTransformsSystem.js";
import * as SparseMapService$WonderCommonlib from "../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";
import * as ConvertMultiPrimitivesSystem$Wonderjs from "./ConvertMultiPrimitivesSystem.js";

function _getImageComponentType() {
  return 0;
}

function _addAccessorData(oldAccessorIndex, accessorBufferArr, bufferViewDataArr, newBufferViewOffset, param) {
  var oldAccessor = param[/* accessors */8][oldAccessorIndex];
  var oldBufferView = param[/* bufferViews */7][OptionService$Wonderjs.unsafeGet(oldAccessor[/* bufferView */0])];
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

function _addBufferViewData(oldBufferViewIndex, bufferViewDataArr, newBufferViewOffset, param) {
  var oldBufferView = param[/* bufferViews */7][oldBufferViewIndex];
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

function _addPrimitiveData(mesh, primitive, accessorBufferArr, bufferViewDataArr, streamChunkArr, newBufferViewOffset, gltf) {
  var attributes = primitive[/* attributes */0];
  var texCoord_0 = attributes[/* texCoord_0 */2];
  var normal = attributes[/* normal */1];
  var indices = primitive[/* indices */1];
  var match = _addAccessorData(attributes[/* position */0], accessorBufferArr, bufferViewDataArr, newBufferViewOffset, gltf);
  var newBufferViewOffset$1 = match[5];
  var bufferViewDataArr$1 = match[4];
  var accessorBufferArr$1 = match[3];
  var streamChunkArr$1 = ArrayService$Wonderjs.push(/* record */[
        /* byteLength */match[0],
        /* index */mesh,
        /* type_ : Vertex */0,
        /* componentType */match[1]
      ], streamChunkArr);
  var match$1;
  if (normal !== undefined) {
    var match$2 = _addAccessorData(normal, accessorBufferArr$1, bufferViewDataArr$1, newBufferViewOffset$1, gltf);
    var byteLength = match$2[0];
    match$1 = /* tuple */[
      byteLength,
      match$2[2],
      match$2[3],
      match$2[4],
      match$2[5],
      ArrayService$Wonderjs.push(/* record */[
            /* byteLength */byteLength,
            /* index */mesh,
            /* type_ : Normal */1,
            /* componentType */match$2[1]
          ], streamChunkArr$1)
    ];
  } else {
    match$1 = /* tuple */[
      0,
      undefined,
      accessorBufferArr$1,
      bufferViewDataArr$1,
      newBufferViewOffset$1,
      streamChunkArr$1
    ];
  }
  var streamChunkArr$2 = match$1[5];
  var newBufferViewOffset$2 = match$1[4];
  var bufferViewDataArr$2 = match$1[3];
  var accessorBufferArr$2 = match$1[2];
  var match$3;
  if (texCoord_0 !== undefined) {
    var match$4 = _addAccessorData(texCoord_0, accessorBufferArr$2, bufferViewDataArr$2, newBufferViewOffset$2, gltf);
    var byteLength$1 = match$4[0];
    match$3 = /* tuple */[
      byteLength$1,
      match$4[2],
      match$4[3],
      match$4[4],
      match$4[5],
      ArrayService$Wonderjs.push(/* record */[
            /* byteLength */byteLength$1,
            /* index */mesh,
            /* type_ : TexCoord */2,
            /* componentType */match$4[1]
          ], streamChunkArr$2)
    ];
  } else {
    match$3 = /* tuple */[
      0,
      undefined,
      accessorBufferArr$2,
      bufferViewDataArr$2,
      newBufferViewOffset$2,
      streamChunkArr$2
    ];
  }
  var streamChunkArr$3 = match$3[5];
  var newBufferViewOffset$3 = match$3[4];
  var bufferViewDataArr$3 = match$3[3];
  var accessorBufferArr$3 = match$3[2];
  var match$5;
  if (indices !== undefined) {
    var match$6 = _addAccessorData(indices, accessorBufferArr$3, bufferViewDataArr$3, newBufferViewOffset$3, gltf);
    var byteLength$2 = match$6[0];
    match$5 = /* tuple */[
      byteLength$2,
      match$6[2],
      match$6[3],
      match$6[4],
      match$6[5],
      ArrayService$Wonderjs.push(/* record */[
            /* byteLength */byteLength$2,
            /* index */mesh,
            /* type_ : Index */3,
            /* componentType */match$6[1]
          ], streamChunkArr$3)
    ];
  } else {
    match$5 = /* tuple */[
      0,
      undefined,
      accessorBufferArr$3,
      bufferViewDataArr$3,
      newBufferViewOffset$3,
      streamChunkArr$3
    ];
  }
  return /* tuple */[
          match$5[4],
          match$5[2],
          match$5[3],
          match$5[5],
          /* tuple */[
            match[2],
            match$1[1],
            match$3[1],
            match$5[1]
          ]
        ];
}

function _hasAddDataBefore(hasAddBeforeMap, key) {
  if (SparseMapService$WonderCommonlib.has(key, hasAddBeforeMap)) {
    return SparseMapService$WonderCommonlib.unsafeGet(key, hasAddBeforeMap) === true;
  } else {
    return false;
  }
}

function _addPBRImageData(diffuseTextureIndex, param, param$1, _) {
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
    var match$2 = _addBufferViewData(OptionService$Wonderjs.unsafeGet(image[/* bufferView */2]), bufferViewDataArr, newBufferViewOffset, param[0]);
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
            SparseMapService$WonderCommonlib.set(imageIndex, true, hasImageAddBeforeMap)
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

function _addImageData(lightMaterial, bufferViewDataArr, streamChunkArr, newBufferViewOffset, hasImageAddBeforeMap, gltf) {
  var materials = gltf[/* materials */12];
  var textures = gltf[/* textures */4];
  var images = gltf[/* images */3];
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

function _buildNewGLTF(accessorBufferArr, bufferViewArr, newMeshes, newImages, gltf) {
  return /* record */[
          /* asset */gltf[/* asset */0],
          /* scenes */gltf[/* scenes */1],
          /* scene */gltf[/* scene */2],
          /* images */newImages,
          /* textures */gltf[/* textures */4],
          /* samplers */gltf[/* samplers */5],
          /* buffers */gltf[/* buffers */6],
          /* bufferViews */bufferViewArr,
          /* accessors */accessorBufferArr,
          /* cameras */gltf[/* cameras */9],
          /* nodes */gltf[/* nodes */10],
          /* meshes */newMeshes,
          /* materials */gltf[/* materials */12],
          /* extensionsUsed */gltf[/* extensionsUsed */13],
          /* extensions */gltf[/* extensions */14],
          /* extras */gltf[/* extras */15]
        ];
}

function _checkMeshPointDataHasUniqueAccessorIndex(meshes) {
  var _checkPointData = function (accessorIndex, param) {
    var hasAccessorIndexMap = param[1];
    var match = SparseMapService$WonderCommonlib.get(accessorIndex, hasAccessorIndexMap);
    if (match !== undefined) {
      return /* tuple */[
              true,
              hasAccessorIndexMap
            ];
    } else {
      return /* tuple */[
              param[0],
              SparseMapService$WonderCommonlib.set(accessorIndex, true, hasAccessorIndexMap)
            ];
    }
  };
  return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("mesh -> point data has unique accessorIndex", "not"), (function () {
                var hasAccessorIndexMap = SparseMapService$WonderCommonlib.createEmpty(/* () */0);
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

function buildJsonData(transforms, gltf) {
  var meshes = gltf[/* meshes */11];
  Contract$WonderLog.requireCheck((function () {
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
            var mesh$1 = mesh;
            var meshData = meshes[mesh$1];
            var primitives = meshData[/* primitives */0];
            var match$1 = ConvertMultiPrimitivesSystem$Wonderjs.isMultiPrimitives(primitives);
            if (match$1) {
              return noneData;
            } else {
              var primitive = ConvertCommon$Wonderjs.getPrimitiveData(primitives);
              var match$2 = _hasAddDataBefore(hasMeshAddBeforeMap, mesh$1);
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
                var match$4 = _addPrimitiveData(mesh$1, primitive, accessorBufferArr, bufferViewDataArr, streamChunkArr, newBufferViewOffset, gltf);
                var match$5 = match$4[4];
                newMeshes[mesh$1] = /* record */[
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
                  SparseMapService$WonderCommonlib.set(mesh$1, true, hasMeshAddBeforeMap)
                ];
              }
              var match$6 = _addImageData(ConvertMaterialsSystem$Wonderjs.getLightMaterialOfNode(node, meshes), match$3[2], match$3[3], match$3[0], hasImageAddBeforeMap, gltf);
              var imageData = match$6[4];
              var newBufferViewIndex = match$6[2];
              var newImages$1;
              if (newImages !== undefined) {
                var newImages$2 = newImages;
                var tmp;
                if (newBufferViewIndex !== undefined && imageData !== undefined) {
                  var match$7 = imageData;
                  var image = match$7[1];
                  newImages$2[match$7[0]] = /* record */[
                    /* uri */image[/* uri */0],
                    /* name */image[/* name */1],
                    /* bufferView */newBufferViewIndex,
                    /* mimeType */image[/* mimeType */3]
                  ];
                  tmp = newImages$2;
                } else {
                  tmp = newImages$2;
                }
                newImages$1 = tmp;
              } else {
                newImages$1 = newImages;
              }
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
                      newImages$1
                    ];
            }
          } else {
            return noneData;
          }
        }), /* tuple */[
        /* tuple */[
          SparseMapService$WonderCommonlib.createEmpty(/* () */0),
          SparseMapService$WonderCommonlib.createEmpty(/* () */0)
        ],
        /* array */[],
        /* array */[],
        /* array */[],
        0,
        /* array */[],
        /* array */[]
      ], _sortNodesByActiveCameraNodeWorldPosition(activeCameraNodeIndex, transforms, gltf));
  var bufferViewDataArr = match[2];
  return /* tuple */[
          bufferViewDataArr,
          match[3],
          _buildNewGLTF(match[1], bufferViewDataArr.map((function (param) {
                      return param[1];
                    })), match[5], match[6], gltf)
        ];
}

function getDefault11ImageUint8ArrayData() {
  return /* tuple */[
          new Uint8Array(/* array */[
                137,
                80,
                78,
                71,
                13,
                10,
                26,
                10,
                0,
                0,
                0,
                13,
                73,
                72,
                68,
                82,
                0,
                0,
                0,
                1,
                0,
                0,
                0,
                1,
                8,
                6,
                0,
                0,
                0,
                31,
                21,
                196,
                137,
                0,
                0,
                0,
                13,
                73,
                68,
                65,
                84,
                24,
                87,
                99,
                248,
                255,
                255,
                255,
                25,
                0,
                9,
                200,
                3,
                202,
                69,
                126,
                87,
                75,
                0,
                0,
                0,
                0,
                73,
                69,
                78,
                68,
                174,
                66,
                96,
                130
              ]),
          "image/png",
          "load default11 image error"
        ];
}

function getStreamChunkArr(param, dataView) {
  var _get = function (currentByteOffset, endByteOffset, dataView, streamChunkArr) {
    var match = currentByteOffset >= endByteOffset;
    if (match) {
      return /* tuple */[
              currentByteOffset,
              endByteOffset,
              streamChunkArr
            ];
    } else {
      var match$1 = DataViewCommon$Wonderjs.getUint32_1(currentByteOffset, dataView);
      var match$2 = DataViewCommon$Wonderjs.getUint16_1(match$1[1], dataView);
      var match$3 = DataViewCommon$Wonderjs.getUint32_1(match$2[1], dataView);
      var match$4 = DataViewCommon$Wonderjs.getUint8_1(match$3[1], dataView);
      return Contract$WonderLog.ensureCheck((function (param) {
                    var endByteOffset = param[1];
                    var currentByteOffset = param[0];
                    return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("currentByteOffset === endByteOffset", "not"), (function () {
                                  return Contract$WonderLog.Operators[/* = */0](currentByteOffset, endByteOffset);
                                }));
                  }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData), _get(match$4[1], endByteOffset, dataView, ArrayService$Wonderjs.push(/* record */[
                          /* byteLength */match$1[0],
                          /* index */match$3[0],
                          /* type_ */match$4[0],
                          /* componentType */match$2[0]
                        ], streamChunkArr)));
    }
  };
  var currentByteOffset = BufferUtils$Wonderjs.getWDBHeaderTotalByteLength(/* () */0) + BufferUtils$Wonderjs.alignedLength(param[0]) | 0;
  var endByteOffset = currentByteOffset + param[1] | 0;
  return _get(currentByteOffset, endByteOffset, dataView, /* array */[])[2];
}

function _writeStreamChunk(streamChunkArr, byteOffset, dataView) {
  var byteOffset$1 = BufferUtils$Wonderjs.alignedLength(ArrayService$WonderCommonlib.reduceOneParam((function (byteOffset, param) {
              var byteOffset$1 = DataViewCommon$Wonderjs.writeUint32_1(param[/* byteLength */0], byteOffset, dataView);
              var byteOffset$2 = DataViewCommon$Wonderjs.writeUint16_1(param[/* componentType */3], byteOffset$1, dataView);
              var byteOffset$3 = DataViewCommon$Wonderjs.writeUint32_1(param[/* index */1], byteOffset$2, dataView);
              return DataViewCommon$Wonderjs.writeUint8_1(param[/* type_ */2], byteOffset$3, dataView);
            }), byteOffset, streamChunkArr));
  return /* tuple */[
          byteOffset$1,
          dataView
        ];
}

function _getStreamChunkArrByteLength(streamChunkArr) {
  return Caml_int32.imul(((Uint32Array.BYTES_PER_ELEMENT << 1) + Uint16Array.BYTES_PER_ELEMENT | 0) + Uint8Array.BYTES_PER_ELEMENT | 0, streamChunkArr.length);
}

var getStreamChunkTotalByteLength = _getStreamChunkArrByteLength;

function buildStreamChunk(byteOffset, streamChunkArr, dataView) {
  return _writeStreamChunk(streamChunkArr, byteOffset, dataView);
}

function _getBinBufferAlignedByteLength(bufferViewDataArr) {
  return ArrayService$WonderCommonlib.reduceOneParam((function (byteLength, param) {
                return byteLength + param[2] | 0;
              }), 0, bufferViewDataArr);
}

function _writeBinBufferByBufferViewData(totalByteOffset, param, binBufferDataView, totalDataView) {
  var oldBufferView = param[0];
  var bufferViewByteOffsetRef = BufferUtils$Wonderjs.unsafeGetBufferViewByteOffset(oldBufferView);
  var totalByteOffsetRef = totalByteOffset;
  var binBuffer = binBufferDataView.buffer;
  var totalBuffer = totalDataView.buffer;
  BufferUtils$Wonderjs.mergeUint8Array(new Uint8Array(totalBuffer), new Uint8Array(binBuffer).subarray(bufferViewByteOffsetRef, bufferViewByteOffsetRef + oldBufferView[/* byteLength */2] | 0), totalByteOffsetRef);
  return /* tuple */[
          totalByteOffset + param[2] | 0,
          binBufferDataView,
          totalDataView
        ];
}

var getBinBufferChunkTotalAlignedByteLength = _getBinBufferAlignedByteLength;

function buildBinBufferChunk(byteOffset, bufferViewDataArr, binBuffer, dataView) {
  var binBufferDataView = DataViewCommon$Wonderjs.create(binBuffer);
  var match = ArrayService$WonderCommonlib.reduceOneParam((function (param, bufferViewData) {
          return _writeBinBufferByBufferViewData(param[0], bufferViewData, param[1], param[2]);
        }), /* tuple */[
        byteOffset,
        binBufferDataView,
        dataView
      ], bufferViewDataArr);
  return /* tuple */[
          match[0],
          match[2]
        ];
}

export {
  _getImageComponentType ,
  _addAccessorData ,
  _addBufferViewData ,
  _computeDistance ,
  _sortNodesByActiveCameraNodeWorldPosition ,
  _addPrimitiveData ,
  _hasAddDataBefore ,
  _addPBRImageData ,
  _addMetallicRoughnessImageData ,
  _addSpecularGlossinessImageData ,
  _addImageData ,
  _buildNewGLTF ,
  _checkMeshPointDataHasUniqueAccessorIndex ,
  buildJsonData ,
  getDefault11ImageUint8ArrayData ,
  getStreamChunkArr ,
  _writeStreamChunk ,
  _getStreamChunkArrByteLength ,
  getStreamChunkTotalByteLength ,
  buildStreamChunk ,
  _getBinBufferAlignedByteLength ,
  _writeBinBufferByBufferViewData ,
  getBinBufferChunkTotalAlignedByteLength ,
  buildBinBufferChunk ,
  
}
/* Log-WonderLog Not a pure module */
