open WonderRenderTest;

open RenderTestDataType;

let renderTestData = {
  commonData: {
    imagePath: "test/e2e/render/screenshot/",
    scriptFilePathList: [
      "./test/e2e/js/AssetTool.js",
      "./test/e2e/js/ReplaceFetchTool.js",
      "./test/e2e/js/ScheduleTool.js",
      "./test/e2e/js/BasicBoxesTool.js",
      "./test/e2e/js/LightBoxesTool.js",
      "./test/e2e/js/LightTool.js",
      "./test/e2e/js/CameraTool.js",
      "./test/e2e/js/InstanceBasicBoxesTool.js",
      "./test/e2e/js/InstanceLightBoxesTool.js",
      "./test/e2e/js/RedoUndoTool.js",
      "./test/e2e/js/RandomTool.js",
      "./dist/wd.js"
    ],
    replaceForDebug: (htmlStr) =>
      htmlStr
      |> Js.String.replaceByRe(
           [%re {|/\.\/test\/e2e\/render\/config\//g|}],
           "../../../../test/e2e/render/config/"
         )
  },
  testData: [
    {
      name: "basic_box",
      bodyFuncStr: {|
                    ReplaceFetchTool.replaceFetchForTest();

                    return AssetTool.load(["./test/e2e/render/config/setting.json", "./test/e2e/render/config/"], null, function(){
                        return initSample(wd.getState());
                    });

                    function initSample(state) {
                        var record = BasicBoxesTool.createBox(state);

                        var state = record[0];
                        var box = record[1];


                        var record = BasicBoxesTool.createCamera(state);
                        var state = record[0];
                        var camera = record[1];


                        var transform = wd.unsafeGetGameObjectTransformComponent(camera, state);

                        var state = wd.setTransformLocalPosition(transform, [0, 10, 30], state);

                        return wd.startDirector(state);
                    }
    |},
      scriptFilePathList: None,
      distance: None,
      diffPercent: Some(0.00001),
      threshold: None,
      frameData: [{timePath: [16]}]
    },
    {
      name: "instance_basic_box",
      bodyFuncStr: {|

                       ReplaceFetchTool.replaceFetchForTest();


                    return AssetTool.load(["./test/e2e/render/config/setting.json", "./test/e2e/render/config/"], null, function(){
                        return initSample(wd.getState());
                    });



                          function initSample(state) {
                          RandomTool.stubMathRandom(10000);

                          var record = InstanceBasicBoxesTool.createBoxes(1, 100, true, state);
                          var state = record[0];
                          var boxes = record[1];

                          var record = InstanceBasicBoxesTool.setPosition(boxes, state);
                          var state = record[0];
                          var boxes = record[1];

                          var record = InstanceBasicBoxesTool.createCamera(state);
                          var state = record[0];


                          return wd.startDirector(state);
                          }
          |},
      scriptFilePathList: None,
      distance: None,
      diffPercent: Some(0.00001),
      threshold: None,
      frameData: [{timePath: [16]}]
    },
    {
      name: "light_box",
      bodyFuncStr: {|
                       ReplaceFetchTool.replaceFetchForTest();



                    return AssetTool.load(["./test/e2e/render/config/setting.json", "./test/e2e/render/config/"], null, function(){
                        return initSample(wd.getState());
                    });







                       function initSample(state) {
                           var record = LightBoxesTool.createBox(state);

                           var state = record[0];
                           var box = record[1];



                               var state = LightTool.createLights([-10, 0, 20], [5,0,25], state);




                           var record = LightBoxesTool.createCamera(state);
                           var state = record[0];
                           var camera = record[1];


                           var transform = wd.unsafeGetGameObjectTransformComponent(camera, state);

                           var state = wd.setTransformLocalPosition(transform, [0, 0, 80], state);

                           return wd.startDirector(state);
                       }
       |},
      scriptFilePathList: None,
      distance: None,
      diffPercent: Some(0.00001),
      threshold: None,
      frameData: [{timePath: [16]}]
    },
    {
      name: "instance_light_box",
      bodyFuncStr: {|

                       ReplaceFetchTool.replaceFetchForTest();



                    return AssetTool.load(["./test/e2e/render/config/setting.json", "./test/e2e/render/config/"], null, function(){
                        return initSample(wd.getState());
                    });



                          function initSample(state) {
                          RandomTool.stubMathRandom(10000);

                          var record = InstanceLightBoxesTool.createBoxes(1, 100, true, state);
                          var state = record[0];
                          var boxes = record[1];

                          var record = InstanceLightBoxesTool.setPosition(boxes, state);
                          var state = record[0];
                          var boxes = record[1];





                               var state = LightTool.createLights([-100, 0, 100], [150,0,250], state);



                          var record = InstanceLightBoxesTool.createCamera(state);
                          var state = record[0];


                          return wd.startDirector(state);
                          }
          |},
      scriptFilePathList: None,
      distance: None,
      diffPercent: Some(0.00001),
      threshold: None,
      frameData: [{timePath: [16]}]
    },
    {
      name: "redo_undo",
      bodyFuncStr: {|
                       ReplaceFetchTool.replaceFetchForTest();



                    return AssetTool.load(["./test/e2e/render/config/setting.json", "./test/e2e/render/config/"], null, function(){
                        return initSample(wd.getState());
                    });


                          function initSample(state) {
                          RandomTool.stubMathRandom(10000);


                          var record = RedoUndoTool.createBoxesByInstance(10, state);
                          var state = record[0];
                          var box = record[1];

                          var record = RedoUndoTool.setPosition([box], state);
                          var state = record[0];
                          var boxes = record[1];

                          var record = RedoUndoTool.createCamera(state);
                          var state = record[0];



                          var state = RedoUndoTool.redoUndoShader(5, state);



                          return wd.startDirector(state);
                          }
          |},
      scriptFilePathList: None,
      distance: None,
      diffPercent: Some(0.00001),
      threshold: None,
      frameData: [{timePath: [16]}, {timePath: [16, 32]}, {timePath: [16, 32, 48]}]
    }
  ]
};