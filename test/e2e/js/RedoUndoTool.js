var RedoUndoTool = (function () {
    return {
        redoUndoShader: function (count, state) {
            var index = 1;

            var state = ScheduleTool.scheduleLoop(function (state) {
                if (index == 1) {
                    index += 1;

                    window.copyState1 = wd.deepCopyForRestore(state);

                    var record = BasicBoxesTool.createBoxesByClone(count, state);
                    var state = record[0];
                    var boxes = record[1];


                    var record = RedoUndoTool.setPosition(boxes, state);
                    var state = record[0];
                    var boxes = record[1];


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
        redoUndoShaderWithMap: function (count, source, state) {
            var index = 1;

            var state = ScheduleTool.scheduleLoop(function (state) {
                if (index == 1) {
                    index += 1;

                    window.copyState1 = wd.deepCopyForRestore(state);

                    var record = BasicBoxesTool.createBoxesByCloneWithMap(count, source, state);
                    var state = record[0];
                    var boxes = record[1];


                    // var record = RedoUndoTool.setPosition(boxes, state);
                    var record = BasicBoxesTool.setPosition(boxes, state);
                    var state = record[0];
                    var boxes = record[1];


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
        createBoxesByInstanceWithMap: function (count, source, state) {
            return InstanceBasicBoxesTool.createBoxWithMap(count, false, source, state);
        },
        // setPosition: function (boxes, state) {
        //     return InstanceBasicBoxesTool.setPosition(boxes, state);
        //     // var playgroundSize = 500;

        //     // for (let i = 0, len = boxes.length; i < len; i++) {
        //     //     let box = boxes[i];

        //     //     var transform = wd.unsafeGetGameObjectTransformComponent(box, state);

        //     //     var localPos = wd.getTransformLocalPosition(transform, state);

        //     //     state = wd.setTransformLocalPosition(transform, [Math.random() * 2 * playgroundSize - playgroundSize, Math.random() * 2 * playgroundSize - playgroundSize, Math.random() * 2 * playgroundSize - playgroundSize], state);
        //     // }

        //     // return [state, boxes];
        // },
        createCamera: function (state) {
            return CameraTool.createCamera(state)
        }
    }
})()