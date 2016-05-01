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
        testTool.clearInstance(sandbox);
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

    describe("clone", function(){
        function judgeCloneMorphData(morphDataName){
            var morphData = wdCb.Hash.create({
                "a": wdCb.Collection.create([[1,2,3]])
            });

            geo[morphDataName] = morphData;

            var result = geo.clone();

            result[morphDataName].getChild("a").getChild(0)[0] = 10;
            expect(geo[morphDataName].getChild("a").getChild(0)[0]).toEqual(1);
        }

        beforeEach(function(){
            geo = wd.ModelGeometry.create();
        });

        it("deep clone faces", function(){
            var face = wd.Face3.create();
            var resultFace = wd.Face3.create();
            sandbox.stub(face, "clone").returns(resultFace);
            var faces = [face];

            cloneTool.extend(geo, {
                faces:faces
            })

            var result = geo.clone();

            expect(result.faces[0] === resultFace).toBeTruthy();
        });
        it("deep clone morphFaceNormals", function(){
            judgeCloneMorphData("morphFaceNormals");
        });
        it("deep clone morphVertexNormals", function(){
            judgeCloneMorphData("morphVertexNormals");
        });
        it("deep clone morphTargets", function(){
            judgeCloneMorphData("morphTargets");
        });
        it("clone other geometry data", function () {
            var vertices = [1,2,3],
                colors = [0.1,0.2,0.3],
                texCoords = [0.3,0.1];

            cloneTool.extend(geo, {
                    vertices: vertices,
                    colors: colors,
                texCoords: texCoords
            })

            var result = geo.clone();

            expect(result.vertices).toEqual(vertices);
            expect(result.vertices === vertices).toBeFalsy();

            expect(result.colors).toEqual(colors);
            expect(result.colors === colors).toBeFalsy();

            expect(result.texCoords).toEqual(texCoords);
            expect(result.texCoords === texCoords).toBeFalsy();
        });
    });

    describe("merge", function(){
        var geo2;

        beforeEach(function(){
            geo = createGeometry(wd.ModelGeometry);

            geo.vertices = [
                2,2,2, 3,3,3, 1,1,1
            ];
            geo.faces = createFaces([
                0, 1, 2
            ]);
        });

        describe("test merge ModelGeometry", function() {
            beforeEach(function () {
                geo2 = wd.ModelGeometry.create();

                geo2.vertices = [
                    1,1,1, 2,2,2, 3,3,3
                ];
                geo2.faces = createFaces([
                    1, 0, 2
                ]);
            });

            describe("merge faces", function () {
                beforeEach(function () {
                });

                it("reset a/b/cIndex", function () {
                    geo.faces = createFaces([0, 2, 1]);

                    geo2.vertices = [
                        1, -1, 0, 0, 1, 0, 0, 0, 1,
                        2, -1, 0, 0, 1, 0, 0, 0, 1
                    ];
                    geo2.faces = createFaces([
                        1, 0, 2,
                        3, 4, 5
                    ]);

                    geo.merge(geo2, wd.ThreeDTransform.create());

                    expect(geo.faces.length).toEqual(3);


                    var face1 = geo.faces[0];
                    expect([face1.aIndex, face1.bIndex, face1.cIndex]).toEqual([0, 2, 1]);

                    var face2 = geo.faces[1];
                    expect([face2.aIndex, face2.bIndex, face2.cIndex]).toEqual([4, 3, 5]);

                    var face3 = geo.faces[2];
                    expect([face3.aIndex, face3.bIndex, face3.cIndex]).toEqual([6, 7, 8]);
                });

                describe("test face normal", function(){
                    beforeEach(function(){
                        geo.faces = createFaces([0,2,1], [1,1,1, 2,2,2, 3,3,3]);

                        geo2.vertices = [
                            2,-1,0, 0,1,0,0,0,1
                        ];
                        geo2.faces = createFaces([
                            1,0,2
                        ], [1,1,1, 2,2,2, 3,3,3]);
                    });

                    it("target->faceNormal apply normalMatrix", function () {
                        var transform = wd.ThreeDTransform.create();
                        transform.rotate(90,0,0);



                        geo.merge(geo2, transform);



                        var face1 = geo.faces[0];
                        expect(testTool.getValues(
                            face1.faceNormal
                        )).toEqual([
                            1,1,1
                        ]);
                        var face2 = geo.faces[1];
                        expect(testTool.getValues(
                            face2.faceNormal
                        )).toEqual([
                            2, -2, 2
                        ]);
                    });
                    it("if target->vertexNormals defined, it should also apply normalMatrix", function () {
                        var transform = wd.ThreeDTransform.create();
                        transform.rotate(90,0,0);



                        geo.merge(geo2, transform);



                        var face1 = geo.faces[0];


                        expect(testTool.getValues(
                            face1.vertexNormals.getChild(1)
                        )).toEqual([
                            3,3,3
                        ]);
                        var face2 = geo.faces[1];
                        expect(testTool.getValues(
                            face2.vertexNormals.getChild(2)
                        )).toEqual([
                            3,-3,3
                        ]);
                    });
                });
            });

            describe("merge vertices", function () {
                it("target->vertices apply modelMatrix", function () {
                    geo.vertices = [
                        2,2,2, 3,3,3, 1,1,1
                    ];
                    geo2.vertices = [
                        1,1,1, 2,2,2, 3,3,3
                    ];

                    geo.faces = createFaces([
                        0, 1, 2
                    ]);
                    geo2.faces = createFaces([
                        1, 0, 2
                    ]);

                    var transform = wd.ThreeDTransform.create();
                    transform.translate(10, 20, 30);


                    geo.merge(geo2, transform);

                    expect(geo.vertices).toEqual( [ 2, 2, 2, 3, 3, 3, 1, 1, 1, 11, 21, 31, 12, 22, 32, 13, 23, 33 ] );
                });
            });

            it("merge colors", function () {
                geo.colors = [
                    0.1,0.2,0.3,
                    0.2,0.2,0.3,
                    0.5,0.5,0.5
                ];
                geo2.colors = [
                    0.2,0.2,0.2,
                    0.1,0.1,0.1,
                    0.5,0.5,0.5
                ];

                var transform = wd.ThreeDTransform.create();


                geo.merge(geo2, transform);

                expect(geo.colors).toEqual([ 0.1, 0.2, 0.3, 0.2, 0.2, 0.3, 0.5, 0.5, 0.5, 0.2, 0.2, 0.2, 0.1, 0.1, 0.1, 0.5, 0.5, 0.5 ]);
            });
            it("merge texCoords", function () {
                geo.texCoords = [
                    0.1,0.1,
                    0.2,0.2,
                    0.5,0.5
                ];
                geo2.texCoords = [
                    0.2,0.2,
                    0.1,0.1,
                    0.5,0.5
                ];

                var transform = wd.ThreeDTransform.create();


                geo.merge(geo2, transform);

                expect(geo.texCoords).toEqual([ 0.1, 0.1, 0.2, 0.2, 0.5, 0.5, 0.2, 0.2, 0.1, 0.1, 0.5, 0.5 ]);            });
        });

        describe("test merge CustomGeometry", function () {
            beforeEach(function () {
                geo2 = wd.CustomGeometry.create();
            });

            //todo test more

            describe("merge faces", function () {
                beforeEach(function () {
                });

                it("reset a/b/cIndex", function () {
                    geo.faces = createFaces([0, 2, 1]);

                    geo2.vertices = [
                        1, -1, 0, 0, 1, 0, 0, 0, 1,
                        2, -1, 0, 0, 1, 0, 0, 0, 1
                    ];
                    geo2.indices = [
                        1, 0, 2,
                        3, 4, 5
                    ];

                    geo.merge(geo2, wd.ThreeDTransform.create());

                    expect(geo.faces.length).toEqual(3);


                    var face1 = geo.faces[0];
                    expect([face1.aIndex, face1.bIndex, face1.cIndex]).toEqual([0, 2, 1]);

                    var face2 = geo.faces[1];
                    expect([face2.aIndex, face2.bIndex, face2.cIndex]).toEqual([4, 3, 5]);

                    var face3 = geo.faces[2];
                    expect([face3.aIndex, face3.bIndex, face3.cIndex]).toEqual([6, 7, 8]);
                });

                //todo test face normal
            });

            it("merge colors", function () {
                geo.colors = [
                    0.1,0.2,0.3,
                    0.2,0.2,0.3,
                    0.5,0.5,0.5
                ];
                geo2.colors = [
                    0.2,0.2,0.2,
                    0.1,0.1,0.1,
                    0.5,0.5,0.5
                ];

                var transform = wd.ThreeDTransform.create();


                geo.merge(geo2, transform);

                expect(geo.colors).toEqual([
                    0.1, 0.2, 0.3, 0.2, 0.2, 0.3, 0.5, 0.5, 0.5,
                    0.2, 0.2, 0.2, 0.1, 0.1, 0.1, 0.5, 0.5, 0.5
                ]);
            });
        });

        describe("test merge SphereGeometry", function () {
            beforeEach(function () {
                geo2 = wd.SphereGeometry.create();

                geo2.radius = 1;
                geo2.segments = 2;
            });

            //todo test more

            describe("merge colors", function () {
                it("SphereGeometry has no colors to be merged", function () {
                    geo.colors = [
                        0.1,0.2,0.3,
                        0.2,0.2,0.3,
                        0.5,0.5,0.5
                    ];

                    var transform = wd.ThreeDTransform.create();


                    geo.merge(geo2, transform);

                    expect(geo.colors).toEqual([ 0.1, 0.2, 0.3, 0.2, 0.2, 0.3, 0.5, 0.5, 0.5]);
                });
            });

            it("merge texCoords", function () {
                geo.texCoords = [
                    0.1,0.1,
                    0.2,0.2,
                    0.5,0.5
                ];

                var transform = wd.ThreeDTransform.create();


                geo.merge(geo2, transform);

                expect(geo.texCoords).toEqual([
                    0.1, 0.1, 0.2, 0.2, 0.5, 0.5,
                    1, 1, 0.5, 1, 0, 1, 1, 0.5, 0.5, 0.5, 0, 0.5, 1, 0, 0.5, 0, 0, 0
                ]);
            });
        });

        //todo test other geometry
    });
});

