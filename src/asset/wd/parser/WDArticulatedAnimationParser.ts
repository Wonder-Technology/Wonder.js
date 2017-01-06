module wd{
    export class WDArticulatedAnimationParser extends WDComponentParser{
        public static create() {
            var obj = new this();

            return obj;
        }

        public parse(objectWithAnimationMap:wdCb.Hash<KeyFrameObjectAnimationData>):void{
            this._addAnimationComponent(objectWithAnimationMap);
        }

        @ensure(function(returnVal, objectWithAnimationMap:wdCb.Hash<KeyFrameObjectAnimationData>){
            it("node should only has 1 IWDKeyFrameAnimation component", () => {
                objectWithAnimationMap.forEach(({entity, animationData}) => {
                    expect(entity.components.filter((component:IWDComponentAssembler) => {
                        return WDUtils.isIWDKeyFrameAnimationAssembler(component);
                    }).getCount()).most(1);
                })
            });
        })
        private _addAnimationComponent(objectWithAnimationMap:wdCb.Hash<KeyFrameObjectAnimationData>){
            objectWithAnimationMap.forEach((data:KeyFrameObjectAnimationData) => {
                var node = data.entity,
                    animationData = data.animationData;

                node.components.addChild(animationData);

                delete data.animationData;
            });
        }
    }
}
