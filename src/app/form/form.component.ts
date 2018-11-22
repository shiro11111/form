import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {forbiddenNameValidator} from '../forbidden-name-validator.directive';
import { ForbiddenValidatorDirective } from '../forbidden-name.directive';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      name: this.fb.control(null, [
        Validators.required,
        Validators.pattern('^[a-zA-Z]*$')
      ]),
      pesel: this.fb.control( null,[
          Validators.required,
          Validators.minLength(11),
          Validators.maxLength(11),
          Validators.pattern('^[0-9]*$')
        ]
      )
    });
  }

  getErrorMessage() {
    return this.form.get('name').hasError('required') ? 'You must enter a value' :
      this.form.get('name').hasError('name') ? 'Not a valid name' :
        '';
  }

  getPeselErrorMessage() {
    return this.form.get('pesel').hasError('required') ? 'You must enter a value' :
      this.form.get('pesel').hasError('pesel') ? 'Not a valid pesel' :
        '';
  }
}
