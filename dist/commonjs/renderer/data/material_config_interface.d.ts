export interface IMaterialConfig {
    shaders: {
        materialShaders: {
            [shaderName: string]: MaterialShaderLibConfig;
        };
        noMaterialShaders: {
            [shaderName: string]: MaterialShaderLibConfig;
        };
    };
    shaderLibGroups: IMaterialShaderLibGroup;
}
export interface IMaterialShaderLibGroup {
    [groupName: string]: Array<string>;
}
export interface IShaderLibItem {
    type: string;
    branch?: (...args) => string;
    value?: any;
}
export declare type MaterialShaderLibConfig = Array<string | IShaderLibItem>;
