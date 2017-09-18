import { Stream } from "wonder-frp/dist/es2015/core/Stream";
import { Log } from "../utils/Log";
import { just } from "wonder-frp/dist/es2015/global/Operator";

export const load = (url:string, id:string, loadFunc:(url:string, id:string) => Stream, {container}) => {
    var data = null,
        stream = null;

    data = container.getChild(id);

    if(data){
        stream = just(data);
    }
    else{
        stream = loadFunc(url, id)
            .do((data:any) => {
                container.addChild(id, data);
                // LoaderManager.getInstance().add(id, self);
            },(err:any) => {
                _errorHandle(url, err);
            }, null);
    }

    return stream;
}

const _errorHandle = (path:string, err:string) => {
    Log.log(`load ${path} asset fail:${err}`);
}
