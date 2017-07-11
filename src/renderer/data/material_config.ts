export const material_config = {
    "materials":{
        "BasicMaterial": {
            "shader": {
                "shaderLib": [
                    {"type":"group", "value":"engineMaterialTop"},

                    "BasicMaterialColorShaderLib",
                    "BasicShaderLib",
                    "BasicEndShaderLib",

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
                    // "PointLightShaderLib",
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
        "engineMaterialEnd":[
            "EndShaderLib"
        ]
    }
}

export interface IMaterialConfig {
    materials:{
        [materialClassName: string]: IMaterialContentConfig
    };
    shaderLibGroups: IMaterialShaderLibGroup;
}

export interface IMaterialShaderLibGroup {
    [groupName:string]:Array<string>;
};

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
