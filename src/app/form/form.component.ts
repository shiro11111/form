import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {forbiddenNameValidator} from '../forbidden-name-validator.directive';


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
}
