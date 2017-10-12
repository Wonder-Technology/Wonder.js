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

        var data = sceneSystemTool.prepareGameObjectAndAddToScene(false, null, lightMaterialTool.create());
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
            function initShader() {
                // directorTool.init(state);
                directorTool.loopBody(state);
            }

            beforeEach(function(){
                directorTool.init(state);
            });

            it("if program already exist, return", function () {
                initShader();
                initShader();

                expect(gl.createProgram).toCalledOnce();
            });

            it("create vs and fs shader", function () {
                initShader();

                expect(gl.createShader.withArgs(gl.VERTEX_SHADER)).toCalledOnce();
                expect(gl.createShader.withArgs(gl.FRAGMENT_SHADER)).toCalledOnce();
            });

            describe("compile vs and fs shader", function(){
                it("compile", function () {
                    initShader();

                    expect(gl.shaderSource).toCalledTwice();
                    expect(gl.compileShader).toCalledTwice();
                });

                describe("check COMPILE_STATUS", function () {
                    it("invoke gl.getShaderParameter", function () {
                        initShader();

                        expect(gl.getShaderParameter).toCalledTwice();
                    });
                    it("if gl.getShaderParameter return false, log shader info", function () {
                        sandbox.stub(wd.Log, "log");
                        gl.getShaderParameter.withArgs(sinon.match.any, gl.COMPILE_STATUS).returns(false);

                        initShader();

                        // expect(gl.getShaderParameter).toCalledTwice();
                        expect(gl.getShaderInfoLog).toCalledTwice();
                        expect(wd.Log.log).toCalled();
                    });
                });
            });

            it("attach vs and fs shader", function () {
                initShader();

                expect(gl.attachShader).toCalledTwice();
            });
            it("to avoid \"Attribute 0 is disabled.\". This has significant performance penalty", function () {
                initShader();

                expect(gl.bindAttribLocation.withArgs(sinon.match.any, 0, "a_position")).toCalledOnce();
            });

            describe("link program", function () {
                it("test", function () {
                    initShader();

                    expect(gl.linkProgram).toCalledOnce();
                });
                it("check error", function () {
                    gl.getProgramParameter.withArgs(sinon.match.any, gl.LINK_STATUS).returns(false);
                    gl.getProgramInfoLog.returns("err");

                    expect(function(){
                        initShader();
                    }).toThrow("link program error:err");
                });
            });

            it("delete vs and fs shader after link", function () {
                initShader();

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
            sceneSystemTool.removeGameObject(obj);

            var data = sceneSystemTool.prepareGameObjectAndAddToScene();
            obj = data.gameObject;
            geo = data.geometry;
            material = data.material;


            bufferTool.makeCreateDifferentBuffer(gl);

            var texture = textureSystemTool.create();
            textureSystemTool.setSource(texture, {});

            basicMaterialTool.setMap(material, texture);


            var material2;

            material2 = basicMaterialTool.create();


            var obj2 = sceneSystemTool.createGameObject(null, material2);
            sceneSystemTool.addGameObject(obj2);




            var name = "a_texCoord",
            size = 2;

            var pos1 = 10;
            var pos2 = 11;

            gl.getAttribLocation.withArgs(sinon.match.any, name).onCall(0).returns(pos1);

            gl.getAttribLocation.withArgs(sinon.match.any, name).onCall(1).returns(pos2);


            directorTool.init(state);

            var data = geometrySystemTool.getTexCoords(geo);


            directorTool.loopBody(state);

            expect(gl.createBuffer.callCount).toEqual(5);
            expect(gl.vertexAttribPointer).toCalledWith(pos1,size,"FLOAT",false,0,0);
            expect(gl.vertexAttribPointer).not.toCalledWith(pos2,size,"FLOAT",false,0,0);

        });
    });

    it("glsl shouldn't be changed after first init shader", function () {
        directorTool.init(state);
        directorTool.loopBody(state);

        var shaderSourceCallCount = gl.shaderSource.callCount;

        var texture = textureSystemTool.create();
        textureSystemTool.setSource(texture, {});

        lightMaterialTool.setSpecularMap(material, texture);


        directorTool.loopBody(state);

        expect(gl.shaderSource.callCount).toEqual(shaderSourceCallCount)
    });

    describe("shader", function() {
        var sandbox = null;
        var gl;
        var state;
        var material;

        var MaterialData = wd.MaterialData;
        var material_config = wd.webgl1_material_config;

        beforeEach(function () {
            sandbox = sinon.sandbox.create();

            testTool.clearAndOpenContractCheck(sandbox);

            state = stateTool.createAndSetFakeGLState(sandbox);

            gl = stateTool.getGLFromFakeGLState(state);


            var data = sceneSystemTool.prepareGameObjectAndAddToScene(false, null, lightMaterialTool.create());

            material = data.material;
        });
        afterEach(function () {
            testTool.clear(sandbox);
            sandbox.restore();
        });

        describe("use shader for material", function(){
            function isInitShader(expect, gl) {
                expect(gl.createProgram.callCount).toEqual(1);
            }

            function getUsedShaderShaderIndex() {
                return 0;
            }

            it("init material shader", function () {
                directorTool.init(state);
                directorTool.loopBody(state);

                isInitShader(expect, gl);
            });
            it("set shader index", function () {
                directorTool.init(state);
                directorTool.loopBody(state);

                expect(MaterialData.shaderIndices[material.index]).toEqual(getUsedShaderShaderIndex());
            });
        });

        describe("optimize", function() {
            beforeEach(function(){
            });

            it("only init the shader of the same shader name once", function () {
                sceneSystemTool.addGameObject(sceneSystemTool.createGameObject(null, lightMaterialTool.create()));

                directorTool.init(state);
                directorTool.loopBody(state);

                directorTool.loopBody(state);

                expect(gl.createProgram.callCount).toEqual(1);
            });

            it("only exec branch func to get material shader lib name array of the same shader once", function () {
                function getFirstBranchShaderLibItem(material_config) {
                    return material_config.shaders.materialShaders.FrontRenderLight.filter(function (data) {
                        return data.branch !== undefined;
                    })[0];
                }

                function stubBranchFunc(sandbox, material_config) {
                    sandbox.stub(getFirstBranchShaderLibItem(material_config), "branch");
                }

                stubBranchFunc(sandbox, material_config);

                directorTool.init(state);
                directorTool.loopBody(state);

                directorTool.loopBody(state);

                expect(getFirstBranchShaderLibItem(material_config).branch).toCalledOnce();
            });
        });
    });
});
