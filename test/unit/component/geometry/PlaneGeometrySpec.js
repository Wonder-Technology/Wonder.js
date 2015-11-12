describe("PlaneGeometry", function() {
    var sandbox = null;
    var geo = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        geo = new dy.PlaneGeometry();
    });
    afterEach(function () {
        testTool.clearInstance();
        sandbox.restore();
    });

    describe("init", function(){
        beforeEach(function(){
            geo.material = {
                init: sandbox.stub(),
                shading: dy.Shading.FLAT
            }
        });

        it("test with 1 segemets", function(){
            geo.width = 10;
            geo.height = 20;

            geo.init();

            var data = geo.buffers.geometryData;
            expect(testTool.getValues(data.vertices)).toEqual(
                [
                    -10, 0, 20, -10, 0, -20, 10, 0, 20, 10, 0, -20
                ]
            )
            expect(testTool.getValues(data.texCoords)).toEqual(
                [
                    0, 0, 0, 1, 1, 0, 1, 1
                ]
            )
            expect(data.indices).toEqual(
                [
                    0, 2, 1, 2, 3, 1
                ])
            expect(data.normals).toEqual(
                [
                    0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0
                ])

        });
        it("test with 2 segemets", function(){
            geo.width = 10;
            geo.height = 20;
            geo.widthSegments = 2;
            geo.heightSegments = 2;

            geo.init();

            var data = geo.buffers.geometryData;
            expect(testTool.getValues(data.vertices)).toEqual(
                [
                    -10, 0, 20, -10, 0, 0, -10, 0, -20, 0, 0, 20, 0, 0, 0, 0, 0, -20, 10, 0, 20, 10, 0, 0, 10, 0, -20
                ]
            )
            expect(testTool.getValues(data.texCoords)).toEqual(
                [
                    0, 0, 0, 0.5, 0, 1, 0.5, 0, 0.5, 0.5, 0.5, 1, 1, 0, 1, 0.5, 1, 1
                ]
            )
            expect(data.indices).toEqual(
            [
                0, 3, 1, 3, 4, 1, 1, 4, 2, 4, 5, 2, 3, 6, 4, 6, 7, 4, 4, 7, 5, 7, 8, 5
            ])
            expect(data.normals).toEqual(
                [
                    0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0
                ])
        });
    });
});

