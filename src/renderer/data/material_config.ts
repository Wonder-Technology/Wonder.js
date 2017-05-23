export const material_config = {
    // "materials": {
    "BasicMaterial": {
        // "createdShader": [
        //     "mainShader"
        // ],
        "shader": {
            // "mainShader": {
            // "type": "common",
            "shaderLib": [
                "CommonShaderLib",
                "VerticeCommonShaderLib",
                "BasicMaterialColorShaderLib",
                "BasicShaderLib",
                "EndBasicShaderLib",
                "EndShaderLib"
            ]
            // }
        }
    }
    // }
}

export interface IMaterialConfig {
    // materials: {
    [materialClassName: string]: IMaterialContentConfig
    // }
}

export interface IMaterialContentConfig {
    shader: IShaderConfig
}

export interface IShaderConfig {
    shaderLib: MaterialShaderLibConfig
}

export type MaterialShaderLibConfig = Array<string>
