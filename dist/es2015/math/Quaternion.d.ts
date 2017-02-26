import { Vector3 } from "./Vector3";
import { Matrix4 } from "./Matrix4";
export declare class Quaternion {
    static create(x?: number, y?: number, z?: number, w?: number): Quaternion;
    constructor(x?: number, y?: number, z?: number, w?: number);
    x: number;
    y: number;
    z: number;
    w: number;
    setFromEulerAngles(eulerAngles: Vector3): this;
    multiply(rhs: Quaternion): any;
    multiply(rhs1: Quaternion, rhs2: Quaternion): any;
    setFromMatrix(matrix: Matrix4): this;
    setFromAxisAngle(angle: number, axis: Vector3): this;
    invert(): this;
    conjugate(): this;
    clone(): Quaternion;
    normalize(): this;
    length(): any;
    multiplyVector3(vector: Vector3): Vector3;
    set(x: number, y: number, z: number, w: number): void;
    sub(quat: Quaternion): this;
    getEulerAngles(): any;
    slerp(left: Quaternion, right: Quaternion, amount: number): Quaternion;
}
