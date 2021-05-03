

import * as Curry from "./../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Caml_array from "./../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as Caml_int32 from "./../../../../../../node_modules/bs-platform/lib/es6/caml_int32.js";
import * as Caml_option from "./../../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as Log$WonderLog from "./../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as RABUtils$Wonderjs from "../../single/rab/utils/RABUtils.js";
import * as SABUtils$Wonderjs from "../../single/sab/utils/SABUtils.js";
import * as BufferUtils$Wonderjs from "../../../asset/utils/BufferUtils.js";
import * as ArrayService$Wonderjs from "../../../service/atom/ArrayService.js";
import * as ConvertUtils$Wonderjs from "../../../asset/converter/utils/ConvertUtils.js";
import * as OptionService$Wonderjs from "../../../service/atom/OptionService.js";
import * as DataViewCommon$Wonderjs from "../../../asset/generate/DataViewCommon.js";
import * as GenerateCommon$Wonderjs from "../../../asset/generate/GenerateCommon.js";
import * as TypeArrayUtils$Wonderjs from "../../utils/TypeArrayUtils.js";
import * as GenerateABUtils$Wonderjs from "../../utils/GenerateABUtils.js";
import * as ABBufferViewUtils$Wonderjs from "../utils/ABBufferViewUtils.js";
import * as ABArrayBufferUtils$Wonderjs from "../utils/ABArrayBufferUtils.js";
import * as ArrayService$WonderCommonlib from "./../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as AssembleWholeWDBSystem$Wonderjs from "../../../asset/assemble/AssembleWholeWDBSystem.js";
import * as BuildGeometryDataUtils$Wonderjs from "../../../asset/generate/utils/BuildGeometryDataUtils.js";
import * as BuildGeometryDataSystem$Wonderjs from "../../../asset/generate/BuildGeometryDataSystem.js";
import * as GenerateSingleRABSystem$Wonderjs from "../../single/rab/generate/GenerateSingleRABSystem.js";
import * as GenerateSingleSABSystem$Wonderjs from "../../single/sab/generate/GenerateSingleSABSystem.js";
import * as FindDependencyDataSystem$Wonderjs from "./FindDependencyDataSystem.js";
import * as BuildSingleRABJsonDataSystem$Wonderjs from "../../single/rab/generate/BuildSingleRABJsonDataSystem.js";
import * as BuildSingleSABJsonDataSystem$Wonderjs from "../../single/sab/generate/BuildSingleSABJsonDataSystem.js";
import * as ImmutableHashMapService$WonderCommonlib from "./../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ImmutableHashMapService.js";
import * as BatchOperateWholeGeometrySystem$Wonderjs from "../../../asset/assemble/BatchOperateWholeGeometrySystem.js";

function hasDependencyData(bufferDataName, abRelativePath, dependencyRelation, abBufferDataNameMap) {
  return FindDependencyDataSystem$Wonderjs.findAllDependencyRABRelativePathByDepthSearch(abRelativePath, dependencyRelation).filter((function (dependencyAbRelativePath) {
                var match = ImmutableHashMapService$WonderCommonlib.get(dependencyAbRelativePath, abBufferDataNameMap);
                if (match !== undefined) {
                  return ImmutableHashMapService$WonderCommonlib.has(bufferDataName, Caml_option.valFromOption(match));
                } else {
                  return false;
                }
              })).length > 0;
}

var All = /* module */[/* hasDependencyData */hasDependencyData];

