import { Component } from "../Component";
export declare abstract class Geometry extends Component {
}
export declare const getDrawMode: Function;
export declare const getVertices: Function;
export declare const getNormals: Function;
export declare const getTexCoords: Function;
export declare const getIndices: Function;
export declare const getGeometryConfigData: Function;
export declare const initGeometry: (geometry: Geometry) => void;
export declare const getGeometryGameObject: Function;
