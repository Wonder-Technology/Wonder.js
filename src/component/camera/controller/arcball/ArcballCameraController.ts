/// <reference path="../../../../filePath.d.ts"/>
module wd {
    declare var Math:any;

    export class ArcballCameraController extends CameraController {
        public static create(cameraComponent:Camera) {
            var obj = new this(cameraComponent);

            return obj;
        }

        public moveSpeedX:number = 1;
        public moveSpeedY:number = 1;
        public rotateSpeed:number = 1;
        public distance:number = 10;
        public phi:number = Math.PI / 2;
        public theta:number = Math.PI / 2;
        public target:Vector3 = Vector3.create(0, 0, 0);
        public thetaMargin = 0.05;
        public minDistance:number = 0.05;

        private _isChange:boolean = true;
        private _mouseDragSubscription:wdFrp.IDisposable = null;
        private _mouseWheelSubscription:wdFrp.IDisposable = null;
        private _keydownSubscription:wdFrp.IDisposable = null;

        public init() {
            super.init();

            this._bindCanvasEvent();
        }

        public update(elapsedTime:number) {
            /*!
             X= r*cos(phi)*sin(theta);
             Z= r*sin(phi)*sin(theta);
             Y= r*cos(theta);
             */
            var x = null,
                y = null,
                z = null;

            super.update(elapsedTime);

            if(!this._isChange){
                return;
            }

            this._isChange = false;

            x = ((this.distance) * Math.cos(this.phi) * Math.sin(this.theta) + this.target.x);
            z = ((this.distance) * Math.sin(this.phi) * Math.sin(this.theta) + this.target.z);
            y = ((this.distance) * Math.cos(this.theta) + this.target.y);

            this.entityObject.transform.position = Vector3.create(x, y, z);
            this.entityObject.transform.lookAt(this.target);
        }

        public dispose() {
            super.dispose();

            this._removeEvent();
        }

        //todo treat picked item as the target
        private _bindCanvasEvent() {
            var self = this,
                mouseup = EventManager.fromEvent(EventName.MOUSEUP),
                mousemove = EventManager.fromEvent(EventName.MOUSEMOVE),
                mousedown = EventManager.fromEvent(EventName.MOUSEDOWN),
                mousewheel = EventManager.fromEvent(EventName.MOUSEWHEEL),
                keydown = EventManager.fromEvent(EventName.KEYDOWN),
                mousedrag = null;

            mousedrag = mousedown.flatMap(function (e) {
                e.stopPropagation();

                return mousemove.takeUntil(mouseup);
            });

            this._mouseDragSubscription = mousedrag.subscribe(function (e) {
                self._changeOrbit(e);
            });

            this._mouseWheelSubscription = mousewheel.subscribe((e:MouseEvent) => {
                e.preventDefault();

                self._changeDistance(e);
            });

            this._keydownSubscription = keydown.subscribe(function (e) {
                self._changeTarget(e);
            });
        }

        private _changeOrbit(e:MouseEvent) {
            var movementDelta = e.movementDelta;

            this._isChange = true;

            this.phi += movementDelta.x / (100 / this.rotateSpeed);
            this.theta -= movementDelta.y / (100 / this.rotateSpeed);

            this._contrainTheta();
        }

        private _changeTarget(e:KeyboardEvent){
            var moveSpeedX = this.moveSpeedX,
                moveSpeedY = this.moveSpeedY,
                dx = null,
                dy = null,
                keyState = e.keyState,
                transform = this.entityObject.transform;

            this._isChange = true;

            if (keyState["a"] || keyState["left"]) {
                dx = -moveSpeedX;
            }
            else if(keyState["d"] || keyState["right"]) {
                dx = moveSpeedX;
            }
            else if(keyState["w"] || keyState["up"]) {
                dy = moveSpeedY;
            }
            else if(keyState["s"] || keyState["down"]) {
                dy = -moveSpeedY;
            }

            this.target.add(Vector3.create(transform.right.x * (dx), 0, transform.right.z * (dx)));
            this.target.add(Vector3.create(transform.up.x * dy, transform.up.y * dy, 0));
        }

        private _changeDistance(e:MouseEvent){
            this._isChange = true;

            this.distance -= e.wheel;
            this._contrainDistance();
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
            this._keydownSubscription.dispose();
        }
    }
}
