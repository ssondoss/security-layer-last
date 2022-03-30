import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import JSEncrypt from 'jsencrypt';
import * as forge from 'node-forge';

@Injectable({ providedIn: 'root' })
export class EncryptionDecryptionService {
  constructor(private http: HttpClient) {}
  rsaAlgorithm = new JSEncrypt();
  frontendPublicKey: any;
  frontendPublicKey64: any;
  frontendPrivateKey: any;

  // http handshaking request
  public HHS() {
    return new Promise((resolve, reject) => {
      localStorage.clear();
      this._SFEPRKTOLS();
      this._SFEPRKTAL();
      this._SFEPBK();
      this._SFEPBKB64();

      const headers = new HttpHeaders().set(
        'handshaking',
        this._GFEPB64K() || ''
      );

      this.http
        .post('https://localhost:44365/WeatherForecast/HandShaking', null, {
          headers: headers,
        })
        .subscribe((res: any) => {
          this._SBEPBK(res.publicKey);
          this._SAIDENBYFEPBK(res.authID);
          this._SSIDENBYFEPBK(res.sessionID);
          resolve(true);
        });
    });
  }
  // http handshaking request without subscribe
  public HHSWS() {
    localStorage.clear();
    this._SFEPRKTOLS();
    this._SFEPRKTAL();
    this._SFEPBK();
    this._SFEPBKB64();
    const headers = new HttpHeaders().set(
      'handshaking',
      this._GFEPB64K() || ''
    );
    return this.http.post(
      'https://localhost:44365/WeatherForecast/HandShaking',
      null,
      {
        headers: headers,
      }
    );
    //   .subscribe((res: any) => {
    //     this._SBEPBK(res.publicKey);
    //     this._SAIDENBYFEPBK(res.authID);
    //     this._SSIDENBYFEPBK(res.sessionID);
    //   });
  }

  // set backend public key encrypted by frontend publiv key encrypted
  _SBEPBK(BEPBK: any) {
    localStorage.setItem('BEPBK', BEPBK || '');
  }

  _GBEPBK() {
    return localStorage.getItem('BEPBK') || '';
  }

  // set auth id
  _SAIDENBYFEPBK(AID: any) {
    var AIDEN = this.rsaAlgorithm.encrypt(AID);
    localStorage.setItem('AIDEN', AIDEN || '');
  }
  // get auth id
  _GAIDDE() {
    var AIDDE: any = this.rsaAlgorithm.decrypt(
      localStorage.getItem('AIDEN') || ''
    );
    return AIDDE;
  }

  // session id
  _SSIDENBYFEPBK(SID: any) {
    var SIDEN = this.rsaAlgorithm.encrypt(SID);
    localStorage.setItem('SIDEN', SIDEN || '');
  }

  _GSIDDE() {
    var SIDDE: any = this.rsaAlgorithm.decrypt(
      localStorage.getItem('SIDEN') || ''
    );
    return SIDDE;
  }

  // set frontend private key to localstroage
  _SFEPRKTOLS() {
    localStorage.setItem('FEPRK', this.rsaAlgorithm.getPrivateKey());
  }
  // set frontend private ket to rsa algorithm
  _SFEPRKTAL() {
    this.rsaAlgorithm.setPrivateKey(localStorage.getItem('FEPRK') || '');
  }

  // get frontend private key from localstorage

  _GFEPRK() {
    if (localStorage.getItem('FEPRK')) return localStorage.getItem('FEPRK');
    else return null;
  }
  //set frontend public key to localstorage encrypted by frontend key public key
  _SFEPBK() {
    localStorage.setItem('FEPBK', this.rsaAlgorithm.getPublicKey());
  }
  // get frontend public key decrypted
  _GFEPBK() {
    return localStorage.getItem('FEPBK');
  }

  //set frontend public key base 64 to localstorage encrypted by frontend key public key
  _SFEPBKB64() {
    this.rsaAlgorithm.getPublicKeyB64();

    localStorage.setItem('FEPBKB64', this.rsaAlgorithm.getPublicKeyB64());
  }
  // get frontend public key base 64 decrypted
  _GFEPB64K() {
    // this._SFEPRKTAL();
    // if(!localStorage.getItem('FEPBKENBYFEPBK64')){this._SFEPBK64ENBYFEPBK()}

    return localStorage.getItem('FEPBKB64') || '';
  }

  //   encryptByBackendPublicKey(plainText: string) {
  //     var rsa = forge.pki.publicKeyFromPem(this._GBEPBK());
  //     var ENTEXT = window.btoa(rsa.encrypt(plainText));
  //     return ENTEXT;
  //   }

  //   public decryptByFrontendPrivateKey(EnText: string) {
  //     return this.rsaAlgorithm.decrypt(EnText);
  //   }

   encryptByBackendPublicKey(plainText: string) {
       debugger;
    // return new Promise((resolve, reject) => {
      var rsa = forge.pki.publicKeyFromPem(this._GBEPBK());
      var ENTEXT = window.btoa(rsa.encrypt(plainText));
      return(ENTEXT);
    // });
  }

   decryptByFrontendPrivateKey(EnText: string) {
       debugger;
       this._SFEPRKTAL();
    // return new Promise((resolve, reject) => {
      return(this.rsaAlgorithm.decrypt(EnText));
    // });
  }
}
