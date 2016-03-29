module wd{
    export abstract class SceneComponent extends Component{
        public clone(){
            Log.error(true, Log.info.FUNC_NOT_SUPPORT("clone"));

            return null;
        }

        @require(function(entityObject:EntityObject, isShareComponent:boolean = false){
            assert(entityObject instanceof GameObjectScene, Log.info.FUNC_SHOULD("add to GameObjectScene"));
            assert(!entityObject.hasComponent(this), Log.info.FUNC_SHOULD_NOT("entityObject", "contain more than 1 SceneComponent component"))
        })
        public addToObject(entityObject:EntityObject, isShareComponent:boolean = false){
            super.addToObject(entityObject, isShareComponent);
        }
    }
}
