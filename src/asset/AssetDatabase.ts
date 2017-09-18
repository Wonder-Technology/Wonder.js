import { get, preload } from "./AssetDatabaseSystem";
import { AssetData } from "./dataType";
import { AssetDatabaseData } from "./AssetDatabaseData";

export function preloadAsset(url: string);
export function preloadAsset(assetArr: Array<AssetData>);

export function preloadAsset(...args){
    return preload(args[0], AssetDatabaseData);
}

export const getAsset = (id: string) => {
    return get(id, AssetDatabaseData);
}
