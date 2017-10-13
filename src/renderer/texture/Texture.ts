import {
    create, dispose, getHeight, getIsNeedUpdate, getSource, getWidth, initTexture as initTextureSystem, setHeight, setIsNeedUpdate,
    setSource,
    setWidth
} from "./TextureSystem";
import { TextureData } from "./TextureData";
import { requireCheckFunc } from "../../definition/typescript/decorator/contract";
import { checkComponentShouldAlive, isComponentIndexNotRemoved } from "../../component/ComponentSystem";
import { getGL } from "../device/DeviceManagerSystem";
import { DeviceManagerData } from "../device/DeviceManagerData";
import { getState } from "../../core/DirectorSystem";
import { DirectorData } from "../../core/DirectorData";
import { TextureCacheData } from "./TextureCacheData";
import { GPUDetectData } from "../device/GPUDetectData";
import { ITexture } from "../interface/ITexture";

export class Texture implements ITexture {
    public index: number = null;
}

export const createTexture = () => {
    return create(TextureData);
}

export const initTexture = (texture: Texture) => {
    initTextureSystem(getGL(DeviceManagerData), texture.index, TextureData);
}

export const disposeTexture = requireCheckFunc((texture: Texture) => {
    _checkShouldAlive(texture);
}, (texture: Texture) => {
    dispose(getGL(DeviceManagerData, getState(DirectorData)), texture, TextureCacheData, TextureData, GPUDetectData);
})

export const getTextureSource = requireCheckFunc((texture: Texture) => {
    _checkShouldAlive(texture);
}, (texture: Texture) => {
    return getSource(texture.index, TextureData);
})

export const setTextureSource = requireCheckFunc((texture: Texture) => {
    _checkShouldAlive(texture);
}, (texture: Texture, source: any) => {
    setSource(texture.index, source, TextureData);
})

export const getTextureWidth = requireCheckFunc((texture: Texture) => {
    _checkShouldAlive(texture);
}, (texture: Texture) => {
    return getWidth(texture.index, TextureData);
})

export const setTextureWidth = requireCheckFunc((texture: Texture) => {
    _checkShouldAlive(texture);
}, (texture: Texture, value: number) => {
    setWidth(texture.index, value, TextureData);
})

export const getTextureHeight = requireCheckFunc((texture: Texture) => {
    _checkShouldAlive(texture);
}, (texture: Texture) => {
    return getHeight(texture.index, TextureData);
})

export const setTextureHeight = requireCheckFunc((texture: Texture) => {
    _checkShouldAlive(texture);
}, (texture: Texture, value: number) => {
    setHeight(texture.index, value, TextureData);
})

export const getTextureIsNeedUpdate = requireCheckFunc((texture: Texture) => {
    _checkShouldAlive(texture);
}, (texture: Texture) => {
    return getIsNeedUpdate(texture.index, TextureData);
})

export const setTextureIsNeedUpdate = requireCheckFunc((texture: Texture) => {
    _checkShouldAlive(texture);
}, (texture: Texture, value: number) => {
    setIsNeedUpdate(texture.index, value, TextureData);
})

const _checkShouldAlive = (texture: Texture) => {
    checkComponentShouldAlive(texture, null, (texture: Texture) => {
        return isComponentIndexNotRemoved(texture);
    })
}
