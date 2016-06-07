module wd{
    export class ScriptEngine{
        private static _instance = null;

        public static getInstance() {
            if (this._instance === null) {
                this._instance = new this();
            }

            return this._instance;
        }

        //private _scriptList:wdCb.Hash<IScriptBehavior> = wdCb.Hash.create<IScriptBehavior>();
        //private _scriptMap:wdCb.Hash<wdCb.Hash<IScriptBehavior>> = wdCb.Hash.create<wdCb.Hash<IScriptBehavior>>();

        private _scriptList:wdCb.Collection<IScriptBehavior> = wdCb.Collection.create<IScriptBehavior>();

        //public getChild(uid:number){
        //    return this._scriptList.getChild(String(uid));
        //}

        public addChild(entityObject:EntityObject, scriptName:string, classInstance:IScriptBehavior){
            entityObject.scriptManager.addChild(scriptName, classInstance);

            this._scriptList.addChild(classInstance);
        }

        public removeChild(uid:number){
            this._scriptList.removeChild(String(uid));
        }

        //public hasChild(uid:number){
        //    return this._scriptList.hasChild(String(uid));
        //}

        public findScript(entityObject:EntityObject, scriptName:string){
            return entityObject.scriptManager.getChild(scriptName);
        }

        public execEntityObjectScript(entityObject:EntityObject, method:string){
        //    var script:IScriptBehavior = this._scriptList.getChild(String(uid));
        //
        //    if(script && script[method]){
        //        script[method]();
        //    }
            entityObject.scriptManager.execScript(method);
        }

        public execEntityObjectScriptOnlyOnce(entityObject:EntityObject, method:string){
            entityObject.scriptManager.execScriptOnlyOnce(method);
        }

        public execEntityObjectScriptWithData(entityObject:EntityObject, method:string, data:any){
            //var script:IScriptBehavior = this._scriptList.getChild(String(uid));
            //
            //if(script && script[method]){
            //    script[method](data);
            //}

            entityObject.scriptManager.execScriptWithData(method, data);
        }

        public execScript(method:string){
            this._scriptList.forEach((script:IScriptBehavior) => {
                if(script[method]){
                    script[method]();
                }
            });
        }

        public execScriptWithData(method:string, data:any){
            this._scriptList.forEach((script:IScriptBehavior) => {
                if(script[method]){
                    script[method](data);
                }
            });
        }

        //public execEntityObjectEventScript(uid:number, method:string){
        //    var script:IEventScriptBehavior = this._scriptList.getChild(String(uid));
        //
        //    if(script && script[method]){
        //        script[method]();
        //    }
        //}

        public execEntityObjectEventScriptWithData(entityObject:EntityObject, method:string, data:any){
            //var script:IEventScriptBehavior = this._scriptList.getChild(String(uid));
            //
            //if(script && script[method]){
            //    script[method](data);
            //}
            //
            entityObject.scriptManager.execEventScriptWithData(method, data);
        }
    }
}

