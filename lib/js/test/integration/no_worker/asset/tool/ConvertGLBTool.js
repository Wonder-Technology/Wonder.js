'use strict';

var Fs = require("fs");
var Curry = require("bs-platform/lib/js/curry.js");
var Js_primitive = require("bs-platform/lib/js/js_primitive.js");
var GLBTool$Wonderjs = require("./GLBTool.js");
var BufferUtils$Wonderjs = require("../../../../../src/asset/utils/BufferUtils.js");
var ConverterAPI$Wonderjs = require("../../../../../src/api/asset/ConverterAPI.js");
var ConvertGLBSystem$Wonderjs = require("../../../../../src/asset/converter/ConvertGLBSystem.js");
var AssembleWholeWDBSystem$Wonderjs = require("../../../../../src/asset/assemble/AssembleWholeWDBSystem.js");

function testResult(sandbox, glbFilePath, testFunc) {
  GLBTool$Wonderjs.prepare(sandbox);
  var buffer = Fs.readFileSync(glbFilePath);
  var wdb = ConverterAPI$Wonderjs.convertGLBToWDB(buffer.buffer);
  var match = BufferUtils$Wonderjs.decodeWDB(wdb, AssembleWholeWDBSystem$Wonderjs._checkWDB);
  return Curry._1(testFunc, /* tuple */[
              JSON.parse(match[0]),
              match[2]
            ]);
}

function testGLTFResultByGLTF(sandbox, embeddedGLTFJsonStr, testFunc, _, $staropt$star, _$1) {
  var binBuffer = $staropt$star !== undefined ? Js_primitive.valFromOption($staropt$star) : GLBTool$Wonderjs.buildBinBuffer(/* () */0);
  GLBTool$Wonderjs.prepare(sandbox);
  var wdb = ConvertGLBSystem$Wonderjs.convertGLBData(JSON.parse(embeddedGLTFJsonStr), binBuffer);
  var match = BufferUtils$Wonderjs.decodeWDB(wdb, AssembleWholeWDBSystem$Wonderjs._checkWDB);
  return Curry._1(testFunc, JSON.parse(match[0]));
}

