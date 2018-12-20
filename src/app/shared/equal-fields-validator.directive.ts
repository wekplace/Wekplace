import { Validator, NG_VALIDATORS, AbstractControl } from '@angular/forms';
import { Directive, Input } from '@angular/core';

@Directive({
    selector: '[isEqualFields]',
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: EqualFieldsValidatorDirective,
        multi: true
    }]
})
export class EqualFieldsValidatorDirective implements Validator {
    @Input() compareFieldControl;
    validate(control: AbstractControl): {[key: string]: any} | null {
        if (this.compareFieldControl && this.compareFieldControl.value !== control.value) {
            return { 'notEqual': true};
        }
        return null;
    }
}
