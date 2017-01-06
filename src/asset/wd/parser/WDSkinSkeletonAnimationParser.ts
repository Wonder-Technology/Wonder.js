module wd{
    declare var ArrayBuffer:any;

    export class WDSkinSkeletonAnimationParser extends WDComponentParser{
        public static create() {
            var obj = new this();

            return obj;
        }

        public parse(json:IWDJsonDataParser, nodeWithAnimationMap:wdCb.Hash<KeyFrameNodeAnimationData>, jointNames:Array<string>){
                var jointTransformData:SkinSkeletonAnimationData = wdCb.Hash.create<SkinSkeletonJointAnimationData>();

                for(let jointName of jointNames){
                    let data = nodeWithAnimationMap.getChild(jointName),
                        animationData:SkinSkeletonJointAnimationData = null;

                    if(!data){
                        continue;
                    }

                    for(let animName in data.animationData){
                        if(data.animationData.hasOwnProperty(animName)){
                            let oneAnimData = data.animationData[animName];

                            if(jointTransformData.hasChild(animName)){
                                animationData = jointTransformData.getChild(animName);
                            }
                            else{
                                animationData = wdCb.Hash.create<wdCb.Collection<IWDKeyFrameDataAssembler>>();

                                jointTransformData.addChild(animName, animationData);
                            }

                            animationData.addChild(jointName, oneAnimData);
                        }
                    }

                }

            return jointTransformData;
        }
    }

    type SkinSkeletonJointAnimationData = wdCb.Hash<wdCb.Collection<KeyFrameAnimationFrameData>>
}
