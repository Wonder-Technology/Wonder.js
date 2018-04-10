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

            // state = wd.setBoxGeometryConfigData(geometry, {
            //     width: 5,
            //     height: 5,
            //     depth: 5
            // }, state);




            state = wd.addGameObjectBoxGeometryComponent(obj, geometry, state);

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

            return [state, newBoxes];

        },
        createBoxesWithoutClone: function (count, state) {
            var boxes = [];

            for (var i = 0; i < count; i++) {
                var [state, box] = wd.createBox(state);


                boxes.push(box);
            }

            return [state, boxes];
        },

        setPosition: function (boxes, state) {
            var playgroundSize = 500;

            for (var i = 0, len = boxes.length; i < len; i++) {
                var box = boxes[i];


                var transform = wd.unsafeGetGameObjectTransformComponent(box, state);


                var localPos = wd.getTransformLocalPosition(transform, state);

                state = wd.setTransformLocalPosition(transform, [Math.random() * 2 * playgroundSize - playgroundSize, Math.random() * 2 * playgroundSize - playgroundSize, Math.random() * 2 * playgroundSize - playgroundSize], state);
            }

            return [state, boxes];
        },


        setData: function (boxes, state) {
            return ScheduleTool.scheduleLoop(function (state) {
                return _setData(boxes, state)
            }, state)
        },



        setParent: function (boxes, state) {
            for (var i = 1, len = 10; i < len; i++) {
                var box = boxes[i];

                state = wd.setTransformParent(boxes[i - 1], box, state)
            }

            return ScheduleTool.scheduleLoop(function (state) {
                var box = boxes[i];
                state = wd.setTransformParent(boxes[_getRandomParentIndex(10)], box, state);

                return _setData(boxes, state);
            }, state)
        },
        createAndDisposeGameObjects: function (count, boxes, state) {
            window.sourceBox = boxes[0];
            window.boxes = [];

            return ScheduleTool.scheduleLoop(function (state) {
                // for(var i = 0, len = window.boxes.length; i < len; i++){
                //     var box = window.boxes[i];
                //     state = disposeGameObject(box, state);
                // }

                var state = wd.batchDisposeGameObject(window.boxes, state);

                // var [state, newBoxes] = wd.createBoxesWithoutClone(2000, state);

                var record = wd.cloneGameObject(window.sourceBox, count, true, state);
                var state = record[0];
                var newBoxes = record[1];


                var flatten = (arr) => {
                    return arr.reduce((a, b) => {
                        var arr = a.concat(b);
                        return arr;
                    }, []);
                };
                newBoxes = flatten(newBoxes);


                var record = BasicBoxesTool.setPosition(newBoxes, state);
                var state = record[0];
                var newBoxes = record[1];

                window.boxes = newBoxes;


                for (var i = 0, len = newBoxes.length; i < len; i++) {
                    var box = newBoxes[i];
                    state = wd.initGameObject(box, state);
                }

                return state;

            }, state)
        },
        createCamera: function (state) {
            return CameraTool.createCamera(state)
        }
    }
})()