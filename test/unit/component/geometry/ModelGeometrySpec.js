describe("ModelGeometry", function() {
    var sandbox = null;
    var Geometry = null;
    var geo;

    function createGeometry(_class, shading){
        geo = new _class();
        geo.material = {
            init:sandbox.stub(),
            shading: shading || dy.Shading.FLAT
        };

        return geo;
    }

    function createFaces(indices, normals){
        return dy.GeometryUtils.convertToFaces(indices, normals);
    }

    function createAnimation(animName, currentFrame, nextFrame){
        var animation = dy.MorphAnimation.create();
        animation.currentFrame = currentFrame || 0;
        animation.nextFrame = nextFrame || 1;
        animation.currentAnimName = animName;

        return animation;
    }

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        Geometry = dy.ModelGeometry;
        sandbox.stub(dy.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));
    });
    afterEach(function () {
        testTool.clearInstance();
        sandbox.restore();
    });

    describe("computeMorphNormals", function(){
        describe("compute morph face normals", function(){
            it("compute each frame's normal based on triangle point", function(){
                var model = dy.GameObject.create();
                geo = createGeometry(Geometry);
                model.addComponent(geo);
                model.addComponent(createAnimation("play"));

                geo.vertices = [1,-1,0, 0,1,0,0,0,1];
                geo.morphTargets = dyCb.Hash.create({
                    "play": dyCb.Collection.create(
                            [
                                [1, -1, 0, 0, 1, 0, 0, 0, 1],
                                [1, -1, 0, 0, 1, 0, 0, 0, 1],
                                [1, -1, 0, 0, 1, 0, 0, 0, 1]
                            ]
                        )
                })
                geo.faces = createFaces([0,2,1]);


                geo.init();


                var normals = geo.buffers.getChild(dy.BufferDataType.NORMAL);
                expect(normals.length).toEqual(2);

                var currentBuffer = normals[0],
                    nextBuffer = normals[1];
                expect(testTool.getValues(currentBuffer.data)).toEqual(
                    [ -0.8164966, -0.4082483, -0.4082483,
                        -0.8164966, -0.4082483, -0.4082483,
                        -0.8164966, -0.4082483, -0.4082483]
                );
                expect(testTool.getValues(nextBuffer.data)).toEqual(
                    [ -0.8164966, -0.4082483, -0.4082483,
                        -0.8164966, -0.4082483, -0.4082483,
                        -0.8164966, -0.4082483, -0.4082483]
                );
            });
        });

        describe("compute morph vertexNormals", function(){
            it("compute each frame's average vertex normal", function(){
                var model = dy.GameObject.create();
                geo = createGeometry(Geometry, dy.Shading.SMOOTH);
                model.addComponent(geo);
                model.addComponent(createAnimation("play"));

                geo.vertices = [1,-1,0, 0,1,0,0,0,1, 2,3,-2];
                geo.morphTargets = dyCb.Hash.create({
                    "play": dyCb.Collection.create(
                        [
                            [1,-1,0, 0,1,0,0,0,1, 2,3,-2],
                            [1,-1,0, 0,1,0,0,0,1, 2,3,-2],
                            [1,-1,0, 0,1,0,0,0,1, 2,3,-2]
                        ]
                    )
                })
                geo.faces = createFaces([0,2,1, 2,3,1]);

                geo.init();
                //geo.computeMorphVertexNormals();


                var normals = geo.buffers.getChild(dy.BufferDataType.NORMAL);
                expect(normals.length).toEqual(2);

                var currentBuffer = normals[0],
                    nextBuffer = normals[1];
                expect(testTool.getValues(currentBuffer.data)).toEqual(
                    [ -0.8164966, -0.4082483, -0.4082483,
                        -0.8880739, 0.3250575, 0.3250575,
                        -0.8880739, 0.3250575, 0.3250575,
                        0, 0.7071068, 0.7071068 ]
                );
                expect(testTool.getValues(nextBuffer.data)).toEqual(
                    [ -0.8164966, -0.4082483, -0.4082483,
                        -0.8880739, 0.3250575, 0.3250575,
                        -0.8880739, 0.3250575, 0.3250575,
                        0, 0.7071068, 0.7071068 ]
                );
            });
        });
    });
});

