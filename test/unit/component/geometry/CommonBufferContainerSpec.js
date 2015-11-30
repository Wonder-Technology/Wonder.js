describe("CommonBufferContainer", function() {
    var sandbox = null;
    var container = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        container= new wd.CommonBufferContainer();
    });
    afterEach(function () {
        sandbox.restore();
    });

    describe("hasChild", function(){
        it("if geometryData has data which is corresponding to the buffer, then return true; else return false", function(){
            var geometryData = new wd.GeometryData();
            geometryData.texCoords = [0.1,0.2,0.3,0.2,0.1,0.002];
            container.geometryData = geometryData;

            expect(container.hasChild(wd.BufferDataType.TEXCOORD)).toBeTruthy();
            expect(container.hasChild(wd.BufferDataType.VERTICE)).toBeFalsy();
        });
    });

    describe("get data buffer", function(){
        var geo,geometryData;

        beforeEach(function(){
            sandbox.stub(wd.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));
            geo = new wd.ModelGeometry();
            geo.material = {
                init:sandbox.stub()
            }
        });
        afterEach(function(){
            testTool.clearInstance();
        });

        describe("get vertice buffer", function(){
            beforeEach(function(){
                geo.vertices = [1,2,2,10,4,-1,-3,5,1.2];
                geo.faces = wd.GeometryUtils.convertToFaces([0,2,1]);
                geo.texCoords = [];
                geo.colors = [];


                geo.init();


                geometryData = geo.buffers.geometryData;
                container = geo.buffers;
            });

            it("if cached, return cached data", function(){
                var result1 = container.getChild(wd.BufferDataType.VERTICE);
                var result2 = container.getChild(wd.BufferDataType.VERTICE);

                expect(result1.data).toEqual(
                    new Float32Array([
                        1,2,2,10,4,-1,-3,5,1.2000000476837158
                    ])
                );
                expect(result2===result1).toBeTruthy();
            });
        });

        describe("get normal buffer", function(){
            beforeEach(function(){
                geo.vertices = [1,2,2,10,4,-1,-3,5,1.2];
                geo.faces = wd.GeometryUtils.convertToFaces([0,2,1], [1,2,2,10,4,-1,-3,5,1.2]);
                geo.texCoords = [];
                geo.colors = [];


                geo.init();


                geometryData = geo.buffers.geometryData;
                container = geo.buffers;
            });

            it("if cached, return cached data", function(){
                var result1 = container.getChild(wd.BufferDataType.NORMAL);
                var result2 = container.getChild(wd.BufferDataType.NORMAL);

                expect(result1.data).toEqual(
                    new Float32Array([
                        1,2,2,1,2,2,1,2,2
                    ])
                );
                expect(result2===result1).toBeTruthy();
            });
        });

        describe("get tangent buffer", function(){
            beforeEach(function(){
                geo.vertices = [1,2,2,10,4,-1,-3,5,1.2];
                geo.faces = wd.GeometryUtils.convertToFaces([0,2,1], [0,2,2,-3,4,-1,-3,5,1.2]);
                geo.texCoords = [0.1,0.2,0.3,0.2,0.1,0.002];
                geo.colors = [];


                geo.init();


                geometryData = geo.buffers.geometryData;
                container = geo.buffers;
            });

            it("return calculated tangents firstly; return the last one if not dirty after", function(){
                sandbox.spy(geometryData, "_calculateTangents");

                var result1 = container.getChild(wd.BufferDataType.TANGENT);
                var result2 = container.getChild(wd.BufferDataType.TANGENT);

                expect(result1.data).toEqual(
                    new Float32Array([
                        0.8285171389579773,0.552344799041748,0.0920574814081192,-1,0.8285171389579773,0.552344799041748,0.0920574814081192,-1,0.8285171389579773,0.552344799041748,0.0920574814081192,-1
                    ])
                );
                expect(result2===result1).toBeTruthy();
                expect(geometryData._calculateTangents).toCalledOnce();
            });
            it("if change vertices or texCoords or faces, recompute tangents", function(){
                sandbox.stub(geometryData, "_calculateTangents").returns([]);

                container.getChild(wd.BufferDataType.TANGENT);
                geometryData.vertices = [];
                container.getChild(wd.BufferDataType.TANGENT);
                geometryData.texCoords = [];
                container.getChild(wd.BufferDataType.TANGENT);
                geometryData.faces = geometryData.faces;
                container.getChild(wd.BufferDataType.TANGENT);


                container.getChild(wd.BufferDataType.TANGENT);

                expect(geometryData._calculateTangents.callCount).toEqual(4);
            });
        });

        describe("get indice buffer", function(){
            beforeEach(function(){
                geo.vertices = [1,2,2,10,4,-1,-3,5,1.2];
                geo.faces = wd.GeometryUtils.convertToFaces([0,2,1]);
                geo.texCoords = [];
                geo.colors = [];


                geo.init();


                geometryData = geo.buffers.geometryData;
                container = geo.buffers;
            });

            it("if cached, return cached data", function(){
                var result1 = container.getChild(wd.BufferDataType.INDICE);
                var result2 = container.getChild(wd.BufferDataType.INDICE);

                expect(result1.data).toEqual(
                    new Uint16Array([
                        0, 2, 1
                    ])
                );
                expect(result2===result1).toBeTruthy();
            });
        });

        describe("get color buffer", function(){
            beforeEach(function(){
                geo.vertices = [1,2,2,10,4,-1,-3,5,1.2];
                geo.faces = wd.GeometryUtils.convertToFaces([0,2,1]);
                geo.texCoords = [];
                geo.colors = [0.1,0.2,0.3,0.2,0.1,0.002];


                geo.init();


                geometryData = geo.buffers.geometryData;
                container = geo.buffers;
            });

            it("if cached, return cached data", function(){
                var result1 = container.getChild(wd.BufferDataType.COLOR);
                var result2 = container.getChild(wd.BufferDataType.COLOR);

                expect(result1.data).toEqual(
                    new Float32Array([
                        0.10000000149011612,0.20000000298023224,0.30000001192092896,0.20000000298023224,0.10000000149011612,0.0020000000949949026
                    ])
                );
                expect(result2===result1).toBeTruthy();
            });
        });

        describe("get texCoord buffer", function(){
            beforeEach(function(){
                geo.vertices = [1,2,2,10,4,-1,-3,5,1.2];
                geo.faces = wd.GeometryUtils.convertToFaces([0,2,1]);
                geo.texCoords = [0.1,0.2,0.3,0.2,0.1,0.002];
                geo.colors = [];


                geo.init();


                geometryData = geo.buffers.geometryData;
                container = geo.buffers;
            });

            it("if cached, return cached data", function(){
                var result1 = container.getChild(wd.BufferDataType.TEXCOORD);
                var result2 = container.getChild(wd.BufferDataType.TEXCOORD);

                expect(result1.data).toEqual(
                    new Float32Array([
                        0.10000000149011612,0.20000000298023224,0.30000001192092896,0.20000000298023224,0.10000000149011612,0.0020000000949949026
                    ])
                );
                expect(result2===result1).toBeTruthy();
            });
        });
    });
});

