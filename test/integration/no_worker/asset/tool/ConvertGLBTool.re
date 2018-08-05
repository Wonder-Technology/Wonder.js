let testResult = (sandbox, glbFilePath, testFunc) => {
  GLBTool.prepare(sandbox);

  let buffer = NodeExtend.readFileBufferSync(glbFilePath);

  let wdb = ConverterAPI.convertGLBToWDB(buffer##buffer);

  let (wdFileContent, binBuffer) =
    BinaryUtils.decode(wdb, AssembleWDBSystem._checkWDB);

  testFunc((wdFileContent |> Js.Json.parseExn |> Obj.magic, binBuffer));
};

let testGLTFResultByGLTF =
    (
      ~sandbox,
      ~embeddedGLTFJsonStr,
      ~testFunc,
      ~state,
      ~binBuffer=GLBTool.buildBinBuffer(),
      (),
    ) => {
  open Js.Promise;

  let result = ref(Obj.magic(1));

  GLBTool.prepare(sandbox);

  let wdb =
    ConvertGLBSystem.convertGLBData((
      embeddedGLTFJsonStr |> Js.Json.parseExn,
      binBuffer,
    ));

  let (wdFileContent, binBuffer) =
    BinaryUtils.decode(wdb, AssembleWDBSystem._checkWDB);

  testFunc(wdFileContent |> Js.Json.parseExn |> Obj.magic);
};

let getDefaultDiffuseColor = () => [|1., 1., 1.|];

let buildComponentIndexData =
    (gameObjectIndices, componentIndices)
    : WDType.componentGameObjectIndexData => {
  gameObjectIndices,
  componentIndices,
};

let buildNode =
    (
      ~name=None,
      ~camera=None,
      ~mesh=None,
      ~children=None,
      ~matrix=None,
      ~translation=None,
      ~rotation=None,
      ~scale=None,
      ~extras=None,
      ~extensions=None,
      (),
    )
    : GLTFType.node => {
  name,
  camera,
  mesh,
  children,
  matrix,
  translation,
  rotation,
  scale,
  extras,
  extensions,
};

let buildPrimitive =
    (~attributes, ~indices=None, ~material=None, ~mode=Some(4), ())
    : GLTFType.primitive => {
  attributes,
  indices,
  material,
  mode,
};

let buildGLTFJson =
    (
      ~extensions={|
            {}
            |},
      ~extensionsUsed={|
                []
                |},
      ~asset={| {
        "version": "2.0"
    }|},
      ~scene={| 0|},
      ~scenes={|  [
        {
        "nodes": [0]
    }
    ]|},
      ~cameras={|
        []|},
      ~basicCameraViews={|
        []|},
      ~meshRenderers={|[]|},
      ~basicMaterials={|[]|},
      ~arcballCameraControllers={|
        []|},
      ~nodes={| [
        {
            "matrix": [
                1.0,
                0.0,
                0.0,
                0.0,
                0.0,
                1.0,
                0.0,
                0.0,
                0.0,
                0.0,
                1.0,
                0.0,
                10.0,
                20.0,
                30.0,
                1.0
            ],
            "mesh": 0
        }
    ]|},
      ~meshes={| [
        {"primitives": [
        {
            "attributes": {
                "NORMAL": 1,
                "POSITION": 2,
                "TEXCOORD_0": 3
            },
            "indices": 0,
            "material": 0
        }
    ]}
    ]|},
      ~accessors={| [
        {
            "bufferView": 0,
            "byteOffset": 0,
            "componentType": 5123,
            "count": 36,
            "max": [
                23
            ],
            "min": [
                0
            ],
            "type": "SCALAR"
        },
        {
            "bufferView": 1,
            "byteOffset": 0,
            "componentType": 5126,
            "count": 24,
            "max": [
                1.0,
                1.0,
                1.0
            ],
            "min": [
                -1.0,
                -1.0,
                -1.0
            ],
            "type": "VEC3"
        },
        {
            "bufferView": 1,
            "byteOffset": 288,
            "componentType": 5126,
            "count": 24,
            "max": [
                0.5,
                0.5,
                0.5
            ],
            "min": [
                -0.5,
                -0.5,
                -0.5
            ],
            "type": "VEC3"
        },
        {
            "bufferView": 2,
            "byteOffset": 0,
            "componentType": 5126,
            "count": 24,
            "max": [
                6.0,
                1.0
            ],
            "min": [
                0.0,
                0.0
            ],
            "type": "VEC2"
        }
    ]|},
      /* ~materials={| [
             {
                 "pbrMetallicRoughness": {
                     "baseColorTexture": {
                         "index": 0
                     },
                     "metallicFactor": 0.0
                 },
                 "name": "material"
             }
         ]|}, */
      ~materials={| [
        {
            "pbrMetallicRoughness": {
                "baseColorFactor": [0.5, 1.0, 1.0, 1.0],
                "metallicFactor": 0.0
            },
            "name": "material"
        }
    ]|},
      /* ~textures={|  [
             {
                 "sampler": 0,
                 "source": 0
             }
         ]|}, */
      /* ~images={|  [
         {
             "uri":"|}
               ++ buildFakeImageOfSingleNode()
               ++ {|"
             }
             ]|}, */
      /* ~images={|  [
         {
             "bufferView":
             }
             ]|}, */
      /* ~samplers={|  [
             {
                 "magFilter": 9729,
                 "minFilter": 9986,
                 "wrapS": 10497,
                 "wrapT": 10497
             }
         ]|}, */
      ~bufferViews={|  [
        {
            "buffer": 0,
            "byteOffset": 768,
            "byteLength": 72,
            "target": 34963
        },
        {
            "buffer": 0,
            "byteOffset": 0,
            "byteLength": 576,
            "byteStride": 12,
            "target": 34962
        },
        {
            "buffer": 0,
            "byteOffset": 576,
            "byteLength": 192,
            "byteStride": 8,
            "target": 34962
        }
    ]|},
      ~buffers={| [
        {
            "byteLength": 840
        }
            ]|},
      (),
    ) => {j|
{
    "asset": $asset,
    "scene": $scene,
    "scenes": $scenes,
    "cameras": $cameras,
    "nodes": $nodes,
    "meshes": $meshes,
    "accessors": $accessors,
    "materials": $materials,
    "bufferViews": $bufferViews,
    "buffers": $buffers,
    "extensions":$extensions,
    "extensionsUsed": $extensionsUsed,
    "extras": {
        "basicCameraViews": $basicCameraViews,
        "meshRenderers": $meshRenderers,
        "basicMaterials": $basicMaterials,
        "arcballCameraControllers": $arcballCameraControllers
    }
}
        |j};

let buildGLTFJsonOfSingleNode = () => buildGLTFJson();

let buildGLTFJsonOfLight = () =>
  buildGLTFJson(
    ~scene={|0|},
    ~scenes=
      {|  [
        {
        "nodes": [0],
        "extensions": {
            "KHR_lights" : {
                "light" : 2
            }
        }
    }
    ]|},
    ~extensionsUsed={|
        ["KHR_lights"]
        |},
    ~extensions=
      {|
        {
            "KHR_lights": {
                "lights": [
                    {
                        "color": [0.5, 0.5, 1.0],
                        "type": "directional"
                    },
                    {
                        "intensity": 2.5,
"linearAttenuation": 1.5,
"range": 55.5,

                        "type": "point"
                    },
                    {
                        "color": [1.0, 0.5, 1.0],
                        "type": "ambient"
                    }
                ]
            }
        }
        |},
    ~nodes=
      {| [
        {
            "children": [
                1,
                2,
                3
            ]
        },
        {
            "mesh": 0,
            "matrix": [
                1.0,
                0.0,
                0.0,
                0.0,
                0.0,
                1.0,
                0.0,
                0.0,
                0.0,
                0.0,
                1.0,
                0.0,
                -1.352329969406128,
                0.4277220070362091,
                -2.98022992950564e-8,
                1.0
            ]
        },
        {
            "matrix": [
                1.0,
                0.0,
                0.0,
                0.0,
                0.0,
                1.0,
                0.0,
                0.0,
                0.0,
                0.0,
                1.0,
                0.0,
                10.5,
                0.4277220070362091,
                20.1,
                1.0
            ],
            "extensions": {
                "KHR_lights" : {
                    "light" : 0
                }
            }
        },
        {
            "mesh": 0,
            "matrix": [
                1.0,
                0.0,
                0.0,
                0.0,
                0.0,
                1.0,
                0.0,
                3.0,
                0.0,
                0.0,
                2.0,
                0.0,
                2.5,
                0.0,
                -2.9,
                1.0
            ],
            "extensions": {
                "KHR_lights" : {
                    "light" : 1
                }
            }
        }
    ]|},
    (),
  );

let buildGLTFJsonOfIMGUI = (customData, imguiFunc) =>
  buildGLTFJson(
    ~scene={|0|},
    ~scenes=
      {j|  [
        {
        "nodes": [0],
        "extras": {
            "imgui": {
                "customData": "$customData",
                "imguiFunc": "$imguiFunc"
            }
        }
    }
    ]|j},
    (),
  );

let buildGLTFJsonOfMultiPrimitives = () =>
  buildGLTFJson(
    ~nodes=
      {| [
        {
            "mesh": 0,
            "children": [
                2,
                1
            ]
        },
        {
            "mesh": 1,
            "matrix": [
                1.0,
                0.0,
                0.0,
                0.0,
                0.0,
                1.0,
                0.0,
                0.0,
                0.0,
                0.0,
                1.0,
                0.0,
                10.0,
                30.0,
                50.0,
                1.0
            ]
        },
        {
            "mesh": 0,
            "children": [
                1
            ],
            "matrix": [
                1.0,
                0.0,
                0.0,
                0.0,
                0.0,
                1.0,
                0.0,
                0.0,
                0.0,
                0.0,
                1.0,
                0.0,
                1.0,
                2.0,
                3.0,
                1.0
            ]
        }
    ]|},
    ~meshes=
      {|
[
        {
            "primitives": [
                {
                    "attributes": {
                        "POSITION": 2
                    },
                    "indices": 0,
                    "mode": 4,
                    "material": 0
                },
                {
                    "attributes": {
                        "POSITION": 6
                    },
                    "indices": 4,
                    "mode": 4,
                    "material": 1
                }
            ]
        },
        {
            "primitives": [
                {
                    "attributes": {
                        "POSITION": 9
                    },
                    "indices": 7,
                    "mode": 4,
                    "material": 2
                }
            ]
        }
    ]
        |},
    (),
  );

let buildGLTFJsonOfMultiPrimitivesWithName = () =>
  buildGLTFJson(
    ~nodes=
      {| [
        {
            "mesh": 0,
            "children": [
                3,
                2,
                1
            ]
        },
        {
            "mesh": 1,
            "matrix": [
                1.0,
                0.0,
                0.0,
                0.0,
                0.0,
                1.0,
                0.0,
                0.0,
                0.0,
                0.0,
                1.0,
                0.0,
                10.0,
                30.0,
                50.0,
                1.0
            ],
            "name": "node1"
        },
        {
            "mesh": 0,
            "children": [
                1
            ],
            "matrix": [
                1.0,
                0.0,
                0.0,
                0.0,
                0.0,
                1.0,
                0.0,
                0.0,
                0.0,
                0.0,
                1.0,
                0.0,
                1.0,
                2.0,
                3.0,
                1.0
            ],
            "name": "node2"
        },
        {
            "mesh": 2
        }
    ]|},
    ~meshes=
      {|
[
        {
            "primitives": [
                {
                    "attributes": {
                        "POSITION": 2
                    },
                    "indices": 0,
                    "mode": 4,
                    "material": 0
                },
                {
                    "attributes": {
                        "POSITION": 6
                    },
                    "indices": 4,
                    "mode": 4,
                    "material": 1
                }
            ],
            "name": "mesh0"
        },
        {
            "primitives": [
                {
                    "attributes": {
                        "POSITION": 9
                    },
                    "indices": 7,
                    "mode": 4,
                    "material": 2
                }
            ]
        },
        {
            "primitives": [
                {
                    "attributes": {
                        "POSITION": 10
                    },
                    "indices": 8,
                    "mode": 4,
                    "material": 2
                },
                {
                    "attributes": {
                        "POSITION": 6
                    },
                    "indices": 4,
                    "mode": 4,
                    "material": 1
                }
            ]
        }
    ]
        |},
    (),
  );

let buildGLTFJsonOfCamera = () =>
  buildGLTFJson(
    ~nodes=
      {| [
        {
            "mesh": 0,
            "camera": 2,
            "children": [
                1, 2
            ]
        },
        {
            "mesh": 0,
            "camera": 0,
            "matrix": [
                1.0,
                0.0,
                0.0,
                0.0,
                0.0,
                1.0,
                0.0,
                0.0,
                0.0,
                0.0,
                1.0,
                0.0,
                10.0,
                30.0,
                50.0,
                1.0
            ]
        },
        {
            "mesh": 0
        }
    ]|},
    ~cameras=
      {|
[
        {
            "perspective": {
                "yfov": 0.6,
                "znear": 1.0
            },
            "type": "perspective"
        },
        {
            "orthographic": {
                "xmag": 10.0,
                "ymag": 20.5,
                "zfar": 10000.0,
                "znear": 1.0
            },
            "type": "orthographic"
        },
        {
            "perspective": {
                "aspectRatio": 2.0,
                "yfov": 0.5,
                "zfar": 1000.0,
                "znear": 2.0
            },
            "type": "perspective"
        }
    ]
        |},
    (),
  );

let buildGLTFJsonOfBasicCameraView = () =>
  buildGLTFJson(
    ~basicCameraViews=
      {|  [
        {
            "isActive": false
        },
        {
            "isActive": true
        },
        {
            "isActive": false
        }
    ]|},
    ~nodes=
      {| [
        {
            "mesh": 0,
            "camera": 2,
            "children": [
                1, 2
            ],
            "extras":{
                "basicCameraView": 1
            }
        },
        {
            "mesh": 0,
            "camera": 0,
            "extras":{
                "basicCameraView": 0
            }
        },
        {
            "mesh": 0,
            "camera": 1,
            "extras":{
                "basicCameraView": 2
            }
        }
    ]|},
    ~cameras=
      {|
[
        {
            "perspective": {
                "yfov": 0.6,
                "znear": 1.0
            },
            "type": "perspective"
        },
        {
            "orthographic": {
                "xmag": 10.0,
                "ymag": 20.5,
                "zfar": 10000.0,
                "znear": 1.0
            },
            "type": "orthographic"
        },
        {
            "perspective": {
                "aspectRatio": 2.0,
                "yfov": 0.5,
                "zfar": 1000.0,
                "znear": 2.0
            },
            "type": "perspective"
        }
    ]
        |},
    (),
  );

let buildGLTFJsonOfArcballCameraController = () =>
  buildGLTFJson(
    ~nodes=
      {| [
        {
            "mesh": 0,
            "extras": {
                "cameraController": 0
            }
        }
    ]|},
    ~arcballCameraControllers=
      {|
[
        {
            "distance":1.5,
            "minDistance":1.0,
            "phi":0.8,
            "theta":0.6,
            "thetaMargin":1.5,
            "target":[0.0, 0.5, 0.1],
            "moveSpeedX":2.1,
            "moveSpeedY":3.1,
            "rotateSpeed":0.3,
            "wheelSpeed":0.9,
            "isBindEvent": true
        }
    ]
        |},
    (),
  );

let buildGLTFJsonOfMeshRenderer = () =>
  buildGLTFJson(
    ~nodes=
      {| [
        {
            "mesh": 0,
            "extras": {
                "meshRenderer": 1
            }
        }
    ]|},
    ~meshRenderers=
      {j|
[
        {
            "drawMode": 1
        },
        {
            "drawMode": 3
        }
    ]
        |j},
    (),
  );

let buildGLTFJsonOfBasicMaterial =
    (~colorFactor=[|0., 0., 1., 1.|], ~name="basicMaterial", ()) =>
  buildGLTFJson(
    ~nodes=
      {| [
        {
            "mesh": 0,
            "extras": {
                "basicMaterial": 0
            }
        }
    ]|},
    ~basicMaterials=
      {j|
[
        {
            "colorFactor": [$colorFactor],
            "name": "$name"
        }
    ]
        |j},
    (),
  );

let buildGLTFJsonOfLightMaterial = () =>
  buildGLTFJson(
    ~nodes=
      {| [
        {
            "mesh": 0,
            "extras": {
                "lightMaterial": 1
            }
        }
    ]|},
    ~meshes=
      {| [
        {"primitives": [
        {
            "attributes": {
                "POSITION": 2
            },
            "indices": 0,
            "material": 0
        }
    ]}
    ]|},
    ~materials=
      {| [
        {
            "pbrMetallicRoughness": {
                "baseColorFactor": [0.5, 1.0, 1.0, 1.0],
                "metallicFactor": 0.0
            },
            "name": "lightMaterial_0"
        },
        {
            "pbrMetallicRoughness": {
                "baseColorFactor": [0.7, 1.0, 1.0, 1.0],
                "metallicFactor": 0.0
            },
            "name": "lightMaterial_1"
        }
    ]|},
    (),
  );

let buildGLTFJsonOfBasicMaterialAndLightMaterial = () =>
  buildGLTFJson(
    ~nodes=
      {| [
        {

            "children": [
                1, 2
            ],
            "extras": {
                "basicMaterial": 0
            }
        },
{
            "mesh": 0,
            "extras": {
                "lightMaterial": 1
            }
        },

{
            "mesh": 0
        }
    ]|},
    ~basicMaterials=
      {j|
[
        {
            "colorFactor": [0.5, 1.0, 0.2, 0.0],
            "name": "basicMaterial_0"
        }
    ]
        |j},
    ~meshes=
      {| [
        {"primitives": [
        {
            "attributes": {
                "POSITION": 2
            },
            "indices": 0,
            "material": 0
        }
    ]}
    ]|},
    ~materials=
      {| [
        {
            "pbrMetallicRoughness": {
                "baseColorFactor": [0.5, 1.0, 1.0, 1.0],
                "metallicFactor": 0.0
            },
            "name": "lightMaterial_0"
        },
        {
            "pbrMetallicRoughness": {
                "baseColorFactor": [0.7, 1.0, 1.0, 1.0],
                "metallicFactor": 0.0
            },
            "name": "lightMaterial_1"
        }
    ]|},
    (),
  );

let buildGLTFJsonOfTransform = () =>
  buildGLTFJson(
    ~nodes=
      {| [
        {
            "children": [
                1
            ],
            "translation": [
                11.0, 0.5, -10.5
            ]
        },
        {
            "matrix": [
                1.0,
                0.0,
                0.0,
                0.0,
                0.0,
                1.0,
                0.0,
                0.0,
                0.0,
                0.0,
                1.0,
                0.0,
                10.0,
                30.0,
                50.0,
                1.0
            ]
        },
        {
            "rotation": [
                1.0, 0.1, 1.5, 0.5
            ],
            "scale": [
                2.5, 2.5, 3.0
            ]
        }
    ]|},
    (),
  );

let buildGLTFJsonOfCameras = () => {|
    {
  "scenes" : [
    {
      "nodes" : [ 0, 1, 2 ]
    }
  ],
  "nodes" : [
    {
      "rotation" : [ -0.383, 0.0, 0.0, 0.92375 ],
      "mesh" : 0
    },
    {
      "translation" : [ 0.5, 0.5, 3.0 ],
      "camera" : 0
    },
    {
      "translation" : [ 0.5, 0.5, 3.0 ],
      "camera" : 1
    }
  ],

  "cameras" : [
    {
      "type": "perspective",
      "perspective": {
        "aspectRatio": 1.0,
        "yfov": 0.7,
        "zfar": 100,
        "znear": 0.01
      }
    },
    {
      "type": "orthographic",
      "orthographic": {
        "xmag": 1.0,
        "ymag": 1.0,
        "zfar": 100,
        "znear": 0.01
      }
    }
  ],

  "meshes" : [
    {
      "primitives" : [ {
        "attributes" : {
          "POSITION" : 1
        },
        "indices" : 0
      } ]
    }
  ],

  "buffers" : [
    {
      "uri" : "data:application/octet-stream;base64,AAABAAIAAQADAAIAAAAAAAAAAAAAAAAAAACAPwAAAAAAAAAAAAAAAAAAgD8AAAAAAACAPwAAgD8AAAAA",
      "byteLength" : 60
    }
  ],
  "bufferViews" : [
    {
      "buffer" : 0,
      "byteOffset" : 0,
      "byteLength" : 12,
      "target" : 34963
    },
    {
      "buffer" : 0,
      "byteOffset" : 12,
      "byteLength" : 48,
      "target" : 34962
    }
  ],
  "accessors" : [
    {
      "bufferView" : 0,
      "byteOffset" : 0,
      "componentType" : 5123,
      "count" : 6,
      "type" : "SCALAR",
      "max" : [ 3 ],
      "min" : [ 0 ]
    },
    {
      "bufferView" : 1,
      "byteOffset" : 0,
      "componentType" : 5126,
      "count" : 4,
      "type" : "VEC3",
      "max" : [ 1.0, 1.0, 0.0 ],
      "min" : [ 0.0, 0.0, 0.0 ]
    }
  ],

  "asset" : {
    "version" : "2.0"
  }
}
    |};