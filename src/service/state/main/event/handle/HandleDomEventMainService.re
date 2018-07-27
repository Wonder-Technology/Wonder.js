let preventDefault: EventType.domEvent => unit = [%raw
  event => {|
    if (event.cancelable) {
      if (!event.defaultPrevented) {
          event.preventDefault();
      }
  }

  event.stopPropagation();
  |}
];