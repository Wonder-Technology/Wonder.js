var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/// <reference path="../../../../../dist/wd.d.ts"/>
var sample;
(function (sample) {
    var UserBox = (function () {
        function UserBox(gameObject) {
            this._gameObject = null;
            this._collidingMaterial = null;
            this._originMaterial = null;
            this._gameObject = gameObject;
        }
        UserBox.prototype.init = function () {
            var gameObject = this._gameObject;
            this._collidingMaterial = wd.BasicMaterial.create();
            this._collidingMaterial.color = wd.Color.create("rgb(255,0,0)");
            this._collidingMaterial.init();
            this._originMaterial = this._gameObject.getComponent(wd.Geometry).material;
            var self = this;
            wd.EventManager.fromEvent(wd.EventName.KEYDOWN)
                .subscribe(function (e) {
                var keyState = e.keyState, x = 0, z = 0, moveSpeedX = 10, moveSpeedZ = 10;
                if (keyState["a"]) {
                    x = -moveSpeedX;
                }
                else if (keyState["d"]) {
                    x = moveSpeedX;
                }
                else if (keyState["w"]) {
                    z = -moveSpeedZ;
                }
                else if (keyState["s"]) {
                    z = moveSpeedZ;
                }
                gameObject.transform.translate(x, 0, z);
            });
        };
        UserBox.prototype.onContact = function (collisionObjects) {
            console.log("contact", collisionObjects);
        };
        UserBox.prototype.onCollisionStart = function (collisionObjects) {
            console.log("collision start", collisionObjects);
            var geometry = this._gameObject.getComponent(wd.Geometry);
            geometry.material = this._collidingMaterial;
        };
        UserBox.prototype.onCollisionEnd = function () {
            console.log("collision end");
            var geometry = this._gameObject.getComponent(wd.Geometry);
            geometry.material = this._originMaterial;
        };
        UserBox = __decorate([
            wd.script("userBox")
        ], UserBox);
        return UserBox;
    })();
    sample.UserBox = UserBox;
})(sample || (sample = {}));
