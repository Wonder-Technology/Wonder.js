export declare const webgl1_material_config: {
    "shaders": {
        "materialShaders": {
            "BasicRender": (string | {
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
            "FrontRenderLight": (string | {
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
        "noMaterialShaders": {};
    };
    "shaderLibGroups": {
        "engineMaterialTop": string[];
        "engineMaterialEnd": string[];
    };
};
