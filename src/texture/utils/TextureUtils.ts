/// <reference path="../../filePath.d.ts"/>
module dy {
    export class TextureUtils{
        public static isPowerOfTwo(width:number, height:number){
            return JudgeUtils.isPowerOfTwo(width) && JudgeUtils.isPowerOfTwo(height);
        }
    }
}

