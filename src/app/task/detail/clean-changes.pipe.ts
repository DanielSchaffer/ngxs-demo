import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cleanChanges'
})
export class CleanChangesPipe implements PipeTransform {

  public transform(value: any, args?: any): any {
    const result = Object.assign({}, value);
    delete result.id;
    delete result._links;
    return result;
  }

}
