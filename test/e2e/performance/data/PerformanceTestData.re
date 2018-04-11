open WonderBenchmark;

open PerformanceTestDataType;

let performanceTestData = {
  commonData: {
    isClosePage: true,
    execCountWhenTest: 1,
    execCountWhenGenerateBenchmark: 1,
    compareCount: 1,
    maxAllowDiffTimePercent: 50,
    maxAllowDiffMemoryPercent: 150,
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
      "./test/e2e/js/CustomGeometryTool.js",
      "./test/e2e/js/BasicMaterialTool.js",
      "./test/e2e/js/LightMaterialTool.js",
      "./test/e2e/js/InstanceBasicBoxesTool.js",
      "./test/e2e/js/InstanceLightBoxesTool.js",
      "./test/e2e/js/RedoUndoTool.js",
      "./test/e2e/js/RandomTool.js",
      "./dist/wd.js"
    ],
    replaceBodyFuncStrWhenDebug:
      Some(
        (bodyFuncStr) =>
          bodyFuncStr
          |> Js.String.replaceByRe(
               [%re {|/\.\/test\/e2e\/performance\/config\//g|}],
               "../../../../test/e2e/performance/config/"
             )
      )
  },
  testDataList: [
    {
      name: "basic_boxes",
      caseList: [
        {
          name: "create_5k_boxes",
          bodyFuncStr: {|
                           ReplaceFetchTool.replaceFetchForTest();


                           return AssetTool.load(["./test/e2e/performance/config/setting1.json", "./test/e2e/performance/config/"], null, function(){
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
          errorRate: 10
        },
        {
          name: "create_5k_boxes+transform",
          bodyFuncStr: {|
                              ReplaceFetchTool.replaceFetchForTest();





                      return AssetTool.load(["./test/e2e/performance/config/setting1.json", "./test/e2e/performance/config/"], null, function(){ return initSample(wd.unsafeGetState()); });



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
          errorRate: 10
        },
        {
          name: "create_5k_boxes+transform+set_parent",
          bodyFuncStr: {|
                              ReplaceFetchTool.replaceFetchForTest();






                              return AssetTool.load(["./test/e2e/performance/config/setting1.json", "./test/e2e/performance/config/"], null, function(){
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
          errorRate: 10
        },
        {
          name: "create_dispose_1k_boxes",
          bodyFuncStr: {|
                              ReplaceFetchTool.replaceFetchForTest();





                              return AssetTool.load(["./test/e2e/performance/config/setting1.json", "./test/e2e/performance/config/"], null, function(){
                                  return initSample(wd.unsafeGetState());
                              });




                                              function initSample(state) {
                              var n1 = performance.now();

                                                  var data = BasicBoxesTool.createBoxesByClone(1, state);

                                                  var state = data[0];
                                                  var boxes = data[1];

                                                  var data = BasicBoxesTool.setPosition(boxes, state);
                                                  var state = data[0];
                                                  var boxes = data[1];

                                                  var data = BasicBoxesTool.createCamera(state);



                                                  var state = data[0];


                                                  var state = BasicBoxesTool.createAndDisposeGameObjects(1000, boxes, state);




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
          errorRate: 10
        },
        {
          name: "create_dispose_1k_cloned_boxes",
          bodyFuncStr: {|
                              ReplaceFetchTool.replaceFetchForTest();





                              return AssetTool.load(["./test/e2e/performance/config/setting1.json", "./test/e2e/performance/config/"], null, function(){
                                  return initSample(wd.unsafeGetState());
                              });




                                              function initSample(state) {
                              var n1 = performance.now();

                                                  var data = BasicBoxesTool.createBoxesByClone(1, state);

                                                  var state = data[0];
                                                  var boxes = data[1];

                                                  var data = BasicBoxesTool.setPosition(boxes, state);
                                                  var state = data[0];
                                                  var boxes = data[1];

                                                  var data = BasicBoxesTool.createCamera(state);



                                                  var state = data[0];


                                                  var state = BasicBoxesTool.createAndDisposeClonedGameObjects(1000, boxes, state);




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
          errorRate: 10
        }
      ]
    },
    {
      name: "basic_triangles",
      caseList: [
        {
          name: "create_dispose_1k_triangles",
          bodyFuncStr: {|
                              ReplaceFetchTool.replaceFetchForTest();





                              return AssetTool.load(["./test/e2e/performance/config/setting1.json", "./test/e2e/performance/config/"], null, function(){
                                  return initSample(wd.unsafeGetState());
                              });




                                              function initSample(state) {
        var n1 = performance.now();

        var data = CustomGeometryTool.createBasicTriangleByClone(1, 10, state);

        var state = data[0];
        var boxes = data[1];

        var data = PositionTool.setPosition(boxes, state);
        var state = data[0];
        var boxes = data[1];

        var data = BasicBoxesTool.createCamera(state);



        var state = data[0];


        var state = CustomGeometryTool.createAndDisposeGameObjects(1000, boxes, state);










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
          errorRate: 10
        }
      ]
    },
    {
      name: "instance_basic_boxes",
      caseList: [
        {
          name: "static_hardware_create_100k_boxes",
          bodyFuncStr: {|
                           ReplaceFetchTool.replaceFetchForTest();





                   return AssetTool.load(["./test/e2e/performance/config/setting1.json", "./test/e2e/performance/config/"], null, function(){ return initSample(wd.unsafeGetState()); });



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
          errorRate: 10
        },
        {
          name: "static_batch_create_5k_boxes",
          bodyFuncStr: {|
                           ReplaceFetchTool.replaceFetchForTest();



                   return AssetTool.load(["./test/e2e/performance/config/setting2.json", "./test/e2e/performance/config/"], null, function(){ return initSample(wd.unsafeGetState()); });



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
          errorRate: 10
        },
        {
          name: "dynamic_hardware_create_10k_boxes+transform",
          bodyFuncStr: {|
                           ReplaceFetchTool.replaceFetchForTest();





                   return AssetTool.load(["./test/e2e/performance/config/setting1.json", "./test/e2e/performance/config/"], null, function(){ return initSample(wd.unsafeGetState()); });



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
          errorRate: 10
        },
        {
          name: "dynamic_hardware_create_10k_boxes+transform+set_parent",
          bodyFuncStr: {|
                           ReplaceFetchTool.replaceFetchForTest();





                   return AssetTool.load(["./test/e2e/performance/config/setting1.json", "./test/e2e/performance/config/"], null, function(){ return initSample(wd.unsafeGetState()); });



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
          errorRate: 10
        },
        {
          name: "dynamic_hardware_create_dispose_200(sourceInstance box)*5(objectInstance box)",
          bodyFuncStr: {|
                           ReplaceFetchTool.replaceFetchForTest();





                   return AssetTool.load(["./test/e2e/performance/config/setting1.json", "./test/e2e/performance/config/"], null, function(){ return initSample(wd.unsafeGetState()); });



                                  function initSample(state) {
                  var n1 = performance.now();

                                  var data = InstanceBasicBoxesTool.createBoxes(1, 1, false, state);

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
          errorRate: 10
        },
        {
          name: "dynamic_hardware_create_dispose_1[(sourceInstance box)*2k(objectInstance box)",
          bodyFuncStr: {|
                           ReplaceFetchTool.replaceFetchForTest();





                   return AssetTool.load(["./test/e2e/performance/config/setting1.json", "./test/e2e/performance/config/"], null, function(){ return initSample(wd.unsafeGetState()); });



                                  function initSample(state) {
                  var n1 = performance.now();

                                  var data = InstanceBasicBoxesTool.createBoxes(1, 1, false, state);

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
          errorRate: 10
        }
      ]
    },
    {
      name: "light_boxes",
      caseList: [
        {
          name: "create_3k_boxes",
          bodyFuncStr: {|
                           ReplaceFetchTool.replaceFetchForTest();





                   return AssetTool.load(["./test/e2e/performance/config/setting1.json", "./test/e2e/performance/config/"], null, function(){ return initSample(wd.unsafeGetState()); });



                       function initSample(state) {
       var n1 = performance.now();

                           var data = LightBoxesTool.createBoxesByClone(3000, state);

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
          errorRate: 10
        },
        {
          name: "create_dispose_1k_boxes",
          bodyFuncStr: {|
                           ReplaceFetchTool.replaceFetchForTest();





                   return AssetTool.load(["./test/e2e/performance/config/setting1.json", "./test/e2e/performance/config/"], null, function(){ return initSample(wd.unsafeGetState()); });



                                           function initSample(state) {
                           var n1 = performance.now();

                                               var data = LightBoxesTool.createBoxesByClone(1, state);

                                               var state = data[0];
                                               var boxes = data[1];

                                               var data = LightBoxesTool.setPosition(boxes, state);
                                               var state = data[0];
                                               var boxes = data[1];




                                   var state = LightTool.createLights([-10, 0, 20], [5,0,25], state);


                                               var data = LightBoxesTool.createCamera(state);



                                               var state = data[0];


                                               var state = LightBoxesTool.createAndDisposeGameObjects(1000, boxes, state);




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
          errorRate: 10
        }
      ]
    },
    {
      name: "instance_light_boxes",
      caseList: [
        {
          name: "static_hardware_create_50k_boxes",
          bodyFuncStr: {|
                           ReplaceFetchTool.replaceFetchForTest();





                   return AssetTool.load(["./test/e2e/performance/config/setting1.json", "./test/e2e/performance/config/"], null, function(){ return initSample(wd.unsafeGetState()); });



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
          errorRate: 10
        },
        {
          name: "static_batch_create_3k_boxes",
          bodyFuncStr: {|
                           ReplaceFetchTool.replaceFetchForTest();


                   return AssetTool.load(["./test/e2e/performance/config/setting2.json", "./test/e2e/performance/config/"], null, function(){ return initSample(wd.unsafeGetState()); });



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
          errorRate: 10
        },
        {
          name: "dynamic_hardware_create_5k_boxes+transform",
          bodyFuncStr: {|
                           ReplaceFetchTool.replaceFetchForTest();





                   return AssetTool.load(["./test/e2e/performance/config/setting1.json", "./test/e2e/performance/config/"], null, function(){ return initSample(wd.unsafeGetState()); });



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
          errorRate: 10
        },
        {
          name: "dynamic_hardware_create_dispose_100(sourceInstance box)*4(objectInstance box)",
          bodyFuncStr: {|
                           ReplaceFetchTool.replaceFetchForTest();





                   return AssetTool.load(["./test/e2e/performance/config/setting1.json", "./test/e2e/performance/config/"], null, function(){ return initSample(wd.unsafeGetState()); });



                                  function initSample(state) {
                  var n1 = performance.now();

                                  var data = InstanceLightBoxesTool.createBoxes(1, 1, false, state);

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
          errorRate: 10
        },
        {
          name: "dynamic_hardware_create_dispose_1[(sourceInstance box)*1k(objectInstance box)",
          bodyFuncStr: {|
                           ReplaceFetchTool.replaceFetchForTest();





                   return AssetTool.load(["./test/e2e/performance/config/setting1.json", "./test/e2e/performance/config/"], null, function(){ return initSample(wd.unsafeGetState()); });



                                  function initSample(state) {
                  var n1 = performance.now();

                                  var data = InstanceLightBoxesTool.createBoxes(1, 1, false, state);

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
          errorRate: 10
        }
      ]
    },
    {
      name: "basic_light_geometrys_boxes",
      caseList: [
        {
          name: "create_1k_basic_customGeometry+1k_basic_boxGeometry+1k_light_boxGeometry",
          bodyFuncStr: {|
                           ReplaceFetchTool.replaceFetchForTest();





                   return AssetTool.load(["./test/e2e/performance/config/setting1.json", "./test/e2e/performance/config/"], null, function(){ return initSample(wd.unsafeGetState()); });



                       function initSample(state) {
        var n1 = performance.now();

        var data = BasicBoxesTool.createBoxesWithoutClone(1000, state);

        var state = data[0];
        var boxes = data[1];

        var data = BasicBoxesTool.setPosition(boxes, state);
        var state = data[0];
        var boxes = data[1];




        var data = CustomGeometryTool.createBasicTriangleWithoutClone(1000, 10, state);

        var state = data[0];
        var boxes = data[1];

        var data = PositionTool.setPosition(boxes, state);
        var state = data[0];
        var boxes = data[1];





        var data = LightBoxesTool.createBoxesWithoutClone(1000, state);

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
          errorRate: 10
        },
        {
          name: "create_dispose_1k_boxes",
          bodyFuncStr: {|
                           ReplaceFetchTool.replaceFetchForTest();





                   return AssetTool.load(["./test/e2e/performance/config/setting1.json", "./test/e2e/performance/config/"], null, function(){ return initSample(wd.unsafeGetState()); });



                                           function initSample(state) {
                           var n1 = performance.now();

                                               var data = LightBoxesTool.createBoxesByClone(1, state);

                                               var state = data[0];
                                               var boxes = data[1];

                                               var data = LightBoxesTool.setPosition(boxes, state);
                                               var state = data[0];
                                               var boxes = data[1];




                                   var state = LightTool.createLights([-10, 0, 20], [5,0,25], state);


                                               var data = LightBoxesTool.createCamera(state);



                                               var state = data[0];


                                               var state = LightBoxesTool.createAndDisposeGameObjects(1000, boxes, state);




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
          errorRate: 10
        }
      ]
    },
    {
      name: "redo_undo",
      caseList: [
        {
          name: "copy_1k_boxes(objectInstance)+restore_from_1k_boxes(not instance)_1k_boxes(objectInstance)",
          bodyFuncStr: {|
                           ReplaceFetchTool.replaceFetchForTest();





                   return AssetTool.load(["./test/e2e/performance/config/setting1.json", "./test/e2e/performance/config/"], null, function(){ return initSample(wd.unsafeGetState()); });



                                  function initSample(state) {
                  var n1 = performance.now();


                                  var data = RedoUndoTool.createBoxesByInstance(1000, state);
                                      var state = data[0];
                                      var box = data[1];

                                      var data = RedoUndoTool.setPosition([box], state);
                                      var state = data[0];
                                      var boxes = data[1];

                                      var data = RedoUndoTool.createCamera(state);
                                      var state = data[0];



                                      var state = RedoUndoTool.redoUndoShader(1000, state);


                  var n2 = performance.now();

                                      var state = wd.initDirector(state);





                  var n3 = performance.now();
                                      var state = wd.loopBody(100.0, state);




                  var n4 = performance.now();





                  return {"textArray": ["prepare", "init", "loopBody"], "timeArray": [n1, n2, n3, n4] }
                  }
                  |},
          errorRate: 10
        }
      ]
    }
  ]
};