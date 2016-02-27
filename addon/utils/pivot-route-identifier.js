export default function pivotRouteIdentifier(oldHandlers, newHandlers) {
  if (oldHandlers === undefined) {
    return newHandlers[0];
  }

  console.log(oldHandlers.map(handler => handler.handler.routeName));
  console.log(newHandlers.map(handler => handler.handler.routeName));

  let length = Math.min(oldHandlers.length, newHandlers.length);
  let offset = oldHandlers.length >= newHandlers.length ? 1 : 0;

  if (length === 0) {
    throw new Error('No handlers detected.');
  }

  let commonHandlers = [];
  for (let i = 0; i < length; i++) {

    let oldHandler = oldHandlers[i];
    let newHandler = newHandlers[i];

    if (oldHandler.handler.routeName === newHandler.handler.routeName) {
      commonHandlers.push(oldHandler);
    } else if (commonHandlers.length) {
      return newHandlers[i];
    } else {
      return newHandlers[0];
    }
  }
  return newHandlers[length - offset];
}
