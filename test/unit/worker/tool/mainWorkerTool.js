var mainWorkerTool = (function () {
    return {
        buildFakeDomQuery: function (sandbox, canvasDom) {
            return {
                css: sandbox.stub(),
                get: sandbox.stub().returns(canvasDom)
            };
        },
        buildOffscreen: function (sandbox, gl) {
            return {
                style: {},
                width: 1,
                height: 2,
                getContext: sandbox.stub().returns(gl),
            }
        },
        buildMessage: function (offscreen, viewportData, options) {
            return {
                data: {
                    operateType: wd.EWorkerOperateType.INIT_GL,
                    canvas: offscreen,
                    options: options || {},
                    viewportData: viewportData || {}
                }
            }
        }
    }
})()

