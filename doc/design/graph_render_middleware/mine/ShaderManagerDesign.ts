# In WebGL Plugin

## init material job


// note: should be interface(refer to IWebGL1)
IShaderManager.init(material, MaterialType.Phong)


## render job


let program = IShaderManager.getProgram(material)


use(program)


IShaderManager.sendMaterialData(material)

drawElements





# In ShaderManager Middeware


enum MaterialType {
    Phong,
    # PBR
}

export const phongMaterialDataName: {
    diffuseColor,
    diffuseMap,
...
}

export let phongMaterialComponentName = "PhongMaterial"

IShaderManager.init(material, materialType: MaterialType) => {
    let shader = createShader()

    setShader(material, shader)


    // build glsl and get send data

    let vertexGLSL = ""
    let fragGLSL = ""

    let sendDataArr = []

    switch (materialType) {
        case MaterialType.Phong:
            let diffuseMap: number | null = getComponentData<number>(phongMaterialComponentName, material, phongMaterialDataName.diffuseMap)

            if (diffuseMap === null) {
                fragGLSL = fragGLSL + noDiffuseMapGLSL
            }
            else {
                fragGLSL = fragGLSL + diffuseMapGLSL

                let pos = webgl1.getUniformLocation(gl, program, "u_diffuseMap");
                let getDataFunc = (material) => { return getComponentData<number>(phongMaterialComponentName, material, phongMaterialDataName.diffuseMap) }
                let sendDataFunc = (gl, pos, value) => uniform1i(gl, pos, value)

                sendDataArr.push(
                    {
                        pos, getDataFunc, sendDataFunc
                    }
                )
            }

            break
        // case MaterialType.PBR:
        // break
        default:
            throw
    }

    setSendDataArr(shader, sendDataArr)



    let program = createProgram(vertexGLSL, forEach)
    setProgram(shader, program)
}




IShaderManager.getProgram(material) = ...


IShaderManager.sendMaterialData(material) => {
    getSendDataArr(getShader(material)).forEach({ pos, getDataFunc, sendDataFunc } => {
        senDataFunc(pos, getDataFunc(material))
})
}