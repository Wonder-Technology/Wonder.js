describe("CustomGeometry", function() {
    var sandbox = null;
    var geo = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        geo = new dy.CustomGeometry();
    });
    afterEach(function () {
        testTool.clearInstance();
        sandbox.restore();
    });

    it("set custom geometry data", function(){
        var material = dy.BasicMaterial.create();
        material.shading = dy.Shading.SMOOTH;

        geo.material = material;
        geo.vertices = [
            0.0,  3.0,  -5.0,
            -3.0, -3.0,  -5.0,
            3.0, -3.0,  -5.0
        ];
        geo.indices = [
            0, 1, 2
        ];
        geo.normals = [
            0.0,  2.5,  -5.0,
            -2.5, -2.5,  -5.0,
            2.5, -2.5,  -5.0
        ];
        geo.texCoords = [
            0.0, 0.1,
            1.0, 0.5,
            0.2, 0.2
        ];
        geo.colors = [
            0.5, 0.1,
            0.0, 0.5,
            0.2, 0.2
        ];

        geo.init();

        var data = geo.buffers.geometryData;
        expect(testTool.getValues(data.vertices)).toEqual(
            geo.vertices
        );
        expect(testTool.getValues(data.normals)).toEqual(
            geo.normals
        );
        expect(testTool.getValues(data.texCoords)).toEqual(
            geo.texCoords
        );
        expect(testTool.getValues(data.indices)).toEqual(
            geo.indices
        );
        expect(testTool.getValues(data.colors)).toEqual(
            geo.colors
        );
    });
});

