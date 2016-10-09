module wd{
    export class GameObjectLOD extends LOD{
        public static create() {
            var obj = new this();

            return obj;
        }

        @cloneAttributeAsBasicType()
        public activeGameObject:GameObject = null;
        @cloneAttributeAsBasicType()
        public defaultGameObjectSwitchHandler:Function = (gameObject:GameObject) => {};
        @cloneAttributeAsCustomType(function(source:GameObjectLOD, target:GameObjectLOD, memberName:string){
            source._levelList.forEach((levelData:LevelData) => {
                var gameObjectLevel:ELODState|GameObject = null;

                if(levelData.gameObject === ELODState.INVISIBLE){
                    gameObjectLevel = ELODState.INVISIBLE;
                }
                else{
                    gameObjectLevel = (<GameObject>levelData.gameObject).clone();
                }

                target.addLevel(levelData.distanceBetweenCameraAndObject, gameObjectLevel, levelData.switchHandler);
            });
        })
        private _levelList:wdCb.Collection<LevelData> = wdCb.Collection.create<LevelData>();
        private _lastActiveGameObject:GameObject = null;

        public init(){
            var entityObject = this.entityObject;

            this.activeGameObject = entityObject;

            this._levelList
                .filter(({gameObject, distanceBetweenCameraAndObject}) => {
                    return gameObject !== ELODState.INVISIBLE;
                })
                .forEach(({gameObject, distanceBetweenCameraAndObject}) => {
                    gameObject.isVisible = false;

                    entityObject.addChild(gameObject);
                });

            super.init();
        }

        public addLevel(distanceBetweenCameraAndObject, gameObjectLevel:GameObject|ELODState, switchHandler = (gameObject:GameObject) => {}){
            this._levelList.addChild({
                distanceBetweenCameraAndObject: distanceBetweenCameraAndObject,
                gameObject:gameObjectLevel,
                switchHandler:switchHandler
            });

            this._levelList.sort((levelData1:LevelData, levelData2) => {
                return levelData2.distanceBetweenCameraAndObject - levelData1.distanceBetweenCameraAndObject;
            }, true);
        }

        @ensure(function(){
            it("should only activeGameObject is visible while others is not", () => {
                var activeGameObject = this.activeGameObject;

                if(activeGameObject !== null){
                    expect(activeGameObject.isVisible).true;
                }

                this._levelList.map((levelData:LevelData) => {
                    return levelData.gameObject;
                })
                    .addChild(this.entityObject)
                    .filter((gameObject:GameObject|ELODState) => {
                        return gameObject !== ELODState.INVISIBLE &&  !JudgeUtils.isEqual(gameObject, activeGameObject);
                    })
                    .forEach((gameObject:GameObject) => {
                        expect(gameObject.isVisible).false;
                    });
            });
        })
        public update(elapsed:number):void {
            //todo optimize: only when camera move, then compute lod; reduce compute rate
            var currentDistanceBetweenCameraAndObject:number = Vector3.create().sub2(Director.getInstance().scene.currentCamera.transform.position, this.entityObject.transform.position).length(),
                activeGameObject:any = null,
                switchHandler = null;

            if(this.activeGameObject !== null){
                this.activeGameObject.isVisible = false;
            }

            this._levelList.forEach((levelData:LevelData) => {
                if(currentDistanceBetweenCameraAndObject >= levelData.distanceBetweenCameraAndObject){
                    activeGameObject = levelData.gameObject;
                    switchHandler = levelData.switchHandler;

                    return wdCb.$BREAK;
                }
            });

            if(activeGameObject === ELODState.INVISIBLE){
                this.activeGameObject = null;

                return;
            }

            if(activeGameObject === null){
                this.activeGameObject = this.entityObject;

                this.activeGameObject.isVisible = true;

                if(this._isSwitch()){
                    this.defaultGameObjectSwitchHandler(this.entityObject);
                }
            }
            else{
                this.activeGameObject = activeGameObject;
                this.activeGameObject.isVisible = true;

                if(this._isSwitch()){
                    switchHandler(this.activeGameObject);
                }
            }

            this._lastActiveGameObject = this.activeGameObject;
        }

        private _isSwitch(){
            return !JudgeUtils.isEqual(this.activeGameObject, this._lastActiveGameObject)
        }
    }

    type LevelData = {
        distanceBetweenCameraAndObject:number;
        gameObject:GameObject|ELODState;
        switchHandler:(gameObject:GameObject)=>void;
    }
}
