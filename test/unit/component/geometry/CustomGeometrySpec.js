describe("CustomGeometry", function() {
    var sandbox = null;
    var geo = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        geo = new wd.CustomGeometry();

        sandbox.stub(wd.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));
    });
    afterEach(function () {
        testTool.clearInstance();
        sandbox.restore();
    });

    describe("set custom geometry data", function(){
        beforeEach(function(){
            var material = wd.BasicMaterial.create();
            material.shading = wd.EShading.SMOOTH;

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

        });

        it("test", function(){
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

        describe("update buffers data and remove cache when set geometry data", function(){
            beforeEach(function(){

            });

            it("test set vertices", function(){
                var newData = [
                    3.0,  3.0,  -5.0,
                    -3.0, -3.0,  -5.0,
                    3.0, -3.0,  -5.0
                ];
                geo.vertices = newData;

                expect(testTool.getValues(geo.buffers.getChild(wd.BufferDataType.VERTICE).data)).toEqual(
                    newData
                );
            });
            it("test set texCoords", function(){
                var newData = [
                    0.5, 0.1,
                    1.0, 0.5,
                    0.2, 0.2
                ];
                geo.texCoords = newData;

                expect(testTool.getValues(geo.buffers.getChild(wd.BufferDataType.TEXCOORD).data)).toEqual(
                    newData
                );
            });
            it("test set colors", function(){
                var newData = [
                    0.7, 0.1,
                    1.0, 0.5,
                    0.2, 0.2
                ];
                geo.colors = newData;

                expect(testTool.getValues(geo.buffers.getChild(wd.BufferDataType.COLOR).data)).toEqual(
                    newData
                );
            });
            it("test set normals", function(){
                var newData = [
                    100.0,  3.0,  -5.0,
                    -3.0, -3.0,  -5.0,
                    3.0, -3.0,  -5.0
                ];
                geo.normals = newData;

                expect(testTool.getValues(geo.buffers.getChild(wd.BufferDataType.NORMAL).data)).toEqual(
                    newData
                );
            });
            it("test set indices", function(){
                var newData = [
                    2, 1, 0
                ];
                geo.indices = newData;

                expect(testTool.getValues(geo.buffers.getChild(wd.BufferDataType.INDICE).data)).toEqual(
                    newData
                );
            });

            it("test remove cache", function(){
                var newData = [
                    2, 1, 0
                ];
                geo.indices = newData;

                var buffer = geo.buffers.getChild(wd.BufferDataType.INDICE);

                expect(testTool.getValues(buffer.data)).toEqual(
                    newData
                );




                var newData2 = [
                    2, 0, 1
                ];
                geo.indices = newData2;

                var buffer2 = geo.buffers.getChild(wd.BufferDataType.INDICE);
                expect(testTool.getValues(buffer2.data)).toEqual(
                    newData2
                );
            });
        });
    });
});

