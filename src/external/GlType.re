type webgl1Context;

type program;

type shader;

type buffer;

type texture;

type textureSource;

type attributeLocation = int;

type uniformLocation;

type enum;

type precisionFormat = {. "precision": int};

type extension;

external imageElementToTextureSource : DomExtendType.imageElement => textureSource = "%identity";