import { get, load, setTextureAsset as setTextureAssetSystem } from "./AssetDatabaseSystem";
import { AssetData } from "./dataType";
import { AssetDatabaseData } from "./AssetDatabaseData";

export function loadAsset(url: string);
export function loadAsset(assetArr: Array<AssetData>);

export function loadAsset(...args){
    return load(args[0], AssetDatabaseData);
}

export const getAsset = (id: string) => {
    return get(id, AssetDatabaseData);
}

export function setTextureAsset(id: string, source:HTMLImageElement|HTMLCanvasElement, extname:string) {
    setTextureAssetSystem(id, source, extname, AssetDatabaseData);
}
