//todo handle not support worker
import { error } from "../../utils/Log";
import { RenderWorkerData } from "../worker/RenderWorkerData";
import { DomQuery } from "wonder-commonlib/dist/es2015/utils/DomQuery";
import { renderWorkerConfig } from "../worker/renderWorkerConfig";
import curry from "wonder-lodash/curry";
import { ensureFunc, it, requireCheckFunc } from "../../definition/typescript/decorator/contract";
import { EWorkerOperateType } from "../worker/EWorkerOperateType";
import { expect } from "wonder-expect.js";
import { IO } from "wonder-fantasy-land/dist/es2015/types/IO";

export var createGL = curry((canvasID: string, contextConfig: Map<string, any>, DeviceManagerData: any, state: Map<any, any>) => {
    // return IO.of(() => {
    //     var dom = _getCanvas(DomQuery, canvasID),
    //         gl = _getContext(contextConfig, dom);
    //
    //     if (!gl) {
    //         DomQuery.create("<p class='not-support-webgl'></p>").prependTo("body").text("Your device doesn't support WebGL");
    //     }
    //     return compose(setCanvas(dom), setContextConfig(contextConfig), setGL(gl, DeviceManagerData))(state);
    // });

    return IO.of(() => {
        var canvas = _getCanvas(DomQuery, canvasID);

        //todo move to contract check
        error(!('transferControlToOffscreen' in canvas), 'webgl in worker unsupported\n' +
            'try setting gfx.offscreencanvas.enabled to true in about:config');

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        canvas.style.width = "100%";
        canvas.style.height = "100%";


        let offscreen = (<any>canvas).transferControlToOffscreen();

        // console.log(offscreen)

        RenderWorkerData.renderWorker = new Worker(renderWorkerConfig.workerFilePath);

        RenderWorkerData.renderWorker.postMessage({
            operateType: EWorkerOperateType.INIT_GL,
            canvas: offscreen,
            options: contextConfig.get("options").toObject()
        }, [offscreen]);

        return state;
    })
})

var _getCanvas = (DomQuery: any, domID: string) => {
    if (domID !== "") {
        return DomQuery.create(_getCanvasID(domID)).get(0);
    }

    return DomQuery.create("<canvas></canvas>").prependTo("body").get(0);
}

var _getCanvasID = ensureFunc((id: string) => {
    it("dom id should be #string", () => {
        expect(/#[^#]+/.test(id)).true;
    });
}, (domID: string) => {
    if (domID.indexOf('#') > -1) {
        return domID;
    }

    return `#${domID}`;
});

// var _getContext = (contextConfig: Map<string, any>, dom: HTMLCanvasElement): WebGLRenderingContext => {
//     var options: ContextConfigOptionsData = contextConfig.get("options").toObject();
//
//     return (dom.getContext("webgl", options) || dom.getContext("experimental-webgl", options)) as WebGLRenderingContext;
// }
