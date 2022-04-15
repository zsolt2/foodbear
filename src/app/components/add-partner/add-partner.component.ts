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
  modifyEnabled: boolean = false;
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
      this.partnerForm.patchValue({id:null});
      console.log(this.partnerForm.value);
      const newPartner = await this.partnerService.createPartner(this.partnerForm.value);
      this.serversideError = false;
      this.partners.push(newPartner);
    } catch (err) {
      console.log(err);
      this.serversideError = true;
    }
  }

  async updatePartner() {
    try{
      console.log('in update',this.partnerForm.value);
      const updatedPartner = await this.partnerService.updatePartner(this.partnerForm.value);
      this.partners = this.partners.map(p=>p.id===updatedPartner.id?updatedPartner:p);
    }catch(err){
      console.log(err);
    }
  }

  async deleteParnter(parter:Partner){
    try{
      if(document.getElementById(parter.id.toString())?.classList.contains('selected') ){
        this.partnerForm.reset();
        this.modifyEnabled =false;
      }
      await this.partnerService.deletePartner(parter.id);
      
      this.partners = this.partners.filter(p=>p.id!==parter.id);
    }catch(err){
      console.log(err);
    }
  }

  modifyPartner(partner:Partner){
    //partner.id = null;
    this.modifyEnabled = true;
    const classes = ["selected","border","border-warning", "rounded", "border-3"];
    this.partnerForm.patchValue(partner);
    document.querySelector('.selected')?.classList.remove(...classes);
    //document.querySelectorAll('.partner').forEach(p=>p.classList.remove(classes));
    let selected = document.getElementById(partner.id.toString());
    console.log(selected);
    selected?.classList.add(...classes);
    console.log('after modify',this.partnerForm.value);
  }

  trackElement(index: number, element: any) {
    return element ? element.id : null
  }

}
