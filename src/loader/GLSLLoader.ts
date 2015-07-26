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

        private _container:dyCb.Hash = dyCb.Hash.create();

        public load(url:string, id:string){
            var self = this;

            if(this._container.getChild(id)){
                console.log("has");
                return dyRt.createStream((observer:dyRt.IObserver) => {
                    observer.next(null);
                    observer.completed();
                }).do(() => {
                    LoaderManager.getInstance().onResLoaded();
                });
            }

            return dyRt.fromPromise(this._loadText(url)).do((data) => {
                LoaderManager.getInstance().onResLoaded();
                self._container.addChild(id, data);
            }, (err) => {
                LoaderManager.getInstance().onResError(url, err);
            }, null);
        }

        public getGLSL(id:string):string{
           return this._container.getChild(id);
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
    }
}
