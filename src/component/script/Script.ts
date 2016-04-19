module wd{
    export class Script extends Component{
        public static scriptList:wdCb.Stack<ScriptFileData> = wdCb.Stack.create<ScriptFileData>();

        public static create():Script;
        public static create(url:string):Script;

        public static create(...args) {
            if(args.length === 0){
                return new this();
            }
            else if(args.length === 1){
                let url = args[0];

                return new this(url);
            }
        }

        public static addScript(scriptName:string, _class:Function){
            this.scriptList.push(<ScriptFileData>{
                name: scriptName,
                class: _class
            });
        }

        constructor(url:string = null){
            super();

            this.url = url;
        }

        @cloneAttributeAsBasicType()
        public url:string = null;

        private _subscription:wdFrp.IDisposable = null;

        public dispose(){
            this._subscription.dispose();
        }

        public createLoadJsStream(){
            Log.error(!this.url, Log.info.FUNC_MUST_DEFINE("url"));

            return LoaderManager.getInstance().load(this.url)
            .map(() => {
                    return Script.scriptList.pop();
                });
        }

        public addToObject(entityObject:EntityObject, isShareComponent:boolean = false){
            var self = this;

            super.addToObject(entityObject, isShareComponent);

            this._subscription = this.createLoadJsStream()
                .subscribe((data:ScriptFileData) => {
                    GlobalScriptUtils.addScriptToEntityObject(entityObject, data);
                    GlobalScriptUtils.handlerAfterLoadedScript(entityObject);
                });
        }
    }

    export type ScriptFileData = {
        name:string;
        class:any;
    };
}
