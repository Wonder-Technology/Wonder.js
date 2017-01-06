module wd{
    export type MorphTargetsData = wdCb.Collection<Array<number>>

    export type KeyFrameObjectAnimationData = {
        entity:IWDObjectDataAssembler;
        animationData:IWDKeyFrameAnimationAssembler;
    }

    export type KeyFrameNodeAnimationData = {
        entity:IWDNodeParser;
        animationData:IWDKeyFrameAnimationAssembler;
    }

    export type KeyFrameAnimationFrameData = {
        time:number,

        targets:wdCb.Collection<KeyFrameAnimationFrameTargetData>
    }

    export type KeyFrameAnimationFrameTargetData = {
        interpolationMethod:EKeyFrameInterpolation,
        target:EKeyFrameAnimationTarget,
        data:any,
        extra?:any
    }

    export type SkinSkeletonAnimationData = wdCb.Hash<wdCb.Hash<wdCb.Collection<KeyFrameAnimationFrameData>>>
}

