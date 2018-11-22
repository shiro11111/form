import { AbstractControl } from '@angular/forms';

export function ValidatePesel(control: AbstractControl) {
    if (control.value &&  control.value.length !== 11) {
      return { invalidPesel: true };
    }
    return null;
}
