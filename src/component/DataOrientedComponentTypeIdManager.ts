import { ClassUtils } from "../utils/ClassUtils";
import { DataOrientedComponent } from "./DataOrientedComponent";

var _typeId = 1;
const _table = {};

_table["ThreeDTransform"] = generateTypeId();

function generateTypeId() {
    var result = _typeId;

    _typeId += 1;

    return result;
}

export class DataOrientedComponentTypeIdManager {
    public static getTypeIdFromClass(_class: any) {
        return _table[ClassUtils.getClassNameByClass(_class)];
    }

    public static getTypeIdFromComponent(component: DataOrientedComponent) {
        return _table[ClassUtils.getClassNameByInstance(component)];
    }
}
