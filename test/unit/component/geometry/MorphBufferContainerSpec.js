describe("MorphBufferContainer", function() {
    var sandbox = null;
    var container = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        container= new wd.MorphBufferContainer();
    });
    afterEach(function () {
        sandbox.restore();
    });

    describe("get data buffer", function(){
        var model,geo,geometryData,animation;
        var gl;

        function createAnimation(){
            var animation = wd.MorphAnimation.create();

            return animation;
        }

        function prepareBufferContainer(){
            container.init();
        }

        beforeEach(function(){
            sandbox.stub(wd.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));

            gl = wd.DeviceManager.getInstance().gl;

            geo = new wd.ModelGeometry();
            geo.material = wd.BasicMaterial.create();


            geometryData = wd.MorphGeometryData.create(geo);

            geo.geometryData = geometryData;



            animation = createAnimation();



            model = wd.GameObject.create();
            model.addComponent(geo);

            model.addComponent(animation);




            container = wd.MorphBufferContainer.create(model, animation);

            container.geometryData = geometryData;

            geo.buffers = container;


            geometryData.morphTargets = wdCb.Hash.create({
                "play": wdCb.Collection.create(
                    [
                        [1, -1, 0, 0, 1, 0, 0, 0, 1],
                        [3, -1, 0, 0, 1, 0, 0, 0, 1],
                        [5, -1, 0, 0, 1, 0, 0, 0, 1]
                    ]
                )
            });


            geo.morphTargets = geometryData.morphTargets;
        });
        afterEach(function(){
            testTool.clearInstance(sandbox);
        });

        describe("getBufferForRenderSort", function(){
            it("return null", function () {
                expect(container.getBufferForRenderSort()).toBeNull();
            });
        });

        describe("get vertice buffer", function(){
            beforeEach(function(){
                geometryData.vertices = [1,-1,0, 0,1,0,0,0,1];
                geometryData.faces = wd.GeometryUtils.convertToFaces([0,2,1]);
                geometryData.texCoords = [];
                geometryData.colors = [];


                prepareBufferContainer();
            });

            it("if not play animation, return static data", function(){
                var result1 = container.getChild(wd.EBufferDataType.VERTICE);

                expect(result1.length).toEqual(2);
                expect(result1[0].data).toEqual(
                    new Float32Array([
                        1,-1,0, 0,1,0,0,0,1
                    ])
                );
                expect(result1[1].data).toEqual(
                    new Float32Array([
                        1, -1, 0, 0, 1, 0, 0, 0, 1
                    ])
                );
                expect(animation.interpolation).toEqual(0);
            });
            it("if cached, return cached data", function(){
                animation.play("play", 10);

                var result1 = container.getChild(wd.EBufferDataType.VERTICE);
                var result2 = container.getChild(wd.EBufferDataType.VERTICE);

                expect(result1.length).toEqual(2);
                expect(result1[0].data).toEqual(
                    new Float32Array([
                        1,-1,0, 0,1,0,0,0,1
                    ])
                );
                expect(result1[1].data).toEqual(
                    new Float32Array([
                        3, -1, 0, 0, 1, 0, 0, 0, 1
                    ])
                );
                expect(result2===result1).toBeTruthy();
            });
            it("bug test: test buffer type in the case that cached and animation frame change", function(){
                animation.play("play", 10);
                animation.isFrameChange = true;

                var result1 = container.getChild(wd.EBufferDataType.VERTICE);
                var result2 = container.getChild(wd.EBufferDataType.VERTICE);

                expect(result1[0].type).toBeDefined();
                expect(result1[1].type).toBeDefined();
            });


            describe("update geometry buffer vbo data instead of creating new one", function(){
                it("test static data", function(){
                    bufferContainerTool.judgeUpdateBufferData(container, gl, wd.EBufferDataType.VERTICE, 2);
                });
                it("test morph data", function(){
                    animation.play("play", 10);

                    bufferContainerTool.judgeUpdateBufferData(container, gl, wd.EBufferDataType.VERTICE, 2, function(){
                        expect(gl.bufferSubData.callCount).toEqual(2);
                    });
                });
            });
        });
    });
});

