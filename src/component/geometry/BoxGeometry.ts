import { registerClass } from "../../definition/typescript/decorator/registerClass";
import { Geometry } from "./Geometry";

@registerClass("BoxGeometry")
export class BoxGeometry extends Geometry{

    // public verticesIndex:number = null;
    // public indicesIndex:number = null;

    //todo add this?
    // public vertexBufferIndex:number = null;
    // public indexBufferIndex:number = null;
}

export type BoxGeometryConfigDataMap = {
    [index:number]: BoxGeometryConfigData
}

export type BoxGeometryConfigData = {
    width:number;
    height:number;
    depth:number;
    widthSegments:number;
    heightSegments:number;
    depthSegments:number;
}
