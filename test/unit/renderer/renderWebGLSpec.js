describe("renderWebGL", function() {
    var sandbox = null;
    var renderer = null;
    var deviceManager = null;

    function getGL(){
        return wd.DeviceManager.getInstance().gl;
    }

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        renderer = wd.WebGLRenderer.create();
        deviceManager = wd.DeviceManager.getInstance();
        sandbox.stub(wd.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));
    });
    afterEach(function () {
        testTool.clearInstance();
        sandbox.restore();
    });

    describe("init", function(){
        it("set clearColorOptions to color:#000000, alpha:1", function(){
            renderer.init();

            expect(renderer._clearOptions.color).toEqual(
                wd.Color.create("#000000")
            );
        });
        it("init depthTest, blend, colorWrite, side, depthWrite", function(){
            var gl = getGL();

            renderer.init();

            expect(deviceManager.depthTest).toBeTruthy();
            expect(deviceManager.blend).toBeFalsy();
            expect(gl.blendFunc).not.toCalled();
            expect(gl.blendEquation).not.toCalled();
            expect(gl.colorMask).toCalledOnce();
            expect(deviceManager.side).toEqual(wd.ESide.FRONT);
            expect(gl.cullFace).toCalledWith(gl.BACK);
            expect(deviceManager.depthWrite).toBeTruthy();
        });
    });

    describe("clear", function(){
        it("clear by clearOptions", function(){
            sandbox.stub(deviceManager, "clear");

            renderer.clear();

            expect(deviceManager.clear).toCalledWith(renderer._clearOptions);
        });
    });

    describe("render", function(){
        var gl, program;

        function addCommand(){
            var quadCmd;

            quadCmd = new wd.RenderCommand();

            quadCmd.execute = sandbox.stub();

            renderer.addCommand(quadCmd);

            return {
                quadCmd:quadCmd
            }
        }

        beforeEach(function(){
            gl = {
                TRIANGLES:"TRIANGLES",
                ARRAY_BUFFER:"ARRAY_BUFFER",
                ELEMENT_ARRAY_BUFFER: "ELEMENT_ARRAY_BUFFER",
                UNSIGNED_SHORT: "UNSIGNED_SHORT",

                bindBuffer:sandbox.stub(),
                bufferData:sandbox.stub(),
                drawElements:sandbox.stub(),
                drawArrays:sandbox.stub(),
                createBuffer:sandbox.stub().returns({})
            };
            testTool.extend(wd.DeviceManager.getInstance().gl, gl);
            gl = wd.DeviceManager.getInstance().gl;

            program = {
                setAttributeData:sandbox.stub(),
                setUniformData:sandbox.stub(),
                initWithShader:sandbox.stub(),
                isChangeShader:sandbox.stub(),
                use:sandbox.stub()
            };
        });

        it("fist, render opaque commands;then lock depth buffer and render sorted transparent commands; then unlock depth buffer", function(){
            var result1 = addCommand();
            var result2 = addCommand();
            var result3 = addCommand();
            var result4 = addCommand();
            var quad1 = result1.quadCmd,
                quad2 = result2.quadCmd,
                quad3 = result3.quadCmd,
                quad4 = result4.quadCmd;

            quad1.blend = true;
            quad2.blend = true;
            quad3.blend = false;
            quad4.blend = false;

            sandbox.stub(wd.Director.getInstance().scene, "currentCamera", testTool.createCamera(wd.Vector3.create(0, 0, 10)));

            var depthWriteArr = [];
            testTool.stubGetterSetter(sinon, wd.DeviceManager.prototype, "depthWrite", null, function(val){
                depthWriteArr.push(val);
            });

            quad1.z = 8;
            quad2.z = 7;
            quad3.z = 2;
            quad4.z = -1;

            renderer.render();

            expect(quad3.execute).toCalledBefore(quad4.execute);
            expect(quad4.execute).toCalledBefore(quad2.execute);
            expect(quad2.execute).toCalledBefore(quad1.execute);
            expect(depthWriteArr).toEqual([
                false, true
            ]);
        });

        it("execute renderCommand", function(){
            var result1 = addCommand();
            var result2 = addCommand();
            var quad1 = result1.quadCmd,
                quad2 = result2.quadCmd;

            renderer.render();

            expect(quad1.execute).toCalledOnce();
            expect(quad2.execute).toCalledOnce();
            expect(quad1.execute).toCalledBefore(quad2.execute);
        });

        describe("if skyboxCommand exist, execute skyboxCommand", function(){
            it("set depthFunc to be LEQUAL, then execute skyboxCommand, then restore depthFunc to be LESS", function(){
                var depthFuncValArr = [];
                var stub = sandbox.stub();

                testTool.stubGetterSetter(sinon, wd.DeviceManager.prototype, "depthFunc", null, function(val){
                        depthFuncValArr.push(val);
                    });
                var cmd = {
                    dispose:sandbox.stub(),
                    execute: sandbox.stub()
                };
                renderer.skyboxCommand = cmd;

                renderer.render();

                expect(depthFuncValArr).toEqual([
                    "LEQUAL", "LESS"
                ]);
                expect(cmd.execute).toCalledOnce();
            });
        });

        describe("clear command", function(){
            it("dispose command", function () {
                var result = addCommand();
                sandbox.stub(result.quadCmd, "dispose");

                renderer.render();

                expect(result.quadCmd.dispose).toCalledOnce();
            });
            it("clear command queue", function () {
                var result = addCommand();

                renderer.render();

                expect(renderer._commandQueue.getCount()).toEqual(0);
            });
            it("dispose and clear skybox command", function () {
                var skyboxCommand = {
                    execute:sandbox.stub(),
                    dispose:sandbox.stub()
                }
                renderer.skyboxCommand = skyboxCommand;

                renderer.render();

                expect(skyboxCommand.dispose).toCalledOnce();
                expect(renderer.skyboxCommand).toBeNull();
            });
        });
    });

    describe("hasCommand", function(){
        beforeEach(function(){

        });

        it("if has skyboxCommand, return true", function(){
            renderer.skyboxCommand = wd.QuadCommand.create();

            expect(renderer.hasCommand()).toBeTruthy();
        });
        it("if has QuadCommand, return true", function(){
            renderer.skyboxCommand = null;
            renderer.addCommand(wd.QuadCommand.create());

            expect(renderer.hasCommand()).toBeTruthy();
        });
        it("else, return false", function(){
            expect(renderer.hasCommand()).toBeFalsy();
        });
    });
});
