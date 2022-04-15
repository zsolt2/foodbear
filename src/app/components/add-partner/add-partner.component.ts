import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Partner } from 'src/app/models/Partner';
import { PartnerService } from 'src/app/services/partner.service';

@Component({
  selector: 'app-add-partner',
  templateUrl: './add-partner.component.html',
  styleUrls: ['./add-partner.component.css']
})
export class AddPartnerComponent implements OnInit {

  partnerForm: FormGroup;
  serversideError: boolean = false;
  partners: Partner[]=[];

  constructor(public partnerService: PartnerService,
    public fb: FormBuilder) {
    this.partnerForm = this.fb.group({
      id!: [null],
      name!: ['', { validators: [Validators.required, Validators.minLength(3)] }],
      tel!: ['', { validators: [Validators.required, Validators.pattern(/^\+?[0-9]{4,}$/)] }],
      taxNumber!: ['', { validators: [Validators.required, Validators.maxLength(11), Validators.minLength(11)] }],
      address!: ['', { validators: [Validators.required, Validators.minLength(5)] }],
      foods!: [[]]
    });
  }
  async ngOnInit(): Promise<void> {
    try{
      this.partners = await this.partnerService.getAllPartners();
    }catch(err){
      
    }
  }

  async addPartner() {
    try {
      console.log(this.partnerForm.value);
      await this.partnerService.createPartner(this.partnerForm.value);
      this.serversideError = false;
      this.partners.push(this.partnerForm.value);
    } catch (err) {
      console.log(err);
      this.serversideError = true;
    }
  }

}
