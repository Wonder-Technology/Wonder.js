module wd {
    export abstract class CameraController extends Component {
        constructor(cameraComponent:Camera){
            super();

            this.camera = cameraComponent;
        }

        get cameraToWorldMatrix(){
            return this.camera.cameraToWorldMatrix;
        }

        @cacheGetter(function(){
            return this._worldToCameraMatrixCache !== null;
        }, function(){
            return this._worldToCameraMatrixCache;
        }, function(result){
            this._worldToCameraMatrixCache = result;
        })
        get worldToCameraMatrix(){
            return this._getWorldToCameraMatrix();
        }
        set worldToCameraMatrix(matrix:Matrix4){
            this.camera.worldToCameraMatrix = matrix;
        }

        get pMatrix(){
            return this.camera.pMatrix;
        }
        set pMatrix(pMatrix:Matrix4){
            this.camera.pMatrix = pMatrix;
        }


        public entityObject:GameObject;
        @cloneAttributeAsCloneable()
        public camera:Camera = null;

        private _worldToCameraMatrixCache:Matrix4 = null;
        private _clearCacheSubscription:wdFrp.IDisposable = null;

        public init() {
            var self = this;

            this.camera.entityObject = <GameObject>this.entityObject;
            this.camera.init();

            this._clearCacheSubscription = wdFrp.fromArray([
                    EventManager.fromEvent(<any>EEngineEvent.ENDLOOP),
                    EventManager.fromEvent(this.entityObject, <any>EEngineEvent.TRANSFORM_TRANSLATE),
                    EventManager.fromEvent(this.entityObject, <any>EEngineEvent.TRANSFORM_ROTATE),
                    EventManager.fromEvent(this.entityObject, <any>EEngineEvent.TRANSFORM_SCALE)
                ])
                .mergeAll()
                .subscribe(() => {
                    self._clearCache();
                });
        }

        public update(elapsedTime:number){
            this.camera.update(elapsedTime);
        }

        public dispose(){
            this.camera.dispose();

            this._clearCacheSubscription && this._clearCacheSubscription.dispose();
        }

        public clone(){
            return CloneHelper.clone(this);
        }

        public isIntersectWithRay(entityObject:GameObject, screenX:number, screenY:number):boolean{
            var shape = null;

            if(!entityObject.hasComponent(Collider)){
                return false;
            }

            shape = entityObject.getComponent<Collider>(Collider).shape;

            return shape.isIntersectWithRay(this.createRay(screenX, screenY));
        }

        public createRay(screenX:number, screenY:number){
            var from = this.convertScreenToWorld(screenX, screenY, this.camera.near),
                to = this.convertScreenToWorld(screenX, screenY, this.camera.far);

            return Ray.create(from, to.sub(from));
        }

        public convertScreenToWorld(screenX:number, screenY:number, distanceFromCamera:number):Vector3{
            return this.camera.convertScreenToWorld(screenX, screenY, distanceFromCamera);
        }

        public getPlanes():Array<Plane> {
            var frustumPlanes = [],
                transform = this.worldToCameraMatrix.applyMatrix(this.pMatrix, true);

            for (var index = 0; index < 6; index++) {
                frustumPlanes.push(Plane.create(0, 0, 0, 0));
            }

            this._setPlanes(transform, frustumPlanes);

            return frustumPlanes;
        }

        private _setPlanes(transform:Matrix4, frustumPlanes: Array<Plane>): void {
            /*!
             refer to http://gamedevs.org/uploads/fast-extraction-viewing-frustum-planes-from-world-view-projection-matrix.pdf
             */

            // Near
            frustumPlanes[0].normal.x = transform.values[3] + transform.values[2];
            frustumPlanes[0].normal.y = transform.values[7] + transform.values[6];
            frustumPlanes[0].normal.z = transform.values[11] + transform.values[10];
            frustumPlanes[0].d = transform.values[15] + transform.values[14];
            frustumPlanes[0].normalize();

            // Far
            frustumPlanes[1].normal.x = transform.values[3] - transform.values[2];
            frustumPlanes[1].normal.y = transform.values[7] - transform.values[6];
            frustumPlanes[1].normal.z = transform.values[11] - transform.values[10];
            frustumPlanes[1].d = transform.values[15] - transform.values[14];
            frustumPlanes[1].normalize();

            // Left
            frustumPlanes[2].normal.x = transform.values[3] + transform.values[0];
            frustumPlanes[2].normal.y = transform.values[7] + transform.values[4];
            frustumPlanes[2].normal.z = transform.values[11] + transform.values[8];
            frustumPlanes[2].d = transform.values[15] + transform.values[12];
            frustumPlanes[2].normalize();

            // Right
            frustumPlanes[3].normal.x = transform.values[3] - transform.values[0];
            frustumPlanes[3].normal.y = transform.values[7] - transform.values[4];
            frustumPlanes[3].normal.z = transform.values[11] - transform.values[8];
            frustumPlanes[3].d = transform.values[15] - transform.values[12];
            frustumPlanes[3].normalize();

            // Top
            frustumPlanes[4].normal.x = transform.values[3] - transform.values[1];
            frustumPlanes[4].normal.y = transform.values[7] - transform.values[5];
            frustumPlanes[4].normal.z = transform.values[11] - transform.values[9];
            frustumPlanes[4].d = transform.values[15] - transform.values[13];
            frustumPlanes[4].normalize();

            // Bottom
            frustumPlanes[5].normal.x = transform.values[3] + transform.values[1];
            frustumPlanes[5].normal.y = transform.values[7] + transform.values[5];
            frustumPlanes[5].normal.z = transform.values[11] + transform.values[9];
            frustumPlanes[5].d = transform.values[15] + transform.values[13];
            frustumPlanes[5].normalize();
        }

        private _clearCache(){
            this._worldToCameraMatrixCache = null;
        }

        private _getWorldToCameraMatrix(){
            return this.camera.worldToCameraMatrix;
        }
    }
}
