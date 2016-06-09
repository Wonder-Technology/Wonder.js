module wd{
    export class GlobalScriptUtils{
        public static handlerAfterLoadedScript(entityObject:EntityObject){
            ScriptEngine.getInstance().execEntityObjectScriptOnlyOnce(entityObject, "onEnter");
            ScriptEngine.getInstance().execEntityObjectScriptOnlyOnce(entityObject, "init");
        }

        public static addScriptToEntityObject(entityObject:EntityObject, data:ScriptFileData){
            ScriptEngine.getInstance().addChild(entityObject, data.name, new data.class(entityObject));
        }
    }
}

