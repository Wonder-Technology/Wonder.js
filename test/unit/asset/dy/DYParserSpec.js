describe("DYParser", function () {
    var sandbox = null;
    var parser = null;
    var json = null;

    function setJson(data){
        testTool.extend(json, data);

        return testTool.extendDeep(json);
    }

    function setObject(data){
        for(var i in data){
            if (data.hasOwnProperty(i)) {
                data[i] = testTool.extend({
                    vertices: [],
                    morphTargets: [],
                    normals: [],
                    colors: [],
                    uvs: [],
                    indices: []
                }, data[i]);
            }
        }

        json.objects = data;

        return testTool.extendDeep(json);
    }

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        parser = new dy.DYParser();

        json = {
            scene:{},
            materials:{},
            objects:{
            }
        }
    });
    afterEach(function () {
        sandbox.restore();
    });
    
    describe("parse scene", function(){
        it("parse ambientColor", function(){
            setJson({
                scene:{
                    ambientColor: [1.0, 0, 0.5]
                }
            })

            var result = parser.parse(json);

            expect(result.scene.ambientColor).toEqual(dy.Color.create("rgb(1.0,0.0,0.5)"));
        });
    });

    describe("parse material", function(){
        it("parse ambientColor", function(){
            setJson({
                materials: {
                    a: {
                        diffuseColor: [0, 0, 1],
                        specularColor: [0.1, 0.2, 1.0]
                    },
                    b: {
                        diffuseColor: [0, 0, 1],
                        specularColor: [0.1, 0.2, 1.0]
                    }
                }
            })

            var result = parser.parse(json);

            expect(result.materials.a.diffuseColor).toEqual(dy.Color.create("rgb(0.0,0.0,1.0)"));
            expect(result.materials.a.specularColor).toEqual(dy.Color.create("rgb(0.1,0.2,1.0)"));
            expect(result.materials.b.diffuseColor).toEqual(dy.Color.create("rgb(0.0,0.0,1.0)"));
            expect(result.materials.b.specularColor).toEqual(dy.Color.create("rgb(0.1,0.2,1.0)"));
        });
    });

    describe("parseObject", function(){
        beforeEach(function(){

        });

        it("parse vertices,morphTargets->vertices,colors,uvs,indices", function(){
            var copy = setObject({
                    a:{
                        vertices:[1, 2, 3, 4, -1, -2],
                        morphTargets: [
                            {vertices: [1, 2, 3, 4, -1, -2] }
                        ],
                        colors: [1.0,0.1,0.1,0.2,0.2,0.2],
                        uvs:[1.0,0.1,0.1,0.2,0.2,0.2],
                        indices:[1,2,3,5,4,6]
                    }
            })
            var result = parser.parse(json);

            expect(result.objects.a.vertices.getChildren()).toEqual(
                copy.objects.a.vertices
            )
            expect(result.objects.a.morphTargets[0].vertices.getChildren()).toEqual(
                copy.objects.a.morphTargets[0].vertices
            )
            expect(result.objects.a.colors.getChildren()).toEqual(
                copy.objects.a.colors
            )
            expect(result.objects.a.uvs.getChildren()).toEqual(
                copy.objects.a.uvs
            )
            expect(result.objects.a.indices.getChildren()).toEqual(
                copy.objects.a.indices
            )
        });

        describe("parse normals", function(){
            beforeEach(function(){

            });

            it("if normals exist, parse it", function(){
                var copy = setObject({
                        a: {
                            normals: [1, 2, 3, 4, -1, -2]
                        }
                })
                var result = parser.parse(json);

                expect(result.objects.a.normals.getChildren()).toEqual(
                    copy.objects.a.normals
                );
            });
            it("else, compute it", function(){
                var copy = setObject({
                        a:{
                            vertices: [1, 2, 3, 2, 3, 4, 3, 4, -5],
                            indices: [0, 1, 2, 3, 4, 5, 6, 7, 8]
                        }
                })
                var result = parser.parse(json);

                expect(result.objects.a.normals.getChildren()).toEqual(
[-0.7071067690849304,0.7071067690849304,0]
                );
            });
        });

        describe("parse morphTargets->normals", function(){
            beforeEach(function(){

            });

            it("if normals exist, parse it", function(){
                var copy = setObject({
                        a:{
                            morphTargets: [
                                {normals: [1, 2, 3, 4, -1, -2] }
                            ]
                        }
                })
                var result = parser.parse(json);

                expect(result.objects.a.morphTargets[0].normals.getChildren()).toEqual(
                    copy.objects.a.morphTargets[0].normals
                );
            });
            it("else, compute it", function(){
                var copy = setObject({
                        a:{
                            morphTargets: [
                                {vertices: [1, 2, 3, 2, 3, 4, 3, 4, -5] }
                            ],
                            indices: [0, 1, 2, 3, 4, 5, 6, 7, 8]
                        }
                })
                var result = parser.parse(json);

                expect(result.objects.a.morphTargets[0].normals.getChildren()).toEqual(
                    [-0.7071067690849304,0.7071067690849304,0]
                );
            });
        });

        describe("parse children", function(){
            it("parse vertices,morphTargets->vertices,colors,uvs,indices", function(){
            var copy = setObject({
                    a:{
                        children:{
                            aa:{
                                vertices:[1, 2, 3, 4, -1, -2],
                                morphTargets: [
                                    {vertices: [1, 2, 3, 4, -1, -2] }
                                ],
                                colors: [1.0,0.1,0.1,0.2,0.2,0.2],
                                uvs:[1.0,0.1,0.1,0.2,0.2,0.2],
                                indices:[1,2,3,5,4,6]
                            }
                        }
                    }
            })
            var result = parser.parse(json);

            expect(result.objects.a.children.aa.vertices.getChildren()).toEqual(
                copy.objects.a.children.aa.vertices
            )
            expect(result.objects.a.children.aa.morphTargets[0].vertices.getChildren()).toEqual(
                copy.objects.a.children.aa.morphTargets[0].vertices
            )
            expect(result.objects.a.children.aa.colors.getChildren()).toEqual(
                copy.objects.a.children.aa.colors
            )
            expect(result.objects.a.children.aa.uvs.getChildren()).toEqual(
                copy.objects.a.children.aa.uvs
            )
            expect(result.objects.a.children.aa.indices.getChildren()).toEqual(
                copy.objects.a.children.aa.indices
            )
            });

            describe("parse normals", function(){
                beforeEach(function(){

                });

                it("if normals exist, parse it", function(){
                    var copy = setObject({
                        a: {
                            children: {
                                aa: {
                                    morphTargets:[],
                                    normals: [1, 2, 3, 4, -1, -2]
                                }
                            }
                        }
                    })
                    var result = parser.parse(json);

                    expect(result.objects.a.children.aa.normals.getChildren()).toEqual(
                        copy.objects.a.children.aa.normals
                    );

                });
                it("else, compute it", function(){
                var copy = setObject({
                        a: {
                            children: {
                                aa: {
                                    morphTargets:[],
                                    vertices: [1, 2, 3, 2, 3, 4, 3, 4, -5],
                                    indices: [0, 1, 2, 3, 4, 5, 6, 7, 8]
                                }
                            }
                        }
                })
                var result = parser.parse(json);

                expect(result.objects.a.children.aa.normals.getChildren()).toEqual(
[-0.7071067690849304,0.7071067690849304,0]
                );
                });
            });

            describe("parse morphTargets->normals", function(){
                beforeEach(function(){

                });

                it("if normals exist, parse it", function(){
                    var copy = setObject({
                        a: {
                            children: {
                                aa: {
                                    morphTargets: [
                                        {normals: [1, 2, 3, 4, -1, -2]}
                                    ]
                                }
                            }}
                    })
                    var result = parser.parse(json);

                    expect(result.objects.a.children.aa.morphTargets[0].normals.getChildren()).toEqual(
                        copy.objects.a.children.aa.morphTargets[0].normals
                    );
                });
                it("else, compute it", function(){
                    var copy = setObject({
                        a:{
                                children: {
                                    aa: {
                                        morphTargets: [
                                            {vertices: [1, 2, 3, 2, 3, 4, 3, 4, -5]}
                                        ],
                                        indices: [0, 1, 2, 3, 4, 5, 6, 7, 8]
                                    }
                                }}
                    })
                    var result = parser.parse(json);

                    expect(result.objects.a.children.aa.morphTargets[0].normals.getChildren()).toEqual(
                        [-0.7071067690849304,0.7071067690849304,0]
                    );
                });
            });

            it("if child's geometry data is null, use its parent's data", function(){
                var copy = setObject({
                    a:{
                        morphTargets:[],
                        vertices: [1, 2, 3, 2, 3, 4, 3, 4, -5],
                        indices: [0, 1, 2, 3, 4, 5, 6, 7, 8],
                        uvs:[0.0,1.1,0.1,0.2,0.2,0.2],

                        children: {
                            aa: {
                                morphTargets: [],
                                uvs:[1.0,0.1,0.1,0.2,0.2,0.2],
                            }
                        }}
                })
                var result = parser.parse(json);

                expect(result.objects.a.children.aa.vertices.getChildren()).toEqual(
                    copy.objects.a.vertices
                );
                expect(result.objects.a.children.aa.indices.getChildren()).toEqual(
                    copy.objects.a.indices
                );
                expect(result.objects.a.children.aa.uvs.getChildren()).toEqual(
                    copy.objects.a.children.aa.uvs
                );
                expect(result.objects.a.children.aa.normals.getChildren()).toEqual(
                    [-0.7071067690849304,0.7071067690849304,0]
                );
            });
        });
    });
});

