import * as bodyParser  from 'body-parser';
import * as express     from 'express';
import * as uuid        from 'uuid';

import { Application, Handler, NextFunction, Request, Response } from 'express-serve-static-core';

import { chain, extend, isEmpty, find } from 'lodash';

const KEY_USER_SUFFIX = ':::';
const KEY_PATH_SEPARATOR = '::';
const ROUTE_PATH = '*';

export interface RestApiRequest extends Request {
    user?: any;
    resourcePath?: string[];
    resourceKey?: string;
    resourceId?: string;
    resource?: any;
}

export class RestApi {

  private data = new Map<string, any>();
  private middleware: Handler[] = [

    function auth(req: RestApiRequest, res: Response, next: NextFunction): void {
      req.user = req.get('authorization');
      if (!req.user) {
        return res.status(401).end();
      }
      next();
    },

    function resourceParams(req: RestApiRequest, res: Response, next: NextFunction): void {
      req.resourcePath = req.path.substring(1).split('/');
      next();
    },

    function resourceKey(req: RestApiRequest, res: Response, next: NextFunction): void {
      req.resourceKey = RestApi.getResourceKey(req.user, req.resourcePath);
      req.resourceId = req.resourcePath[req.resourcePath.length - 1];
      console.log('resourceKey', req.resourcePath, req.resourceKey);
      next();
    }
  ];

  private static addResourceLink(req: RestApiRequest, resource: any, resourcePath: string[]) {
    const _links: any = {
      self: `${req.protocol}://${req.get('host')}${req.baseUrl}/${resourcePath.join('/')}`
    };
    return extend({} as any, resource, { _links });
  }

  private static getChildResourcePattern(req: RestApiRequest): RegExp {
    return new RegExp(`^${RestApi.getResourceKey(req.user, req.resourcePath.concat(['[\\w-]+']))}`);
  }

  constructor(private app: Application) {
    console.log('Starting RestApi');
    this.checkResource = this.checkResource.bind(this);
    this.checkChildResources = this.checkChildResources.bind(this);

    const router = express.Router();

    router.use(bodyParser.json());

    router.get(ROUTE_PATH, this.middleware, (req: RestApiRequest, res: Response) => {
      if (this.data[req.resourceKey]) {
        res.json(RestApi.addResourceLink(req, this.data[req.resourceKey], req.resourcePath));
      }

      const resources = this.getChildResources(req);
      if (resources.length) {
        return res.json(resources);
      }

      return res.status(404).end();
    });

    router.post(ROUTE_PATH, this.middleware, RestApi.checkBody, (req: RestApiRequest, res: Response) => {
      if (req.body.id) {
        return res.status(400).send('use PUT to update an existing resource');
      }

      req.body.id = uuid();
      const key = `${req.resourceKey}::${req.body.id}`;
      this.data[key] = req.body;

      res.status(201).json(RestApi.addResourceLink(req, req.body, req.resourcePath.concat([req.body.id])));
    });

    router.put(ROUTE_PATH, this.middleware, RestApi.checkBody, this.checkChildResources, (req: RestApiRequest, res: Response) => {
      req.body.id = req.resourcePath[req.resourcePath.length - 1];
      if (!this.data[req.resourceKey]) {
        res.status(201);
      }
      this.data[req.resourceKey] = req.body;
      res.json(RestApi.addResourceLink(req, req.body, req.resourcePath));
    });

    router.patch(ROUTE_PATH, this.middleware, RestApi.checkBody, this.checkResource, (req: RestApiRequest, res: Response) => {
      res.json(RestApi.addResourceLink(req, extend(req.resource, req.body), req.resourcePath));
    });

    router.delete(ROUTE_PATH, this.middleware, (req: RestApiRequest, res: Response) => {
      if (this.data[req.resourceKey]) {
        delete this.data[req.resourceKey];
        return res.json(req.resource);
      }

      const resources: any[] = this.getChildResources(req);
      if (resources.length) {
        resources.forEach(resource => {
          delete this.data[RestApi.getResourceKey(req.user, req.resourcePath.concat([resource.id]))];
        });
        return res.json(resources);
      }

      res.status(404).end();
    });

    app.use('/api', router);
  }

  private static getResourceKey(user: any, resourcePath: string[]): string {
    return `${user}${KEY_USER_SUFFIX}${resourcePath.join(KEY_PATH_SEPARATOR)}`;
  }

  private static checkBody(req: RestApiRequest, res: Response, next: NextFunction): void {
    if (!req.body || isEmpty(req.body)) {
      res.status(400).send('body is required');
      return;
    }
    next();
  }

  private checkResource(req: RestApiRequest, res: Response, next: NextFunction): void {
    const resource = this.data[req.resourceKey];
    if (!resource) {
      return res.status(404).end();
    }
    delete resource._links;
    req.resource = resource;
    next();
  }

  private checkChildResources(req: RestApiRequest, res: Response, next: NextFunction) {
    const pattern = RestApi.getChildResourcePattern(req);
    if (find(Object.keys(this.data), (key: string) => pattern.test(key))) {
      return res.status(400).send('This URI already has resources under it');
    }
    next();
  }

  private getChildResources(req: RestApiRequest): any[] {
    const pattern = RestApi.getChildResourcePattern(req);
    return chain(Object.keys(this.data))
      .filter(key => pattern.test(key))
      .map(key => RestApi.addResourceLink(req, this.data[key], req.resourcePath.concat([this.data[key].id])))
      .value();
  }
}
