let rec sequenceMostM = result => {
  result->Result.either(
    stream => stream->WonderBsMost.Most.map(Result.succeed, _),
    stream => stream->WonderBsMost.Most.map(Result.failWith, _),
  );
};
