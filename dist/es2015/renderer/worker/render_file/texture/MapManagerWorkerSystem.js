import { bindAndUpdate as bindAndUpdateUtils, createTypeArrays, getBufferCount } from "../../../utils/texture/mapManagerUtils";
import { bindToUnit, initData as initTextureData, initTextures, needUpdate, update } from "./TextureWorkerSystem";
export var initMapManagers = function (gl, TextureWorkerData) {
    initTextures(gl, TextureWorkerData);
};
export var getMapCount = function (materialIndex, MapManagerWorkerData) {
    var textureCounts = MapManagerWorkerData.textureCounts;
    if (textureCounts === null) {
        return 0;
    }
    return textureCounts[materialIndex];
};
export var bindAndUpdate = function (gl, mapCount, TextureCacheWorkerData, TextureWorkerData, MapManagerWorkerData) {
    bindAndUpdateUtils(gl, mapCount, TextureCacheWorkerData, TextureWorkerData, MapManagerWorkerData, bindToUnit, needUpdate, update);
};
export var initData = function (textureData, TextureCacheWorkerData, TextureWorkerData, MapManagerWorkerData) {
    initTextureData(textureData.textureBuffer, TextureCacheWorkerData, TextureWorkerData);
    _initBufferData(textureData.mapManagerBuffer, MapManagerWorkerData);
};
var _initBufferData = function (buffer, MapManagerWorkerData) {
    createTypeArrays(buffer, getBufferCount(), MapManagerWorkerData);
};
//# sourceMappingURL=MapManagerWorkerSystem.js.map