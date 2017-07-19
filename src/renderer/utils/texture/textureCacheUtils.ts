import { expect } from "wonder-expect.js";
import { GPUDetector } from "../../device/GPUDetector";
import { it, requireCheckFunc } from "../../../definition/typescript/decorator/contract";

export var isCached = (unitIndex:number, textureIndex:number, TextureCacheDataFromSystem:any) => {
    return _getActiveTexture(unitIndex, TextureCacheDataFromSystem) === textureIndex;
}

var _getActiveTexture = requireCheckFunc((unitIndex:number, TextureCacheDataFromSystem:any) => {
    _checkUnit(unitIndex);
}, (unitIndex:number, TextureCacheDataFromSystem:any) => {
    return TextureCacheDataFromSystem.bindTextureUnitCache[unitIndex];
})

export var addActiveTexture = requireCheckFunc((unitIndex:number, textureIndex:number, TextureCacheDataFromSystem:any) => {
    _checkUnit(unitIndex);
}, (unitIndex:number, textureIndex:number, TextureCacheDataFromSystem:any) => {
    TextureCacheDataFromSystem.bindTextureUnitCache[unitIndex] = textureIndex;
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

export var clearAllBindTextureUnitCache = (TextureCacheDataFromSystem:any) => {
    TextureCacheDataFromSystem.bindTextureUnitCache = [];
}

export var initData = (TextureCacheDataFromSystem:any) => {
    TextureCacheDataFromSystem.bindTextureUnitCache = [];
}
