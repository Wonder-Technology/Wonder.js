open WonderBenchmark;

open PerformanceTestDataType;

let performanceTestData = {
  commonData: {
    isClosePage: true,
    execCountWhenTest: 20,
    execCountWhenGenerateBenchmark: 40,
    benchmarkPath: "./test/e2e/performance/benchmark/",
    scriptFilePathList: [
      "./dist/wd.js",
      "./test/e2e/performance/js/BasicBoxesTool.js",
      "./test/e2e/performance/js/CameraTool.js"
    ]
  },
  testDataList: [
    {
      name: "basic_boxes",
      caseList: [
        {
          name: "create_5k_boxes",
          bodyFuncStr: {|
                var state = wd.setMainConfig({
                    isTest: false
                });

                return initSample(state);



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
          scriptFilePathList: None,
          errorRate: 10
        },
        {
          name: "create_5k_boxes+transform",
          bodyFuncStr: {|
                var state = wd.setMainConfig({
                    isTest: false
                });

                return initSample(state);



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
          scriptFilePathList: None,
          errorRate: 10
        },
        {
          name: "create_5k_boxes+transform+set_parent",
          bodyFuncStr: {|
                var state = wd.setMainConfig({
                    isTest: false
                });

                return initSample(state);



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
          scriptFilePathList: None,
          errorRate: 10
        },
        {
          name: "create_dispose_1k_boxes",
          bodyFuncStr: {|
                         var state = wd.setMainConfig({
                             isTest: false
                         });

                         return initSample(state);



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



return {"errorRate": 10, "textArray": ["prepare", "init", "loopBody1", "loopBody2"], "timeArray": [n1, n2, n3, n4, n5] };
}

|},
          scriptFilePathList: None,
          errorRate: 10
        }
      ]
    }
  ]
};