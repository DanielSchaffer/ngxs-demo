import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';

import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor {

  constructor(private store: Store) {}

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.store.selectOnce(state => state.auth.user)
      .pipe(mergeMap(user => {
        const authorizedReq = req.clone({
          headers: new HttpHeaders({
            Authorization: user.username,
          })
        });
        return next.handle(authorizedReq);
      }));
  }

}
