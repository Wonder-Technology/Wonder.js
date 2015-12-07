/// <reference path="../../filePath.d.ts"/>
module wd {
    export abstract class Collider extends Component {
        public type:string = ABSTRACT_ATTRIBUTE;

        public boundingRegion:BoundingRegion = null;

        public abstract createBoundingRegion();
        public abstract buildBoundingRegion();
        public abstract isIntersectWith(collider:Collider);

        public init(){
            this.boundingRegion = this.createBoundingRegion();
            this.boundingRegion.init();

            this.buildBoundingRegion();
        }

        public update(time:number){
            this.boundingRegion.update();
        }

        public getCollideObjects(checkTargetList:wdCb.Collection<GameObject>):wdCb.Collection<GameObject>{
            var self = this,
                result = wdCb.Collection.create<GameObject>();

            checkTargetList.forEach((gameObject) => {
                if(self._isSelf(gameObject)){
                    return;
                }

                if(self.isIntersectWith(gameObject.getComponent(Collider))){
                    result.addChild(gameObject);
                }
            });

            return result;
        }

        private _isSelf(gameObject:GameObject){
            return this.gameObject.uid === gameObject.uid;
        }
    }
}

