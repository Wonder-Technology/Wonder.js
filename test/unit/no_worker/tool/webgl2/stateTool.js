var StateTool = YYC.Class(StateToolBase, {
    Public:{
        createAndSetFakeGLState: function (sandbox) {
            var state = this.base(sandbox);

            var viewport = {
                x:0,
                y:0,
                width:100,
                height:200
            }

            return state.setIn(["DeviceManager", "viewport"], viewport);
        },
        setViewport: function (state, viewport) {
            return state.setIn(["DeviceManager", "viewport"], viewport);
        }
    }
})

var stateTool = new StateTool();