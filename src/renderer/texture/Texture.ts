import {
    create, dispose, getHeight, getIsNeedUpdate, getSource, getWidth, setHeight, setIsNeedUpdate, setSource,
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

export class Texture{
    public index:number = null;
}

export var createTexture = () => {
    return create(TextureData);
}

export var disposeTexture = requireCheckFunc((texture:Texture) => {
    _checkShouldAlive(texture);
}, (texture:Texture) => {
    dispose(getGL(DeviceManagerData, getState(DirectorData)), texture, TextureCacheData, TextureData);
})

export var getTextureSource = requireCheckFunc((texture:Texture) => {
    _checkShouldAlive(texture);
}, (texture:Texture) => {
    return getSource(texture.index, TextureData);
})

export var setTextureSource = requireCheckFunc((texture:Texture) => {
    _checkShouldAlive(texture);
}, (texture:Texture, source:any) => {
    setSource(texture.index, source, TextureData);
})

export var getTextureWidth = requireCheckFunc((texture:Texture) => {
    _checkShouldAlive(texture);
}, (texture:Texture) => {
    return getWidth(texture.index, TextureData);
})

export var setTextureWidth = requireCheckFunc((texture:Texture) => {
    _checkShouldAlive(texture);
}, (texture:Texture, value:number) => {
    setWidth(texture.index, value, TextureData);
})

export var getTextureHeight = requireCheckFunc((texture:Texture) => {
    _checkShouldAlive(texture);
}, (texture:Texture) => {
    return getHeight(texture.index, TextureData);
})

export var setTextureHeight = requireCheckFunc((texture:Texture) => {
    _checkShouldAlive(texture);
}, (texture:Texture, value:number) => {
    setHeight(texture.index, value, TextureData);
})

export var getTextureIsNeedUpdate = requireCheckFunc((texture:Texture) => {
    _checkShouldAlive(texture);
}, (texture:Texture) => {
    return getIsNeedUpdate(texture.index, TextureData);
})

export var setTextureIsNeedUpdate = requireCheckFunc((texture:Texture) => {
    _checkShouldAlive(texture);
}, (texture:Texture, value:number) => {
    setIsNeedUpdate(texture.index, value, TextureData);
})

var _checkShouldAlive = (texture:Texture) => {
    checkComponentShouldAlive(texture, null, (texture:Texture) => {
        return isComponentIndexNotRemoved(texture);
    })
}
