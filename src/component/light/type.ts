export type AmbientLightRenderData = {
    colorArr:Array<number>;
};

export type DirectionLightRenderData = {
    colorArr:Array<number>;
    intensity:number;
}

export type LightGLSLDataStructure = {
    position: string;
    color: string;
    intensity: string;
}
