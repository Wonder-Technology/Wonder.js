/// <reference path="../../filePath.d.ts"/>
module dy{
    export abstract class Animation extends Component{
        public abstract play(animName:string, fps:number);
        public abstract pause();
        public abstract resume();
        public abstract stop();
        public abstract update(time:number);
    }
}