function _removeImageDuplicateBufferData(param, param$1, buffer) {
  var bufferViews = param$1[/* bufferViews */8];
  var rabRelativePath = param[2];
  var allRabImageNameMap = param[1];
  var dependencyRelation = param[0];
  var match = ArrayService$WonderCommonlib.reduceOneParam((function (param, imageData) {
          var byteOffset = param[3];
          var uint8ArrayArr = param[2];
          var bufferViewArr = param[1];
          var imageArr = param[0];
          var match = hasDependencyData(imageData[/* name */0], rabRelativePath, dependencyRelation, allRabImageNameMap);
          if (match) {
            return /* tuple */[
                    ArrayService$Wonderjs.push(/* record */[
                          /* name */imageData[/* name */0],
                          /* bufferView */ABBufferViewUtils$Wonderjs.buildNoneBufferViewIndex(/* () */0),
                          /* mimeType */imageData[/* mimeType */2]
                        ], imageArr),
                    bufferViewArr,
                    uint8ArrayArr,
                    byteOffset
                  ];
          } else {
            var arrayBuffer = ABArrayBufferUtils$Wonderjs.RAB[/* getArrayBufferFromBufferViews */0](buffer, imageData[/* bufferView */1], bufferViews);
            var byteLength = arrayBuffer.byteLength;
            var alignedByteLength = BufferUtils$Wonderjs.alignedLength(byteLength);
            return /* tuple */[
                    ArrayService$Wonderjs.push(/* record */[
                          /* name */imageData[/* name */0],
                          /* bufferView */bufferViewArr.length,
                          /* mimeType */imageData[/* mimeType */2]
                        ], imageArr),
                    ArrayService$Wonderjs.push(/* record */[
                          /* byteOffset */byteOffset,
                          /* byteLength */byteLength
                        ], bufferViewArr),
                    ArrayService$Wonderjs.push(arrayBuffer, uint8ArrayArr),
                    byteOffset + alignedByteLength | 0
                  ];
          }
        }), /* tuple */[
        /* array */[],
        /* array */[],
        /* array */[],
        0
      ], param$1[/* images */2]);
  var bufferViewArr = match[1];
  return /* tuple */[
          match[0],
          bufferViewArr,
          match[2],
          RABUtils$Wonderjs.computeBufferViewDataByteLength(bufferViewArr)
        ];
}

function _buildGeometryBufferData(param, param$1, param$2) {
  var uint8ArrayArr = param$2[4];
  var byteOffset = param$2[3];
  var bufferViewArr = param$2[2];
  var bufferView = param$2[1];
  var match = ABBufferViewUtils$Wonderjs.isNoneBufferViewIndex(bufferView) || hasDependencyData(param[0], param[1], param[2], param[3]);
  if (match) {
    return /* tuple */[
            ABBufferViewUtils$Wonderjs.buildNoneBufferViewIndex(/* () */0),
            bufferViewArr,
            byteOffset,
            uint8ArrayArr
          ];
  } else {
    var arrayBuffer = ABArrayBufferUtils$Wonderjs.RAB[/* getArrayBufferFromBufferViews */0](param$1[0], bufferView, param$1[1]);
    var uint8Array = new Uint8Array(arrayBuffer);
    var byteLength = uint8Array.byteLength;
    var alignedByteLength = BufferUtils$Wonderjs.alignedLength(byteLength);
    return /* tuple */[
            bufferViewArr.length + param$2[0] | 0,
            ArrayService$Wonderjs.push(/* record */[
                  /* byteOffset */byteOffset,
                  /* byteLength */byteLength
                ], bufferViewArr),
            byteOffset + alignedByteLength | 0,
            ArrayService$Wonderjs.push(uint8Array, uint8ArrayArr)
          ];
  }
}

