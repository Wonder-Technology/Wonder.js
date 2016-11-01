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
        function buildJson(positions, texCoords, normals, colors, verticeIndices, texCoordIndices, normalIndices, colorIndices) {
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
                                "verticeIndices": verticeIndices
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

        describe("convert multi indices to single indices", function () {
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
            });
        });
    });
});

