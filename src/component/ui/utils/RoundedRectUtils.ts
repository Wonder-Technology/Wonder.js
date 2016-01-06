module wd {
    export class RoundedRectUtils {
        public static drawRoundedRect(context:CanvasRenderingContext2D, strokeStyle:string, fillStyle:string, cornerX:number, cornerY:number, width:number, height:number, cornerRadius:number) {
            context.save();

            context.beginPath();

            if (width > 0) {
                context.moveTo(cornerX + cornerRadius, cornerY);
            }
            else {
                context.moveTo(cornerX - cornerRadius, cornerY);
            }

            context.arcTo(cornerX + width, cornerY, cornerX + width, cornerY + height, cornerRadius);
            context.arcTo(cornerX + width, cornerY + height, cornerX, cornerY + height, cornerRadius);
            context.arcTo(cornerX, cornerY + height, cornerX, cornerY, cornerRadius);

            if (width > 0) {
                context.arcTo(cornerX, cornerY, cornerX + cornerRadius, cornerY, cornerRadius);
            }
            else {
                context.arcTo(cornerX, cornerY, cornerX - cornerRadius, cornerY, cornerRadius);
            }

            context.closePath();


            context.strokeStyle = strokeStyle;

            context.fillStyle = fillStyle;

            if (strokeStyle) {
                context.stroke();
            }

            if (fillStyle) {
                context.fill();
            }

            context.restore();
        }
    }
}

