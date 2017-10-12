"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mapManagerUtils_1 = require("../../../utils/worker/render_file/texture/mapManagerUtils");
var TextureWorkerSystem_1 = require("./TextureWorkerSystem");
exports.initMapManagers = function (gl, TextureWorkerData) {
    TextureWorkerSystem_1.initTextures(gl, TextureWorkerData);
};
exports.initNeedInitTextures = TextureWorkerSystem_1.initNeedInitTextures;
exports.setMaterialTextureList = function (materialTextureList, MapManagerWorkerData) { return MapManagerWorkerData.materialTextureList = materialTextureList; };
exports.getMapCount = function (materialIndex, MapManagerWorkerData) {
    var textureCounts = MapManagerWorkerData.textureCounts;
    if (textureCounts === null) {
        return 0;
    }
    return textureCounts[materialIndex];
};
exports.bindAndUpdate = function (gl, mapCount, startIndex, definedStartTextureUnitIndex, TextureCacheWorkerData, TextureWorkerData, MapManagerWorkerData, GPUDetectWorkerData) {
    mapManagerUtils_1.bindAndUpdate(gl, mapCount, startIndex, definedStartTextureUnitIndex, TextureCacheWorkerData, TextureWorkerData, MapManagerWorkerData, GPUDetectWorkerData, TextureWorkerSystem_1.bindToUnit, TextureWorkerSystem_1.needUpdate, TextureWorkerSystem_1.update);
};
exports.initData = function (textureData, TextureCacheWorkerData, TextureWorkerData, MapManagerWorkerData) {
    TextureWorkerSystem_1.initData(textureData.textureBuffer, TextureCacheWorkerData, TextureWorkerData);
    _initBufferData(textureData.mapManagerBuffer, MapManagerWorkerData);
};
var _initBufferData = function (buffer, MapManagerWorkerData) {
    mapManagerUtils_1.createTypeArrays(buffer, mapManagerUtils_1.getBufferCount(), MapManagerWorkerData);
};
//# sourceMappingURL=MapManagerWorkerSystem.js.map