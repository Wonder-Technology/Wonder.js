module wd{
    export class GlobalScriptUtils{
        public static addScriptToEntityObject(entityObject:EntityObject, data:ScriptFileData){
            ScriptComponentContainer.getInstance().addChild(entityObject, data.name, new data.class(entityObject));
        }
    }
}

