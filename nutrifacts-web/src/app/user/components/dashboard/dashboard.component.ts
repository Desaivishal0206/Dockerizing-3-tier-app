import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { FoodDataService } from '../../user-services/foodDataService/food-data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  isSpinning = false;
  foodData: any = [];
  validateForm!: FormGroup;

  currentPage: any = 1;
  total: any;
  radioValue = 'Latest';

  constructor(private foodDataService: FoodDataService,
    private fb: FormBuilder,
    private notification: NzNotificationService,) { }

    ngOnInit(): void {
      this.validateForm = this.fb.group({
        query: [null, Validators.required],
        dataType: [null, null],
        sort: [null, null],
        sortBy: [null, null],
        brand: [null, null],
      });
    }
  

  getFoodData() {

    this.isSpinning = true;
    this.foodDataService.searchFood(this.validateForm.value, this.currentPage).subscribe(res => {
      console.log("res", res);
      this.total = res.totalPages * 10;
      this.foodData = res.foods;
      this.isSpinning = false;
    })
  }

  submitForm(): void {
    this.getFoodData();
  }


  pageIndexChange(value) {
    console.log(value);
    this.currentPage = value;

    this.getFoodData();

  }

  addToFavorites(foodId:String){
    this.isSpinning = true;
    const data = {
      fdcId: foodId
    }
    this.foodDataService.addToFavorites(data).subscribe(res =>{
      this.isSpinning = false;
        if(res.status == "CREATED"){
          this.notification
          .success(
            'SUCCESS',
            `Add In Favorites List Successfully!!!`,
            { nzDuration: 5000 }
          );
        }else{
          this.notification
          .error(
            'ERROR',
            `${res.message}`,
            { nzDuration: 5000 }
          )
        }
      });
  }

}

