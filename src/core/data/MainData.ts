import { EScreenSize } from "../../device/EScreenSize";
import { Main } from "wonder-frp/dist/es2015/core/Main";
import { RectRegion } from "../../structure/RectRegion";
export class MainData {
    private static _isTest: boolean = false;
    static get isTest() {
        return this._isTest;
    }
    static set isTest(isTest: boolean) {
        this._isTest = isTest;

        Main.isTest = MainData.isTest;
    }

    public static screenSize: EScreenSize & RectRegion = null;
}

export type ContextConfigData = {
    options: {
        alpha: boolean;
        depth: boolean;
        stencil: boolean;
        antialias: boolean;
        premultipliedAlpha: boolean;
        preserveDrawingBuffer: boolean;
    }
}
