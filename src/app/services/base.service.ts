import { throwError } from 'rxjs';

export abstract class BaseService {  
    
    constructor() { }

    protected handleError(error: any) {

      var modelStateErrors: string = '';

      if (typeof error.error === 'string' || error.error instanceof String) {
        modelStateErrors = error.error;
      } else if (error.message) {
        modelStateErrors = error.message;
      } else {
        modelStateErrors = 'An error has occured, if this continues please contact customer support'
      }
  
      modelStateErrors = modelStateErrors = '' ? null : modelStateErrors;
      return throwError(modelStateErrors || 'Server error');
  }
}
