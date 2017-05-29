import { GameObject } from "../../core/entityObject/gameObject/GameObject";
import curry from "wonder-lodash/curry";
import { Map } from "immutable";

export var sortRenderCommands = curry((state: Map<any, any>, renderCommandArray: Array<GameObject>) => {
    //todo sort

    return renderCommandArray;
})