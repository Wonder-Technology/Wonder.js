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
});
