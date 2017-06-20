import { EWorkerOperateType } from "../worker/both_file/EWorkerOperateType";
import { ContextConfigOptionsData } from "./dataType";
export declare type MessageInitGLData = {
    operateType: EWorkerOperateType;
    canvas: HTMLCanvasElement;
    options: ContextConfigOptionsData;
    viewportData: ViewportData;
};
export declare type ScreenData = {
    x: number;
    y: number;
    width: number;
    height: number;
};
export declare type ViewportData = {
    x: number;
    y: number;
    width: number;
    height: number;
};
