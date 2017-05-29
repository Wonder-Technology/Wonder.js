"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CustomGeometry_1 = require("./CustomGeometry");
var GeometrySystem_1 = require("./GeometrySystem");
exports.create = function (GeometryData) {
    return GeometrySystem_1.create(new CustomGeometry_1.CustomGeometry(), GeometryData);
};
//# sourceMappingURL=CustomGeometrySystem.js.map