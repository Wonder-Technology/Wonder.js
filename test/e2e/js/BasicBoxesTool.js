var BasicBoxesTool = (function () {
    function _getRandomParentIndex(num) {
        return Math.floor(Math.random() * num);
    }
    var _getRandom = function (num) {
        return Math.floor(Math.random() * num);
    }

    var _setData = (boxes, state) => {
        boxes.forEach(function (box) {
            var transform = wd.unsafeGetGameObjectTransformComponent(box, state);


            var pos = wd.getTransformPosition(transform, state);
            var localPos = wd.getTransformLocalPosition(transform, state);

            if (pos[0] >= 500) {
                state = wd.setTransformLocalPosition(transform, [100, localPos[1], localPos[2]], state);

            }
            else if (pos[0] < 500) {
                state = wd.setTransformPosition(transform, [pos[0] + 10, pos[1], pos[2]], state);
            }
        });

        return state;
    };

    var createAndDisposeGameObjects = function (count, boxes, state) {
        var state = wd.batchDisposeGameObject(boxes, state);

        var record = BasicBoxesTool.createBoxesWithoutClone(count, state);
        var state = record[0];
        var newBoxes = record[1];



        var record = BasicBoxesTool.setPosition(newBoxes, state);
        var state = record[0];
        var newBoxes = record[1];



        for (var i = 0, len = newBoxes.length; i < len; i++) {
            var box = newBoxes[i];
            state = wd.initGameObject(box, state);
        }

        return [state, newBoxes];
    };



    var createAndDisposeGameObjectsByClone = function (count, boxes, state) {
        var state = wd.batchDisposeGameObject(boxes, state);

        var record = BasicBoxesTool.createBoxesByClone(count, state);
        var state = record[0];
        var newBoxes = record[1];



        var record = BasicBoxesTool.setPosition(newBoxes, state);
        var state = record[0];
        var newBoxes = record[1];



        for (var i = 0, len = newBoxes.length; i < len; i++) {
            var box = newBoxes[i];
            state = wd.initGameObject(box, state);
        }

        return [state, newBoxes];
    };








    var createAndDisposeGameObjectsWithMapByClone = function (count, boxes, map, state) {
        var state = wd.batchDisposeGameObject(boxes, state);




        var record = BasicBoxesTool.createBoxesByCloneWithMap(count, map, state);
        var state = record[0];
        var newBoxes = record[1];



        var record = BasicBoxesTool.setPosition(newBoxes, state);
        var state = record[0];
        var newBoxes = record[1];



        for (var i = 0, len = newBoxes.length; i < len; i++) {
            var box = newBoxes[i];
            state = wd.initGameObject(box, state);
        }

        return [state, newBoxes];
    };






    return {
        createBox: function (state) {
            var record = wd.createBasicMaterial(state);
            var state = record[0];
            var material = record[1];

            state = wd.setBasicMaterialColor(material, [0.0, 0.5, 0.2], state);

            var record = wd.createMeshRenderer(state);
            var state = record[0];
            var meshRenderer = record[1];

            var record = wd.createGameObject(state);
            var state = record[0];
            var obj = record[1];

            state = wd.addGameObjectBasicMaterialComponent(obj, material, state);
            state = wd.addGameObjectMeshRendererComponent(obj, meshRenderer, state);


            var record = wd.createBoxGeometry(state);
            var state = record[0];
            var geometry = record[1];



            state = wd.addGameObjectGeometryComponent(obj, geometry, state);

            return [state, obj];
        },

        createBoxWithMap: function (map, state) {
            var record = BasicBoxesTool.createBox(state);
            var state = record[0];
            var obj = record[1];


            var material = wd.unsafeGetGameObjectBasicMaterialComponent(obj, state);

            var state = wd.setBasicMaterialMap(material, map, state);

            return [state, obj];
        },




        createBoxesByClone: function (count, state) {
            var boxes = [];

            var record = BasicBoxesTool.createBox(state);
            var state = record[0];
            var box = record[1];


            var record = wd.cloneGameObject(box, count, true, state);
            var state = record[0];
            var newBoxes = record[1];


            var flatten = (arr) => {
                return arr.reduce((a, b) => {
                    var arr = a.concat(b);
                    return arr;
                }, []);
            };
            newBoxes = flatten(newBoxes);

            newBoxes.push(box);

            return [state, newBoxes];

        },

        createBoxesByCloneWithMap: function (count, map, state) {
            var boxes = [];

            var record = BasicBoxesTool.createBoxWithMap(map, state);
            var state = record[0];
            var box = record[1];


            var record = wd.cloneGameObject(box, count, true, state);
            var state = record[0];
            var newBoxes = record[1];


            var flatten = (arr) => {
                return arr.reduce((a, b) => {
                    var arr = a.concat(b);
                    return arr;
                }, []);
            };
            newBoxes = flatten(newBoxes);

            return [state, newBoxes];

        },
        createBoxesWithoutClone: function (count, state) {
            var boxes = [];

            for (var i = 0; i < count; i++) {
                var record = BasicBoxesTool.createBox(state);
                var state = record[0];
                var box = record[1];

                var basicMaterial = wd.unsafeGetGameObjectBasicMaterialComponent(box, state);

                var state = wd.setBasicMaterialColor(basicMaterial,
                    [Math.random(), Math.random(), Math.random()],
                    state
                );


                boxes.push(box);
            }

            return [state, boxes];
        },

        setPosition: function (boxes, state) {
            return PositionTool.setPosition(boxes, state);
        },
        setPositionWithRange: function (boxes, range, state) {
            return PositionTool.setPositionWithRange(boxes, range, state);
        },

        setData: function (boxes, state) {
            return ScheduleTool.scheduleLoop(function (_, state) {
                return _setData(boxes, state)
            }, state)
        },


        setDataWorker: function (boxes, state) {
            return ScheduleTool.scheduleWorkerMainLoopUnSafeJob(function (stateData) {
                var state = wd.unsafeGetState();

                _setData(boxes, state);
            }, state)
        },



        setParent: function (boxes, state) {
            for (var i = 1, len = 10; i < len; i++) {
                var box = boxes[i];

                state = wd.setTransformParent(boxes[i - 1], box, state)
            }

            return ScheduleTool.scheduleLoop(function (_, state) {
                var box = boxes[i];
                state = wd.setTransformParent(boxes[_getRandomParentIndex(10)], box, state);

                return _setData(boxes, state);
            }, state)
        },
        // createAndDisposeClonedGameObjects: function (count, boxes, state) {
        //     window.mapBox = boxes[0];
        //     window.boxes = [];

        //     return ScheduleTool.scheduleLoop(function (_, state) {
        //         var state = wd.batchDisposeGameObject(window.boxes, state);

        //         var record = wd.cloneGameObject(window.mapBox, count, true, state);
        //         var state = record[0];
        //         var newBoxes = record[1];


        //         var flatten = (arr) => {
        //             return arr.reduce((a, b) => {
        //                 var arr = a.concat(b);
        //                 return arr;
        //             }, []);
        //         };
        //         newBoxes = flatten(newBoxes);




        //         //  var record = BasicBoxesTool.createBoxesWithoutClone(count, state);
        //         //  var state = record[0];
        //         //  var newBoxes = record[1];


        //         var record = BasicBoxesTool.setPosition(newBoxes, state);
        //         var state = record[0];
        //         var newBoxes = record[1];

        //         window.boxes = newBoxes;


        //         for (var i = 0, len = newBoxes.length; i < len; i++) {
        //             var box = newBoxes[i];
        //             state = wd.initGameObject(box, state);
        //         }

        //         return state;

        //     }, state)
        // },


        createAndDisposeGameObjects: function (count, boxes, state) {
            var removedBoxes = boxes;

            return ScheduleTool.scheduleLoop(function (_, state) {
                var record = createAndDisposeGameObjects(count, removedBoxes, state);
                removedBoxes = record[1];
                return record[0];
            }, state);
        },



        createAndDisposeGameObjectsByClone: function (count, boxes, state) {
            var removedBoxes = boxes;

            return ScheduleTool.scheduleLoop(function (_, state) {
                var record = createAndDisposeGameObjectsByClone(count, removedBoxes,
                    state
                );
                removedBoxes = record[1];

                return record[0];
            }, state);
        },


        createAndDisposeGameObjectsWithMapByClone: function (count, boxes, map, state) {
            var removedBoxes = boxes;

            return ScheduleTool.scheduleLoop(function (_, state) {
                var record = createAndDisposeGameObjectsWithMapByClone(count, removedBoxes, map, state
                );
                removedBoxes = record[1];

                return record[0];
            }, state);
        },
        createAndDisposeGameObjectsWorker: function (count, boxes, state) {
            var removedBoxes = boxes;

            return ScheduleTool.scheduleWorkerMainLoopUnSafeJob(function (stateData) {
                var record = createAndDisposeGameObjects(count, removedBoxes,
                    wd.getStateFromData(stateData)
                );
                removedBoxes = record[1];
                var state = record[0];

                wd.setState(state);
            }, state);
        },
        createAndDisposeGameObjectsWorkerWithMapByClone: function (count, boxes, map, state) {
            var removedBoxes = boxes;

            return ScheduleTool.scheduleWorkerMainLoopUnSafeJob(function (stateData) {
                var record = createAndDisposeGameObjectsWithMapByClone(count, removedBoxes, map, wd.getStateFromData(stateData)
                );
                removedBoxes = record[1];
                var state = record[0];

                wd.setState(state);
            }, state);

        },
        createCamera: function (state) {
            return CameraTool.createCamera(state)
        }
    }
})()