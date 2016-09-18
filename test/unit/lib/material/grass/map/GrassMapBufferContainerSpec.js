describe("GrassMapBufferContainer", function() {
    var sandbox = null;
    var container = null;
    var gl;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        container= new wd.GrassMapBufferContainer();
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

        function setGeometryCommonData(){
            geometryData.vertices = [1,2,2,10,4,-1,-3,5,1.2];
            geometryData.faces = wd.GeometryUtils.convertToFaces([0,2,1]);
            geometryData.texCoords = [];
            geometryData.colors = [];
        }

        beforeEach(function(){
            geo = new wd.GrassMapGeometry();
            geo.material = wd.GrassMapMaterial.create();

            sandbox.stub(wd.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));

            gl = wd.DeviceManager.getInstance().gl;

            geometryData = wd.GrassMapGeometryData.create(geo);


            container.geometryData = geometryData;

            geo.buffers = container;


            testTool.openContractCheck(sandbox);
        });
        afterEach(function(){
            testTool.clearInstance(sandbox);
        });

        describe("getBufferForRenderSort", function(){
            it("return vertice buffer", function () {
                setGeometryCommonData();

                prepareBufferContainer();



                result1 = container.getBufferForRenderSort();



                expect(testTool.getValues(result1.data)).toEqual(geometryData.vertices);
            });
        });

        describe("createBuffersFromGeometryData", function(){
            beforeEach(function(){

            });

            it("create quadIndex buffer", function(){
                var quadIndices = [
                    0,0,0,0,
                    1,1,1,1,
                    2,2,2,2
                ];
                geometryData.quadIndices = quadIndices;
                setGeometryCommonData();
                prepareBufferContainer();

                container.createBuffersFromGeometryData();

                expect(container._quadIndexBuffer).not.toBeNull();
                expect(testTool.getValues(
                    container._quadIndexBuffer.data
                )).toEqual(quadIndices);
            });
        });

        describe("get quadIndex buffer", function(){
            var quadIndices;

            beforeEach(function(){
                quadIndices = [
                    0,0,0,0,
                    1,1,1,1,
                    2,2,2,2
                ];
                geometryData.quadIndices = quadIndices;

                prepareBufferContainer();
            });

            describe("test cache", function(){
                beforeEach(function(){
                });

                it("if cached, return cached data", function(){
                    result1 = container.getChild(wd.EBufferDataType.CUSTOM, "quadIndices");
                    result2 = container.getChild(wd.EBufferDataType.CUSTOM, "quadIndices");


                    judgeCache(new Float32Array(quadIndices)
                    );
                });
                it("if change geometryData.vertices, cache miss", function () {
                    result1 = container.getChild(wd.EBufferDataType.CUSTOM, "quadIndices");

                    sandbox.spy(result1, "resetData");

                    geometryData.quadIndices = [1,1,1];


                    result2 = container.getChild(wd.EBufferDataType.CUSTOM, "quadIndices");


                    judgeResetBufferData(result1, result2, [1,1,1]);
                });
            });

            it("update geometry buffer vbo data instead of creating new one", function(){
                bufferContainerTool.judgeUpdateBufferData(container, gl, {type:wd.EBufferDataType.CUSTOM, name:"quadIndices"});
            });
        });
    });
});

