'use strict';

var Fs = require("fs");
var Curry = require("bs-platform/lib/js/curry.js");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var GLBTool$Wonderjs = require("./GLBTool.js");
var BufferUtils$Wonderjs = require("../../../../../src/asset/utils/BufferUtils.js");
var ConverterAPI$Wonderjs = require("../../../../../src/api/asset/ConverterAPI.js");
var ExecIMGUITool$Wonderjs = require("../../../../tool/service/imgui/ExecIMGUITool.js");
var ConvertGLBSystem$Wonderjs = require("../../../../../src/asset/converter/ConvertGLBSystem.js");
var SetAssetIMGUITool$Wonderjs = require("../../../../tool/service/imgui/SetAssetIMGUITool.js");
var CubemapTextureTool$Wonderjs = require("../../../../tool/service/texture/CubemapTextureTool.js");
var SceneGraphIMGUITool$Wonderjs = require("./SceneGraphIMGUITool.js");
var SceneGraphScriptTool$Wonderjs = require("./SceneGraphScriptTool.js");
var AssembleWholeWDBSystem$Wonderjs = require("../../../../../src/asset/assemble/AssembleWholeWDBSystem.js");
var BasicSourceTextureTool$Wonderjs = require("../../../../tool/service/texture/BasicSourceTextureTool.js");
var ConvertScriptDataUtils$Wonderjs = require("../../../../../src/asset/utils/ConvertScriptDataUtils.js");
var SerializeAllIMGUIService$Wonderjs = require("../../../../../src/service/record/all/imgui/SerializeAllIMGUIService.js");
var BufferCubemapTextureService$Wonderjs = require("../../../../../src/service/record/main/texture/cubemap/BufferCubemapTextureService.js");
var ImmutableHashMapService$WonderCommonlib = require("wonder-commonlib/lib/js/src/ImmutableHashMapService.js");
var BufferBasicSourceTextureService$Wonderjs = require("../../../../../src/service/record/main/texture/source/basic_source/BufferBasicSourceTextureService.js");

function testResult(sandbox, glbFilePath, testFunc) {
  GLBTool$Wonderjs.prepare(sandbox);
  var buffer = Fs.readFileSync(glbFilePath);
  var wdb = ConverterAPI$Wonderjs.convertGLBToWDB(buffer.buffer);
  var match = BufferUtils$Wonderjs.decodeWDB(wdb, AssembleWholeWDBSystem$Wonderjs.checkWDB);
  return Curry._1(testFunc, /* tuple */[
              JSON.parse(match[0]),
              match[2]
            ]);
}

function testGLTFResultByGLTF(sandbox, embeddedGLTFJsonStr, testFunc, state, $staropt$star, param) {
  var binBuffer = $staropt$star !== undefined ? Caml_option.valFromOption($staropt$star) : GLBTool$Wonderjs.buildBinBuffer(/* () */0);
  GLBTool$Wonderjs.prepare(sandbox);
  var wdb = ConvertGLBSystem$Wonderjs.convertGLBData(JSON.parse(embeddedGLTFJsonStr), binBuffer);
  var match = BufferUtils$Wonderjs.decodeWDB(wdb, AssembleWholeWDBSystem$Wonderjs.checkWDB);
  return Curry._1(testFunc, JSON.parse(match[0]));
}

function getDefaultDiffuseColor(param) {
  return /* array */[
          1,
          1,
          1
        ];
}

function buildComponentIndexData(gameObjectIndices, componentIndices) {
  return /* record */[
          /* gameObjectIndices */gameObjectIndices,
          /* componentIndices */componentIndices
        ];
}

function buildScript($staropt$star, $staropt$star$1, $staropt$star$2, param) {
  var isActive = $staropt$star !== undefined ? $staropt$star : true;
  var eventFunctionDataMap = $staropt$star$1 !== undefined ? Caml_option.valFromOption($staropt$star$1) : { };
  var attributeMap = $staropt$star$2 !== undefined ? Caml_option.valFromOption($staropt$star$2) : { };
  return /* record */[
          /* isActive */isActive,
          /* eventFunctionDataMap */eventFunctionDataMap,
          /* attributeMap */attributeMap
        ];
}

function buildMeshRenderer($staropt$star, $staropt$star$1, param) {
  var isRender = $staropt$star !== undefined ? $staropt$star : true;
  var drawMode = $staropt$star$1 !== undefined ? $staropt$star$1 : /* Triangles */4;
  return /* record */[
          /* drawMode */drawMode,
          /* isRender */isRender
        ];
}

function buildBasicSourceTexture($staropt$star, $staropt$star$1, $staropt$star$2, $staropt$star$3, param) {
  var name = $staropt$star !== undefined ? $staropt$star : "basicSourceTexture_0";
  var format = $staropt$star$1 !== undefined ? $staropt$star$1 : BufferBasicSourceTextureService$Wonderjs.getDefaultFormat(/* () */0);
  var type_ = $staropt$star$2 !== undefined ? $staropt$star$2 : BufferBasicSourceTextureService$Wonderjs.getDefaultType(/* () */0);
  var flipY = $staropt$star$3 !== undefined ? $staropt$star$3 : BasicSourceTextureTool$Wonderjs.getDefaultFlipYBool(/* () */0);
  return /* record */[
          /* name */name,
          /* format */format,
          /* type_ */type_,
          /* flipY */flipY
        ];
}

function buildCubemapTexture($staropt$star, $staropt$star$1, $staropt$star$2, $staropt$star$3, $staropt$star$4, $staropt$star$5, $staropt$star$6, $staropt$star$7, $staropt$star$8, $staropt$star$9, $staropt$star$10, $staropt$star$11, $staropt$star$12, $staropt$star$13, param) {
  var name = $staropt$star !== undefined ? $staropt$star : "cubemapTexture_0";
  var pxFormat = $staropt$star$1 !== undefined ? $staropt$star$1 : CubemapTextureTool$Wonderjs.getDefaultFormat(/* () */0);
  var nxFormat = $staropt$star$2 !== undefined ? $staropt$star$2 : CubemapTextureTool$Wonderjs.getDefaultFormat(/* () */0);
  var pyFormat = $staropt$star$3 !== undefined ? $staropt$star$3 : CubemapTextureTool$Wonderjs.getDefaultFormat(/* () */0);
  var nyFormat = $staropt$star$4 !== undefined ? $staropt$star$4 : CubemapTextureTool$Wonderjs.getDefaultFormat(/* () */0);
  var pzFormat = $staropt$star$5 !== undefined ? $staropt$star$5 : CubemapTextureTool$Wonderjs.getDefaultFormat(/* () */0);
  var nzFormat = $staropt$star$6 !== undefined ? $staropt$star$6 : CubemapTextureTool$Wonderjs.getDefaultFormat(/* () */0);
  var pxType = $staropt$star$7 !== undefined ? $staropt$star$7 : CubemapTextureTool$Wonderjs.getDefaultType(/* () */0);
  var nxType = $staropt$star$8 !== undefined ? $staropt$star$8 : CubemapTextureTool$Wonderjs.getDefaultType(/* () */0);
  var pyType = $staropt$star$9 !== undefined ? $staropt$star$9 : CubemapTextureTool$Wonderjs.getDefaultType(/* () */0);
  var nyType = $staropt$star$10 !== undefined ? $staropt$star$10 : CubemapTextureTool$Wonderjs.getDefaultType(/* () */0);
  var pzType = $staropt$star$11 !== undefined ? $staropt$star$11 : CubemapTextureTool$Wonderjs.getDefaultType(/* () */0);
  var nzType = $staropt$star$12 !== undefined ? $staropt$star$12 : CubemapTextureTool$Wonderjs.getDefaultType(/* () */0);
  var flipY = $staropt$star$13 !== undefined ? $staropt$star$13 : CubemapTextureTool$Wonderjs.getDefaultFlipYBool(/* () */0);
  return /* record */[
          /* name */name,
          /* flipY */flipY,
          /* pxFormat */pxFormat,
          /* nxFormat */nxFormat,
          /* pyFormat */pyFormat,
          /* nyFormat */nyFormat,
          /* pzFormat */pzFormat,
          /* nzFormat */nzFormat,
          /* pxType */pxType,
          /* nxType */nxType,
          /* pyType */pyType,
          /* nyType */nyType,
          /* pzType */pzType,
          /* nzType */nzType
        ];
}

