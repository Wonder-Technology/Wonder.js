module wd{
    export class PlainFontUtils{
        public static measure(context:CanvasRenderingContext2D, text:string, fontSize:number, fontFamily:string){
            context.font = `${fontSize}px '${fontFamily}'`;

            return context.measureText(text).width;
        }

        public static computeLineHeight(lineHeight:number|string, fontSize:number, fontFamily:string) {
            var div = wdCb.DomQuery.create("<div></div>"),
                dom = div.get(0),
                resultLineHeight = null;

            dom.style.cssText = `
             font-family: ${fontFamily};
             font-size: ${fontSize}px;
             position: absolute;
             left: -100px;
             top: -100px;
             line-height: ${lineHeight};
             `;

            div.prependTo("body");

            dom.innerHTML = "abc!";

            resultLineHeight = dom.clientHeight;

            div.remove();

            return resultLineHeight;
        }

    }
}
