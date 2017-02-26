import { WebGLState } from "./WebGLState";
import { Material } from "../../material/Material";
export declare class BasicState extends WebGLState {
    static create(): BasicState;
    setState(material: Material): void;
}
