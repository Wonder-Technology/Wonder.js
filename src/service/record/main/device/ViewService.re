open ViewType;

open DomType;

let getCanvas = ({canvas}) => canvas |> OptionService.unsafeGet;

let setCanvas = (canvas: htmlElement, record) => {
  ...record,
  canvas: Some(canvas),
};

let getOffset: htmlElement => (int, int) = [%raw
  canvas => {|
                var offset = [canvas.offsetLeft,  canvas.offsetTop];
                var offsetParent = canvas;

            while (offsetParent = offsetParent.offsetParent) {
                offset[0] += offsetParent.offsetLeft;
                offset[1] += offsetParent.offsetTop;
            }

            return offset;
|}
];