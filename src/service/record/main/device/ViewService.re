open ViewType;

open DomType;

let getCanvas = ({canvas}) => canvas |> OptionService.unsafeGet;

let setCanvas = (canvas: htmlElement, record) => {...record, canvas: Some(canvas)};