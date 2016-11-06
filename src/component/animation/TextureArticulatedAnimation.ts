module wd{
    export class TextureArticulatedAnimation extends ArticulatedAnimation{
        public static create() {
            var obj = new this();

            return obj;
        }

        @require(function(target:TextureArticulatedAnimationFrameTargetData, startFrameData:Array<number>, endFrameData:Array<number>, interpolation:number){
            it("texture animation->interpolationMethod should be SWITCH", () => {
                expect(target.interpolationMethod).equals(EKeyFrameInterpolation.SWITCH);
            });
        })
        protected updateTarget(target:TextureArticulatedAnimationFrameTargetData, startFrameData:Array<number>, endFrameData:Array<number>, interpolation:number){
            var transform = this.entityObject.transform;

            switch (target.target){
                case EArticulatedAnimationTarget.TEXTURE_OFFSET:
                    this._updateTextureData(target, startFrameData, endFrameData, interpolation);
                    break;
                default:
                    // Log.error(true, Log.info.FUNC_NOT_SUPPORT(`EArticulatedAnimationTarget:${target.target}`));
                    break;
            }
        }

        @require(function(target:TextureArticulatedAnimationFrameTargetData, startFrameData:Array<number>, endFrameData:Array<number>, interpolation:number){
            it("material should has the corresponding animated texture", () => {
                expect(this.entityObject.getGeometry().material[target.extra.target]).exist;
            }, this);
            it("this animated texture should has 'sourceRegion' attribute", () => {
                expect(this.entityObject.getGeometry().material[target.extra.target].sourceRegion).not.be.a("undefined");
            }, this);
        })
        private _updateTextureData(target:TextureArticulatedAnimationFrameTargetData, startFrameData:Array<number>, endFrameData:Array<number>, interpolation:number){
            var material:Material = this.entityObject.getComponent<Geometry>(Geometry).material,
                mapName:string = target.extra.target,
                map:BasicTexture = material[mapName];

            if(!!map){
                //todo optimize:use temp RectRegion
                map.sourceRegion = RectRegion.create(startFrameData[0], startFrameData[1], startFrameData[2], startFrameData[3]);
            }
        }
    }

    export type TextureArticulatedAnimationFrameTargetData = {
        interpolationMethod:EKeyFrameInterpolation,
        target:EArticulatedAnimationTarget,
        data:Array<number>,
        extra:{
            target:string
        }
    }
}

