import { registerClass } from "../../definition/typescript/decorator/registerClass";
import { QuadCommand } from "./QuadCommand";
import { Material } from "../../material/Material";
import { ArrayBuffer } from "../buffer/ArrayBuffer";
import { ElementBuffer } from "../buffer/ElementBuffer";
import { EBufferDataType } from "../buffer/EBufferDataType";

@registerClass("SingleDrawCommand")
export class SingleDrawCommand extends QuadCommand {
    public static create() {
        var obj = new this();

        return obj;
    }

    // public normalMatrix: Matrix3 = null;

    protected draw(material: Material) {
        var vertexBuffer: ArrayBuffer = null,
            indexBuffer: ElementBuffer = this.buffers.getChild(EBufferDataType.INDICE);

        this.webglState.setState(material);

        if (indexBuffer) {
            this.drawElements(indexBuffer);
        }
        else {
            vertexBuffer = this.buffers.getChild(EBufferDataType.VERTICE);

            this.drawArray(vertexBuffer);
        }
    }
}