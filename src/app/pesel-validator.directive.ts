import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator } from '@angular/forms';
import { ValidatePesel } from './pesel.validator';


@Directive({
  selector: '[appValidatePesel]',
  providers: [{provide: NG_VALIDATORS, useExisting: ValidatePeselDirective, multi: true}]
})

export class ValidatePeselDirective implements Validator {

  validate(control: AbstractControl): {[key: number]: any} | null {
    return ValidatePesel(control);
  }
}
