import { Component } from "../Component";
export declare abstract class Geometry extends Component {
}
export declare var getDrawMode: Function;
export declare var getVertices: Function;
export declare var getIndices: Function;
export declare var getGeometryConfigData: Function;
export declare var initGeometry: (geometry: Geometry) => void;
export declare var getGeometryGameObject: Function;
