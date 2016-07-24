var fileTool = (function(){
    return {
        convertImageToCanvas: function(image){
            var canvas = document.createElement("canvas");
            canvas.width = image.width;
            canvas.height = image.height;

            var context = canvas.getContext("2d");

            context.drawImage(image, 0, 0);

            return {
                canvas:canvas,
                context:context
            }
        },
        convertImageToBlob: function(image){
            var data = this.convertImageToCanvas(image);

            return fileOperator.dataURLToBlob(data.canvas.toDataURL("image/" + wdCb.PathUtils.extname(image.url)));
        }
    }
})();
