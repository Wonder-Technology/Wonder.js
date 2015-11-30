describe("MorphBufferContainer", function() {
    var sandbox = null;
    var container = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        container= new dy.MorphBufferContainer();
    });
    afterEach(function () {
        sandbox.restore();
    });

    describe("get data buffer", function(){
        var model,geo,geometryData,animation;

        function createAnimation(){
            var animation = dy.MorphAnimation.create();

            return animation;
        }

        beforeEach(function(){
            sandbox.stub(dy.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));
            geo = new dy.ModelGeometry();
            geo.material = {
                init:sandbox.stub()
            }

            geo.morphTargets = wdCb.Hash.create({
                "play": wdCb.Collection.create(
                    [
                        [1, -1, 0, 0, 1, 0, 0, 0, 1],
                        [3, -1, 0, 0, 1, 0, 0, 0, 1],
                        [5, -1, 0, 0, 1, 0, 0, 0, 1]
                    ]
                )
            });

            model = dy.GameObject.create();
            model.addComponent(geo);

            animation = createAnimation();
            model.addComponent(animation);
        });
        afterEach(function(){
            testTool.clearInstance();
        });

        describe("get vertice buffer", function(){
            beforeEach(function(){
                geo.vertices = [1,-1,0, 0,1,0,0,0,1];
                geo.faces = dy.GeometryUtils.convertToFaces([0,2,1]);
                geo.texCoords = [];
                geo.colors = [];


                geo.init();


                geometryData = geo.buffers.geometryData;
                container = geo.buffers;
            });

            it("if not play animation, return static data", function(){
                var result1 = container.getChild(dy.BufferDataType.VERTICE);

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

                var result1 = container.getChild(dy.BufferDataType.VERTICE);
                var result2 = container.getChild(dy.BufferDataType.VERTICE);

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
        });
    });
});

