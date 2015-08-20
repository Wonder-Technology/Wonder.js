/// <reference path="../definitions.d.ts"/>
module dy{
    export class GLSLLoader{
        private static _instance:GLSLLoader = null;

        public static getInstance() {
            if (this._instance === null) {
                this._instance = new this();
            }
            return this._instance;
        }

        private _container:dyCb.Hash<string> = dyCb.Hash.create<string>();

        public load(url:string, id:string):dyRt.Stream{
            var self = this,
                stream = null;

            if(this._container.getChild(id)){
                stream = dyRt.empty();
            }
            else{
                stream = dyRt.fromPromise(this._loadText(url))
                .do((data) => {
                        self._container.addChild(id, data);
                }, (err) => {
                        self._errorHandle(url, err);
                }, null);
            }

            return stream;
        }

        public get(id:string):string{
           return this._container.getChild(id);
        }

        public has(id:string){
            return this._container.hasChild(id);
        }

        private _loadText(url) {
            return new RSVP.Promise((resolve, reject) => {
                dyCb.AjaxUtils.ajax({
                    type: "get",
                    //async: true,
                    url: url,
                    contentType: "text/plain; charset=utf-8",
                    dataType: "text",
                    //cache: false,
                    success: (data) => {
                        resolve(data);
                    },
                    error: (XMLHttpRequest, errorThrown) => {
                        reject("url:" + url + "\nreadyState:" + XMLHttpRequest.readyState + "\nstatus:" + XMLHttpRequest.status
                            + "\nmessage:" + errorThrown.message
                            + "\nresponseText:" + XMLHttpRequest.responseText);
                    }
                });
            });
        }

        private _errorHandle(path, err) {
            dyCb.Log.log("加载" + path + "资源失败:"+ err);
        }
    }
}
