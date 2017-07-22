export declare const material_config: {
    "materials": {
        "BasicMaterial": {
            "shader": {
                "shaderLib": (string | {
                    "type": string;
                    "value": string;
                } | {
                    "type": string;
                    "branch": (materialIndex: any, {getMapCount}: {
                        getMapCount: any;
                    }, {MapManagerDataFromSystem}: {
                        MapManagerDataFromSystem: any;
                    }) => string;
                })[];
            };
        };
        "LightMaterial": {
            "shader": {
                "shaderLib": (string | {
                    "type": string;
                    "value": string;
                } | {
                    "type": string;
                    "branch": (materialIndex: any, {hasDiffuseMap, hasSpecularMap}: {
                        hasDiffuseMap: any;
                        hasSpecularMap: any;
                    }, {LightMaterialDataFromSystem}: {
                        LightMaterialDataFromSystem: any;
                    }) => string;
                })[];
            };
        };
    };
    "shaderLibGroups": {
        "engineMaterialTop": string[];
        "engineMaterialEnd": string[];
    };
};
export interface IMaterialConfig {
    materials: {
        [materialClassName: string]: IMaterialContentConfig;
    };
    shaderLibGroups: IMaterialShaderLibGroup;
}
export interface IMaterialShaderLibGroup {
    [groupName: string]: Array<string>;
}
export interface IMaterialContentConfig {
    shader: IShaderConfig;
}
export interface IShaderConfig {
    shaderLib: MaterialShaderLibConfig;
}
export interface IShaderLibItem {
    type: string;
    branch?: (...args) => string;
    value?: any;
}
export declare type MaterialShaderLibConfig = Array<string | IShaderLibItem>;
