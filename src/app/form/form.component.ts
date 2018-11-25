import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ValidatePesel} from '../pesel.validator';
import {filter} from 'rxjs/operators';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  form: FormGroup;

  peselInfo: string;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.createForm();

    this.form.get('pesel').valueChanges.pipe(
      filter((value: string) => !!value)
    ).subscribe((value: string) => {
      console.log(ValidatePesel(this.form.get('pesel')));
    });
  }

  createForm() {
    this.form = this.fb.group({
      name: this.fb.control(null, [
        Validators.required,
        Validators.pattern('^[a-zA-Z]*$')
      ]),
      pesel: this.fb.control(null, [
          Validators.required,
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
      this.form.get('pesel').hasError('required') ? 'Not a valid pesel' :
        '';
  }

  getPeselData(peselArg: string): boolean {
    const pesel = peselArg.split('').slice(0, 10);

    const controlNumber = peselArg.split('').pop();

    const multipliers = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];

    let sum = 0;
    for (let i = 0; i < pesel.length; i++) {
      sum += +pesel[i] * multipliers[i];
    }

    const result = (10 - (sum % 10)) % 10;

    return +result === +controlNumber;
  }

  getBirthDate(peselArg): string {
    return 'Date of birth is ' + peselArg.substring(0, 6);
  }

  getGender(peselArg): string {
    if (peselArg.charAt(9) % 2 === 0) {
      return 'I am a woman';
    } else {
      return 'I am a man';
    }
  }

  onGetPeselInfo(): void {
    const value = this.form.get('pesel').value;
    this.peselInfo = this.getBirthDate(value) + this.getGender(value);
  }
}
