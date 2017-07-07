export class PointLightData {
    public static renderDataMap:Array<PointLightRenderData> = null;
}

export type PointLightRenderData = {
    colorArr:Array<number>;
    intensity:number;
    constant:number;
    linear:number;
    quadratic:number;
    range:number;
}

