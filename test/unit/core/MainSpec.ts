import { CompileConfig } from "../../../dist/commonjs/config/CompileConfig";
declare var window;

import * as sinon from "sinon";
import * as $ from "jquery";
import { fromArray } from "wonder-frp/dist/commonjs/global/Operator";
import { testTool } from "../testTool";
import { DeviceManager } from "../../../dist/commonjs/device/DeviceManager";
import { Main } from "../../../dist/commonjs/core/Main";
import { GPUDetector } from "../../../dist/commonjs/device/GPUDetector";
import { DomQuery } from "wonder-commonlib/dist/commonjs/utils/DomQuery";
import { DebugConfig } from "../../../dist/commonjs/config/DebugConfig";

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

        beforeEach(() => {
            sandbox.stub(DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));

            gl = DeviceManager.getInstance().gl;

            device = DeviceManager.getInstance();

            sandbox.stub(device, "setScreen");
            // sandbox.stub(GPUDetector.getInstance(), "detect");
        });

        describe("test set canvas id", () => {
            var canvas;

            beforeEach(() => {
                canvas = $("<canvas id='a'></canvas>");

                $("body").append(canvas);
            });
            afterEach(() => {
                canvas.remove();
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
                canvasDom = {
                    getContext:sandbox.stub().returns({})
                };
                sandbox.stub(DomQuery, "create").returns({
                    get:sandbox.stub().returns(canvasDom)
                });
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

            beforeEach(() => {
                canvasDom = {
                    width:1,
                    height:2,
                    getContext:sandbox.stub().returns({})
                };
                sandbox.stub(DomQuery, "create").returns({
                    get:sandbox.stub().returns(canvasDom)
                });

                devicePixelRatio = 2;
                window.devicePixelRatio = devicePixelRatio;
            });

            it("if true, set pixelRatio", () => {
                Main.setConfig({
                    canvasId:"a",
                    useDevicePixelRatio:true
                });
                Main.init();

                expect(canvasDom.width).toEqual(1 * devicePixelRatio);
                expect(canvasDom.height).toEqual(2 * devicePixelRatio);
            });
            it("else, not set it", () => {
                Main.setConfig({
                    canvasId:"a",
                    useDevicePixelRatio:false
                });
                Main.init();

                expect(canvasDom.width).toEqual(1);
                expect(canvasDom.height).toEqual(2);
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
    });
});

