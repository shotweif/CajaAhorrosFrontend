export interface Client {
    CorreoElectronico: string;
    Nombre: string;
    Phone: string;
    Password: string;
    Rol: string;
}
export interface LoginRequest {
    CorreoElectronico: string;
    Password: string;
}

export interface ClientLoged {
    CorreoElectronico: string;
    Nombre: string;
    Phone: string;
    Rol: string;
    Token: string;
}