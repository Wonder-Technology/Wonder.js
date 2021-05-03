'use strict';


var performanceTestData_000 = /* commonData : record */[
  /* isClosePage */true,
  /* execCountWhenTest */10,
  /* execCountWhenGenerateBenchmark */15,
  /* compareCount */4,
  /* maxAllowDiffTimePercent */100,
  /* maxAllowDiffMemoryPercent */350,
  /* benchmarkPath */"./test/e2e/performance/benchmark/",
  /* baseDir */"./dist/base",
  /* scriptFilePathList : :: */[
    "./test/e2e/js/AssetTool.js",
    /* :: */[
      "./test/e2e/js/ReplaceFetchTool.js",
      /* :: */[
        "./test/e2e/js/ScheduleTool.js",
        /* :: */[
          "./test/e2e/js/BasicBoxesTool.js",
          /* :: */[
            "./test/e2e/js/LightBoxesTool.js",
            /* :: */[
              "./test/e2e/js/PositionTool.js",
              /* :: */[
                "./test/e2e/js/LightTool.js",
                /* :: */[
                  "./test/e2e/js/CameraTool.js",
                  /* :: */[
                    "./test/e2e/js/GeometryTool.js",
                    /* :: */[
                      "./test/e2e/js/BasicMaterialTool.js",
                      /* :: */[
                        "./test/e2e/js/LightMaterialTool.js",
                        /* :: */[
                          "./test/e2e/js/InstanceBasicBoxesTool.js",
                          /* :: */[
                            "./test/e2e/js/InstanceLightBoxesTool.js",
                            /* :: */[
                              "./test/e2e/js/RedoUndoTool.js",
                              /* :: */[
                                "./test/e2e/js/RandomTool.js",
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
  /* replaceBodyFuncStrWhenDebug */(function (bodyFuncStr) {
      return bodyFuncStr.replace((/\.\/test\/e2e\//g), "../../../../test/e2e/");
    })
];

var performanceTestData_001 = /* testDataList : :: */[
  /* record */[
    /* name */"basic_boxes",
    /* caseList : :: */[
      /* record */[
        /* name */"create_5k_boxes_map",
        /* bodyFuncStr */"\n                                     PrepareTool.prepareForTest();\n\n\n                                     return AssetTool.loadConfig([\"./test/e2e/performance/config/setting1.json\", \"./test/e2e/performance/config/\"], null, function(){\n                             return window.loadImageSrc(\"./test/e2e/asset/image/1.jpg\")\n                             .then((imageDataArr) => {\n                                  return initSample(\n                                  TextureTool.buildArrayBufferViewSourceTextureFromImageDataArr(imageDataArr), wd.unsafeGetState());\n                             });\n                                     });\n\n\n                                 function initSample(map1, state) {\n                 var n1 = performance.now();\n\n                                     var data = BasicBoxesTool.createBoxesByCloneWithMap(5000, map1, state);\n\n                                     var state = data[0];\n                                     var boxes = data[1];\n\n                                     var data = BasicBoxesTool.setPosition(boxes, state);\n                                     var state = data[0];\n                                     var boxes = data[1];\n\n                                     var data = BasicBoxesTool.createCamera(state);\n                                     var state = data[0];\n\n                 var n2 = performance.now();\n\n                                     var state = wd.initDirector(state);\n\n\n\n                                     /* var state = wd.setState(state); */\n\n\n                 var n3 = performance.now();\n                                     var state = wd.loopBody(100.0, state);\n\n\n\n\n                 var n4 = performance.now();\n\n\n                                     /* return state; */\n\n\n\n\n                 return {\"textArray\": [\"prepare\", \"init\", \"loopBody\"], \"timeArray\": [n1, n2, n3, n4]};\n                 }\n                 ",
        /* errorRate */10
      ],
      /* :: */[
        /* record */[
          /* name */"create_5k_boxes+transform",
          /* bodyFuncStr */"\n                                        PrepareTool.prepareForTest();\n\n\n\n\n\n                                return AssetTool.loadConfig([\"./test/e2e/performance/config/setting1.json\", \"./test/e2e/performance/config/\"], null, function(){ return initSample(wd.unsafeGetState()); });\n\n\n\n                                               function initSample(state) {\n                               var n1 = performance.now();\n\n                                                   var data = BasicBoxesTool.createBoxesByClone(5000, state);\n\n                                                   var state = data[0];\n                                                   var boxes = data[1];\n\n                                                   var data = BasicBoxesTool.setPosition(boxes, state);\n                                                   var state = data[0];\n                                                   var boxes = data[1];\n\n                                                   var data = BasicBoxesTool.createCamera(state);\n\n\n\n                                                   var state = data[0];\n\n\n                                                   var state = BasicBoxesTool.setData(boxes, state);\n\n\n\n\n\n                               var n2 = performance.now();\n\n                                                   var state = wd.initDirector(state);\n\n\n\n\n                               var n3 = performance.now();\n                                                   var state = wd.loopBody(100.0, state);\n\n\n\n\n                               var n4 = performance.now();\n\n\n                                                   /* return state; */\n\n\n\n\n                               return {\"textArray\": [\"prepare\", \"init\", \"loopBody\"], \"timeArray\": [n1, n2, n3, n4] };\n                               }\n                               ",
          /* errorRate */10
        ],
        /* :: */[
          /* record */[
            /* name */"create_5k_boxes+transform+set_parent",
            /* bodyFuncStr */"\n                                        PrepareTool.prepareForTest();\n\n\n\n\n\n\n                                        return AssetTool.loadConfig([\"./test/e2e/performance/config/setting1.json\", \"./test/e2e/performance/config/\"], null, function(){\n                                            return initSample(wd.unsafeGetState());\n                                        });\n\n\n\n\n                                               function initSample(state) {\n                               var n1 = performance.now();\n\n                                                   var data = BasicBoxesTool.createBoxesByClone(5000, state);\n\n                                                   var state = data[0];\n                                                   var boxes = data[1];\n\n                                                   var data = BasicBoxesTool.setPosition(boxes, state);\n                                                   var state = data[0];\n                                                   var boxes = data[1];\n\n                                                   var data = BasicBoxesTool.createCamera(state);\n\n\n\n                                                   var state = data[0];\n\n\n                                                   var state = BasicBoxesTool.setData(boxes, state);\n\n                                                   var state = BasicBoxesTool.setParent(boxes, state);\n\n\n\n\n                               var n2 = performance.now();\n\n                                                   var state = wd.initDirector(state);\n\n\n\n\n                               var n3 = performance.now();\n                                                   var state = wd.loopBody(100.0, state);\n\n\n\n\n                               var n4 = performance.now();\n\n\n                                                   /* return state; */\n\n\n\n\n                               return {\"textArray\": [\"prepare\", \"init\", \"loopBody\"], \"timeArray\": [n1, n2, n3, n4] };\n                               }\n                               ",
            /* errorRate */10
          ],
          /* :: */[
            /* record */[
              /* name */"create_dispose_1k_boxes",
              /* bodyFuncStr */"\n                                        PrepareTool.prepareForTest();\n\n\n\n\n\n                                        return AssetTool.loadConfig([\"./test/e2e/performance/config/setting1.json\", \"./test/e2e/performance/config/\"], null, function(){\n                                            return initSample(wd.unsafeGetState());\n                                        });\n\n\n\n\n                                                        function initSample(state) {\n                                        var n1 = performance.now();\n\n                                                            var data = BasicBoxesTool.createBoxesByClone(1000, state);\n\n                                                            var state = data[0];\n                                                            var boxes = data[1];\n\n                                                            var data = BasicBoxesTool.setPosition(boxes, state);\n                                                            var state = data[0];\n                                                            var boxes = data[1];\n\n                                                            var data = BasicBoxesTool.createCamera(state);\n\n\n\n                                                            var state = data[0];\n\n\n                                                            var state = BasicBoxesTool.createAndDisposeGameObjects(1000, boxes,  state);\n\n\n\n\n                                        var n2 = performance.now();\n\n                                                            var state = wd.initDirector(state);\n\n\n\n\n                                        var n3 = performance.now();\n                                                            var state = wd.loopBody(100.0, state);\n\n\n\n\n                                        var n4 = performance.now();\n\n\n\n                                                            var state = wd.loopBody(200.0, state);\n\n\n\n\n                                        var n5 = performance.now();\n\n\n\n                               return {\"textArray\": [\"prepare\", \"init\", \"loopBody1\", \"loopBody2\"], \"timeArray\": [n1, n2, n3, n4, n5] };\n                               }\n\n                               ",
              /* errorRate */10
            ],
            /* :: */[
              /* record */[
                /* name */"create_dispose_1k_cloned_boxes_map",
                /* bodyFuncStr */"\n                                        PrepareTool.prepareForTest();\n\n\n\n\n\n                                        return AssetTool.loadConfig([\"./test/e2e/performance/config/setting1.json\", \"./test/e2e/performance/config/\"], null, function(){\n                             return window.loadImageSrc(\"./test/e2e/asset/image/1.jpg\")\n                             .then((imageDataArr) => {\n                                  return initSample(\n                                  TextureTool.buildArrayBufferViewSourceTextureFromImageDataArr(imageDataArr), wd.unsafeGetState());\n                             });\n                                        });\n\n\n\n\n                                                        function initSample(map1, state) {\n                                        var n1 = performance.now();\n\n                                                            var data = BasicBoxesTool.createBoxesByCloneWithMap(1000, map1, state);\n\n                                                            var state = data[0];\n                                                            var boxes = data[1];\n\n                                                            var data = BasicBoxesTool.setPosition(boxes, state);\n                                                            var state = data[0];\n                                                            var boxes = data[1];\n\n                                                            var data = BasicBoxesTool.createCamera(state);\n\n\n\n                                                            var state = data[0];\n\n\n                                                            var state = BasicBoxesTool.createAndDisposeGameObjectsWithMapByClone(1000, boxes, map1, state);\n\n\n\n\n                                        var n2 = performance.now();\n\n                                                            var state = wd.initDirector(state);\n\n\n\n\n                                        var n3 = performance.now();\n                                                            var state = wd.loopBody(100.0, state);\n\n\n\n\n                                        var n4 = performance.now();\n\n\n\n                                                            var state = wd.loopBody(200.0, state);\n\n\n\n\n                                        var n5 = performance.now();\n\n\n\n                               return {\"textArray\": [\"prepare\", \"init\", \"loopBody1\", \"loopBody2\"], \"timeArray\": [n1, n2, n3, n4, n5] };\n                               }\n\n                               ",
                /* errorRate */10
              ],
              /* [] */0
            ]
          ]
        ]
      ]
    ]
  ],
  /* :: */[
    /* record */[
      /* name */"basic_triangles",
      /* caseList : :: */[
        /* record */[
          /* name */"create_dispose_1k_triangles",
          /* bodyFuncStr */"\n                                        PrepareTool.prepareForTest();\n\n\n\n\n\n                                        return AssetTool.loadConfig([\"./test/e2e/performance/config/setting1.json\", \"./test/e2e/performance/config/\"], null, function(){\n                                            return initSample(wd.unsafeGetState());\n                                        });\n\n\n\n\n                                                        function initSample(state) {\n                  var n1 = performance.now();\n\n                  var data = GeometryTool.createBasicTriangleByClone(1000, 10, state);\n\n                  var state = data[0];\n                  var boxes = data[1];\n\n                  var data = PositionTool.setPosition(boxes, state);\n                  var state = data[0];\n                  var boxes = data[1];\n\n                  var data = BasicBoxesTool.createCamera(state);\n\n\n\n                  var state = data[0];\n\n\n                  var state = GeometryTool.createAndDisposeGameObjects(1000, boxes, state);\n\n\n\n\n\n\n\n\n\n\n                                        var n2 = performance.now();\n\n                                                            var state = wd.initDirector(state);\n\n\n\n\n                                        var n3 = performance.now();\n                                                            var state = wd.loopBody(100.0, state);\n\n\n\n\n                                        var n4 = performance.now();\n\n\n\n                                                            var state = wd.loopBody(200.0, state);\n\n\n\n\n                                        var n5 = performance.now();\n\n\n\n                               return {\"textArray\": [\"prepare\", \"init\", \"loopBody1\", \"loopBody2\"], \"timeArray\": [n1, n2, n3, n4, n5] };\n                               }\n\n                               ",
          /* errorRate */10
        ],
        /* [] */0
      ]
    ],
    /* :: */[
      /* record */[
        /* name */"instance_basic_boxes",
        /* caseList : :: */[
          /* record */[
            /* name */"static_hardware_create_100k_boxes",
            /* bodyFuncStr */"\n                                     PrepareTool.prepareForTest();\n\n\n\n\n\n                             return AssetTool.loadConfig([\"./test/e2e/performance/config/setting_static_instance.json\", \"./test/e2e/performance/config/\"], null, function(){ return initSample(wd.unsafeGetState()); });\n\n\n\n                                            function initSample(state) {\n                            var n1 = performance.now();\n\n                                            var data = InstanceBasicBoxesTool.createBoxes(1, 100000, true, state);\n                                                var state = data[0];\n                                                var boxes = data[1];\n\n                                                var data = InstanceBasicBoxesTool.setPosition(boxes, state);\n                                                var state = data[0];\n                                                var boxes = data[1];\n\n                                                var data = InstanceBasicBoxesTool.createCamera(state);\n                                                var state = data[0];\n\n                            var n2 = performance.now();\n\n                                                var state = wd.initDirector(state);\n\n\n\n                                                /* var state = wd.setState(state); */\n\n\n                            var n3 = performance.now();\n                                                var state = wd.loopBody(100.0, state);\n\n\n\n\n                            var n4 = performance.now();\n\n\n                                                /* return state; */\n\n\n\n\n                            return {\"textArray\": [\"prepare\", \"init\", \"loopBody\"], \"timeArray\": [n1, n2, n3, n4] }\n\n                            }\n                            ",
            /* errorRate */10
          ],
          /* :: */[
            /* record */[
              /* name */"static_batch_create_5k_boxes",
              /* bodyFuncStr */"\n                                     PrepareTool.prepareForTest();\n\n\n\n                             return AssetTool.loadConfig([\"./test/e2e/performance/config/setting_batch.json\", \"./test/e2e/performance/config/\"], null, function(){ return initSample(wd.unsafeGetState()); });\n\n\n\n                                            function initSample(state) {\n                            var n1 = performance.now();\n\n                                            var data = InstanceBasicBoxesTool.createBoxes(1, 5000, true, state);\n                                                var state = data[0];\n                                                var boxes = data[1];\n\n                                                var data = InstanceBasicBoxesTool.setPosition(boxes, state);\n                                                var state = data[0];\n                                                var boxes = data[1];\n\n                                                var data = InstanceBasicBoxesTool.createCamera(state);\n                                                var state = data[0];\n\n                            var n2 = performance.now();\n\n                                                var state = wd.initDirector(state);\n\n\n\n                            var n3 = performance.now();\n                                                var state = wd.loopBody(100.0, state);\n\n\n\n\n                            var n4 = performance.now();\n\n\n                            return {\"textArray\": [\"prepare\", \"init\", \"loopBody\"], \"timeArray\": [n1, n2, n3, n4] }\n\n                            }\n                            ",
              /* errorRate */10
            ],
            /* :: */[
              /* record */[
                /* name */"dynamic_hardware_create_10k_boxes+transform",
                /* bodyFuncStr */"\n                                     PrepareTool.prepareForTest();\n\n\n\n\n\n                             return AssetTool.loadConfig([\"./test/e2e/performance/config/setting1.json\", \"./test/e2e/performance/config/\"], null, function(){ return initSample(wd.unsafeGetState()); });\n\n\n\n                                            function initSample(state) {\n                            var n1 = performance.now();\n\n                                            var data = InstanceBasicBoxesTool.createBoxes(1, 10000, false, state);\n                                                var state = data[0];\n                                                var boxes = data[1];\n\n                                                var data = InstanceBasicBoxesTool.setPosition(boxes, state);\n                                                var state = data[0];\n                                                var boxes = data[1];\n\n                                                var data = InstanceBasicBoxesTool.createCamera(state);\n                                                var state = data[0];\n\n\n\n                                                var state = InstanceBasicBoxesTool.setData(boxes, state);\n\n\n                            var n2 = performance.now();\n\n                                                var state = wd.initDirector(state);\n\n\n\n\n\n                            var n3 = performance.now();\n                                                var state = wd.loopBody(100.0, state);\n\n\n\n\n                            var n4 = performance.now();\n\n\n\n\n\n                            return {\"textArray\": [\"prepare\", \"init\", \"loopBody\"], \"timeArray\": [n1, n2, n3, n4] }\n                            }\n                            ",
                /* errorRate */10
              ],
              /* :: */[
                /* record */[
                  /* name */"dynamic_hardware_create_10k_boxes+transform+set_parent",
                  /* bodyFuncStr */"\n                                     PrepareTool.prepareForTest();\n\n\n\n\n\n                             return AssetTool.loadConfig([\"./test/e2e/performance/config/setting1.json\", \"./test/e2e/performance/config/\"], null, function(){ return initSample(wd.unsafeGetState()); });\n\n\n\n                                            function initSample(state) {\n                            var n1 = performance.now();\n\n                                            var data = InstanceBasicBoxesTool.createBoxesWithHierachy(5000, 5000, false, state);\n\n                                                var state = data[0];\n                                                var boxes = data[1];\n\n                                                var data = InstanceBasicBoxesTool.setPosition(boxes, state);\n                                                var state = data[0];\n                                                var boxes = data[1];\n\n                                                var data = InstanceBasicBoxesTool.createCamera(state);\n                                                var state = data[0];\n\n\n\n                                                var state = InstanceBasicBoxesTool.setData(boxes, state);\n\n\n                            var n2 = performance.now();\n\n                                                var state = wd.initDirector(state);\n\n\n\n\n\n                            var n3 = performance.now();\n                                                var state = wd.loopBody(100.0, state);\n\n\n\n\n                            var n4 = performance.now();\n\n\n\n\n\n                            return {\"textArray\": [\"prepare\", \"init\", \"loopBody\"], \"timeArray\": [n1, n2, n3, n4] }\n\n                            }\n\n                            ",
                  /* errorRate */10
                ],
                /* :: */[
                  /* record */[
                    /* name */"dynamic_hardware_create_dispose_200(sourceInstance box)*5(objectInstance box)",
                    /* bodyFuncStr */"\n                                     PrepareTool.prepareForTest();\n\n\n\n\n\n                             return AssetTool.loadConfig([\"./test/e2e/performance/config/setting_dynamic_instance_create_dispose1.json\", \"./test/e2e/performance/config/\"], null, function(){ return initSample(wd.unsafeGetState()); });\n\n\n\n                                            function initSample(state) {\n                            var n1 = performance.now();\n\n                                            var data = InstanceBasicBoxesTool.createBoxes(200, 5, false, state);\n\n                                                var state = data[0];\n                                                var boxes = data[1];\n\n                                                var data = InstanceBasicBoxesTool.setPosition(boxes, state);\n                                                var state = data[0];\n                                                var boxes = data[1];\n\n                                                var data = InstanceBasicBoxesTool.createCamera(state);\n                                                var state = data[0];\n\n\n\n                                            var state = InstanceBasicBoxesTool.createAndDisposeSourceInstanceGameObjects(200, 5, boxes, state);\n\n\n                            var n2 = performance.now();\n\n                                                var state = wd.initDirector(state);\n\n\n\n\n\n                            var n3 = performance.now();\n                                                var state = wd.loopBody(100.0, state);\n\n                            var n4 = performance.now();\n                                                var state = wd.loopBody(200.0, state);\n\n\n\n                            var n5 = performance.now();\n\n\n\n\n\n                            return {\"textArray\": [\"prepare\", \"init\", \"loopBody1\", \"loopBody2\"], \"timeArray\": [n1, n2, n3, n4, n5] }\n\n\n                            }\n\n                            ",
                    /* errorRate */10
                  ],
                  /* :: */[
                    /* record */[
                      /* name */"dynamic_hardware_create_dispose_1[(sourceInstance box)*2k(objectInstance box)",
                      /* bodyFuncStr */"\n                                     PrepareTool.prepareForTest();\n\n\n\n\n\n                             return AssetTool.loadConfig([\"./test/e2e/performance/config/setting_dynamic_instance_create_dispose2.json\", \"./test/e2e/performance/config/\"], null, function(){ return initSample(wd.unsafeGetState()); });\n\n\n\n                                            function initSample(state) {\n                            var n1 = performance.now();\n\n                                            var data = InstanceBasicBoxesTool.createBoxes(1, 2000, false, state);\n\n                                                var state = data[0];\n                                                var boxes = data[1];\n\n                                                var data = InstanceBasicBoxesTool.setPosition(boxes, state);\n                                                var state = data[0];\n                                                var boxes = data[1];\n\n                                                var data = InstanceBasicBoxesTool.createCamera(state);\n                                                var state = data[0];\n\n\n\n                                            var state = InstanceBasicBoxesTool.createAndDisposeSourceInstanceGameObjects(1, 2000, boxes, state);\n\n\n                            var n2 = performance.now();\n\n                                                var state = wd.initDirector(state);\n\n\n\n\n\n                            var n3 = performance.now();\n                                                var state = wd.loopBody(100.0, state);\n\n                            var n4 = performance.now();\n                                                var state = wd.loopBody(200.0, state);\n\n\n\n                            var n5 = performance.now();\n\n\n\n\n\n                            return {\"textArray\": [\"prepare\", \"init\", \"loopBody1\", \"loopBody2\"], \"timeArray\": [n1, n2, n3, n4, n5] }\n\n\n                            }\n\n                            ",
                      /* errorRate */10
                    ],
                    /* [] */0
                  ]
                ]
              ]
            ]
          ]
        ]
      ],
      /* :: */[
        /* record */[
          /* name */"light_boxes",
          /* caseList : :: */[
            /* record */[
              /* name */"create_3k_boxes_map",
              /* bodyFuncStr */"\n                                     PrepareTool.prepareForTest();\n\n\n\n\n\n                             return AssetTool.loadConfig([\"./test/e2e/performance/config/setting1.json\", \"./test/e2e/performance/config/\"], null, function(){\n\n                             return window.loadImageSrc(\"./test/e2e/asset/image/1.jpg\")\n                             .then((image1DataArr) => {\n\n\n                             return window.loadImageSrc(\"./test/e2e/asset/image/2.jpg\")\n                             .then((image2DataArr) => {\n                                  return initSample(\n                                  TextureTool.buildArrayBufferViewSourceTextureFromImageDataArr(image1DataArr),\n                                  TextureTool.buildArrayBufferViewSourceTextureFromImageDataArr(image2DataArr),\n\n                                  wd.unsafeGetState());\n                             });\n\n\n                             });\n\n                             });\n\n\n\n                                 function initSample(map1, map2, state) {\n                 var n1 = performance.now();\n\n                                     var data = LightBoxesTool.createBoxesByCloneWithMap(3000, map1, map2, state);\n\n                                     var state = data[0];\n                                     var boxes = data[1];\n\n                                     var data = LightBoxesTool.setPosition(boxes, state);\n                                     var state = data[0];\n                                     var boxes = data[1];\n\n\n\n                                             var state = LightTool.createLights([-10, 0, 20], [5,0,25], state);\n\n\n\n\n\n                                     var data = LightBoxesTool.createCamera(state);\n                                     var state = data[0];\n\n                 var n2 = performance.now();\n\n                                     var state = wd.initDirector(state);\n\n\n\n                                     /* var state = wd.setState(state); */\n\n\n                 var n3 = performance.now();\n                                     var state = wd.loopBody(100.0, state);\n\n\n\n\n                 var n4 = performance.now();\n\n\n                                     /* return state; */\n\n\n\n\n                 return {\"textArray\": [\"prepare\", \"init\", \"loopBody\"], \"timeArray\": [n1, n2, n3, n4]};\n                 }\n                 ",
              /* errorRate */10
            ],
            /* :: */[
              /* record */[
                /* name */"create_dispose_1k_cloned_boxes_map",
                /* bodyFuncStr */"\n                                     PrepareTool.prepareForTest();\n\n\n\n\n\n                             return AssetTool.loadConfig([\"./test/e2e/performance/config/setting1.json\", \"./test/e2e/performance/config/\"], null, function(){\n                             return window.loadImageSrc(\"./test/e2e/asset/image/1.jpg\")\n                             .then((image1DataArr) => {\n\n\n                             return window.loadImageSrc(\"./test/e2e/asset/image/2.jpg\")\n                             .then((image2DataArr) => {\n                                  return initSample(\n                                  TextureTool.buildArrayBufferViewSourceTextureFromImageDataArr(image1DataArr),\n                                  TextureTool.buildArrayBufferViewSourceTextureFromImageDataArr(image2DataArr),\n\n                                  wd.unsafeGetState());\n                             });\n\n\n                             });\n\n          });\n\n\n\n                                                     function initSample(map1, map2, state) {\n                                     var n1 = performance.now();\n\n                                                         var data = LightBoxesTool.createBoxesByCloneWithMap(1000, map1, map2, state);\n\n                                                         var state = data[0];\n                                                         var boxes = data[1];\n\n                                                         var data = LightBoxesTool.setPosition(boxes, state);\n                                                         var state = data[0];\n                                                         var boxes = data[1];\n\n\n\n\n                                             var state = LightTool.createLights([-10, 0, 20], [5,0,25], state);\n\n\n                                                         var data = LightBoxesTool.createCamera(state);\n\n\n\n                                                         var state = data[0];\n\n\n                                                         var state = LightBoxesTool.createAndDisposeGameObjectsWithMapByClone(1000, boxes, map1, map2, state);\n\n\n\n\n                                     var n2 = performance.now();\n\n                                                         var state = wd.initDirector(state);\n\n\n\n\n                                     var n3 = performance.now();\n                                                         var state = wd.loopBody(100.0, state);\n\n\n\n\n                                     var n4 = performance.now();\n\n\n\n                                                         var state = wd.loopBody(200.0, state);\n\n\n\n\n                                     var n5 = performance.now();\n\n\n\n                            return {\"textArray\": [\"prepare\", \"init\", \"loopBody1\", \"loopBody2\"], \"timeArray\": [n1, n2, n3, n4, n5] };\n                            }\n\n                            ",
                /* errorRate */10
              ],
              /* [] */0
            ]
          ]
        ],
        /* :: */[
          /* record */[
            /* name */"instance_light_boxes",
            /* caseList : :: */[
              /* record */[
                /* name */"static_hardware_create_50k_boxes",
                /* bodyFuncStr */"\n                                     PrepareTool.prepareForTest();\n\n\n\n\n\n                             return AssetTool.loadConfig([\"./test/e2e/performance/config/setting_static_instance.json\", \"./test/e2e/performance/config/\"], null, function(){ return initSample(wd.unsafeGetState()); });\n\n\n\n                                            function initSample(state) {\n                            var n1 = performance.now();\n\n                                            var data = InstanceLightBoxesTool.createBoxes(1, 50000, true, state);\n                                                var state = data[0];\n                                                var boxes = data[1];\n\n                                                var data = InstanceLightBoxesTool.setPosition(boxes, state);\n                                                var state = data[0];\n                                                var boxes = data[1];\n\n\n\n\n\n                                             var state = LightTool.createLights([-10, 0, 20], [5,0,25], state);\n\n\n\n                                                var data = InstanceLightBoxesTool.createCamera(state);\n                                                var state = data[0];\n\n                            var n2 = performance.now();\n\n                                                var state = wd.initDirector(state);\n\n\n\n                                                /* var state = wd.setState(state); */\n\n\n                            var n3 = performance.now();\n                                                var state = wd.loopBody(100.0, state);\n\n\n\n\n                            var n4 = performance.now();\n\n\n                                                /* return state; */\n\n\n\n\n                            return {\"textArray\": [\"prepare\", \"init\", \"loopBody\"], \"timeArray\": [n1, n2, n3, n4] }\n\n                            }\n                            ",
                /* errorRate */10
              ],
              /* :: */[
                /* record */[
                  /* name */"static_batch_create_3k_boxes",
                  /* bodyFuncStr */"\n                                     PrepareTool.prepareForTest();\n\n\n                             return AssetTool.loadConfig([\"./test/e2e/performance/config/setting_batch.json\", \"./test/e2e/performance/config/\"], null, function(){ return initSample(wd.unsafeGetState()); });\n\n\n\n                                            function initSample(state) {\n                            var n1 = performance.now();\n\n                                            var data = InstanceLightBoxesTool.createBoxes(1, 3000, true, state);\n                                                var state = data[0];\n                                                var boxes = data[1];\n\n                                                var data = InstanceLightBoxesTool.setPosition(boxes, state);\n                                                var state = data[0];\n                                                var boxes = data[1];\n\n\n\n\n\n                                             var state = LightTool.createLights([-100, 0, 100], [150,0,250], state);\n\n\n                                                var data = InstanceLightBoxesTool.createCamera(state);\n                                                var state = data[0];\n\n                            var n2 = performance.now();\n\n                                                var state = wd.initDirector(state);\n\n\n\n                            var n3 = performance.now();\n                                                var state = wd.loopBody(100.0, state);\n\n\n\n\n                            var n4 = performance.now();\n\n\n                            return {\"textArray\": [\"prepare\", \"init\", \"loopBody\"], \"timeArray\": [n1, n2, n3, n4] }\n\n                            }\n                            ",
                  /* errorRate */10
                ],
                /* :: */[
                  /* record */[
                    /* name */"dynamic_hardware_create_5k_boxes+transform",
                    /* bodyFuncStr */"\n                                     PrepareTool.prepareForTest();\n\n\n\n\n\n                             return AssetTool.loadConfig([\"./test/e2e/performance/config/setting1.json\", \"./test/e2e/performance/config/\"], null, function(){ return initSample(wd.unsafeGetState()); });\n\n\n\n                                            function initSample(state) {\n                            var n1 = performance.now();\n\n                                            var data = InstanceLightBoxesTool.createBoxes(1, 5000, false, state);\n                                                var state = data[0];\n                                                var boxes = data[1];\n\n                                                var data = InstanceLightBoxesTool.setPosition(boxes, state);\n                                                var state = data[0];\n                                                var boxes = data[1];\n\n\n\n\n                                             var state = LightTool.createLights([-100, 0, 100], [150,0,250], state);\n\n\n\n                                                var data = InstanceLightBoxesTool.createCamera(state);\n                                                var state = data[0];\n\n\n\n                                                var state = InstanceLightBoxesTool.setData(boxes, state);\n\n\n                            var n2 = performance.now();\n\n                                                var state = wd.initDirector(state);\n\n\n\n\n\n                            var n3 = performance.now();\n                                                var state = wd.loopBody(100.0, state);\n\n\n\n\n                            var n4 = performance.now();\n\n\n\n\n\n                            return {\"textArray\": [\"prepare\", \"init\", \"loopBody\"], \"timeArray\": [n1, n2, n3, n4] }\n                            }\n                            ",
                    /* errorRate */10
                  ],
                  /* :: */[
                    /* record */[
                      /* name */"dynamic_hardware_create_dispose_100(sourceInstance box)*4(objectInstance box)",
                      /* bodyFuncStr */"\n                                     PrepareTool.prepareForTest();\n\n\n\n\n\n                             return AssetTool.loadConfig([\"./test/e2e/performance/config/setting_dynamic_instance_create_dispose1.json\", \"./test/e2e/performance/config/\"], null, function(){ return initSample(wd.unsafeGetState()); });\n\n\n\n                                            function initSample(state) {\n                            var n1 = performance.now();\n\n                                            var data = InstanceLightBoxesTool.createBoxes(100, 4, false, state);\n\n                                                var state = data[0];\n                                                var boxes = data[1];\n\n                                                var data = InstanceLightBoxesTool.setPosition(boxes, state);\n                                                var state = data[0];\n                                                var boxes = data[1];\n\n\n\n\n                                             var state = LightTool.createLights([-100, 0, 100], [150,0,250], state);\n\n\n                                                var data = InstanceLightBoxesTool.createCamera(state);\n                                                var state = data[0];\n\n\n\n                                            var state = InstanceLightBoxesTool.createAndDisposeSourceInstanceGameObjects(100, 4, boxes, state);\n\n\n                            var n2 = performance.now();\n\n                                                var state = wd.initDirector(state);\n\n\n\n\n\n                            var n3 = performance.now();\n                                                var state = wd.loopBody(100.0, state);\n\n                            var n4 = performance.now();\n                                                var state = wd.loopBody(200.0, state);\n\n\n\n                            var n5 = performance.now();\n\n\n\n\n\n                            return {\"textArray\": [\"prepare\", \"init\", \"loopBody1\", \"loopBody2\"], \"timeArray\": [n1, n2, n3, n4, n5] }\n\n\n                            }\n\n                            ",
                      /* errorRate */10
                    ],
                    /* :: */[
                      /* record */[
                        /* name */"dynamic_hardware_create_dispose_1[(sourceInstance box)*1k(objectInstance box)",
                        /* bodyFuncStr */"\n                                     PrepareTool.prepareForTest();\n\n\n\n\n\n                             return AssetTool.loadConfig([\"./test/e2e/performance/config/setting_dynamic_instance_create_dispose2.json\", \"./test/e2e/performance/config/\"], null, function(){ return initSample(wd.unsafeGetState()); });\n\n\n\n                                            function initSample(state) {\n                            var n1 = performance.now();\n\n                                            var data = InstanceLightBoxesTool.createBoxes(1, 1000, false, state);\n\n                                                var state = data[0];\n                                                var boxes = data[1];\n\n                                                var data = InstanceLightBoxesTool.setPosition(boxes, state);\n                                                var state = data[0];\n                                                var boxes = data[1];\n\n\n\n\n\n                                             var state = LightTool.createLights([-100, 0, 100], [150,0,250], state);\n\n                                                var data = InstanceLightBoxesTool.createCamera(state);\n                                                var state = data[0];\n\n\n\n                                            var state = InstanceLightBoxesTool.createAndDisposeSourceInstanceGameObjects(1, 1000, boxes, state);\n\n\n                            var n2 = performance.now();\n\n                                                var state = wd.initDirector(state);\n\n\n\n\n\n                            var n3 = performance.now();\n                                                var state = wd.loopBody(100.0, state);\n\n                            var n4 = performance.now();\n                                                var state = wd.loopBody(200.0, state);\n\n\n\n                            var n5 = performance.now();\n\n\n\n\n\n                            return {\"textArray\": [\"prepare\", \"init\", \"loopBody1\", \"loopBody2\"], \"timeArray\": [n1, n2, n3, n4, n5] }\n\n\n                            }\n\n                            ",
                        /* errorRate */10
                      ],
                      /* [] */0
                    ]
                  ]
                ]
              ]
            ]
          ],
          /* :: */[
            /* record */[
              /* name */"basic_light_geometrys_boxes",
              /* caseList : :: */[
                /* record */[
                  /* name */"create_150_basic_geometry+150_basic_boxGeometry+150_light_boxGeometry",
                  /* bodyFuncStr */"\n                                     PrepareTool.prepareForTest();\n\n\n\n\n\n                             return AssetTool.loadConfig([\"./test/e2e/performance/config/setting1.json\", \"./test/e2e/performance/config/\"], null, function(){ return initSample(wd.unsafeGetState()); });\n\n\n\n                                 function initSample(state) {\n                  var n1 = performance.now();\n\n                  var data = BasicBoxesTool.createBoxesWithoutClone(150, state);\n\n                  var state = data[0];\n                  var boxes = data[1];\n\n                  var data = BasicBoxesTool.setPosition(boxes, state);\n                  var state = data[0];\n                  var boxes = data[1];\n\n\n\n\n                  var data = GeometryTool.createBasicTriangleWithoutClone(150, 10, state);\n\n                  var state = data[0];\n                  var boxes = data[1];\n\n                  var data = PositionTool.setPosition(boxes, state);\n                  var state = data[0];\n                  var boxes = data[1];\n\n\n\n\n\n                  var data = LightBoxesTool.createBoxesWithoutClone(150, state);\n\n                  var state = data[0];\n                  var boxes = data[1];\n\n                  var data = LightBoxesTool.setPosition(boxes, state);\n                  var state = data[0];\n                  var boxes = data[1];\n\n\n\n\n\n\n\n                  var state = LightTool.createLights([-10, 0, 20], [5, 0, 25], state);\n\n\n\n\n                  var data = BasicBoxesTool.createCamera(state);\n                  var state = data[0];\n\n\n\n                                     var n2 = performance.now();\n\n                                                         var state = wd.initDirector(state);\n\n\n\n\n                                     var n3 = performance.now();\n                                                         var state = wd.loopBody(100.0, state);\n\n\n\n\n                                     var n4 = performance.now();\n\n\n\n                                                         var state = wd.loopBody(200.0, state);\n\n\n\n\n                                     var n5 = performance.now();\n\n\n\n                            return {\"textArray\": [\"prepare\", \"init\", \"loopBody1\", \"loopBody2\"], \"timeArray\": [n1, n2, n3, n4, n5] };\n                }\n                 ",
                  /* errorRate */10
                ],
                /* [] */0
              ]
            ],
            /* :: */[
              /* record */[
                /* name */"asset",
                /* caseList : :: */[
                  /* record */[
                    /* name */"convertGLBToWDB_assembleWDB_generateWDB_truck",
                    /* bodyFuncStr */"\n                              PrepareTool.prepareForTest();\n\n\n               return AssetTool.loadConfig([\"./test/e2e/performance/config/setting1.json\", \"./test/e2e/performance/config/\"], null, function () {\n\n               return AssetTool.loadGLB(\n               \"./test/e2e/asset/glb/CesiumMilkTruck.glb\"\n               )\n               .then((glb) => {\n                   var n1 = performance.now();\n\n                   var wdb = wd.convertGLBToWDB(glb);\n\n                   var n2 = performance.now();\n\n                   var n3 = null;\n                   var n4 = null;\n\n                   return wd.assembleWholeWDB(wdb,\n                   true, true, true, true, true,\n                   wd.unsafeGetState())\n                       .forEach(([state, _, sceneGameObject]) => {\n                           n3 = performance.now();\n\n                           var [state, _, wdb] = wd.generateWDB(sceneGameObject, wd.createSparseMap(), state);\n\n                           n4 = performance.now();\n                       })\n                       .then(() => {\n                           return { \"textArray\": [\"convert\", \"assemble\", \"generate\"], \"timeArray\": [n1, n2, n3, n4] };\n                       })\n                 })\n\n               });\n          ",
                    /* errorRate */10
                  ],
                  /* [] */0
                ]
              ],
              /* :: */[
                /* record */[
                  /* name */"event",
                  /* caseList : :: */[
                    /* record */[
                      /* name */"bind_trigger",
                      /* bodyFuncStr */"\n            PrepareTool.prepareForTest();\n\n\n\n\n            return AssetTool.loadConfig([\"./test/e2e/performance/config/setting1.json\", \"./test/e2e/performance/config/\"], null, function () {\n                var state = wd.unsafeGetState();\n\n\n                var [state, gameObject1] = wd.createGameObject(state);\n\n\n                var state = wd.initDirector(state);\n\n                var count = 500;\n\n                var value = 2.5;\n\n                var n1 = performance.now();\n\n\n                for (var i = 0; i < count; i++) {\n                    state =\n                        wd.onMouseEvent(0, 0, (event, state) => {\n                            return state;\n                        }, state);\n\n\n                    state =\n                        wd.onCustomGameObjectEvent(\n                            \"a1\", gameObject1, 0, (event, state) => {\n                                value = value * 2.5 / 1.5;\n\n                                return state;\n                            }, state);\n\n                    state =\n                        wd.onCustomGameObjectEvent(\n                            \"a1\", gameObject1, 1, (event, state) => {\n                                value = value * 2.5 / 1.5;\n\n                                return state;\n                            }, state);\n                }\n\n\n                var n2 = performance.now();\n\n\n\n\n                var state =\n                    wd.triggerCustomGameObjectEvent(\n                        wd.createCustomEvent(\"a1\"),\n\n                        gameObject1, state\n                    );\n\n                var n3 = performance.now();\n\n\n\n                return { \"textArray\": [\"bind\", \"trigger\"], \"timeArray\": [n1, n2, n3] };\n            });\n",
                      /* errorRate */10
                    ],
                    /* [] */0
                  ]
                ],
                /* :: */[
                  /* record */[
                    /* name */"imgui",
                    /* caseList : :: */[
                      /* record */[
                        /* name */"create_30_all_controls",
                        /* bodyFuncStr */"\n                   PrepareTool.prepareForTest();\n\n                    return AssetTool.loadConfig([\"./test/e2e/performance/config/setting1.json\", \"./test/e2e/performance/config/\"], null, function(){\n\n                            return AssetTool.loadIMGUIAsset(\"./test/e2e/asset/font/Lato-Regular-64.fnt\",\n                                \"./test/e2e/asset/font/lato.png\",\n                                [\n                                    [\"./test/e2e/asset/image/1.png\", \"1\"],\n                                    [\"./test/e2e/asset/image/2.jpg\", \"2\"]\n                                ],\n                                function (state) {\n                                        var state = ImguiTool.testIMGUI(30, state);\n\n                            var n1 = performance.now();\n\n                                                var state = wd.initDirector(state);\n\n\n\n\n\n                            var n2 = performance.now();\n                                                var state = wd.loopBody(100.0, state);\n\n\n\n\n                            var n3 = performance.now();\n\n\n\n\n\n                            return {\"textArray\": [\"init\", \"loopBody\"], \"timeArray\": [n1, n2, n3] }\n\n                                }, wd.unsafeGetState());\n                    });\n\n    ",
                        /* errorRate */10
                      ],
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
];

var performanceTestData = /* record */[
  performanceTestData_000,
  performanceTestData_001
];

exports.performanceTestData = performanceTestData;
/* No side effect */
