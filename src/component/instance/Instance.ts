module wd{
    export abstract class Instance extends Component{
        public entityObject:GameObject;

        @require(function(entityObject:GameObject){
            assert(entityObject instanceof GameObject, Log.info.FUNC_SHOULD("Instance component", "add to GameObject"));
        })
        public addToObject(entityObject:GameObject, isShareComponent:boolean = false){
            super.addToObject(entityObject, isShareComponent);
        }

        public clone(){
            return CloneUtils.clone(this);
        }
    }
}

