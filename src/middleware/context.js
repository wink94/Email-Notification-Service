/** @format */

import { runWithRequestContextMiddleWare } from '../util/requestContext';

export default function contextMiddleware() {
  return (req, res, next) => {
    runWithRequestContextMiddleWare(req, res, next);
  };
}
