

import * as Path from "path";
import * as Curry from "./../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "./../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Process from "process";
import * as Wonder_jest from "./../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as TestTool$Wonderjs from "../../../../tool/TestTool.js";
import * as IMGUITool$Wonderjs from "../../../../tool/service/imgui/IMGUITool.js";
import * as AssetTool$WonderImgui from "./../../../../../../../node_modules/wonder-imgui/lib/es6_global/test/integration/tool/AssetTool.js";
import * as MainStateTool$Wonderjs from "../../../../tool/service/state/MainStateTool.js";
import * as IOIMGUITool$WonderImgui from "./../../../../../../../node_modules/wonder-imgui/lib/es6_global/test/integration/tool/IOIMGUITool.js";
import * as LoadIMGUIAssetTool$Wonderjs from "../tool/loadIMGUIAssetTool.js";

Wonder_jest.describe("load imgui asset", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var state = /* record */[/* contents */MainStateTool$Wonderjs.createState(/* () */0)];
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                state[0] = TestTool$Wonderjs.init(sandbox, undefined, undefined, /* () */0);
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        return Wonder_jest.testPromise("load bitmap image", undefined, (function (param) {
                      var param$1 = /* tuple */[
                        1,
                        2,
                        3,
                        4
                      ];
                      var handleWhenLoadingFunc = function (contentLength, filePath) {
                        return /* () */0;
                      };
                      var testFunc = function (bitmap, state) {
                        return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](AssetTool$WonderImgui.unsafeGetBitmap(IMGUITool$Wonderjs.getWonderIMGUIRecord(state))), bitmap));
                      };
                      var fntFilePath = Path.join(Process.cwd(), "./test/res/font/myFont.fnt");
                      var bitmapFilePath = Path.join(Process.cwd(), "./test/res/font/myFont.png");
                      var customTextureSourceSrc1 = "./test/res/image/1.jpg";
                      var customTextureSourceSrc2 = "./test/res/image/2.png";
                      var customTextureSourceDataArr = /* array */[
                        /* tuple */[
                          customTextureSourceSrc1,
                          "a1"
                        ],
                        /* tuple */[
                          customTextureSourceSrc2,
                          "a2"
                        ]
                      ];
                      IOIMGUITool$WonderImgui.buildFakeURL(sandbox[0]);
                      IOIMGUITool$WonderImgui.buildFakeLoadImage();
                      IOIMGUITool$WonderImgui.setFakeCreateObjectURLReturnBlob(/* () */0);
                      var fetch = IOIMGUITool$WonderImgui.buildFakeFetch(sandbox, fntFilePath, bitmapFilePath, /* tuple */[
                            param$1[0],
                            param$1[1],
                            param$1[2],
                            param$1[3]
                          ], customTextureSourceSrc1, customTextureSourceSrc2);
                      return LoadIMGUIAssetTool$Wonderjs.loadIMGUIAsset(fntFilePath, bitmapFilePath, customTextureSourceDataArr, /* tuple */[
                                    fetch,
                                    handleWhenLoadingFunc
                                  ], state[0]).then((function (state) {
                                    return Curry._2(testFunc, bitmapFilePath, state);
                                  }));
                    }));
      }));

export {
  
}
/*  Not a pure module */
