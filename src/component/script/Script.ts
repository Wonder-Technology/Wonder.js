/// <reference path="../../definitions.d.ts"/>
module dy{
    export interface IScriptFileData{
        name:string;
        class:any
    }

    //todo add expose attributes for editor(refer to playcanvas)
    export class Script extends Component{
        public static script:dyCb.Stack<IScriptFileData> = dyCb.Stack.create<IScriptFileData>();

        public static create():Script;
        public static create(url:string):Script;
        public static create(scriptName:string, callback:Function):Script;

        public static create() {
            if(arguments.length === 0){
                return new this();
            }
            if(arguments.length === 1){
                let url = arguments[0];

                return new this(url);
            }
            else if(arguments.length === 2){
                let scriptName = arguments[0],
                    callback = arguments[1];

                this.script.push(<IScriptFileData>{
                    name: scriptName,
                    class: callback(Director.getInstance())
                });
            }
        }

        constructor(url:string = null){
            super();

            this.url = url;
        }

        //todo prepend script prefix(defined in config data) to relative path?
        public url:string = null;

        public createLoadJsStream(){
            dyCb.Log.error(!this.url, dyCb.Log.info.FUNC_MUST_DEFINE("url"));

            return LoaderManager.getInstance().load(this.url)
            .map(() => {
                    return Script.script.pop();
                });
        }

        public addToGameObject(gameObject:GameObject){
            super.addToGameObject(gameObject);

            Director.getInstance().scriptStreams.addChild(this.uid.toString(), this.createLoadJsStream()
                    .do((data:IScriptFileData) => {
                        gameObject.script.addChild(data.name, new data.class(gameObject));
                    })
            );
        }

        public removeFromGameObject(gameObject:GameObject){
            super.removeFromGameObject(gameObject);

            Director.getInstance().scriptStreams.removeChild(this.uid.toString());
        }
    }
}
