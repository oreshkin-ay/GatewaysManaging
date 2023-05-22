export function throttle(func, wait = 500) {
  let waiting;
  let lastArgs;
  let hasQuery = false;

  return function inner(arg) {
    if (waiting) {
      lastArgs = arg;
      hasQuery = true;
      return;
    }

    waiting = true;
    func(arg);

    setTimeout(() => {
      waiting = false;
      if (hasQuery) {
        inner(lastArgs);
        lastArgs = null;
        hasQuery = false;
      }
    }, wait);
  };
}
