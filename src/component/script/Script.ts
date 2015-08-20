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
        public static create(scriptName:string, callback:Function):Script;

        public static create() {
            if(arguments.length === 0){
                return new this();
            }
            else if(arguments.length === 2){
                let scriptName = arguments[0],
                    callback = arguments[1];

                this.script.push(<IScriptFileData>{
                    name: scriptName,
                    class: callback()
                });
            }
        }

        //todo prepend script prefix(defined in config data) to relative path?
        private _url:string = null;
        get url(){
            return this._url;
        }
        set url(url:string){
            this._url = url;
        }

        public createLoadJsStream(){
            return LoaderManager.getInstance().load(this._url)
            .map(() => {
                    return Script.script.pop();
                });
        }
    }
}
