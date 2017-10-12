import { get, load, setTextureAsset as setTextureAssetSystem } from "./AssetDatabaseSystem";
import { AssetData } from "./dataType";
import { AssetDatabaseData } from "./AssetDatabaseData";

// export function loadAsset(url: string, onNextFunc:Function, onErrorFunc:Function, onCompleteFunc:Function, timeout?:number);
// export function loadAsset(assetArr: Array<AssetData>, onNextFunc:Function, onErrorFunc:Function, onCompleteFunc:Function, timeout?:number);
//
// export function loadAsset(...args){
//     return load(args[0], AssetDatabaseData, args[1], args[2], args[3], args[4] || 100);
// }
export function loadAsset(url: string, timeout?:number);
export function loadAsset(assetArr: Array<AssetData>, timeout?:number);

export function loadAsset(...args){
    return load(args[0], AssetDatabaseData, args[1] || 100);
}

export const getAsset = (id: string) => {
    return get(id, AssetDatabaseData);
}

export function setTextureAsset(id: string, source:HTMLImageElement|HTMLCanvasElement, extname:string) {
    setTextureAssetSystem(id, source, extname, AssetDatabaseData);
}
