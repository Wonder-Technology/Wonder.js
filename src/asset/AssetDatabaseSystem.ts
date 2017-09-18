import { AssetData } from "./dataType";
import { isString } from "../utils/JudgeUtils";
import { PathUtils } from "wonder-commonlib/dist/es2015/utils/PathUtils";
import { load as loadTexture } from "./TextureLoaderSystem";
import { Log } from "../utils/Log";
import { Hash } from "wonder-commonlib/dist/es2015/Hash";

export function preload(url: string, AssetDatabaseData:any);
export function preload(assetArr: Array<AssetData>, AssetDatabaseData:any);

export function preload(...args) {
    if (isString(args[0])) {
        let url: string = args[0],
            id: string = url,
            AssetDatabaseData:any = args[1];

        return _createLoadSingleAssetStream(url, id, AssetDatabaseData)
            .map(() => {
                if(has(id, AssetDatabaseData)){
                    AssetDatabaseData.totalAssertCount += 1;
                }

                AssetDatabaseData.currentLoadedCount += 1;

                return {
                    currentLoadedCount: AssetDatabaseData.currentLoadedCount,
                    totalAssetCount:AssetDatabaseData.totalAssertCount
                }
            });
    }
    else {
        //todo finish
    }
}

const _createLoadSingleAssetStream = (url: string, id: string, AssetDatabaseData:any) => {
    return _getLoad(url)(url, id, AssetDatabaseData);
}

const _getLoad = (url: string) => {
    var extname = PathUtils.extname(url),
        load: Function = null;

    switch (extname) {
        case ".jpg":
        case ".jpeg":
        case ".png":
        //todo support load compress texture
        // case ".dds":
        case ".gif":
        case ".bmp":
            load = loadTexture;
            break;
        default:
            Log.error(true, Log.info.FUNC_UNKNOW(`extname:${extname}`));
            break;
    }

    return load;
}

export const streamLoad = () => {

}

//todo support load array assets
export const load = ({url, id}, AssetDatabaseData:any) => {
    return _createLoadSingleAssetStream(url, id, AssetDatabaseData)
        .map(() => {
            if(has(id, AssetDatabaseData)){
                AssetDatabaseData.totalAssertCount += 1;
            }

            AssetDatabaseData.currentLoadedCount += 1;

            return {
                currentLoadedCount: AssetDatabaseData.currentLoadedCount,
                totalAssetCount:AssetDatabaseData.totalAssertCount
            }
        });
}

export const set = () => {

}

export const get = (id:string, {container}) => {
    return container.getChild(id);
}

export const has = (id:string, {container}) => {
    return container.hasChild(id);
}

export const initData = (AssetDatabaseData: any) => {
    AssetDatabaseData.container = Hash.create();
    AssetDatabaseData.totalAssertCount = 0;
    AssetDatabaseData.currentLoadedCount = 0;
}
