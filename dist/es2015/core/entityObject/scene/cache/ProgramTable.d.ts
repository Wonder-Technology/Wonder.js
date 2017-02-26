import { Program } from "../../../../renderer/program/Program";
export declare class ProgramTable {
    static lastUsedProgram: Program;
    private static _table;
    static hasProgram(key: string): boolean;
    static addProgram(key: string, program: Program): void;
    static getProgram(key: string): Program;
    static dispose(): void;
    static clearAll(): void;
}
