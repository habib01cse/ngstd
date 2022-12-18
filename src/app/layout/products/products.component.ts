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
  files: any;
  page: any = 1;
  limit: any = 2;
  skip: any;
  pageSize: any = 2;
  totalProduct: any = 5;
  productObj = {    
    id: null,
    image: '',
    name: '',
    category: '',
    imgpath: '',
  }
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
      // this.selectedItem = this.productObj;
      // this.taskService.AllProducts.subscribe(res=>{
      //   console.log("res e", res);
      //   this.AllProducts = res;
      //   console.log("this.AllProducts e", this.AllProducts);
      // })

  } 

  ngOnInit() {
    this.getProductData();
  }

  showSuccess() {
    //this.toastr.success('Hello world!', 'Toastr fun!');
  }

  new(){
    this.selectedItem = this.productObj;
  }


  onSelect(event){
    var tmppath = URL.createObjectURL(event.target.files[0]);

    console.log("tmppath", tmppath);

    $('#AddEmpImage').fadeIn('fast').attr('src', tmppath)
    this.selectedImage = <File>event.target.files[0]; 
    console.log('event.target.files', event.target.files);

    console.log("this.selectedImage", this.selectedImage);

  }

   /* base_64 image upload
        $real_image = request($field_name);
        list($type, $data) = explode(';', $real_image);
        list(, $ext) = explode('/', $type);
        $image_name = time().'.'.$ext;
        $imagePath = path/.$image_name;*/
 

        


        /* base_64 imag upload
                let file = e.target.files[0];
                let reader = new FileReader();

                reader.readAsDataURL(file);
                reader.onloadend = (file) => {
                    this.image = reader.result;
                }*/

  add(){
    var form = new FormData();
  

    form.append("image", this.selectedImage);
    form.append("name", $("#inptName").val());
    form.append("category", $("#inptCat").val());

    console.log('hello');
    console.log('form after', form.get('name'));



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
      this.selectedItem = this.productObj;
    },error=>{
      console.log("error", error);
      error.error.error.forEach(el => {
        this.toastr.error(el, "Error");
        this.selectedItem = this.productObj;        
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

  getProductData(){
    if(this.page == 1){
      this.skip = 0
    }else{
      this.skip = (this.page -1) * this.limit; 
    }
    let requestOpj = {
      limit: this.limit,
      skip: this.skip
    }
    console.log('requestOpj', requestOpj);
    this.taskService.getProdutData(requestOpj).subscribe(res=> {
      var r: any = res;
      this.AllProducts = r.products;
      this.totalProduct = r.total;
      console.log("res", res);      
      //this.toastr.success(r.message, "Success");
      //this.taskService.show('');
    },error=>{
      console.log("error", error);
      error.error.error.forEach(el => {
        this.toastr.error(el, "Error");        
      });      
    });
  }
  
  imageUpload(event){
    this.files = event.target.files[0];
    console.log('this.files', this.files);

  }

}
