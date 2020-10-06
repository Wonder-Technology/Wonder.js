type path = string;

type network = {
  readImageFile:
    path => Result.t2(WonderBsMost.Most.stream(ImagePOType.data)),
};
