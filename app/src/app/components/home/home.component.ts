import { Component, OnInit } from '@angular/core';
import { ProductsService } from './../../services/products.service';
import { map } from 'rxjs/operators';
import { Product } from './../../models/product';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [ProductsService]
})
export class HomeComponent implements OnInit {


  products: Product[];
  product: Product;
  categoryProduct: any[];
  file: [];
  selectedProducts: Product[];
  uploadedFiles: any[] = [];
  productDialog: boolean = false;
  submitted: boolean;
  multiple: boolean = false;
  editable: boolean = false;


  constructor(private productService: ProductsService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.getData();
    this.categoryProduct = [
      { label: 'Desayuno', value: 'Desayuno' },
      { label: 'Almuerzo', value: 'Almuerzo' },
      { label: 'Postre', value: 'Postre' },
      { label: 'Cena', value: 'Cena' }
    ];

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
            image: item.image
          }
          return product
        })
      }))
      .subscribe(data => this.products = data);
  }

  clearData() {
    this.product = {} as Product;
    this.productDialog = false;
    this.editable = false;
  }

  onFileSelect(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.file = file;
    }
  }

  changeFile(event: any) {
    if (event.files.length > 0) {
      const file = event.files[0];
      this.file = file;
    }
  }

  saveProduct() {

    let formData: any = new FormData();
    let promo = 0;
    formData.append("productName", this.product.name);
    formData.append("category", this.product.category);
    formData.append("detail", this.product.detail);
    formData.append("price", this.product.price);
    formData.append("isPromotion", promo);
    formData.append("sale", this.product.sale);
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

  editableProduct() {

    let formData: any = new FormData();
    let promo = 0;
    formData.append("id", this.product.id);
    formData.append("productName", this.product.name);
    formData.append("category", this.product.category);
    formData.append("detail", this.product.detail);
    formData.append("price", this.product.price);
    formData.append("isPromotion", promo);
    formData.append("sale", this.product.sale);
    formData.append("file", (this.file ? this.file : null));

    this.productService.editProducts(formData)
      .subscribe(data => {
        if (data.code === 0) {
          this.getData();
          this.clearData();
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product edited', life: 3000 });
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

  deleteSelectedProducts(product: Product) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + product.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.productService.deleteProduct(product.id)
          .subscribe(data => {
            if (data.code === 0) {
              this.getData();
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
            }
          }
          );
      }
    });
  }

  editProduct(product: Product) {
    this.product = { ...product };
    this.productDialog = true;
    this.editable = true;
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  openNew() {
    this.product = {} as Product;
    this.productDialog = true;
  }
}


