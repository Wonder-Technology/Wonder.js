/// <reference path="../../../../filePath.d.ts"/>
module dy {
    export class ArcballCameraController extends CameraController {
        public static create(cameraComponent:Camera) {
            var obj = new this(cameraComponent);

            return obj;
        }

        //public moveSpeed:number = 1.2;
        public rotateSpeed:number = 1;
        public distance:number = 10;
        public phi:number = Math.PI / 2;
        public theta:number = Math.PI / 2;
        public target:Vector3 = Vector3.create(0, 0, 0);
        public thetaMargin = 0.05;
        public minDistance:number = 0;

        protected cameraComponent:Camera = null;

        private _mouseDragSubscription:dyRt.IDisposable = null;
        private _mouseWheelSubscription:dyRt.IDisposable = null;

        public init() {
            super.init();

            this._bindCanvasEvent();
        }

        public update(time:number) {
            /*
             X= r*cos(phi)*sin(theta);
             Z= r*sin(phi)*sin(theta);
             Y= r*cos(theta);
             */

            var x = null,
                y = null,
                z = null;

            super.update(time);

            x = ((this.distance) * Math.cos(this.phi) * Math.sin(this.theta) + this.target.x);
            z = ((this.distance) * Math.sin(this.phi) * Math.sin(this.theta) + this.target.z);
            y = ((this.distance) * Math.cos(this.theta) + this.target.y);

            this.gameObject.transform.position = Vector3.create(x, y, z);
            this.gameObject.transform.lookAt(this.target);
        }

        public dispose() {
            super.dispose();

            this._removeEvent();
        }

        //todo treat picked item as the target
        private _bindCanvasEvent() {
            var self = this,
                scene = Director.getInstance().scene,
                mouseup = EventManager.fromEvent(scene, EventName.MOUSEUP),
                mousemove = EventManager.fromEvent(scene, EventName.MOUSEMOVE),
                mousedown = EventManager.fromEvent(scene, EventName.MOUSEDOWN),
                mousewheel = EventManager.fromEvent(scene, EventName.MOUSEWHEEL),
                mousedrag = null;

            mousedrag = mousedown.flatMap(function (e) {
                e.stopPropagation();

                return mousemove.takeUntil(mouseup);
            });

            this._mouseDragSubscription = mousedrag.subscribe(function (e) {
                self._changeOrbit(e);
            });

            this._mouseWheelSubscription = mousewheel.subscribe((e:any) => {
                self.distance -= e.wheel;
                self._contrainDistance();
            });
        }

        private _changeOrbit(e:MouseEvent) {
            var movementDelta = e.movementDelta;

            this.phi += movementDelta.x / (100 / this.rotateSpeed);
            this.theta -= movementDelta.y / (100 / this.rotateSpeed);

            this._contrainTheta();
        }

        private _contrainDistance() {
            this.distance = MathUtils.bigThan(this.distance, this.minDistance);
        }

        private _contrainTheta() {
            this.theta = MathUtils.clamp(this.theta, this.thetaMargin, Math.PI - this.thetaMargin);
        }

        private _removeEvent() {
            this._mouseDragSubscription.dispose();
            this._mouseWheelSubscription.dispose();
        }
    }
}
