import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Courier } from 'src/app/models/Courier';
import { Partner } from 'src/app/models/Partner';
import { CourierService } from 'src/app/services/courier.service';
import { PartnerService } from 'src/app/services/partner.service';

@Component({
  selector: 'app-add-courier',
  templateUrl: './add-courier.component.html',
  styleUrls: ['./add-courier.component.css']
})
export class AddCourierComponent implements OnInit {

  courierForm: FormGroup;
  serversideError: boolean = false;
  modifyEnabled: boolean = false;
  couriers: Courier[]=[];
  partners: Partner[]=[];

  constructor(private courierService: CourierService,
    private fb: FormBuilder,
    private partnerService: PartnerService) {
    this.courierForm = this.fb.group({
      id!: [null],
      name!: ['', {validators:[Validators.required, Validators.minLength(3)] , updateOn: 'blur' }],
      capacity!: ['', {validators:[Validators.required, Validators.min(0)] ,updateOn: 'blur' }],
      isAvailable!: ['true'],
      orders!: [],
      });
  }
  async ngOnInit(): Promise<void> {
    try{
      this.couriers = await this.courierService.getAll();
      this.partners = await this.partnerService.getAll();
    }catch(err){
      console.log(err);
    }
  }


  async addCourier(){
    try{
      this.modifyEnabled = false;
      this.courierForm.patchValue({id:null});
      let newCourier = this.courierForm.value;
      newCourier.orders = [];
      const result = await this.courierService.create<Courier>(newCourier);
      this.couriers.push(result);
    }catch(err){
      console.log(err);
    }
  }

  async updateCourier(){
    try{
      console.log(this.courierForm.value);
      const result = await this.courierService.update<Courier>(this.courierForm.value);
      this.couriers = this.couriers.map(f=>f.id===result.id?result:f);
      console.log(result);
    }catch(err){
      console.log(err);
    }
  }

  async deleteCourier(courier: Courier){
    try{
      await this.courierService.delete(courier.id);
      this.couriers = this.couriers.filter(f=>f.id!=courier.id);
    }catch(err){
      console.log(err);
    }
  }

  selectCourier(courier:Courier){
    this.courierForm.patchValue(courier);
    this.modifyEnabled = true;
  }

}
