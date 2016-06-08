module wd{
    export class LOD extends Component{
        public static create() {
            var obj = new this();

            return obj;
        }

        public entityObject:GameObject;

        public activeGeometry:Geometry = null;
        @cloneAttributeAsCustomType(function(source:LOD, target:LOD, memberName:string, isShareGeometry:boolean){
            source.levelList.forEach((levelData:LevelData) => {
                var levelDataGeometry:ELODGeometryState|Geometry = null;

                if(levelData.geometry === ELODGeometryState.INVISIBLE){
                    levelDataGeometry = ELODGeometryState.INVISIBLE;
                }
                else if(isShareGeometry){
                    levelDataGeometry = (<Geometry>levelData.geometry);
                }
                else{
                    levelDataGeometry = (<Geometry>levelData.geometry).clone();
                }

                target.addGeometryLevel(levelData.distanceBetweenCameraAndObject, levelDataGeometry);
            });
        })
        public levelList:wdCb.Collection<LevelData> = wdCb.Collection.create<LevelData>();

        private _originGeometry:Geometry = null;

        public init(){
            var entityObject = this.entityObject;

            this.activeGeometry = entityObject.getComponent<Geometry>(Geometry);

            this._originGeometry = this.activeGeometry;

            this.levelList
                .filter(({geometry, distanceBetweenCameraAndObject}) => {
                    return !!geometry;
                })
                .forEach(({geometry, distanceBetweenCameraAndObject}) => {
                    geometry.entityObject = entityObject;

                    geometry.init();

                    geometry.createBuffersFromGeometryData();
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

        public addGeometryLevel(distanceBetweenCameraAndObject, levelGeometry:Geometry|ELODGeometryState){
            this.levelList.addChild({
                distanceBetweenCameraAndObject: distanceBetweenCameraAndObject,
                geometry:levelGeometry
            });

            this.levelList.sort((levelData1:LevelData, levelData2) => {
                return levelData2.distanceBetweenCameraAndObject - levelData1.distanceBetweenCameraAndObject;
            }, true);
        }

        @require(function(){
            if(InstanceUtils.isHardwareSupport()){
                assert(!InstanceUtils.isObjectInstance(this.entityObject), Log.info.FUNC_SHOULD_NOT("if hardware support instance, object instance", "add lod component"));
            }
        })
        public update(elapsedTime:number):void {
            //todo optimize: only when camera move, then compute lod; reduce compute rate
            var currentDistanceBetweenCameraAndObject:number = Vector3.create().sub2(Director.getInstance().scene.currentCamera.transform.position, this.entityObject.transform.position).length(),
                useOriginGeometry:boolean = true,
                activeGeometry:any = null;

            this.levelList.forEach(({geometry, distanceBetweenCameraAndObject}) => {
                if(currentDistanceBetweenCameraAndObject >= distanceBetweenCameraAndObject){
                    activeGeometry = geometry;
                    useOriginGeometry = false;

                    return wdCb.$BREAK;
                }
            });

            if(activeGeometry === ELODGeometryState.INVISIBLE){
                this.activeGeometry = null;
                this.entityObject.isVisible = false;

                return;
            }

            this.entityObject.isVisible = true;

            if(activeGeometry && !JudgeUtils.isEqual(activeGeometry, this.activeGeometry)){
                this.activeGeometry = activeGeometry;

                EventManager.trigger(this.entityObject, CustomEvent.create(<any>EEngineEvent.COMPONENT_CHANGE));
            }
            else if(useOriginGeometry){
                this.activeGeometry = this._originGeometry;
            }
        }
    }

    export type LevelData = {
        distanceBetweenCameraAndObject:number;
        geometry:Geometry|ELODGeometryState;
    }
}
