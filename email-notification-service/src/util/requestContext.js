import { createNamespace } from 'cls-hooked';

const nsId = 'a6a29a6f-6747-4b5f-b99f-07ee96e32f89';
const ns = createNamespace(nsId);

/** Helper function that is responsible for initializing the context for each innovation. */
export const runWithRequestContext = (
  fn,
  event,
  context,
) => ns.runAndReturn(() => fn(event, context));

/** Helper function that is responsible for initializing the context as a middleware. */
export const runWithRequestContextMiddleWare = (req, res, next) => {
  ns.bindEmitter(req);
  ns.bindEmitter(res);

  ns.run(() => {
    next();
  });
};
/**
 * Gets a value from the context by key.
 * Will return undefined if the context has not yet been initialized for this request or
 * if a value is not found for the specified key.
 * @param {string} key
 */
export const requestContextGet = (key) => {
  if (ns && ns.active) {
    return ns.get(key);
  }
  return undefined;
};

/**
 * Adds a value to the context by key.  If the key already exists, its value will be overwritten.
 * No value will persist if the context has not yet been initialized.
 * @param {string} key
 * @param {*} value
 */
export const requestContextSet = (key, value) => {
  if (ns && ns.active) {
    return ns.set(key, value);
  }
  return undefined;
};
