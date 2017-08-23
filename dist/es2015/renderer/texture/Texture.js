import { create, dispose, getHeight, getIsNeedUpdate, getSource, getWidth, setHeight, setIsNeedUpdate, setSource, setWidth } from "./TextureSystem";
import { TextureData } from "./TextureData";
import { requireCheckFunc } from "../../definition/typescript/decorator/contract";
import { checkComponentShouldAlive, isComponentIndexNotRemoved } from "../../component/ComponentSystem";
import { getGL } from "../device/DeviceManagerSystem";
import { DeviceManagerData } from "../device/DeviceManagerData";
import { getState } from "../../core/DirectorSystem";
import { DirectorData } from "../../core/DirectorData";
import { TextureCacheData } from "./TextureCacheData";
import { GPUDetectData } from "../device/GPUDetectData";
var Texture = (function () {
    function Texture() {
        this.index = null;
    }
    return Texture;
}());
export { Texture };
export var createTexture = function () {
    return create(TextureData);
};
export var disposeTexture = requireCheckFunc(function (texture) {
    _checkShouldAlive(texture);
}, function (texture) {
    dispose(getGL(DeviceManagerData, getState(DirectorData)), texture, TextureCacheData, TextureData, GPUDetectData);
});
export var getTextureSource = requireCheckFunc(function (texture) {
    _checkShouldAlive(texture);
}, function (texture) {
    return getSource(texture.index, TextureData);
});
export var setTextureSource = requireCheckFunc(function (texture) {
    _checkShouldAlive(texture);
}, function (texture, source) {
    setSource(texture.index, source, TextureData);
});
export var getTextureWidth = requireCheckFunc(function (texture) {
    _checkShouldAlive(texture);
}, function (texture) {
    return getWidth(texture.index, TextureData);
});
export var setTextureWidth = requireCheckFunc(function (texture) {
    _checkShouldAlive(texture);
}, function (texture, value) {
    setWidth(texture.index, value, TextureData);
});
export var getTextureHeight = requireCheckFunc(function (texture) {
    _checkShouldAlive(texture);
}, function (texture) {
    return getHeight(texture.index, TextureData);
});
export var setTextureHeight = requireCheckFunc(function (texture) {
    _checkShouldAlive(texture);
}, function (texture, value) {
    setHeight(texture.index, value, TextureData);
});
export var getTextureIsNeedUpdate = requireCheckFunc(function (texture) {
    _checkShouldAlive(texture);
}, function (texture) {
    return getIsNeedUpdate(texture.index, TextureData);
});
export var setTextureIsNeedUpdate = requireCheckFunc(function (texture) {
    _checkShouldAlive(texture);
}, function (texture, value) {
    setIsNeedUpdate(texture.index, value, TextureData);
});
var _checkShouldAlive = function (texture) {
    checkComponentShouldAlive(texture, null, function (texture) {
        return isComponentIndexNotRemoved(texture);
    });
};
//# sourceMappingURL=Texture.js.map