function _removeGeometryDuplicateBufferData(param, param$1, param$2, buffer) {
  var bufferViews = param$2[/* bufferViews */8];
  var imageAlignedByteLength = param$1[0];
  var rabRelativePath = param[2];
  var allRabGeometryNameMap = param[1];
  var dependencyRelation = param[0];
  var imageBufferViewIndex = param$1[1].length;
  var match = ArrayService$WonderCommonlib.reduceOneParam((function (param, geometry) {
          var name = geometry[/* name */0];
          var match = _buildGeometryBufferData(/* tuple */[
                name,
                rabRelativePath,
                dependencyRelation,
                allRabGeometryNameMap
              ], /* tuple */[
                buffer,
                bufferViews
              ], /* tuple */[
                imageBufferViewIndex,
                geometry[/* vertexBufferView */2],
                param[2],
                param[3],
                param[1]
              ]);
          var match$1 = _buildGeometryBufferData(/* tuple */[
                name,
                rabRelativePath,
                dependencyRelation,
                allRabGeometryNameMap
              ], /* tuple */[
                buffer,
                bufferViews
              ], /* tuple */[
                imageBufferViewIndex,
                geometry[/* normalBufferView */3],
                match[1],
                match[2],
                match[3]
              ]);
          var match$2 = _buildGeometryBufferData(/* tuple */[
                name,
                rabRelativePath,
                dependencyRelation,
                allRabGeometryNameMap
              ], /* tuple */[
                buffer,
                bufferViews
              ], /* tuple */[
                imageBufferViewIndex,
                geometry[/* texCoordBufferView */4],
                match$1[1],
                match$1[2],
                match$1[3]
              ]);
          var match$3 = _buildGeometryBufferData(/* tuple */[
                name,
                rabRelativePath,
                dependencyRelation,
                allRabGeometryNameMap
              ], /* tuple */[
                buffer,
                bufferViews
              ], /* tuple */[
                imageBufferViewIndex,
                geometry[/* indexBufferView */5],
                match$2[1],
                match$2[2],
                match$2[3]
              ]);
          return /* tuple */[
                  ArrayService$Wonderjs.push(/* record */[
                        /* name */geometry[/* name */0],
                        /* indexDataType */geometry[/* indexDataType */1],
                        /* vertexBufferView */match[0],
                        /* normalBufferView */match$1[0],
                        /* texCoordBufferView */match$2[0],
                        /* indexBufferView */match$3[0]
                      ], param[0]),
                  match$3[3],
                  match$3[1],
                  match$3[2]
                ];
        }), /* tuple */[
        /* array */[],
        /* array */[],
        /* array */[],
        imageAlignedByteLength
      ], param$2[/* geometrys */5]);
  var bufferViewArr = match[2];
  var match$1 = bufferViewArr.length === 0;
  return /* tuple */[
          match[0],
          match[1],
          bufferViewArr,
          match$1 ? imageAlignedByteLength : RABUtils$Wonderjs.computeBufferViewDataByteLength(bufferViewArr)
        ];
}

function removeRABDuplicateBufferData(dependencyRelation, param, param$1) {
  var rab = param$1[1];
  var rabRelativePath = param$1[0];
  var dataView = DataViewCommon$Wonderjs.create(rab);
  var match = GenerateABUtils$Wonderjs.readHeader(dataView);
  var jsonByteLength = match[1];
  var jsonStr = GenerateABUtils$Wonderjs.getJsonStr(jsonByteLength, rab);
  var buffer = GenerateABUtils$Wonderjs.getBuffer(jsonByteLength, rab);
  var resourceAssetBundleContent = JSON.parse(jsonStr);
  var match$1 = _removeImageDuplicateBufferData(/* tuple */[
        dependencyRelation,
        param[0],
        rabRelativePath
      ], resourceAssetBundleContent, buffer);
  var imageBufferViewArr = match$1[1];
  var match$2 = _removeGeometryDuplicateBufferData(/* tuple */[
        dependencyRelation,
        param[1],
        rabRelativePath
      ], /* tuple */[
        match$1[3],
        imageBufferViewArr
      ], resourceAssetBundleContent, buffer);
  var geometryBufferViewArr = match$2[2];
  var jsonUint8Array = BuildSingleRABJsonDataSystem$Wonderjs.buildJsonUint8Array(/* record */[
        /* basicSourceTextures */resourceAssetBundleContent[/* basicSourceTextures */0],
        /* cubemapTextures */resourceAssetBundleContent[/* cubemapTextures */1],
        /* images */match$1[0],
        /* basicMaterials */resourceAssetBundleContent[/* basicMaterials */3],
        /* lightMaterials */resourceAssetBundleContent[/* lightMaterials */4],
        /* geometrys */match$2[0],
        /* scriptEventFunctions */resourceAssetBundleContent[/* scriptEventFunctions */6],
        /* scriptAttributes */resourceAssetBundleContent[/* scriptAttributes */7],
        /* bufferViews */imageBufferViewArr.concat(geometryBufferViewArr)
      ]);
  return GenerateSingleRABSystem$Wonderjs.generateRAB(/* tuple */[
              /* tuple */[
                imageBufferViewArr,
                geometryBufferViewArr
              ],
              match$1[2].map((function (arrayBuffer) {
                      return new Uint8Array(arrayBuffer);
                    })),
              match$2[1]
            ], match$2[3], jsonUint8Array);
}

