import { create, setSource } from "./TextureSystem";
import { TextureData } from "./TextureData";
import { requireCheckFunc } from "../../definition/typescript/decorator/contract";
import { checkComponentShouldAlive, isComponentIndexNotRemoved } from "../../component/ComponentSystem";
export class Texture{
    public index:number = null;
}

export var createTexture = () => {
    return create(TextureData);
}

export var setTextureSource = requireCheckFunc((texture:Texture, source:any) => {
    _checkShouldAlive(texture);
}, (texture:Texture, source:any) => {
    setSource(texture.index, source, TextureData);
})

var _checkShouldAlive = (texture:Texture) => {
    checkComponentShouldAlive(texture, null, (texture:Texture) => {
        return isComponentIndexNotRemoved(texture);
    })
}
