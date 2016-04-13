module wd{
    export abstract class MapController{
        public abstract removeChild(map:Texture):void;
        public abstract removeAllChildren():void;
        public abstract getAllMapArr():Array<Texture>;

        protected hasMapHelper(source:wdCb.Collection<Texture>, target:Texture){
            if(!source){
                return false;
            }

            return source.hasChild(target);
        }

        protected setMapOption(map:Texture, option:MapVariableData){
            map.variableData = option;
        }
    }
}
