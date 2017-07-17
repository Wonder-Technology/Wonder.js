import { generateComponentIndex } from "../../component/ComponentSystem";
import { ensureFunc, it, requireCheckFunc } from "../../definition/typescript/decorator/contract";
import { expect } from "wonder-expect.js";
import { Texture } from "./Texture";
import { MapManagerData } from "./MapManagerData";
import { isNotValidVal } from "../../utils/arrayUtils";
import {
    bindToUnit, dispose as disposeTextureSystem, initData as initTextureData, initTextures, needUpdate,
    update
} from "./TextureSystem";

// export var create = (MapManagerData:any) => {
//     var mapManager = new MapManager(),
//         index = generateComponentIndex(MapManagerData);
//
//     mapManager.index = index;
//
//     return mapManager;
// }

export var initMapManagers = (gl:WebGLRenderingContext, TextureData:any) => {
    initTextures(gl, TextureData);
}

export var getMap = requireCheckFunc((materialIndex: number, MapManagerData:any) => {
    it("map list should exist", () => {
        expect(getMapList(materialIndex, MapManagerData)).exist;
    })
}, (materialIndex: number, MapManagerData:any) => {
    return getMapList(materialIndex, MapManagerData)[0];
})

export var addMap = (materialIndex: number, map: Texture, MapManagerData:any) => {
    var textureArr = MapManagerData.textureMap[materialIndex];

    if(isNotValidVal(textureArr)){
        textureArr = [map];

        MapManagerData.textureMap[materialIndex] = textureArr;
    }
    else{
        textureArr.push(map);
    }
}

export var getMapList = ensureFunc((mapList:Array<Texture>, materialIndex: number, MapManagerData:any) => {
    it("only support max texture count <= 1", () => {
        expect(mapList.length).lte(1);
    });
}, (materialIndex: number, MapManagerData:any) => {
    return MapManagerData.textureMap[materialIndex];
})

export var getMapCount = requireCheckFunc((materialIndex: number, MapManagerData:any) => {
    it("map list should exist", () => {
        expect(getMapList(materialIndex, MapManagerData)).exist;
    })
}, (materialIndex: number, MapManagerData:any) => {
    return getMapList(materialIndex, MapManagerData).length;
})

//todo support multi textures

// export var addMapList = (materialIndex: number, mapList: Array<Texture>, MapManagerData:any) => {
//     for(let map of mapList){
//         addMap(materialIndex, map, MapManagerData);
//     }
// }

export var bindAndUpdate = (gl:WebGLRenderingContext, materialIndex: number, TextureCacheData:any, TextureData:any, MapManagerData:any) => {
    var mapList = getMapList(materialIndex, MapManagerData);

    for(let i = 0, len = mapList.length; i < len; i++){
        let texture = mapList[i],
            textureIndex = texture.index;

        bindToUnit(gl, i, textureIndex, TextureCacheData, TextureData);

        if(needUpdate(textureIndex, TextureData)){
            update(gl, textureIndex, TextureData);
        }
    }
}

export var disposeTexture = (gl:WebGLRenderingContext, texture:Texture, TextureCacheData:any, TextureData:any) => {
    disposeTextureSystem(gl, texture, TextureCacheData, TextureData);
}

//todo unit test comment
/*!
not dispose texture when dispose map manager(dispose material)!
because different materials may use same texture, if dispose one material's texture which is shared, then will affect other materials!

so need user mannually dispose texture one by one!
 */
export var dispose = (materialIndex: number, MapManagerData:any) => {
    _removeAllChildren(materialIndex, MapManagerData);
}


var _removeAllChildren = (materialIndex: number, MapManagerData:any) => {
    MapManagerData.textureMap[materialIndex] = [];
}

export var initData = (TextureCacheData:any, TextureData:any, MapManagerData:any) => {
    initTextureData(TextureCacheData, TextureData);

    MapManagerData.textureMap = [];
}
