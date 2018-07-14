import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


import { Operator } from './operator';

@Injectable()
export class OperatorService {
  // URL for CRUD operations
  operatorUrl = 'http://localhost:3000/operators';
  // Create constructor to get Http instance
  constructor(private http: Http) {
  }
  // Fetch all operators
  getAllOperators(): Observable<Operator[]> {
    return this.http.get(this.operatorUrl)
      .map(this.extractData)
      .catch(this.handleError);

  }
  // Create operator
  createOperator(operator: Operator): Observable<number> {
    const cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: cpHeaders });
    return this.http.post(this.operatorUrl, operator, options)
      .map(success => success.status)
      .catch(this.handleError);
  }
  // Fetch operator by id
  getOperatorById(operatorId: string): Observable<Operator> {
    const cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: cpHeaders });
    console.log(this.operatorUrl + '/' + operatorId);
    return this.http.get(this.operatorUrl + '/' + operatorId).map(this.extractData).catch(this.handleError);
  }
  // Update operator
  updateOperator(operator: Operator): Observable<number> {
    const cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: cpHeaders });
    return this.http.put(this.operatorUrl + '/' + operator.id, operator, options)
      .map(success => success.status)
      .catch(this.handleError);
  }
  // Delete operator
  deleteOperatorById(operatorId: string): Observable<number> {
    const cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: cpHeaders });
    return this.http.delete(this.operatorUrl + '/' + operatorId)
      .map(success => success.status)
      .catch(this.handleError);
  }
  private extractData(res: Response) {
    const body = res.json();
    return body;
  }
  private handleError(error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.status);
  }
}
