export const material_config = {
    "materials": {
        "BasicMaterial": {
            "shader": {
                "shaderLib": [
                    { "type": "group", "value": "engineMaterialTop" },

                    "BasicMaterialColorShaderLib",
                    "BasicShaderLib",

                    {
                        "type": "branch",
                        "branch": (materialIndex, {
                            getMapCount
                        }, {
                                       MapManagerDataFromSystem
                                   }) => {
                            return getMapCount(materialIndex, MapManagerDataFromSystem) === 1
                        }, "value": "BasicMapShaderLib"
                    },


                    "BasicEndShaderLib",

                    { "type": "group", "value": "engineMaterialEnd" }
                ]
            }
        },
        "LightMaterial": {
            "shader": {
                "shaderLib": [
                    { "type": "group", "value": "engineMaterialTop" },

                    "NormalMatrixNoInstanceShaderLib",
                    "NormalCommonShaderLib",
                    "LightCommonShaderLib",
                    "LightSetWorldPositionShaderLib",

                    "NoLightMapShaderLib",
                    "NoDiffuseMapShaderLib",
                    "NoSpecularMapShaderLib",
                    "NoEmissionMapShaderLib",
                    "NoNormalMapShaderLib",
                    "NoShadowMapShaderLib",
                    "LightShaderLib",
                    "AmbientLightShaderLib",
                    "DirectionLightShaderLib",
                    "PointLightShaderLib",
                    "LightEndShaderLib",

                    { "type": "group", "value": "engineMaterialEnd" }
                ]
            }
        }
    },
    "shaderLibGroups": {
        "engineMaterialTop": [
            "CommonShaderLib",
            "ModelMatrixNoInstanceShaderLib",
            "VerticeCommonShaderLib"
        ],
        "engineMaterialEnd": [
            "EndShaderLib"
        ]
    }
}

export interface IMaterialConfig {
    materials: {
        [materialClassName: string]: IMaterialContentConfig
    };
    shaderLibGroups: IMaterialShaderLibGroup;
}

export interface IMaterialShaderLibGroup {
    [groupName: string]: Array<string>;
};

export interface IMaterialContentConfig {
    shader: IShaderConfig
}

export interface IShaderConfig {
    shaderLib: MaterialShaderLibConfig
}

export interface IShaderLibItem {
    type: string;
    branch?:Function;
    value: any;
}

export type MaterialShaderLibConfig = Array<string | IShaderLibItem>;
