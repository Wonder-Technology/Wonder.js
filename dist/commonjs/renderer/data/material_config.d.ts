export declare const material_config: {
    "BasicMaterial": {
        "shader": {
            "shaderLib": string[];
        };
    };
};
export interface IMaterialConfig {
    [materialClassName: string]: IMaterialContentConfig;
}
export interface IMaterialContentConfig {
    shader: IShaderConfig;
}
export interface IShaderConfig {
    shaderLib: MaterialShaderLibConfig;
}
export declare type MaterialShaderLibConfig = Array<string>;
