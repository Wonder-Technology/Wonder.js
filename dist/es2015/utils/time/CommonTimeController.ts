import { registerClass } from "../../definition/typescript/decorator/registerClass";
import { TimeController } from "./TimeController";
import { Director } from "../../core/Director";
import { root } from "../../definition/Variable";

@registerClass("CommonTimeController")
export class CommonTimeController extends TimeController {
    public static create() {
        var obj = new this();

        return obj;
    }

    protected getNow() {
        if (Director.getInstance().isTimeChange) {
            return Director.getInstance().elapsed;
        }

        return root.performance.now();
    }
}