function getDefaultDiffuseColor() {
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

function buildNode($staropt$star, $staropt$star$1, $staropt$star$2, $staropt$star$3, $staropt$star$4, $staropt$star$5, $staropt$star$6, $staropt$star$7, $staropt$star$8, $staropt$star$9, _) {
  var name = $staropt$star !== undefined ? Js_primitive.valFromOption($staropt$star) : undefined;
  var camera = $staropt$star$1 !== undefined ? Js_primitive.valFromOption($staropt$star$1) : undefined;
  var mesh = $staropt$star$2 !== undefined ? Js_primitive.valFromOption($staropt$star$2) : undefined;
  var children = $staropt$star$3 !== undefined ? Js_primitive.valFromOption($staropt$star$3) : undefined;
  var matrix = $staropt$star$4 !== undefined ? Js_primitive.valFromOption($staropt$star$4) : undefined;
  var translation = $staropt$star$5 !== undefined ? Js_primitive.valFromOption($staropt$star$5) : undefined;
  var rotation = $staropt$star$6 !== undefined ? Js_primitive.valFromOption($staropt$star$6) : undefined;
  var scale = $staropt$star$7 !== undefined ? Js_primitive.valFromOption($staropt$star$7) : undefined;
  var extras = $staropt$star$8 !== undefined ? Js_primitive.valFromOption($staropt$star$8) : undefined;
  var extensions = $staropt$star$9 !== undefined ? Js_primitive.valFromOption($staropt$star$9) : undefined;
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

function buildPrimitive(attributes, $staropt$star, $staropt$star$1, $staropt$star$2, _) {
  var indices = $staropt$star !== undefined ? Js_primitive.valFromOption($staropt$star) : undefined;
  var material = $staropt$star$1 !== undefined ? Js_primitive.valFromOption($staropt$star$1) : undefined;
  var mode = $staropt$star$2 !== undefined ? Js_primitive.valFromOption($staropt$star$2) : 4;
  return /* record */[
          /* attributes */attributes,
          /* indices */indices,
          /* material */material,
          /* mode */mode
        ];
}

function buildGLTFJson($staropt$star, $staropt$star$1, $staropt$star$2, $staropt$star$3, $staropt$star$4, $staropt$star$5, $staropt$star$6, $staropt$star$7, $staropt$star$8, $staropt$star$9, $staropt$star$10, $staropt$star$11, $staropt$star$12, $staropt$star$13, $staropt$star$14, $staropt$star$15, $staropt$star$16, $staropt$star$17, $staropt$star$18, _) {
  var extensions = $staropt$star !== undefined ? $staropt$star : "\n            {}\n            ";
  var extensionsUsed = $staropt$star$1 !== undefined ? $staropt$star$1 : "\n                []\n                ";
  var asset = $staropt$star$2 !== undefined ? $staropt$star$2 : " {\n        \"version\": \"2.0\"\n    }";
  var scene = $staropt$star$3 !== undefined ? $staropt$star$3 : " 0";
  var scenes = $staropt$star$4 !== undefined ? $staropt$star$4 : "  [\n        {\n        \"nodes\": [0]\n    }\n    ]";
  var cameras = $staropt$star$5 !== undefined ? $staropt$star$5 : "\n        []";
  var basicCameraViews = $staropt$star$6 !== undefined ? $staropt$star$6 : "\n        []";
  var meshRenderers = $staropt$star$7 !== undefined ? $staropt$star$7 : "[]";
  var basicMaterials = $staropt$star$8 !== undefined ? $staropt$star$8 : "[]";
  var arcballCameraControllers = $staropt$star$9 !== undefined ? $staropt$star$9 : "\n        []";
  var nodes = $staropt$star$10 !== undefined ? $staropt$star$10 : " [\n        {\n            \"matrix\": [\n                1.0,\n                0.0,\n                0.0,\n                0.0,\n                0.0,\n                1.0,\n                0.0,\n                0.0,\n                0.0,\n                0.0,\n                1.0,\n                0.0,\n                10.0,\n                20.0,\n                30.0,\n                1.0\n            ],\n            \"mesh\": 0\n        }\n    ]";
  var meshes = $staropt$star$11 !== undefined ? $staropt$star$11 : " [\n        {\"primitives\": [\n        {\n            \"attributes\": {\n                \"NORMAL\": 1,\n                \"POSITION\": 2,\n                \"TEXCOORD_0\": 3\n            },\n            \"indices\": 0,\n            \"material\": 0\n        }\n    ]}\n    ]";
  var accessors = $staropt$star$12 !== undefined ? $staropt$star$12 : " [\n        {\n            \"bufferView\": 0,\n            \"byteOffset\": 0,\n            \"componentType\": 5123,\n            \"count\": 36,\n            \"max\": [\n                23\n            ],\n            \"min\": [\n                0\n            ],\n            \"type\": \"SCALAR\"\n        },\n        {\n            \"bufferView\": 1,\n            \"byteOffset\": 0,\n            \"componentType\": 5126,\n            \"count\": 24,\n            \"max\": [\n                1.0,\n                1.0,\n                1.0\n            ],\n            \"min\": [\n                -1.0,\n                -1.0,\n                -1.0\n            ],\n            \"type\": \"VEC3\"\n        },\n        {\n            \"bufferView\": 1,\n            \"byteOffset\": 288,\n            \"componentType\": 5126,\n            \"count\": 24,\n            \"max\": [\n                0.5,\n                0.5,\n                0.5\n            ],\n            \"min\": [\n                -0.5,\n                -0.5,\n                -0.5\n            ],\n            \"type\": \"VEC3\"\n        },\n        {\n            \"bufferView\": 2,\n            \"byteOffset\": 0,\n            \"componentType\": 5126,\n            \"count\": 24,\n            \"max\": [\n                6.0,\n                1.0\n            ],\n            \"min\": [\n                0.0,\n                0.0\n            ],\n            \"type\": \"VEC2\"\n        }\n    ]";
  var materials = $staropt$star$13 !== undefined ? $staropt$star$13 : " [\n             {\n                 \"pbrMetallicRoughness\": {\n                     \"baseColorTexture\": {\n                         \"index\": 0\n                     },\n                     \"metallicFactor\": 0.0\n                 },\n                 \"name\": \"material\"\n             }\n         ]";
  var textures = $staropt$star$14 !== undefined ? $staropt$star$14 : "  [\n             {\n                 \"sampler\": 0,\n                 \"source\": 0\n             }\n         ]";
  var images = $staropt$star$15 !== undefined ? $staropt$star$15 : "  [\n         {\"name\": \"CesiumLogoFlat.png\", \"mimeType\": \"image/png\", \"bufferView\": 3}\n             ]";
  var samplers = $staropt$star$16 !== undefined ? $staropt$star$16 : "  [\n             {\n                 \"magFilter\": 9729,\n                 \"minFilter\": 9986,\n                 \"wrapS\": 10497,\n                 \"wrapT\": 10497\n             }\n         ]";
  var bufferViews = $staropt$star$17 !== undefined ? $staropt$star$17 : "  [\n        {\n            \"buffer\": 0,\n            \"byteOffset\": 768,\n            \"byteLength\": 72,\n            \"target\": 34963\n        },\n        {\n            \"buffer\": 0,\n            \"byteOffset\": 0,\n            \"byteLength\": 576,\n            \"byteStride\": 12,\n            \"target\": 34962\n        },\n        {\n            \"buffer\": 0,\n            \"byteOffset\": 576,\n            \"byteLength\": 192,\n            \"byteStride\": 8,\n            \"target\": 34962\n        },\n        {\"buffer\":0,\"byteLength\":23516,\"byteOffset\":840}\n    ]";
  var buffers = $staropt$star$18 !== undefined ? $staropt$star$18 : " [\n        {\n            \"byteLength\": 24360\n        }\n            ]";
  return "\n{\n    \"asset\": " + (String(asset) + (",\n    \"scene\": " + (String(scene) + (",\n    \"scenes\": " + (String(scenes) + (",\n    \"cameras\": " + (String(cameras) + (",\n    \"nodes\": " + (String(nodes) + (",\n    \"meshes\": " + (String(meshes) + (",\n    \"accessors\": " + (String(accessors) + (",\n    \"materials\": " + (String(materials) + (",\n    \"bufferViews\": " + (String(bufferViews) + (",\n    \"buffers\": " + (String(buffers) + (",\n    \"textures\": " + (String(textures) + (",\n    \"samplers\": " + (String(samplers) + (",\n    \"images\": " + (String(images) + (",\n    \"extensions\":" + (String(extensions) + (",\n    \"extensionsUsed\": " + (String(extensionsUsed) + (",\n    \"extras\": {\n        \"basicCameraViews\": " + (String(basicCameraViews) + (",\n        \"meshRenderers\": " + (String(meshRenderers) + (",\n        \"basicMaterials\": " + (String(basicMaterials) + (",\n        \"arcballCameraControllers\": " + (String(arcballCameraControllers) + "\n    }\n}\n        ")))))))))))))))))))))))))))))))))))));
}

function buildGLTFJsonOfSingleNode() {
  return buildGLTFJson(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
}

function buildGLTFJsonOfLight() {
  return buildGLTFJson("\n        {\n            \"KHR_lights\": {\n                \"lights\": [\n                    {\n                        \"color\": [0.5, 0.5, 1.0],\n                        \"type\": \"directional\"\n                    },\n                    {\n                        \"intensity\": 2.5,\n\"linearAttenuation\": 1.5,\n\"range\": 55.5,\n\n                        \"type\": \"point\"\n                    },\n                    {\n                        \"color\": [1.0, 0.5, 1.0],\n                        \"type\": \"ambient\"\n                    }\n                ]\n            }\n        }\n        ", "\n        [\"KHR_lights\"]\n        ", undefined, "0", "  [\n        {\n        \"nodes\": [0],\n        \"extensions\": {\n            \"KHR_lights\" : {\n                \"light\" : 2\n            }\n        }\n    }\n    ]", undefined, undefined, undefined, undefined, undefined, " [\n        {\n            \"children\": [\n                1,\n                2,\n                3\n            ]\n        },\n        {\n            \"mesh\": 0,\n            \"matrix\": [\n                1.0,\n                0.0,\n                0.0,\n                0.0,\n                0.0,\n                1.0,\n                0.0,\n                0.0,\n                0.0,\n                0.0,\n                1.0,\n                0.0,\n                -1.352329969406128,\n                0.4277220070362091,\n                -2.98022992950564e-8,\n                1.0\n            ]\n        },\n        {\n            \"matrix\": [\n                1.0,\n                0.0,\n                0.0,\n                0.0,\n                0.0,\n                1.0,\n                0.0,\n                0.0,\n                0.0,\n                0.0,\n                1.0,\n                0.0,\n                10.5,\n                0.4277220070362091,\n                20.1,\n                1.0\n            ],\n            \"extensions\": {\n                \"KHR_lights\" : {\n                    \"light\" : 0\n                }\n            }\n        },\n        {\n            \"mesh\": 0,\n            \"matrix\": [\n                1.0,\n                0.0,\n                0.0,\n                0.0,\n                0.0,\n                1.0,\n                0.0,\n                3.0,\n                0.0,\n                0.0,\n                2.0,\n                0.0,\n                2.5,\n                0.0,\n                -2.9,\n                1.0\n            ],\n            \"extensions\": {\n                \"KHR_lights\" : {\n                    \"light\" : 1\n                }\n            }\n        }\n    ]", undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
}

function buildGLTFJsonOfIMGUI(customData, imguiFunc) {
  return buildGLTFJson(undefined, undefined, undefined, "0", "  [\n        {\n        \"nodes\": [0],\n        \"extras\": {\n            \"imgui\": {\n                \"customData\": \"" + (String(customData) + ("\",\n                \"imguiFunc\": \"" + (String(imguiFunc) + "\"\n            }\n        }\n    }\n    ]"))), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
}

function buildGLTFJsonOfMultiPrimitives() {
  return buildGLTFJson(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, " [\n        {\n            \"mesh\": 0,\n            \"children\": [\n                2,\n                1\n            ]\n        },\n        {\n            \"mesh\": 1,\n            \"matrix\": [\n                1.0,\n                0.0,\n                0.0,\n                0.0,\n                0.0,\n                1.0,\n                0.0,\n                0.0,\n                0.0,\n                0.0,\n                1.0,\n                0.0,\n                10.0,\n                30.0,\n                50.0,\n                1.0\n            ]\n        },\n        {\n            \"mesh\": 0,\n            \"children\": [\n                1\n            ],\n            \"matrix\": [\n                1.0,\n                0.0,\n                0.0,\n                0.0,\n                0.0,\n                1.0,\n                0.0,\n                0.0,\n                0.0,\n                0.0,\n                1.0,\n                0.0,\n                1.0,\n                2.0,\n                3.0,\n                1.0\n            ]\n        }\n    ]", "\n[\n        {\n            \"primitives\": [\n                {\n                    \"attributes\": {\n                        \"POSITION\": 1\n                    },\n                    \"indices\": 0,\n                    \"mode\": 4,\n                    \"material\": 0\n                },\n                {\n                    \"attributes\": {\n                        \"POSITION\": 2\n                    },\n                    \"indices\": 4,\n                    \"mode\": 4,\n                    \"material\": 0\n                }\n            ]\n        },\n        {\n            \"primitives\": [\n                {\n                    \"attributes\": {\n                        \"POSITION\": 3\n                    },\n                    \"indices\": 5,\n                    \"mode\": 4,\n                    \"material\": 0\n                }\n            ]\n        }\n    ]\n        ", " [\n        {\n            \"bufferView\": 0,\n            \"byteOffset\": 0,\n            \"componentType\": 5123,\n            \"count\": 36,\n            \"max\": [\n                23\n            ],\n            \"min\": [\n                0\n            ],\n            \"type\": \"SCALAR\"\n        },\n        {\n            \"bufferView\": 1,\n            \"byteOffset\": 0,\n            \"componentType\": 5126,\n            \"count\": 24,\n            \"max\": [\n                1.0,\n                1.0,\n                1.0\n            ],\n            \"min\": [\n                -1.0,\n                -1.0,\n                -1.0\n            ],\n            \"type\": \"VEC3\"\n        },\n        {\n            \"bufferView\": 1,\n            \"byteOffset\": 288,\n            \"componentType\": 5126,\n            \"count\": 24,\n            \"max\": [\n                0.5,\n                0.5,\n                0.5\n            ],\n            \"min\": [\n                -0.5,\n                -0.5,\n                -0.5\n            ],\n            \"type\": \"VEC3\"\n        },\n        {\n            \"bufferView\": 2,\n            \"byteOffset\": 0,\n            \"componentType\": 5126,\n            \"count\": 24,\n            \"max\": [\n                6.0,\n                1.0\n            ],\n            \"min\": [\n                0.0,\n                0.0\n            ],\n            \"type\": \"VEC2\"\n        },\n        {\n            \"bufferView\": 0,\n            \"byteOffset\": 72,\n            \"componentType\": 5123,\n            \"count\": 36,\n            \"type\": \"SCALAR\"\n        },\n        {\n            \"bufferView\": 0,\n            \"byteOffset\": 144,\n            \"componentType\": 5123,\n            \"count\": 36,\n            \"type\": \"SCALAR\"\n        }\n    ]", undefined, undefined, undefined, undefined, "  [\n        {\n            \"buffer\": 0,\n            \"byteOffset\": 768,\n            \"byteLength\": 216,\n            \"target\": 34963\n        },\n        {\n            \"buffer\": 0,\n            \"byteOffset\": 0,\n            \"byteLength\": 576,\n            \"byteStride\": 12,\n            \"target\": 34962\n        },\n        {\n            \"buffer\": 0,\n            \"byteOffset\": 576,\n            \"byteLength\": 192,\n            \"byteStride\": 8,\n            \"target\": 34962\n        },\n        {\"buffer\":0,\"byteLength\":23516,\"byteOffset\":840}\n    ]", undefined, /* () */0);
}

function buildGLTFJsonOfMultiPrimitivesWithName() {
  return buildGLTFJson(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, " [\n        {\n            \"mesh\": 0,\n            \"children\": [\n                3,\n                2,\n                1\n            ]\n        },\n        {\n            \"mesh\": 1,\n            \"matrix\": [\n                1.0,\n                0.0,\n                0.0,\n                0.0,\n                0.0,\n                1.0,\n                0.0,\n                0.0,\n                0.0,\n                0.0,\n                1.0,\n                0.0,\n                10.0,\n                30.0,\n                50.0,\n                1.0\n            ],\n            \"name\": \"node1\"\n        },\n        {\n            \"mesh\": 0,\n            \"children\": [\n                1\n            ],\n            \"matrix\": [\n                1.0,\n                0.0,\n                0.0,\n                0.0,\n                0.0,\n                1.0,\n                0.0,\n                0.0,\n                0.0,\n                0.0,\n                1.0,\n                0.0,\n                1.0,\n                2.0,\n                3.0,\n                1.0\n            ],\n            \"name\": \"node2\"\n        },\n        {\n            \"mesh\": 2\n        }\n    ]", "\n[\n        {\n            \"primitives\": [\n                {\n                    \"attributes\": {\n                        \"POSITION\": 2\n                    },\n                    \"indices\": 0,\n                    \"mode\": 4,\n                    \"material\": 0\n                },\n                {\n                    \"attributes\": {\n                        \"POSITION\": 6\n                    },\n                    \"indices\": 4,\n                    \"mode\": 4,\n                    \"material\": 1\n                }\n            ],\n            \"name\": \"mesh0\"\n        },\n        {\n            \"primitives\": [\n                {\n                    \"attributes\": {\n                        \"POSITION\": 9\n                    },\n                    \"indices\": 7,\n                    \"mode\": 4,\n                    \"material\": 2\n                }\n            ]\n        },\n        {\n            \"primitives\": [\n                {\n                    \"attributes\": {\n                        \"POSITION\": 10\n                    },\n                    \"indices\": 8,\n                    \"mode\": 4,\n                    \"material\": 2\n                },\n                {\n                    \"attributes\": {\n                        \"POSITION\": 6\n                    },\n                    \"indices\": 4,\n                    \"mode\": 4,\n                    \"material\": 1\n                }\n            ]\n        }\n    ]\n        ", undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
}

function buildGLTFJsonOfCamera() {
  return buildGLTFJson(undefined, undefined, undefined, undefined, undefined, "\n[\n        {\n            \"perspective\": {\n                \"yfov\": 0.6,\n                \"znear\": 1.0\n            },\n            \"type\": \"perspective\"\n        },\n        {\n            \"orthographic\": {\n                \"xmag\": 10.0,\n                \"ymag\": 20.5,\n                \"zfar\": 10000.0,\n                \"znear\": 1.0\n            },\n            \"type\": \"orthographic\"\n        },\n        {\n            \"perspective\": {\n                \"aspectRatio\": 2.0,\n                \"yfov\": 0.5,\n                \"zfar\": 1000.0,\n                \"znear\": 2.0\n            },\n            \"type\": \"perspective\"\n        }\n    ]\n        ", undefined, undefined, undefined, undefined, " [\n        {\n            \"mesh\": 0,\n            \"camera\": 2,\n            \"children\": [\n                1, 2\n            ],\n            \"translation\": [\n                1.0,\n                3.0,\n                5.0\n            ]\n        },\n        {\n            \"mesh\": 0,\n            \"camera\": 0,\n            \"translation\": [\n                10.0,\n                30.0,\n                50.0\n            ]\n        },\n        {\n            \"mesh\": 0,\n            \"translation\": [\n                -10.0,\n                0.0,\n                0.0\n            ]\n        }\n    ]", undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
}

function buildGLTFJsonOfBasicCameraView() {
  return buildGLTFJson(undefined, undefined, undefined, undefined, undefined, "\n[\n        {\n            \"perspective\": {\n                \"yfov\": 0.6,\n                \"znear\": 1.0\n            },\n            \"type\": \"perspective\"\n        },\n        {\n            \"orthographic\": {\n                \"xmag\": 10.0,\n                \"ymag\": 20.5,\n                \"zfar\": 10000.0,\n                \"znear\": 1.0\n            },\n            \"type\": \"orthographic\"\n        },\n        {\n            \"perspective\": {\n                \"aspectRatio\": 2.0,\n                \"yfov\": 0.5,\n                \"zfar\": 1000.0,\n                \"znear\": 2.0\n            },\n            \"type\": \"perspective\"\n        }\n    ]\n        ", "  [\n        {\n            \"isActive\": false\n        },\n        {\n            \"isActive\": true\n        },\n        {\n            \"isActive\": false\n        }\n    ]", undefined, undefined, undefined, " [\n        {\n            \"mesh\": 0,\n            \"camera\": 2,\n            \"children\": [\n                1, 2\n            ],\n            \"extras\":{\n                \"basicCameraView\": 1\n            }\n        },\n        {\n            \"mesh\": 0,\n            \"camera\": 0,\n            \"extras\":{\n                \"basicCameraView\": 0\n            }\n        },\n        {\n            \"mesh\": 0,\n            \"camera\": 1,\n            \"extras\":{\n                \"basicCameraView\": 2\n            }\n        }\n    ]", undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
}

function buildGLTFJsonOfArcballCameraController($staropt$star, _) {
  var isBindEvent = $staropt$star !== undefined ? $staropt$star : true;
  var isBindEvent$1 = isBindEvent ? "true" : "false";
  return buildGLTFJson(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, "\n[\n        {\n            \"distance\":1.5,\n            \"minDistance\":1.0,\n            \"phi\":0.8,\n            \"theta\":0.6,\n            \"thetaMargin\":1.5,\n            \"target\":[0.0, 0.5, 0.1],\n            \"moveSpeedX\":2.1,\n            \"moveSpeedY\":3.1,\n            \"rotateSpeed\":0.3,\n            \"wheelSpeed\":0.9,\n            \"isBindEvent\": " + (String(isBindEvent$1) + "\n        }\n    ]\n        "), " [\n        {\n            \"mesh\": 0,\n            \"extras\": {\n                \"cameraController\": 0\n            }\n        }\n    ]", undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
}

function buildGLTFJsonOfMeshRenderer() {
  return buildGLTFJson(undefined, undefined, undefined, undefined, undefined, undefined, undefined, "\n[\n        {\n            \"drawMode\": 1\n        },\n        {\n            \"drawMode\": 3\n        }\n    ]\n        ", undefined, undefined, " [\n        {\n            \"mesh\": 0,\n            \"extras\": {\n                \"meshRenderer\": 1\n            }\n        }\n    ]", undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
}

function buildGLTFJsonOfBasicMaterial($staropt$star, $staropt$star$1, _) {
  var colorFactor = $staropt$star !== undefined ? $staropt$star : /* array */[
      0,
      0,
      1,
      1
    ];
  var name = $staropt$star$1 !== undefined ? $staropt$star$1 : "basicMaterial";
  return buildGLTFJson(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, "\n[\n        {\n            \"colorFactor\": [" + (String(colorFactor) + ("],\n            \"name\": \"" + (String(name) + "\"\n        }\n    ]\n        "))), undefined, " [\n        {\n            \"mesh\": 0,\n            \"extras\": {\n                \"basicMaterial\": 0\n            }\n        }\n    ]", undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
}

function buildGLTFJsonOfLightMaterial() {
  return buildGLTFJson(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, " [\n        {\n            \"mesh\": 0,\n            \"extras\": {\n                \"lightMaterial\": 1\n            }\n        }\n    ]", " [\n        {\"primitives\": [\n        {\n            \"attributes\": {\n                \"POSITION\": 2\n            },\n            \"indices\": 0,\n            \"material\": 0\n        }\n    ]}\n    ]", undefined, " [\n        {\n            \"pbrMetallicRoughness\": {\n                \"baseColorFactor\": [0.5, 1.0, 1.0, 1.0],\n                \"metallicFactor\": 0.0\n            },\n            \"name\": \"lightMaterial_0\"\n        },\n        {\n            \"pbrMetallicRoughness\": {\n                \"baseColorFactor\": [0.7, 1.0, 1.0, 1.0],\n                \"metallicFactor\": 0.0\n            },\n            \"name\": \"lightMaterial_1\"\n        }\n    ]", undefined, undefined, undefined, undefined, undefined, /* () */0);
}

function buildGLTFJsonOfBasicMaterialAndLightMaterial() {
  return buildGLTFJson(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, "\n[\n        {\n            \"colorFactor\": [0.5, 1.0, 0.2, 0.0],\n            \"name\": \"basicMaterial_0\"\n        }\n    ]\n        ", undefined, " [\n        {\n\n            \"children\": [\n                1, 2\n            ],\n            \"extras\": {\n                \"basicMaterial\": 0\n            }\n        },\n{\n            \"mesh\": 0,\n            \"extras\": {\n                \"lightMaterial\": 1\n            }\n        },\n\n{\n            \"mesh\": 0\n        }\n    ]", " [\n        {\"primitives\": [\n        {\n            \"attributes\": {\n                \"POSITION\": 2\n            },\n            \"indices\": 0,\n            \"material\": 0\n        }\n    ]}\n    ]", undefined, " [\n        {\n            \"pbrMetallicRoughness\": {\n                \"baseColorFactor\": [0.5, 1.0, 1.0, 1.0],\n                \"metallicFactor\": 0.0\n            },\n            \"name\": \"lightMaterial_0\"\n        },\n        {\n            \"pbrMetallicRoughness\": {\n                \"baseColorFactor\": [0.7, 1.0, 1.0, 1.0],\n                \"metallicFactor\": 0.0\n            },\n            \"name\": \"lightMaterial_1\"\n        }\n    ]", undefined, undefined, undefined, undefined, undefined, /* () */0);
}

function buildGLTFJsonOfTransform() {
  return buildGLTFJson(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, " [\n        {\n            \"children\": [\n                1\n            ],\n            \"translation\": [\n                11.0, 0.5, -10.5\n            ]\n        },\n        {\n            \"matrix\": [\n                1.0,\n                0.0,\n                0.0,\n                0.0,\n                0.0,\n                1.0,\n                0.0,\n                0.0,\n                0.0,\n                0.0,\n                1.0,\n                0.0,\n                10.0,\n                30.0,\n                50.0,\n                1.0\n            ]\n        },\n        {\n            \"rotation\": [\n                1.0, 0.1, 1.5, 0.5\n            ],\n            \"scale\": [\n                2.5, 2.5, 3.0\n            ]\n        }\n    ]", undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
}

function buildGLTFJsonOfCameras() {
  return "\n    {\n  \"scenes\" : [\n    {\n      \"nodes\" : [ 0, 1, 2 ]\n    }\n  ],\n  \"nodes\" : [\n    {\n      \"rotation\" : [ -0.383, 0.0, 0.0, 0.92375 ],\n      \"mesh\" : 0\n    },\n    {\n      \"translation\" : [ 0.5, 0.5, 3.0 ],\n      \"camera\" : 0\n    },\n    {\n      \"translation\" : [ 0.5, 0.5, 3.0 ],\n      \"camera\" : 1\n    }\n  ],\n\n  \"cameras\" : [\n    {\n      \"type\": \"perspective\",\n      \"perspective\": {\n        \"aspectRatio\": 1.0,\n        \"yfov\": 0.7,\n        \"zfar\": 100,\n        \"znear\": 0.01\n      }\n    },\n    {\n      \"type\": \"orthographic\",\n      \"orthographic\": {\n        \"xmag\": 1.0,\n        \"ymag\": 1.0,\n        \"zfar\": 100,\n        \"znear\": 0.01\n      }\n    }\n  ],\n\n  \"meshes\" : [\n    {\n      \"primitives\" : [ {\n        \"attributes\" : {\n          \"POSITION\" : 1\n        },\n        \"indices\" : 0\n      } ]\n    }\n  ],\n\n  \"buffers\" : [\n    {\n      \"uri\" : \"data:application/octet-stream;base64,AAABAAIAAQADAAIAAAAAAAAAAAAAAAAAAACAPwAAAAAAAAAAAAAAAAAAgD8AAAAAAACAPwAAgD8AAAAA\",\n      \"byteLength\" : 60\n    }\n  ],\n  \"bufferViews\" : [\n    {\n      \"buffer\" : 0,\n      \"byteOffset\" : 0,\n      \"byteLength\" : 12,\n      \"target\" : 34963\n    },\n    {\n      \"buffer\" : 0,\n      \"byteOffset\" : 12,\n      \"byteLength\" : 48,\n      \"target\" : 34962\n    }\n  ],\n  \"accessors\" : [\n    {\n      \"bufferView\" : 0,\n      \"byteOffset\" : 0,\n      \"componentType\" : 5123,\n      \"count\" : 6,\n      \"type\" : \"SCALAR\",\n      \"max\" : [ 3 ],\n      \"min\" : [ 0 ]\n    },\n    {\n      \"bufferView\" : 1,\n      \"byteOffset\" : 0,\n      \"componentType\" : 5126,\n      \"count\" : 4,\n      \"type\" : \"VEC3\",\n      \"max\" : [ 1.0, 1.0, 0.0 ],\n      \"min\" : [ 0.0, 0.0, 0.0 ]\n    }\n  ],\n\n  \"asset\" : {\n    \"version\" : \"2.0\"\n  }\n}\n    ";
}

function buildGLTFJsonOfTexCoord1() {
  return buildGLTFJson(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, " [\n        {\"primitives\": [\n        {\n            \"attributes\": {\n                \"NORMAL\": 1,\n                \"POSITION\": 2,\n                \"TEXCOORD_0\": 3,\n                \"TEXCOORD_1\": 3\n            },\n            \"indices\": 0,\n            \"material\": 0\n        }\n    ]}\n    ]", undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
}

exports.testResult = testResult;
exports.testGLTFResultByGLTF = testGLTFResultByGLTF;
exports.getDefaultDiffuseColor = getDefaultDiffuseColor;
exports.buildComponentIndexData = buildComponentIndexData;
exports.buildNode = buildNode;
exports.buildPrimitive = buildPrimitive;
exports.buildGLTFJson = buildGLTFJson;
exports.buildGLTFJsonOfSingleNode = buildGLTFJsonOfSingleNode;
exports.buildGLTFJsonOfLight = buildGLTFJsonOfLight;
exports.buildGLTFJsonOfIMGUI = buildGLTFJsonOfIMGUI;
exports.buildGLTFJsonOfMultiPrimitives = buildGLTFJsonOfMultiPrimitives;
exports.buildGLTFJsonOfMultiPrimitivesWithName = buildGLTFJsonOfMultiPrimitivesWithName;
exports.buildGLTFJsonOfCamera = buildGLTFJsonOfCamera;
exports.buildGLTFJsonOfBasicCameraView = buildGLTFJsonOfBasicCameraView;
exports.buildGLTFJsonOfArcballCameraController = buildGLTFJsonOfArcballCameraController;
exports.buildGLTFJsonOfMeshRenderer = buildGLTFJsonOfMeshRenderer;
exports.buildGLTFJsonOfBasicMaterial = buildGLTFJsonOfBasicMaterial;
exports.buildGLTFJsonOfLightMaterial = buildGLTFJsonOfLightMaterial;
exports.buildGLTFJsonOfBasicMaterialAndLightMaterial = buildGLTFJsonOfBasicMaterialAndLightMaterial;
exports.buildGLTFJsonOfTransform = buildGLTFJsonOfTransform;
exports.buildGLTFJsonOfCameras = buildGLTFJsonOfCameras;
exports.buildGLTFJsonOfTexCoord1 = buildGLTFJsonOfTexCoord1;
/* fs Not a pure module */
