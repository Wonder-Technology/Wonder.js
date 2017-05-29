import { GameObject } from "../../core/entityObject/gameObject/GameObject";
import { Component } from "../Component";
import { EDrawMode } from "../../renderer/enum/EDrawMode";
export declare abstract class Geometry extends Component {
}
export declare var getDrawMode: (geometry: Geometry) => EDrawMode;
export declare var getVertices: (geometry: Geometry) => any;
export declare var getIndices: (geometry: Geometry) => any;
export declare var getGeometryConfigData: (geometry: Geometry) => any;
export declare var initGeometry: (geometry: Geometry) => void;
export declare var getGeometryGameObject: (geometry: Geometry) => GameObject;
