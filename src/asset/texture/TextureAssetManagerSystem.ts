import { fromPromise } from "Wonder-FRP/dist/es2015/global/Operator";
import { root } from "../../definition/Variable";
import { ImageTextureAsset } from "./ImageTextureAsset";
import { ETextureFormat } from "../../renderer/enum/ETextureFormat";
import { Log } from "../../utils/Log";
import { PathUtils } from "wonder-commonlib/dist/es2015/utils/PathUtils";
import { load as loadBase } from "../LoaderSystem";

export const load = (url: string, id: string, AssetDatabaseData:any) => {
    return loadBase(url, id, _load, AssetDatabaseData);
}

const _load = (url: string, id: string) => {
    var extname = null,
        stream = null;

    extname = PathUtils.extname(url).toLowerCase();

    switch (extname){
        case ".jpg":
        case ".jpeg":
        case ".gif":
        case ".bmp":
        case ".png":
            stream = _loadImage(url)
                .map((image:HTMLImageElement) => {
                    return createImageTextureAsset(image, extname);
                });
            break;
        // case ".dds":
        //     todo handle cross origin?
            // stream = CompressedTextureLoader.load(url);
            // break;
        default:
            Log.error(true, Log.info.FUNC_NOT_SUPPORT(extname));
            break;
    }

    return stream;
}

const _setTextureAssetByExtname = (asset:ImageTextureAsset, extname:string) => {
    switch (extname){
        case ".jpg":
        case ".jpeg":
        case ".gif":
        case ".bmp":
            asset.format = ETextureFormat.RGB;
            break;
        case ".png":
            break;
        default:
            Log.error(true, Log.info.FUNC_NOT_SUPPORT(extname));
            break;
    }

    return asset;
}

const _loadImage = (url:string) => {
    return fromPromise(new Promise((resolve, reject) => {
        var img = null;

        img = new root.Image();

        // if(config.isCrossOrigin){
        //     img.crossOrigin = "anonymous";
        // }

        img.onload = function () {
            this.onload = null;
            resolve(img);
        };
        img.onerror = function () {
            reject("error");
        };

        img.src = url;
    }));
}

export const createImageTextureAsset = (source:HTMLImageElement|HTMLCanvasElement, extname:string) => {
    return _setTextureAssetByExtname(ImageTextureAsset.create(source), extname);
}
