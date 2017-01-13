module wd{
    export abstract class LOD extends Component{
        public entityObject:GameObject;

        public abstract addLevel(distanceBetweenCameraAndObject, targetLevel:any, ...args):void;
        public abstract update(elapsed:number):void;

        public addToObject(entityObject:EntityObject, isShareComponent:boolean = false){
            var container:LODComponentContainer = LODComponentContainer.getInstance();

            super.addToObject(entityObject, isShareComponent);

            if(!container.hasChild(this)){
                container.addChild(this);
            }
        }

        public removeFromComponentContainer(){
            LODComponentContainer.getInstance().removeChild(this);
        }
    }
}
