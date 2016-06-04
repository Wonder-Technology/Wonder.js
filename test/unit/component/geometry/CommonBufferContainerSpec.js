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

    //describe("hasChild", function(){
    //    it("if geometryData has data which is corresponding to the buffer, then return true; else return false", function(){
    //        var geometryData = new wd.GeometryData();
    //        geometryData.texCoords = [0.1,0.2,0.3,0.2,0.1,0.002];
    //        container.geometryData = geometryData;
    //
    //        expect(container.hasChild(wd.EBufferDataType.TEXCOORD)).toBeTruthy();
    //        expect(container.hasChild(wd.EBufferDataType.VERTICE)).toBeFalsy();
    //    });
    //});

    describe("get data buffer", function(){
        var geo,geometryData;
        var result1,result2;

        function prepareBufferContainer(){
            container.init();
        }

        function judgeCache(data){
            expect(result1.data).toEqual(
                data
            );
            expect(result2===result1).toBeTruthy();
            expect(gl.createBuffer.callCount).toEqual(1);
        }

        function judgeResetBufferData(buffer1, buffer2, currentBufferData){
            expect(buffer2===buffer1).toBeTruthy();
            expect(buffer1.resetData).toCalledOnce();

            if(currentBufferData){
                expect(testTool.getValues(buffer1.data)).toEqual(currentBufferData);
                expect(buffer1.data).toEqual(buffer2.data);
            }
        }

        beforeEach(function(){
            geo = new wd.ModelGeometry();
            geo.material = wd.BasicMaterial.create();

            sandbox.stub(wd.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));

            gl = wd.DeviceManager.getInstance().gl;

            geometryData = wd.CommonGeometryData.create(geo);


            container.geometryData = geometryData;

            geo.buffers = container;


            testTool.openContractCheck(sandbox);
        });
        afterEach(function(){
            testTool.clearInstance(sandbox);
        });

        describe("getBufferForRenderSort", function(){
            it("return vertice buffer", function () {
                geometryData.vertices = [1,2,2,10,4,-1,-3,5,1.2];
                geometryData.faces = wd.GeometryUtils.convertToFaces([0,2,1]);
                geometryData.texCoords = [];
                geometryData.colors = [];

                prepareBufferContainer();



                result1 = container.getBufferForRenderSort();



                expect(testTool.getValues(result1.data)).toEqual(geometryData.vertices);
            });
        });

        describe("get vertice buffer", function(){
            beforeEach(function(){
                geometryData.vertices = [1,2,2,10,4,-1,-3,5,1.2];
                geometryData.faces = wd.GeometryUtils.convertToFaces([0,2,1]);
                //geometryData.texCoords = [];
                geometryData.colors = [];

                prepareBufferContainer();
            });

            describe("test cache", function(){
                beforeEach(function(){

                });

                it("if cached, return cached data", function(){
                    result1 = container.getChild(wd.EBufferDataType.VERTICE);
                    result2 = container.getChild(wd.EBufferDataType.VERTICE);


                    judgeCache(new Float32Array([
                            1,2,2,10,4,-1,-3,5,1.2000000476837158
                        ])
                    );
                });
                it("if change geometryData.vertices, cache miss", function () {
                    result1 = container.getChild(wd.EBufferDataType.VERTICE);

                    sandbox.spy(result1, "resetData");

                    geometryData.vertices = [1,1,1];


                    result2 = container.getChild(wd.EBufferDataType.VERTICE);


                    judgeResetBufferData(result1, result2, [1,1,1]);
                });
            });

            it("update geometry buffer vbo data instead of creating new one", function(){
                bufferContainerTool.judgeUpdateBufferData(container, gl, wd.EBufferDataType.VERTICE);
            });
        });

        describe("get normal buffer", function(){
            var indices,normals;
            beforeEach(function(){
                geometryData.vertices = [1,2,2,10,4,-1,-3,5,1.2];

                indices = [0,2,1];
                normals = [1,2,2,10,4,-1,-3,5,1.2];
                geometryData.faces = wd.GeometryUtils.convertToFaces(indices, normals);

                geometryData.texCoords = [];
                geometryData.colors = [];

                prepareBufferContainer();
            });

            describe("test cache", function(){
                beforeEach(function(){
                });

                it("if cached, return cached data", function(){
                    result1 = container.getChild(wd.EBufferDataType.NORMAL);
                    result2 = container.getChild(wd.EBufferDataType.NORMAL);

                    judgeCache(new Float32Array([
                            1,2,2,1,2,2,1,2,2
                        ])
                    );
                });
                it("if change geometryData.faces, cache miss", function () {
                    sandbox.stub(geo, "isSmoothShading").returns(true);

                    result1 = container.getChild(wd.EBufferDataType.NORMAL);

                    sandbox.spy(result1, "resetData");

                    var newNormals = [10,-1,-2, 10,4,-1,-3,5,1.2];
                    geometryData.faces = wd.GeometryUtils.convertToFaces(indices, newNormals);


                    result2 = container.getChild(wd.EBufferDataType.NORMAL);

                    judgeResetBufferData(result1, result2, newNormals);
                });
            });

            it("update geometry buffer vbo data instead of creating new one", function(){
                bufferContainerTool.judgeUpdateBufferData(container, gl, wd.EBufferDataType.NORMAL);
            });
        });

        describe("get tangent buffer", function(){
            beforeEach(function(){
                geometryData.vertices = [1,2,2,10,4,-1,-3,5,1.2];
                geometryData.faces = wd.GeometryUtils.convertToFaces([0,2,1], [0,2,2,-3,4,-1,-3,5,1.2]);
                geometryData.texCoords = [0.1,0.2,0.3,0.2,0.1,0.002];
                geometryData.colors = [];


                prepareBufferContainer();
            });

            describe("test cache", function(){
                beforeEach(function(){
                });

                it("test cache hit", function(){
                    sandbox.spy(geometryData, "_calculateTangents");

                    result1 = container.getChild(wd.EBufferDataType.TANGENT);
                    result2 = container.getChild(wd.EBufferDataType.TANGENT);

                    judgeCache(
                        new Float32Array([
                            0.8285171389579773,0.552344799041748,0.0920574814081192,-1,0.8285171389579773,0.552344799041748,0.0920574814081192,-1,0.8285171389579773,0.552344799041748,0.0920574814081192,-1
                        ])
                    );

                    expect(geometryData._calculateTangents).toCalledOnce();
                });
                it("if change vertices or texCoords or faces, cache miss", function(){
                    sandbox.stub(geometryData, "_calculateTangents").returns([]);

                    container.getChild(wd.EBufferDataType.TANGENT);
                    geometryData.vertices = [1,2,3];
                    container.getChild(wd.EBufferDataType.TANGENT);
                    geometryData.texCoords = [0.1,0.2];
                    container.getChild(wd.EBufferDataType.TANGENT);
                    geometryData.faces = geometryData.faces;
                    container.getChild(wd.EBufferDataType.TANGENT);


                    container.getChild(wd.EBufferDataType.TANGENT);

                    expect(geometryData._calculateTangents.callCount).toEqual(4);
                });
            });

            it("update geometry buffer vbo data instead of creating new one", function(){
                bufferContainerTool.judgeUpdateBufferData(container, gl, wd.EBufferDataType.TANGENT);
            });
        });

        describe("get indice buffer", function(){
            beforeEach(function(){
                geometryData.vertices = [1,2,2,10,4,-1,-3,5,1.2];
                geometryData.faces = wd.GeometryUtils.convertToFaces([0,2,1]);
                geometryData.texCoords = [];
                geometryData.colors = [];

                prepareBufferContainer();
            });

            describe("test cache", function(){
                beforeEach(function(){
                });

                it("if cached, return cached data", function(){
                    result1 = container.getChild(wd.EBufferDataType.INDICE);
                    result2 = container.getChild(wd.EBufferDataType.INDICE);


                    judgeCache(
                        new Uint16Array([
                            0, 2, 1
                        ])
                    );
                });
                it("if change geometryData.faces, cache miss", function () {
                    result1 = container.getChild(wd.EBufferDataType.INDICE);

                    sandbox.spy(result1, "resetData");

                    var newIndices = [2,1,0];
                    geometryData.faces = wd.GeometryUtils.convertToFaces(newIndices);


                    result2 = container.getChild(wd.EBufferDataType.INDICE);


                    judgeResetBufferData(result1, result2, newIndices);
                });
            });

            it("update geometry buffer vbo data instead of creating new one", function(){
                bufferContainerTool.judgeUpdateBufferData(container, gl, wd.EBufferDataType.INDICE);
            });
        });

        describe("get color buffer", function(){
            beforeEach(function(){
                geometryData.vertices = [1,2,2,10,4,-1,-3,5,1.2];
                geometryData.faces = wd.GeometryUtils.convertToFaces([0,2,1]);
                geometryData.texCoords = [];
                geometryData.colors = [0.1,0.2,0.3,0.2,0.1,0.002, 0.1,0.1,0.1];


                prepareBufferContainer();
            });

            describe("test cache", function(){
                it("if cached, return cached data", function(){
                    result1 = container.getChild(wd.EBufferDataType.COLOR);
                    result2 = container.getChild(wd.EBufferDataType.COLOR);

                    judgeCache(
                        new Float32Array([
                            0.10000000149011612,0.20000000298023224,0.30000001192092896,0.20000000298023224,0.10000000149011612,0.0020000000949949026,0.10000000149011612,0.10000000149011612,0.10000000149011612
                        ])
                    );
                });
                it("if change geometryData.colors, cache miss", function () {
                    result1 = container.getChild(wd.EBufferDataType.COLOR);

                    sandbox.spy(result1, "resetData");

                    var newColors = [1,0,1, 0,0,0, 0,0,0];
                    geometryData.colors = newColors;


                    result2 = container.getChild(wd.EBufferDataType.COLOR);


                    judgeResetBufferData(result1, result2, newColors);
                });
            });

            it("update geometry buffer vbo data instead of creating new one", function(){
                bufferContainerTool.judgeUpdateBufferData(container, gl, wd.EBufferDataType.COLOR);
            });
        });

        describe("get texCoord buffer", function(){
            beforeEach(function(){
                geometryData.vertices = [1,2,2,10,4,-1,-3,5,1.2];
                geometryData.faces = wd.GeometryUtils.convertToFaces([0,2,1]);
                geometryData.texCoords = [0.1,0.2,0.3,0.2,0.1,0.002];
                geometryData.colors = [];


                prepareBufferContainer();
            });

            describe("test cache", function(){
                it("if cached, return cached data", function(){
                    result1 = container.getChild(wd.EBufferDataType.TEXCOORD);
                    result2 = container.getChild(wd.EBufferDataType.TEXCOORD);

                    judgeCache(
                        new Float32Array([
                            0.10000000149011612,0.20000000298023224,0.30000001192092896,0.20000000298023224,0.10000000149011612,0.0020000000949949026
                        ])
                    );
                });
                it("if change geometryData.texCoords, cache miss", function () {
                    result1 = container.getChild(wd.EBufferDataType.TEXCOORD);

                    sandbox.spy(result1, "resetData");

                    var newTexCoords = [1,0,1, 0,0,0, 0,0,0];
                    geometryData.texCoords = newTexCoords;


                    result2 = container.getChild(wd.EBufferDataType.TEXCOORD);


                    judgeResetBufferData(result1, result2, newTexCoords);
                });
            });

            it("update geometry buffer vbo data instead of creating new one", function(){
                bufferContainerTool.judgeUpdateBufferData(container, gl, wd.EBufferDataType.TEXCOORD);
            });
        });
    });
});

