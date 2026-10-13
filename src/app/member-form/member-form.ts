import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

import {
FormGroup,
FormControl,
ReactiveFormsModule
} from '@angular/forms';

import { MemberService } from '../../services/member';

@Component({
selector: 'app-member-form',

imports: [
RouterModule,
MatFormFieldModule,
MatInputModule,
MatSelectModule,
MatButtonModule,
ReactiveFormsModule
],

templateUrl: './member-form.html',
styleUrl: './member-form.css'
})
export class MemberForm implements OnInit {

// Injection de dépendances
constructor(
private memberService: MemberService,
private router: Router,
private activatedRoute:ActivatedRoute
) {}

form!: FormGroup;
idCourant!: string;

// Initialisation du formulaire
ngOnInit() {
  //recupere route actif 
  this.idCourant = this.activatedRoute.snapshot.params['id'];
  if (this.idCourant){
    this.memberService.getMemberById(this.idCourant).subscribe((member) => {
      this.form = new FormGroup({
        cin: new FormControl(member.cin),
        name: new FormControl(member.name),
        type: new FormControl(member.type),
        createDate: new FormControl(member.createDate)
      });
    });

  }else{
    this.form = new FormGroup({
    cin: new FormControl(null),
    name: new FormControl(null),
    type: new FormControl(null),
    createDate: new FormControl(null)
    });

  }
  // si id existe ==> getMemberById(id) ==> patchValue
  //Sinon je suis dans create mode ==> form vide
}

submit() {

// Récupérer les données du formulaire
console.log(this.form.value);

// update le membre
if (this.idCourant){
  this.memberService.updateMember(this.idCourant, this.form.value).subscribe(() => {
    this.router.navigate(['']);
  });
}else{
  //ajouter le membre
  this.memberService.AddMember(this.form.value).subscribe(() => {
  this.router.navigate(['']);

  });
}


}
}
