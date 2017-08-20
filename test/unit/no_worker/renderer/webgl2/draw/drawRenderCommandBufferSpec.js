describe("draw render command", function () {
    var sandbox = null;
    var material = null;
    var obj;
    var geo;
    var cameraObj;

    var gl;
    var state;

    var Color = wd.Color;
    var Matrix4 = wd.Matrix4;
    var GeometryData = wd.GeometryData;
    var IndexBufferData = wd.IndexBufferData;
    var EBufferType = wd.EBufferType;
    var DataBufferConfig = wd.DataBufferConfig;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        testTool.clearAndOpenContractCheck(sandbox);

        var data = sceneTool.prepareGameObjectAndAddToScene(false,  null, lightMaterialTool.create());
        obj = data.gameObject;
        geo = data.geometry;
        material = data.material;
        cameraObj = data.cameraGameObject;


        state = stateTool.createAndSetFakeGLState(sandbox);

        gl = stateTool.getGLFromFakeGLState(state);
    });
    afterEach(function () {
        testTool.clear(sandbox);
        sandbox.restore();
    });

    describe("draw", function() {
        beforeEach(function(){

        });

        it("if geometry has index buffer, drawElements", function(){
            directorTool.init(state);

            var indexBuffer = {a:1};
            indexBufferTool.setBuffers([indexBuffer]);

            var indices = [1,2,3];
            geometryTool.setIndices(0, indices);
            geometryTool.setIndexType(EBufferType.UNSIGNED_SHORT);
            geometryTool.setIndexTypeSize(Uint16Array.BYTES_PER_ELEMENT);

            directorTool.loopBody(state);


            expect(gl.bindBuffer.withArgs(gl.ELEMENT_ARRAY_BUFFER, indexBuffer)).not.toCalled();
            expect(gl.drawElements).toCalledWith(gl.TRIANGLES, indices.length, GeometryData.indexType, GeometryData.indexTypeSize * 0);
        });
    });
});