function buildNode($staropt$star, $staropt$star$1, $staropt$star$2, $staropt$star$3, $staropt$star$4, $staropt$star$5, $staropt$star$6, $staropt$star$7, $staropt$star$8, $staropt$star$9, param) {
  var name = $staropt$star !== undefined ? Caml_option.valFromOption($staropt$star) : undefined;
  var camera = $staropt$star$1 !== undefined ? Caml_option.valFromOption($staropt$star$1) : undefined;
  var mesh = $staropt$star$2 !== undefined ? Caml_option.valFromOption($staropt$star$2) : undefined;
  var children = $staropt$star$3 !== undefined ? Caml_option.valFromOption($staropt$star$3) : undefined;
  var matrix = $staropt$star$4 !== undefined ? Caml_option.valFromOption($staropt$star$4) : undefined;
  var translation = $staropt$star$5 !== undefined ? Caml_option.valFromOption($staropt$star$5) : undefined;
  var rotation = $staropt$star$6 !== undefined ? Caml_option.valFromOption($staropt$star$6) : undefined;
  var scale = $staropt$star$7 !== undefined ? Caml_option.valFromOption($staropt$star$7) : undefined;
  var extras = $staropt$star$8 !== undefined ? Caml_option.valFromOption($staropt$star$8) : undefined;
  var extensions = $staropt$star$9 !== undefined ? Caml_option.valFromOption($staropt$star$9) : undefined;
  return /* record */[
          /* name */name,
          /* camera */camera,
          /* mesh */mesh,
          /* children */children,
          /* matrix */matrix,
          /* translation */translation,
          /* rotation */rotation,
          /* scale */scale,
          /* extras */extras,
          /* extensions */extensions
        ];
}

function buildPrimitive(attributes, $staropt$star, $staropt$star$1, $staropt$star$2, param) {
  var indices = $staropt$star !== undefined ? Caml_option.valFromOption($staropt$star) : undefined;
  var material = $staropt$star$1 !== undefined ? Caml_option.valFromOption($staropt$star$1) : undefined;
  var mode = $staropt$star$2 !== undefined ? Caml_option.valFromOption($staropt$star$2) : 4;
  return /* record */[
          /* attributes */attributes,
          /* indices */indices,
          /* material */material,
          /* mode */mode
        ];
}

function buildGLTFJson($staropt$star, $staropt$star$1, $staropt$star$2, $staropt$star$3, $staropt$star$4, $staropt$star$5, $staropt$star$6, $staropt$star$7, $staropt$star$8, $staropt$star$9, $staropt$star$10, $staropt$star$11, $staropt$star$12, $staropt$star$13, $staropt$star$14, $staropt$star$15, $staropt$star$16, $staropt$star$17, $staropt$star$18, $staropt$star$19, $staropt$star$20, $staropt$star$21, param) {
  var extensions = $staropt$star !== undefined ? $staropt$star : "\n            {}\n            ";
  var extensionsUsed = $staropt$star$1 !== undefined ? $staropt$star$1 : "\n                []\n                ";
  var asset = $staropt$star$2 !== undefined ? $staropt$star$2 : " {\n        \"version\": \"2.0\"\n    }";
  var scene = $staropt$star$3 !== undefined ? $staropt$star$3 : " 0";
  var scenes = $staropt$star$4 !== undefined ? $staropt$star$4 : "  [\n        {\n        \"nodes\": [0]\n    }\n    ]";
  var cameras = $staropt$star$5 !== undefined ? $staropt$star$5 : "\n        []";
  var basicCameraViews = $staropt$star$6 !== undefined ? $staropt$star$6 : "\n        []";
  var meshRenderers = $staropt$star$7 !== undefined ? $staropt$star$7 : "[]";
  var basicMaterials = $staropt$star$8 !== undefined ? $staropt$star$8 : "[]";
  var flyCameraControllers = $staropt$star$9 !== undefined ? $staropt$star$9 : "\n        []";
  var arcballCameraControllers = $staropt$star$10 !== undefined ? $staropt$star$10 : "\n        []";
  var scripts = $staropt$star$11 !== undefined ? $staropt$star$11 : "\n        []";
  var cubemapTextures = $staropt$star$12 !== undefined ? $staropt$star$12 : "\n        []";
  var nodes = $staropt$star$13 !== undefined ? $staropt$star$13 : " [\n        {\n            \"matrix\": [\n                1.0,\n                0.0,\n                0.0,\n                0.0,\n                0.0,\n                1.0,\n                0.0,\n                0.0,\n                0.0,\n                0.0,\n                1.0,\n                0.0,\n                10.0,\n                20.0,\n                30.0,\n                1.0\n            ],\n            \"mesh\": 0\n        }\n    ]";
  var meshes = $staropt$star$14 !== undefined ? $staropt$star$14 : " [\n        {\"primitives\": [\n        {\n            \"attributes\": {\n                \"NORMAL\": 1,\n                \"POSITION\": 2,\n                \"TEXCOORD_0\": 3\n            },\n            \"indices\": 0,\n            \"material\": 0\n        }\n    ]}\n    ]";
  var accessors = $staropt$star$15 !== undefined ? $staropt$star$15 : " [\n        {\n            \"bufferView\": 0,\n            \"byteOffset\": 0,\n            \"componentType\": 5123,\n            \"count\": 36,\n            \"max\": [\n                23\n            ],\n            \"min\": [\n                0\n            ],\n            \"type\": \"SCALAR\"\n        },\n        {\n            \"bufferView\": 1,\n            \"byteOffset\": 0,\n            \"componentType\": 5126,\n            \"count\": 24,\n            \"max\": [\n                1.0,\n                1.0,\n                1.0\n            ],\n            \"min\": [\n                -1.0,\n                -1.0,\n                -1.0\n            ],\n            \"type\": \"VEC3\"\n        },\n        {\n            \"bufferView\": 1,\n            \"byteOffset\": 288,\n            \"componentType\": 5126,\n            \"count\": 24,\n            \"max\": [\n                0.5,\n                0.5,\n                0.5\n            ],\n            \"min\": [\n                -0.5,\n                -0.5,\n                -0.5\n            ],\n            \"type\": \"VEC3\"\n        },\n        {\n            \"bufferView\": 2,\n            \"byteOffset\": 0,\n            \"componentType\": 5126,\n            \"count\": 24,\n            \"max\": [\n                6.0,\n                1.0\n            ],\n            \"min\": [\n                0.0,\n                0.0\n            ],\n            \"type\": \"VEC2\"\n        }\n    ]";
  var materials = $staropt$star$16 !== undefined ? $staropt$star$16 : " [\n             {\n                 \"pbrMetallicRoughness\": {\n                     \"baseColorTexture\": {\n                         \"index\": 0\n                     },\n                     \"metallicFactor\": 0.0\n                 },\n                 \"name\": \"material\"\n             }\n         ]";
  var textures = $staropt$star$17 !== undefined ? $staropt$star$17 : "  [\n             {\n                 \"sampler\": 0,\n                 \"source\": 0\n             }\n         ]";
  var images = $staropt$star$18 !== undefined ? $staropt$star$18 : "  [\n         {\"name\": \"CesiumLogoFlat.png\", \"mimeType\": \"image/png\", \"bufferView\": 3}\n             ]";
  var samplers = $staropt$star$19 !== undefined ? $staropt$star$19 : "  [\n             {\n                 \"magFilter\": 9729,\n                 \"minFilter\": 9986,\n                 \"wrapS\": 10497,\n                 \"wrapT\": 10497\n             }\n         ]";
  var bufferViews = $staropt$star$20 !== undefined ? $staropt$star$20 : "  [\n        {\n            \"buffer\": 0,\n            \"byteOffset\": 768,\n            \"byteLength\": 72,\n            \"target\": 34963\n        },\n        {\n            \"buffer\": 0,\n            \"byteOffset\": 0,\n            \"byteLength\": 576,\n            \"byteStride\": 12,\n            \"target\": 34962\n        },\n        {\n            \"buffer\": 0,\n            \"byteOffset\": 576,\n            \"byteLength\": 192,\n            \"byteStride\": 8,\n            \"target\": 34962\n        },\n        {\"buffer\":0,\"byteLength\":23516,\"byteOffset\":840}\n    ]";
  var buffers = $staropt$star$21 !== undefined ? $staropt$star$21 : " [\n        {\n            \"byteLength\": 24360\n        }\n            ]";
  return "\n{\n    \"asset\": " + (String(asset) + (",\n    \"scene\": " + (String(scene) + (",\n    \"scenes\": " + (String(scenes) + (",\n    \"cameras\": " + (String(cameras) + (",\n    \"nodes\": " + (String(nodes) + (",\n    \"meshes\": " + (String(meshes) + (",\n    \"accessors\": " + (String(accessors) + (",\n    \"materials\": " + (String(materials) + (",\n    \"bufferViews\": " + (String(bufferViews) + (",\n    \"buffers\": " + (String(buffers) + (",\n    \"textures\": " + (String(textures) + (",\n    \"samplers\": " + (String(samplers) + (",\n    \"images\": " + (String(images) + (",\n    \"extensions\":" + (String(extensions) + (",\n    \"extensionsUsed\": " + (String(extensionsUsed) + (",\n    \"extras\": {\n        \"basicCameraViews\": " + (String(basicCameraViews) + (",\n        \"meshRenderers\": " + (String(meshRenderers) + (",\n        \"basicMaterials\": " + (String(basicMaterials) + (",\n        \"flyCameraControllers\": " + (String(flyCameraControllers) + (",\n        \"arcballCameraControllers\": " + (String(arcballCameraControllers) + (",\n        \"scripts\": " + (String(scripts) + (",\n        \"cubemapTextures\": " + (String(cubemapTextures) + "\n    }\n}\n        ")))))))))))))))))))))))))))))))))))))))))));
}

