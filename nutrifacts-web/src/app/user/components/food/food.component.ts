import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { FoodDataService } from '../../user-services/foodDataService/food-data.service';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.scss']
})
export class FoodComponent implements OnInit {

  // id: any = this.activatedroute.snapshot.params['id'];
  foodData:any;
  isSpinning = false;

  constructor(private activatedroute: ActivatedRoute,
    private foodDataService:FoodDataService,
    private notification: NzNotificationService,) { }

  ngOnInit(): void {
    this.getDataByFoodId();
  }

  getDataByFoodId(){
    this.isSpinning = true;
    this.foodDataService.getAllByUser().subscribe(res =>{
      console.log(res.data);
       this.foodDataService.getFoodById(res.data).subscribe(res =>{
      this.foodData = res;
      console.log(this.foodData);
      this.isSpinning = false
    })
    })
  }

  deleteFavorites(fdcId){
    this.isSpinning = true;
    this.foodDataService.deleteFavourite(fdcId).subscribe(res =>{
      this.isSpinning = false;
        if(res.status == "OK"){
          this.getDataByFoodId();
          this.notification
          .success(
            'SUCCESS',
            `Removed From Favorites List Successfully!!!`,
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
