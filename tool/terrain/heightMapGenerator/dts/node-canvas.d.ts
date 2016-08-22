declare module 'canvas' {
     class Canvas{
        constructor(width:number, height:number);

        public static Image:any;

        public toBuffer():any;
    }

    export = Canvas;
}
