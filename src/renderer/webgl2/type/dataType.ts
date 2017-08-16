// import { IWebGL2UboConfig } from "../../worker/webgl2/both_file/data/shaderLib_generator";

export type UboBindingPointMap = {
    [uboName:string]: number;
}

export type UboSingleBufferDataList = Array<{
    name:string;
    typeArray:Float32Array;
    buffer:WebGLBuffer;
    initBufferDataFunc:Function;
    setBufferDataFunc:Function;
}>

export type UboMultiBufferDataList = Array<{
    name:string;
    typeArrays:Array<Float32Array>;
    buffers:Array<WebGLBuffer>;
    initBufferDataFunc:Function;
    setBufferDataFunc:Function;
}>
