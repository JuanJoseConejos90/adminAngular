import { Component, OnInit } from '@angular/core';
import { ProductsService } from './../../services/products.service';
import { map } from 'rxjs/operators';
import { Product } from './../../models/product';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [ProductsService]
})
export class HomeComponent implements OnInit {


  products: Product[] = [];
  productsEdit: Product[] = [];
  file: [] = [];
  showModal: boolean = false;
  showModalEdit: boolean = false;
  title: any;
  name: any;
  category: any;
  detail: any;
  price: any;
  isPromotion: any;
  sale: any;
  image: any;

  constructor(private productService: ProductsService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.productService.getAllproducts()
      .pipe(map(data => {
        return data.products.map(item => {
          const product: Product = {
            id: item.id,
            name: item.name,
            category: item.category,
            detail: item.detail,
            price: item.price,
            isPromotion: item.isPromotion,
            sale: item.sale,
            image: null
          }
          return product
        })
      }))
      .subscribe(data => this.products = data);
  }

  clearData() {
    this.showModal = false;
    this.title = "";
    this.name = "";
    this.category = "";
    this.detail = "";
    this.price = "";
    this.isPromotion = "";
    this.sale = "";
  }


  show() {
    this.showModal = true;
    this.title = "Add";
  }

  hide() {
    this.showModal = false;
  }

  hideEdit() {
    this.showModalEdit = false;
  }

  onFileSelect(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.file = file;
    }
  }

  onChangeCategory(event: any) {
    if (event.target.value) {
      const category = event.target.value;
      this.category = category;
    }
  }

  onChangeName(event: any) {
    if (event.target.value) {
      const name = event.target.value;
      this.name = name;
    }
  }

  onChangeDetail(event: any) {
    if (event.target.value) {
      const detail = event.target.value;
      this.detail = detail;
    }
  }

  onChangePrice(event: any) {
    if (event.target.value) {
      const price = event.target.value;
      this.price = price;
    }
  }

  onChangeSale(event: any) {
    if (event.target.value) {
      const sale = event.target.value;
      this.sale = sale;
    }
  }

  addProducts() {

    let formData: any = new FormData();
    let promo = this.sale > 0 ? 1 : 0;
    formData.append("productName", this.name);
    formData.append("category", this.category);
    formData.append("detail", this.detail);
    formData.append("price", parseFloat(this.price));
    formData.append("isPromotion", promo);
    formData.append("sale", parseFloat(this.sale));
    formData.append("file", this.file);

    this.productService.createdProducts(formData)
      .subscribe(data => {
        if (data.code === 0) {
          this.getData();
          this.clearData();
        }
      }
      );

  }

  deleteProduct(id: number) {
    if (id) {
      this.productService.deleteProduct(id)
        .subscribe(data => {
          if (data.code === 0) {
            this.getData();
          }
        }
        );
    }

  }

  getProductById(id: number) {

    if (id) {

      this.productService.getById(id)
        .pipe(map(data => {
          return data.products.map(item => {
            const product: Product = {
              id: item.id,
              name: item.name,
              category: item.category,
              detail: item.detail,
              price: item.price,
              isPromotion: item.isPromotion,
              sale: item.sale,
              image: item.image
            }
            return product
          })
        }))
        .subscribe(data => this.productsEdit = data);

      this.showModalEdit = true;
      this.title = "Edit";

    }
  }

}
