describe("Geometry", function() {
    var sandbox = null;
    var Geometry = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        Geometry = dy.Geometry;
    });
    afterEach(function () {
        testTool.clearInstance();
        sandbox.restore();
    });

    describe("defer create buffer ", function(){
        var geo,arrayBuffer,eleBuffer;

        beforeEach(function(){
            arrayBuffer = {};
            eleBuffer = {};
            sandbox.stub(dy.ArrayBuffer, "create").returns(arrayBuffer);
            sandbox.stub(dy.ElementBuffer, "create").returns(eleBuffer);
            geo = dy.RectGeometry.create();
            geo.width = 10;
            geo.height = 20;
            geo.material = {
                color: dy.Color.create("#ffffff"),
                init:sandbox.stub()
            };
        });

        it("only create BufferContainer and add geometry data when init", function(){
            expect(geo.buffers).toBeNull();

            geo.init();

            expect(geo.buffers).toBeInstanceOf(dy.BufferContainer);
            expect(geo.buffers.geometryData.vertices).toEqual(jasmine.any(Array));
            expect(geo.buffers.geometryData.indices).toEqual(jasmine.any(Array));
            expect(geo.buffers.geometryData.normals).toEqual(jasmine.any(Array));
            expect(geo.buffers.geometryData.texCoords).toEqual(jasmine.any(Array));
            expect(geo.buffers.geometryData.colors).toEqual(
                [
                    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
                ]
            );
            expect(dy.ArrayBuffer.create).not.toCalled();
            expect(dy.ElementBuffer.create).not.toCalled();
        });

        describe("when invoke BufferContainer->getChild", function(){
            beforeEach(function(){
                geo.init();
            });

            it("if the buffer is cached, return the cached one", function(){
                var result1 = geo.buffers.getChild(dy.BufferDataType.VERTICE);

                var result2 = geo.buffers.getChild(dy.BufferDataType.VERTICE);

                expect(dy.ArrayBuffer.create).toCalledOnce();
                expect(result1).toEqual(result2);
            });
            it("else, create buffer and add it to cache", function(){
                var result1 = geo.buffers.getChild(dy.BufferDataType.NORMAL);
                var result2 = geo.buffers.getChild(dy.BufferDataType.INDICE);

                expect(dy.ArrayBuffer.create).toCalledOnce();
                expect(dy.ElementBuffer.create).toCalledOnce();
                expect(result1).toEqual(arrayBuffer);
                expect(result2).toEqual(eleBuffer);
            });
        })
    });
});