var RAB = /* module */[
  /* _removeImageDuplicateBufferData */_removeImageDuplicateBufferData,
  /* _buildGeometryBufferData */_buildGeometryBufferData,
  /* _removeGeometryDuplicateBufferData */_removeGeometryDuplicateBufferData,
  /* removeRABDuplicateBufferData */removeRABDuplicateBufferData
];

function _getArrayBufferFromBufferViews(buffer, bufferView, bufferViews) {
  var match = bufferViews[bufferView];
  var byteOffset = match[/* byteOffset */1];
  return buffer.slice(byteOffset, byteOffset + match[/* byteLength */2] | 0);
}

function _addImageBufferData(imageData, param, param$1) {
  var bufferViewArr = param$1[1];
  var arrayBuffer = _getArrayBufferFromBufferViews(param[0], param[1], param[2]);
  var byteLength = arrayBuffer.byteLength;
  var alignedByteLength = BufferUtils$Wonderjs.alignedLength(byteLength);
  var match = GenerateCommon$Wonderjs.buildBufferViewData(param$1[3], byteLength);
  var byteOffset = match[1];
  return /* tuple */[
          ArrayService$Wonderjs.push(/* record */[
                /* name */imageData[/* name */0],
                /* bufferView */bufferViewArr.length,
                /* mimeType */imageData[/* mimeType */2]
              ], param$1[0]),
          ArrayService$Wonderjs.push(/* record */[
                /* buffer */match[0],
                /* byteOffset */byteOffset,
                /* byteLength */match[2],
                /* byteStride */match[3]
              ], bufferViewArr),
          ArrayService$Wonderjs.push(arrayBuffer, param$1[2]),
          byteOffset + alignedByteLength | 0
        ];
}

function _removeImageDuplicateBufferData$1(param, param$1, buffer) {
  var images = param$1[/* images */4];
  if (images !== undefined) {
    var bufferViews = param$1[/* bufferViews */9];
    var sabRelativePath = param[2];
    var allRabImageNameMap = param[1];
    var dependencyRelation = param[0];
    var match = ArrayService$WonderCommonlib.reduceOneParam((function (param, imageData) {
            var byteOffset = param[3];
            var uint8ArrayArr = param[2];
            var bufferViewArr = param[1];
            var imageArr = param[0];
            var match = hasDependencyData(imageData[/* name */0], sabRelativePath, dependencyRelation, allRabImageNameMap);
            if (match) {
              return /* tuple */[
                      ArrayService$Wonderjs.push(/* record */[
                            /* name */imageData[/* name */0],
                            /* bufferView */ABBufferViewUtils$Wonderjs.buildNoneBufferViewIndex(/* () */0),
                            /* mimeType */imageData[/* mimeType */2]
                          ], imageArr),
                      bufferViewArr,
                      uint8ArrayArr,
                      byteOffset
                    ];
            } else {
              return _addImageBufferData(imageData, /* tuple */[
                          buffer,
                          imageData[/* bufferView */1],
                          bufferViews
                        ], /* tuple */[
                          imageArr,
                          bufferViewArr,
                          uint8ArrayArr,
                          byteOffset
                        ]);
            }
          }), /* tuple */[
          /* array */[],
          /* array */[],
          /* array */[],
          0
        ], images);
    var bufferViewArr = match[1];
    return /* tuple */[
            match[0],
            bufferViewArr,
            match[2],
            SABUtils$Wonderjs.computeBufferViewDataByteLength(bufferViewArr)
          ];
  } else {
    return /* tuple */[
            /* array */[],
            /* array */[],
            /* array */[],
            0
          ];
  }
}

