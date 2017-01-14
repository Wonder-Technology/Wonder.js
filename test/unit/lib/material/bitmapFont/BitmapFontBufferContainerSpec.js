describe("BitmapFontBufferContainer", function() {
    var sandbox = null;
    var container = null;
    var gl;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        container= new wd.BitmapFontBufferContainer();
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
            geo = new wd.BitmapFontGeometry();
            geo.material = wd.BitmapFontMaterial.create();

            sandbox.stub(wd.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));

            gl = wd.DeviceManager.getInstance().gl;

            geometryData = wd.BitmapFontGeometryData.create(geo);


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

            it("create pages buffer", function(){
                testTool.closeContractCheck(sandbox);
                var pages = [1,2,3,1];
                geometryData.pages = pages;
                setGeometryCommonData();
                prepareBufferContainer();

                container.createBuffersFromGeometryData();

                expect(container._pageBuffer).not.toBeNull();
                expect(testTool.getValues(
                    container._pageBuffer.data
                )).toEqual(pages);
            });
        });

        describe("get page buffer", function(){
            var pages;

            beforeEach(function(){
                pages = [1,2,3,1];

                geometryData.pages = pages;

                prepareBufferContainer();
            });

            describe("test cache", function(){
                beforeEach(function(){

                });

                it("if cached, return cached data", function(){
                    result1 = container.getChild(wd.EBufferDataType.CUSTOM, "pages");
                    result2 = container.getChild(wd.EBufferDataType.CUSTOM, "pages");


                    judgeCache(new Float32Array(pages)
                    );
                });
                it("if change geometryData.vertices, cache miss", function () {
                    result1 = container.getChild(wd.EBufferDataType.CUSTOM, "pages");

                    sandbox.spy(result1, "resetData");

                    geometryData.pages = [1,1,1];


                    result2 = container.getChild(wd.EBufferDataType.CUSTOM, "pages");


                    judgeResetBufferData(result1, result2, [1,1,1]);
                });
            });

            it("update geometry buffer vbo data instead of creating new one", function(){
                bufferContainerTool.judgeUpdateBufferData(container, gl, {type:wd.EBufferDataType.CUSTOM, name:"pages"});
            });
        });
    });
});

