module wd{
    export class GeometryLOD extends LOD{
        public static create() {
            var obj = new this();

            return obj;
        }

        public activeGeometry:Geometry = null;
        @cloneAttributeAsCustomType(function(source:GeometryLOD, target:GeometryLOD, memberName:string, isShareGeometry:boolean){
            source._levelList.forEach((levelData:LevelData) => {
                var levelDataGeometry:ELODState|Geometry = null;

                if(levelData.geometry === ELODState.INVISIBLE){
                    levelDataGeometry = ELODState.INVISIBLE;
                }
                else if(isShareGeometry){
                    levelDataGeometry = (<Geometry>levelData.geometry);
                }
                else{
                    levelDataGeometry = (<Geometry>levelData.geometry).clone();
                }

                target.addLevel(levelData.distanceBetweenCameraAndObject, levelDataGeometry);
            });
        })
        private _levelList:wdCb.Collection<LevelData> = wdCb.Collection.create<LevelData>();

        private _originGeometry:Geometry = null;

        public init(){
            var entityObject = this.entityObject;

            this.activeGeometry = entityObject.getComponent<Geometry>(Geometry);

            this._originGeometry = this.activeGeometry;

            this._levelList
                .filter(({geometry, distanceBetweenCameraAndObject}) => {
                    return geometry !== ELODState.INVISIBLE;
                })
                .forEach(({geometry, distanceBetweenCameraAndObject}) => {
                    geometry.entityObject = entityObject;

                    geometry.init();

                    geometry.createBuffersFromGeometryData();
                });

            super.init();
        }

        public addLevel(distanceBetweenCameraAndObject, geometryLevel:Geometry|ELODState){
            this._levelList.addChild({
                distanceBetweenCameraAndObject: distanceBetweenCameraAndObject,
                geometry:geometryLevel
            });

            this._levelList.sort((levelData1:LevelData, levelData2) => {
                return levelData2.distanceBetweenCameraAndObject - levelData1.distanceBetweenCameraAndObject;
            }, true);
        }

        @require(function(){
            if(InstanceUtils.isHardwareSupport()){
                assert(!InstanceUtils.isObjectInstance(this.entityObject), Log.info.FUNC_SHOULD_NOT("if hardware support instance, object instance", "add lod component"));
            }
        })
        public update(elapsed:number):void {
            //todo optimize: only when camera move, then compute lod; reduce compute rate
            var currentDistanceBetweenCameraAndObject:number = Vector3.create().sub2(Director.getInstance().scene.currentCamera.transform.position, this.entityObject.transform.position).length(),
                useOriginGeometry:boolean = true,
                activeGeometry:any = null;

            this._levelList.forEach(({geometry, distanceBetweenCameraAndObject}) => {
                if(currentDistanceBetweenCameraAndObject >= distanceBetweenCameraAndObject){
                    activeGeometry = geometry;
                    useOriginGeometry = false;

                    return wdCb.$BREAK;
                }
            });

            if(activeGeometry === ELODState.INVISIBLE){
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
        geometry:Geometry|ELODState;
    }
}
