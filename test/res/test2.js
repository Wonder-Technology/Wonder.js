dy.Script.create("test2", function () {
    function Test2(gameObject) {
        this.gameObject = gameObject;
    }

    Test2.prototype.init = function () {
    };
    Test2.prototype.update = function (time) {
        this.gameObject.script.getChild("test").update(time);
    };
    Test2.prototype.onEnter = function () {
    };
    Test2.prototype.onStartLoop = function () {
    };
    Test2.prototype.onEndLoop = function () {
    };
    Test2.prototype.onExit = function () {
    };

    return Test2;
});
