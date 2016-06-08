module wd {
    export class ScriptManager {
        public static create(entityObject:EntityObject) {
            var obj = new this(entityObject);

            return obj;
        }

        constructor(entityObject:EntityObject) {
            this._entityObject = entityObject;
        }

        private _scriptList:wdCb.Hash<IScriptBehavior> = wdCb.Hash.create<IScriptBehavior>();

        private _entityObject:EntityObject = null;
        private _scriptExecuteHistory:wdCb.Hash<boolean> = wdCb.Hash.create<boolean>();

        public addChild(scriptName:string, classInstance:IScriptBehavior){
            this._scriptList.addChild(scriptName, classInstance);
        }

        public getChild(scriptName:string){
            return this._scriptList.getChild(scriptName);
        }

        public removeChild(targetClassInstance:IScriptBehavior){
            return this._scriptList.removeChild((classInstance:IScriptBehavior) => {
                return classInstance === targetClassInstance;
            });
        }

        public hasChild(targetClassInstance:IScriptBehavior){
            return this._scriptList.hasChildWithFunc((classInstance:IScriptBehavior) => {
                return classInstance === targetClassInstance;
            });
        }

        public execScriptOnlyOnce(method:string){
            this._scriptList.forEach((script:IScriptBehavior, scriptName:string) => {
                if(this._isScriptExecuted(scriptName, method)){
                    return;
                }

                if(script && script[method]){
                    script[method]();
                }

                this._addToScriptExecuteHistory(scriptName, method);
            }, this);
        }

        public execScriptWithData(method:string, data:any){
            this._scriptList.forEach((script:IScriptBehavior) => {
                if(script[method]){
                    script[method](data);
                }
            });
        }

        public execScript(method:string){
            this._scriptList.forEach((script:IScriptBehavior) => {
                if(script[method]){
                    script[method]();
                }
            });
        }

        //public execScript(method:string);
        //public execScript(method:string, arg:any);
        //public execScript(method:string, arg:any, isExecOnlyOnce:boolean);
        //
        //public execScript(...args){
        //    var method:string = args[0],
        //        self = this;
        //
        //    if(args.length === 1){
        //        this._scriptList.forEach((script:IScriptBehavior, scriptName:string) => {
        //            script[method] && script[method]();
        //
        //            self._addToScriptExecuteHistory(scriptName, method);
        //        });
        //    }
        //    else if(args.length === 2){
        //        let arg:any = args[1];
        //
        //        this._scriptList.forEach((script:IScriptBehavior, scriptName:string) => {
        //            script[method] && script[method](arg);
        //
        //            self._addToScriptExecuteHistory(scriptName, method);
        //        });
        //    }
        //    else if(args.length === 3){
        //        let arg:any = args[1],
        //            isExecOnlyOnce:boolean = args[2];
        //
        //        this._scriptList.forEach((script:IScriptBehavior, scriptName:string) => {
        //            if(isExecOnlyOnce && self._isScriptExecuted(scriptName, method)){
        //                return;
        //            }
        //
        //            script[method] && script[method](arg);
        //
        //            self._addToScriptExecuteHistory(scriptName, method);
        //        });
        //    }
        //}

        //public execEventScript(method:string){
        //    this._scriptList.forEach((script:IEventScriptBehavior) => {
        //        if(script && script[method]){
        //            script[method]();
        //        }
        //    });
        //}

        public execEventScriptWithData(method:string, data:any){
            this._scriptList.forEach((script:IEventScriptBehavior) => {
                if(script && script[method]){
                    script[method](data);
                }
            });
        }

        private _addToScriptExecuteHistory(scriptName:string, method:string){
            this._scriptExecuteHistory.addChild(this._buildScriptHistoryKey(scriptName, method), true);
        }

        private _isScriptExecuted(scriptName:string, method:string):boolean{
            return this._scriptExecuteHistory.getChild(this._buildScriptHistoryKey(scriptName, method));
        }

        private _buildScriptHistoryKey(scriptName:string, method:string){
            return `${scriptName}_${method}`;
        }
    }
}