function _buildAccessorData(bufferViewArr, imageBufferViewIndex, pointsCount, pointType) {
  return /* record */[
          /* bufferView */bufferViewArr.length + imageBufferViewIndex | 0,
          /* byteOffset */GenerateCommon$Wonderjs.buildAccessorByteOffset(/* () */0),
          /* count */pointsCount,
          /* componentType */ConvertUtils$Wonderjs.convertComponentType(BuildGeometryDataSystem$Wonderjs.getComponentType(pointType)),
          /* type_ */BufferUtils$Wonderjs.convertType(BuildGeometryDataSystem$Wonderjs.getType(pointType))
        ];
}

function _buildGeometryAttributeBufferData(param, dataViewArr, param$1, sceneAssetBundleContent, param$2, param$3) {
  var uint8ArrayArr = param$3[5];
  var byteOffset = param$3[4];
  var bufferViewArr = param$3[3];
  var accessorArr = param$3[2];
  var accessor = param$3[1];
  var match = Curry._1(param$2[0], accessor) || hasDependencyData(param[0], param[1], param[2], param[3]);
  if (match) {
    return /* tuple */[
            Curry._1(param$2[1], /* () */0),
            accessorArr,
            bufferViewArr,
            byteOffset,
            uint8ArrayArr
          ];
  } else {
    var accessor$1 = Curry._1(param$2[2], accessor);
    var points = BatchOperateWholeGeometrySystem$Wonderjs.getBufferAttributeData(accessor$1, dataViewArr, sceneAssetBundleContent);
    var uint8Array = TypeArrayUtils$Wonderjs.convertFloat32ToUint8(points);
    var byteLength = uint8Array.byteLength;
    var alignedByteLength = BufferUtils$Wonderjs.alignedLength(byteLength);
    var match$1 = GenerateCommon$Wonderjs.buildBufferViewData(byteOffset, byteLength);
    var byteOffset$1 = match$1[1];
    return /* tuple */[
            Curry._1(param$2[3], accessorArr.length),
            ArrayService$Wonderjs.push(_buildAccessorData(bufferViewArr, param$3[0], Caml_int32.div(points.length, param$1[1]), param$1[0]), accessorArr),
            ArrayService$Wonderjs.push(/* record */[
                  /* buffer */match$1[0],
                  /* byteOffset */byteOffset$1,
                  /* byteLength */match$1[2],
                  /* byteStride */match$1[3]
                ], bufferViewArr),
            byteOffset$1 + alignedByteLength | 0,
            ArrayService$Wonderjs.push(uint8Array, uint8ArrayArr)
          ];
  }
}

