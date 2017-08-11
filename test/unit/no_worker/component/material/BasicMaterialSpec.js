describe("BasicMaterial", function () {
    var sandbox = null;
    var material = null;
    var obj;
    var geo;
    var cameraGameObject;

    var gl;
    var state;

    var Matrix4 = wd.Matrix4;
    var Color = wd.Color;
    var BasicMaterialData = wd.BasicMaterialData;
    var DataBufferConfig = wd.DataBufferConfig;

    function buildGLSL(state) {
        var gl = directorTool.init(state);

        directorTool.loopBody(state);

        return gl;
    }

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        testTool.clearAndOpenContractCheck(sandbox);

        var data = sceneTool.prepareGameObjectAndAddToScene();
        obj = data.gameObject;
        geo = data.geometry;
        material = data.material;
        cameraGameObject = data.cameraGameObject;

        state = stateTool.createAndSetFakeGLState(sandbox);

        gl = stateTool.getGLFromFakeGLState(state);
    });
    afterEach(function () {
        testTool.clear(sandbox);
        sandbox.restore();
    });

    it("glsl only set glPosition,glFragColor once", function () {
        gl = buildGLSL(state);

        var vs = materialTool.getVsSource(gl);
        var fs = materialTool.getFsSource(gl);
        expect(glslTool.containSpecifyCount(vs, "gl_Position =", 1)).toBeTruthy();
        expect(glslTool.containSpecifyCount(fs, "gl_FragColor =", 1)).toBeTruthy();
    });

    describe("test send indices buffer data", function () {
        var buffer;

        beforeEach(function () {
            buffer = {b:1};

            gl.createBuffer.onCall(1).returns(buffer);
        });

        it("create buffer and init it when first get", function () {
            directorTool.init(state);

            var data = geometryTool.getIndices(geo);


            directorTool.loopBody(state);

            expect(gl.createBuffer).toCalledTwice();
            expect(gl.bindBuffer.withArgs(gl.ELEMENT_ARRAY_BUFFER, buffer).callCount).toEqual(2);
            expect(gl.bufferData.withArgs(gl.ELEMENT_ARRAY_BUFFER, data, gl.STATIC_DRAW)).toCalledOnce();
            expect(gl.bindBuffer.withArgs(gl.ELEMENT_ARRAY_BUFFER, null)).toCalledOnce();
        });
        it("not create buffer after first get", function () {
            directorTool.init(state);

            directorTool.loopBody(state);
            directorTool.loopBody(state);

            expect(gl.createBuffer).toCalledTwice();
        });
    });

    describe("initData", function() {
        beforeEach(function(){
        });

        describe("separate buffer index into segements of corresponding material type", function() {
            beforeEach(function(){

            });

            it("make BasicMaterialData.index be 0", function(){
                sandbox.stub(DataBufferConfig, "basicMaterialDataBufferCount", 20);
                sandbox.stub(DataBufferConfig, "lightMaterialDataBufferCount", 100);

                materialTool.resetData();

                expect(BasicMaterialData.index).toEqual(0);
            });
        });
    });
});
