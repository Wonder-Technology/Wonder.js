import { CustomGeometry } from "./CustomGeometry";
import { create as createGeometry } from "./GeometrySystem";
export var create = function (GeometryData) {
    return createGeometry(new CustomGeometry(), GeometryData);
};
//# sourceMappingURL=CustomGeometrySystem.js.map