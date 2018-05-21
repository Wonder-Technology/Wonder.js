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
      "./test/e2e/js/PositionTool.js",
      "./test/e2e/js/LightBoxesTool.js",
      "./test/e2e/js/LightTool.js",
      "./test/e2e/js/CameraTool.js",
      "./test/e2e/js/InstanceBasicBoxesTool.js",
      "./test/e2e/js/InstanceLightBoxesTool.js",
      "./test/e2e/js/RedoUndoTool.js",
      "./test/e2e/js/RandomTool.js",
      "./test/e2e/js/CustomGeometryTool.js",
      "./test/e2e/js/BasicMaterialTool.js",
      "./test/e2e/js/LightMaterialTool.js",
      "./test/e2e/js/TextureTool.js",
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
      name: "basic_box_map",
      bodyFuncStr: {|
                       ReplaceFetchTool.replaceFetchForTest();



                    return AssetTool.load(["./test/e2e/render/config/setting.json", "./test/e2e/render/config/"], null, function(){
                    }).then(() => {

                   return window.loadImage("./test/e2e/asset/1.png")
                   .then((imageDataArr) => {
                        return initSample(
                        TextureTool.buildArrayBufferViewSourceTextureFromImageDataArr(imageDataArr), wd.unsafeGetState());
                   });
                    })







                        function initSample(map1, state) {
                          RandomTool.stubMathRandom(10000);


                          var boxes = [];

                          var record = BasicBoxesTool.createBoxWithMap(map1, state);

                          var state = record[0];
                          var box = record[1];

                          var state = PositionTool.setGameObjectPosition(box, [10, 0, 0], state);


                          boxes.push(box);


                          var data = CameraTool.createCamera(state);
                          var state = data[0];
                          var camera = data[1];



                          var state = PositionTool.setGameObjectPosition(camera, [0, 20, 100], state);





                          return wd.startDirector(state);
                        }
          |},
      scriptFilePathList: None,
      distance: None,
      diffPercent: Some(0.00001),
      threshold: None,
      frameData: [{timePath: [16]}]
    }
  ]
};