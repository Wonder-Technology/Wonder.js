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

        public url:string = null;

        public createLoadJsStream(){
            Log.error(!this.url, Log.info.FUNC_MUST_DEFINE("url"));

            return LoaderManager.getInstance().load(this.url)
            .map(() => {
                    return Script.scriptList.pop();
                });
        }

        public addToObject(entityObject:EntityObject){
            var self = this;

            super.addToObject(entityObject);

            this.createLoadJsStream()
                .subscribe((data:ScriptFileData) => {
                    self._addScriptToEntityObject(entityObject, data);

                    entityObject.execScript("onEnter", null, true);
                    entityObject.execScript("init", null, true);
                });
        }

        private _addScriptToEntityObject(entityObject:EntityObject, data:ScriptFileData){
            entityObject.scriptList.addChild(data.name, new data.class(entityObject));
        }
    }

    export type ScriptFileData = {
        name:string;
        class:any;
    };
}
