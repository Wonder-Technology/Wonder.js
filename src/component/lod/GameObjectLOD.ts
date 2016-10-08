module wd{
    //todo test
    export class GameObjectLOD extends Component{
        public static create() {
            var obj = new this();

            return obj;
        }

        public entityObject:GameObject;

        public activeGameObject:GameObject = null;
        //todo @cloneAttributeAsCustomType?
        @cloneAttributeAsCustomType(function(source:GameObjectLOD, target:GameObjectLOD, memberName:string){
            source._gameObjectLevelList.forEach((levelData:LevelData) => {
                var gameObjectLevel:ELODState|GameObject = null;

                if(levelData.gameObject === ELODState.INVISIBLE){
                    gameObjectLevel = ELODState.INVISIBLE;
                }
                else{
                    gameObjectLevel = (<GameObject>levelData.gameObject).clone();
                }

                target.addLevel(levelData.distanceBetweenCameraAndObject, gameObjectLevel);
            });
        })
        private _gameObjectLevelList:wdCb.Collection<LevelData> = wdCb.Collection.create<LevelData>();

        public init(){
            var entityObject = this.entityObject;

            this.activeGameObject = entityObject;

            this._gameObjectLevelList
                .filter(({gameObject, distanceBetweenCameraAndObject}) => {
                    return gameObject !== ELODState.INVISIBLE;
                })
                .forEach(({gameObject, distanceBetweenCameraAndObject}) => {
                    gameObject.isVisible = false;

                    entityObject.addChild(gameObject);
                });

            super.init();
        }

        public addToObject(entityObject:EntityObject, isShareComponent:boolean = false){
            var engine:LODEngine = LODEngine.getInstance();

            super.addToObject(entityObject, isShareComponent);

            if(!engine.hasChild(this)){
                engine.addChild(this);
            }
        }

        public removeFromObject(entityObject:EntityObject){
            super.removeFromObject(entityObject);

            LODEngine.getInstance().removeChild(this);
        }

        //todo check only addGameObjectLevel or addGameObjectLevel?
        public addLevel(distanceBetweenCameraAndObject, gameObjectLevel:GameObject|ELODState){
            this._gameObjectLevelList.addChild({
                distanceBetweenCameraAndObject: distanceBetweenCameraAndObject,
                gameObject:gameObjectLevel
            });

            this._gameObjectLevelList.sort((levelData1:LevelData, levelData2) => {
                return levelData2.distanceBetweenCameraAndObject - levelData1.distanceBetweenCameraAndObject;
            }, true);
        }

        // @require(function(){
        //     if(InstanceUtils.isHardwareSupport()){
        //         assert(!InstanceUtils.isObjectInstance(this.entityObject), Log.info.FUNC_SHOULD_NOT("if hardware support instance, object instance", "add lod component"));
        //     }
        //todo ensure only activeGameObject is visible, others not visible
        // })
        public update(elapsed:number):void {
            //todo optimize: only when camera move, then compute lod; reduce compute rate
            var currentDistanceBetweenCameraAndObject:number = Vector3.create().sub2(Director.getInstance().scene.currentCamera.transform.position, this.entityObject.transform.position).length(),
                activeGameObject:any = null;

            if(this.activeGameObject !== null){
                this.activeGameObject.isVisible = false;
            }

            this._gameObjectLevelList.forEach(({gameObject, distanceBetweenCameraAndObject}) => {
                if(currentDistanceBetweenCameraAndObject >= distanceBetweenCameraAndObject){
                    activeGameObject = gameObject;

                    return wdCb.$BREAK;
                }
            });

            if(activeGameObject === ELODState.INVISIBLE){
                this.activeGameObject = null;

                return;
            }

            if(activeGameObject === null){
                this.activeGameObject = this.entityObject;
            }
            else{
                this.activeGameObject = activeGameObject;
            }

            this.activeGameObject.isVisible = true;
        }
    }

    type LevelData = {
        distanceBetweenCameraAndObject:number;
        gameObject:GameObject|ELODState;
    }
}
