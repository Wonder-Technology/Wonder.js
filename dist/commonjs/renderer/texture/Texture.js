"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TextureSystem_1 = require("./TextureSystem");
var TextureData_1 = require("./TextureData");
var contract_1 = require("../../definition/typescript/decorator/contract");
var ComponentSystem_1 = require("../../component/ComponentSystem");
var DeviceManagerSystem_1 = require("../device/DeviceManagerSystem");
var DeviceManagerData_1 = require("../device/DeviceManagerData");
var DirectorSystem_1 = require("../../core/DirectorSystem");
var DirectorData_1 = require("../../core/DirectorData");
var TextureCacheData_1 = require("./TextureCacheData");
var GPUDetectData_1 = require("../device/GPUDetectData");
var Texture = (function () {
    function Texture() {
        this.index = null;
    }
    return Texture;
}());
exports.Texture = Texture;
exports.createTexture = function () {
    return TextureSystem_1.create(TextureData_1.TextureData);
};
exports.initTexture = function (texture) {
    TextureSystem_1.initTexture(DeviceManagerSystem_1.getGL(DeviceManagerData_1.DeviceManagerData), texture.index, TextureData_1.TextureData);
};
exports.disposeTexture = contract_1.requireCheckFunc(function (texture) {
    _checkShouldAlive(texture);
}, function (texture) {
    TextureSystem_1.dispose(DeviceManagerSystem_1.getGL(DeviceManagerData_1.DeviceManagerData, DirectorSystem_1.getState(DirectorData_1.DirectorData)), texture, TextureCacheData_1.TextureCacheData, TextureData_1.TextureData, GPUDetectData_1.GPUDetectData);
});
exports.getTextureSource = contract_1.requireCheckFunc(function (texture) {
    _checkShouldAlive(texture);
}, function (texture) {
    return TextureSystem_1.getSource(texture.index, TextureData_1.TextureData);
});
exports.setTextureSource = contract_1.requireCheckFunc(function (texture) {
    _checkShouldAlive(texture);
}, function (texture, source) {
    TextureSystem_1.setSource(texture.index, source, TextureData_1.TextureData);
});
exports.getTextureWidth = contract_1.requireCheckFunc(function (texture) {
    _checkShouldAlive(texture);
}, function (texture) {
    return TextureSystem_1.getWidth(texture.index, TextureData_1.TextureData);
});
exports.setTextureWidth = contract_1.requireCheckFunc(function (texture) {
    _checkShouldAlive(texture);
}, function (texture, value) {
    TextureSystem_1.setWidth(texture.index, value, TextureData_1.TextureData);
});
exports.getTextureHeight = contract_1.requireCheckFunc(function (texture) {
    _checkShouldAlive(texture);
}, function (texture) {
    return TextureSystem_1.getHeight(texture.index, TextureData_1.TextureData);
});
exports.setTextureHeight = contract_1.requireCheckFunc(function (texture) {
    _checkShouldAlive(texture);
}, function (texture, value) {
    TextureSystem_1.setHeight(texture.index, value, TextureData_1.TextureData);
});
exports.getTextureIsNeedUpdate = contract_1.requireCheckFunc(function (texture) {
    _checkShouldAlive(texture);
}, function (texture) {
    return TextureSystem_1.getIsNeedUpdate(texture.index, TextureData_1.TextureData);
});
exports.setTextureIsNeedUpdate = contract_1.requireCheckFunc(function (texture) {
    _checkShouldAlive(texture);
}, function (texture, value) {
    TextureSystem_1.setIsNeedUpdate(texture.index, value, TextureData_1.TextureData);
});
var _checkShouldAlive = function (texture) {
    ComponentSystem_1.checkComponentShouldAlive(texture, null, function (texture) {
        return ComponentSystem_1.isComponentIndexNotRemoved(texture);
    });
};
//# sourceMappingURL=Texture.js.map