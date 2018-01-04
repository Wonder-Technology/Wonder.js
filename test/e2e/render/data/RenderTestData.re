open WonderRenderTest;

open RenderTestDataType;

let renderTestData = {
  commonData: {
    imagePath: "test/e2e/render/image/",
    scriptFilePathList: [
      "./test/e2e/render/js/BasicBoxesTool.js",
      "./test/e2e/render/js/CameraTool.js",
      "./dist/wd.js"
    ]
  },
  testData: [
    {
      name: "basic_box",
      bodyFuncStr: {|
                    var state = wd.setMainConfig({
                        isTest: false
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
      diffPercent: None,
      threshold: None,
      frameData: [{timePath: [10]}]
    }
  ]
};