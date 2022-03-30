import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Intercepter } from './intercepter';
import { EncryptionDecryptionIntercepter } from './encryption-decryption-intercepter.service';
import { SecurityIntercepter } from './security.interceptor';
import { HashingIntercepter } from './hashing-intercepter';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [
    // { provide: HTTP_INTERCEPTORS, useClass: Intercepter, multi: true },
    // { provide: HTTP_INTERCEPTORS, useClass: SecurityIntercepter, multi: true },
    // { provide: HTTP_INTERCEPTORS, useClass: HashingIntercepter, multi: true },


  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
