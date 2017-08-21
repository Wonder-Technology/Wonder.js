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

            wdrd.DeviceManagerWorkerData.gl = gl;

            return state;
        },
        getGLFromFakeGLState: function (state) {
            return wd.DeviceManagerWorkerData.gl;
        },
        getState: function(){
            // wd.DirectorData.state = state;
            return wdrd.StateWorkerData.state;
        },
        setState: function(state){
            wdrd.StateWorkerData.state = state;
        }
    }
})()

