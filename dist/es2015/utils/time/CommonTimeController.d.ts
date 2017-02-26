import { TimeController } from "./TimeController";
export declare class CommonTimeController extends TimeController {
    static create(): CommonTimeController;
    protected getNow(): any;
}
