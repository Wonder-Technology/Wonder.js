import { Vector3 } from "../math/Vector3";
export declare class Color {
    static create(colorVal?: string): Color;
    dirty: boolean;
    private _r;
    r: number;
    private _g;
    g: number;
    private _b;
    b: number;
    private _a;
    a: number;
    private _colorString;
    private _colorVec3Cache;
    private _colorVec4Cache;
    initWhenCreate(colorVal?: string): void;
    toVector3(): Vector3;
    toVector4(): any;
    toString(): string;
    clone(): Color;
    isEqual(color: Color): boolean;
    private _setColor(colorVal);
    private _getColorValue(color, index, num?);
    private _setHex(hex);
    private _clearCache();
}
