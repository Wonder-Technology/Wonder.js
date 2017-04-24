import { CompileConfig } from "../../../dist/commonjs/config/CompileConfig";
import * as sinon from "sinon";
import { fromArray } from "wonder-frp/dist/commonjs/global/Operator";
import { testTool } from "../testTool";
import { DeviceManager } from "../../../dist/commonjs/device/DeviceManager";
import { Main } from "../../../dist/commonjs/core/Main";
import { GPUDetector } from "../../../dist/commonjs/device/GPUDetector";
import { DomQuery } from "wonder-commonlib/dist/commonjs/utils/DomQuery";
import { DebugConfig } from "../../../dist/commonjs/config/DebugConfig";
import { EScreenSize } from "../../../dist/commonjs/device/EScreenSize";
import { RectRegion } from "../../../dist/commonjs/structure/RectRegion";

declare var window;

describe("Main", () =>  {
    var sandbox = null;

    beforeEach(() =>  {
        sandbox = sinon.sandbox.create();
    });
    afterEach(() =>  {
        testTool.clearInstance(sandbox);
        sandbox.restore();
    });

    describe("isTest", () => {
        describe("if it's true", () => {
            beforeEach(() => {
            });

            it("it will open wd-frp contract check", () => {
                sandbox.stub(Main, "isTest", false);

                expect(() => {
                    fromArray([1, 2]).take(-1);
                }).not.toThrow();

                sandbox.stub(Main, "isTest", true);

                expect(() => {
                    fromArray([1, 2]).take(-1);
                }).toThrow();
            });
            it("it will open wonder.js contract check", () => {
                sandbox.stub(Main, "isTest", false);

                expect(() => {
                    Main.init();
                }).not.toThrow("should set config before");

                sandbox.stub(Main, "isTest", true);

                expect(() => {
                    Main.init("should set config before");
                }).toThrow();
            });
        });
    });

    describe("test set config data", () => {
        var gl;
        var device;
        var canvasDom;

        function buildFakeDomQuery(canvasDom){
            return {
                    css:sandbox.stub(),
                    get:sandbox.stub().returns(canvasDom)
                };
        }

        beforeEach(() => {
            DeviceManager.getInstance().gl = testTool.buildFakeGl(sandbox);

            gl = DeviceManager.getInstance().gl;

            device = DeviceManager.getInstance();

            sandbox.stub(device, "setScreen");
            // sandbox.stub(GPUDetector.getInstance(), "detect");


            canvasDom = {
                style:{},
                width:1,
                height:2,
                getContext:sandbox.stub().returns(testTool.buildFakeGl(sandbox))
            };
        });

        describe("test set canvas id", () => {
            beforeEach(() => {
                sandbox.stub(DomQuery, "create");

                DomQuery.create.withArgs("#a").returns(buildFakeDomQuery(canvasDom));
                DomQuery.create.withArgs("body").returns(buildFakeDomQuery(canvasDom));
            });
            afterEach(() => {
            });

            it("support pass canvas id", () => {
                Main.setConfig({
                    canvasId:"a"
                });
                Main.init();

                expect(device.gl).toBeDefined();
            });
            it("support pass #canvasId", () => {
                Main.setConfig({
                    canvasId:"#a"
                });
                Main.init();

                expect(device.gl).toBeDefined();
            });
        });

        describe("set context config data", () => {
            beforeEach(() => {
                sandbox.stub(DomQuery, "create").returns(buildFakeDomQuery(canvasDom));
            });

            describe("set webgl context options", () => {
                it("test default value", () => {
                    Main.setConfig({
                        canvasId:"a"
                    });
                    Main.init();


                    expect(canvasDom.getContext).toCalledWith("webgl", {
                        alpha:true,
                        depth:true,
                        stencil:false,
                        antialias:true,
                        premultipliedAlpha:true,
                        preserveDrawingBuffer:false
                    });
                });

                it("can set webgl context options", () => {
                    Main.setConfig({
                        canvasId:"a",
                        contextConfig:{
                            options:{
                                stencil:true,
                                antialias:false,
                                premultipliedAlpha:true,
                                preserveDrawingBuffer:false
                            }
                        }
                    });
                    Main.init();


                    expect(canvasDom.getContext).toCalledWith("webgl", {
                        alpha:true,
                        depth:true,
                        stencil:true,
                        antialias:false,
                        premultipliedAlpha:true,
                        preserveDrawingBuffer:false
                    });
                });
            });
        });

        describe("set useDevicePixelRatio", () => {
            var devicePixelRatio;
            var screenWidth,
                screenHeight;

            beforeEach(() => {
                sandbox.stub(DomQuery, "create").returns(buildFakeDomQuery(canvasDom));

                devicePixelRatio = 2;
                window.devicePixelRatio = devicePixelRatio;

                screenWidth = 50;
                screenHeight = 60;
            });

            it("if true, set pixelRatio", () => {
                Main.setConfig({
                    screenSize:RectRegion.create(0,0,screenWidth,screenHeight),
                    canvasId:"a",
                    useDevicePixelRatio:true
                });
                Main.init();

                expect(canvasDom.width).toEqual(screenWidth * devicePixelRatio);
                expect(canvasDom.height).toEqual(screenHeight * devicePixelRatio);
            });
            it("else, not set it", () => {
                Main.setConfig({
                    screenSize:RectRegion.create(0,0,screenWidth,screenHeight),
                    canvasId:"a",
                    useDevicePixelRatio:false
                });
                Main.init();

                expect(canvasDom.width).toEqual(screenWidth);
                expect(canvasDom.height).toEqual(screenHeight);
            });
        });

        describe("set isTest", () => {
            beforeEach(() => {
            });

            it("if CompileConfig.closeContractTest === true, set isTest to be false", () => {
                sandbox.stub(CompileConfig, "closeContractTest", true);

                Main.setConfig({
                    isTest:true
                });

                expect(Main.isTest).toBeFalsy();
            });

            describe("else", () => {
                beforeEach(() => {
                    sandbox.stub(CompileConfig, "closeContractTest", false);
                });

                it("if not set by config, set isTest = DebugConfig.isTest", () => {
                    sandbox.stub(DebugConfig, "isTest", true);

                    Main.setConfig({
                    });

                    expect(Main.isTest).toBeTruthy();
                });
                it("else,, set isTest by config", () =>  {
                    sandbox.stub(DebugConfig, "isTest", true);

                    Main.setConfig({
                        isTest:false
                    });

                    expect(Main.isTest).toBeFalsy();
                });
            });
        });

        describe("setScreen", () => {
            var fakeDomQuery;

            beforeEach(() => {
                fakeDomQuery = buildFakeDomQuery(canvasDom);

                sandbox.stub(DomQuery, "create").returns(fakeDomQuery);

                testTool.stubGetter(sinon, canvasDom, "clientWidth", () => {
                    return canvasDom.width;
                });
                testTool.stubGetter(sinon, canvasDom, "clientHeight", () => {
                    return canvasDom.height;
                });

                sandbox.stub(window, "innerWidth", 100);
                sandbox.stub(window, "innerHeight", 200);
            });
            afterEach(() => {
            });

            it("support full screen", () => {
                var view = device.view;

                Main.setConfig({
                    screenSize:EScreenSize.FULL,
                    canvasId: "#event-test"
                }).init();


                var dom = canvasDom;

                expect(dom.style.cssText).toEqual("position:absolute;left:0;top:0;");
                expect(fakeDomQuery.css).toCalledWith("margin", "0");
                expect(view.x).toEqual(0);
                expect(view.y).toEqual(0);
                expect(view.width > 0).toBeTruthy();
                expect(view.height > 0).toBeTruthy();
                expect(dom.style.width).toEqual("100%");
                expect(dom.style.height).toEqual("100%");

                expect(device.gl.viewport).toCalledWith(0, 0, view.width, view.height);
                expect(device.gl.viewport).toCalledWith(0, 0, sinon.match.number, sinon.match.number);
            });
            it("support custom screen size and position", () => {
                var view = device.view;

                Main.setConfig({
                    screenSize:RectRegion.create(10, 0, 50, 100),
                    canvasId: "#event-test"
                }).init();

                expect(view.x).toEqual(10);
                expect(view.y).toEqual(0);
                expect(view.width).toEqual(50);
                expect(view.height).toEqual(100);
                expect(device.gl.viewport).toCalledWith(0, 0, view.width, view.height);
                expect(device.viewport).toEqual(RectRegion.create(0, 0, view.width, view.height));
                expect(canvasDom.style.left).toEqual("10px");
                expect(canvasDom.style.top).toEqual("0px");
            });
        });
    });
});

