/// <reference path="../../filePath.d.ts"/>
module wd{
    export abstract class Animation extends Component{
        public entityObject:GameObject;

        public abstract play(animName:string, fps:number);
        public abstract pause();
        public abstract resume();
        public abstract stop();
        public abstract update(elapsedTime:number);
    }
}

