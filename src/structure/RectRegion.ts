import { registerClass } from "../definition/typescript/decorator/registerClass";
import { Vector4 } from "../math/Vector4";

@registerClass("RectRegion")
export class RectRegion extends Vector4 {
    get width() {
        return this.z;
    }
    set width(width: number) {
        this.z = width;
    }

    get height() {
        return this.w;
    }
    set height(height: number) {
        this.w = height;
    }

    public clone(): RectRegion {
        return this.copyHelper(RectRegion.create());
    }

    public isNotEmpty() {
        return this.x !== 0
            || this.y !== 0
            || this.width !== 0
            || this.height !== 0;
    }
}