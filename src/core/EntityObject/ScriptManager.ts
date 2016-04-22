module wd {
    export class ScriptManager {
        public static create(entityObject:EntityObject) {
            var obj = new this(entityObject);

            return obj;
        }

        constructor(entityObject:EntityObject) {
            this._entityObject = entityObject;
        }

        public scriptList:wdCb.Hash<IScriptBehavior> = wdCb.Hash.create<IScriptBehavior>();

        private _entityObject:EntityObject = null;
        private _scriptExecuteHistory:wdCb.Hash<boolean> = wdCb.Hash.create<boolean>();

        public execScript(method:string);
        public execScript(method:string, arg:any);
        public execScript(method:string, arg:any, isExecOnlyOnce:boolean);

        public execScript(...args){
            var method:string = args[0],
                self = this;

            if(args.length === 1){
                this.scriptList.forEach((script:IScriptBehavior, scriptName:string) => {
                    script[method] && script[method]();

                    self._addToScriptExecuteHistory(scriptName, method);
                });
            }
            else if(args.length === 2){
                let arg:any = args[1];

                this.scriptList.forEach((script:IScriptBehavior, scriptName:string) => {
                    script[method] && script[method](arg);

                    self._addToScriptExecuteHistory(scriptName, method);
                });
            }
            else if(args.length === 3){
                let arg:any = args[1],
                    isExecOnlyOnce:boolean = args[2];

                this.scriptList.forEach((script:IScriptBehavior, scriptName:string) => {
                    if(isExecOnlyOnce && self._isScriptExecuted(scriptName, method)){
                        return;
                    }

                    script[method] && script[method](arg);

                    self._addToScriptExecuteHistory(scriptName, method);
                });
            }
        }

        public execEventScript(method:string, arg:any){
            this.scriptList.forEach((script:IEventScriptBehavior) => {
                script[method] && (arg !== null ? script[method](arg) : script[method]());
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
