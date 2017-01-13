module wd{
    export abstract class LOD extends Component{
        public entityObject:GameObject;

        public abstract addLevel(distanceBetweenCameraAndObject, targetLevel:any, ...args):void;
        public abstract update(elapsed:number):void;

        public addToComponentContainer(){
            var container:LODComponentContainer = LODComponentContainer.getInstance();

            if(!container.hasChild(this)){
                container.addChild(this);
            }
        }

        public removeFromComponentContainer(){
            LODComponentContainer.getInstance().removeChild(this);
        }
    }
}
