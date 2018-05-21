var InstanceBasicBoxesTool = (function () {
    function _getRandomParentIndex(num) {
        return Math.floor(Math.random() * num);
    }
    var _getRandom = function (num) {
        return Math.floor(Math.random() * num);
    }

    var _setData = (boxes, state) => {
        var playgroundSize = 300;

        for (let i = 0, len = boxes.length; i < len; i++) {
            let box = boxes[i];

            let sourceInstance = wd.unsafeGetGameObjectSourceInstanceComponent(box, state);

            let objectInstanceTransforTransformArray = wd.getSourceInstanceObjectInstanceTransformArray(sourceInstance, state);



            for (let i = 0, len = objectInstanceTransforTransformArray.length; i < len; i++) {
                var transform = objectInstanceTransforTransformArray[i];


                var pos = wd.getTransformPosition(transform, state);

                var localPos = wd.getTransformLocalPosition(transform, state);

                if (pos[0] >= 500) {
                    state = wd.setTransformLocalPosition(transform, [100, localPos[1], localPos[2]], state);

                }
                else if (pos[0] < 500) {
                    state = wd.setTransformPosition(transform, [pos[0] + 10, pos[1], pos[2]], state);
                }
            }
        }

        return state;

    };







    var createAndDisposeSourceInstanceGameObjects = function (sourceInstanceCount, objectInstanceCount, boxes, state) {
        var state = wd.batchDisposeGameObject(window.boxes, state);



        var record = InstanceBasicBoxesTool.createBoxes(sourceInstanceCount, objectInstanceCount, false, state);
        var state = record[0];
        var newBoxes = record[1];


        var record = InstanceBasicBoxesTool.setPosition(newBoxes, state);
        var state = record[0];
        var newBoxes = record[1];



        window.boxes = newBoxes;



        for (let i = 0, len = newBoxes.length; i < len; i++) {
            let box = newBoxes[i];
            state = wd.initGameObject(box, state);
        }

        return state;
    };






    return {
        createBox: function (count, isStatic, state) {
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




            state = wd.addGameObjectBoxGeometryComponent(obj, geometry, state);






            var record = wd.createSourceInstance(state);
            var state = record[0];
            var sourceInstance = record[1];


            var state = wd.markSourceInstanceModelMatrixIsStatic(sourceInstance, isStatic, state);

            // setTimeout(() => {


            // ScheduleTool.scheduleLoop(function (state) {
            //         return markSourceInstanceModelMatrixIsStatic(sourceInstance, false, state)
            //     }, state);

            // }, 1000);


            // setTimeout(() => {


            // ScheduleTool.scheduleLoop(function (state) {
            //         return markSourceInstanceModelMatrixIsStatic(sourceInstance, true, state)
            //     }, state);

            // }, 3000);



            var state =
                wd.addGameObjectSourceInstanceComponent(obj, sourceInstance, state);



            var objectInstanceGameObjectArr = [];

            for (let i = 0; i < count; i++) {
                var record =
                    wd.createObjectInstanceGameObject(sourceInstance, state);
                var state = record[0];
                var objectInstanceGameObject = record[1];

                objectInstanceGameObjectArr.push(objectInstanceGameObject);
            }


            return [state, obj, objectInstanceGameObjectArr];
        },
        createBoxWithMap: function (count, isStatic, map, state) {
            var record = InstanceBasicBoxesTool.createBox(count, isStatic, state);

            var state = record[0];
            var obj = record[1];
            var objectInstanceGameObjectArr = record[2];


            var material = wd.unsafeGetGameObjectBasicMaterialComponent(obj, state);

            var state = wd.setBasicMaterialMap(material, map, state);

            return [state, obj, objectInstanceGameObjectArr];
        },
        createBoxes: function (sourceInstanceGameObjectCount, objectInstanceGameObjectCount, isStatic, state) {
            var boxes = [];

            for (let i = 0; i < sourceInstanceGameObjectCount; i++) {
                var record = InstanceBasicBoxesTool.createBox(objectInstanceGameObjectCount, isStatic, state);
                var state = record[0];
                var box = record[1];
                var objectInstanceArr = record[2];

                boxes.push(box);
            }


            return [state, boxes];
        },
        createBoxesWithHierachy: function (parentCount, childrenCount, isStatic, state) {
            var boxes = [];


            var record = InstanceBasicBoxesTool.createBox(parentCount, isStatic, state);
            var state = record[0];
            var box1 = record[1];
            var objectInstanceArr1 = record[2];


            var record = InstanceBasicBoxesTool.createBox(childrenCount, isStatic, state);
            var state = record[0];
            var box2 = record[1];
            var objectInstanceArr2 = record[2];




            var box1Transform = wd.unsafeGetGameObjectTransformComponent(box1, state);
            var box2Transform = wd.unsafeGetGameObjectTransformComponent(box2, state);



            state = wd.setTransformParent(box1Transform, box2Transform, state);


            for (let i = 0, len = objectInstanceArr1.length; i < len; i++) {
                let instance1 = objectInstanceArr1[i];
                let instance2 = objectInstanceArr2[i];


                var t1 = wd.unsafeGetGameObjectTransformComponent(instance1, state);
                var t2 = wd.unsafeGetGameObjectTransformComponent(instance2, state);


                state = wd.setTransformParent(t1, t2, state);
            }


            boxes.push(box1, box2);


            var objectInstanceArr = [];

            objectInstanceArr.concat(objectInstanceArr1, objectInstanceArr2);

            // return [state, boxes, objectInstanceArr];
            return [state, boxes];
        },




        setPositionWithRange: function (boxes,playgroundSize, state) {
            for (let i = 0, len = boxes.length; i < len; i++) {
                let box = boxes[i];

                let sourceInstance = wd.unsafeGetGameObjectSourceInstanceComponent(box, state);

                let objectInstanceTransforTransformArray = wd.getSourceInstanceObjectInstanceTransformArray(sourceInstance, state);



                for (let i = 0, len = objectInstanceTransforTransformArray.length; i < len; i++) {
                    let transform = objectInstanceTransforTransformArray[i];


                    var localPos = wd.getTransformLocalPosition(transform, state);

                    state = wd.setTransformLocalPosition(transform, [Math.random() * 2 * playgroundSize - playgroundSize, Math.random() * 2 * playgroundSize - playgroundSize, Math.random() * 2 * playgroundSize - playgroundSize], state);

                }
            }

            return [state, boxes];

        },

        setPosition: function (boxes, state) {
            return InstanceBasicBoxesTool.setPositionWithRange(boxes, 300, state)
        },

        setData: function (boxes, state) {
            return ScheduleTool.scheduleLoop(function (state) {
                return _setData(boxes, state)
            }, state)
        },



        setDataWorker: function (boxes, state) {
            return ScheduleTool.scheduleWorkerMainLoopUnSafeJob(function (stateData) {
                var state = wd.unsafeGetState();

                _setData(boxes, state);
            }, state)
        },





        createAndDisposeSourceInstanceGameObjects: function (sourceInstanceCount, objectInstanceCount, boxes, state) {
            window.boxes = [];

            return ScheduleTool.scheduleLoop(function (state) {
                return createAndDisposeSourceInstanceGameObjects(sourceInstanceCount, objectInstanceCount, boxes, state)
            }, state)
        },


        createAndDisposeSourceInstanceGameObjectsWorker: function (sourceInstanceCount, objectInstanceCount, boxes, state) {
            window.boxes = [];


            return ScheduleTool.scheduleWorkerMainLoopUnSafeJob(function (stateData) {
                var state = createAndDisposeSourceInstanceGameObjects(sourceInstanceCount, objectInstanceCount, boxes, wd.getStateFromData(stateData));


                wd.setState(state);
            }, state)
        },


        createAndDisposeObjectInstanceGameObjects: function (boxes, state) {
            window.boxes = [];

            return ScheduleTool.scheduleLoop(function (state) {
                for (let i = 0, len = window.boxes.length; i < len; i++) {
                    let box = window.boxes[i];
                    state = wd.disposeGameObject(box, state);
                }

                // var state = batchDisposeGameObject(window.boxes, state);



                var record = InstanceBasicBoxesTool.createBoxes(1, 3000, false, state);
                var state = record[0];
                var newBoxes = record[1];



                var record = InstanceBasicBoxesTool.setPosition(newBoxes, state);
                var state = record[0];
                var newBoxes = record[1];



                window.boxes = newBoxes;



                for (let i = 0, len = newBoxes.length; i < len; i++) {
                    let box = newBoxes[i];
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