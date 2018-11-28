


var renderTestData_000 = /* commonData : record */[
  /* imagePath */"test/e2e/render/screenshot/",
  /* scriptFilePathList : :: */[
    "./test/e2e/js/AssetTool.js",
    /* :: */[
      "./test/e2e/js/ReplaceFetchTool.js",
      /* :: */[
        "./test/e2e/js/ScheduleTool.js",
        /* :: */[
          "./test/e2e/js/BasicBoxesTool.js",
          /* :: */[
            "./test/e2e/js/PositionTool.js",
            /* :: */[
              "./test/e2e/js/LightBoxesTool.js",
              /* :: */[
                "./test/e2e/js/LightTool.js",
                /* :: */[
                  "./test/e2e/js/CameraTool.js",
                  /* :: */[
                    "./test/e2e/js/InstanceBasicBoxesTool.js",
                    /* :: */[
                      "./test/e2e/js/InstanceLightBoxesTool.js",
                      /* :: */[
                        "./test/e2e/js/RedoUndoTool.js",
                        /* :: */[
                          "./test/e2e/js/RandomTool.js",
                          /* :: */[
                            "./test/e2e/js/GeometryTool.js",
                            /* :: */[
                              "./test/e2e/js/BasicMaterialTool.js",
                              /* :: */[
                                "./test/e2e/js/LightMaterialTool.js",
                                /* :: */[
                                  "./test/e2e/js/TextureTool.js",
                                  /* :: */[
                                    "./test/e2e/js/PrepareTool.js",
                                    /* :: */[
                                      "./test/e2e/js/IMGUITool.js",
                                      /* :: */[
                                        "./dist/wd.js",
                                        /* [] */0
                                      ]
                                    ]
                                  ]
                                ]
                              ]
                            ]
                          ]
                        ]
                      ]
                    ]
                  ]
                ]
              ]
            ]
          ]
        ]
      ]
    ]
  ],
  /* replaceForDebug */(function (htmlStr) {
      return htmlStr.replace((/\.\/test\/e2e\//g), "../../../../test/e2e/");
    })
];

var renderTestData_001 = /* testData : :: */[
  /* record */[
    /* name */"basic_box",
    /* bodyFuncStr */"\n                   PrepareTool.prepareForTest();\n\n                    return AssetTool.loadConfig([\"./test/e2e/render/config/setting.json\", \"./test/e2e/render/config/\"], null, function(){\n                        return initSample(wd.unsafeGetState());\n                    });\n\n                    function initSample(state) {\n                        var data = BasicBoxesTool.createBox(state);\n\n                        var state = data[0];\n                        var box = data[1];\n\n\n                        var data = BasicBoxesTool.createCamera(state);\n                        var state = data[0];\n                        var camera = data[1];\n\n\n                        var transform = wd.unsafeGetGameObjectTransformComponent(camera, state);\n\n                        var state = wd.setTransformLocalPosition(transform, [0, 10, 30], state);\n\n                        return wd.startDirector(state);\n                    }\n    ",
    /* distance */undefined,
    /* diffPercent */0.00001,
    /* threshold */undefined,
    /* scriptFilePathList */undefined,
    /* frameData : :: */[
      /* record */[/* timePath : :: */[
          16,
          /* [] */0
        ]],
      /* [] */0
    ]
  ],
  /* :: */[
    /* record */[
      /* name */"instance_basic_box",
      /* bodyFuncStr */"\n\n                      PrepareTool.prepareForTest();\n\n\n                    return AssetTool.loadConfig([\"./test/e2e/render/config/setting.json\", \"./test/e2e/render/config/\"], null, function(){\n                        return initSample(wd.unsafeGetState());\n                    });\n\n\n\n                          function initSample(state) {\n                          RandomTool.stubMathRandom(10000);\n\n                          var data = InstanceBasicBoxesTool.createBoxes(1, 100, true, state);\n                          var state = data[0];\n                          var boxes = data[1];\n\n                          var data = InstanceBasicBoxesTool.setPosition(boxes, state);\n                          var state = data[0];\n                          var boxes = data[1];\n\n                          var data = InstanceBasicBoxesTool.createCamera(state);\n                          var state = data[0];\n\n\n                          return wd.startDirector(state);\n                          }\n          ",
      /* distance */undefined,
      /* diffPercent */0.00001,
      /* threshold */undefined,
      /* scriptFilePathList */undefined,
      /* frameData : :: */[
        /* record */[/* timePath : :: */[
            16,
            /* [] */0
          ]],
        /* [] */0
      ]
    ],
    /* :: */[
      /* record */[
        /* name */"light_box",
        /* bodyFuncStr */"\n                      PrepareTool.prepareForTest();\n\n\n\n                    return AssetTool.loadConfig([\"./test/e2e/render/config/setting.json\", \"./test/e2e/render/config/\"], null, function(){\n                        return initSample(wd.unsafeGetState());\n                    });\n\n\n\n\n\n\n\n                       function initSample(state) {\n                           var data = LightBoxesTool.createBox(state);\n\n                           var state = data[0];\n                           var box = data[1];\n\n\n\n                               var state = LightTool.createLights([-10, 0, 20], [5,0,25], state);\n\n\n\n\n                           var data = LightBoxesTool.createCamera(state);\n                           var state = data[0];\n                           var camera = data[1];\n\n\n                           var transform = wd.unsafeGetGameObjectTransformComponent(camera, state);\n\n                           var state = wd.setTransformLocalPosition(transform, [0, 0, 80], state);\n\n                           return wd.startDirector(state);\n                       }\n       ",
        /* distance */undefined,
        /* diffPercent */0.00001,
        /* threshold */undefined,
        /* scriptFilePathList */undefined,
        /* frameData : :: */[
          /* record */[/* timePath : :: */[
              16,
              /* [] */0
            ]],
          /* [] */0
        ]
      ],
      /* :: */[
        /* record */[
          /* name */"instance_light_box",
          /* bodyFuncStr */"\n\n                      PrepareTool.prepareForTest();\n\n\n\n                    return AssetTool.loadConfig([\"./test/e2e/render/config/setting.json\", \"./test/e2e/render/config/\"], null, function(){\n                        return initSample(wd.unsafeGetState());\n                    });\n\n\n\n                          function initSample(state) {\n                          RandomTool.stubMathRandom(10000);\n\n                          var data = InstanceLightBoxesTool.createBoxes(1, 100, true, state);\n                          var state = data[0];\n                          var boxes = data[1];\n\n                          var data = InstanceLightBoxesTool.setPosition(boxes, state);\n                          var state = data[0];\n                          var boxes = data[1];\n\n\n\n\n\n                               var state = LightTool.createLights([-100, 0, 100], [150,0,250], state);\n\n\n\n                          var data = InstanceLightBoxesTool.createCamera(state);\n                          var state = data[0];\n\n\n                          return wd.startDirector(state);\n                          }\n          ",
          /* distance */undefined,
          /* diffPercent */0.00001,
          /* threshold */undefined,
          /* scriptFilePathList */undefined,
          /* frameData : :: */[
            /* record */[/* timePath : :: */[
                16,
                /* [] */0
              ]],
            /* [] */0
          ]
        ],
        /* :: */[
          /* record */[
            /* name */"geometry_basic_material",
            /* bodyFuncStr */"\n                   PrepareTool.prepareForTest();\n\n                    return AssetTool.loadConfig([\"./test/e2e/render/config/setting.json\", \"./test/e2e/render/config/\"], null, function(){\n                        return initSample(wd.unsafeGetState());\n                    });\n\n                    function initSample(state) {\n                        var data = GeometryTool.createTriangle(1, state);\n\n\n                        var state = data[0];\n                        var box = data[1];\n\n\n                        var data = BasicMaterialTool.createDefaultBasicMaterial(state);\n\n\n                        var state = data[0];\n                        var material = data[1];\n\n\n\n                        var state = wd.addGameObjectBasicMaterialComponent(box, material, state);\n\n\n\n                        var record = wd.createMeshRenderer(state);\n                        var state = record[0];\n                        var meshRenderer = record[1];\n                        state = wd.addGameObjectMeshRendererComponent(box, meshRenderer, state);\n\n\n                        var data = BasicBoxesTool.createCamera(state);\n                        var state = data[0];\n                        var camera = data[1];\n\n\n                        var transform = wd.unsafeGetGameObjectTransformComponent(camera, state);\n\n                        var state = wd.setTransformLocalPosition(transform, [0, 10, 30], state);\n\n                        return wd.startDirector(state);\n                    }\n    ",
            /* distance */undefined,
            /* diffPercent */0.00001,
            /* threshold */undefined,
            /* scriptFilePathList */undefined,
            /* frameData : :: */[
              /* record */[/* timePath : :: */[
                  16,
                  /* [] */0
                ]],
              /* [] */0
            ]
          ],
          /* :: */[
            /* record */[
              /* name */"geometry_light_material",
              /* bodyFuncStr */"\n                   PrepareTool.prepareForTest();\n\n                    return AssetTool.loadConfig([\"./test/e2e/render/config/setting.json\", \"./test/e2e/render/config/\"], null, function(){\n                        return initSample(wd.unsafeGetState());\n                    });\n\n                    function initSample(state) {\n                        var data = GeometryTool.createTriangle(1, state);\n\n\n                        var state = data[0];\n                        var box = data[1];\n\n\n                        var data = LightMaterialTool.createDefaultLightMaterial(state);\n\n\n                        var state = data[0];\n                        var material = data[1];\n\n\n\n                        var state = wd.addGameObjectLightMaterialComponent(box, material, state);\n\n\n                        var record = wd.createMeshRenderer(state);\n                        var state = record[0];\n                        var meshRenderer = record[1];\n                        state = wd.addGameObjectMeshRendererComponent(box, meshRenderer, state);\n\n\n\n\n                        var state = LightTool.createLights([-10, 0, 20], [10,0,25], state);\n\n\n\n\n                           var data = LightBoxesTool.createCamera(state);\n                           var state = data[0];\n                           var camera = data[1];\n\n\n                           var transform = wd.unsafeGetGameObjectTransformComponent(camera, state);\n\n                           var state = wd.setTransformLocalPosition(transform, [0, 0, 80], state);\n\n                           return wd.startDirector(state);\n                    }\n    ",
              /* distance */undefined,
              /* diffPercent */0.00001,
              /* threshold */undefined,
              /* scriptFilePathList */undefined,
              /* frameData : :: */[
                /* record */[/* timePath : :: */[
                    16,
                    /* [] */0
                  ]],
                /* [] */0
              ]
            ],
            /* :: */[
              /* record */[
                /* name */"basic_box_map+light_box_map",
                /* bodyFuncStr */"\n                       PrepareTool.prepareForTest();\n\n\n\n                     return AssetTool.loadConfig([\"./test/e2e/render/config/setting.json\", \"./test/e2e/render/config/\"], null, function(){\n             return window.loadImageSrc(\"./test/e2e/asset/image/1.jpg\")\n                 .then((image1DataArr) => {\n                     return window.loadImageSrc(\"./test/e2e/asset/image/2.jpg\")\n                         .then((image2DataArr) => {\n                             return initSample(\n                                 TextureTool.buildArrayBufferViewSourceTextureFromImageDataArr(image1DataArr),\n                                 TextureTool.buildArrayBufferViewSourceTextureFromImageDataArr(image2DataArr),\n                                 wd.unsafeGetState());\n                         });\n                 });\n                     });\n\n                         function initSample(map1, map2, state) {\n                           RandomTool.stubMathRandom(10000);\n\n\n                           var boxes = [];\n\n                           var record = BasicBoxesTool.createBoxWithMap(map1, state);\n\n                           var state = record[0];\n                           var box = record[1];\n\n                           var state = PositionTool.setGameObjectPosition(box, [10, 0, 0], state);\n\n\n                           boxes.push(box);\n\n\n                           var record = LightBoxesTool.createBoxWithMap(map1, map2, state);\n\n                           var state = record[0];\n                           var box = record[1];\n\n\n                           var state = PositionTool.setGameObjectPosition(box, [-10, 0, 0], state);\n\n\n                           boxes.push(box);\n\n\n\n                           var data = CameraTool.createCamera(state);\n                           var state = data[0];\n                           var camera = data[1];\n\n\n                           var state = LightTool.createLights([-10, 20, 20], [5, 20, 25], state);\n\n\n                           var state = PositionTool.setGameObjectPosition(camera, [0, 20, 100], state);\n\n                           return wd.startDirector(state);\n                         }\n           ",
                /* distance */undefined,
                /* diffPercent */0.00001,
                /* threshold */undefined,
                /* scriptFilePathList */undefined,
                /* frameData : :: */[
                  /* record */[/* timePath : :: */[
                      16,
                      /* [] */0
                    ]],
                  /* [] */0
                ]
              ],
              /* :: */[
                /* record */[
                  /* name */"camera_controller_arcball_front",
                  /* bodyFuncStr */"\n                    PrepareTool.prepareForTest();\n\n                     return AssetTool.loadConfig([\"./test/e2e/render/config/setting.json\", \"./test/e2e/render/config/\"], null, function(){\n                         return initSample(wd.unsafeGetState());\n                     });\n\n                     function initSample(state) {\n                         var data = BasicBoxesTool.createBox(state);\n\n                         var state = data[0];\n                         var box = data[1];\n\n\n                         var [state, camera] = CameraTool.createArcballCamera({phi: 0, theta: Math.PI / 2}, state);\n\n\n\n                         return wd.startDirector(state);\n                     }\n     ",
                  /* distance */undefined,
                  /* diffPercent */0.00001,
                  /* threshold */undefined,
                  /* scriptFilePathList */undefined,
                  /* frameData : :: */[
                    /* record */[/* timePath : :: */[
                        16,
                        /* [] */0
                      ]],
                    /* [] */0
                  ]
                ],
                /* :: */[
                  /* record */[
                    /* name */"camera_controller_arcball_top",
                    /* bodyFuncStr */"\n                    PrepareTool.prepareForTest();\n\n                     return AssetTool.loadConfig([\"./test/e2e/render/config/setting.json\", \"./test/e2e/render/config/\"], null, function(){\n                         return initSample(wd.unsafeGetState());\n                     });\n\n                     function initSample(state) {\n                         var data = BasicBoxesTool.createBox(state);\n\n                         var state = data[0];\n                         var box = data[1];\n\n\n                         var [state, camera] = CameraTool.createArcballCamera({phi: 0, theta: Math.PI / 8}, state);\n\n\n\n                         return wd.startDirector(state);\n                     }\n     ",
                    /* distance */undefined,
                    /* diffPercent */0.00001,
                    /* threshold */undefined,
                    /* scriptFilePathList */undefined,
                    /* frameData : :: */[
                      /* record */[/* timePath : :: */[
                          16,
                          /* [] */0
                        ]],
                      /* [] */0
                    ]
                  ],
                  /* :: */[
                    /* record */[
                      /* name */"imgui",
                      /* bodyFuncStr */"\n                    PrepareTool.prepareForTest();\n\n                     return AssetTool.loadConfig([\"./test/e2e/render/config/setting.json\", \"./test/e2e/render/config/\"], null, function(){\n                             return AssetTool.loadIMGUIAsset(\"./test/e2e/asset/font/Lato-Regular-64.fnt\",\n                                 \"./test/e2e/asset/font/lato.png\",\n                                 [\n                                     [\"./test/e2e/asset/image/1.png\", \"1\"],\n                                     [\"./test/e2e/asset/image/2.jpg\", \"2\"]\n                                 ],\n                                  function (state) {\n                                         var state = ImguiTool.testIMGUI(1, state);\n\n             return wd.startDirector(state);\n                                 }, wd.unsafeGetState());\n                     });\n     ",
                      /* distance */undefined,
                      /* diffPercent */0.00001,
                      /* threshold */undefined,
                      /* scriptFilePathList */undefined,
                      /* frameData : :: */[
                        /* record */[/* timePath : :: */[
                            16,
                            /* [] */0
                          ]],
                        /* [] */0
                      ]
                    ],
                    /* [] */0
                  ]
                ]
              ]
            ]
          ]
        ]
      ]
    ]
  ]
];

var renderTestData = /* record */[
  renderTestData_000,
  renderTestData_001
];

export {
  renderTestData ,
  
}
/* No side effect */
