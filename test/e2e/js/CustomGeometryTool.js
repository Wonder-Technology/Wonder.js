var CustomGeometryTool = (function () {
    return {
        createTriangle: function (size, state) {
            var record = wd.createMeshRenderer(state);
            var state = record[0];
            var meshRenderer = record[1];

            var record = wd.createGameObject(state);
            var state = record[0];
            var obj = record[1];

            state = wd.addGameObjectMeshRendererComponent(obj, meshRenderer, state);


            var record = wd.createCustomGeometry(state);
            var state = record[0];
            var geometry = record[1];


            var state = wd.setCustomGeometryVertices(geometry,
                new Float32Array([
                    0.0, size, 0.0,
                    -size, -size, 0.0,
                    size, -size, 0.0,
                ]),
                state
            );


            var state = wd.setCustomGeometryNormals(geometry,
                new Float32Array([
                    0.0, 0.0, 1.0,
                    0.0, 0.0, 1.0,
                    0.0, 0.0, 1.0
                ]),
                state
            );


            var state = wd.setCustomGeometryIndices(geometry,
                new Uint16Array([
                    0, 1, 2
                ]),
                state
            );



            state = wd.addGameObjectCustomGeometryComponent(obj, geometry, state);

            return [state, obj];
        },

        createBasicTriangleWithoutClone: function (count, size, state) {
            var gameObjects = [];

            for (var i = 0; i < count; i++) {
                var data = CustomGeometryTool.createTriangle(size, state);


                var state = data[0];
                var gameObject = data[1];


                var data = BasicMaterialTool.createDefaultBasicMaterial(state);


                var state = data[0];
                var material = data[1];



                var state = wd.addGameObjectBasicMaterialComponent(gameObject, material, state);



                var basicMaterial = wd.unsafeGetGameObjectBasicMaterialComponent(gameObject, state);

                var state = wd.setBasicMaterialColor(basicMaterial,
                    [Math.random(), Math.random(), Math.random()],
                    state
                );


                gameObjects.push(gameObject);
            }

            return [state, gameObjects];
        },
    }
})()