import { GPUDetector } from "../device/GPUDetector";
import { it, requireCheckFunc } from "../../definition/typescript/decorator/contract";
import { expect } from "wonder-expect.js";

export var isCached = (unitIndex:number, textureIndex:number, TextureCacheData:any) => {
    return _getActiveTexture(unitIndex, TextureCacheData) === textureIndex;
}

var _getActiveTexture = requireCheckFunc((unitIndex:number, TextureCacheData:any) => {
    _checkUnit(unitIndex);
}, (unitIndex:number, TextureCacheData:any) => {
    return TextureCacheData.bindTextureUnitCache[unitIndex];
})

export var addActiveTexture = requireCheckFunc((unitIndex:number, textureIndex:number, TextureCacheData:any) => {
    _checkUnit(unitIndex);
}, (unitIndex:number, textureIndex:number, TextureCacheData:any) => {
    TextureCacheData.bindTextureUnitCache[unitIndex] = textureIndex;
})

var _checkUnit = (unitIndex:number) => {
    var maxTextureUnit = GPUDetector.getInstance().maxTextureUnit;

    it(`texture unitIndex should >= 0, but actual is ${unitIndex}`, () => {
        expect(unitIndex).gte(0);
    });
    it(`trying to cache ${unitIndex} texture unitIndexs, but GPU only supports ${maxTextureUnit} unitIndexs`, () => {
        expect(unitIndex).lt(maxTextureUnit);
    });
}

export var clearAllBindTextureUnitCache = (TextureCacheData:any) => {
    TextureCacheData.bindTextureUnitCache = [];
}

export var initData = (TextureCacheData:any) => {
    TextureCacheData.bindTextureUnitCache = [];
}
