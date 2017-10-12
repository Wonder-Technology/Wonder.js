import { CustomGeometry } from "./CustomGeometry";
import { create as createGeometry, getIndices, getVertices } from "./GeometrySystem";

export const create = (GeometryData: any) => {
    return createGeometry(new CustomGeometry(), GeometryData);
}
