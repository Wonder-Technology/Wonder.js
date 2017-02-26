import { ContextConfigData } from "../core/data/MainData";
export declare class ViewWebGL implements IView {
    static create(view: any): ViewWebGL;
    constructor(dom: any);
    readonly offset: {
        x: any;
        y: any;
    };
    private _dom;
    readonly dom: any;
    width: number;
    height: number;
    styleWidth: string;
    styleHeight: string;
    x: number;
    y: number;
    initCanvas(): void;
    getContext(contextConfig: ContextConfigData): WebGLRenderingContext;
}
export interface IView {
    offset: {
        x: number;
        y: number;
    };
    x: number;
    y: number;
    width: number;
    height: number;
    styleWidth: string;
    styleHeight: string;
    dom: any;
    getContext(contextConfig: ContextConfigData): WebGLRenderingContext;
    initCanvas(): void;
}
