open WonderBenchmark;

open PerformanceTestDataType;

let performanceTestData = {
  commonData: {
    isClosePage: true,
    execCountWhenTest: 10,
    execCountWhenGenerateBenchmark: 15,
    compareCount: 4,
    maxAllowDiffTimePercent: 100,
    maxAllowDiffMemoryPercent: 350,
    benchmarkPath: "./test/e2e/performance/benchmark/",
    baseDir: "./dist/base",
    scriptFilePathList: [
      "./test/e2e/js/AssetTool.js",
      "./test/e2e/js/ReplaceFetchTool.js",
      "./test/e2e/js/ScheduleTool.js",
      "./test/e2e/js/BasicBoxesTool.js",
      "./test/e2e/js/LightBoxesTool.js",
      "./test/e2e/js/PositionTool.js",
      "./test/e2e/js/LightTool.js",
      "./test/e2e/js/CameraTool.js",
      "./test/e2e/js/GeometryTool.js",
      "./test/e2e/js/BasicMaterialTool.js",
      "./test/e2e/js/LightMaterialTool.js",
      "./test/e2e/js/InstanceBasicBoxesTool.js",
      "./test/e2e/js/InstanceLightBoxesTool.js",
      "./test/e2e/js/RedoUndoTool.js",
      "./test/e2e/js/RandomTool.js",
      "./test/e2e/js/TextureTool.js",
      "./test/e2e/js/PrepareTool.js",
      "./test/e2e/js/IMGUITool.js",
      "./dist/wd.js",
    ],
    replaceBodyFuncStrWhenDebug:
      Some(
        bodyFuncStr =>
          bodyFuncStr
          |> Js.String.replaceByRe(
               [%re {|/\.\/test\/e2e\//g|}],
               "../../../../test/e2e/",
             ),
      ),
  },
  testDataList: [
    {
      name: "basic_boxes",
      caseList: [
        {
          name: "create_5k_boxes_map",
          bodyFuncStr: {|
                                     PrepareTool.prepareForTest();


                                     return AssetTool.loadConfig(["./test/e2e/performance/config/setting1.json", "./test/e2e/performance/config/"], null, function(){
                             return window.loadImageSrc("./test/e2e/asset/image/1.jpg")
                             .then((imageDataArr) => {
                                  return initSample(
                                  TextureTool.buildArrayBufferViewSourceTextureFromImageDataArr(imageDataArr), wd.unsafeGetState());
                             });
                                     });


                                 function initSample(map1, state) {
                 var n1 = performance.now();

                                     var data = BasicBoxesTool.createBoxesByCloneWithMap(5000, map1, state);

                                     var state = data[0];
                                     var boxes = data[1];

                                     var data = BasicBoxesTool.setPosition(boxes, state);
                                     var state = data[0];
                                     var boxes = data[1];

                                     var data = BasicBoxesTool.createCamera(state);
                                     var state = data[0];

                 var n2 = performance.now();

                                     var state = wd.initDirector(state);



                                     /* var state = wd.setState(state); */


                 var n3 = performance.now();
                                     var state = wd.loopBody(100.0, state);




                 var n4 = performance.now();


                                     /* return state; */




                 return {"textArray": ["prepare", "init", "loopBody"], "timeArray": [n1, n2, n3, n4]};
                 }
                 |},
          errorRate: 10,
        },
        {
          name: "create_5k_boxes+transform",
          bodyFuncStr: {|
                                        PrepareTool.prepareForTest();





                                return AssetTool.loadConfig(["./test/e2e/performance/config/setting1.json", "./test/e2e/performance/config/"], null, function(){ return initSample(wd.unsafeGetState()); });



                                               function initSample(state) {
                               var n1 = performance.now();

                                                   var data = BasicBoxesTool.createBoxesByClone(5000, state);

                                                   var state = data[0];
                                                   var boxes = data[1];

                                                   var data = BasicBoxesTool.setPosition(boxes, state);
                                                   var state = data[0];
                                                   var boxes = data[1];

                                                   var data = BasicBoxesTool.createCamera(state);



                                                   var state = data[0];


                                                   var state = BasicBoxesTool.setData(boxes, state);





                               var n2 = performance.now();

                                                   var state = wd.initDirector(state);




                               var n3 = performance.now();
                                                   var state = wd.loopBody(100.0, state);




                               var n4 = performance.now();


                                                   /* return state; */




                               return {"textArray": ["prepare", "init", "loopBody"], "timeArray": [n1, n2, n3, n4] };
                               }
                               |},
          errorRate: 10,
        },
        {
          name: "create_5k_boxes+transform+set_parent",
          bodyFuncStr: {|
                                        PrepareTool.prepareForTest();






                                        return AssetTool.loadConfig(["./test/e2e/performance/config/setting1.json", "./test/e2e/performance/config/"], null, function(){
                                            return initSample(wd.unsafeGetState());
                                        });




                                               function initSample(state) {
                               var n1 = performance.now();

                                                   var data = BasicBoxesTool.createBoxesByClone(5000, state);

                                                   var state = data[0];
                                                   var boxes = data[1];

                                                   var data = BasicBoxesTool.setPosition(boxes, state);
                                                   var state = data[0];
                                                   var boxes = data[1];

                                                   var data = BasicBoxesTool.createCamera(state);



                                                   var state = data[0];


                                                   var state = BasicBoxesTool.setData(boxes, state);

                                                   var state = BasicBoxesTool.setParent(boxes, state);




                               var n2 = performance.now();

                                                   var state = wd.initDirector(state);




                               var n3 = performance.now();
                                                   var state = wd.loopBody(100.0, state);




                               var n4 = performance.now();


                                                   /* return state; */




                               return {"textArray": ["prepare", "init", "loopBody"], "timeArray": [n1, n2, n3, n4] };
                               }
                               |},
          errorRate: 10,
        },
        {
          name: "create_dispose_1k_boxes",
          bodyFuncStr: {|
                                        PrepareTool.prepareForTest();





                                        return AssetTool.loadConfig(["./test/e2e/performance/config/setting1.json", "./test/e2e/performance/config/"], null, function(){
                                            return initSample(wd.unsafeGetState());
                                        });




                                                        function initSample(state) {
                                        var n1 = performance.now();

                                                            var data = BasicBoxesTool.createBoxesByClone(1000, state);

                                                            var state = data[0];
                                                            var boxes = data[1];

                                                            var data = BasicBoxesTool.setPosition(boxes, state);
                                                            var state = data[0];
                                                            var boxes = data[1];

                                                            var data = BasicBoxesTool.createCamera(state);



                                                            var state = data[0];


                                                            var state = BasicBoxesTool.createAndDisposeGameObjects(1000, boxes,  state);




                                        var n2 = performance.now();

                                                            var state = wd.initDirector(state);




                                        var n3 = performance.now();
                                                            var state = wd.loopBody(100.0, state);




                                        var n4 = performance.now();



                                                            var state = wd.loopBody(200.0, state);




                                        var n5 = performance.now();



                               return {"textArray": ["prepare", "init", "loopBody1", "loopBody2"], "timeArray": [n1, n2, n3, n4, n5] };
                               }

                               |},
          errorRate: 10,
        },
        {
          name: "create_dispose_1k_cloned_boxes_map",
          bodyFuncStr: {|
                                        PrepareTool.prepareForTest();





                                        return AssetTool.loadConfig(["./test/e2e/performance/config/setting1.json", "./test/e2e/performance/config/"], null, function(){
                             return window.loadImageSrc("./test/e2e/asset/image/1.jpg")
                             .then((imageDataArr) => {
                                  return initSample(
                                  TextureTool.buildArrayBufferViewSourceTextureFromImageDataArr(imageDataArr), wd.unsafeGetState());
                             });
                                        });




                                                        function initSample(map1, state) {
                                        var n1 = performance.now();

                                                            var data = BasicBoxesTool.createBoxesByCloneWithMap(1000, map1, state);

                                                            var state = data[0];
                                                            var boxes = data[1];

                                                            var data = BasicBoxesTool.setPosition(boxes, state);
                                                            var state = data[0];
                                                            var boxes = data[1];

                                                            var data = BasicBoxesTool.createCamera(state);



                                                            var state = data[0];


                                                            var state = BasicBoxesTool.createAndDisposeGameObjectsWithMapByClone(1000, boxes, map1, state);




                                        var n2 = performance.now();

                                                            var state = wd.initDirector(state);




                                        var n3 = performance.now();
                                                            var state = wd.loopBody(100.0, state);




                                        var n4 = performance.now();



                                                            var state = wd.loopBody(200.0, state);




                                        var n5 = performance.now();



                               return {"textArray": ["prepare", "init", "loopBody1", "loopBody2"], "timeArray": [n1, n2, n3, n4, n5] };
                               }

                               |},
          errorRate: 10,
        },
      ],
    },
    {
      name: "basic_triangles",
      caseList: [
        {
          name: "create_dispose_1k_triangles",
          bodyFuncStr: {|
                                        PrepareTool.prepareForTest();





                                        return AssetTool.loadConfig(["./test/e2e/performance/config/setting1.json", "./test/e2e/performance/config/"], null, function(){
                                            return initSample(wd.unsafeGetState());
                                        });




                                                        function initSample(state) {
                  var n1 = performance.now();

                  var data = GeometryTool.createBasicTriangleByClone(1000, 10, state);

                  var state = data[0];
                  var boxes = data[1];

                  var data = PositionTool.setPosition(boxes, state);
                  var state = data[0];
                  var boxes = data[1];

                  var data = BasicBoxesTool.createCamera(state);



                  var state = data[0];


                  var state = GeometryTool.createAndDisposeGameObjects(1000, boxes, state);










                                        var n2 = performance.now();

                                                            var state = wd.initDirector(state);




                                        var n3 = performance.now();
                                                            var state = wd.loopBody(100.0, state);




                                        var n4 = performance.now();



                                                            var state = wd.loopBody(200.0, state);




                                        var n5 = performance.now();



                               return {"textArray": ["prepare", "init", "loopBody1", "loopBody2"], "timeArray": [n1, n2, n3, n4, n5] };
                               }

                               |},
          errorRate: 10,
        },
      ],
    },
    {
      name: "instance_basic_boxes",
      caseList: [
        {
          name: "static_hardware_create_100k_boxes",
          bodyFuncStr: {|
                                     PrepareTool.prepareForTest();





                             return AssetTool.loadConfig(["./test/e2e/performance/config/setting_static_instance.json", "./test/e2e/performance/config/"], null, function(){ return initSample(wd.unsafeGetState()); });



                                            function initSample(state) {
                            var n1 = performance.now();

                                            var data = InstanceBasicBoxesTool.createBoxes(1, 100000, true, state);
                                                var state = data[0];
                                                var boxes = data[1];

                                                var data = InstanceBasicBoxesTool.setPosition(boxes, state);
                                                var state = data[0];
                                                var boxes = data[1];

                                                var data = InstanceBasicBoxesTool.createCamera(state);
                                                var state = data[0];

                            var n2 = performance.now();

                                                var state = wd.initDirector(state);



                                                /* var state = wd.setState(state); */


                            var n3 = performance.now();
                                                var state = wd.loopBody(100.0, state);




                            var n4 = performance.now();


                                                /* return state; */




                            return {"textArray": ["prepare", "init", "loopBody"], "timeArray": [n1, n2, n3, n4] }

                            }
                            |},
          errorRate: 10,
        },
        {
          name: "static_batch_create_5k_boxes",
          bodyFuncStr: {|
                                     PrepareTool.prepareForTest();



                             return AssetTool.loadConfig(["./test/e2e/performance/config/setting_batch.json", "./test/e2e/performance/config/"], null, function(){ return initSample(wd.unsafeGetState()); });



                                            function initSample(state) {
                            var n1 = performance.now();

                                            var data = InstanceBasicBoxesTool.createBoxes(1, 5000, true, state);
                                                var state = data[0];
                                                var boxes = data[1];

                                                var data = InstanceBasicBoxesTool.setPosition(boxes, state);
                                                var state = data[0];
                                                var boxes = data[1];

                                                var data = InstanceBasicBoxesTool.createCamera(state);
                                                var state = data[0];

                            var n2 = performance.now();

                                                var state = wd.initDirector(state);



                            var n3 = performance.now();
                                                var state = wd.loopBody(100.0, state);




                            var n4 = performance.now();


                            return {"textArray": ["prepare", "init", "loopBody"], "timeArray": [n1, n2, n3, n4] }

                            }
                            |},
          errorRate: 10,
        },
        {
          name: "dynamic_hardware_create_10k_boxes+transform",
          bodyFuncStr: {|
                                     PrepareTool.prepareForTest();





                             return AssetTool.loadConfig(["./test/e2e/performance/config/setting1.json", "./test/e2e/performance/config/"], null, function(){ return initSample(wd.unsafeGetState()); });



                                            function initSample(state) {
                            var n1 = performance.now();

                                            var data = InstanceBasicBoxesTool.createBoxes(1, 10000, false, state);
                                                var state = data[0];
                                                var boxes = data[1];

                                                var data = InstanceBasicBoxesTool.setPosition(boxes, state);
                                                var state = data[0];
                                                var boxes = data[1];

                                                var data = InstanceBasicBoxesTool.createCamera(state);
                                                var state = data[0];



                                                var state = InstanceBasicBoxesTool.setData(boxes, state);


                            var n2 = performance.now();

                                                var state = wd.initDirector(state);





                            var n3 = performance.now();
                                                var state = wd.loopBody(100.0, state);




                            var n4 = performance.now();





                            return {"textArray": ["prepare", "init", "loopBody"], "timeArray": [n1, n2, n3, n4] }
                            }
                            |},
          errorRate: 10,
        },
        {
          name: "dynamic_hardware_create_10k_boxes+transform+set_parent",
          bodyFuncStr: {|
                                     PrepareTool.prepareForTest();





                             return AssetTool.loadConfig(["./test/e2e/performance/config/setting1.json", "./test/e2e/performance/config/"], null, function(){ return initSample(wd.unsafeGetState()); });



                                            function initSample(state) {
                            var n1 = performance.now();

                                            var data = InstanceBasicBoxesTool.createBoxesWithHierachy(5000, 5000, false, state);

                                                var state = data[0];
                                                var boxes = data[1];

                                                var data = InstanceBasicBoxesTool.setPosition(boxes, state);
                                                var state = data[0];
                                                var boxes = data[1];

                                                var data = InstanceBasicBoxesTool.createCamera(state);
                                                var state = data[0];



                                                var state = InstanceBasicBoxesTool.setData(boxes, state);


                            var n2 = performance.now();

                                                var state = wd.initDirector(state);





                            var n3 = performance.now();
                                                var state = wd.loopBody(100.0, state);




                            var n4 = performance.now();





                            return {"textArray": ["prepare", "init", "loopBody"], "timeArray": [n1, n2, n3, n4] }

                            }

                            |},
          errorRate: 10,
        },
        {
          name: "dynamic_hardware_create_dispose_200(sourceInstance box)*5(objectInstance box)",
          bodyFuncStr: {|
                                     PrepareTool.prepareForTest();





                             return AssetTool.loadConfig(["./test/e2e/performance/config/setting_dynamic_instance_create_dispose1.json", "./test/e2e/performance/config/"], null, function(){ return initSample(wd.unsafeGetState()); });



                                            function initSample(state) {
                            var n1 = performance.now();

                                            var data = InstanceBasicBoxesTool.createBoxes(200, 5, false, state);

                                                var state = data[0];
                                                var boxes = data[1];

                                                var data = InstanceBasicBoxesTool.setPosition(boxes, state);
                                                var state = data[0];
                                                var boxes = data[1];

                                                var data = InstanceBasicBoxesTool.createCamera(state);
                                                var state = data[0];



                                            var state = InstanceBasicBoxesTool.createAndDisposeSourceInstanceGameObjects(200, 5, boxes, state);


                            var n2 = performance.now();

                                                var state = wd.initDirector(state);





                            var n3 = performance.now();
                                                var state = wd.loopBody(100.0, state);

                            var n4 = performance.now();
                                                var state = wd.loopBody(200.0, state);



                            var n5 = performance.now();





                            return {"textArray": ["prepare", "init", "loopBody1", "loopBody2"], "timeArray": [n1, n2, n3, n4, n5] }


                            }

                            |},
          errorRate: 10,
        },
        {
          name: "dynamic_hardware_create_dispose_1[(sourceInstance box)*2k(objectInstance box)",
          bodyFuncStr: {|
                                     PrepareTool.prepareForTest();





                             return AssetTool.loadConfig(["./test/e2e/performance/config/setting_dynamic_instance_create_dispose2.json", "./test/e2e/performance/config/"], null, function(){ return initSample(wd.unsafeGetState()); });



                                            function initSample(state) {
                            var n1 = performance.now();

                                            var data = InstanceBasicBoxesTool.createBoxes(1, 2000, false, state);

                                                var state = data[0];
                                                var boxes = data[1];

                                                var data = InstanceBasicBoxesTool.setPosition(boxes, state);
                                                var state = data[0];
                                                var boxes = data[1];

                                                var data = InstanceBasicBoxesTool.createCamera(state);
                                                var state = data[0];



                                            var state = InstanceBasicBoxesTool.createAndDisposeSourceInstanceGameObjects(1, 2000, boxes, state);


                            var n2 = performance.now();

                                                var state = wd.initDirector(state);





                            var n3 = performance.now();
                                                var state = wd.loopBody(100.0, state);

                            var n4 = performance.now();
                                                var state = wd.loopBody(200.0, state);



                            var n5 = performance.now();





                            return {"textArray": ["prepare", "init", "loopBody1", "loopBody2"], "timeArray": [n1, n2, n3, n4, n5] }


                            }

                            |},
          errorRate: 10,
        },
      ],
    },
    {
      name: "light_boxes",
      caseList: [
        {
          name: "create_3k_boxes_map",
          bodyFuncStr: {|
                                     PrepareTool.prepareForTest();





                             return AssetTool.loadConfig(["./test/e2e/performance/config/setting1.json", "./test/e2e/performance/config/"], null, function(){

                             return window.loadImageSrc("./test/e2e/asset/image/1.jpg")
                             .then((image1DataArr) => {


                             return window.loadImageSrc("./test/e2e/asset/image/2.jpg")
                             .then((image2DataArr) => {
                                  return initSample(
                                  TextureTool.buildArrayBufferViewSourceTextureFromImageDataArr(image1DataArr),
                                  TextureTool.buildArrayBufferViewSourceTextureFromImageDataArr(image2DataArr),

                                  wd.unsafeGetState());
                             });


                             });

                             });



                                 function initSample(map1, map2, state) {
                 var n1 = performance.now();

                                     var data = LightBoxesTool.createBoxesByCloneWithMap(3000, map1, map2, state);

                                     var state = data[0];
                                     var boxes = data[1];

                                     var data = LightBoxesTool.setPosition(boxes, state);
                                     var state = data[0];
                                     var boxes = data[1];



                                             var state = LightTool.createLights([-10, 0, 20], [5,0,25], state);





                                     var data = LightBoxesTool.createCamera(state);
                                     var state = data[0];

                 var n2 = performance.now();

                                     var state = wd.initDirector(state);



                                     /* var state = wd.setState(state); */


                 var n3 = performance.now();
                                     var state = wd.loopBody(100.0, state);




                 var n4 = performance.now();


                                     /* return state; */




                 return {"textArray": ["prepare", "init", "loopBody"], "timeArray": [n1, n2, n3, n4]};
                 }
                 |},
          errorRate: 10,
        },
        {
          name: "create_dispose_1k_cloned_boxes_map",
          bodyFuncStr: {|
                                     PrepareTool.prepareForTest();





                             return AssetTool.loadConfig(["./test/e2e/performance/config/setting1.json", "./test/e2e/performance/config/"], null, function(){
                             return window.loadImageSrc("./test/e2e/asset/image/1.jpg")
                             .then((image1DataArr) => {


                             return window.loadImageSrc("./test/e2e/asset/image/2.jpg")
                             .then((image2DataArr) => {
                                  return initSample(
                                  TextureTool.buildArrayBufferViewSourceTextureFromImageDataArr(image1DataArr),
                                  TextureTool.buildArrayBufferViewSourceTextureFromImageDataArr(image2DataArr),

                                  wd.unsafeGetState());
                             });


                             });

          });



                                                     function initSample(map1, map2, state) {
                                     var n1 = performance.now();

                                                         var data = LightBoxesTool.createBoxesByCloneWithMap(1000, map1, map2, state);

                                                         var state = data[0];
                                                         var boxes = data[1];

                                                         var data = LightBoxesTool.setPosition(boxes, state);
                                                         var state = data[0];
                                                         var boxes = data[1];




                                             var state = LightTool.createLights([-10, 0, 20], [5,0,25], state);


                                                         var data = LightBoxesTool.createCamera(state);



                                                         var state = data[0];


                                                         var state = LightBoxesTool.createAndDisposeGameObjectsWithMapByClone(1000, boxes, map1, map2, state);




                                     var n2 = performance.now();

                                                         var state = wd.initDirector(state);




                                     var n3 = performance.now();
                                                         var state = wd.loopBody(100.0, state);




                                     var n4 = performance.now();



                                                         var state = wd.loopBody(200.0, state);




                                     var n5 = performance.now();



                            return {"textArray": ["prepare", "init", "loopBody1", "loopBody2"], "timeArray": [n1, n2, n3, n4, n5] };
                            }

                            |},
          errorRate: 10,
        },
      ],
    },
    {
      name: "instance_light_boxes",
      caseList: [
        {
          name: "static_hardware_create_50k_boxes",
          bodyFuncStr: {|
                                     PrepareTool.prepareForTest();





                             return AssetTool.loadConfig(["./test/e2e/performance/config/setting_static_instance.json", "./test/e2e/performance/config/"], null, function(){ return initSample(wd.unsafeGetState()); });



                                            function initSample(state) {
                            var n1 = performance.now();

                                            var data = InstanceLightBoxesTool.createBoxes(1, 50000, true, state);
                                                var state = data[0];
                                                var boxes = data[1];

                                                var data = InstanceLightBoxesTool.setPosition(boxes, state);
                                                var state = data[0];
                                                var boxes = data[1];





                                             var state = LightTool.createLights([-10, 0, 20], [5,0,25], state);



                                                var data = InstanceLightBoxesTool.createCamera(state);
                                                var state = data[0];

                            var n2 = performance.now();

                                                var state = wd.initDirector(state);



                                                /* var state = wd.setState(state); */


                            var n3 = performance.now();
                                                var state = wd.loopBody(100.0, state);




                            var n4 = performance.now();


                                                /* return state; */




                            return {"textArray": ["prepare", "init", "loopBody"], "timeArray": [n1, n2, n3, n4] }

                            }
                            |},
          errorRate: 10,
        },
        {
          name: "static_batch_create_3k_boxes",
          bodyFuncStr: {|
                                     PrepareTool.prepareForTest();


                             return AssetTool.loadConfig(["./test/e2e/performance/config/setting_batch.json", "./test/e2e/performance/config/"], null, function(){ return initSample(wd.unsafeGetState()); });



                                            function initSample(state) {
                            var n1 = performance.now();

                                            var data = InstanceLightBoxesTool.createBoxes(1, 3000, true, state);
                                                var state = data[0];
                                                var boxes = data[1];

                                                var data = InstanceLightBoxesTool.setPosition(boxes, state);
                                                var state = data[0];
                                                var boxes = data[1];





                                             var state = LightTool.createLights([-100, 0, 100], [150,0,250], state);


                                                var data = InstanceLightBoxesTool.createCamera(state);
                                                var state = data[0];

                            var n2 = performance.now();

                                                var state = wd.initDirector(state);



                            var n3 = performance.now();
                                                var state = wd.loopBody(100.0, state);




                            var n4 = performance.now();


                            return {"textArray": ["prepare", "init", "loopBody"], "timeArray": [n1, n2, n3, n4] }

                            }
                            |},
          errorRate: 10,
        },
        {
          name: "dynamic_hardware_create_5k_boxes+transform",
          bodyFuncStr: {|
                                     PrepareTool.prepareForTest();





                             return AssetTool.loadConfig(["./test/e2e/performance/config/setting1.json", "./test/e2e/performance/config/"], null, function(){ return initSample(wd.unsafeGetState()); });



                                            function initSample(state) {
                            var n1 = performance.now();

                                            var data = InstanceLightBoxesTool.createBoxes(1, 5000, false, state);
                                                var state = data[0];
                                                var boxes = data[1];

                                                var data = InstanceLightBoxesTool.setPosition(boxes, state);
                                                var state = data[0];
                                                var boxes = data[1];




                                             var state = LightTool.createLights([-100, 0, 100], [150,0,250], state);



                                                var data = InstanceLightBoxesTool.createCamera(state);
                                                var state = data[0];



                                                var state = InstanceLightBoxesTool.setData(boxes, state);


                            var n2 = performance.now();

                                                var state = wd.initDirector(state);





                            var n3 = performance.now();
                                                var state = wd.loopBody(100.0, state);




                            var n4 = performance.now();





                            return {"textArray": ["prepare", "init", "loopBody"], "timeArray": [n1, n2, n3, n4] }
                            }
                            |},
          errorRate: 10,
        },
        {
          name: "dynamic_hardware_create_dispose_100(sourceInstance box)*4(objectInstance box)",
          bodyFuncStr: {|
                                     PrepareTool.prepareForTest();





                             return AssetTool.loadConfig(["./test/e2e/performance/config/setting_dynamic_instance_create_dispose1.json", "./test/e2e/performance/config/"], null, function(){ return initSample(wd.unsafeGetState()); });



                                            function initSample(state) {
                            var n1 = performance.now();

                                            var data = InstanceLightBoxesTool.createBoxes(100, 4, false, state);

                                                var state = data[0];
                                                var boxes = data[1];

                                                var data = InstanceLightBoxesTool.setPosition(boxes, state);
                                                var state = data[0];
                                                var boxes = data[1];




                                             var state = LightTool.createLights([-100, 0, 100], [150,0,250], state);


                                                var data = InstanceLightBoxesTool.createCamera(state);
                                                var state = data[0];



                                            var state = InstanceLightBoxesTool.createAndDisposeSourceInstanceGameObjects(100, 4, boxes, state);


                            var n2 = performance.now();

                                                var state = wd.initDirector(state);





                            var n3 = performance.now();
                                                var state = wd.loopBody(100.0, state);

                            var n4 = performance.now();
                                                var state = wd.loopBody(200.0, state);



                            var n5 = performance.now();





                            return {"textArray": ["prepare", "init", "loopBody1", "loopBody2"], "timeArray": [n1, n2, n3, n4, n5] }


                            }

                            |},
          errorRate: 10,
        },
        {
          name: "dynamic_hardware_create_dispose_1[(sourceInstance box)*1k(objectInstance box)",
          bodyFuncStr: {|
                                     PrepareTool.prepareForTest();





                             return AssetTool.loadConfig(["./test/e2e/performance/config/setting_dynamic_instance_create_dispose2.json", "./test/e2e/performance/config/"], null, function(){ return initSample(wd.unsafeGetState()); });



                                            function initSample(state) {
                            var n1 = performance.now();

                                            var data = InstanceLightBoxesTool.createBoxes(1, 1000, false, state);

                                                var state = data[0];
                                                var boxes = data[1];

                                                var data = InstanceLightBoxesTool.setPosition(boxes, state);
                                                var state = data[0];
                                                var boxes = data[1];





                                             var state = LightTool.createLights([-100, 0, 100], [150,0,250], state);

                                                var data = InstanceLightBoxesTool.createCamera(state);
                                                var state = data[0];



                                            var state = InstanceLightBoxesTool.createAndDisposeSourceInstanceGameObjects(1, 1000, boxes, state);


                            var n2 = performance.now();

                                                var state = wd.initDirector(state);





                            var n3 = performance.now();
                                                var state = wd.loopBody(100.0, state);

                            var n4 = performance.now();
                                                var state = wd.loopBody(200.0, state);



                            var n5 = performance.now();





                            return {"textArray": ["prepare", "init", "loopBody1", "loopBody2"], "timeArray": [n1, n2, n3, n4, n5] }


                            }

                            |},
          errorRate: 10,
        },
      ],
    },
    {
      name: "basic_light_geometrys_boxes",
      caseList: [
        {
          name: "create_150_basic_geometry+150_basic_boxGeometry+150_light_boxGeometry",
          bodyFuncStr: {|
                                     PrepareTool.prepareForTest();





                             return AssetTool.loadConfig(["./test/e2e/performance/config/setting1.json", "./test/e2e/performance/config/"], null, function(){ return initSample(wd.unsafeGetState()); });



                                 function initSample(state) {
                  var n1 = performance.now();

                  var data = BasicBoxesTool.createBoxesWithoutClone(150, state);

                  var state = data[0];
                  var boxes = data[1];

                  var data = BasicBoxesTool.setPosition(boxes, state);
                  var state = data[0];
                  var boxes = data[1];




                  var data = GeometryTool.createBasicTriangleWithoutClone(150, 10, state);

                  var state = data[0];
                  var boxes = data[1];

                  var data = PositionTool.setPosition(boxes, state);
                  var state = data[0];
                  var boxes = data[1];





                  var data = LightBoxesTool.createBoxesWithoutClone(150, state);

                  var state = data[0];
                  var boxes = data[1];

                  var data = LightBoxesTool.setPosition(boxes, state);
                  var state = data[0];
                  var boxes = data[1];







                  var state = LightTool.createLights([-10, 0, 20], [5, 0, 25], state);




                  var data = BasicBoxesTool.createCamera(state);
                  var state = data[0];



                                     var n2 = performance.now();

                                                         var state = wd.initDirector(state);




                                     var n3 = performance.now();
                                                         var state = wd.loopBody(100.0, state);




                                     var n4 = performance.now();



                                                         var state = wd.loopBody(200.0, state);




                                     var n5 = performance.now();



                            return {"textArray": ["prepare", "init", "loopBody1", "loopBody2"], "timeArray": [n1, n2, n3, n4, n5] };
                }
                 |},
          errorRate: 10,
        },
      ],
    },
    {
      name: "asset",
      caseList: [
        {
          name: "convertGLBToWDB_assembleWDB_generateWDB_truck",
          bodyFuncStr: {|
                              PrepareTool.prepareForTest();


               return AssetTool.loadConfig(["./test/e2e/performance/config/setting1.json", "./test/e2e/performance/config/"], null, function () {

               return AssetTool.loadGLB(
               "./test/e2e/asset/glb/CesiumMilkTruck.glb"
               )
               .then((glb) => {
                   var n1 = performance.now();

                   var wdb = wd.convertGLBToWDB(glb);

                   var n2 = performance.now();

                   var n3 = null;
                   var n4 = null;

                   return wd.assembleWholeWDB(wdb,
                   true, true, true, true, true,
                   wd.unsafeGetState())
                       .forEach(([state, _, sceneGameObject]) => {
                           n3 = performance.now();

                           var [state, _, wdb] = wd.generateWDB(sceneGameObject, wd.createSparseMap(), state);

                           n4 = performance.now();
                       })
                       .then(() => {
                           return { "textArray": ["convert", "assemble", "generate"], "timeArray": [n1, n2, n3, n4] };
                       })
                 })

               });
          |},
          errorRate: 10,
        },
      ],
    },
    {
      name: "event",
      caseList: [
        {
          name: "bind_trigger",
          bodyFuncStr: {|
            PrepareTool.prepareForTest();




            return AssetTool.loadConfig(["./test/e2e/performance/config/setting1.json", "./test/e2e/performance/config/"], null, function () {
                var state = wd.unsafeGetState();


                var [state, gameObject1] = wd.createGameObject(state);


                var state = wd.initDirector(state);

                var count = 500;

                var value = 2.5;

                var n1 = performance.now();


                for (var i = 0; i < count; i++) {
                    state =
                        wd.onMouseEvent(0, 0, (event, state) => {
                            return state;
                        }, state);


                    state =
                        wd.onCustomGameObjectEvent(
                            "a1", gameObject1, 0, (event, state) => {
                                value = value * 2.5 / 1.5;

                                return state;
                            }, state);

                    state =
                        wd.onCustomGameObjectEvent(
                            "a1", gameObject1, 1, (event, state) => {
                                value = value * 2.5 / 1.5;

                                return state;
                            }, state);
                }


                var n2 = performance.now();




                var state =
                    wd.triggerCustomGameObjectEvent(
                        wd.createCustomEvent("a1"),

                        gameObject1, state
                    );

                var n3 = performance.now();



                return { "textArray": ["bind", "trigger"], "timeArray": [n1, n2, n3] };
            });
|},
          errorRate: 10,
        },
      ],
    },
    {
      name: "imgui",
      caseList: [
        {
          name: "create_30_all_controls",
          bodyFuncStr: {|
                   PrepareTool.prepareForTest();

                    return AssetTool.loadConfig(["./test/e2e/performance/config/setting1.json", "./test/e2e/performance/config/"], null, function(){

                            return AssetTool.loadIMGUIAsset("./test/e2e/asset/font/Lato-Regular-64.fnt",
                                "./test/e2e/asset/font/lato.png",
                                [
                                    ["./test/e2e/asset/image/1.png", "1"],
                                    ["./test/e2e/asset/image/2.jpg", "2"]
                                ],
                                function (state) {
                                        var state = ImguiTool.testIMGUI(30, state);

                            var n1 = performance.now();

                                                var state = wd.initDirector(state);





                            var n2 = performance.now();
                                                var state = wd.loopBody(100.0, state);




                            var n3 = performance.now();





                            return {"textArray": ["init", "loopBody"], "timeArray": [n1, n2, n3] }

                                }, wd.unsafeGetState());
                    });

    |},
          errorRate: 10,
        },
      ],
    },
  ],
};