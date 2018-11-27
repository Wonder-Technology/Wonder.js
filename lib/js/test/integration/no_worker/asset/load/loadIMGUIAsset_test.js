'use strict';

var Path = require("path");
var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Process = require("process");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var CamlinternalOO = require("bs-platform/lib/js/camlinternalOO.js");
var TestTool$Wonderjs = require("../../../../tool/TestTool.js");
var IMGUITool$Wonderjs = require("../../../../tool/service/imgui/IMGUITool.js");
var AssetTool$WonderImgui = require("wonder-imgui/lib/js/test/integration/tool/AssetTool.js");
var MainStateTool$Wonderjs = require("../../../../tool/service/state/MainStateTool.js");
var IOIMGUITool$WonderImgui = require("wonder-imgui/lib/js/test/integration/tool/IOIMGUITool.js");
var LoadIMGUIAssetTool$Wonderjs = require("../tool/loadIMGUIAssetTool.js");

var class_tables = [
  0,
  0,
  0
];

describe("load imgui asset", (function () {
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
        describe("load imgui asset", (function () {
                return Wonder_jest.testPromise("load bitmap image", (function () {
                              var param = /* tuple */[
                                1,
                                2,
                                3,
                                4
                              ];
                              var handleWhenLoadingFunc = function (_, _$1) {
                                if (!class_tables[0]) {
                                  var $$class = CamlinternalOO.create_table(0);
                                  var env_init = function () {
                                    return CamlinternalOO.create_object_opt(0, $$class);
                                  };
                                  CamlinternalOO.init_class($$class);
                                  class_tables[0] = env_init;
                                }
                                return Curry._1(class_tables[0], 0);
                              };
                              var testFunc = function (bitmap, state) {
                                return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](AssetTool$WonderImgui.unsafeGetBitmap(IMGUITool$Wonderjs.getWonderIMGUIRecord(state))), bitmap));
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
                              var fetch = IOIMGUITool$WonderImgui.buildFakeFetch(sandbox, fntFilePath, bitmapFilePath, /* tuple */[
                                    param[0],
                                    param[1],
                                    param[2],
                                    param[3]
                                  ], customTextureSourceSrc1, customTextureSourceSrc2);
                              return LoadIMGUIAssetTool$Wonderjs.loadIMGUIAsset(fntFilePath, bitmapFilePath, customTextureSourceDataArr, /* tuple */[
                                            fetch,
                                            handleWhenLoadingFunc
                                          ], state[0]).then((function (state) {
                                            return Curry._2(testFunc, bitmapFilePath, state);
                                          }));
                            }));
              }));
        return /* () */0;
      }));

/*  Not a pure module */
