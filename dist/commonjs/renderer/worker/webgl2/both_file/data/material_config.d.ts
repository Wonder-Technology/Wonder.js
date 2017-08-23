export declare const webgl2_material_config: {
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
            "GBuffer": (string | {
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
        "noMaterialShaders": {
            "DeferAmbientLightPass": (string | {
                "type": string;
                "value": string;
            })[];
            "DeferDirectionLightPass": (string | {
                "type": string;
                "value": string;
            })[];
            "DeferPointLightPass": (string | {
                "type": string;
                "value": string;
            })[];
        };
    };
    "shaderLibGroups": {
        "engineMaterialTop": string[];
        "deferLightPassIndexZeroUbo": string[];
        "deferLightPassUbo": string[];
        "deferLightPassLightMap": string[];
        "engineMaterialEnd": string[];
    };
};
