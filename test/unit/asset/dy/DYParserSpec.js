describe("DYParser", function () {
    var sandbox = null;
    var parser = null;
    var json = null;

    function setJson(data) {
        testTool.extend(json, data);

        return testTool.extendDeep(json);
    }

    function setObject(data) {
        data = testTool.extend({
            vertices: [],
            morphTargets: [],
            normals: [],
            colors: [],
            uvs: [],
            indices: []
        }, data);

        json.objects.push(data);

        return testTool.extendDeep(json);
    }

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        parser = new dy.DYParser();

        json = {
            scene: {},
            materials: {},
            objects: []
        }
    });
    afterEach(function () {
        sandbox.restore();
    });

    describe("parse scene", function () {
        it("parse ambientColor", function () {
            setJson({
                scene: {
                    ambientColor: [1.0, 0, 0.5]
                }
            })

            var result = parser.parse(json);

            expect(result.scene.ambientColor).toEqual(dy.Color.create("rgb(1.0,0.0,0.5)"));
        });
    });

    describe("parse material", function () {
        it("parse diffuseColor,specularColor", function () {
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
        it("color's rgb can exceed 1", function () {
            setJson({
                materials: {
                    a: {
                        diffuseColor: [2, 2, 2],
                        specularColor: [10, 10, 10]
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

    describe("parseObject", function () {
        function getObject(result, index) {
            if (result.objects instanceof dyCb.Collection) {
                return result.objects.getChild(index);
            }

            return result.objects[index];
        }

        function getObjectChild(result, firstIndex, secondIndex) {
            if (result.objects instanceof dyCb.Collection) {
                return result.objects.getChild(firstIndex).children.getChild(secondIndex);
            }

            return result.objects[firstIndex].children[secondIndex];
        }

        beforeEach(function () {

        });

        describe("parse vertices,morphTargets->vertices,colors,uvs,indices(add duplicate vertexData to make it independent)", function () {
            it("parse files which's format likes the one converted from .md2", function () {
                setObject({
                    name: "a",
                    vertices: [1, 2, 3, 4, -1, -2, 3, 2, 3, 4, -1, -4],
                    morphTargets: [
                        {
                            name: "frame",
                            vertices: [2, 2, 3, 4, -1, -2, 2, 2, 3, 4, -1, -2]
                        }
                    ],
                    colors: [1.0, 0.1, 0.1, 0.2, 0.2, 0.2, 1.0, 0.2, 0.1, 0.2, 0.2, 0.3],
                    uvs: [1.0, 0.1, 0.1, 0.2, 0.2, 0.2, 0.3, 0.5],
                    verticeIndices: [0, 1, 2, 1, 3, 2],
                    uvIndices: [2, 0, 1, 1, 3, 2]
                })
                var result = parser.parse(json);

                expect(getObject(result, 0).vertices.getChildren()).toEqual(
                    [1, 2, 3, 4, -1, -2, 3, 2, 3, 4, -1, -2, 4, -1, -4, 3, 2, 3]
                )
                expect(getObject(result, 0).morphTargets.getChild(0).vertices.getChildren()).toEqual(
                    [2, 2, 3, 4, -1, -2, 2, 2, 3, 4, -1, -2, 4, -1, -2, 2, 2, 3]
                )
                expect(testTool.getValues(getObject(result, 0).colors.getChildren())).toEqual(
                    [1, 0.1, 0.1, 0.2, 0.2, 0.2, 1, 0.2, 0.1, 0.2, 0.2, 0.2, 0.2, 0.2, 0.3, 1, 0.2, 0.1]
                )
                expect(testTool.getValues(getObject(result, 0).uvs.getChildren())).toEqual(
                    [0.2, 0.2, 1, 0.1, 0.1, 0.2, 0.1, 0.2, 0.3, 0.5, 0.2, 0.2]
                )
                expect(getObject(result, 0).indices.getChildren()).toEqual(
                    [0, 1, 2, 3, 4, 5]
                )
            });
            it("parse files which's format likes the one converted from .obj", function () {
                setObject({
                    name: "object container",
                    vertices: [1, 2, 3, 4, -1, -2, 3, 2, 3, 4, -1, -4],
                    colors: [1.0, 0.1, 0.1, 0.2, 0.2, 0.2, 1.0, 0.2, 0.1, 0.2, 0.2, 0.3],
                    uvs: [1.0, 0.1, 0.1, 0.2, 0.2, 0.2, 0.3, 0.5],
                    children: [
                        {
                            name: "child1",
                            morphTargets: [
                                {
                                    name: "frame1",
                                    vertices: [2, 2, 3, 4, -1, -2, 2, 2, 3, 4, -1, -2]
                                }
                            ],
                            verticeIndices: [0, 1, 2, 1, 3, 2],
                            uvIndices: [2, 0, 1, 1, 3, 2]

                        },
                        {
                            name: "child2",
                            morphTargets: [
                                {
                                    name: "frame1",
                                    vertices: [-1, 2, 3, 4, -1, -2, 2, 2, 3, 1, -1, -2]
                                }
                            ],
                            verticeIndices: [0, 1, 2, 1, 2, 3]

                        }
                    ]
                })
                var result = parser.parse(json);

                var objectContainer = getObject(result, 0);
                expect(objectContainer.vertices).toBeUndefined();
                expect(objectContainer.uvs).toBeUndefined();
                expect(objectContainer.normals).toBeUndefined();
                expect(objectContainer.colors).toBeUndefined();


                var object1 = objectContainer.children.getChild(0);
                expect(object1.vertices.getChildren()).toEqual(
                    [1, 2, 3, 4, -1, -2, 3, 2, 3, 4, -1, -2, 4, -1, -4, 3, 2, 3]
                )
                expect(object1.morphTargets.getChild(0).vertices.getChildren()).toEqual(
                    [2, 2, 3, 4, -1, -2, 2, 2, 3, 4, -1, -2, 4, -1, -2, 2, 2, 3]
                )
                expect(testTool.getValues(object1.colors.getChildren())).toEqual(
                    [1, 0.1, 0.1, 0.2, 0.2, 0.2, 1, 0.2, 0.1, 0.2, 0.2, 0.2, 0.2, 0.2, 0.3, 1, 0.2, 0.1]
                )
                expect(testTool.getValues(object1.uvs.getChildren())).toEqual(
                    [0.2, 0.2, 1, 0.1, 0.1, 0.2, 0.1, 0.2, 0.3, 0.5, 0.2, 0.2]
                )
                expect(object1.indices.getChildren()).toEqual(
                    [0, 1, 2, 3, 4, 5]
                )


                var object2 = objectContainer.children.getChild(1);
                expect(object2.vertices.getChildren()).toEqual(
                    [1, 2, 3, 4, -1, -2, 3, 2, 3, 4, -1, -2, 3, 2, 3, 4, -1, -4]
                )
                expect(object2.morphTargets.getChild(0).vertices.getChildren()).toEqual(
                    [-1, 2, 3, 4, -1, -2, 2, 2, 3, 4, -1, -2, 2, 2, 3, 1, -1, -2]
                )
                expect(testTool.getValues(object2.colors.getChildren())).toEqual(
                    [1, 0.1, 0.1, 0.2, 0.2, 0.2, 1, 0.2, 0.1, 0.2, 0.2, 0.2, 1, 0.2, 0.1, 0.2, 0.2, 0.3]
                )
                expect(testTool.getValues(object2.uvs.getChildren())).toEqual(
                    [1, 0.1, 0.1, 0.2, 0.2, 0.2, 0.1, 0.2, 0.2, 0.2, 0.3, 0.5]
                )
                expect(object2.indices.getChildren()).toEqual(
                    [0, 1, 2, 3, 4, 5]
                )
            });
        });

        describe("parse normals", function () {
            beforeEach(function () {

            });

            describe("if normals exist, parse it", function () {
                it("parse files which's format likes the one converted from .md2", function () {
                    setObject({
                        name: "a",
                        vertices: [1, 2, 3, 4, -1, -2, 3, 2, 3, 4, -1, -4],
                        normals: [1, 1, 2, 4, -1, -2, 3, 2, 3, -2, 0, -4],
                        morphTargets: [
                            {
                                name: "frame",
                                vertices: [2, 2, 3, 4, -1, -2, 2, 2, 3, 4, -1, -2],
                                normals: [5, 1, 2, 4, -1, -2, 3, 2, 3, -2, 0, -4]
                            }
                        ],
                        colors: [1.0, 0.1, 0.1, 0.2, 0.2, 0.2, 1.0, 0.2, 0.1, 0.2, 0.2, 0.3],
                        uvs: [1.0, 0.1, 0.1, 0.2, 0.2, 0.2, 0.3, 0.5],
                        verticeIndices: [0, 1, 2, 1, 3, 2],
                        normalIndices: [1, 2, 3, 0, 3, 2],
                        uvIndices: [0, 1, 3, 1, 0, 2]
                    })
                    var result = parser.parse(json);

                    expect(getObject(result, 0).normals.getChildren()).toEqual(
                        [4, -1, -2, 3, 2, 3, -2, 0, -4, 1, 1, 2, -2, 0, -4, 3, 2, 3]
                    )
                    expect(getObject(result, 0).morphTargets.getChild(0).normals.getChildren()).toEqual(
                        [4, -1, -2, 3, 2, 3, -2, 0, -4, 5, 1, 2, -2, 0, -4, 3, 2, 3]
                    )
                });
                it("parse files which's format likes the one converted from .obj", function () {
                    setObject({
                        name: "object container",
                        vertices: [1, 2, 3, 4, -1, -2, 3, 2, 3, 4, -1, -4],
                        colors: [1.0, 0.1, 0.1, 0.2, 0.2, 0.2, 1.0, 0.2, 0.1, 0.2, 0.2, 0.3],
                        uvs: [1.0, 0.1, 0.1, 0.2, 0.2, 0.2, 0.3, 0.5],
                        children: [
                            {
                                name: "child1",
                                morphTargets: [
                                    {
                                        name: "frame",
                                        vertices: [3, 2, 3, 4, -1, -2, 3, 2, 3, 4, -1, -4]
                                    }
                                ],
                                verticeIndices: [0, 1, 2, 1, 3, 2],
                                uvIndices: [2, 0, 1, 1, 3, 2]

                            }
                        ]
                    })
                    var result = parser.parse(json);


                    var objectContainer = result.objects.getChild(0);
                    var object1 = objectContainer.children.getChild(0);
                    expect(object1.normals.getChildren()).toEqual(
                        [0, -0.8574929237365723, 0.5144957304000854, 0, -0.8574929237365723, 0.5144957304000854, 0, -0.8574929237365723, 0.5144957304000854, 0.9486833214759827, 0.3162277638912201, 0, 0.9486833214759827, 0.3162277638912201, 0, 0.9486833214759827, 0.3162277638912201, 0]
                    )
                    expect(object1.morphTargets.getChild(0).normals.getChildren()).toEqual(
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0.9486833214759827, 0.3162277638912201, 0, 0.9486833214759827, 0.3162277638912201, 0, 0.9486833214759827, 0.3162277638912201, 0]
                    )
                });
            });
        });
    });
});

