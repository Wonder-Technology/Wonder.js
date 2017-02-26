import { Vector2 } from "../math/Vector2";
import { IView } from "../structure/View";
import { ContextConfigData } from "../core/data/MainData";
import { RectRegion } from "../structure/RectRegion";
export declare class DeviceManager {
    static getInstance(): any;
    private constructor();
    private _scissorTest;
    scissorTest: boolean;
    setScissor(x: number, y: number, width: number, height: number): void;
    setViewport(x: number, y: number, width: number, height: number): void;
    getViewport(): RectRegion;
    private _depthTest;
    depthTest: boolean;
    private _depthFunc;
    depthFunc: EDepthFunction;
    private _side;
    side: ESide;
    polygonOffset: Vector2;
    private _polygonOffsetMode;
    polygonOffsetMode: EPolygonOffsetMode;
    private _depthWrite;
    depthWrite: boolean;
    private _blend;
    blend: boolean;
    private _alphaToCoverage;
    alphaToCoverage: boolean;
    view: IView;
    gl: WebGLRenderingContext;
    contextConfig: ContextConfigData;
    private _writeRed;
    private _writeGreen;
    private _writeBlue;
    private _writeAlpha;
    private _blendSrc;
    private _blendDst;
    private _blendEquation;
    private _blendFuncSeparate;
    private _blendEquationSeparate;
    private _scissorRegion;
    private _viewport;
    private _clearColor;
    private _pixelRatio;
    setBlendFunc(blendSrc: EBlendFunc, blendDst: EBlendFunc): void;
    setBlendEquation(blendEquation: EBlendEquation): void;
    setBlendFuncSeparate(blendFuncSeparate: Array<EBlendFunc>): void;
    setBlendEquationSeparate(blendEquationSeparate: Array<EBlendEquation>): void;
    setColorWrite(writeRed: any, writeGreen: any, writeBlue: any, writeAlpha: any): void;
    clear(options: any): void;
    createGL(canvasId: string, contextConfig: ContextConfigData, useDevicePixelRatio: boolean): void;
    setScreen(): void;
    setHardwareScaling(level: number): void;
    setPixelRatio(pixelRatio: number): void;
    getPixelRatio(): number;
    private _setClearColor(color);
    private _getCanvasId(canvasId);
}
export declare enum EDepthFunction {
    NEVER,
    ALWAYS,
    LESS,
    LEQUAL,
    EQUAL,
    GEQUAL,
    GREATER,
    NOTEQUAL,
}
export declare enum ESide {
    NONE = 0,
    BOTH = 1,
    BACK = 2,
    FRONT = 3,
}
export declare enum EPolygonOffsetMode {
    NONE = 0,
    IN = 1,
    OUT = 2,
    CUSTOM = 3,
}
export declare enum EBlendFunc {
    ZERO,
    ONE,
    SRC_COLOR,
    ONE_MINUS_SRC_COLOR,
    DST_COLOR,
    ONE_MINUS_DST_COLOR,
    SRC_ALPHA,
    SRC_ALPHA_SATURATE,
    ONE_MINUS_SRC_ALPHA,
    DST_ALPHA,
    ONE_MINUS_DST_ALPH,
}
export declare enum EBlendEquation {
    ADD,
    SUBTRACT,
    REVERSE_SUBTRAC,
}
export declare enum EBlendType {
    NONE = 0,
    NORMAL = 1,
    ADDITIVE = 2,
    ADDITIVEALPHA = 3,
    MULTIPLICATIVE = 4,
    PREMULTIPLIED = 5,
}
export declare enum ECanvasType {
    TwoDUI,
}
export declare type CanvasMapData = {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
};
