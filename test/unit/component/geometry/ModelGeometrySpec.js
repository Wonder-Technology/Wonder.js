describe("ModelGeometry", function() {
    var sandbox = null;
    var Geometry = null;
    var geo;

    function createGeometry(_class, shading){
        geo = new _class();
        geo.material = {
            init:sandbox.stub(),
            shading: shading || wd.EShading.FLAT
        };

        return geo;
    }

    function createFaces(indices, normals){
        return wd.GeometryUtils.convertToFaces(indices, normals);
    }

    function createAnimation(){
        return wd.MorphAnimation.create();
    }

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        Geometry = wd.ModelGeometry;
        sandbox.stub(wd.DeviceManager.getInstance(), "gl", testTool.buildFakeGl(sandbox));
    });
    afterEach(function () {
        testTool.clearInstance();
        sandbox.restore();
    });
    
    describe("get normalsFromFaceNormal", function(){
        var model;
        var geometryData;

        beforeEach(function(){
            model = wd.GameObject.create();
            geo = createGeometry(Geometry);
            model.addComponent(geo);
            model.addComponent(createAnimation());

            geo.vertices = [1,-1,0, 0,1,0,0,0,1];
            geo.faces = createFaces([0,2,1]);


            geo.init();


            geometryData = geo.buffers.geometryData;
        });
        
        it("if cached, return cache data", function(){
            var normals1 = geometryData.normalsFromFaceNormal;
            var normals2 = geometryData.normalsFromFaceNormal;

            expect(normals2 === normals1).toBeTruthy();
        });
        it("if change normal, not use cache data", function(){
            var normals1 = geometryData.normalsFromFaceNormal;
            geometryData.faces = geometryData.faces;
            var normals2 = geometryData.normalsFromFaceNormal;

            expect(normals2 === normals1).toBeFalsy();


            var normals3 = geometryData.normalsFromFaceNormal;

            expect(normals3 === normals2).toBeTruthy();
        });

    });

    describe("get normalsFromVertexNormals", function(){
        var model;
        var geometryData;

        beforeEach(function(){
            model = wd.GameObject.create();
            geo = createGeometry(Geometry);
            model.addComponent(geo);
            model.addComponent(createAnimation());

            geo.vertices = [1,-1,0, 0,1,0,0,0,1];
            geo.faces = createFaces([0,2,1]);


            geo.init();


            geometryData = geo.buffers.geometryData;
        });

        it("if cached, return cache data", function(){
            var normals1 = geometryData.normalsFromVertexNormals;
            var normals2 = geometryData.normalsFromVertexNormals;

            expect(normals2 === normals1).toBeTruthy();
        });
        it("if change normal, not use cache data", function(){
            var normals1 = geometryData.normalsFromVertexNormals;
            geometryData.faces = geometryData.faces;
            var normals2 = geometryData.normalsFromVertexNormals;

            expect(normals2 === normals1).toBeFalsy();


            var normals3 = geometryData.normalsFromVertexNormals;

            expect(normals3 === normals2).toBeTruthy();
        });
    });


    describe("computeMorphNormals", function(){
        describe("compute morph face normals", function(){
            it("compute each frame's normal based on triangle point", function(){
                var model = wd.GameObject.create();
                geo = createGeometry(Geometry);
                model.addComponent(geo);
                model.addComponent(createAnimation());

                geo.vertices = [1,-1,0, 0,1,0,0,0,1];
                geo.morphTargets = wdCb.Hash.create({
                    "play": wdCb.Collection.create(
                            [
                                [1, -1, 0, 0, 1, 0, 0, 0, 1],
                                [1, -1, 0, 0, 1, 0, 0, 0, 1],
                                [1, -1, 0, 0, 1, 0, 0, 0, 1]
                            ]
                        )
                })
                geo.faces = createFaces([0,2,1]);


                geo.init();


                var normals = geo.buffers.getChild(wd.EBufferDataType.NORMAL);
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
                var model = wd.GameObject.create();
                geo = createGeometry(Geometry, wd.EShading.SMOOTH);
                model.addComponent(geo);
                model.addComponent(createAnimation());

                geo.vertices = [1,-1,0, 0,1,0,0,0,1, 2,3,-2];
                geo.morphTargets = wdCb.Hash.create({
                    "play": wdCb.Collection.create(
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


                var normals = geo.buffers.getChild(wd.EBufferDataType.NORMAL);
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

