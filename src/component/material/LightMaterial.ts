import { registerClass } from "../../definition/typescript/decorator/registerClass";
import { checkShouldAlive, Material } from "./Material";
import { create, initMaterial, setSpecularMap, setDiffuseMap } from "./LightMaterialSystem";
import { MaterialData } from "./MaterialData";
import { getAlphaTest, getColor, getOpacity, setAlphaTest, setColor, setOpacity } from "./MaterialSystem";
import { Color } from "../../structure/Color";
import { requireCheckFunc } from "../../definition/typescript/decorator/contract";
import { LightMaterialData } from "./LightMaterialData";
import { EShading } from "./EShading";
import {
    getEmissionColor, getLightModel, getShading, getShininess, getSpecularColor, setEmissionColor, setLightModel,
    setShading,
    setShininess,
    setSpecularColor
} from "./LightMaterialSystem";
import { getState } from "../../core/DirectorSystem";
import { DirectorData } from "../../core/DirectorData";
import { Texture } from "../../renderer/texture/Texture";
import { MapManagerData } from "../../renderer/texture/MapManagerData";
import { TextureData } from "../../renderer/texture/TextureData";
import { WebGL1ShaderData } from "../../renderer/webgl1/shader/ShaderData";
import { WebGL2ShaderData } from "../../renderer/webgl2/shader/ShaderData";
import { isWebgl1 } from "../../renderer/device/WebGLDetectSystem";

@registerClass("LightMaterial")
export class LightMaterial extends Material {
}

export var createLightMaterial = null;

if (isWebgl1()) {
    createLightMaterial = () => {
        return create(WebGL1ShaderData, MaterialData, LightMaterialData);
    }
}
else {
    createLightMaterial = () => {
        return create(WebGL2ShaderData, MaterialData, LightMaterialData);
    }
}

export const initLightMaterial = (material: LightMaterial) => {
    initMaterial(material.index, getState(DirectorData));
}

export const getLightMaterialColor = requireCheckFunc((material: LightMaterial) => {
    checkShouldAlive(material);
}, (material: LightMaterial) => {
    return getColor(material.index, MaterialData);
})

export const setLightMaterialColor = requireCheckFunc((material: LightMaterial) => {
    checkShouldAlive(material);
}, (material: LightMaterial, color: Color) => {
    setColor(material.index, color, MaterialData);
})

export const getLightMaterialOpacity = requireCheckFunc((material: LightMaterial) => {
    checkShouldAlive(material);
}, (material: LightMaterial) => {
    return getOpacity(material.index, MaterialData);
})

export const setLightMaterialOpacity = requireCheckFunc((material: LightMaterial) => {
    checkShouldAlive(material);
}, (material: LightMaterial, opacity: number) => {
    setOpacity(material.index, opacity, MaterialData);
})

export const getLightMaterialAlphaTest = requireCheckFunc((material: LightMaterial) => {
    checkShouldAlive(material);
}, (material: LightMaterial) => {
    return getAlphaTest(material.index, MaterialData);
})

export const setLightMaterialAlphaTest = requireCheckFunc((material: LightMaterial) => {
    checkShouldAlive(material);
}, (material: LightMaterial, alphaTest: number) => {
    setAlphaTest(material.index, alphaTest, MaterialData);
})

export const getLightMaterialSpecularColor = requireCheckFunc((material: LightMaterial) => {
    checkShouldAlive(material);
}, (material: LightMaterial) => {
    return getSpecularColor(material.index, LightMaterialData);
})

export const setLightMaterialSpecularColor = requireCheckFunc((material: LightMaterial) => {
    checkShouldAlive(material);
}, (material: LightMaterial, color: Color) => {
    setSpecularColor(material.index, color, LightMaterialData);
})

export const getLightMaterialEmissionColor = requireCheckFunc((material: LightMaterial) => {
    checkShouldAlive(material);
}, (material: LightMaterial) => {
    return getEmissionColor(material.index, LightMaterialData);
})

export const setLightMaterialEmissionColor = requireCheckFunc((material: LightMaterial) => {
    checkShouldAlive(material);
}, (material: LightMaterial, color: Color) => {
    setEmissionColor(material.index, color, LightMaterialData);
})

export const getLightMaterialShininess = requireCheckFunc((material: LightMaterial) => {
    checkShouldAlive(material);
}, (material: LightMaterial) => {
    return getShininess(material.index, LightMaterialData);
})

export const setLightMaterialShininess = requireCheckFunc((material: LightMaterial) => {
    checkShouldAlive(material);
}, (material: LightMaterial, shininess: number) => {
    setShininess(material.index, shininess, LightMaterialData);
})

export const getLightMaterialShading = requireCheckFunc((material: LightMaterial) => {
    checkShouldAlive(material);
}, (material: LightMaterial) => {
    return getShading(material.index, LightMaterialData);
})

export const setLightMaterialShading = requireCheckFunc((material: LightMaterial) => {
    checkShouldAlive(material);
}, (material: LightMaterial, shading: EShading) => {
    setShading(material.index, shading, LightMaterialData);
})

export const getLightMaterialLightModel = requireCheckFunc((material: LightMaterial) => {
    checkShouldAlive(material);
}, (material: LightMaterial) => {
    return getLightModel(material.index, LightMaterialData);
})

export const setLightMaterialLightModel = requireCheckFunc((material: LightMaterial) => {
    checkShouldAlive(material);
}, (material: LightMaterial, lightModel: number) => {
    setLightModel(material.index, lightModel, LightMaterialData);
})

export const setLightMaterialDiffuseMap = requireCheckFunc((material: LightMaterial) => {
    checkShouldAlive(material);
}, (material: LightMaterial, map: Texture) => {
    setDiffuseMap(material.index, map, MapManagerData, TextureData);
})

export const setLightMaterialSpecularMap = requireCheckFunc((material: LightMaterial) => {
    checkShouldAlive(material);
}, (material: LightMaterial, map: Texture) => {
    setSpecularMap(material.index, map, MapManagerData, TextureData);
})
