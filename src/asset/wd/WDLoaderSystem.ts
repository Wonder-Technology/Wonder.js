import { load as loadBase } from "../LoaderSystem";
import "whatwg-fetch";
import { IWDSourceData } from "./IWDSourceData";
import { fromPromise } from "wonder-frp/dist/es2015/global/Operator";
import { PathUtils } from "wonder-commonlib/dist/es2015/utils/PathUtils";
import { build } from "./WDAssemblerSystem";

export const load = (url: string, id: string, AssetDatabaseData: any) => {
    return loadBase(url, id, _load, AssetDatabaseData);
}

const _load = (url: string, id: string) => {
    fromPromise(fetch(url).then((response: Response) => {
        return response.json();
    }))
        .flatMap((sourceData: IWDSourceData) => {
            return _createLoadAllAssetsStream(url, sourceData);
        })
        .lastOrDefault()
        .map(([sourceData, arrayBuffer]) => {
            return build(sourceData, arrayBuffer);
        });
}

const _createLoadAllAssetsStream = (url: string, sourceData: IWDSourceData): wdFrp.Stream => {
    return _createLoadBufferStream(url, sourceData);
}

const _createLoadBufferStream = (filePath: string, sourceData: IWDSourceData): wdFrp.Stream => {
    return fromPromise(fetch(_getPath(filePath, sourceData.buffer.uri)).then((response: Response) => [sourceData, response.arraybuffer()]));
}

const _getPath = (filePath: string, mapUrl: string) => {
    return `${PathUtils.dirname(filePath)}/${mapUrl}`;
}
