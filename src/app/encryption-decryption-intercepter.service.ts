import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { request } from 'http';
import { catchError, map, tap } from 'rxjs/operators';
import { EncryptionDecryptionService } from './encryption-decryption.service';
import { resolve } from 'dns';
import * as forge from 'node-forge';
import JSEncrypt from 'jsencrypt';

@Injectable()
export class EncryptionDecryptionIntercepter implements HttpInterceptor {
  rsaAlgorithm = new JSEncrypt();

  constructor(private ES: EncryptionDecryptionService) {}
  whileList = [];

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {


    /**
     * if no key exist, then handshake with server
     * encrypt outgoing data
     * decrypt incoming data
     */

    if (req.url.includes('HandShaking')) {
      return next.handle(req);
    }

    let cloned: HttpRequest<any>;

    if (!this.ES._GFEPRK()) {
      this.ES.HHS()
      .then(() => {


        // if (req.headers.get('secure')){

        //   console.log('message');
     
        //   console.log(req.body.message);
          
        //   req= req.clone({body:{message:this.ES.encryptByBackendPublicKey(req.body.message)}})
        // }
      })
      // .then((encryptedData) => {
      //   cloned = req.clone({
      //     body: encryptedData
      //   });

      //   return next.handle(cloned)
      //   .pipe(
      //     map((res)=> {
      //       if(res){

      //         // decrypt rees

      //         // return decryptedData
      //       }
      //     })
      //   )
      // });
      // } else
      //   this.ES.encryptByBackendPublicKey('1').then((encryptedData) => {
      //     cloned = req.clone({
      //       body: encryptedData,
      //     });
      //     return next.handle(cloned).pipe();
      //   });
    } else {
      debugger;
      // if (req.headers.get('handshaking')) {
      //   let secureRequest = req.clone({ setHeaders: { secure: 'true' } });

      //   return next.handle(secureRequest);
      // }
      // if (req.headers.get('secure')) {
     console.log('message');
     
console.log(req.body.message);

    let req1= req.clone({body:{message:this.ES.encryptByBackendPublicKey(req.body.message)}});
     console.log(req);
     
        // .pipe(
        //   map((event: HttpEvent<any>) => {d
        //     if (event instanceof HttpResponse) {
        //       let camelCaseObject = mapKeys(event.body, (v, k) => camelCase(k));
        //       const modEvent = event.clone({ body: camelCaseObject });

        //       return modEvent;
        //     }
        //   })

        // if request have status secure then decrypt it else send the response to frontend
         return next.handle(req1)
        //.pipe(
        //   map(
        //     (event: HttpEvent<any>) => {
        //         console.log('body');
        //         console.log(event);

        //         return event;
              
        //     }
            // (err: any) => {
            //   console.log(JSON.stringify(err));
            // }
        //   )
        // );
        // } else
        //   return next.handle(req).pipe(
        //     map((event: HttpEvent<any>) => {
        //       if (event instanceof HttpResponse) {
        //         console.log('body');
        //         console.log(event.body);

        //         return event.body;
        //       }
        //     })
        //   );
      
    }
    return next.handle(req);
  }
  // signture
}
