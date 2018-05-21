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
      "./test/e2e/js/CustomGeometryTool.js",
      "./test/e2e/js/BasicMaterialTool.js",
      "./test/e2e/js/LightMaterialTool.js",
      "./test/e2e/js/InstanceBasicBoxesTool.js",
      "./test/e2e/js/InstanceLightBoxesTool.js",
      "./test/e2e/js/RedoUndoTool.js",
      "./test/e2e/js/RandomTool.js",
      "./test/e2e/js/TextureTool.js",
      "./test/e2e/performance/js/PrepareTool.js",
      "./dist/wd.js"
    ],
    replaceBodyFuncStrWhenDebug:
      Some(
        (bodyFuncStr) =>
          bodyFuncStr
          |> Js.String.replaceByRe(
               [%re {|/\.\/test\/e2e\//g|}],
               "../../../../test/e2e/"
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
                           PrepareTool.prepareForTest();



                           return AssetTool.load(["./test/e2e/performance/config/setting1.json", "./test/e2e/performance/config/"], null, function(){




                   return window.loadImage("./test/e2e/asset/1.png")
                   .then((imageDataArr) => {
                        return initSample(
                        TextureTool.buildArrayBufferViewSourceTextureFromImageDataArr(imageDataArr), wd.unsafeGetState());
                   });




                           });


                       function initSample(map1, state) {
       var n1 = performance.now();

                          var record = BasicBoxesTool.createBoxWithMap(map1, state);

                          var state = record[0];
                          var box = record[1];

                          var state = PositionTool.setGameObjectPosition(box, [10, 0, 0], state);

                          var boxes = [];

                          boxes.push(box);


                          var data = CameraTool.createCamera(state);
                          var state = data[0];
                          var camera = data[1];



                          var state = PositionTool.setGameObjectPosition(camera, [0, 20, 100], state);


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
        }
      ]
    }
  ]
};