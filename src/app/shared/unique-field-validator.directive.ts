import { Validator, NG_VALIDATORS, AbstractControl } from '@angular/forms';
import { Directive, Input, Renderer2, ElementRef, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Filter } from '../auth/auth.model';
import { AuthenticationService } from '../auth/authentication.service';

@Directive({
    selector: '[isUniqueField]',
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: UniqueFieldsValidatorDirective,
        multi: true
    }]
})
export class UniqueFieldsValidatorDirective implements Validator, OnInit {
    @Input() field;
    isUniqueUsername: boolean;
    searchTerm$ = new Subject<object>();

    constructor(private renderer: Renderer2, private el: ElementRef, private auth: AuthenticationService) {
        this.renderer.listen(this.el.nativeElement, 'keyup', (event) => {
            let fieldValue = event.target.value.toLowerCase();
            this.checkFieldUnique(this.field, fieldValue);
        });
    }

    ngOnInit() {
        this.auth.checkFieldUnique(this.searchTerm$)
            .subscribe((result: boolean) => {
                this.isUniqueUsername = result;
            });
    }

    checkFieldUnique(field: string, fieldValue: string) {
        let filter: Filter = { field, fieldValue }
        this.searchTerm$.next(filter);
    }

    validate(control: AbstractControl): { [key: string]: any } | null {
        if (!this.isUniqueUsername) {
            return { 'notUnique': true };
        }
        return null;
    }
}