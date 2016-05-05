module wd{
    export class ProgramTable{
        public static lastUsedProgram:Program = null;

        private static _table:wdCb.Hash<Program> = wdCb.Hash.create<Program>();

        public static hasProgram(key:string){
            return this._table.hasChild(key);
        }

        public static addProgram(key:string, program:Program){
            this._table.addChild(key, program);
        }

        public static getProgram(key:string){
            return this._table.getChild(key);
        }

        //todo test
        public static dispose(){
            this._table.forEach((program:Program) => {
                program.dispose();
            });

            this.lastUsedProgram = null;
        }
    }
}
