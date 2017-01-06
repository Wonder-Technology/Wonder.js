module wd{
    export abstract class LOD extends Component{
        public entityObject:GameObject;

        public abstract addLevel(distanceBetweenCameraAndObject, targetLevel:any, ...args):void;
        public abstract update(elapsed:number):void;

        public addToObject(entityObject:EntityObject, isShareComponent:boolean = false){
            var engine:LODEngine = LODEngine.getInstance();

            super.addToObject(entityObject, isShareComponent);

            if(!engine.hasChild(this)){
                engine.addChild(this);
            }
        }

        public removeFromEngine(){
            LODEngine.getInstance().removeChild(this);
        }
    }
}
