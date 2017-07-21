describe("Shader", function() {
    var sandbox = null;
    var material = null;
    var obj;
    var geo;
    var director;

    var gl;
    var state;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        testTool.clearAndOpenContractCheck(sandbox);

        var data = sceneTool.prepareGameObjectAndAddToScene();
        obj = data.gameObject;
        geo = data.geometry;
        material = data.material;

        state = stateTool.createAndSetFakeGLState(sandbox);

        gl = stateTool.getGLFromFakeGLState(state);
    });
    afterEach(function () {
        testTool.clear(sandbox);
        sandbox.restore();
    });
    
    describe("init", function() {
        beforeEach(function(){
        });

        describe("init shader", function() {
            beforeEach(function(){
                
            });

            it("if program already exist, return", function () {
                basicMaterialTool.initMaterial(material);
                basicMaterialTool.initMaterial(material);

                expect(gl.createProgram).toCalledOnce();
            });

            it("create vs and fs shader", function () {
                directorTool.init(state);

                expect(gl.createShader.withArgs(gl.VERTEX_SHADER)).toCalledOnce();
                expect(gl.createShader.withArgs(gl.FRAGMENT_SHADER)).toCalledOnce();
            });

            describe("compile vs and fs shader", function(){
                it("compile", function () {
                    directorTool.init(state);

                    expect(gl.shaderSource).toCalledTwice();
                    expect(gl.compileShader).toCalledTwice();
                });

                describe("check COMPILE_STATUS", function () {
                    it("invoke gl.getShaderParameter", function () {
                        directorTool.init(state);

                        expect(gl.getShaderParameter).toCalledTwice();
                    });
                    it("if gl.getShaderParameter return false, log shader info", function () {
                        sandbox.stub(wd.Log, "log");
                        gl.getShaderParameter.withArgs(sinon.match.any, gl.COMPILE_STATUS).returns(false);

                        directorTool.init(state);

                        // expect(gl.getShaderParameter).toCalledTwice();
                        expect(gl.getShaderInfoLog).toCalledTwice();
                        expect(wd.Log.log).toCalled();
                    });
                });
            });

            it("attach vs and fs shader", function () {
                directorTool.init(state);

                expect(gl.attachShader).toCalledTwice();
            });
            it("to avoid \"Attribute 0 is disabled.\". This has significant performance penalty", function () {
                directorTool.init(state);

                expect(gl.bindAttribLocation.withArgs(sinon.match.any, 0, "a_position")).toCalledOnce();
            });

            describe("link program", function () {
                it("test", function () {
                    directorTool.init(state);

                    expect(gl.linkProgram).toCalledOnce();
                });
                it("check error", function () {
                    gl.getProgramParameter.withArgs(sinon.match.any, gl.LINK_STATUS).returns(false);
                    gl.getProgramInfoLog.returns("err");

                    expect(function(){
                        directorTool.init(state);
                    }).toThrow("link program error:err");
                });
            });

            it("delete vs and fs shader after link", function () {
                directorTool.init(state);

                expect(gl.deleteShader).toCalledTwice();
                expect(gl.deleteShader).toCalledAfter(gl.linkProgram);
            });
        });
    });

    describe("getUniformLocation", function(){
        var pos;

        beforeEach(function(){
            pos = 1;
        });

        describe("test cache", function(){
            beforeEach(function(){
                // device.gl.getUniformLocation.returns(pos);
            });

            it("if cached, return cached data", function () {
                gl.getUniformLocation.withArgs(sinon.match.any, "u_mMatrix").returns(pos);


                directorTool.init(state);
                directorTool.loopBody(state);
                directorTool.loopBody(state);

                expect(gl.getUniformLocation.withArgs(sinon.match.any, "u_mMatrix")).toCalledOnce();
            });
        });
    });

    describe("getAttributeLocation", function(){
        var pos;

        beforeEach(function(){
            pos = 1;
        });

        describe("test cache", function() {
            beforeEach(function () {
            });

            it("if cached, return cached data", function () {
                gl.getAttribLocation.withArgs(sinon.match.any, "a_position").returns(pos);


                directorTool.init(state);
                directorTool.loopBody(state);
                directorTool.loopBody(state);

                expect(gl.getAttribLocation.withArgs(sinon.match.any, "a_position")).toCalledOnce();
            });
        });
    });

    // describe("dispose", function() {
    //     beforeEach(function(){
    //
    //     });
    //
    //     it("", function(){
    //     });
    // });


    describe("one type material map to multi shader index", function() {
        beforeEach(function(){

        });

        it("basic material with map send a_texCoords, but the material with no map not send a_texCoords", function(){
            bufferTool.makeCreateDifferentBuffer(gl);

            var texture = textureTool.create();
            textureTool.setSource(texture, {});

            basicMaterialTool.addMap(material, texture);


            var material2;

            material2 = basicMaterialTool.create();


            var obj2 = sceneTool.createGameObject(null, material2);
            sceneTool.addGameObject(obj2);




            var name = "a_texCoord",
            size = 2;

            var pos1 = 10;
            var pos2 = 11;

            gl.getAttribLocation.withArgs(sinon.match.any, name).onCall(0).returns(pos1);

            gl.getAttribLocation.withArgs(sinon.match.any, name).onCall(1).returns(pos2);


            directorTool.init(state);

            var data = geometryTool.getTexCoords(geo);


            directorTool.loopBody(state);

            expect(gl.createBuffer.callCount).toEqual(5);
            expect(gl.vertexAttribPointer).toCalledWith(pos1,size,"FLOAT",false,0,0);
            expect(gl.vertexAttribPointer).not.toCalledWith(pos2,size,"FLOAT",false,0,0);

        });
    });
});
