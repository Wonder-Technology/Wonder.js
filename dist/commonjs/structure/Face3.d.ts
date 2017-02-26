/// <reference types="wonder-commonlib" />
import { Vector3 } from "../math/Vector3";
import { Collection } from "wonder-commonlib/dist/commonjs/Collection";
export declare class Face3 {
    static create(aIndex: number, bIndex: number, cIndex: number, faceNormal?: Vector3, vertexNormals?: Collection<Vector3>): Face3;
    constructor(aIndex: number, bIndex: number, cIndex: number, faceNormal: Vector3, vertexNormals: Collection<Vector3>);
    private _faceNormal;
    faceNormal: Vector3;
    aIndex: number;
    bIndex: number;
    cIndex: number;
    vertexNormals: Collection<Vector3>;
    clone(): this;
    hasFaceNormal(): boolean;
    hasVertexNormal(): boolean;
}
