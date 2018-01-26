var RedoUndoTool = (function () {
    return {
        redoUndoShader: function (count, state) {
            var index = 1;



            var state = wd.addLogicUpdateJob("updateJob1", "", function (elapsed, state) {
                console.log("updateJob1", elapsed);
                return state
            }, state);

            var state = ScheduleTool.scheduleLoop(function (elapsed, state) {
                if (index == 1) {
                    index += 1;

                    window.copyState1 = wd.deepCopyStateForRestore(state);

                    // var [state, sourceInstanceBox, objectInstanceBoxes] = createBoxesByInstance(2, state);




                    // var [state, objectInstanceBoxes] = setPosition(objectInstanceBoxes, state);


                    // state = initGameObject(sourceInstanceBox, state);



                    var data = BasicBoxesTool.createBoxesByClone(count, state);
                    var state = data[0];
                    var boxes = data[1];


                    var data = RedoUndoTool.setPosition(boxes, state);
                    var state = data[0];
                    var boxes = data[1];


                    for (let i = 0, len = boxes.length; i < len; i++) {
                        let box = boxes[i];
                        state = wd.initGameObject(box, state);
                    }




                    return state;

                }
                if (index === 2) {
                    index = 1;

                    return wd.restoreState(state, window.copyState1);
                }

                index += 1;
                return state;
            }, state);


            return state;
        },
        createBoxesByInstance: function (count, state) {
            return InstanceBasicBoxesTool.createBox(count, false, state);
        },
        setPosition: function (boxes, state) {
            var playgroundSize = 500;

            for (let i = 0, len = boxes.length; i < len; i++) {
                let box = boxes[i];

                var transform = wd.getGameObjectTransformComponent(box, state);

                var localPos = wd.getTransformLocalPosition(transform, state);

                state = wd.setTransformLocalPosition(transform, [Math.random() * 2 * playgroundSize - playgroundSize, Math.random() * 2 * playgroundSize - playgroundSize, Math.random() * 2 * playgroundSize - playgroundSize], state);
            }

            return [state, boxes];
        },
        createCamera: function (state) {
            return CameraTool.createCamera(state)
        }
    }
})()