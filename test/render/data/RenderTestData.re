open WonderRenderTest;

open RenderTestDataType;

let renderTestData = {
  commonData: {
    scriptFilePathList: [
      "./test/render/js/BasicBoxesTool.js",
      "./test/render/js/CameraTool.js",
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
      imagePath: "test/render/image/",
      scriptFilePathList: None,
      distance: None,
      diffPercent: None,
      threshold: None,
      frameData: [{timePath: [10]}]
    }
  ]
};