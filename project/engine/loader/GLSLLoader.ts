/// <reference path="LoaderManager.ts"/>
/// <reference path="../import/YEQuery.ts"/>
module Engine3D{
    export class GLSLLoader{
        private static _instance:GLSLLoader = null;

        public static getInstance() {
            if (this._instance === null) {
                this._instance = new this();
            }
            return this._instance;
        }

        private _container:any = {};

        public load(url:string, id:string){
            var self = this;

            if(this._container[id]){
                LoaderManager.getInstance().onResLoaded();
                return;
            }

            this._loadText(url, (err, data) => {
                if(err){
                    LoaderManager.getInstance().onResError(url, err);
                    return;
                }

                LoaderManager.getInstance().onResLoaded();
                self._container[id] = data;
            });
        }

        public getGLSL(id:string):string{
           return this._container[id];
        }

        private _loadText(url, callback) {
            YEQuery.ajax({
                type: "get",
                //async: true,
                url: url,
                contentType: "text/plain; charset=utf-8",
                dataType: "text",
                //cache: false,
                success: function (data) {
                    callback(null, data);
                },
                error: function (XMLHttpRequest, errorThrown) {
                    callback("url:" + url + "\nreadyState:" + XMLHttpRequest.readyState + "\nstatus:" + XMLHttpRequest.status
                    + "\nmessage:" + errorThrown.message
                    + "\nresponseText:" + XMLHttpRequest.responseText)
                }
            });
        }
    }
}
