import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProductsModel } from '../models/products.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  AllProducts = new BehaviorSubject<ProductsModel[]>(null);
  private baseURL = "http://127.0.0.1:8000/api/";

  constructor(private http: HttpClient) { 
    this.show('');
  }


  add(form){
    return this.http.post(this.baseURL+'products/add', form);
  }

  delete(id){
    return this.http.post(this.baseURL+'products/delete?id='+id, null);
  }

  update(form){
    return this.http.post(this.baseURL+'products/update', form);
  }

  show(keys){

    console.log("DB request !");

    return this.http.post(this.baseURL+'products/show?keywords='+keys, null).subscribe( res=>{
      var r:any = res;
      this.AllProducts.next(r.products);

    });
  }

  getProdutData(param){
    return this.http.post(this.baseURL+'products/get-products', param);
  }

}
