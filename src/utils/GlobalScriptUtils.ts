module wd{
    export class GlobalScriptUtils{
        public static handlerAfterLoadedScript(entityObject:EntityObject){
            ScriptEngine.getInstance().execEntityObjectScriptOnlyOnce(entityObject, "onEnter");

            //todo fix trigger entityObject event?
            EventManager.trigger(CustomEvent.create(<any>EEngineEvent.BEFORE_GAMEOBJECT_INIT));

            ScriptEngine.getInstance().execEntityObjectScriptOnlyOnce(entityObject, "init");

            EventManager.trigger(CustomEvent.create(<any>EEngineEvent.AFTER_GAMEOBJECT_INIT));

            EventManager.trigger(CustomEvent.create(<any>EEngineEvent.AFTER_GAMEOBJECT_INIT_RIGIDBODY_ADD_CONSTRAINT));
        }

        public static addScriptToEntityObject(entityObject:EntityObject, data:ScriptFileData){
            ScriptEngine.getInstance().addChild(entityObject, data.name, new data.class(entityObject));
        }
    }
}