function buildGLTFJsonOfSingleNode(param) {
  return buildGLTFJson(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
}

function buildGLTFJsonOfLight(param) {
  return buildGLTFJson("\n        {\n            \"KHR_lights\": {\n                \"lights\": [\n                    {\n                        \"color\": [0.5, 0.5, 1.0],\n                        \"type\": \"directional\"\n                    },\n                    {\n                        \"intensity\": 2.5,\n\"linearAttenuation\": 1.5,\n\"range\": 55.5,\n\n                        \"type\": \"point\"\n                    },\n                    {\n                        \"color\": [1.0, 0.5, 1.0],\n                        \"type\": \"ambient\"\n                    }\n                ]\n            }\n        }\n        ", "\n        [\"KHR_lights\"]\n        ", undefined, "0", "  [\n        {\n        \"nodes\": [0],\n        \"extensions\": {\n            \"KHR_lights\" : {\n                \"light\" : 2\n            }\n        }\n    }\n    ]", undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, " [\n        {\n            \"children\": [\n                1,\n                2,\n                3\n            ]\n        },\n        {\n            \"mesh\": 0,\n            \"matrix\": [\n                1.0,\n                0.0,\n                0.0,\n                0.0,\n                0.0,\n                1.0,\n                0.0,\n                0.0,\n                0.0,\n                0.0,\n                1.0,\n                0.0,\n                -1.352329969406128,\n                0.4277220070362091,\n                -2.98022992950564e-8,\n                1.0\n            ]\n        },\n        {\n            \"matrix\": [\n                1.0,\n                0.0,\n                0.0,\n                0.0,\n                0.0,\n                1.0,\n                0.0,\n                0.0,\n                0.0,\n                0.0,\n                1.0,\n                0.0,\n                10.5,\n                0.4277220070362091,\n                20.1,\n                1.0\n            ],\n            \"extensions\": {\n                \"KHR_lights\" : {\n                    \"light\" : 0\n                }\n            }\n        },\n        {\n            \"mesh\": 0,\n            \"matrix\": [\n                1.0,\n                0.0,\n                0.0,\n                0.0,\n                0.0,\n                1.0,\n                0.0,\n                3.0,\n                0.0,\n                0.0,\n                2.0,\n                0.0,\n                2.5,\n                0.0,\n                -2.9,\n                1.0\n            ],\n            \"extensions\": {\n                \"KHR_lights\" : {\n                    \"light\" : 1\n                }\n            }\n        }\n    ]", undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
}

function buildExtendData($staropt$star, $staropt$star$1, param) {
  var funcMap = $staropt$star !== undefined ? Caml_option.valFromOption($staropt$star) : ImmutableHashMapService$WonderCommonlib.createEmpty(/* () */0);
  var allSkinDataMap = $staropt$star$1 !== undefined ? Caml_option.valFromOption($staropt$star$1) : ImmutableHashMapService$WonderCommonlib.createEmpty(/* () */0);
  return {
          customControlData: {
            funcMap: SerializeAllIMGUIService$Wonderjs.CustomControl[/* serializeFuncMap */0](funcMap)
          },
          skinData: {
            allSkinDataMap: SerializeAllIMGUIService$Wonderjs.Skin[/* serializeAllSkinDataMap */0](allSkinDataMap)
          }
        };
}

function buildCustomImageData($staropt$star, $staropt$star$1, $staropt$star$2, param) {
  var id = $staropt$star !== undefined ? $staropt$star : "";
  var bufferView = $staropt$star$1 !== undefined ? $staropt$star$1 : 1;
  var mimeType = $staropt$star$2 !== undefined ? $staropt$star$2 : "image/png";
  return {
          id: id,
          bufferView: bufferView,
          mimeType: mimeType
        };
}

function buildAssetData($staropt$star, $staropt$star$1, $staropt$star$2, $staropt$star$3, $staropt$star$4, param) {
  var fntName = $staropt$star !== undefined ? $staropt$star : SceneGraphIMGUITool$Wonderjs.buildFakeFntName(/* () */0);
  var fntContent = $staropt$star$1 !== undefined ? $staropt$star$1 : SceneGraphIMGUITool$Wonderjs.buildFakeFntContent(/* () */0);
  var bitmapName = $staropt$star$2 !== undefined ? $staropt$star$2 : SetAssetIMGUITool$Wonderjs.buildFakeBitmapName(/* () */0);
  var bitmapBufferView = $staropt$star$3 !== undefined ? $staropt$star$3 : 0;
  var customImages = $staropt$star$4 !== undefined ? $staropt$star$4 : /* array */[];
  return {
          fontData: {
            fntData: {
              name: fntName,
              content: fntContent
            },
            bitmapData: {
              name: bitmapName,
              bufferView: bitmapBufferView
            }
          },
          customImagesData: {
            customImages: customImages
          }
        };
}

function buildEmptyAssetData(param) {
  return {
          fontData: undefined,
          customImagesData: undefined
        };
}

function buildExecFuncData($staropt$star, $staropt$star$1, $staropt$star$2, $staropt$star$3, param) {
  var name = $staropt$star !== undefined ? $staropt$star : "exec";
  var customData = $staropt$star$1 !== undefined ? $staropt$star$1 : "";
  var execOrder = $staropt$star$2 !== undefined ? $staropt$star$2 : 0;
  var func = $staropt$star$3 !== undefined ? $staropt$star$3 : ExecIMGUITool$Wonderjs.buildEmptyExecFuncStr(/* () */0);
  return {
          name: name,
          execFunc: func,
          execOrder: execOrder,
          customData: customData
        };
}

function buildExecDataToOneExecFuncData($staropt$star, $staropt$star$1, $staropt$star$2, $staropt$star$3, param) {
  var name = $staropt$star !== undefined ? $staropt$star : "exec";
  var customData = $staropt$star$1 !== undefined ? $staropt$star$1 : "";
  var execOrder = $staropt$star$2 !== undefined ? $staropt$star$2 : 0;
  var func = $staropt$star$3 !== undefined ? $staropt$star$3 : ExecIMGUITool$Wonderjs.buildEmptyExecFuncStr(/* () */0);
  return {
          execFuncDataArr: /* array */[buildExecFuncData(name, customData, execOrder, func, /* () */0)]
        };
}

function buildExecData(execFuncDataArr) {
  return {
          execFuncDataArr: execFuncDataArr
        };
}

function buildGLTFJsonOfIMGUI($staropt$star, $staropt$star$1, $staropt$star$2, param) {
  var execData = $staropt$star !== undefined ? Caml_option.valFromOption($staropt$star) : buildExecDataToOneExecFuncData(undefined, undefined, undefined, undefined, /* () */0);
  var extendData = $staropt$star$1 !== undefined ? Caml_option.valFromOption($staropt$star$1) : buildExtendData(undefined, undefined, /* () */0);
  var assetData = $staropt$star$2 !== undefined ? Caml_option.valFromOption($staropt$star$2) : ({
        fontData: undefined,
        customImagesData: undefined
      });
  var assetDataStr = JSON.stringify(assetData);
  var extendDataStr = JSON.stringify(extendData);
  var execDataStr = JSON.stringify(execData);
  return buildGLTFJson(undefined, undefined, undefined, "0", "  [\n        {\n        \"nodes\": [0],\n        \"extras\": {\n            \"imgui\": {\n                \"assetData\": " + (String(assetDataStr) + (",\n                \"execData\": " + (String(execDataStr) + (",\n                \"extendData\": " + (String(extendDataStr) + "\n            }\n        }\n    }\n    ]"))))), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
}

function buildGLTFJsonOfSkyboxAndOneCubemap($staropt$star, $staropt$star$1, $staropt$star$2, $staropt$star$3, $staropt$star$4, $staropt$star$5, $staropt$star$6, $staropt$star$7, $staropt$star$8, $staropt$star$9, $staropt$star$10, $staropt$star$11, $staropt$star$12, $staropt$star$13, $staropt$star$14, param) {
  var cubemap = $staropt$star !== undefined ? $staropt$star : 0;
  var name = $staropt$star$1 !== undefined ? Caml_option.valFromOption($staropt$star$1) : undefined;
  var pxFormat = $staropt$star$2 !== undefined ? $staropt$star$2 : CubemapTextureTool$Wonderjs.getDefaultFormat(/* () */0);
  var nxFormat = $staropt$star$3 !== undefined ? $staropt$star$3 : CubemapTextureTool$Wonderjs.getDefaultFormat(/* () */0);
  var pyFormat = $staropt$star$4 !== undefined ? $staropt$star$4 : CubemapTextureTool$Wonderjs.getDefaultFormat(/* () */0);
  var nyFormat = $staropt$star$5 !== undefined ? $staropt$star$5 : CubemapTextureTool$Wonderjs.getDefaultFormat(/* () */0);
  var pzFormat = $staropt$star$6 !== undefined ? $staropt$star$6 : CubemapTextureTool$Wonderjs.getDefaultFormat(/* () */0);
  var nzFormat = $staropt$star$7 !== undefined ? $staropt$star$7 : CubemapTextureTool$Wonderjs.getDefaultFormat(/* () */0);
  var pxType = $staropt$star$8 !== undefined ? $staropt$star$8 : CubemapTextureTool$Wonderjs.getDefaultType(/* () */0);
  var nxType = $staropt$star$9 !== undefined ? $staropt$star$9 : CubemapTextureTool$Wonderjs.getDefaultType(/* () */0);
  var pyType = $staropt$star$10 !== undefined ? $staropt$star$10 : CubemapTextureTool$Wonderjs.getDefaultType(/* () */0);
  var nyType = $staropt$star$11 !== undefined ? $staropt$star$11 : CubemapTextureTool$Wonderjs.getDefaultType(/* () */0);
  var pzType = $staropt$star$12 !== undefined ? $staropt$star$12 : CubemapTextureTool$Wonderjs.getDefaultType(/* () */0);
  var nzType = $staropt$star$13 !== undefined ? $staropt$star$13 : CubemapTextureTool$Wonderjs.getDefaultType(/* () */0);
  var flipY = $staropt$star$14 !== undefined ? $staropt$star$14 : CubemapTextureTool$Wonderjs.getDefaultFlipYBool(/* () */0);
  var cubemapTextures = name !== undefined ? "  [\n             {\n               \"name\": \"" + (String(Caml_option.valFromOption(name)) + ("\",\n                 \"sampler\": 0,\n                 \"flipY\": " + (String(flipY) + (",\n                 \"pxSource\": 1,\n                 \"nxSource\": 2,\n                 \"pySource\": 3,\n                 \"nySource\": 4,\n                 \"pzSource\": 5,\n                 \"nzSource\": 6,\n                 \"pxFormat\": " + (String(pxFormat) + (",\n                 \"nxFormat\": " + (String(nxFormat) + (",\n                 \"pyFormat\": " + (String(pyFormat) + (",\n                 \"nyFormat\": " + (String(nyFormat) + (",\n                 \"pzFormat\": " + (String(pzFormat) + (",\n                 \"nzFormat\": " + (String(nzFormat) + (",\n                 \"pxType\": " + (String(pxType) + (",\n                 \"nxType\": " + (String(nxType) + (",\n                 \"pyType\": " + (String(pyType) + (",\n                 \"nyType\": " + (String(nyType) + (",\n                 \"pzType\": " + (String(pzType) + (",\n                 \"nzType\": " + (String(nzType) + "\n             }\n         ]"))))))))))))))))))))))))))) : "  [\n             {\n                 \"sampler\": 0,\n                 \"flipY\": " + (String(flipY) + (",\n                 \"pxSource\": 1,\n                 \"nxSource\": 2,\n                 \"pySource\": 3,\n                 \"nySource\": 4,\n                 \"pzSource\": 5,\n                 \"nzSource\": 6,\n                 \"pxFormat\": " + (String(pxFormat) + (",\n                 \"nxFormat\": " + (String(nxFormat) + (",\n                 \"pyFormat\": " + (String(pyFormat) + (",\n                 \"nyFormat\": " + (String(nyFormat) + (",\n                 \"pzFormat\": " + (String(pzFormat) + (",\n                 \"nzFormat\": " + (String(nzFormat) + (",\n                 \"pxType\": " + (String(pxType) + (",\n                 \"nxType\": " + (String(nxType) + (",\n                 \"pyType\": " + (String(pyType) + (",\n                 \"nyType\": " + (String(nyType) + (",\n                 \"pzType\": " + (String(pzType) + (",\n                 \"nzType\": " + (String(nzType) + "\n             }\n         ]")))))))))))))))))))))))));
  return buildGLTFJson(undefined, undefined, undefined, "0", "  [\n        {\n        \"nodes\": [0],\n        \"extras\": {\n            \"skybox\": {\n                \"cubemap\": " + (String(cubemap) + "\n            }\n        }\n    }\n    ]"), undefined, undefined, undefined, undefined, undefined, undefined, undefined, cubemapTextures, undefined, undefined, undefined, undefined, undefined, "  [\n         {\"name\": \"CesiumLogoFlat.png\", \"mimeType\": \"image/png\", \"bufferView\": 3},\n         {\"name\": \"pxSource.png\", \"mimeType\": \"image/png\", \"bufferView\": 4},\n         {\"name\": \"nxSource.jpg\", \"mimeType\": \"image/jpg\", \"bufferView\": 5},\n         {\"name\": \"pySource.png\", \"mimeType\": \"image/png\", \"bufferView\": 6},\n         {\"name\": \"nySource.jpg\", \"mimeType\": \"image/jpg\", \"bufferView\": 7},\n         {\"name\": \"pzSource.png\", \"mimeType\": \"image/png\", \"bufferView\": 8},\n         {\"name\": \"nzSource.jpg\", \"mimeType\": \"image/jpg\", \"bufferView\": 9}\n             ]", "  [\n             {\n                 \"magFilter\": 9729,\n                 \"minFilter\": 9986,\n                 \"wrapS\": 10497,\n                 \"wrapT\": 10497\n             },\n             {\n                 \"magFilter\": 9729,\n                 \"minFilter\": 9986,\n                 \"wrapS\": 10497,\n                 \"wrapT\": 10497\n             },\n             {\n                 \"magFilter\": 9728,\n                 \"minFilter\": 9987,\n                 \"wrapS\": 10497,\n                 \"wrapT\": 33648\n             },\n             {\n                 \"magFilter\": 9729,\n                 \"minFilter\": 9986,\n                 \"wrapS\": 10497,\n                 \"wrapT\": 10497\n             },\n             {\n                 \"magFilter\": 9728,\n                 \"minFilter\": 9987,\n                 \"wrapS\": 10497,\n                 \"wrapT\": 33648\n             },\n             {\n                 \"magFilter\": 9729,\n                 \"minFilter\": 9986,\n                 \"wrapS\": 10497,\n                 \"wrapT\": 10497\n             },\n             {\n                 \"magFilter\": 9728,\n                 \"minFilter\": 9987,\n                 \"wrapS\": 10497,\n                 \"wrapT\": 33648\n             }\n         ]", "  [\n        {\n            \"buffer\": 0,\n            \"byteOffset\": 768,\n            \"byteLength\": 72,\n            \"target\": 34963\n        },\n        {\n            \"buffer\": 0,\n            \"byteOffset\": 0,\n            \"byteLength\": 576,\n            \"byteStride\": 12,\n            \"target\": 34962\n        },\n        {\n            \"buffer\": 0,\n            \"byteOffset\": 576,\n            \"byteLength\": 192,\n            \"byteStride\": 8,\n            \"target\": 34962\n        },\n        {\n            \"buffer\": 0,\n            \"byteOffset\": 840,\n            \"byteLength\": 200,\n            \"byteStride\": 8,\n            \"target\": 34962\n        },\n        {\n            \"buffer\": 0,\n            \"byteOffset\": 1040,\n            \"byteLength\": 100,\n            \"byteStride\": 8,\n            \"target\": 34962\n        },\n        {\n            \"buffer\": 0,\n            \"byteOffset\": 1140,\n            \"byteLength\": 260,\n            \"byteStride\": 8,\n            \"target\": 34962\n        },\n        {\n            \"buffer\": 0,\n            \"byteOffset\": 1400,\n            \"byteLength\": 200,\n            \"byteStride\": 8,\n            \"target\": 34962\n        },\n        {\n            \"buffer\": 0,\n            \"byteOffset\": 1600,\n            \"byteLength\": 250,\n            \"byteStride\": 8,\n            \"target\": 34962\n        },\n        {\n            \"buffer\": 0,\n            \"byteOffset\": 1850,\n            \"byteLength\": 150,\n            \"byteStride\": 8,\n            \"target\": 34962\n        },\n        {\"buffer\":0,\"byteLength\":24676,\"byteOffset\":2000}\n    ]", " [\n        {\n            \"byteLength\": 25520\n        }\n            ]", /* () */0);
}

function buildGLTFJsonOfSceneIsRoot(isRoot) {
  return buildGLTFJson(undefined, undefined, undefined, "0", "  [\n        {\n        \"nodes\": [0],\n        \"extras\": {\n            \"isRoot\": " + (String(isRoot) + "\n        }\n    }\n    ]"), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
}

function buildGLTFJsonOfNodeIsActive(isActive) {
  return buildGLTFJson(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, " [\n        {\n            \"children\": [\n                1\n            ],\n            \"extras\": {\n                \"isActive\": " + (String(isActive) + ("\n            }\n        },\n        {\n            \"mesh\": 0,\n            \"extras\": {\n                \"isActive\": " + (String(isActive) + "\n            }\n        }\n        ]\n    "))), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
}

function buildGLTFJsonOfNodeIsRoot(isRoot) {
  return buildGLTFJson(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, " [\n        {\n            \"children\": [\n                1\n            ],\n            \"extras\": {\n                \"isRoot\": " + (String(isRoot) + ("\n            }\n        },\n        {\n            \"mesh\": 0,\n            \"extras\": {\n                \"isRoot\": " + (String(isRoot) + "\n            }\n        }\n        ]\n    "))), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
}

function buildGLTFJsonOfSceneAndOneNodeIsRoot(isSceneRoot, isNodeRoot) {
  return buildGLTFJson(undefined, undefined, undefined, "0", "  [\n        {\n        \"nodes\": [0],\n        \"extras\": {\n            \"isRoot\": " + (String(isSceneRoot) + "\n        }\n    }\n    ]"), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, " [\n        {\n            \"extras\": {\n                \"isRoot\": " + (String(isNodeRoot) + "\n            }\n        }\n        ]\n    "), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
}

function buildGLTFJsonOfSceneAndTwoNodeIsRoot(isSceneRoot, isNodeRoot) {
  return buildGLTFJson(undefined, undefined, undefined, "0", "  [\n        {\n        \"nodes\": [0, 1],\n        \"extras\": {\n            \"isRoot\": " + (String(isSceneRoot) + "\n        }\n    }\n    ]"), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, " [\n        {\n            \"extras\": {\n                \"isRoot\": " + (String(isNodeRoot) + ("\n            }\n        },\n        {\n            \"mesh\": 0,\n            \"extras\": {\n                \"isRoot\": " + (String(isNodeRoot) + "\n            }\n        }\n        ]\n    "))), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
}

function buildGLTFJsonOfMultiPrimitives(param) {
  return buildGLTFJson(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, " [\n        {\n            \"mesh\": 0,\n            \"children\": [\n                2,\n                1\n            ]\n        },\n        {\n            \"mesh\": 1,\n            \"matrix\": [\n                1.0,\n                0.0,\n                0.0,\n                0.0,\n                0.0,\n                1.0,\n                0.0,\n                0.0,\n                0.0,\n                0.0,\n                1.0,\n                0.0,\n                10.0,\n                30.0,\n                50.0,\n                1.0\n            ]\n        },\n        {\n            \"mesh\": 0,\n            \"children\": [\n                1\n            ],\n            \"matrix\": [\n                1.0,\n                0.0,\n                0.0,\n                0.0,\n                0.0,\n                1.0,\n                0.0,\n                0.0,\n                0.0,\n                0.0,\n                1.0,\n                0.0,\n                1.0,\n                2.0,\n                3.0,\n                1.0\n            ]\n        }\n    ]", "\n[\n        {\n            \"primitives\": [\n                {\n                    \"attributes\": {\n                        \"POSITION\": 1\n                    },\n                    \"indices\": 0,\n                    \"mode\": 4,\n                    \"material\": 0\n                },\n                {\n                    \"attributes\": {\n                        \"POSITION\": 2\n                    },\n                    \"indices\": 4,\n                    \"mode\": 4,\n                    \"material\": 0\n                }\n            ]\n        },\n        {\n            \"primitives\": [\n                {\n                    \"attributes\": {\n                        \"POSITION\": 3\n                    },\n                    \"indices\": 5,\n                    \"mode\": 4,\n                    \"material\": 0\n                }\n            ]\n        }\n    ]\n        ", " [\n        {\n            \"bufferView\": 0,\n            \"byteOffset\": 0,\n            \"componentType\": 5123,\n            \"count\": 36,\n            \"max\": [\n                23\n            ],\n            \"min\": [\n                0\n            ],\n            \"type\": \"SCALAR\"\n        },\n        {\n            \"bufferView\": 1,\n            \"byteOffset\": 0,\n            \"componentType\": 5126,\n            \"count\": 24,\n            \"max\": [\n                1.0,\n                1.0,\n                1.0\n            ],\n            \"min\": [\n                -1.0,\n                -1.0,\n                -1.0\n            ],\n            \"type\": \"VEC3\"\n        },\n        {\n            \"bufferView\": 1,\n            \"byteOffset\": 288,\n            \"componentType\": 5126,\n            \"count\": 24,\n            \"max\": [\n                0.5,\n                0.5,\n                0.5\n            ],\n            \"min\": [\n                -0.5,\n                -0.5,\n                -0.5\n            ],\n            \"type\": \"VEC3\"\n        },\n        {\n            \"bufferView\": 2,\n            \"byteOffset\": 0,\n            \"componentType\": 5126,\n            \"count\": 24,\n            \"max\": [\n                6.0,\n                1.0\n            ],\n            \"min\": [\n                0.0,\n                0.0\n            ],\n            \"type\": \"VEC2\"\n        },\n        {\n            \"bufferView\": 0,\n            \"byteOffset\": 72,\n            \"componentType\": 5123,\n            \"count\": 36,\n            \"type\": \"SCALAR\"\n        },\n        {\n            \"bufferView\": 0,\n            \"byteOffset\": 144,\n            \"componentType\": 5123,\n            \"count\": 36,\n            \"type\": \"SCALAR\"\n        }\n    ]", undefined, undefined, undefined, undefined, "  [\n        {\n            \"buffer\": 0,\n            \"byteOffset\": 768,\n            \"byteLength\": 216,\n            \"target\": 34963\n        },\n        {\n            \"buffer\": 0,\n            \"byteOffset\": 0,\n            \"byteLength\": 576,\n            \"byteStride\": 12,\n            \"target\": 34962\n        },\n        {\n            \"buffer\": 0,\n            \"byteOffset\": 576,\n            \"byteLength\": 192,\n            \"byteStride\": 8,\n            \"target\": 34962\n        },\n        {\"buffer\":0,\"byteLength\":23516,\"byteOffset\":840}\n    ]", undefined, /* () */0);
}

function buildGLTFJsonOfMultiPrimitivesWithName(param) {
  return buildGLTFJson(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, " [\n        {\n            \"mesh\": 0,\n            \"children\": [\n                3,\n                2,\n                1\n            ]\n        },\n        {\n            \"mesh\": 1,\n            \"matrix\": [\n                1.0,\n                0.0,\n                0.0,\n                0.0,\n                0.0,\n                1.0,\n                0.0,\n                0.0,\n                0.0,\n                0.0,\n                1.0,\n                0.0,\n                10.0,\n                30.0,\n                50.0,\n                1.0\n            ],\n            \"name\": \"node1\"\n        },\n        {\n            \"mesh\": 0,\n            \"children\": [\n                1\n            ],\n            \"matrix\": [\n                1.0,\n                0.0,\n                0.0,\n                0.0,\n                0.0,\n                1.0,\n                0.0,\n                0.0,\n                0.0,\n                0.0,\n                1.0,\n                0.0,\n                1.0,\n                2.0,\n                3.0,\n                1.0\n            ],\n            \"name\": \"node2\"\n        },\n        {\n            \"mesh\": 2\n        }\n    ]", "\n[\n        {\n            \"primitives\": [\n                {\n                    \"attributes\": {\n                        \"POSITION\": 2\n                    },\n                    \"indices\": 0,\n                    \"mode\": 4,\n                    \"material\": 0\n                },\n                {\n                    \"attributes\": {\n                        \"POSITION\": 6\n                    },\n                    \"indices\": 4,\n                    \"mode\": 4,\n                    \"material\": 1\n                }\n            ],\n            \"name\": \"mesh0\"\n        },\n        {\n            \"primitives\": [\n                {\n                    \"attributes\": {\n                        \"POSITION\": 9\n                    },\n                    \"indices\": 7,\n                    \"mode\": 4,\n                    \"material\": 2\n                }\n            ]\n        },\n        {\n            \"primitives\": [\n                {\n                    \"attributes\": {\n                        \"POSITION\": 10\n                    },\n                    \"indices\": 8,\n                    \"mode\": 4,\n                    \"material\": 2\n                },\n                {\n                    \"attributes\": {\n                        \"POSITION\": 6\n                    },\n                    \"indices\": 4,\n                    \"mode\": 4,\n                    \"material\": 1\n                }\n            ]\n        }\n    ]\n        ", undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
}

function buildGLTFJsonOfCamera(param) {
  return buildGLTFJson(undefined, undefined, undefined, undefined, undefined, "\n[\n        {\n            \"perspective\": {\n                \"yfov\": 0.6,\n                \"znear\": 1.0\n            },\n            \"type\": \"perspective\"\n        },\n        {\n            \"orthographic\": {\n                \"xmag\": 10.0,\n                \"ymag\": 20.5,\n                \"zfar\": 10000.0,\n                \"znear\": 1.0\n            },\n            \"type\": \"orthographic\"\n        },\n        {\n            \"perspective\": {\n                \"aspectRatio\": 2.0,\n                \"yfov\": 0.5,\n                \"zfar\": 1000.0,\n                \"znear\": 2.0\n            },\n            \"type\": \"perspective\"\n        }\n    ]\n        ", undefined, undefined, undefined, undefined, undefined, undefined, undefined, " [\n        {\n            \"mesh\": 0,\n            \"camera\": 2,\n            \"children\": [\n                1, 2\n            ],\n            \"translation\": [\n                1.0,\n                3.0,\n                5.0\n            ]\n        },\n        {\n            \"mesh\": 0,\n            \"camera\": 0,\n            \"translation\": [\n                10.0,\n                30.0,\n                50.0\n            ]\n        },\n        {\n            \"mesh\": 0,\n            \"translation\": [\n                -10.0,\n                0.0,\n                0.0\n            ]\n        }\n    ]", undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
}

function buildGLTFJsonOfBasicCameraView(param) {
  return buildGLTFJson(undefined, undefined, undefined, undefined, undefined, "\n[\n        {\n            \"perspective\": {\n                \"yfov\": 0.6,\n                \"znear\": 1.0\n            },\n            \"type\": \"perspective\"\n        },\n        {\n            \"orthographic\": {\n                \"xmag\": 10.0,\n                \"ymag\": 20.5,\n                \"zfar\": 10000.0,\n                \"znear\": 1.0\n            },\n            \"type\": \"orthographic\"\n        },\n        {\n            \"perspective\": {\n                \"aspectRatio\": 2.0,\n                \"yfov\": 0.5,\n                \"zfar\": 1000.0,\n                \"znear\": 2.0\n            },\n            \"type\": \"perspective\"\n        }\n    ]\n        ", "  [\n        {\n            \"isActive\": false\n        },\n        {\n            \"isActive\": true\n        },\n        {\n            \"isActive\": false\n        }\n    ]", undefined, undefined, undefined, undefined, undefined, undefined, " [\n        {\n            \"mesh\": 0,\n            \"camera\": 2,\n            \"children\": [\n                1, 2\n            ],\n            \"extras\":{\n                \"basicCameraView\": 1\n            }\n        },\n        {\n            \"mesh\": 0,\n            \"camera\": 0,\n            \"extras\":{\n                \"basicCameraView\": 0\n            }\n        },\n        {\n            \"mesh\": 0,\n            \"camera\": 1,\n            \"extras\":{\n                \"basicCameraView\": 2\n            }\n        }\n    ]", undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
}

function buildGLTFJsonOfFlyCameraController($staropt$star, param) {
  var isBindEvent = $staropt$star !== undefined ? $staropt$star : true;
  var isBindEvent$1 = isBindEvent ? "true" : "false";
  return buildGLTFJson(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, "\n[\n        {\n            \"moveSpeed\":2.1,\n            \"rotateSpeed\":2.3,\n            \"wheelSpeed\":3.9,\n            \"isBindEvent\": " + (String(isBindEvent$1) + "\n        }\n    ]\n        "), undefined, undefined, undefined, " [\n        {\n            \"mesh\": 0,\n            \"extras\": {\n                \"flyCameraController\": 0\n            }\n        }\n    ]", undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
}

function buildGLTFJsonOfArcballCameraController($staropt$star, param) {
  var isBindEvent = $staropt$star !== undefined ? $staropt$star : true;
  var isBindEvent$1 = isBindEvent ? "true" : "false";
  return buildGLTFJson(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, "\n[\n        {\n            \"distance\":1.5,\n            \"minDistance\":1.0,\n            \"phi\":0.8,\n            \"theta\":0.6,\n            \"thetaMargin\":1.5,\n            \"target\":[0.0, 0.5, 0.1],\n            \"moveSpeedX\":2.1,\n            \"moveSpeedY\":3.1,\n            \"rotateSpeed\":0.3,\n            \"wheelSpeed\":0.9,\n            \"isBindEvent\": " + (String(isBindEvent$1) + "\n        }\n    ]\n        "), undefined, undefined, " [\n        {\n            \"mesh\": 0,\n            \"extras\": {\n                \"arcballCameraController\": 0\n            }\n        }\n    ]", undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
}

function buildGLTFJsonOfScript($staropt$star, $staropt$star$1, $staropt$star$2, param) {
  var isActive = $staropt$star !== undefined ? $staropt$star : true;
  var eventFunctionDataMap = $staropt$star$1 !== undefined ? Caml_option.valFromOption($staropt$star$1) : Caml_option.some(SceneGraphScriptTool$Wonderjs.buildEventFunctionDataMap(undefined, undefined, undefined, /* () */0));
  var attributeMap = $staropt$star$2 !== undefined ? Caml_option.valFromOption($staropt$star$2) : Caml_option.some(SceneGraphScriptTool$Wonderjs.buildAttributeMap(/* () */0));
  var eventFunctionDataMapStr = eventFunctionDataMap !== undefined ? ConvertScriptDataUtils$Wonderjs._convertEventFunctionDataMapToStr(Caml_option.valFromOption(eventFunctionDataMap)) : ConvertScriptDataUtils$Wonderjs._buildEmptyMapStr(/* () */0);
  var attributeMapStr = attributeMap !== undefined ? ConvertScriptDataUtils$Wonderjs._convertAttributeMapToStr(Caml_option.valFromOption(attributeMap)) : ConvertScriptDataUtils$Wonderjs._buildEmptyMapStr(/* () */0);
  return buildGLTFJson(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, "\n[\n        {\n\"isActive\": " + (String(isActive) + (",\n\"eventFunctionDataMap\": " + (String(eventFunctionDataMapStr) + (",\n\"attributeMap\": " + (String(attributeMapStr) + "\n        }\n    ]\n        "))))), undefined, " [\n        {\n            \"mesh\": 0,\n            \"extras\": {\n                \"script\": 0\n            }\n        }\n    ]", undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
}

function buildGLTFJsonOfBasicSourceTexture($staropt$star, $staropt$star$1, $staropt$star$2, param) {
  var format = $staropt$star !== undefined ? $staropt$star : BufferBasicSourceTextureService$Wonderjs.getDefaultFormat(/* () */0);
  var type_ = $staropt$star$1 !== undefined ? $staropt$star$1 : BufferBasicSourceTextureService$Wonderjs.getDefaultType(/* () */0);
  var flipY = $staropt$star$2 !== undefined ? $staropt$star$2 : BasicSourceTextureTool$Wonderjs.getDefaultFlipYBool(/* () */0);
  return buildGLTFJson(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, "  [\n             {\n                 \"sampler\": 0,\n                 \"source\": 0,\n                 \"extras\": {\n                   \"flipY\": " + (String(flipY) + (",\n                   \"format\": " + (String(format) + (",\n                   \"type_\": " + (String(type_) + "\n                 }\n\n             }\n         ]"))))), undefined, undefined, undefined, undefined, /* () */0);
}

function buildGLTFJsonOfCubemapTexture($staropt$star, $staropt$star$1, $staropt$star$2, $staropt$star$3, $staropt$star$4, $staropt$star$5, $staropt$star$6, $staropt$star$7, $staropt$star$8, $staropt$star$9, $staropt$star$10, $staropt$star$11, $staropt$star$12, $staropt$star$13, param) {
  var name = $staropt$star !== undefined ? Caml_option.valFromOption($staropt$star) : undefined;
  var pxFormat = $staropt$star$1 !== undefined ? $staropt$star$1 : BufferCubemapTextureService$Wonderjs.getDefaultFormat(/* () */0);
  var nxFormat = $staropt$star$2 !== undefined ? $staropt$star$2 : BufferCubemapTextureService$Wonderjs.getDefaultFormat(/* () */0);
  var pyFormat = $staropt$star$3 !== undefined ? $staropt$star$3 : BufferCubemapTextureService$Wonderjs.getDefaultFormat(/* () */0);
  var nyFormat = $staropt$star$4 !== undefined ? $staropt$star$4 : BufferCubemapTextureService$Wonderjs.getDefaultFormat(/* () */0);
  var pzFormat = $staropt$star$5 !== undefined ? $staropt$star$5 : BufferCubemapTextureService$Wonderjs.getDefaultFormat(/* () */0);
  var nzFormat = $staropt$star$6 !== undefined ? $staropt$star$6 : BufferCubemapTextureService$Wonderjs.getDefaultFormat(/* () */0);
  var pxType = $staropt$star$7 !== undefined ? $staropt$star$7 : BufferCubemapTextureService$Wonderjs.getDefaultType(/* () */0);
  var nxType = $staropt$star$8 !== undefined ? $staropt$star$8 : BufferCubemapTextureService$Wonderjs.getDefaultType(/* () */0);
  var pyType = $staropt$star$9 !== undefined ? $staropt$star$9 : BufferCubemapTextureService$Wonderjs.getDefaultType(/* () */0);
  var nyType = $staropt$star$10 !== undefined ? $staropt$star$10 : BufferCubemapTextureService$Wonderjs.getDefaultType(/* () */0);
  var pzType = $staropt$star$11 !== undefined ? $staropt$star$11 : BufferCubemapTextureService$Wonderjs.getDefaultType(/* () */0);
  var nzType = $staropt$star$12 !== undefined ? $staropt$star$12 : BufferCubemapTextureService$Wonderjs.getDefaultType(/* () */0);
  var flipY = $staropt$star$13 !== undefined ? $staropt$star$13 : CubemapTextureTool$Wonderjs.getDefaultFlipYBool(/* () */0);
  var cubemapTextures = name !== undefined ? "  [\n             {\n               \"name\": \"" + (String(Caml_option.valFromOption(name)) + ("\",\n                 \"sampler\": 0,\n                 \"flipY\": " + (String(flipY) + (",\n                 \"pxSource\": 1,\n                 \"nxSource\": 2,\n                 \"pySource\": 3,\n                 \"nySource\": 4,\n                 \"pzSource\": 5,\n                 \"nzSource\": 6,\n                 \"pxFormat\": " + (String(pxFormat) + (",\n                 \"nxFormat\": " + (String(nxFormat) + (",\n                 \"pyFormat\": " + (String(pyFormat) + (",\n                 \"nyFormat\": " + (String(nyFormat) + (",\n                 \"pzFormat\": " + (String(pzFormat) + (",\n                 \"nzFormat\": " + (String(nzFormat) + (",\n                 \"pxType\": " + (String(pxType) + (",\n                 \"nxType\": " + (String(nxType) + (",\n                 \"pyType\": " + (String(pyType) + (",\n                 \"nyType\": " + (String(nyType) + (",\n                 \"pzType\": " + (String(pzType) + (",\n                 \"nzType\": " + (String(nzType) + "\n             }\n         ]"))))))))))))))))))))))))))) : "  [\n             {\n                 \"sampler\": 0,\n                 \"flipY\": " + (String(flipY) + (",\n                 \"pxSource\": 1,\n                 \"nxSource\": 2,\n                 \"pySource\": 3,\n                 \"nySource\": 4,\n                 \"pzSource\": 5,\n                 \"nzSource\": 6,\n                 \"pxFormat\": " + (String(pxFormat) + (",\n                 \"nxFormat\": " + (String(nxFormat) + (",\n                 \"pyFormat\": " + (String(pyFormat) + (",\n                 \"nyFormat\": " + (String(nyFormat) + (",\n                 \"pzFormat\": " + (String(pzFormat) + (",\n                 \"nzFormat\": " + (String(nzFormat) + (",\n                 \"pxType\": " + (String(pxType) + (",\n                 \"nxType\": " + (String(nxType) + (",\n                 \"pyType\": " + (String(pyType) + (",\n                 \"nyType\": " + (String(nyType) + (",\n                 \"pzType\": " + (String(pzType) + (",\n                 \"nzType\": " + (String(nzType) + "\n             }\n         ]")))))))))))))))))))))))));
  return buildGLTFJson(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, cubemapTextures, undefined, undefined, undefined, undefined, undefined, "  [\n         {\"name\": \"CesiumLogoFlat.png\", \"mimeType\": \"image/png\", \"bufferView\": 3},\n         {\"name\": \"pxSource.png\", \"mimeType\": \"image/png\", \"bufferView\": 4},\n         {\"name\": \"nxSource.jpg\", \"mimeType\": \"image/jpg\", \"bufferView\": 5},\n         {\"name\": \"pySource.png\", \"mimeType\": \"image/png\", \"bufferView\": 6},\n         {\"name\": \"nySource.jpg\", \"mimeType\": \"image/jpg\", \"bufferView\": 7},\n         {\"name\": \"pzSource.png\", \"mimeType\": \"image/png\", \"bufferView\": 8},\n         {\"name\": \"nzSource.jpg\", \"mimeType\": \"image/jpg\", \"bufferView\": 9}\n             ]", "  [\n             {\n                 \"magFilter\": 9729,\n                 \"minFilter\": 9986,\n                 \"wrapS\": 10497,\n                 \"wrapT\": 10497\n             },\n             {\n                 \"magFilter\": 9729,\n                 \"minFilter\": 9986,\n                 \"wrapS\": 10497,\n                 \"wrapT\": 10497\n             },\n             {\n                 \"magFilter\": 9728,\n                 \"minFilter\": 9987,\n                 \"wrapS\": 10497,\n                 \"wrapT\": 33648\n             },\n             {\n                 \"magFilter\": 9729,\n                 \"minFilter\": 9986,\n                 \"wrapS\": 10497,\n                 \"wrapT\": 10497\n             },\n             {\n                 \"magFilter\": 9728,\n                 \"minFilter\": 9987,\n                 \"wrapS\": 10497,\n                 \"wrapT\": 33648\n             },\n             {\n                 \"magFilter\": 9729,\n                 \"minFilter\": 9986,\n                 \"wrapS\": 10497,\n                 \"wrapT\": 10497\n             },\n             {\n                 \"magFilter\": 9728,\n                 \"minFilter\": 9987,\n                 \"wrapS\": 10497,\n                 \"wrapT\": 33648\n             }\n         ]", "  [\n        {\n            \"buffer\": 0,\n            \"byteOffset\": 768,\n            \"byteLength\": 72,\n            \"target\": 34963\n        },\n        {\n            \"buffer\": 0,\n            \"byteOffset\": 0,\n            \"byteLength\": 576,\n            \"byteStride\": 12,\n            \"target\": 34962\n        },\n        {\n            \"buffer\": 0,\n            \"byteOffset\": 576,\n            \"byteLength\": 192,\n            \"byteStride\": 8,\n            \"target\": 34962\n        },\n        {\n            \"buffer\": 0,\n            \"byteOffset\": 840,\n            \"byteLength\": 200,\n            \"byteStride\": 8,\n            \"target\": 34962\n        },\n        {\n            \"buffer\": 0,\n            \"byteOffset\": 1040,\n            \"byteLength\": 100,\n            \"byteStride\": 8,\n            \"target\": 34962\n        },\n        {\n            \"buffer\": 0,\n            \"byteOffset\": 1140,\n            \"byteLength\": 260,\n            \"byteStride\": 8,\n            \"target\": 34962\n        },\n        {\n            \"buffer\": 0,\n            \"byteOffset\": 1400,\n            \"byteLength\": 200,\n            \"byteStride\": 8,\n            \"target\": 34962\n        },\n        {\n            \"buffer\": 0,\n            \"byteOffset\": 1600,\n            \"byteLength\": 250,\n            \"byteStride\": 8,\n            \"target\": 34962\n        },\n        {\n            \"buffer\": 0,\n            \"byteOffset\": 1850,\n            \"byteLength\": 150,\n            \"byteStride\": 8,\n            \"target\": 34962\n        },\n        {\"buffer\":0,\"byteLength\":24676,\"byteOffset\":2000}\n    ]", " [\n        {\n            \"byteLength\": 25520\n        }\n            ]", /* () */0);
}

function buildGLTFJsonOfMeshRenderer($staropt$star, $staropt$star$1, param) {
  var isMeshRenderer1Render = $staropt$star !== undefined ? $staropt$star : true;
  var isMeshRenderer2Render = $staropt$star$1 !== undefined ? $staropt$star$1 : true;
  return buildGLTFJson(undefined, undefined, undefined, undefined, undefined, undefined, undefined, "\n[\n        {\n            \"drawMode\": 1,\n            \"isRender\": " + (String(isMeshRenderer1Render) + ("\n        },\n        {\n            \"drawMode\": 3,\n            \"isRender\": " + (String(isMeshRenderer2Render) + "\n        }\n    ]\n        "))), undefined, undefined, undefined, undefined, undefined, " [\n        {\n            \"mesh\": 0,\n            \"extras\": {\n                \"meshRenderer\": 1\n            }\n        }\n    ]", undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
}

function buildGLTFJsonOfBasicMaterial($staropt$star, $staropt$star$1, param) {
  var colorFactor = $staropt$star !== undefined ? $staropt$star : /* array */[
      0,
      0,
      1,
      1
    ];
  var name = $staropt$star$1 !== undefined ? $staropt$star$1 : "basicMaterial";
  return buildGLTFJson(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, "\n[\n        {\n            \"colorFactor\": [" + (String(colorFactor) + ("],\n            \"name\": \"" + (String(name) + "\"\n        }\n    ]\n        "))), undefined, undefined, undefined, undefined, " [\n        {\n            \"mesh\": 0,\n            \"extras\": {\n                \"basicMaterial\": 0\n            }\n        }\n    ]", undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
}

function buildGLTFJsonOfLightMaterial(param) {
  return buildGLTFJson(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, " [\n        {\n            \"mesh\": 0,\n            \"extras\": {\n                \"lightMaterial\": 1\n            }\n        }\n    ]", " [\n        {\"primitives\": [\n        {\n            \"attributes\": {\n                \"POSITION\": 2\n            },\n            \"indices\": 0,\n            \"material\": 0\n        }\n    ]}\n    ]", undefined, " [\n        {\n            \"pbrMetallicRoughness\": {\n                \"baseColorFactor\": [0.5, 1.0, 1.0, 1.0],\n                \"metallicFactor\": 0.0\n            },\n            \"name\": \"lightMaterial_0\"\n        },\n        {\n            \"pbrMetallicRoughness\": {\n                \"baseColorFactor\": [0.7, 1.0, 1.0, 1.0],\n                \"metallicFactor\": 0.0\n            },\n            \"name\": \"lightMaterial_1\"\n        }\n    ]", undefined, undefined, undefined, undefined, undefined, /* () */0);
}

function buildGLTFJsonOfBasicMaterialAndLightMaterial(param) {
  return buildGLTFJson(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, "\n[\n        {\n            \"colorFactor\": [0.5, 1.0, 0.2, 0.0],\n            \"name\": \"basicMaterial_0\"\n        }\n    ]\n        ", undefined, undefined, undefined, undefined, " [\n        {\n\n            \"children\": [\n                1, 2\n            ],\n            \"extras\": {\n                \"basicMaterial\": 0\n            }\n        },\n{\n            \"mesh\": 0,\n            \"extras\": {\n                \"lightMaterial\": 1\n            }\n        },\n\n{\n            \"mesh\": 0\n        }\n    ]", " [\n        {\"primitives\": [\n        {\n            \"attributes\": {\n                \"POSITION\": 2\n            },\n            \"indices\": 0,\n            \"material\": 0\n        }\n    ]}\n    ]", undefined, " [\n        {\n            \"pbrMetallicRoughness\": {\n                \"baseColorFactor\": [0.5, 1.0, 1.0, 1.0],\n                \"metallicFactor\": 0.0\n            },\n            \"name\": \"lightMaterial_0\"\n        },\n        {\n            \"pbrMetallicRoughness\": {\n                \"baseColorFactor\": [0.7, 1.0, 1.0, 1.0],\n                \"metallicFactor\": 0.0\n            },\n            \"name\": \"lightMaterial_1\"\n        }\n    ]", undefined, undefined, undefined, undefined, undefined, /* () */0);
}

function buildGLTFJsonOfTransform(param) {
  return buildGLTFJson(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, " [\n        {\n            \"children\": [\n                1\n            ],\n            \"translation\": [\n                11.0, 0.5, -10.5\n            ]\n        },\n        {\n            \"matrix\": [\n                1.0,\n                0.0,\n                0.0,\n                0.0,\n                0.0,\n                1.0,\n                0.0,\n                0.0,\n                0.0,\n                0.0,\n                1.0,\n                0.0,\n                10.0,\n                30.0,\n                50.0,\n                1.0\n            ]\n        },\n        {\n            \"rotation\": [\n                1.0, 0.1, 1.5, 0.5\n            ],\n            \"scale\": [\n                2.5, 2.5, 3.0\n            ]\n        }\n    ]", undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
}

function buildGLTFJsonOfCameras(param) {
  return "\n    {\n  \"scenes\" : [\n    {\n      \"nodes\" : [ 0, 1, 2 ]\n    }\n  ],\n  \"nodes\" : [\n    {\n      \"rotation\" : [ -0.383, 0.0, 0.0, 0.92375 ],\n      \"mesh\" : 0\n    },\n    {\n      \"translation\" : [ 0.5, 0.5, 3.0 ],\n      \"camera\" : 0\n    },\n    {\n      \"translation\" : [ 0.5, 0.5, 3.0 ],\n      \"camera\" : 1\n    }\n  ],\n\n  \"cameras\" : [\n    {\n      \"type\": \"perspective\",\n      \"perspective\": {\n        \"aspectRatio\": 1.0,\n        \"yfov\": 0.7,\n        \"zfar\": 100,\n        \"znear\": 0.01\n      }\n    },\n    {\n      \"type\": \"orthographic\",\n      \"orthographic\": {\n        \"xmag\": 1.0,\n        \"ymag\": 1.0,\n        \"zfar\": 100,\n        \"znear\": 0.01\n      }\n    }\n  ],\n\n  \"meshes\" : [\n    {\n      \"primitives\" : [ {\n        \"attributes\" : {\n          \"POSITION\" : 1\n        },\n        \"indices\" : 0\n      } ]\n    }\n  ],\n\n  \"buffers\" : [\n    {\n      \"uri\" : \"data:application/octet-stream;base64,AAABAAIAAQADAAIAAAAAAAAAAAAAAAAAAACAPwAAAAAAAAAAAAAAAAAAgD8AAAAAAACAPwAAgD8AAAAA\",\n      \"byteLength\" : 60\n    }\n  ],\n  \"bufferViews\" : [\n    {\n      \"buffer\" : 0,\n      \"byteOffset\" : 0,\n      \"byteLength\" : 12,\n      \"target\" : 34963\n    },\n    {\n      \"buffer\" : 0,\n      \"byteOffset\" : 12,\n      \"byteLength\" : 48,\n      \"target\" : 34962\n    }\n  ],\n  \"accessors\" : [\n    {\n      \"bufferView\" : 0,\n      \"byteOffset\" : 0,\n      \"componentType\" : 5123,\n      \"count\" : 6,\n      \"type\" : \"SCALAR\",\n      \"max\" : [ 3 ],\n      \"min\" : [ 0 ]\n    },\n    {\n      \"bufferView\" : 1,\n      \"byteOffset\" : 0,\n      \"componentType\" : 5126,\n      \"count\" : 4,\n      \"type\" : \"VEC3\",\n      \"max\" : [ 1.0, 1.0, 0.0 ],\n      \"min\" : [ 0.0, 0.0, 0.0 ]\n    }\n  ],\n\n  \"asset\" : {\n    \"version\" : \"2.0\"\n  }\n}\n    ";
}

function buildGLTFJsonOfTexCoord1(param) {
  return buildGLTFJson(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, " [\n        {\"primitives\": [\n        {\n            \"attributes\": {\n                \"NORMAL\": 1,\n                \"POSITION\": 2,\n                \"TEXCOORD_0\": 3,\n                \"TEXCOORD_1\": 3\n            },\n            \"indices\": 0,\n            \"material\": 0\n        }\n    ]}\n    ]", undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
}

exports.testResult = testResult;
exports.testGLTFResultByGLTF = testGLTFResultByGLTF;
exports.getDefaultDiffuseColor = getDefaultDiffuseColor;
exports.buildComponentIndexData = buildComponentIndexData;
exports.buildScript = buildScript;
exports.buildMeshRenderer = buildMeshRenderer;
exports.buildBasicSourceTexture = buildBasicSourceTexture;
exports.buildCubemapTexture = buildCubemapTexture;
exports.buildNode = buildNode;
exports.buildPrimitive = buildPrimitive;
exports.buildGLTFJson = buildGLTFJson;
exports.buildGLTFJsonOfSingleNode = buildGLTFJsonOfSingleNode;
exports.buildGLTFJsonOfLight = buildGLTFJsonOfLight;
exports.buildExtendData = buildExtendData;
exports.buildCustomImageData = buildCustomImageData;
exports.buildAssetData = buildAssetData;
exports.buildEmptyAssetData = buildEmptyAssetData;
exports.buildExecFuncData = buildExecFuncData;
exports.buildExecDataToOneExecFuncData = buildExecDataToOneExecFuncData;
exports.buildExecData = buildExecData;
exports.buildGLTFJsonOfIMGUI = buildGLTFJsonOfIMGUI;
exports.buildGLTFJsonOfSkyboxAndOneCubemap = buildGLTFJsonOfSkyboxAndOneCubemap;
exports.buildGLTFJsonOfSceneIsRoot = buildGLTFJsonOfSceneIsRoot;
exports.buildGLTFJsonOfNodeIsActive = buildGLTFJsonOfNodeIsActive;
exports.buildGLTFJsonOfNodeIsRoot = buildGLTFJsonOfNodeIsRoot;
exports.buildGLTFJsonOfSceneAndOneNodeIsRoot = buildGLTFJsonOfSceneAndOneNodeIsRoot;
exports.buildGLTFJsonOfSceneAndTwoNodeIsRoot = buildGLTFJsonOfSceneAndTwoNodeIsRoot;
exports.buildGLTFJsonOfMultiPrimitives = buildGLTFJsonOfMultiPrimitives;
exports.buildGLTFJsonOfMultiPrimitivesWithName = buildGLTFJsonOfMultiPrimitivesWithName;
exports.buildGLTFJsonOfCamera = buildGLTFJsonOfCamera;
exports.buildGLTFJsonOfBasicCameraView = buildGLTFJsonOfBasicCameraView;
exports.buildGLTFJsonOfFlyCameraController = buildGLTFJsonOfFlyCameraController;
exports.buildGLTFJsonOfArcballCameraController = buildGLTFJsonOfArcballCameraController;
exports.buildGLTFJsonOfScript = buildGLTFJsonOfScript;
exports.buildGLTFJsonOfBasicSourceTexture = buildGLTFJsonOfBasicSourceTexture;
exports.buildGLTFJsonOfCubemapTexture = buildGLTFJsonOfCubemapTexture;
exports.buildGLTFJsonOfMeshRenderer = buildGLTFJsonOfMeshRenderer;
exports.buildGLTFJsonOfBasicMaterial = buildGLTFJsonOfBasicMaterial;
exports.buildGLTFJsonOfLightMaterial = buildGLTFJsonOfLightMaterial;
exports.buildGLTFJsonOfBasicMaterialAndLightMaterial = buildGLTFJsonOfBasicMaterialAndLightMaterial;
exports.buildGLTFJsonOfTransform = buildGLTFJsonOfTransform;
exports.buildGLTFJsonOfCameras = buildGLTFJsonOfCameras;
exports.buildGLTFJsonOfTexCoord1 = buildGLTFJsonOfTexCoord1;
/* fs Not a pure module */
