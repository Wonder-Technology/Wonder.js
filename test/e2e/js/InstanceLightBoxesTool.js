var InstanceLightBoxesTool = (function () {
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

            let sourceInstance = wd.getGameObjectSourceInstanceComponent(box, state);

            let objectInstanceArray = wd.getSourceInstanceObjectInstanceArray(sourceInstance, state);



            for (let i = 0, len = objectInstanceArray.length; i < len; i++) {
                let objectInstance = objectInstanceArray[i];

                var transform = wd.unsafeGetGameObjectTransformComponent(objectInstance, state);


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
    return {
        createBox: function (count, isStatic, state) {
            var data = wd.createLightMaterial(state);
            var state = data[0];
            var material = data[1];

            state = wd.setLightMaterialDiffuseColor(material, [0.0, 0.5, 0.2], state);

            var data = wd.createMeshRenderer(state);
            var state = data[0];
            var meshRenderer = data[1];

            var data = wd.createGameObject(state);
            var state = data[0];
            var obj = data[1];

            state = wd.addGameObjectLightMaterialComponent(obj, material, state);
            state = wd.addGameObjectMeshRendererComponent(obj, meshRenderer, state);


            var data = wd.createBoxGeometry(state);
            var state = data[0];
            var geometry = data[1];

            state = wd.setBoxGeometryConfigData(geometry, {
                width: 5,
                height: 5,
                depth: 5
            }, state);




            state = wd.addGameObjectBoxGeometryComponent(obj, geometry, state);






            var data = wd.createSourceInstance(state);
            var state = data[0];
            var sourceInstance = data[1];


            var state = wd.markSourceInstanceModelMatrixIsStatic(sourceInstance, isStatic, state);


            var state =
                wd.addGameObjectSourceInstanceComponent(obj, sourceInstance, state);



            var objectInstanceGameObjectArr = [];

            for (let i = 0; i < count; i++) {
                var data =
                    wd.createSourceInstanceObjectInstance(sourceInstance, state);
                var state = data[0];
                var objectInstanceGameObject = data[1];

                objectInstanceGameObjectArr.push(objectInstanceGameObject);
            }






            return [state, obj, objectInstanceGameObjectArr];

        },
        createBoxes: function (sourceInstanceGameObjectCount, objectInstanceGameObjectCount, isStatic, state) {
            var boxes = [];

            for (let i = 0; i < sourceInstanceGameObjectCount; i++) {
                var data = InstanceLightBoxesTool.createBox(objectInstanceGameObjectCount, isStatic, state);
                var state = data[0];
                var box = data[1];
                var objectInstanceArr = data[2];

                boxes.push(box);
            }


            return [state, boxes];
        },
        createBoxesWithHierachy: function (parentCount, childrenCount, isStatic, state) {
            var boxes = [];


            var data = InstanceLightBoxesTool.createBox(parentCount, isStatic, state);
            var state = data[0];
            var box1 = data[1];
            var objectInstanceArr1 = data[2];


            var data = InstanceLightBoxesTool.createBox(childrenCount, isStatic, state);
            var state = data[0];
            var box2 = data[1];
            var objectInstanceArr2 = data[2];




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

        setPosition: function (boxes, state) {
            var playgroundSize = 300;

            for (let i = 0, len = boxes.length; i < len; i++) {
                let box = boxes[i];

                let sourceInstance = wd.getGameObjectSourceInstanceComponent(box, state);

                let objectInstanceArray = wd.getSourceInstanceObjectInstanceArray(sourceInstance, state);



                for (let i = 0, len = objectInstanceArray.length; i < len; i++) {
                    let objectInstance = objectInstanceArray[i];

                    var transform = wd.unsafeGetGameObjectTransformComponent(objectInstance, state);


                    var localPos = wd.getTransformLocalPosition(transform, state);

                    state = wd.setTransformLocalPosition(transform, [Math.random() * 2 * playgroundSize - playgroundSize, Math.random() * 2 * playgroundSize - playgroundSize, Math.random() * 2 * playgroundSize - playgroundSize], state);

                }
            }

            return [state, boxes];

        },


        setData: function (boxes, state) {
            return ScheduleTool.scheduleLoop(function (elapsed, state) {
                return _setData(boxes, state)
            }, state)
        },
        createAndDisposeSourceInstanceGameObjects: function (sourceInstanceCount, objectInstanceCount, boxes, state) {
            window.boxes = [];

            return ScheduleTool.scheduleLoop(function (elapsed, state) {
                // for (let i = 0, len = window.boxes.length; i < len; i++) {
                //     let box = window.boxes[i];
                //     state = disposeGameObject(box, state);
                // }

                var state = wd.batchDisposeGameObject(window.boxes, state);



                var data = InstanceLightBoxesTool.createBoxes(sourceInstanceCount, objectInstanceCount, false, state);
                var state = data[0];
                var newBoxes = data[1];


                var data = InstanceLightBoxesTool.setPosition(newBoxes, state);
                var state = data[0];
                var newBoxes = data[1];



                window.boxes = newBoxes;



                for (let i = 0, len = newBoxes.length; i < len; i++) {
                    let box = newBoxes[i];
                    state = wd.initGameObject(box, state);
                }

                return state;

            }, state)
        },
        createAndDisposeObjectInstanceGameObjects: function (boxes, state) {
            window.boxes = [];

            return ScheduleTool.scheduleLoop(function (elapsed, state) {
                for (let i = 0, len = window.boxes.length; i < len; i++) {
                    let box = window.boxes[i];
                    state = wd.disposeGameObject(box, state);
                }

                // var state = batchDisposeGameObject(window.boxes, state);



                var data = InstanceLightBoxesTool.createBoxes(1, 3000, false, state);
                var state = data[0];
                var newBoxes = data[1];



                var data = InstanceLightBoxesTool.setPosition(newBoxes, state);
                var state = data[0];
                var newBoxes = data[1];



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