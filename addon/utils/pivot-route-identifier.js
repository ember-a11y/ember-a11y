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
    let oldHandler = oldHandlers[i];
    let newHandler = newHandlers[i];

    let oldRouteName =
      (oldHandler.handler && oldHandler.handler.routeName) ||
      oldHandler._route.routeName;
    let newRouteName =
      (newHandler.handler && newHandler.handler.routeName) ||
      newHandler._route.routeName;

    if (oldRouteName !== newRouteName) {
      return newHandler;
    }
  }
  return newHandlers[length - offset];
}
