export const material_config = {
    "materials":{
        "BasicMaterial": {
            "shader": {
                "shaderLib": [
                    {"type":"group", "value":"engineMaterialTop"},

                    "BasicMaterialColorShaderLib",
                    "BasicShaderLib",
                    "EndBasicShaderLib",

                    {"type":"group", "value":"engineMaterialEnd"}
                ]
            }
        },
        "LightMaterial": {
            "shader": {
                "shaderLib": [
                    {"type":"group", "value":"engineMaterialTop"},

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
                    "PointLightShaderLib",
                    "DirectionLightShaderLib",
                    "LightEndShaderLib",

                    {"type":"group", "value":"engineMaterialEnd"}
                ]
            }
        }
    },
    "shaderLibGroups": {
        "engineMaterialTop":[
            "CommonShaderLib",
            //todo test
            "ModelMatrixNoInstanceShaderLib",
            "VerticeCommonShaderLib"
        ],
        "engineMaterialEop":[
            "EndShaderLib"
        ]
    }
}

export interface IMaterialConfig {
    [materialClassName: string]: IMaterialContentConfig
}

export interface IMaterialContentConfig {
    shader: IShaderConfig
}

export interface IShaderConfig {
    shaderLib: MaterialShaderLibConfig
}

export interface IShaderLibItem{
    type:string;
    value:any;
}

export type MaterialShaderLibConfig = Array<string|IShaderLibItem>;
