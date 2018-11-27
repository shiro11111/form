import { AbstractControl } from '@angular/forms';

export function ValidatePesel(control: AbstractControl) {
  if (control.value) {
    if (control.value.length !== 11) {
      return { invalidPesel: true };
    }
    const pesel = control.value.split('').slice(0, 10);

    const controlNumber = control.value.split('').pop();

    const multipliers = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];

    let sum = 0;
    for (let i = 0; i < pesel.length; i++) {
      sum += +pesel[i] * multipliers[i];
    }

    const result = (10 - (sum % 10)) % 10;
    if (+result !== +controlNumber) {
      return { invalidPesel: true };
    }
}
  return null;
}
