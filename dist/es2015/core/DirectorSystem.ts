import { IO } from "wonder-fantasy-land/dist/es2015/types/IO";
import { Map } from "immutable";

export var getState = (DirectorData: any) => {
    return DirectorData.state;
}

export var setState = (state: Map<any, any>, DirectorData: any) => {
    return IO.of(() => {
        DirectorData.state = state;
    });
}