function _buildGeometryIndexBufferData(param, dataViewArr, pointSize, sceneAssetBundleContent, param$1) {
  var uint8ArrayArr = param$1[5];
  var byteOffset = param$1[4];
  var bufferViewArr = param$1[3];
  var accessorArr = param$1[2];
  var accessor = param$1[1];
  var match = ABBufferViewUtils$Wonderjs.isNoneAccessorIndex(accessor) || hasDependencyData(param[0], param[1], param[2], param[3]);
  if (match) {
    return /* tuple */[
            ABBufferViewUtils$Wonderjs.buildNoneAccessorIndex(/* () */0),
            accessorArr,
            bufferViewArr,
            byteOffset,
            uint8ArrayArr
          ];
  } else {
    var componentType = BatchOperateWholeGeometrySystem$Wonderjs.getAccessorComponentType(sceneAssetBundleContent, accessor);
    var match$1 = BatchOperateWholeGeometrySystem$Wonderjs.getBufferIndex16Data(componentType, accessor, dataViewArr, sceneAssetBundleContent);
    var match$2;
    if (match$1 !== undefined) {
      var data = Caml_option.valFromOption(match$1);
      match$2 = /* tuple */[
        TypeArrayUtils$Wonderjs.convertUint16ToUint8(data),
        Caml_int32.div(data.length, pointSize),
        /* Index */3
      ];
    } else {
      var match$3 = BatchOperateWholeGeometrySystem$Wonderjs.getBufferIndex32Data(componentType, accessor, dataViewArr, sceneAssetBundleContent);
      if (match$3 !== undefined) {
        var data$1 = Caml_option.valFromOption(match$3);
        match$2 = /* tuple */[
          TypeArrayUtils$Wonderjs.convertUint32ToUint8(data$1),
          Caml_int32.div(data$1.length, pointSize),
          /* Index32 */4
        ];
      } else {
        match$2 = Log$WonderLog.fatal(Log$WonderLog.buildFatalMessage("_buildGeometryIndexBufferData", "unknown componentType: " + (String(componentType) + ""), "", "", ""));
      }
    }
    var uint8Array = match$2[0];
    var byteLength = uint8Array.byteLength;
    var alignedByteLength = BufferUtils$Wonderjs.alignedLength(byteLength);
    var match$4 = GenerateCommon$Wonderjs.buildBufferViewData(byteOffset, byteLength);
    var byteOffset$1 = match$4[1];
    return /* tuple */[
            accessorArr.length,
            ArrayService$Wonderjs.push(_buildAccessorData(bufferViewArr, param$1[0], match$2[1], match$2[2]), accessorArr),
            ArrayService$Wonderjs.push(/* record */[
                  /* buffer */match$4[0],
                  /* byteOffset */byteOffset$1,
                  /* byteLength */match$4[2],
                  /* byteStride */match$4[3]
                ], bufferViewArr),
            byteOffset$1 + alignedByteLength | 0,
            ArrayService$Wonderjs.push(uint8Array, uint8ArrayArr)
          ];
  }
}

function _buildGeometryAllAttributeBufferData(param, dataViewArr, sceneAssetBundleContent, param$1, param$2) {
  var imageBufferViewIndex = param$2[0];
  var allRabGeometryNameMap = param[3];
  var dependencyRelation = param[2];
  var sabRelativePath = param[1];
  var name = param[0];
  var match = BuildGeometryDataUtils$Wonderjs.getPointSize(/* () */0);
  var match$1 = _buildGeometryAttributeBufferData(/* tuple */[
        name,
        sabRelativePath,
        dependencyRelation,
        allRabGeometryNameMap
      ], dataViewArr, /* tuple */[
        /* Vertex */0,
        match[0]
      ], sceneAssetBundleContent, /* tuple */[
        ABBufferViewUtils$Wonderjs.isNoneAccessorIndex,
        ABBufferViewUtils$Wonderjs.buildNoneBufferViewIndex,
        (function (accessor) {
            return accessor;
          }),
        (function (accessor) {
            return accessor;
          })
      ], /* tuple */[
        imageBufferViewIndex,
        param$1[0],
        param$2[1],
        param$2[2],
        param$2[3],
        param$2[4]
      ]);
  var match$2 = _buildGeometryAttributeBufferData(/* tuple */[
        name,
        sabRelativePath,
        dependencyRelation,
        allRabGeometryNameMap
      ], dataViewArr, /* tuple */[
        /* Normal */1,
        match[1]
      ], sceneAssetBundleContent, /* tuple */[
        OptionService$Wonderjs.isJsonSerializedValueNone,
        (function (param) {
            return undefined;
          }),
        OptionService$Wonderjs.unsafeGetJsonSerializedValue,
        (function (accessor) {
            return accessor;
          })
      ], /* tuple */[
        imageBufferViewIndex,
        param$1[1],
        match$1[1],
        match$1[2],
        match$1[3],
        match$1[4]
      ]);
  var match$3 = _buildGeometryAttributeBufferData(/* tuple */[
        name,
        sabRelativePath,
        dependencyRelation,
        allRabGeometryNameMap
      ], dataViewArr, /* tuple */[
        /* TexCoord */2,
        match[2]
      ], sceneAssetBundleContent, /* tuple */[
        OptionService$Wonderjs.isJsonSerializedValueNone,
        (function (param) {
            return undefined;
          }),
        OptionService$Wonderjs.unsafeGetJsonSerializedValue,
        (function (accessor) {
            return accessor;
          })
      ], /* tuple */[
        imageBufferViewIndex,
        param$1[2],
        match$2[1],
        match$2[2],
        match$2[3],
        match$2[4]
      ]);
  var match$4 = _buildGeometryIndexBufferData(/* tuple */[
        name,
        sabRelativePath,
        dependencyRelation,
        allRabGeometryNameMap
      ], dataViewArr, match[3], sceneAssetBundleContent, /* tuple */[
        imageBufferViewIndex,
        param$1[3],
        match$3[1],
        match$3[2],
        match$3[3],
        match$3[4]
      ]);
  return /* tuple */[
          /* tuple */[
            match$1[0],
            match$2[0],
            match$3[0],
            match$4[0]
          ],
          /* tuple */[
            match$4[1],
            match$4[2],
            match$4[3],
            match$4[4]
          ]
        ];
}

