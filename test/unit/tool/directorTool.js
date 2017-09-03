var directorTool = (function(){
    return {
        init: function (args) {
            var director = this.getDirector(),
                state = null;

            if(!!arguments[0].getIn){
                state = arguments[0];
                director._init(state);
            }
            else{
                var sandbox = arguments[0];

                state = stateTool.createFakeGLState(sandbox);

                director._init(state);
            }

            // return state.getIn(["DeviceManager", "gl"]);
            return wd.DeviceManager.getInstance().gl;
        },
        loopBody: function (state, time) {
            var director = this.getDirector();

            director._loopBody(time || 0, state);
        },
        updateSystem: function(elapsed, state){
          return wd.updateSystem(elapsed, state);
        },
        getDirector: function(){
            return wd.Director.getInstance();
        },

        resetData: function () {

        }
    }
})();

