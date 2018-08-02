type drawMode =
  | Points
  | Lines
  | Line_loop
  | Line_strip
  | Triangles
  | Triangle_strip
  | Triangle_fan;

external drawModeToUint8 : drawMode => Js.Typed_array.Uint8Array.elt =
  "%identity";

external uint8ToDrawMode : Js.Typed_array.Uint8Array.elt => drawMode =
  "%identity";