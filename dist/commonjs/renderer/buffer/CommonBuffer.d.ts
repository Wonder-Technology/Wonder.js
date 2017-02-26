import { Buffer } from "./Buffer";
import { EBufferType } from "./EBufferType";
import { EBufferUsage } from "./EBufferUsage";
export declare abstract class CommonBuffer extends Buffer {
    type: EBufferType;
    count: number;
    usage: EBufferUsage;
    protected resetBufferData(glBufferTargetStr: string, typedData: any, offset?: number): void;
}
