import { AssetData } from "./dataType";
import { PathUtils } from "wonder-commonlib/dist/es2015/utils/PathUtils";
import { Log } from "../utils/Log";
import { Hash } from "wonder-commonlib/dist/es2015/Hash";
import { isArray } from "../utils/JudgeUtils";
import { fromArray } from "wonder-frp/dist/es2015/global/Operator";
import { load as loadTexture, createImageTextureAsset } from "./texture/TextureAssetManagerSystem";
import { enqueueTaskReturnPromise } from "wonder-task/background/IdleTaskSystem";

export function load(assertData:AssetData, AssetDatabaseData:any, timeout:number);
export function load(assertData:Array<AssetData>, AssetDatabaseData:any, timeout:number);

export function load(...args) {
    return enqueueTaskReturnPromise(args[2])
        .concat(_load(args[0], args[1]));
}

function _load(assertData:AssetData, AssetDatabaseData:any);
function _load(assertData:Array<AssetData>, AssetDatabaseData:any);

function _load(...args){
    var AssetDatabaseData = args[1];

    if (!isArray(args[0])) {
        let { url, id } = args[0];

        return _createLoadSingleAssetStream(url, id, AssetDatabaseData);
    }
    else {
        let assetArr: Array<AssetData> = args[0];

        return fromArray(assetArr).concatMap(({ url, id }) => {
            return _createLoadSingleAssetStream(url, id, AssetDatabaseData);
        });
    }
}

const _createLoadSingleAssetStream = (url: string, id: string, AssetDatabaseData:any) => {
    if(!has(id, AssetDatabaseData)){
        AssetDatabaseData.totalAssertCount += 1;
    }

    return _getLoadFunc(url)(url, id, AssetDatabaseData)
        .map(() => {
            AssetDatabaseData.currentLoadedCount += 1;

            return {
                currentLoadedCount: AssetDatabaseData.currentLoadedCount,
                totalAssetCount:AssetDatabaseData.totalAssertCount
            }
        });
}

const _getLoadFunc = (url: string) => {
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

export const get = (id:string, {container}) => {
    return container.getChild(id);
}

export const setTextureAsset = (id:string, source:HTMLImageElement|HTMLCanvasElement, extname:string, AssetDatabaseData:any) => {
    _set(id, createImageTextureAsset(source, extname), AssetDatabaseData);
}

const _set = (id:string, asset:any, {container}) => {
    container.addChild(id, asset);
}

export const has = (id:string, {container}) => {
    return container.hasChild(id);
}

export const initData = (AssetDatabaseData: any) => {
    AssetDatabaseData.container = Hash.create();
    AssetDatabaseData.totalAssertCount = 0;
    AssetDatabaseData.currentLoadedCount = 0;
}