function _removeGeometryDuplicateBufferData$1(param, param$1, sceneAssetBundleContent, buffer) {
  var imageAlignedByteLength = param$1[0];
  var sabRelativePath = param[2];
  var allRabGeometryNameMap = param[1];
  var dependencyRelation = param[0];
  var imageBufferViewIndex = param$1[1].length;
  var dataViewArr = /* array */[DataViewCommon$Wonderjs.create(buffer)];
  var match = ArrayService$WonderCommonlib.reduceOneParam((function (param, geometryData) {
          var byteOffset = param[4];
          var bufferViewArr = param[3];
          var accessorArr = param[2];
          var uint8ArrayArr = param[1];
          var geometryArr = param[0];
          var match = OptionService$Wonderjs.isJsonSerializedValueNone(geometryData);
          if (match) {
            return /* tuple */[
                    ArrayService$Wonderjs.push(undefined, geometryArr),
                    uint8ArrayArr,
                    accessorArr,
                    bufferViewArr,
                    byteOffset
                  ];
          } else {
            var geometry = OptionService$Wonderjs.unsafeGetJsonSerializedValue(geometryData);
            var match$1 = _buildGeometryAllAttributeBufferData(/* tuple */[
                  geometry[/* name */0],
                  sabRelativePath,
                  dependencyRelation,
                  allRabGeometryNameMap
                ], dataViewArr, sceneAssetBundleContent, /* tuple */[
                  geometry[/* position */1],
                  geometry[/* normal */2],
                  geometry[/* texCoord */3],
                  geometry[/* index */4]
                ], /* tuple */[
                  imageBufferViewIndex,
                  accessorArr,
                  bufferViewArr,
                  byteOffset,
                  uint8ArrayArr
                ]);
            var match$2 = match$1[1];
            var match$3 = match$1[0];
            return /* tuple */[
                    ArrayService$Wonderjs.push(/* record */[
                          /* name */geometry[/* name */0],
                          /* position */match$3[0],
                          /* normal */match$3[1],
                          /* texCoord */match$3[2],
                          /* index */match$3[3]
                        ], geometryArr),
                    match$2[3],
                    match$2[0],
                    match$2[1],
                    match$2[2]
                  ];
          }
        }), /* tuple */[
        /* array */[],
        /* array */[],
        /* array */[],
        /* array */[],
        imageAlignedByteLength
      ], sceneAssetBundleContent[/* geometrys */18]);
  var bufferViewArr = match[3];
  var match$1 = bufferViewArr.length === 0;
  return /* tuple */[
          match[0],
          match[1],
          match[2],
          bufferViewArr,
          match$1 ? imageAlignedByteLength : SABUtils$Wonderjs.computeBufferViewDataByteLength(bufferViewArr)
        ];
}

