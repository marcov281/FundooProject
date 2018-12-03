/**
 * importing various module
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { environment} from '../../../../environments/environment'

//injecting root
@Injectable({
  providedIn: 'root'
})

/**
 * @description:creating user service class which will do the route for us
 */
export class UserService {


  //adding api url
  API_URL = environment.baseUrl;
  constructor(private http: HttpClient) { }

  ResetPassword(url_signup, bodydata, token) {    //creating post method for a perticular post request
   let encodeHeader = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      })
    }
    return this.http.post(this.API_URL + '/' + url_signup, this.encode(bodydata),encodeHeader);//concatinating both url                             
  }
  encode(data) {
    const formBody = [];
    for (const property in data) {
      const encodedKey = encodeURIComponent(property);
      const encodedValue = encodeURIComponent(data[property]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    return formBody.join('&');
  }

  //---------------------------------------------------------------------------------------
  //common service-------------------------------------------------------------------------
  //---------------------------------------------------------------------------------------

  httpPostWithoutToken(url, body) {
    let headerNoAuthentication = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }
    let token = localStorage.getItem('token')
    return this.http.post(this.API_URL + '/' + url, body,headerNoAuthentication)
  }

  httpPostData(url, body) {
  let httpHeader = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }
    return this.http.post(this.API_URL + '/' + url, body,httpHeader)
  }

  httpGetData(url) {
    let httpHeader = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }
    return this.http.get(this.API_URL + '/' + url,httpHeader);
  }

  httpDeleteData(url) {
    let httpHeader = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }
    return this.http.delete(this.API_URL + '/' + url,httpHeader);
  }

  httpGetWithoutToken(url) {
    let headerNoAuthentication = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }
    return this.http.get(this.API_URL + '/' + url,headerNoAuthentication);
  }


  httpPostEncoded(url, body) {
    let encodeHeader = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      })
    }
    return this.http.post(this.API_URL + '/' + url, body,encodeHeader)
  }

  httpPostWithoutcontent(url, body) {

  let headerNoContent = {
    headers: new HttpHeaders({
    })
  }
    return this.http.post(this.API_URL + '/' + url, body,headerNoContent)
  }
  //----------------------------------------------------------------------------------------
  //----------------------------------------------------------------------------------------
}
