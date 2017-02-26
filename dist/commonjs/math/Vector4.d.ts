import { Vector3 } from "./Vector3";
export declare class Vector4 {
    static create(x: any, y: any, z: any, w: any): any;
    static create(): any;
    constructor(x: any, y: any, z: any, w: any);
    constructor();
    x: number;
    y: number;
    z: number;
    w: number;
    values: Float32Array;
    normalize(): Vector4;
    isEqual(v: Vector4): boolean;
    clone(): Vector4;
    toVector3(): Vector3;
    lengthManhattan(): any;
    multiplyScalar(scalar: number): this;
    dot(v: Vector4): number;
    set(x: number, y: number, z: number, w: number): void;
    protected copyHelper(vector4: Vector4): any;
}
