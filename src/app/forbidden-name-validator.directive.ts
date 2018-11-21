import {Directive} from '@angular/core';
import {AbstractControl, ValidatorFn} from '@angular/forms';

@Directive({
  selector: '[appForbiddenNameValidator]'
})

export function forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const forbidden = nameRe.test(control.value);
    return forbidden ? {'forbiddenName': {value: control.value}} : null;
  };
}


