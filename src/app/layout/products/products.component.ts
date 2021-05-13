import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { ToastrService } from 'ngx-toastr';

import * as $  from 'jquery';
import { ProductsModel } from './models/products.model';
import { ProductsService } from './services/products.service';
import { Observable } from 'rxjs';
import { promise } from 'protractor';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  animations: [routerTransition()]

})
export class ProductsComponent implements OnInit {


  
  AllProducts:ProductsModel[];
  selectedItem = {}; 
  id:any = "";
  title = 'backendng';
  selectedImage: File = null;

  defaultImgUrl = '../../../assets/images/logo.png';

  constructor(
    private taskService: ProductsService
   , private toastr: ToastrService
    ) {   
      this.taskService.AllProducts.subscribe(res=>{
        console.log("res e", res);
        this.AllProducts = res;
        console.log("this.AllProducts e", this.AllProducts);
      })

  } 

  ngOnInit() {
    
  }

  showSuccess() {
    //this.toastr.success('Hello world!', 'Toastr fun!');
  }

  new(){
    this.selectedItem = {};
  }


  onSelect(event){
    var tmppath = URL.createObjectURL(event.target.files[0]);

    console.log("tmppath", tmppath);

    $('#AddEmpImage').fadeIn('fast').attr('src', tmppath)
    this.selectedImage = <File>event.target.files[0]; 

    console.log("this.selectedImage", this.selectedImage);

  }

  
 

  add(){
    var form = new FormData();
    form.append("image", this.selectedImage);
    form.append("name", $("#inptName").val());
    form.append("category", $("#inptCat").val());

    this.taskService.add(form).subscribe(res=> {
      var r: any = res;
      console.log("res", res);      
      this.toastr.success(r.message, "Success");
      console.log("save successfully");
      this.taskService.show('');
    },error=>{
      console.log("error", error);
      error.error.error.forEach(el => {
        this.toastr.error(el, "Error");
        console.log("save failed");
        
      });
      
    });
  }

  updateModelShow(product){
    this.selectedItem = product;

    console.log('selectedItem', this.selectedItem);

    $("#inptUpName").prop("value", this.selectedItem['name']);
    $("#inptUpCat").prop("value", this.selectedItem['category']);
    console.log("this.defaultImgUrl", this.defaultImgUrl);
    this.selectedItem['imgpath'] = this.selectedItem['imgpath'] != 0 ? this.selectedItem['imgpath'] : this.defaultImgUrl;

    console.log(" this.selectedItem['imgpath']",  this.selectedItem['imgpath']);

    $('#updateImage').attr('src', this.selectedItem['imgpath']);

    // old way
    // this.AllProducts.forEach(el=>{
    //   if( id == el.id ){
    //     this.id = el.id;
    //     $("#inptName").prop("value", el.name);
    //     $("#inptCat").prop("value", el.status);
    //   }
    // });
  }
  onSelectUpdateImg(event){
    var tmppath = URL.createObjectURL(event.target.files[0]);

    console.log("tmppath", tmppath);

    $('#updateImage').fadeIn('fast').attr('src', tmppath)
    this.selectedImage = <File>event.target.files[0]; 

    console.log("this.selectedImage", this.selectedImage);

  }

  update(){    
    var form = new FormData();
    form.append("id", this.selectedItem['id']);
    form.append("image", this.selectedImage);
    form.append("name", $("#inptUpName").val());
    form.append("category", $("#inptUpCat").val());

    this.taskService.update(form).subscribe(res=> {
      var r: any = res;
      console.log("res", res);      
      this.toastr.success(r.message, "Success");
      this.taskService.show('');
      this.selectedItem = {};
    },error=>{
      console.log("error", error);
      error.error.error.forEach(el => {
        this.toastr.error(el, "Error");
        this.selectedItem = {};        
      });
      
    });
  }

  search(v){
    this.taskService.show(v);
  }

  delete(id){
    this.taskService.delete(id).subscribe(res=> {
      var r: any = res;
      console.log("res", res);      
      this.toastr.success(r.message, "Success");
      this.taskService.show('');
    },error=>{
      console.log("error", error);
      error.error.error.forEach(el => {
        this.toastr.error(el, "Error");
        
      });
      
    });

  }
  

}
