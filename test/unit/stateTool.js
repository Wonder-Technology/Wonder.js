var stateTool = (function () {
    return {
        createAndSetFakeGLState: function (sandbox) {
            var state = this.createFakeGLState(sandbox);

            this.setState(state);

            return state;
        },
        createFakeGLState: function (sandbox) {
            var state = wd.createState();
            var gl = glslTool.buildFakeGl(sandbox);

            return state.setIn(["DeviceManager", "gl"], gl);
        },
        getGLFromFakeGLState: function (state) {
            return state.getIn(["DeviceManager", "gl"]);
        },
        setState: function(state){
            wd.DirectorData.state = state;
        }
    }
})()

