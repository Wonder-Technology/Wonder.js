export declare class Vector2 {
    static create(x: any, y: any): Vector2;
    static create(): Vector2;
    constructor(x: any, y: any);
    constructor();
    x: number;
    y: number;
    values: Float32Array;
    set(x: number, y: number): void;
    add(v: Vector2): this;
    addScalar(s: number): this;
    multiplyScalar(s: number): this;
    mul(v: Vector2): this;
    isEqual(v: Vector2): boolean;
    clone(): Vector2;
}
