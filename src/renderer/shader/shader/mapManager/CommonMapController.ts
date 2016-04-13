module wd{
    export class CommonMapController extends MapController{
        public static create() {
            var obj = new this();

            return obj;
        }

        public material:Material = null;

        private _list:wdCb.Collection<Texture> = wdCb.Collection.create<Texture>();

        public addMap(map:Texture);
        public addMap(map:Texture, option:MapVariableData);

        public addMap(...args){
            var map:Texture = args[0];

            if(args.length === 2){
                let option = args[1];

                this.setMapOption(map, option);
            }

            map.material = this.material;

            this._list.addChild(map);
        }

        public getAllMapArr(){
            return this._list.toArray();
        }

        public getMapList():wdCb.Collection<BasicTexture|ProceduralTexture>{
            return <wdCb.Collection<BasicTexture|ProceduralTexture>>this._list.filter((map:Texture) => {
                return map instanceof BasicTexture || map instanceof ProceduralTexture;
            });
        }

        public hasMap(map:Texture){
            return this.hasMapHelper(this._list, map);
        }

        public removeChild(map:Texture){
            this._list.removeChild(map);
        }

        public removeAllChildren(){
            this._list.removeAllChildren();
        }
    }
}

