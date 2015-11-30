var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var Test2 = (function () {
    function Test2(gameObject) {
        this.gameObject = null;
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
    Test2 = __decorate([
        wd.script("test2")
    ], Test2);
    return Test2;
})();
