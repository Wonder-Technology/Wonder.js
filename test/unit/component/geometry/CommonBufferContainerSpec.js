describe("CommonBufferContainer", function() {
    var sandbox = null;
    var container = null;
    var gl;

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

            expect(container.hasChild(wd.EBufferDataType.TEXCOORD)).toBeTruthy();
            expect(container.hasChild(wd.EBufferDataType.VERTICE)).toBeFalsy();
        });
    });

    describe("get data buffer", function(){
        var geo,geometryData;

        beforeEach(function(){
            geo = new wd.ModelGeometry();
            geo.material = {
                init:sandbox.stub()
            }

            sandbox.stub(wd.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));

            gl = wd.DeviceManager.getInstance().gl;

            testTool.openContractCheck(sandbox);
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
                var result1 = container.getChild(wd.EBufferDataType.VERTICE);
                var result2 = container.getChild(wd.EBufferDataType.VERTICE);

                expect(result1.data).toEqual(
                    new Float32Array([
                        1,2,2,10,4,-1,-3,5,1.2000000476837158
                    ])
                );
                expect(result2===result1).toBeTruthy();
            });

            describe("else", function(){
                it("update geometry buffer vbo data instead of creating new one", function(){
                    bufferContainerTool.judgeUpdateBufferData(container, gl, wd.EBufferDataType.VERTICE);
                });
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
                var result1 = container.getChild(wd.EBufferDataType.NORMAL);
                var result2 = container.getChild(wd.EBufferDataType.NORMAL);

                expect(result1.data).toEqual(
                    new Float32Array([
                        1,2,2,1,2,2,1,2,2
                    ])
                );
                expect(result2===result1).toBeTruthy();
            });

            describe("else", function(){
                it("update geometry buffer vbo data instead of creating new one", function(){
                    bufferContainerTool.judgeUpdateBufferData(container, gl, wd.EBufferDataType.NORMAL);
                });
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

                var result1 = container.getChild(wd.EBufferDataType.TANGENT);
                var result2 = container.getChild(wd.EBufferDataType.TANGENT);

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

                container.getChild(wd.EBufferDataType.TANGENT);
                geometryData.vertices = [];
                container.getChild(wd.EBufferDataType.TANGENT);
                geometryData.texCoords = [];
                container.getChild(wd.EBufferDataType.TANGENT);
                geometryData.faces = geometryData.faces;
                container.getChild(wd.EBufferDataType.TANGENT);


                container.getChild(wd.EBufferDataType.TANGENT);

                expect(geometryData._calculateTangents.callCount).toEqual(4);
            });

            it("update geometry buffer vbo data instead of creating new one", function(){
                bufferContainerTool.judgeUpdateBufferData(container, gl, wd.EBufferDataType.TANGENT);
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
                var result1 = container.getChild(wd.EBufferDataType.INDICE);
                var result2 = container.getChild(wd.EBufferDataType.INDICE);

                expect(result1.data).toEqual(
                    new Uint16Array([
                        0, 2, 1
                    ])
                );
                expect(result2===result1).toBeTruthy();
            });

            describe("else", function(){
                it("update geometry buffer vbo data instead of creating new one", function(){
                    bufferContainerTool.judgeUpdateBufferData(container, gl, wd.EBufferDataType.INDICE);
                });
            });
        });

        describe("get color buffer", function(){
            beforeEach(function(){
                geo.vertices = [1,2,2,10,4,-1,-3,5,1.2];
                geo.faces = wd.GeometryUtils.convertToFaces([0,2,1]);
                geo.texCoords = [];
                geo.colors = [0.1,0.2,0.3,0.2,0.1,0.002, 0.1,0.1,0.1];


                geo.init();


                geometryData = geo.buffers.geometryData;
                container = geo.buffers;
            });

            it("if cached, return cached data", function(){
                var result1 = container.getChild(wd.EBufferDataType.COLOR);
                var result2 = container.getChild(wd.EBufferDataType.COLOR);

                expect(result1.data).toEqual(
                    new Float32Array([
                        0.10000000149011612,0.20000000298023224,0.30000001192092896,0.20000000298023224,0.10000000149011612,0.0020000000949949026,0.10000000149011612,0.10000000149011612,0.10000000149011612
                    ])
                );
                expect(result2===result1).toBeTruthy();
            });

            describe("else", function(){
                it("update geometry buffer vbo data instead of creating new one", function(){
                    bufferContainerTool.judgeUpdateBufferData(container, gl, wd.EBufferDataType.COLOR);
                });
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
                var result1 = container.getChild(wd.EBufferDataType.TEXCOORD);
                var result2 = container.getChild(wd.EBufferDataType.TEXCOORD);

                expect(result1.data).toEqual(
                    new Float32Array([
                        0.10000000149011612,0.20000000298023224,0.30000001192092896,0.20000000298023224,0.10000000149011612,0.0020000000949949026
                    ])
                );
                expect(result2===result1).toBeTruthy();
            });

            describe("else", function(){
                it("update geometry buffer vbo data instead of creating new one", function(){
                    bufferContainerTool.judgeUpdateBufferData(container, gl, wd.EBufferDataType.TEXCOORD);
                });
            });
        });
    });
});

