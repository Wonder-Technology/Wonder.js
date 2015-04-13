module Engine3D{
    export class WebGLRenderer{
        public static create():WebGLRenderer {
            var obj = new this();

            return obj;
        }

        private _commandQueue:any = [];

       public createQuadCommand():QuadCommand{
           return QuadCommand.create();
       }

        public addCommand(command:QuadCommand){
            //todo extract Collection class
            if(this._hasChild(command)){
                return;
            }

            command.init();
            this._commandQueue.push(command);
        }

        public render(scene:Scene){
            this._commandQueue.forEach((command) => {
                command.execute(scene);
            });
        }

        private _hasChild(obj){

        }
    }
}
