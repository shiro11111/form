import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatePesel } from '../pesel.validator';
import { filter } from 'rxjs/operators';
import { PeselUtil } from '../pesel.util';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  form: FormGroup;

  peselInfo: string;

  birthDate: Date = null;
  sex: string = null;

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
          Validators.pattern('^[0-9]*$'),
          ValidatePesel
        ]
      ),
      email: this.fb.control(null, [
        Validators.required
      ])
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

  getGender(peselArg): string {
    if (peselArg.charAt(9) % 2 === 0) {
      return ' I am a woman';
    } else {
      return ' I am a man';
    }
  }

  onGetPeselInfo(): void {
    // const value = this.form.get('pesel').value;
    // this.peselInfo = this.getDateString(value) + this.getGender(value);
    const peselArg = this.form.get('pesel').value;
    this.birthDate = PeselUtil.getBirthDate(peselArg);
    this.sex = PeselUtil.getSex(peselArg);
  }

  //
  // getBirthYearFromPesel(peselArg: string): string {
  //   let birthYear = '';
  //   if (+peselArg.charAt(2) === 0 || 1) {
  //     birthYear = '19' + peselArg.substring(0, 2);
  //   } else if (+peselArg.charAt(2) === 2 || 3) {
  //     birthYear = '20' + peselArg.substring(0, 2);
  //   } else if (+peselArg.charAt(2) === 4 || 5) {
  //     birthYear = '21' + peselArg.substring(0, 2);
  //   } else if (+peselArg.charAt(2) === 6 || 7) {
  //     birthYear = '22' + peselArg.substring(0, 2);
  //   }
  //   return birthYear;
  // }
  //
  // getMonthFromPesel(peselArg: string): string {
  //   let month = '';
  // if (+peselArg.charAt(2) === 0) {
  //   month = peselArg.substring(2, 4);
  // } else if (+peselArg.charAt(2) === 2 || 3) {
  //   month = '0' + peselArg.substring(2, 4);
  // } else if (+peselArg.charAt(2) === 4 || 5) {
  //   month = '0' + peselArg.substring(2, 4);
  // } else if (+peselArg.charAt(2) === 6 || 7) {
  //   month = '0' + peselArg.substring(2, 4);
  // } else if (+peselArg.charAt(2) === 1) {
  //   month = peselArg.substring(2, 4);
  // }
  // return month;
  // }

  // getDateString(pesel: string): Date {
  //  return PeselUtil.getBirthDate(pesel);
  // }
}

