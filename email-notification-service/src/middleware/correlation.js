import { v4 as uuidv4 } from 'uuid';
import { requestContextSet } from '../util/requestContext';

export default function correlation(options) {
  const headerName = (options && options.header) || 'correlation-id';
  return (req, res, next) => {
    let id = req.get(headerName);
    if (!id) {
      id = uuidv4();
    }
    res.set(headerName, id);
    requestContextSet('correlationId', id);
    next();
  };
}
