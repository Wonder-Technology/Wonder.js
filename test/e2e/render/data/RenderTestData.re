open WonderRenderTest;

open RenderTestDataType;

let renderTestData = {
  commonData: {
    imagePath: "test/e2e/render/screenshot/",
    scriptFilePathList: [
      "./test/e2e/js/BasicBoxesTool.js",
      "./test/e2e/js/CameraTool.js",
      "./test/e2e/js/InstanceBasicBoxesTool.js",
      "./test/e2e/js/RedoUndoTool.js",
      "./dist/wd.js"
    ]
  },
  testData: [
    {
      name: "basic_box",
      bodyFuncStr: {|
                    var state = wd.setMainConfig({
                        isDebug: false
                    });

                    return initSample(state);



                    function initSample(state) {
                        var data = BasicBoxesTool.createBox(state);

                        var state = data[0];
                        var box = data[1];


                        var data = BasicBoxesTool.createCamera(state);
                        var state = data[0];
                        var camera = data[1];


                        var transform = wd.getGameObjectTransformComponent(camera, state);

                        var state = wd.setTransformLocalPosition(transform, [0, 10, 30], state);

                        return wd.startDirector(state);
                    }
    |},
      scriptFilePathList: None,
      distance: None,
      diffPercent: Some(0.001),
      threshold: None,
      frameData: [{timePath: [16]}]
    },
    {
      name: "instance_basic_box",
      bodyFuncStr: {|
                    var state = wd.setMainConfig({
                        isDebug: false
                    });

                    return initSample(state);



                    function initSample(state) {
                    var data = InstanceBasicBoxesTool.createBoxes(1, 100, true, state);
                    var state = data[0];
                    var boxes = data[1];

                    var data = InstanceBasicBoxesTool.setPosition(boxes, state);
                    var state = data[0];
                    var boxes = data[1];

                    var data = InstanceBasicBoxesTool.createCamera(state);
                    var state = data[0];


                    return wd.startDirector(state);
                    }
    |},
      scriptFilePathList: None,
      distance: None,
      diffPercent: Some(0.001),
      threshold: None,
      frameData: [{timePath: [16]}]
    },
    {
      name: "redo_undo",
      bodyFuncStr: {|
                    var state = wd.setMainConfig({
                        isDebug: false
                    });

                    return initSample(state);



                    function initSample(state) {


                var data = RedoUndoTool.createBoxesByInstance(10, state);
                    var state = data[0];
                    var box = data[1];

                    var data = RedoUndoTool.setPosition([box], state);
                    var state = data[0];
                    var boxes = data[1];

                    var data = RedoUndoTool.createCamera(state);
                    var state = data[0];



                    var state = RedoUndoTool.redoUndoShader(state);



                    return wd.startDirector(state);
                    }
    |},
      scriptFilePathList: None,
      distance: None,
      diffPercent: Some(0.001),
      threshold: None,
      frameData: [{timePath: [16]}, {timePath: [32]}, {timePath: [48]}]
    }
  ]
};