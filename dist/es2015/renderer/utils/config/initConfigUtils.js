import { IO } from "wonder-fantasy-land/dist/es2015/types/IO";
export var getIsTest = function (InitConfigDataFromSystem) {
    return InitConfigDataFromSystem.isTest;
};
export var setIsTest = function (isTest, InitConfigDataFromSystem) {
    return IO.of(function () {
        InitConfigDataFromSystem.isTest = isTest;
    });
};
//# sourceMappingURL=initConfigUtils.js.map