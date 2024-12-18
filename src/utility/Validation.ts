
export function validateForm(data: any) {
    const { CorreoElectronico, Nombre, Phone, Password } = data;
    if(CorreoElectronico === '' || Nombre === '' || Password === ''){
        console.log('Existen campos obligatorios vacios.');
        return false;
    }
    console.log(Phone)
    if(Phone && Phone.length !== 10) {
        console.log('Numero invalido.');
        return false;
    }

    return true;
}