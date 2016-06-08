module wd{
    export class ScriptEngine{
        private static _instance = null;

        public static getInstance() {
            if (this._instance === null) {
                this._instance = new this();
            }

            return this._instance;
        }

        private _scriptList:wdCb.Collection<IScriptBehavior> = wdCb.Collection.create<IScriptBehavior>();

        public addChild(entityObject:EntityObject, scriptName:string, classInstance:IScriptBehavior){
            entityObject.scriptManager.addChild(scriptName, classInstance);

            this._scriptList.addChild(classInstance);
        }

        public removeChild(entityObject:EntityObject, classInstance:IScriptBehavior){
            entityObject.scriptManager.removeChild(classInstance);

            this._scriptList.removeChild(classInstance);
        }

        public removeAllChildren(){
            this._scriptList.removeAllChildren();
        }

        public findScript(entityObject:EntityObject, scriptName:string){
            return entityObject.scriptManager.getChild(scriptName);
        }

        public execEntityObjectScript(entityObject:EntityObject, method:string){
            entityObject.scriptManager.execScript(method);
        }

        public execEntityObjectScriptOnlyOnce(entityObject:EntityObject, method:string){
            entityObject.scriptManager.execScriptOnlyOnce(method);
        }

        public execEntityObjectScriptWithData(entityObject:EntityObject, method:string, data:any){
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

        public execEntityObjectEventScriptWithData(entityObject:EntityObject, method:string, data:any){
            entityObject.scriptManager.execEventScriptWithData(method, data);
        }
    }
}

