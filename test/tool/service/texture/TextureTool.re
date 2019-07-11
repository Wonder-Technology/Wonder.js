let getNearest = () => TextureType.Nearest;

let getNearestMipmapNearest = () => TextureType.Nearest_mipmap_nearest;

let getLinear = () => TextureType.Linear;

let getNearestMipmapLinear = () => TextureType.Nearest_mipmap_linear;

let getLinearMipmapNearest = () => TextureType.Linear_mipmap_nearest;

let getLinearMipmapLinear = () => TextureType.Linear_mipmap_linear;

let buildSource = (~width=4, ~height=4, ~name="source", ()) => {"width": width, "height": height};