import { Vector4 } from "../math/Vector4";
export declare class RectRegion extends Vector4 {
    width: number;
    height: number;
    clone(): RectRegion;
    isNotEmpty(): boolean;
}
