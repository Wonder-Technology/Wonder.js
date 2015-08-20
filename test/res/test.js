dy.Script.create("test", function (director) {
    function Test(gameObject) {
        this.a = 0;
        this.b = 0;
        this.time = null;
        this.isInit = false;
        gameObject.a = 100;
        this.gameObject = gameObject;
    }

    Test.prototype.init = function () {
        this.isInit = true;
    };
    Test.prototype.update = function (time) {
        this.time = time;
        this.gameObject.a++;
    };

    Test.prototype.onEnter = function () {
        this.a++;
    };
    Test.prototype.onStartLoop = function () {
        this.b++;
    };
    Test.prototype.onEndLoop = function () {
        this.b -= 2;
    };
    Test.prototype.onExit = function () {
        this.a--;
    };

    return Test;
});
