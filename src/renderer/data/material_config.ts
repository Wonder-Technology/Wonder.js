export const material_config = {
    "BasicMaterial": {
        "shader": {
            "shaderLib": [
                "CommonShaderLib",
                "VerticeCommonShaderLib",
                "BasicMaterialColorShaderLib",
                "BasicShaderLib",
                "EndBasicShaderLib",
                "EndShaderLib"
            ]
        }
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

export type MaterialShaderLibConfig = Array<string>
