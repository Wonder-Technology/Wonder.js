/// <reference path="../../../../definitions.d.ts"/>
module dy {
    export abstract class FlyCameraControl {
        constructor(cameraComponent:Camera) {
            this.cameraComponent = cameraComponent;
        }

        public moveSpeed:number = 1.2;
        public rotateSpeed:number = 100;

        protected cameraComponent:Camera = null;
        protected keyState:any = {};

        private _rotateX:number = 0;
        private _rotateY:number = 0;
        private _isRotate:boolean = false;
        private _mouseDragSubscription:dyRt.IDisposable = null;
        private _keydownSubscription:dyRt.IDisposable = null;

        public init(gameObject:GameObject) {
            var self = this,
                eulerAngles = gameObject.transform.eulerAngles;

            this._rotateX = eulerAngles.x;
            this._rotateY = eulerAngles.y;

            this._bindCanvasEvent();

            EventManager.on("dy_startLoop", () => {
                self._move(gameObject);

                if (self._isRotate) {
                    gameObject.transform.eulerAngles = Vector3.create(self._rotateX, self._rotateY, 0);
                    self._isRotate = false;
                }

                self.zoom();
            });

            EventManager.on("dy_endLoop", () => {
                self._setAllFalse();
                self._isRotate = false;
            });
        }

        public dispose() {
            this._removeEvent();
        }

        protected abstract zoom();

        private _move(gameObject:GameObject) {
            var speed = this.moveSpeed;

            if (this.keyState["a"]) {
                gameObject.transform.translateLocal(Vector3.create(-speed, 0, 0));
            }
            else if(this.keyState["d"]) {
                gameObject.transform.translateLocal(Vector3.create(speed, 0, 0));
            }
            else if(this.keyState["w"]) {
                gameObject.transform.translateLocal(Vector3.create(0, 0, -speed));
            }
            else if(this.keyState["s"]) {
                gameObject.transform.translateLocal(Vector3.create(0, 0, speed));
            }
        }

        private _bindCanvasEvent() {
            var self = this,
                rotateSpeed = this.rotateSpeed,
                scene = Director.getInstance().scene,
                mouseup = EventManager.fromEvent(scene, EventName.MOUSEUP),
                mousemove = EventManager.fromEvent(scene, EventName.MOUSEMOVE),
                mousedown = EventManager.fromEvent(scene, EventName.MOUSEDOWN),
                mousedrag = null,
                canvas = Director.getInstance().view;

            mousedrag = mousedown.flatMap(function (e) {
                var startX = e.location.x,
                    startY = e.location.y;

                e.stopPropagation();

                return mousemove.map(function (e) {
                    var x = e.location.x,
                        y = e.location.y,
                        dx = null,
                        dy = null,
                        factor = rotateSpeed / canvas.height; // The rotation ratio

//                    e.preventDefault();
                    dx = factor * (x - startX);
                    dy = factor * (y - startY);

                    startX = x;
                    startY = y;

                    self._isRotate = true;

                    return {
                        dx: dx,
                        dy: dy
                    };
                }).takeUntil(mouseup);
            });

            this._mouseDragSubscription = mousedrag.subscribe(function (pos) {
                self._rotateY -= pos.dx;
                self._rotateX -= pos.dy;
            });

            this._keydownSubscription = EventManager.fromEvent(EventName.KEYDOWN)
                .subscribe(function (e) {
                    self._setAllFalse();
                    self.keyState[e.key] = true;
                });
        }

        private _setAllFalse() {
            for (let i in this.keyState) {
                if (this.keyState.hasOwnProperty(i)) {
                    this.keyState[i] = false;
                }
            }
        }

        private _removeEvent() {
            this._mouseDragSubscription.dispose();
            this._keydownSubscription.dispose();
        }
    }
}
