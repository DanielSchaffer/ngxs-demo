import * as bodyParser  from 'body-parser';
import * as express     from 'express';
import * as uuid        from 'uuid';

import { Application, Handler, NextFunction, Request, Response } from 'express-serve-static-core';

import { extend, isEmpty, find } from 'lodash';

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
      next();
    }
  ];

  private static addResourceLink(req: RestApiRequest, resource: any, resourcePath: string[]) {
    // tslint:disable-next-line:variable-name
    const _links: any = {
      self: `${req.protocol}://${req.get('host')}${req.baseUrl}/${resourcePath.join('/')}`
    };
    return extend({} as any, resource, { _links });
  }

  private static getChildResourcePattern(req: RestApiRequest): RegExp {
    return new RegExp(`^${RestApi.getResourceKey(req.user, req.resourcePath.concat(['[\\w-]+']))}(?!${KEY_PATH_SEPARATOR})`);
  }

  constructor(private app: Application) {
    console.log('Starting RestApi');
    this.checkResource = this.checkResource.bind(this);
    this.checkChildResources = this.checkChildResources.bind(this);

    const router = express.Router();

    router.use(bodyParser.json());

    router.get(ROUTE_PATH, this.middleware, (req: RestApiRequest, res: Response) => {
      const resource = this.data.get(req.resourceKey);
      if (resource) {
        return res.json(RestApi.addResourceLink(req, resource, req.resourcePath));
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
      this.data.set(key, req.body);

      res.status(201).json(RestApi.addResourceLink(req, req.body, req.resourcePath.concat([req.body.id])));
    });

    router.put(ROUTE_PATH, this.middleware, RestApi.checkBody, this.checkChildResources, (req: RestApiRequest, res: Response) => {
      req.body.id = req.resourcePath[req.resourcePath.length - 1];
      if (!this.data.has(req.resourceKey)) {
        res.status(201);
      }
      this.data.set(req.resourceKey, req.body);
      res.json(RestApi.addResourceLink(req, req.body, req.resourcePath));
    });

    router.patch(ROUTE_PATH, this.middleware, RestApi.checkBody, this.checkResource, (req: RestApiRequest, res: Response) => {
      res.json(RestApi.addResourceLink(req, extend(req.resource, req.body), req.resourcePath));
    });

    router.delete(ROUTE_PATH, this.middleware, (req: RestApiRequest, res: Response) => {
      const resource = this.data.get(req.resourceKey);
      if (resource) {
        this.data.delete(req.resourceKey);
        return res.json(resource);
      }

      const resources: any[] = this.getChildResources(req);
      if (resources.length) {
        resources.forEach(childResource => {
          this.data.delete(RestApi.getResourceKey(req.user, req.resourcePath.concat([childResource.id])));
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
    const resource = this.data.get(req.resourceKey);
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
    return [...this.data.keys()]
      .filter(key => {
        if (!key.startsWith(req.resourceKey)) {
          return false;
        }
        const parts = key.substring(req.resourceKey.length + KEY_PATH_SEPARATOR.length).split(KEY_PATH_SEPARATOR);
        return parts.length === 1;
      })
      .map(key => RestApi.addResourceLink(req, this.data.get(key), req.resourcePath.concat([this.data.get(key).id])));
  }
}
