var Scene = (function () {
    function Scene(gameObject) {
        this.state = null;
        this._gameObject = null;
        this._gameObject = gameObject;
    }
    Scene.prototype.init = function () {
        this.state = "init";
    };
    Scene.prototype.update = function (time) {
        this.state = "update";
    };
    Scene.prototype.onEnter = function () {
        this.state = "onEnter";
    };
    Scene.prototype.onStartLoop = function () {
        this.state = "onStartLoop";
    };
    Scene.prototype.onEndLoop = function () {
        this.state = "onEndLoop";
    };
    Scene.prototype.onExit = function () {
        this.state = "onExit";
    };

    return Scene;
})();

wd.Script.addScript("scene", Scene);
