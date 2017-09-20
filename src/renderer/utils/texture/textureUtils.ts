export const getImageData = (source: HTMLImageElement, width:number, height:number, DomQuery:any) => {
    var canvas = DomQuery.create("<canvas></canvas>").get(0),
        ctx = null;

    canvas.width = width;
    canvas.height = height;

    ctx = canvas.getContext("2d");
    ctx.drawImage(source, 0, 0);

    return ctx.getImageData(0, 0, width, height);
}
