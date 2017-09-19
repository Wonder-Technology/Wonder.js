import { AssetData } from "./dataType";
import { PathUtils } from "wonder-commonlib/dist/es2015/utils/PathUtils";
import { load as loadTexture } from "./TextureLoaderSystem";
import { Log } from "../utils/Log";
import { Hash } from "wonder-commonlib/dist/es2015/Hash";
import { isArray } from "../utils/JudgeUtils";
import { fromArray } from "wonder-frp/dist/es2015/global/Operator";

export function load(assertData:AssetData, AssetDatabaseData:any);
export function load(assetArr: Array<AssetData>, AssetDatabaseData:any);

export function load(...args) {
    if (!isArray(args[0])) {
        let {url, id} = args[0],
            AssetDatabaseData:any = args[1];

        return _createLoadSingleAssetStream(url, id, AssetDatabaseData);
    }
    else {
        var assetArr = args[0],
            AssetDatabaseData:any = args[1];

        return fromArray(assetArr).concatMap(({url, id}) => {
            return _createLoadSingleAssetStream(url, id, AssetDatabaseData);
        });
    }
}

const _createLoadSingleAssetStream = (url: string, id: string, AssetDatabaseData:any) => {
    if(!has(id, AssetDatabaseData)){
        AssetDatabaseData.totalAssertCount += 1;
    }

    return _getLoad(url)(url, id, AssetDatabaseData)
        .map(() => {
            AssetDatabaseData.currentLoadedCount += 1;

            return {
                currentLoadedCount: AssetDatabaseData.currentLoadedCount,
                totalAssetCount:AssetDatabaseData.totalAssertCount
            }
        });
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

//todo implement
export const streamLoad = () => {

}

//todo implement
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
