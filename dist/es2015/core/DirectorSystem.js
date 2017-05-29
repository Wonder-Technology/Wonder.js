import { IO } from "wonder-fantasy-land/dist/es2015/types/IO";
export var getState = function (DirectorData) {
    return DirectorData.state;
};
export var setState = function (state, DirectorData) {
    return IO.of(function () {
        DirectorData.state = state;
    });
};
//# sourceMappingURL=DirectorSystem.js.map