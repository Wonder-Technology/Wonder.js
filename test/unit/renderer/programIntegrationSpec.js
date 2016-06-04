describe("program integration test", function() {
    var program = null;
    var gl = null;
    var device;
    var sandbox;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        device = wd.DeviceManager.getInstance();
        sandbox.stub(device, "gl", testTool.buildFakeGl(sandbox));
        gl = device.gl;

        program = new wd.Program();
    });
    afterEach(function () {
        sandbox.restore();
        testTool.clearInstance(sandbox);
    });
    
    describe("send all buffers together", function() {
        beforeEach(function () {
        });

        describe("test cache", function () {
            var buffer1, buffer2;
            var pos1, pos2;

            beforeEach(function () {
                buffer1 = wd.ArrayBuffer.create([1, 2, 3], 3, wd.EBufferType.UNSIGNED_SHORT);
                buffer2 = wd.ArrayBuffer.create([2, 3, 4], 3, wd.EBufferType.UNSIGNED_SHORT);
                pos1 = 1;
                gl.getAttribLocation.withArgs(sinon.match.any, "a_position").returns(pos1);
                pos2 = 2;
                gl.getAttribLocation.withArgs(sinon.match.any, "a_texCoord").returns(pos2);

                sandbox.spy(program._sender, "sendBuffer");
            });

            it("if switch program, clear cache and send it and enableVertexAttribArray location", function () {
                program.sendAttributeData("a_position", wd.EVariableType.BUFFER, buffer1);
                program.sendAttributeData("a_texCoord", wd.EVariableType.BUFFER, buffer2);


                program.sendAllBufferData();


                expect(program._sender.sendBuffer).toCalledTwice();
                expect(gl.enableVertexAttribArray.callCount).toEqual(2);


                var program2 = wd.Program.create();
                program2.use();

                program.use();


                program.sendAttributeData("a_position", wd.EVariableType.BUFFER, buffer1);
                program.sendAttributeData("a_texCoord", wd.EVariableType.BUFFER, buffer2);


                program.sendAllBufferData();


                expect(program._sender.sendBuffer.callCount).toEqual(4);
                expect(gl.enableVertexAttribArray.callCount).toEqual(4);
            });

            it("if last send buffers equal current send buffers, not send again", function () {
                program.sendAttributeData("a_position", wd.EVariableType.BUFFER, buffer1);
                program.sendAttributeData("a_texCoord", wd.EVariableType.BUFFER, buffer2);


                program.sendAllBufferData();


                expect(program._sender.sendBuffer).toCalledTwice();


                program.sendAttributeData("a_position", wd.EVariableType.BUFFER, buffer1);
                program.sendAttributeData("a_texCoord", wd.EVariableType.BUFFER, buffer2);


                program.sendAllBufferData();


                expect(program._sender.sendBuffer).toCalledTwice();
            });
            it("else, send", function () {
                program.sendAttributeData("a_position", wd.EVariableType.BUFFER, buffer1);
                program.sendAttributeData("a_texCoord", wd.EVariableType.BUFFER, buffer2);


                program.sendAllBufferData();


                expect(program._sender.sendBuffer).toCalledTwice();


                program.sendAttributeData("a_position", wd.EVariableType.BUFFER, buffer2);
                program.sendAttributeData("a_texCoord", wd.EVariableType.BUFFER, buffer1);


                program.sendAllBufferData();


                expect(program._sender.sendBuffer.callCount).toEqual(4);
            });
        });

        describe("if hardware support vao", function(){
            var extensionVAO;
            var vao;
            var vaoManager;
            var buffer1,buffer2;
            var pos1,pos2;

            beforeEach(function(){
                vao = {};
                
                extensionVAO = {
                bindVertexArrayOES:sandbox.stub(),
                    createVertexArrayOES:sandbox.stub().returns(vao)
                };

                wd.GPUDetector.getInstance().extensionVAO = extensionVAO;

                testTool.openContractCheck(sandbox);



                buffer1 = wd.ArrayBuffer.create([1, 2, 3], 3, wd.EBufferType.UNSIGNED_SHORT);
                buffer2 = wd.ArrayBuffer.create([2, 3, 4], 3, wd.EBufferType.UNSIGNED_SHORT);
                pos1 = 1;
                gl.getAttribLocation.withArgs(sinon.match.any, "a_position").returns(pos1);
                pos2 = 2;
                gl.getAttribLocation.withArgs(sinon.match.any, "a_texCoord").returns(pos2);

                vaoManager = wd.VAOManager.create();
                vaoManager.init();
            });

            describe("test cache miss", function(){
                beforeEach(function(){
                    program.sendAttributeData("a_position", wd.EVariableType.BUFFER, buffer1);
                    program.sendAttributeData("a_texCoord", wd.EVariableType.BUFFER, buffer2);
                });

                it("bind vao", function () {
                    program.sendAllBufferData(vaoManager);

                    expect(extensionVAO.bindVertexArrayOES).toCalledWith(vao);
                });
                it("clear BufferTable.lastBindedElementBuffer to ensure that the index buffer should be binded after bind vao", function () {
                    wd.BufferTable.lastBindedElementBuffer = {};

                    program.sendAllBufferData(vaoManager);

                    expect(wd.BufferTable.lastBindedElementBuffer).toBeNull();
                });
                it("if the vao is not setted, bind and vertexAttribPointer the array buffers", function () {
                    program.sendAllBufferData(vaoManager);

                    var bindBufferCallCount = gl.bindBuffer.callCount;

                    expect(gl.bindBuffer.getCall(bindBufferCallCount - 1 - 1)).toCalledWith(gl.ARRAY_BUFFER, buffer1.buffer);
                    expect(gl.vertexAttribPointer.getCall(0)).toCalledWith(pos1, buffer1.size);
                    expect(gl.enableVertexAttribArray.getCall(0)).toCalledWith(pos1);

                    expect(gl.bindBuffer.getCall(bindBufferCallCount - 1)).toCalledWith(gl.ARRAY_BUFFER, buffer2.buffer);
                    expect(gl.vertexAttribPointer.getCall(1)).toCalledWith(pos2, buffer2.size);
                    expect(gl.enableVertexAttribArray.getCall(1)).toCalledWith(pos2);
                });
            });

            describe("test cache", function(){
                beforeEach(function(){
                });

                describe("if to-send buffer changed", function () {
                    it("if its buffer data changed, still cache hit", function () {
                        program.sendAttributeData("a_position", wd.EVariableType.BUFFER, buffer1);


                        program.sendAllBufferData(vaoManager);


                        expect(extensionVAO.bindVertexArrayOES).toCalledOnce();


                        buffer1.resetData([1,2,3]);
                        program.sendAttributeData("a_position", wd.EVariableType.BUFFER, buffer1);


                        program.sendAllBufferData(vaoManager);


                        expect(extensionVAO.bindVertexArrayOES).not.toCalledTwice();
                    });
                    it("if the buffer is changed, cache miss and create new vao and set it", function () {
                        program.sendAttributeData("a_position", wd.EVariableType.BUFFER, buffer1);


                        program.sendAllBufferData(vaoManager);


                        expect(extensionVAO.bindVertexArrayOES).toCalledOnce();


                        program.sendAttributeData("a_position", wd.EVariableType.BUFFER, buffer1);
                        program.sendAttributeData("a_texCoord", wd.EVariableType.BUFFER, buffer2);


                        program.sendAllBufferData(vaoManager);


                        expect(extensionVAO.bindVertexArrayOES).toCalledTwice();
                    });
                });
            });
        });

        describe("if hardware not support vao", function(){
            var buffer1,buffer2;
            var pos1,pos2;

            beforeEach(function(){
                wd.GPUDetector.getInstance().extensionVAO = null;

                buffer1 = wd.ArrayBuffer.create([1, 2, 3], 3, wd.EBufferType.UNSIGNED_SHORT);
                buffer2 = wd.ArrayBuffer.create([2, 3, 4], 3, wd.EBufferType.UNSIGNED_SHORT);
                pos1 = 1;
                gl.getAttribLocation.withArgs(sinon.match.any, "a_position").returns(pos1);
                pos2 = 2;
                gl.getAttribLocation.withArgs(sinon.match.any, "a_texCoord").returns(pos2);

                sandbox.stub(program._sender, "sendBuffer");
            });

            describe("test cache", function() {
                beforeEach(function () {
                });

                it("if its buffer data changed, still cache hit", function () {
                    program.sendAttributeData("a_position", wd.EVariableType.BUFFER, buffer1);


                    program.sendAllBufferData();


                    expect(program._sender.sendBuffer).toCalledOnce();


                    buffer1.resetData([1, 2, 3]);
                    program.sendAttributeData("a_position", wd.EVariableType.BUFFER, buffer1);


                    program.sendAllBufferData();


                    expect(program._sender.sendBuffer).not.toCalledTwice();
                });
            });

            it("sendAttributeData only add buffer data to list; sendAllBufferData will send all buffer data in the list", function () {
                program.sendAttributeData("a_position", wd.EVariableType.BUFFER, buffer1);
                program.sendAttributeData("a_texCoord", wd.EVariableType.BUFFER, buffer2);
                expect(program._sender.sendBuffer).not.toCalled();


                program.sendAllBufferData();


                expect(program._sender.sendBuffer).toCalledTwice();
                expect(program._sender.sendBuffer.firstCall).toCalledWith(pos1, buffer1);
                expect(program._sender.sendBuffer.secondCall).toCalledWith(pos2, buffer2);
            });
        });

        //it("when switch program and the lastBindedArrayBufferList equal this buffer list which is to be sended, send it", function(){
        //
        //});
    });

    describe("fix bug", function(){
        beforeEach(function(){
        });

        describe("test proceduralTexture", function(){
            beforeEach(function(){
            });

            it("should bind and send vertex buffer when build procedural texture", function(){
                var obj1 = prepareTool.createBox(5, wd.LightMaterial);

                var material = obj1.getComponent(wd.Geometry).material;
                material.diffuseMap = wd.MarbleProceduralTexture.create();


                var director = wd.Director.getInstance();
                var renderer = wd.WebGLRenderer.create();

                director.scene.addChild(obj1);




                director.scene.addChild(testTool.createCamera());

                prepareTool.prepareForMap(sandbox);


                var pos = 1;
                gl.getAttribLocation.withArgs(sinon.match.any, "a_positionVec2").returns(pos);



                director._init();


                director.scene.gameObjectScene.render(renderer);

                expect(gl.vertexAttribPointer.withArgs(pos)).toCalledOnce();
            });
        });

        describe("if hardware support vao", function(){
            var extensionVAO;
            var vao1, vao2;
            var vaoManager;
            var buffer1, buffer2;
            var pos1, pos2;

            beforeEach(function () {
                vao1 = {};
                vao2 = {a:1};

                extensionVAO = {
                    bindVertexArrayOES: sandbox.stub(),
                    createVertexArrayOES: sandbox.stub()
                };

                extensionVAO.createVertexArrayOES.onCall(0).returns(vao1);
                extensionVAO.createVertexArrayOES.onCall(1).returns(vao2);


                wd.GPUDetector.getInstance().extensionVAO = extensionVAO;

                testTool.openContractCheck(sandbox);


                buffer1 = wd.ArrayBuffer.create([1, 2, 3], 3, wd.EBufferType.UNSIGNED_SHORT);
                buffer2 = wd.ArrayBuffer.create([2, 3, 4], 3, wd.EBufferType.UNSIGNED_SHORT);
                pos1 = 1;
                gl.getAttribLocation.withArgs(sinon.match.any, "a_position").returns(pos1);
                pos2 = 2;
                gl.getAttribLocation.withArgs(sinon.match.any, "a_texCoord").returns(pos2);


                vaoManager = wd.VAOManager.create();
                vaoManager.init();
            });

            describe('fix "shadow_direction_shadowMap sample not show box,sphere correctly" bug', function(){
                beforeEach(function(){
                });
                
                it("the 'build shadow map' and the 'draw shadow map' should bind the independent vao of the same geometry", function(){
                    program.sendAttributeData("a_position", wd.EVariableType.BUFFER, buffer1);

                    program.sendAllBufferData(vaoManager);

                    expect(extensionVAO.bindVertexArrayOES.getCall(0)).toCalledWith(vao1);



                    program.sendAttributeData("a_position", wd.EVariableType.BUFFER, buffer1);
                    program.sendAttributeData("a_texCoord", wd.EVariableType.BUFFER, buffer2);

                    program.sendAllBufferData(vaoManager);

                    expect(extensionVAO.bindVertexArrayOES.getCall(1)).toCalledWith(vao2);
                });
            });
        });
    });
});
