import { EWorkerOperateType } from "../worker/both_file/EWorkerOperateType";
import { ContextConfigOptionsData } from "./dataType";

export type MessageInitGLData = {
    operateType:EWorkerOperateType;
    canvas:HTMLCanvasElement;
    options:ContextConfigOptionsData;
    viewportData:ViewportData;
}

export type ScreenData = {
    x:number;
    y:number;
    width:number;
    height:number;
}

export type ViewportData = {
    x:number;
    y:number;
    width:number;
    height:number;
}
