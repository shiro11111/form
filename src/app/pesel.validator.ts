import {AbstractControl} from '@angular/forms';

export function ValidatePesel(control: AbstractControl) {
  if (control.value && control.value.length !== 11) {
    const pesel = control.value.split('').slice(0, 10);

    const controlNumber = control.value.split('').pop();

    const multipliers = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];

    let sum = 0;
    for (let i = 0; i < pesel.length; i++) {
      sum += +pesel[i] * multipliers[i];
    }

    const result = (10 - (sum % 10)) % 10;

    // console.log(+result !== +controlNumber);
    // console.log(+control.value.substring(2, 4) > 12);
    // console.log(+control.value.substring(4, 6) > 31);

    if ((+result !== +controlNumber) || (+control.value.substring(2, 4) > 12) || (+control.value.substring(4, 6) > 31)) {
      return {invalidPesel: true};
    }
  }
  return null;
}
