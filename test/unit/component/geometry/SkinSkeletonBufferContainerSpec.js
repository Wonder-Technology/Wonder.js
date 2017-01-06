describe("SkinSkeletonBufferContainer", function() {
    var sandbox = null;
    var container = null;
    var gl;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        container= new wd.SkinSkeletonBufferContainer();
    });
    afterEach(function () {
        sandbox.restore();
    });

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

            geometryData = wd.SkinSkeletonGeometryData.create(geo);


            container.geometryData = geometryData;

            geo.buffers = container;


            testTool.openContractCheck(sandbox);
        });
        afterEach(function(){
            testTool.clearInstance(sandbox);
        });

        // describe("get vertice buffer", function(){
        //     beforeEach(function(){
        //         geometryData.vertices = [1,2,2,10,4,-1,-3,5,1.2];
        //         geometryData.faces = wd.GeometryUtils.convertToFaces([0,2,1]);
        //         //geometryData.texCoords = [];
        //         geometryData.colors = [];
        //
        //         prepareBufferContainer();
        //     });
        //
        //     describe("test cache", function(){
        //         beforeEach(function(){
        //
        //         });
        //
        //         it("if cached, return cached data", function(){
        //             result1 = container.getChild(wd.EBufferDataType.VERTICE);
        //             result2 = container.getChild(wd.EBufferDataType.VERTICE);
        //
        //
        //             judgeCache(new Float32Array([
        //                     1,2,2,10,4,-1,-3,5,1.2000000476837158
        //                 ])
        //             );
        //         });
        //         it("if change geometryData.vertices, cache miss", function () {
        //             result1 = container.getChild(wd.EBufferDataType.VERTICE);
        //
        //             sandbox.spy(result1, "resetData");
        //
        //             geometryData.vertices = [1,1,1];
        //
        //
        //             result2 = container.getChild(wd.EBufferDataType.VERTICE);
        //
        //
        //             judgeResetBufferData(result1, result2, [1,1,1]);
        //         });
        //     });
        //
        //     it("update geometry buffer vbo data instead of creating new one", function(){
        //         bufferContainerTool.judgeUpdateBufferData(container, gl, wd.EBufferDataType.VERTICE);
        //     });
        // });
        //
        // describe("get normal buffer", function(){
        //     var indices,normals;
        //     beforeEach(function(){
        //         geometryData.vertices = [1,2,2,10,4,-1,-3,5,1.2];
        //
        //         indices = [0,2,1];
        //         normals = [1,2,2,10,4,-1,-3,5,1.2];
        //         geometryData.faces = wd.GeometryUtils.convertToFaces(indices, normals);
        //
        //         geometryData.texCoords = [];
        //         geometryData.colors = [];
        //
        //         prepareBufferContainer();
        //     });
        //
        //     describe("test cache", function(){
        //         beforeEach(function(){
        //         });
        //
        //         it("if cached, return cached data", function(){
        //             result1 = container.getChild(wd.EBufferDataType.NORMAL);
        //             result2 = container.getChild(wd.EBufferDataType.NORMAL);
        //
        //             judgeCache(new Float32Array([
        //                     1,2,2,1,2,2,1,2,2
        //                 ])
        //             );
        //         });
        //         it("if change geometryData.faces, cache miss", function () {
        //             sandbox.stub(geo, "isSmoothShading").returns(true);
        //
        //             result1 = container.getChild(wd.EBufferDataType.NORMAL);
        //
        //             sandbox.spy(result1, "resetData");
        //
        //             var newNormals = [10,-1,-2, 10,4,-1,-3,5,1.2];
        //             geometryData.faces = wd.GeometryUtils.convertToFaces(indices, newNormals);
        //
        //
        //             result2 = container.getChild(wd.EBufferDataType.NORMAL);
        //
        //             judgeResetBufferData(result1, result2, newNormals);
        //         });
        //     });
        //
        //     it("update geometry buffer vbo data instead of creating new one", function(){
        //         bufferContainerTool.judgeUpdateBufferData(container, gl, wd.EBufferDataType.NORMAL);
        //     });
        // });

        describe("get jointIndice buffer", function(){
            beforeEach(function(){
                geometryData.jointIndices = [
                    0, 0, 1, 1,
                    1, 1, 1, 0,
                    0, 0, 0, 0
                ];

                prepareBufferContainer();
            });

            describe("test cache", function(){
                it("if cached, return cached data", function(){
                    result1 = container.getChild(wd.EBufferDataType.JOINT_INDICE);
                    result2 = container.getChild(wd.EBufferDataType.JOINT_INDICE);

                    judgeCache(
                        new Float32Array(
                            geometryData.jointIndices
                        )
                    );
                });
                it("if change geometryData.jointIndices, cache miss", function () {
                    result1 = container.getChild(wd.EBufferDataType.JOINT_INDICE);

                    sandbox.spy(result1, "resetData");

                    var newJointIndices = [
                        1, 1, 1, 0,
                        0, 0, 1, 1,
                        0, 0, 0, 0
                    ];
                    geometryData.jointIndices = newJointIndices;


                    result2 = container.getChild(wd.EBufferDataType.JOINT_INDICE);


                    judgeResetBufferData(result1, result2, newJointIndices);
                });
            });

            it("update geometry buffer vbo data instead of creating new one", function(){
                bufferContainerTool.judgeUpdateBufferData(container, gl, wd.EBufferDataType.JOINT_INDICE);
            });
        });

        describe("get jointWeight buffer", function(){
            beforeEach(function(){
                geometryData.jointWeights = [
                    0, 0, 1, 0,
                    0.2, 0.5, 0.3, 0,
                    0, 0, 0, 0
                ];

                prepareBufferContainer();
            });

            describe("test cache", function(){
                it("if cached, return cached data", function(){
                    result1 = container.getChild(wd.EBufferDataType.JOINT_WEIGHT);
                    result2 = container.getChild(wd.EBufferDataType.JOINT_WEIGHT);

                    judgeCache(
                        new Float32Array(
                            geometryData.jointWeights
                        )
                    );
                });
                it("if change geometryData.jointWeights, cache miss", function () {
                    result1 = container.getChild(wd.EBufferDataType.JOINT_WEIGHT);

                    sandbox.spy(result1, "resetData");

                    var newJointWeights = [
                        0.2, 0.5, 0.3, 0,
                        0, 0, 1, 0,
                        0, 0, 0, 0
                    ];
                    geometryData.jointWeights = newJointWeights;


                    result2 = container.getChild(wd.EBufferDataType.JOINT_WEIGHT);


                    judgeResetBufferData(result1, result2, newJointWeights);
                });
            });

            it("update geometry buffer vbo data instead of creating new one", function(){
                bufferContainerTool.judgeUpdateBufferData(container, gl, wd.EBufferDataType.JOINT_WEIGHT);
            });
        });
    });
});

