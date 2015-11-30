var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var Test = (function () {
    function Test(gameObject) {
        this.a = null;
        this.b = null;
        this.time = null;
        this.isInit = null;
        this.gameObject = null;
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
    Test = __decorate([
        wd.script("test")
    ], Test);
    return Test;
})();
