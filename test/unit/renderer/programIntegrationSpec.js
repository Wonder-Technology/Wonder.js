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

        it("sendAttributeData only add buffer data to list; sendAllBufferData will send all buffer data in the list", function () {
            var buffer1 = wd.ArrayBuffer.create([1, 2, 3], 3, wd.EBufferType.UNSIGNED_SHORT);
            var buffer2 = wd.ArrayBuffer.create([2, 3, 4], 3, wd.EBufferType.UNSIGNED_SHORT);
            var pos1 = 1;
            gl.getAttribLocation.withArgs(sinon.match.any, "a_position").returns(pos1);
            var pos2 = 2;
            gl.getAttribLocation.withArgs(sinon.match.any, "a_texCoord").returns(pos2);

            sandbox.stub(program._sender, "sendBuffer");


            program.sendAttributeData("a_position", wd.EVariableType.BUFFER, buffer1);
            program.sendAttributeData("a_texCoord", wd.EVariableType.BUFFER, buffer2);
            expect(program._sender.sendBuffer).not.toCalled();


            program.sendAllBufferData();


            expect(program._sender.sendBuffer).toCalledTwice();
            expect(program._sender.sendBuffer.firstCall).toCalledWith(pos1, buffer1);
            expect(program._sender.sendBuffer.secondCall).toCalledWith(pos2, buffer2);
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

                sandbox.stub(program._sender, "sendBuffer");
            });

            it("if lastBindedArrayBufferList equal this buffer list which is to be sended, not send again", function () {
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
    });
});
