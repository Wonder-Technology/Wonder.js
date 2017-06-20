import { IO } from "wonder-fantasy-land/dist/es2015/types/IO";
export var getState = function (StateData) {
    return StateData.state;
};
export var setState = function (state, StateData) {
    return IO.of(function () {
        StateData.state = state;
    });
};
//# sourceMappingURL=StateSytem.js.map