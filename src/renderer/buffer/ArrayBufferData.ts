import { EBufferType } from "../enum/EBufferType";

export class ArrayBufferData{
    public static buffers:Array<WebGLBuffer> = null;

    public static bufferDataMap:ArrayBufferDataMap = null;
}

export type ArrayBufferDataMap = {
    [geometryIndex:number]:{
        size:number;
        type:EBufferType;
    }
}

