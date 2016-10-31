var Converter = require("../../../../dist/converter/gulp_task/convertIndices/Converter"),
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
        function buildJson(positions, texCoords, verticeIndices, texCoordIndices) {
            return {
                "meshes": {
                    "RootNode": {
                        "primitives": [
                            {
                                "attributes": {
                                    "COLOR": [],
                                    "NORMAL": [],
                                    "POSITION": positions,
                                    "TEXCOORD": texCoords
                                },
                                "colorIndices": [],
                                "normalIndices": [],
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
            describe("duplicate the vertex which has different texture coordinates", function () {
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
                        [0, 1, 2, 1, 3, 2],
                        [2, 0, 1, 2, 3, 1]
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
                        [0, 1, 2, 1, 3, 2, 1, 0, 2],
                        [2, 0, 1, 3, 3, 0, 3, 2, 2]
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

                //todo more test

                // describe("test one vertex has multi different uvs with normals", function(){
                //     it("test no normalIndice", function(){
                //
                //         setObject({
                //             name: "a",
                //             vertices: [1, 2, 3, 4, -1, -2, 3, 2, 3, 4, -1, -4],
                //             normals: [1, 1, 1, 6, -1, -2, 1, 2, -1, -2, 0, -4],
                //             morphTargets: [
                //                 {
                //                     name: "stand001",
                //                     vertices: [1, 2, 3, 4, -1, -2, 3, 2, 3, 4, -1, -4],
                //
                //                     normals: [5, 1, 2, 4, -1, -2, 3, 2, 3, -2, 0, -4]
                //                 }
                //             ],
                //             colors: [],
                //             uvs: [1.0, 0.1, 0.1, 0.2, 0.2, 0.2, 0.3, 0.5],
                //             verticeIndices: [0, 1, 2, 1, 3, 2, 1, 0, 2],
                //             texCoordIndices:      [2, 0, 1, 3, 3, 0, 3, 2, 2]
                //         })
                //         var result = parser.parse(json);
                //
                //         geometryTool.judgeFaceVertexNormals(getObject(result, 0).faces,
                //             [
                //                 //normals: [1, 1, 1, 6, -1, -2, 1, 2, -1, -2, 0, -4],
                //
                //                 //verticeIndices: [0, 1, 2, 1, 3, 2, 1, 0, 2],
                //                 //0, 1, 2, 4, 3, 5, 4, 0, 6
                //
                //                 1, 1, 1, 6, -1, -2, 1, 2, -1, 6, -1, -2,
                //                 -2, 0, -4, 1, 2, -1, 6, -1, -2, 1, 1, 1, 1, 2, -1
                //             ]
                //         )
                //         expect(getObject(result, 0).morphNormals.getChild("stand").getChild(0)).toEqual(
                //             [
                //                 //normals: [5, 1, 2, 4, -1, -2, 3, 2, 3, -2, 0, -4]
                //                 //verticeIndices: [0, 1, 2, 1, 3, 2, 1, 0, 2],
                //                 //0, 1, 2, 4, 3, 5, 4, 0, 6
                //                 5, 1, 2, 4, -1, -2, 3, 2, 3, -2, 0, -4,
                //                 4, -1, -2, 3, 2, 3, 3, 2, 3
                //             ]
                //         );
                //     });
                //     it("test with normalIndice", function(){
                //
                //         setObject({
                //             name: "a",
                //             vertices: [1, 2, 3, 4, -1, -2, 3, 2, 3, 4, -1, -4],
                //             normals: [1, 1, 1, 6, -1, -2, 1, 2, -1, -2, 0, -4],
                //             morphTargets: [
                //                 {
                //                     name: "stand001",
                //                     vertices: [1, 2, 3, 4, -1, -2, 3, 2, 3, 4, -1, -4],
                //
                //                     normals: [5, 1, 2, 4, -1, -2, 3, 2, 3, -2, 0, -4]
                //                 }
                //             ],
                //             colors: [],
                //             uvs: [1.0, 0.1, 0.1, 0.2, 0.2, 0.2, 0.3, 0.5],
                //             verticeIndices: [0, 1, 2, 1, 3, 2, 1, 0, 2],
                //             normalIndices: [2, 0, 1, 0, 3, 1, 0, 2, 1],
                //             texCoordIndices:      [2, 0, 1, 3, 3, 0, 3, 2, 2]
                //         })
                //         var result = parser.parse(json);
                //
                //         geometryTool.judgeFaceVertexNormals(getObject(result, 0).faces,
                //             [
                //                 //normals: [1, 1, 1, 6, -1, -2, 1, 2, -1, -2, 0, -4],
                //
                //                 //verticeIndices: [0, 1, 2, 1, 3, 2, 1, 0, 2],
                //                 //normalIndices:  [2, 0, 1, 0, 3, 1, 0, 2, 1],
                //                 //0, 1, 2, 4, 3, 5, 4, 0, 6
                //
                //
                //                 1, 2, -1, 1, 1, 1, 6, -1, -2,
                //                 1, 1, 1, -2, 0, -4, 6, -1, -2,
                //                 1, 1, 1, 1, 2, -1, 6, -1, -2
                //             ]
                //         )
                //         expect(getObject(result, 0).morphNormals.getChild("stand").getChild(0)).toEqual(
                //             [
                //                 //normals: [5, 1, 2, 4, -1, -2, 3, 2, 3, -2, 0, -4]
                //                 //verticeIndices: [0, 1, 2, 1, 3, 2, 1, 0, 2],
                //                 //normalIndices:  [2, 0, 1, 0, 3, 1, 0, 2, 1],
                //                 //0, 1, 2, 4, 3, 5, 4, 0, 6
                //
                //                 3, 2, 3,
                //                 5, 1, 2,
                //                 4, -1, -2,
                //                 -2, 0, -4,
                //
                //                 5, 1, 2,
                //                 4,-1,-2,
                //                 4, -1, -2
                //
                //             ]
                //         );
                //     });
                // });
                it("test one vertex has multi different uvs and normals", function(){
                    //todo
                });
            });

            // it("parse files which's format likes the one converted from .md2", function () {
            //     setObject({
            //         name: "a",
            //         vertices: [1, 2, 3, 4, -1, -2, 3, 2, 3, 4, -1, -4],
            //         morphTargets: [
            //             {
            //                 name: "stand001",
            //                 vertices: [-3, 2, 3, 2, -1, -2, 2, 2, 3, 4, -1, -2]
            //             },
            //             {
            //                 name: "play001",
            //                 vertices: [2, 2, 3, 4, -1, -2, 2, 2, 3, 4, -1, -2]
            //             },
            //             {
            //                 name: "play002",
            //                 vertices: [0, 5, 3, 4, -1, -2, 2, 2, 3, 1, -1, -2]
            //             }
            //         ],
            //         colors: [1.0, 0.1, 0.1, 0.2, 0.2, 0.2, 1.0, 0.2, 0.1, 0.2, 0.2, 0.3],
            //         uvs: [1.0, 0.1, 0.1, 0.2, 0.2, 0.2, 0.3, 0.5],
            //         verticeIndices: [0, 1, 2, 1, 3, 2],
            //         texCoordIndices: [2, 0, 1, 0, 3, 1]
            //     })
            //     var result = parser.parse(json);
            //
            //     expect(getObject(result, 0).vertices).toEqual(
            //         [
            //             1, 2, 3, 4, -1, -2, 3, 2, 3, 4, -1, -4
            //         ]
            //     )
            //
            //     expect(getObject(result, 0).morphTargets.getChild("stand").getChild(0)).toEqual(
            //         [
            //             -3, 2, 3, 2, -1, -2, 2, 2, 3, 4, -1, -2
            //         ]
            //     )
            //     expect(getObject(result, 0).morphTargets.getChild("play").getChild(0)).toEqual(
            //         [
            //             2, 2, 3, 4, -1, -2, 2, 2, 3, 4, -1, -2
            //         ]
            //     )
            //     expect(getObject(result, 0).morphTargets.getChild("play").getChild(1)).toEqual(
            //         [
            //             0, 5, 3, 4, -1, -2, 2, 2, 3, 1, -1, -2
            //         ]
            //     )
            //     expect(getObject(result, 0).morphNormals.getCount()).toEqual(0);
            //
            //
            //     expect(testTool.getValues(getObject(result, 0).colors)).toEqual(
            //         [
            //             1, 0.1, 0.1, 0.2, 0.2, 0.2, 1, 0.2, 0.1, 0.2, 0.2, 0.3
            //         ]
            //     )
            //     expect(testTool.getValues(getObject(result, 0).uvs)).toEqual(
            //         [
            //             0.2, 0.2, 1, 0.1, 0.1, 0.2, 0.3, 0.5
            //         ]
            //     )
            //     geometryTool.judgeFaceIndices(getObject(result, 0).faces, [0, 1, 2, 1, 3, 2 ]);
            // });
            // it("parse files which's format likes the one converted from .obj", function () {
            //     setObject({
            //         name: "object container",
            //         vertices: [1, 2, 3, 4, -1, -2, 3, 2, 3, 4, -1, -4],
            //         colors: [1.0, 0.1, 0.1, 0.2, 0.2, 0.2, 1.0, 0.2, 0.1, 0.2, 0.2, 0.3],
            //         uvs: [1.0, 0.1, 0.1, 0.2, 0.2, 0.2, 0.3, 0.5],
            //         children: [
            //             {
            //                 name: "child1",
            //                 morphTargets: [
            //                     {
            //                         name: "stand001",
            //                         vertices: [-3, 2, 3, 2, -1, -2, 2, 2, 3, 4, -1, -2]
            //                     }
            //                 ],
            //                 verticeIndices: [0, 1, 2, 1, 3, 2],
            //                 texCoordIndices: [2, 0, 1, 0, 3, 1]
            //
            //             },
            //             {
            //                 name: "child2",
            //                 morphTargets: [
            //                     {
            //                         name: "stand001",
            //                         vertices: [1, 2, 3, 2, -1, -2, 2, 2, 3, 4, -1, -2]
            //                     }
            //                 ],
            //                 verticeIndices: [0, 1, 2, 1, 2, 3]
            //
            //             }
            //         ]
            //     })
            //     var result = parser.parse(json);
            //
            //     var objectContainer = getObject(result, 0);
            //     expect(objectContainer.vertices).toBeUndefined();
            //     expect(objectContainer.uvs).toBeUndefined();
            //     expect(objectContainer.colors).toBeUndefined();
            //
            //
            //     var object1 = objectContainer.children.getChild(0);
            //     expect(object1.vertices).toEqual(
            //         [
            //             1, 2, 3, 4, -1, -2, 3, 2, 3, 4, -1, -4
            //         ]
            //     )
            //
            //     expect(object1.morphTargets.getChild("stand").getChild(0)).toEqual(
            //         [
            //             -3, 2, 3, 2, -1, -2, 2, 2, 3, 4, -1, -2
            //         ]
            //     )
            //
            //     expect(testTool.getValues(object1.colors)).toEqual(
            //         [
            //             1.0, 0.1, 0.1, 0.2, 0.2, 0.2, 1.0, 0.2, 0.1, 0.2, 0.2, 0.3
            //         ]
            //     )
            //     expect(testTool.getValues(object1.uvs)).toEqual(
            //         [
            //             0.2, 0.2, 1, 0.1, 0.1, 0.2, 0.3, 0.5
            //         ]
            //     )
            //     geometryTool.judgeFaceIndices(object1.faces, [0, 1, 2, 1, 3, 2 ]);
            //
            //     var object2 = objectContainer.children.getChild(1);
            //     expect(object2.vertices).toEqual(
            //         [
            //             1, 2, 3, 4, -1, -2, 3, 2, 3, 4, -1, -4
            //         ]
            //     )
            //
            //     expect(object2.morphTargets.getChild("stand").getChild(0)).toEqual(
            //         [
            //             1, 2, 3, 2, -1, -2, 2, 2, 3, 4, -1, -2
            //         ]
            //     )
            //
            //     expect(testTool.getValues(object2.colors)).toEqual(
            //         [
            //             1, 0.1, 0.1, 0.2, 0.2, 0.2, 1, 0.2, 0.1, 0.2, 0.2, 0.3
            //         ]
            //     )
            //     expect(testTool.getValues(object2.uvs)).toEqual(
            //         [
            //             1, 0.1, 0.1, 0.2, 0.2, 0.2, 0.3, 0.5
            //         ]
            //     )
            //     geometryTool.judgeFaceIndices(object2.faces, [0, 1, 2, 1, 2, 3]);
            // });
        });
    });
});

