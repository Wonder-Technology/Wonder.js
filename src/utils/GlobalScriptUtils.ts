module wd{
    export class GlobalScriptUtils{
        public static addScriptToEntityObject(entityObject:EntityObject, data:ScriptFileData){
            ScriptEngine.getInstance().addChild(entityObject, data.name, new data.class(entityObject));
        }
    }
}

