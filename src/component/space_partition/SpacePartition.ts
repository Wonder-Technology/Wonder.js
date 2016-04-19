module wd {
    export abstract class SpacePartition extends Component{
        @cloneAttributeAsBasicType()
        public isCollideEnable:boolean = true;

        public abstract build():void;
        public abstract getRenderListByFrustumCull():wdCb.Collection<GameObject>;
        public abstract getIntersectListWithRay(e:MouseEvent):wdCb.Collection<GameObject>;
        public abstract getCollideObjects(shape:Shape):wdCb.Collection<GameObject>;
        public abstract getChildren():wdCb.Collection<GameObject>;
    }
}