function removeSABDuplicateBufferData(dependencyRelation, param, param$1) {
  var sabRelativePath = param$1[0];
  var match = BufferUtils$Wonderjs.decodeWDB(param$1[1], AssembleWholeWDBSystem$Wonderjs.checkWDB);
  var buffer = match[2];
  var sceneAssetBundleContent = JSON.parse(match[0]);
  var match$1 = _removeImageDuplicateBufferData$1(/* tuple */[
        dependencyRelation,
        param[0],
        sabRelativePath
      ], sceneAssetBundleContent, buffer);
  var imageBufferViewArr = match$1[1];
  var imageArr = match$1[0];
  var match$2 = _removeGeometryDuplicateBufferData$1(/* tuple */[
        dependencyRelation,
        param[1],
        sabRelativePath
      ], /* tuple */[
        match$1[3],
        imageBufferViewArr
      ], sceneAssetBundleContent, buffer);
  var geometryBufferViewArr = match$2[3];
  var newrecord = Caml_array.caml_array_dup(sceneAssetBundleContent);
  var match$3 = imageArr.length === 0;
  newrecord[/* images */4] = match$3 ? undefined : imageArr;
  var jsonUint8Array = BuildSingleSABJsonDataSystem$Wonderjs.buildJsonUint8Array((newrecord[/* bufferViews */9] = imageBufferViewArr.concat(geometryBufferViewArr), newrecord[/* accessors */10] = match$2[2], newrecord[/* geometrys */18] = match$2[0], newrecord));
  return GenerateSingleSABSystem$Wonderjs.generateSAB(/* tuple */[
              /* tuple */[
                imageBufferViewArr,
                geometryBufferViewArr
              ],
              match$1[2].map((function (arrayBuffer) {
                      return new Uint8Array(arrayBuffer);
                    })),
              match$2[1]
            ], match$2[4], jsonUint8Array);
}

var SAB = /* module */[
  /* _getArrayBufferFromBufferViews */_getArrayBufferFromBufferViews,
  /* _addImageBufferData */_addImageBufferData,
  /* _removeImageDuplicateBufferData */_removeImageDuplicateBufferData$1,
  /* _buildAccessorData */_buildAccessorData,
  /* _buildGeometryAttributeBufferData */_buildGeometryAttributeBufferData,
  /* _buildGeometryIndexBufferData */_buildGeometryIndexBufferData,
  /* _buildGeometryAllAttributeBufferData */_buildGeometryAllAttributeBufferData,
  /* _removeGeometryDuplicateBufferData */_removeGeometryDuplicateBufferData$1,
  /* removeSABDuplicateBufferData */removeSABDuplicateBufferData
];

function removeDuplicateBufferData(dependencyRelation, param, param$1) {
  var allRabGeometryNameMap = param[1];
  var allRabImageNameMap = param[0];
  return /* tuple */[
          param$1[0].map((function (data) {
                  return /* tuple */[
                          data[0],
                          removeSABDuplicateBufferData(dependencyRelation, /* tuple */[
                                allRabImageNameMap,
                                allRabGeometryNameMap
                              ], data)
                        ];
                })),
          param$1[1].map((function (data) {
                  return /* tuple */[
                          data[0],
                          removeRABDuplicateBufferData(dependencyRelation, /* tuple */[
                                allRabImageNameMap,
                                allRabGeometryNameMap
                              ], data)
                        ];
                }))
        ];
}

export {
  All ,
  RAB ,
  SAB ,
  removeDuplicateBufferData ,
  
}
/* Log-WonderLog Not a pure module */
