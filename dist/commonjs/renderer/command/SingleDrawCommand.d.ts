import { QuadCommand } from "./QuadCommand";
import { Matrix3 } from "../../math/Matrix3";
import { Material } from "../../material/Material";
export declare class SingleDrawCommand extends QuadCommand {
    static create(): SingleDrawCommand;
    normalMatrix: Matrix3;
    protected draw(material: Material): void;
}
