var Converter = require("../../../../dist/converter/gulp_task/convertIndices/Converter").Converter,
    testTool = require("../../../../../js/testTool"),
    sinon = require("sinon");

describe("convertIndices->Converter", function(){
    var sandbox = null;
    var converter;

    beforeEach(function(){
        sandbox = sinon.sandbox.create();
        converter = Converter.create();
    });
    afterEach(function () {
        sandbox.restore();
    });

    describe("convert", function(){
        function getPrimitivesDataFromBuildedJson(buildedJson) {
            return buildedJson.meshes.RootNode.primitives;
        }

        function buildJson(positions, texCoords, normals, colors, verticeIndices, texCoordIndices, normalIndices, colorIndices, materialData) {
            materialData = materialData || {material:"a", mode:4}

            return {
                "meshes": {
                    "RootNode": {
                        "primitives": [
                            {
                                "attributes": {
                                    "COLOR": colors,
                                    "NORMAL": normals,
                                    "POSITION": positions,
                                    "TEXCOORD": texCoords
                                },
                                "colorIndices": colorIndices,
                                "normalIndices": normalIndices,
                                "texCoordIndices": texCoordIndices,
                                "verticeIndices": verticeIndices,
                                "material": materialData.material,
                                "mode": materialData.mode
                            }
                        ]
                    }
                }
            }
        }

        function getPositions(resultJson) {
            var primitive = _getPrimitive(resultJson);

            return testTool.getValues(
                primitive.attributes.POSITION
            )
        }

        function getTexCoords(resultJson) {
            var primitive = _getPrimitive(resultJson);

            return testTool.getValues(
                primitive.attributes.TEXCOORD
            )
        }

        function getNormals(resultJson) {
            var primitive = _getPrimitive(resultJson);

            return testTool.getValues(
                primitive.attributes.NORMAL
            )
        }

        function getColors(resultJson) {
            var primitive = _getPrimitive(resultJson);

            return testTool.getValues(
                primitive.attributes.COLOR
            )
        }

        function getIndices(resultJson) {
            var primitive = _getPrimitive(resultJson);

            return testTool.getValues(
                primitive.indices
            )
        }

        function _getPrimitive(resultJson) {
            var primitive = null;

            for(var key in resultJson.meshes){
                primitive = resultJson.meshes[key].primitives[0];
            }

            return primitive;
        }

        beforeEach(function(){

        });

        describe("only change 'meshes' field, deep copy other fields", function(){
            beforeEach(function(){
            });

            it("copy nodes", function(){
                var nodes = {
                    "a":{}
                }
                var result = converter.convert({
                    "meshes":{},
                    "nodes":nodes
                });

                expect(result.nodes).toEqual(nodes);
            });
        });

        describe("convert multi indices to single indices", function () {
            it("remain primitive->material,mode data", function () {
                var result = converter.convert(buildJson(
                        [1, 2, 3, 4, -1, -2, 3, 2, 3, 4, -1, -4],
                        [1.0, 0.1, 0.1, 0.2, 0.2, 0.2, 0.3, 0.5],
                        [],
                        [],



                        [0, 1, 2, 1, 3, 2],
                        [2, 0, 1, 2, 3, 1],
                        [],
                        [],
                    {
                        material:"mat",
                        mode:4
                    }
                ));

                var data = null;

                for(var key in result.meshes){
                    data = result.meshes[key].primitives[0]
                }

                expect(data.material).toEqual("mat");
                expect(data.mode).toEqual(4);
            });

            describe("duplicate the vertex which has different attribute data", function () {
                it("test one vertex has two different uvs", function() {
                    // setObject({
                    //     name: "a",
                    //     vertices: ,
                    //     morphTargets: [
                    //         {
                    //             name: "stand001",
                    //             vertices: [1, 2, 3, 4, -1, -2, 3, 2, 3, 4, -1, -4]
                    //         },
                    //         {
                    //             name: "stand002",
                    //             vertices: [3, 2, 3, 4, -1, -2, 3, 2, 3, 4, -1, -4]
                    //         }
                    //     ],
                    //     colors: [],
                    //     uvs: ,
                    //     verticeIndices: ,
                    //     texCoordIndices:
                    // })
                    var result = converter.convert(buildJson(
                        [1, 2, 3, 4, -1, -2, 3, 2, 3, 4, -1, -4],
                        [1.0, 0.1, 0.1, 0.2, 0.2, 0.2, 0.3, 0.5],
                        [],
                        [],



                        [0, 1, 2, 1, 3, 2],
                        [2, 0, 1, 2, 3, 1],
                        [],
                        []
                    ));

                    expect(getPositions(result)).toEqual(
                        [
                            1, 2, 3, 4, -1, -2, 3, 2, 3, 4, -1, -4,
                            4, -1, -2
                        ]
                    );

                    // expect(getObject(result, 0).morphTargets.getChild("stand").getChild(0)).toEqual(
                    //     [
                    //         1, 2, 3, 4, -1, -2, 3, 2, 3, 4, -1, -4,
                    //         4, -1, -2
                    //     ]
                    // )
                    // expect(getObject(result, 0).morphTargets.getChild("stand").getChild(1)).toEqual(
                    //     [
                    //         3, 2, 3, 4, -1, -2, 3, 2, 3, 4, -1, -4,
                    //         4, -1, -2
                    //     ]
                    // )
                    // expect(getObject(result, 0).morphNormals.getCount()).toEqual(0);

                    expect(getTexCoords(result)).toEqual(
                        [
                            0.2, 0.2, 1, 0.1, 0.1, 0.2, 0.3, 0.5,
                            0.2, 0.2
                        ]
                    );

                    expect(getIndices(result)).toEqual(
                        [
                            0, 1, 2, 4, 3, 2
                        ]
                    );
                });
                it("test one vertex has multi different uvs(only add vertex that has different uvs, not add it which's corresponding texCoordIndice is the same as the prev one)", function() {
                    // setObject({
                    //     name: "a",
                    //     vertices: ,
                    //     morphTargets: [
                    //         {
                    //             name: "stand001",
                    //             vertices: [1, 2, 3, 4, -1, -2, 3, 2, 3, 4, -1, -4]
                    //         },
                    //         {
                    //             name: "stand002",
                    //             vertices: [3, 2, 3, 4, -1, -2, 3, 2, 3, 4, -1, -4]
                    //         }
                    //     ],
                    //     colors: [],
                    //     uvs: ,
                    //     verticeIndices: ,
                    //     texCoordIndices:
                    // })
                    var result = converter.convert(buildJson(
[1, 2, 3, 4, -1, -2, 3, 2, 3, 4, -1, -4],
[1.0, 0.1, 0.1, 0.2, 0.2, 0.2, 0.3, 0.5],
                        [],
                        [],

                        [0, 1, 2, 1, 3, 2, 1, 0, 2],
                        [2, 0, 1, 3, 3, 0, 3, 2, 2],
                        [],
                        []
                    ));

                    expect(getPositions(result)).toEqual(
                        [
                            1, 2, 3, 4, -1, -2, 3, 2, 3, 4, -1, -4,
                            4, -1, -2, 3, 2, 3, 3, 2, 3
                        ]

                    );

                    // expect(getObject(result, 0).morphTargets.getChild("stand").getChild(0)).toEqual(
                    //     [
                    //         1, 2, 3, 4, -1, -2, 3, 2, 3, 4, -1, -4,
                    //         4, -1, -2, 3, 2, 3, 3, 2, 3
                    //     ]
                    // )
                    // expect(getObject(result, 0).morphTargets.getChild("stand").getChild(1)).toEqual(
                    //     [
                    //         3, 2, 3, 4, -1, -2, 3, 2, 3, 4, -1, -4,
                    //         4, -1, -2, 3, 2, 3, 3, 2, 3
                    //     ]
                    // )
                    // expect(getObject(result, 0).morphNormals.getCount()).toEqual(0);

                    expect(getTexCoords(result)).toEqual(
                        [
                            0.2, 0.2, 1, 0.1, 0.1, 0.2, 0.3, 0.5,
                            0.3, 0.5, 1, 0.1, 0.2, 0.2
                        ]
                    )
                    expect(getIndices(result)).toEqual(
                        [
                            0, 1, 2, 4, 3, 5, 4, 0, 6
                        ]
                    );
                });

                describe("test one vertex has multi different uvs and normals", function(){
                    it("test no normalIndice", function(){
                        var result = converter.convert(buildJson(
                            [1, 2, 3, 4, -1, -2, 3, 2, 3, 4, -1, -4],
                            [1.0, 0.1, 0.1, 0.2, 0.2, 0.2, 0.3, 0.5],
                            [1, 1, 1, 6, -1, -2, 1, 2, -1, -2, 0, -4],
                            [],


                            [0, 1, 2, 1, 3, 2, 1, 0, 2],
                            [2, 0, 1, 3, 3, 0, 3, 2, 2],
                            [],
                            []
                        ));

                        expect(getPositions(result)).toEqual(
                            [
                                1, 2, 3, 4, -1, -2, 3, 2, 3, 4, -1, -4, 4, -1, -2, 3, 2, 3, 3, 2, 3
                            ]
                        )
                        expect(getNormals(result)).toEqual(
                            [
                                1, 1, 1, 6, -1, -2, 1, 2, -1, -2, 0, -4
                            ]
                        )

                        expect(getIndices(result)).toEqual(
                            [
                                0, 1, 2, 4, 3, 5, 4, 0, 6
                            ]
                        )
                    });
                    it("test with normalIndice", function(){
                        var result = converter.convert(buildJson(
                            [1, 2, 3, 4, -1, -2, 3, 2, 3, 4, -1, -4],
                            [1.0, 0.1, 0.1, 0.2, 0.2, 0.2, 0.3, 0.5],
                            [1, 1, 1, 6, -1, -2, 1, 2, -1, -2, 0, -4, 3, 5, 0.5],
                            [],


                            [0, 1, 2, 1, 3, 2, 1, 0, 2],
                            [2, 0, 1, 3, 3, 0, 3, 2, 2],
                            [2, 0, 1, 0, 3, 1, 4, 2, 1],
                            []
                        ));



                        expect(getPositions(result)).toEqual(
                            [
                                1, 2, 3, 4, -1, -2, 3, 2, 3, 4, -1, -4, 4, -1, -2, 3, 2, 3, 3, 2, 3, 4, -1, -2
                            ]
                        );

                        expect(getNormals(result)).toEqual(
                            [
                                1, 2, -1, 1, 1, 1, 6, -1, -2, -2, 0, -4, 1, 1, 1, 6, -1, -2, 6, -1, -2, 3, 5, 0.5
                            ]
                        );
                    });
                });

                describe("test one vertex has multi different uvs and normals and colors", function(){
                    it("test no colorIndice", function(){
                        var normals = [1, 1, 1, 6, -1, -2, 1, 2, -1, -2, 0, -4];
                        var colors = [4, -1, 2, 2, 2, 0, 4, 1, 1, -5, -1, -7]

                        var result = converter.convert(buildJson(
                            [1, 2, 3, 4, -1, -2, 3, 2, 3, 4, -1, -4],
                            [1.0, 0.1, 0.1, 0.2, 0.2, 0.2, 0.3, 0.5],
                            normals,
                            colors,


                            [0, 1, 2, 1, 3, 2, 1, 0, 2],
                            [2, 0, 1, 3, 3, 0, 3, 2, 2],
                            [],
                            []
                        ));

                        expect(getPositions(result)).toEqual(
                            [
                                1, 2, 3, 4, -1, -2, 3, 2, 3, 4, -1, -4, 4, -1, -2, 3, 2, 3, 3, 2, 3
                            ]
                        )
                        expect(getNormals(result)).toEqual(
                            normals
                        )

                        expect(getColors(result)).toEqual(
                            colors
                        )

                        expect(getIndices(result)).toEqual(
                            [
                                0, 1, 2, 4, 3, 5, 4, 0, 6
                            ]
                        )
                    });
                    it("test with colorIndice", function(){
                        var result = converter.convert(buildJson(
                            [1, 2, 3, 4, -1, -2, 3, 2, 3, 4, -1, -4],
                            [1.0, 0.1, 0.1, 0.2, 0.2, 0.2, 0.3, 0.5],
                            [1, 1, 1, 6, -1, -2, 1, 2, -1, -2, 0, -4, 3, 5, 0.5],
                            [4, -1, 2, 2, 2, 0, 4, 1, 1, -5, -1, -7, 0.1, 2.2, 3],


                            [0, 1, 2, 1, 3, 2, 1, 0, 2],
                            [2, 0, 1, 3, 3, 0, 3, 2, 2],
                            [2, 0, 1, 0, 3, 1, 4, 2, 1],
                            [2, 4, 1, 0, 3, 1, 4, 2, 1]
                        ));

                        expect(getPositions(result)).toEqual(
                            [
                                1, 2, 3, 4, -1, -2, 3, 2, 3, 4, -1, -4, 4, -1, -2, 3, 2, 3, 3, 2, 3, 4, -1, -2
                            ]
                        )
                        expect(getNormals(result)).toEqual(
                            [
                                1, 2, -1, 1, 1, 1, 6, -1, -2, -2, 0, -4, 1, 1, 1, 6, -1, -2, 6, -1, -2, 3, 5, 0.5
                            ]
                        )

                        expect(getColors(result)).toEqual(
                            [
                                4, 1, 1, 0.1, 2.2, 3, 2, 2, 0, -5, -1, -7, 4, -1, 2, 2, 2, 0, 2, 2, 0, 0.1, 2.2, 3
                            ]
                        )

                        expect(getIndices(result)).toEqual(
                            [
                                0, 1, 2, 4, 3, 5, 7, 0, 6
                            ]
                        )
                    });
                });

                describe("test morph targets", function () {
                    function getMorphTargets(resultJson) {
                        var primitive = _getPrimitive(resultJson);

                        return primitive.morphTargets;
                    }

                    it("test with normalIndices, texCoordIndices, colorIndices", function () {
                        var vertices = [1, 2, 3, 4, -1, -2, 3, 2, 3, 4, -1, -4],
                            normals = [1, 1, 1, 6, -1, -2, 1, 2, -1, -2, 0, -4, 3, 5, 0.5];

                        var morphTargets = [{
                            name: "FRAME000",
                            vertices: vertices.slice(0),
                            normals: normals.slice(0)
                        }];


                        var json = buildJson(
                            vertices,
                            [1.0, 0.1, 0.1, 0.2, 0.2, 0.2, 0.3, 0.5],
                            normals,
                            [4, -1, 2, 2, 2, 0, 4, 1, 1, -5, -1, -7, 0.1, 2.2, 3],


                            [0, 1, 2, 1, 3, 2, 1, 0, 2],
                            [2, 0, 1, 3, 3, 0, 3, 2, 2],
                            [2, 0, 1, 0, 3, 1, 4, 2, 1],
                            [2, 4, 1, 0, 3, 1, 4, 2, 1]
                        );
                        var primitives =  getPrimitivesDataFromBuildedJson(json);

                        primitives[0].morphTargets = morphTargets;





                        var result = converter.convert(json);





                        var resultVertices =
                            [
                                1, 2, 3, 4, -1, -2, 3, 2, 3, 4, -1, -4, 4, -1, -2, 3, 2, 3, 3, 2, 3, 4, -1, -2
                            ],
                            resultNormals = [
                                    1, 2, -1, 1, 1, 1, 6, -1, -2, -2, 0, -4, 1, 1, 1, 6, -1, -2, 6, -1, -2, 3, 5, 0.5
                                ];

                        expect(getPositions(result)).toEqual(
                            resultVertices
                        )
                        expect(getNormals(result)).toEqual(
                         resultNormals
                        )

                        expect(getMorphTargets(result)).toEqual(
                            [
                                {
                                    name: "FRAME000",
                                    vertices: resultVertices,
                                    normals: resultNormals
                                }
                            ]
                        )

                        expect(getIndices(result)).toEqual(
                            [
                                0, 1, 2, 4, 3, 5, 7, 0, 6
                            ]
                        )
                    });
                });
            });
        });

        it("support remove field whose data are all null", function () {
            var normals = [];

            for(var i = 0; i < 12; i++){
                normals.push(null);
            }

            var targetJson =
            {
                "meshes": {
                    "RootNode": {
                        "primitives": [
                            {
                                "attributes": {
                                    "NORMAL": normals,
                                    "POSITION": [1, 2, 3, 4, -1, -2, 3, 2, 3, 4, -1, -4],
                                },
                                "indices": [0, 1, 2, 1, 3, 2, 1, 0, 2],
                                // "material": materialData.material,
                                // "mode": materialData.mode
                            }
                        ]
                    }
                }
            }



            converter._removeNullData(targetJson);


            expect(targetJson.meshes["RootNode"].primitives[0].attributes.NORMAL).toBeUndefined();
        });
    });
});

