var GeometryTool = (function () {
    return {
        createTriangle: function (size, state) {
            var record = wd.createGameObject(state);
            var state = record[0];
            var obj = record[1];

            var record = wd.createGeometry(state);
            var state = record[0];
            var geometry = record[1];


            var state = wd.setGeometryVertices(geometry,
                new Float32Array([
                    0.0, size, 0.0,
                    -size, -size, 0.0,
                    size, -size, 0.0,
                ]),
                state
            );


            var state = wd.setGeometryNormals(geometry,
                new Float32Array([
                    0.0, 0.0, 1.0,
                    0.0, 0.0, 1.0,
                    0.0, 0.0, 1.0
                ]),
                state
            );


            var state = wd.setGeometryIndices16(geometry,
                new Uint16Array([
                    0, 1, 2
                ]),
                state
            );



            state = wd.addGameObjectGeometryComponent(obj, geometry, state);

            return [state, obj];
        },


        createTriangleGameObject: function (size, state) {
            var data = GeometryTool.createTriangle(size, state);


            var state = data[0];
            var gameObject = data[1];


            var data = BasicMaterialTool.createDefaultBasicMaterial(state);


            var state = data[0];
            var material = data[1];



            var state = wd.addGameObjectBasicMaterialComponent(gameObject, material, state);



            var record = wd.createMeshRenderer(state);
            var state = record[0];
            var meshRenderer = record[1];
            state = wd.addGameObjectMeshRendererComponent(gameObject, meshRenderer, state);






            var basicMaterial = wd.unsafeGetGameObjectBasicMaterialComponent(gameObject, state);

            var state = wd.setBasicMaterialColor(basicMaterial,
                [Math.random(), Math.random(), Math.random()],
                state
            );

            return [state, gameObject];
        },


        createBasicTriangleByClone: function (count, size, state) {
            var gameObjects = [];


            var data = GeometryTool.createTriangleGameObject(size, state);
            var state = data[0];
            var gameObject = data[1];


            var record = wd.cloneGameObject(gameObject, count, true, state);
            var state = record[0];
            var newGameObjects = record[1];


            var flatten = (arr) => {
                return arr.reduce((a, b) => {
                    var arr = a.concat(b);
                    return arr;
                }, []);
            };
            newGameObjects = flatten(newGameObjects);

            return [state, newGameObjects];

        },
        createBasicTriangleWithoutClone: function (count, size, state) {
            var gameObjects = [];

            for (var i = 0; i < count; i++) {
                var data = GeometryTool.createTriangleGameObject(size, state);
                var state = data[0];
                var gameObject = data[1];


                gameObjects.push(gameObject);
            }

            return [state, gameObjects];
        },


        createAndDisposeGameObjects: function (count, gameObjects, state) {
            var removedGameObjects = gameObjects;

            return ScheduleTool.scheduleLoop(function (_, state) {
                var state = wd.batchDisposeGameObject(removedGameObjects, state);


                var record = GeometryTool.createBasicTriangleWithoutClone(count, 10, state);
                var state = record[0];
                var newGameObjects = record[1];


                var record = PositionTool.setPosition(newGameObjects, state);
                var state = record[0];
                var newGameObjects = record[1];



                for (var i = 0, len = newGameObjects.length; i < len; i++) {
                    var gameObject = newGameObjects[i];
                    state = wd.initGameObject(gameObject, state);
                }

                removedGameObjects = newGameObjects;

                return state;

            }, state)
        },
        createAndDisposeClonedGameObjects: function (count, gameObjects, state) {
            var removedGameObjects = gameObjects;
            var sourceGameObject = gameObjects[0];

            return ScheduleTool.scheduleLoop(function (_, state) {
                var state = wd.batchDisposeGameObject(removedGameObjects, state);



                var record = wd.cloneGameObject(sourceGameObject, count, true, state);
                var state = record[0];
                var newGameObjects = record[1];


                var flatten = (arr) => {
                    return arr.reduce((a, b) => {
                        var arr = a.concat(b);
                        return arr;
                    }, []);
                };
                newGameObjects = flatten(newGameObjects);






                var record = PositionTool.setPosition(newGameObjects, state);
                var state = record[0];
                var newGameObjects = record[1];



                for (var i = 0, len = newGameObjects.length; i < len; i++) {
                    var gameObject = newGameObjects[i];
                    state = wd.initGameObject(gameObject, state);
                }

                removedGameObjects = newGameObjects;
                sourceGameObject = newGameObjects[0];

                return state;

            }, state)
        },
    }
})()