module wd {
    export class FireProceduralTexture extends ProceduralTexture{
        public static create() {
            var obj = new this();

            return obj;
        }

        private _fireColorMap:wdCb.Hash<Color> = null;
        @requireSetter(function(fireColorMap:wdCb.Hash<Color>){
            assert(fireColorMap.getCount() === 6, Log.info.FUNC_SHOULD("contain 6 colors"));
        })
        @ensureGetter(function(value){
            assert(value.getCount() === 6, Log.info.FUNC_SHOULD("contain 6 colors"));
        })
        get fireColorMap(){
            switch (this.fireColorType){
                case EFireProceduralTextureColorType.CUSTOM:
                    return this._fireColorMap;
                case EFireProceduralTextureColorType.RED:
                    return wdCb.Hash.create<Color>({
                        "c1": Color.create("rgb(0.5, 0.0, 0.1)"),
                        "c2": Color.create("rgb(0.9, 0.0, 0.0)"),
                        "c3": Color.create("rgb(0.2, 0.0, 0.0)"),
                        "c4": Color.create("rgb(1.0, 0.9, 0.0)"),
                        "c5": Color.create("rgb(0.1, 0.1, 0.1)"),
                        "c6": Color.create("rgb(0.9, 0.9, 0.9)")
                    });
                case EFireProceduralTextureColorType.BLUE:
                    return wdCb.Hash.create<Color>({
                        "c1": Color.create("rgb(0.1, 0.0, 0.5)"),
                        "c2": Color.create("rgb(0.0, 0.0, 0.5)"),
                        "c3": Color.create("rgb(0.1, 0.0, 0.2)"),
                        "c4": Color.create("rgb(0.0, 0.0, 1.0)"),
                        "c5": Color.create("rgb(0.1, 0.2, 0.3)"),
                        "c6": Color.create("rgb(0.0, 0.2, 0.9)")
                    });
                case EFireProceduralTextureColorType.PURPLE:
                    return wdCb.Hash.create<Color>({
                        "c1": Color.create("rgb(0.5, 0.0, 1.0)"),
                        "c2": Color.create("rgb(0.9, 0.0, 1.0)"),
                        "c3": Color.create("rgb(0.2, 0.0, 1.0)"),
                        "c4": Color.create("rgb(1.0, 0.9, 1.0)"),
                        "c5": Color.create("rgb(0.1, 0.1, 1.0)"),
                        "c6": Color.create("rgb(0.9, 0.9, 1.0)")
                    });
                case EFireProceduralTextureColorType.GREEN:
                    return wdCb.Hash.create<Color>({
                        "c1": Color.create("rgb(0.5, 1.0, 0.0)"),
                        "c2": Color.create("rgb(0.5, 1.0, 0.0)"),
                        "c3": Color.create("rgb(0.3, 0.4, 0.0)"),
                        "c4": Color.create("rgb(0.5, 1.0, 0.0)"),
                        "c5": Color.create("rgb(0.2, 0.0, 0.0)"),
                        "c6": Color.create("rgb(0.5, 1.0, 0.0)")
                    });
                default:
                    Log.error(true, Log.info.FUNC_UNEXPECT(`fireColorType:${this.fireColorType}`));
                    break;
            }
        }
        set fireColorMap(fireColorMap:wdCb.Hash<Color>){
            this._fireColorMap = fireColorMap;
        }

        public fireColorType:EFireProceduralTextureColorType = EFireProceduralTextureColorType.RED;

        public speed:Vector2 = Vector2.create(0.5, 0.3);
        public alphaThreshold:number = 0.5;
        public shift:number = 1;
        public time:number = 0;

        public init(){
            super.init();

            Director.getInstance().scene.addProceduralRenderTargetRenderer(FireProceduralRenderTargetRenderer.create(this));

            return this;
        }

        public computeTime(){
            this.time += 0.1;
        }
    }

    export enum EFireProceduralTextureColorType{
        CUSTOM,
        RED,
        PURPLE,
        GREEN,
        BLUE
    }
}

