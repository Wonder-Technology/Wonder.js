var Filter = require("../../../../dist/converter/gulp_task/filterPrimitiveData/Filter").Filter,
    testTool = require("../../../../../js/testTool"),
    sinon = require("sinon");

describe("filterPrimitiveData->Filter", function(){
    var sandbox = null;
    var filter;

    beforeEach(function(){
        sandbox = sinon.sandbox.create();
        filter = Filter.create();
    });
    afterEach(function () {
        sandbox.restore();
    });

    describe("filter", function(){
        function getPrimitivesDataFromBuildedJson(buildedJson) {
            return buildedJson.meshes.RootNode.primitives;
        }

        function buildJson(positions, texCoords, normals, colors, indices, otherData) {
            otherData = otherData || {material:"a", mode:4}

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
                                "indices": indices,
                                "material": otherData.material,
                                "mode": otherData.mode,
                                "name": otherData.name
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

        describe("remove primitive data which is not used by indices", function(){
            beforeEach(function(){
            });

            it("remain nodes data", function () {
                var result = filter.filter({
                    "nodes": {
                        node1: {
                            children: [],
                            matrix: [
                                1,
                                0,
                                0,
                                0,

                                0,
                                1,
                                0,
                                0,

                                0,
                                0,
                                1,
                                0,

                                0,
                                0,
                                0,
                                1
                            ]
                            // mesh: 'cube_mesh',
                            // name: 'cube'
                        }
                    }
                });


                // var primitive = _getPrimitive(result);
                expect(result.nodes.node1.matrix).toEqual([

                ])
            });
            it("remain material,mode,name", function () {
                var result = filter.filter(buildJson(
                    [

                    ],
                    [],
                    [],
                    [],



                    [
                    ],

                    {
                        material:"mat",
                        mode:4,
                        name:"pName"
                    }
                ));


                var primitive = _getPrimitive(result);

                expect(primitive.material).toEqual("mat");
                expect(primitive.mode).toEqual(4);
                expect(primitive.name).toEqual("pName");
            });
            it("test remove", function(){
                var result = filter.filter(buildJson(
                    [
                        1,2,3,

                        3,2,1,

                        10,8,5,

                        5.5,3,9,

                        1.2, 3, 4
                    ],
                    [
                        0.1, 0.5,
                        0.2, 0.4,
                        0.0, 0.7,
                        0.3, 0.3,
                        0.5, 0.2,
                    ],
                    [

                        4,2,1,

                        9,8,5,

                        1,3,3,

                        4.5,3,9,

                        1.2, 3, 3
                    ],
                    [
                        0.1, 0.5, 0.8,
                        0.1, 0.5, 0.7,
                        0.2, 0.6, 0.7,
                        0.3, 0.3,0.1,
                        0.6, 0.1, 0.5
                    ],



                    [
                        0,2,3,
                        3,2,4
                    ],

                    {
                        material:"mat",
                        mode:4,
                        name:"pName"
                    }
                ));

                expect(getPositions(result)).toEqual([
                    1, 2, 3, 10, 8, 5, 5.5, 3, 9, 1.2, 3, 4
                ]);

                expect(getNormals(result)).toEqual([
                    4, 2, 1,
                    1, 3, 3,
                    4.5, 3, 9,
                    1.2, 3, 3

                ]);

                expect(getTexCoords(result)).toEqual([
                    0.1, 0.5, 0, 0.7, 0.3, 0.3, 0.5, 0.2
                ]);

                expect(getColors(result)).toEqual([
                    0.1, 0.5, 0.8, 0.2, 0.6, 0.7, 0.3, 0.3, 0.1, 0.6, 0.1, 0.5
                ]);

                expect(getIndices(result)).toEqual([
                    0, 1, 2, 2, 1, 3
                ]);
            });
        });
    });
});

