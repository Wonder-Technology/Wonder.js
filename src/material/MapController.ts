module wd{
    export abstract class MapController{
        constructor(material:Material){
            this._material = material;
        }

        private _material:Material = null;

        protected hasMap(source:wdCb.Collection<Texture>, target:Texture){
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
