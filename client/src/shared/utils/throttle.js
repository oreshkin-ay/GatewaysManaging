export function throttle(func, wait = 500) {
  let waiting;
  let lastArgs;
  return function inner(arg) {
    if (waiting) {
      lastArgs = arg;
      return;
    }

    waiting = true;
    func(arg);

    setTimeout(() => {
      waiting = false;
      if (lastArgs) {
        inner(lastArgs);
        lastArgs = null;
      }
    }, wait);
  };
}
