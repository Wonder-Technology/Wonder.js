import { registerClass } from "../../../../definition/typescript/decorator/registerClass";
import { Program } from "../../../../renderer/program/Program";
import { Hash } from "wonder-commonlib/dist/es2015/Hash";

@registerClass("ProgramTable")
export class ProgramTable {
    public static lastUsedProgram: Program = null;

    private static _table: Hash<Program> = Hash.create<Program>();

    public static hasProgram(key: string) {
        return this._table.hasChild(key);
    }

    public static addProgram(key: string, program: Program) {
        this._table.addChild(key, program);
    }

    public static getProgram(key: string) {
        return this._table.getChild(key);
    }

    public static dispose() {
        this._table.forEach((program: Program) => {
            program.dispose();
        });

        this.lastUsedProgram = null;
    }

    public static clearAll() {
        this._table.removeAllChildren();

        this.lastUsedProgram = null;
    }
}