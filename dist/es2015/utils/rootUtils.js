import { root } from "../definition/Variable";
import { IO } from "wonder-fantasy-land/dist/es2015/types/IO";
export var getRootProperty = function (propertyName) {
    return IO.of(function () {
        return root[propertyName];
    });
};
//# sourceMappingURL=rootUtils.js.map