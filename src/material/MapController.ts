module wd{
    export abstract class MapController{
        constructor(material:Material){
            this._material = material;
        }

        private _material:Material = null;

        public abstract removeAllChildren():void;
        public abstract getAllMapArr():Array<Texture>;

        protected hasMapHelper(source:wdCb.Collection<Texture>, target:Texture){
            if(!source){
                return false;
            }

            return source.hasChild(target);
        }

        protected setMapMaterial(map:Texture){
            map.material = this._material;
        }

        protected setMapOption(map:Texture, option:MapVariableData){
            map.variableData = option;
        }
    }
}
