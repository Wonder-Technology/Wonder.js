declare class Vector2 {
    static create(x: any, y: any): Vector2;
    static create(): Vector2;
    constructor(x: any, y: any);
    constructor();
    x: number;
    y: number;
    values: Float32Array;
    set(x: number, y: number): void;
    clone(): Vector2;
}

declare class Vector3 {
    static up: Vector3;
    static forward: Vector3;
    static right: Vector3;
    static create(x: any, y: any, z: any): Vector3;
    static create(): Vector3;
    constructor(x: any, y: any, z: any);
    constructor();
    x: number;
    y: number;
    z: number;
    values: Float32Array;
    normalize(): Vector3;
    isZero(): boolean;
    scale(scalar: number): any;
    scale(x: number, y: number, z: number): any;
    set(v: Vector3): any;
    set(x: number, y: number, z: number): any;
    sub(v: Vector3): Vector3;
    sub2(v1: Vector3, v2: Vector3): this;
    add(v: Vector3): this;
    add2(v1: Vector3, v2: Vector3): this;
    mul(v: Vector3): this;
    mul2(v1: Vector3, v2: Vector3): this;
    reverse(): Vector3;
    clone(): Vector3;
    //toVector4(): Vector4;
    length(): any;
    cross(lhs: Vector3, rhs: Vector3): this;
    lerp(lhs: Vector3, rhs: Vector3, alpha: number): this;
    dot(rhs: any): number;
}

declare class JudgeUtils {
    static isArray(arr:any):boolean;
}
