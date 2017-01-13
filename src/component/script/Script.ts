module wd{
    export class Script extends Component{
        public static scriptList:wdCb.Stack<ScriptFileData> = wdCb.Stack.create<ScriptFileData>();

        public static create():Script;
        public static create(id:string):Script;

        public static create(...args) {
            if(args.length === 0){
                return new this();
            }
            else if(args.length === 1){
                let id = args[0];

                return new this(id);
            }
        }

        public static addScript(scriptName:string, _class:Function){
            this.scriptList.push(<ScriptFileData>{
                name: scriptName,
                class: _class
            });
        }

        constructor(id:string = null){
            super();

            this.id = id;
        }

        @cloneAttributeAsBasicType()
        public id:string = null;

        @require(function(){
            it("script should be loaded", () => {
                expect(LoaderManager.getInstance().get(this.id)).exist;
            }, this);
        })
        public addToComponentContainer(){
            var data:ScriptFileData = LoaderManager.getInstance().get(this.id);

            GlobalScriptUtils.addScriptToEntityObject(this.entityObject, data);
        }

        //todo removeFromComponentContainer?
    }

    export type ScriptFileData = {
        name:string;
        class:any;
    };
}
