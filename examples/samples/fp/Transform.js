import { setPosition } from "./TransformSystem";
var Transform = (function () {
    function Transform() {
        this.indexInArrayBuffer = generateIndex();
        this._children = [];
    }
    Transform.of = function () {
        return new this();
    };
    Transform.prototype.setPosition = function (position) {
        setPosition(this, position);
    };
    Transform.prototype.add = function (tra) {
        this._children.push(tra);
    };
    return Transform;
}());
export { Transform };
var seed = 0;
var generateIndex = function () {
    var result = seed;
    seed += 1;
    return result;
};
//# sourceMappingURL=Transform.js.map