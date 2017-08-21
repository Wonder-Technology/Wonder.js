var StateTool = YYC.Class(StateToolBase, {
    Public:{
        createAndSetFakeGLState: function (sandbox) {
            var state = this.base(sandbox);

            var dom = {
                clientWidth:100,
                clientHeight:200,
                style:{
                    left:"0px",
                    top:"0px"
                }
            }

            return state.setIn(["View", "dom"], dom);
        },
        setCanvas: function (state, canvas) {
            return state.setIn(["View", "dom"], canvas);
        }
    }
})

var stateTool = new StateTool();