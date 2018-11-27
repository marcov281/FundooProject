import { FormControl, AbstractControl } from '@angular/forms';
// import { AbstractClassPart } from '@angular/compiler/src/output/output_ast';
export function passMatch(control: AbstractControl){
    if(control && (control.value !== null || control.value !== undefined)){
        const confirm_password = control.value;

        const passControl = control.root.get('password');
        if(passControl){
            const passValue = passControl.value;
            if(passValue !== confirm_password){
                return{
                    isError: true
                };
            }
        }
    }
    return null;
}