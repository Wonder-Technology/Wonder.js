module wd {
    export abstract class SpacePartition extends Component {
        @cloneAttributeAsBasicType()
        public isCollideEnable:boolean = true;

        public abstract build():void;

        public abstract getRenderListByFrustumCull():wdCb.Collection<GameObject>;

        public abstract getRenderList():wdCb.Collection<GameObject>;

        public abstract getIntersectListWithRay(e:PointEvent):wdCb.Collection<GameObject>;

        public abstract getCollideObjects(shape:Shape):wdCb.Collection<GameObject>;

        public abstract getChildren():wdCb.Collection<GameObject>;

        public abstract update(elapsed:number):void;

        @require(function(){
            it("SpacePartition component should add to GameObject", () => {
                expect(this.entityObject).instanceOf(GameObject);
            }, this);
        })
        public addToComponentContainer(){
            var container:SpacePartitionComponentContainer = SpacePartitionComponentContainer.getInstance();

            if(!container.hasChild(this)){
                container.addChild(this);
            }
        }

        public removeFromComponentContainer(){
            SpacePartitionComponentContainer.getInstance().removeChild(this);
        }
    }
}
