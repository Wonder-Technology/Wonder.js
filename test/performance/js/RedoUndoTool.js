var RedoUndoTool = (function () {
    return {
        redoUndoShader: function (state) {
            var count = 1;

            var state = wd.scheduleLoop((elapsed, state) => {
                if (count == 1) {
                    count += 1;

                    window.copyState1 = wd.deepCopyStateForRestore(state);

                    // var [state, sourceInstanceBox, objectInstanceBoxes] = createBoxesByInstance(2, state);




                    // var [state, objectInstanceBoxes] = setPosition(objectInstanceBoxes, state);


                    // state = initGameObject(sourceInstanceBox, state);



                    var data = BasicBoxesTool.createBoxesByClone(5000, state);
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
                if (count === 2) {
                    count = 1;

                    return wd.restoreState(state, window.copyState1);
                }

                count += 1;
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