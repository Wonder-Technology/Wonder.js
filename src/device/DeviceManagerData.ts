import { ContextConfigData } from "../core/MainSystem";
import { RectRegion } from "../structure/RectRegion";

export class DeviceManagerData {
    public static gl: WebGLRenderingContext = null;

    public static contextConfig: ContextConfigData = null;

    public static pixelRatio: number = null;

    public static viewport: RectRegion = null;
}
