module wd{
    export abstract class SceneComponent extends Component{
        //todo test
        public clone(){
            Log.error(true, Log.info.FUNC_NOT_SUPPORT("clone"));

            return null;
        }

        @require(function(entityObject:EntityObject, isShareComponent:boolean = false){
            assert(entityObject instanceof GameObjectScene, Log.info.FUNC_SHOULD("add to GameObjectScene"));
        })
        public addToObject(entityObject:EntityObject, isShareComponent:boolean = false){
            super.addToObject(entityObject, isShareComponent);
        }
    }
}
