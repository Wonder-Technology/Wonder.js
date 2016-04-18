module wd{
    export class GlobalScriptUtils{
        public static handlerAfterLoadedScript(entityObject:EntityObject){
            entityObject.execScript("onEnter", null, true);

            EventManager.trigger(CustomEvent.create(<any>EEngineEvent.BEFORE_GAMEOBJECT_INIT));

            entityObject.execScript("init", null, true);

            EventManager.trigger(CustomEvent.create(<any>EEngineEvent.AFTER_GAMEOBJECT_INIT));

            EventManager.trigger(CustomEvent.create(<any>EEngineEvent.AFTER_GAMEOBJECT_INIT_RIGIDBODY_ADD_CONSTRAINT));
        }

        public static addScriptToEntityObject(entityObject:EntityObject, data:ScriptFileData){
            entityObject.scriptList.addChild(data.name, new data.class(entityObject));
        }
    }
}

