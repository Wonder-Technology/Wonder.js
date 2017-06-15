var stateToolCommon = (function () {
    return {
        getGLFromFakeGLState: function (state) {
            // return state.getIn(["DeviceManager", "gl"]);
            return wd.DeviceManager.getInstance().gl;
        },
        setState: function(state){
            wd.DirectorData.state = state;
        }
    }
})()

