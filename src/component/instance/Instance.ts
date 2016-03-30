module wd{
    export abstract class Instance extends Component{
        public entityObject:GameObject;

        public toRenderInstanceListForDraw:wdCb.Collection<GameObject> = ABSTRACT_ATTRIBUTE;
        public instanceBuffer:InstanceBuffer = ABSTRACT_ATTRIBUTE;

        @require(function(entityObject:GameObject){
            assert(entityObject instanceof GameObject, Log.info.FUNC_SHOULD("Instance component", "add to GameObject"));
        })
        public addToObject(entityObject:GameObject, isShareComponent:boolean = false){
            super.addToObject(entityObject, isShareComponent);
        }
    }
}

