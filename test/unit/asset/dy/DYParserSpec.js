describe("DYParser", function () {
    var sandbox = null;
    var parser = null;
    var json = null;

    function setJson(data){
        testTool.extend(json, data);

        return testTool.extendDeep(json);
    }

    function setObject(data){
        //for(var i in data){
        //    if (data.hasOwnProperty(i)) {
                data = testTool.extend({
                    vertices: [],
                    morphTargets: [],
                    normals: [],
                    colors: [],
                    uvs: [],
                    indices: []
                }, data);
            //}
        //}

        json.objects.push(data);

        return testTool.extendDeep(json);
    }

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        parser = new dy.DYParser();

        json = {
            scene:{},
            materials:{},
            objects:[]
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
        it("parse diffuseColor,specularColor", function(){
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

            expect(result.materials.getChild("a").diffuseColor).toEqual(dy.Color.create("rgb(0.0,0.0,1.0)"));
            expect(result.materials.getChild("a").specularColor).toEqual(dy.Color.create("rgb(0.1,0.2,1.0)"));
            expect(result.materials.getChild("b").diffuseColor).toEqual(dy.Color.create("rgb(0.0,0.0,1.0)"));
            expect(result.materials.getChild("b").specularColor).toEqual(dy.Color.create("rgb(0.1,0.2,1.0)"));
        });
        it("color's rgb can exceed 1", function(){
            setJson({
                materials: {
                    a: {
                        diffuseColor: [2, 2, 2],
                        specularColor: [10,10,10]
                    }
                }
            })

            var result = parser.parse(json);

            expect(result.materials.getChild("a").diffuseColor).toEqual(dy.Color.create("rgb(2.0,2.0,2.0)"));
            expect(result.materials.getChild("a").specularColor.r).toEqual(10);
            expect(result.materials.getChild("a").specularColor.g).toEqual(10);
            expect(result.materials.getChild("a").specularColor.b).toEqual(10);
        });
    });

    describe("parseObject", function(){
        function getObject(result, index){
            if(result.objects instanceof dyCb.Collection){
                return result.objects.getChild(index);
            }

            return result.objects[index];
        }

        function getObjectChild(result, firstIndex, secondIndex){
            if(result.objects instanceof dyCb.Collection){
                return result.objects.getChild(firstIndex).children.getChild(secondIndex);
            }

            return result.objects[firstIndex].children[secondIndex];
        }

        beforeEach(function(){

        });

        it("parse vertices,morphTargets->vertices,colors,uvs,indices", function(){
            var copy = setObject({
                name:"a",
                        vertices:[1, 2, 3, 4, -1, -2],
                        morphTargets: [
                            {vertices: [1, 2, 3, 4, -1, -2] }
                        ],
                        colors: [1.0,0.1,0.1,0.2,0.2,0.2],
                        uvs:[1.0,0.1,0.1,0.2,0.2,0.2],
                        indices:[1,2,3,5,4,6]
            })
            var result = parser.parse(json);

            expect(getObject(result, 0).vertices.getChildren()).toEqual(
                getObject(copy, 0).vertices
            )
            expect(getObject(result, 0).morphTargets[0].vertices.getChildren()).toEqual(
                getObject(copy, 0).morphTargets[0].vertices
            )
            expect(getObject(result, 0).colors.getChildren()).toEqual(
                getObject(copy, 0).colors
            )
            expect(getObject(result, 0).uvs.getChildren()).toEqual(
                getObject(copy, 0).uvs
            )
            expect(getObject(result, 0).indices.getChildren()).toEqual(
                getObject(copy, 0).indices
            )
        });

        describe("parse normals", function(){
            beforeEach(function(){

            });

            it("if normals exist, parse it", function(){
                var copy = setObject({
                    name:"a",
                            normals: [1, 2, 3, 4, -1, -2]
                })
                var result = parser.parse(json);

                expect(getObject(result, 0).normals.getChildren()).toEqual(
                    getObject(copy, 0).normals
                );

            });
            it("else, compute it", function(){
                var copy = setObject({
                    name:"a",
                            vertices: [1, 2, 3, 2, 3, 4, 3, 4, -5],
                            indices: [0, 1, 2, 3, 4, 5, 6, 7, 8]
                })
                var result = parser.parse(json);

                expect(getObject(result, 0).normals.getChildren()).toEqual(
[-0.7071067690849304,0.7071067690849304,0]
                );
            });
        });

        describe("parse morphTargets->normals", function(){
            beforeEach(function(){

            });

            it("if normals exist, parse it", function(){
                var copy = setObject({
                    name:"a",
                            morphTargets: [
                                {normals: [1, 2, 3, 4, -1, -2] }
                            ]
                })
                var result = parser.parse(json);

                expect(getObject(result, 0).morphTargets[0].normals.getChildren()).toEqual(
                    getObject(copy, 0).morphTargets[0].normals
                );
            });
            it("else, compute it", function(){
                var copy = setObject({
                    name:"a",
                            morphTargets: [
                                {vertices: [1, 2, 3, 2, 3, 4, 3, 4, -5] }
                            ],
                            indices: [0, 1, 2, 3, 4, 5, 6, 7, 8]
                })
                var result = parser.parse(json);

                expect(getObject(result, 0).morphTargets[0].normals.getChildren()).toEqual(
                    [-0.7071067690849304,0.7071067690849304,0]
                );
            });
        });

        describe("parse children", function(){
            it("parse vertices,morphTargets->vertices,colors,uvs,indices", function(){
            var copy = setObject({
                name:"a",
                        children:[
                            {
                            name:"aa",
                                vertices:[1, 2, 3, 4, -1, -2],
                                morphTargets: [
                                    {vertices: [1, 2, 3, 4, -1, -2] }
                                ],
                                colors: [1.0,0.1,0.1,0.2,0.2,0.2],
                                uvs:[1.0,0.1,0.1,0.2,0.2,0.2],
                                indices:[1,2,3,5,4,6]
                            }
                            ]
            })
            var result = parser.parse(json);

            expect(getObjectChild(result, 0, 0).vertices.getChildren()).toEqual(
                getObjectChild(copy, 0, 0).vertices
            )
            expect(getObjectChild(result, 0, 0).morphTargets[0].vertices.getChildren()).toEqual(
                getObjectChild(copy, 0, 0).morphTargets[0].vertices
            )
            expect(getObjectChild(result, 0, 0).colors.getChildren()).toEqual(
                getObjectChild(copy, 0, 0).colors
            )
            expect(getObjectChild(result, 0, 0).uvs.getChildren()).toEqual(
                getObjectChild(copy, 0, 0).uvs
            )
            expect(getObjectChild(result, 0, 0).indices.getChildren()).toEqual(
                getObjectChild(copy, 0, 0).indices
            )
            });

            describe("parse normals", function(){
                beforeEach(function(){

                });

                it("if normals exist, parse it", function(){
                    var copy = setObject({
                        name:"a",
                            children: [
                                {
                                    name:"aa",
                                    morphTargets:[],
                                    normals: [1, 2, 3, 4, -1, -2]
                                }
                            ]
                    })
                    var result = parser.parse(json);

                    expect(getObjectChild(result, 0, 0).normals.getChildren()).toEqual(
                        getObjectChild(copy, 0, 0).normals
                    );

                });
                it("else, compute it", function(){
                var copy = setObject({
                    name:"a",
                            children: [
                                {
                                    name:"aa",
                                    morphTargets:[],
                                    vertices: [1, 2, 3, 2, 3, 4, 3, 4, -5],
                                    indices: [0, 1, 2, 3, 4, 5, 6, 7, 8]
                                }
                                ]
                })
                var result = parser.parse(json);

                expect(getObjectChild(result, 0, 0).normals.getChildren()).toEqual(
[-0.7071067690849304,0.7071067690849304,0]
                );
                });
            });

            describe("parse morphTargets->normals", function(){
                beforeEach(function(){

                });

                it("if normals exist, parse it", function(){
                    var copy = setObject({
                        name:"a",
                            children: [
                                {
                                    name:"aa",
                                    morphTargets: [
                                        {normals: [1, 2, 3, 4, -1, -2]}
                                        ]
                                }
                                ]
                    })
                    var result = parser.parse(json);

                    expect(getObjectChild(result, 0, 0).morphTargets[0].normals.getChildren()).toEqual(
                        getObjectChild(copy, 0, 0).morphTargets[0].normals
                    );
                });
                it("else, compute it", function(){
                    var copy = setObject({
                        name:"a",
                                children: [
                                    {
                                        name:"aa",
                                        morphTargets: [
                                            {vertices: [1, 2, 3, 2, 3, 4, 3, 4, -5]}
                                        ],
                                        indices: [0, 1, 2, 3, 4, 5, 6, 7, 8]
                                    }
                                    ]
                    })
                    var result = parser.parse(json);

                    expect(getObjectChild(result, 0, 0).morphTargets[0].normals.getChildren()).toEqual(
                        [-0.7071067690849304,0.7071067690849304,0]
                    );
                });
            });

            describe("if child's geometry data is null, use its parent's data", function(){
                it("test", function(){
                    var copy = setObject({
                        name:"a",
                            morphTargets:[],
                            vertices: [1, 2, 3, 2, 3, 4, 3, 4, -5],
                            indices: [0, 1, 2, 3, 4, 5, 6, 7, 8],
                            uvs:[0.0,1.1,0.1,0.2,0.2,0.2],

                            children: [
                                {
                                    name:"aa",
                                    morphTargets: [],
                                    uvs:[1.0,0.1,0.1,0.2,0.2,0.2]
                                }
                                ]
                    })
                    var result = parser.parse(json);

                    expect(getObjectChild(result, 0, 0).vertices.getChildren()).toEqual(
                        getObject(copy, 0).vertices
                    );
                    expect(getObjectChild(result, 0, 0).indices.getChildren()).toEqual(
                        getObject(copy, 0).indices
                    );
                    expect(getObjectChild(result, 0, 0).uvs.getChildren()).toEqual(
                        getObjectChild(copy, 0, 0).uvs
                    );
                    expect(getObjectChild(result, 0, 0).normals.getChildren()).toEqual(
                        [-0.7071067690849304,0.7071067690849304,0]
                    );
                });

                describe("test normals", function(){
                    beforeEach(function(){

                    });

                    it("if child don't has vertices and normals, use its parent's normals", function(){
                        var copy = setObject({
                            name:"a",
                                morphTargets:[],
                                vertices: [3, -2, 3, 2, 3, 4, 3, 4, -5],
                                indices: [0, 1, 2, 3, 4, 5, 6, 7, 8],
                                uvs:[0.0,1.1,0.1,0.2,0.2,0.2],

                                children: [
                                    {
                                        name:"aa",
                                        indices: [0, 1, 2, 3, 4, 5, 6, 7, 8],
                                        morphTargets: [],
                                        uvs:[1.0,0.1,0.1,0.2,0.2,0.2]
                                    }
                                    ]
                        })
                        var result = parser.parse(json);

                        expect(getObjectChild(result, 0, 0).normals.getChildren()).toEqual(
                            [-0.9771763682365417, -0.16994372010231018, -0.12745778262615204]
                        );
                    });
                    it("else if child don't has normals but has vertices, compute child normals", function(){
                        var copy = setObject({
                            name:"a",
                                morphTargets:[],
                                vertices: [1, 2, 3, 2, 3, 4, 3, 4, -5],
                                indices: [0, 1, 2, 3, 4, 5, 6, 7, 8],
                                uvs:[0.0,1.1,0.1,0.2,0.2,0.2],

                                children: [
                                    {
                                        name:"aa",
                                        vertices: [3, -2, 3, 2, 3, 4, 3, 4, -5],
                                        indices: [0, 1, 2, 3, 4, 5, 6, 7, 8],
                                        morphTargets: [],
                                        uvs:[1.0,0.1,0.1,0.2,0.2,0.2]
                                    }
                                    ]
                        })
                        var result = parser.parse(json);

                        expect(getObjectChild(result, 0, 0).normals.getChildren()).toEqual(
                            [-0.9771763682365417, -0.16994372010231018, -0.12745778262615204]
                        );
                    })
                });
            });
        });
    });
});

