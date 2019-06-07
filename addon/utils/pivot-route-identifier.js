export default function pivotRouteIdentifier(oldHandlers, newHandlers) {
  if (oldHandlers === undefined) {
    return newHandlers[0];
  }

  let length = Math.min(oldHandlers.length, newHandlers.length);
  let offset = oldHandlers.length >= newHandlers.length ? 1 : 0;

  if (length === 0) {
    return undefined;
  }

  for (let i = 0; i < length; i++) {
    let oldHandler = oldHandlers[i].handler || oldHandlers[i].route;
    let newHandler = newHandlers[i].handler || newHandlers[i].route;

    if (oldHandler.routeName !== newHandler.routeName) {
      return newHandler;
    }
  }
  return newHandlers[length - offset];
}
