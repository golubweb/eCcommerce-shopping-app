export const ValidationRegister: { [key: string]: RegExp } = {
    name:        /^[^;]{3,30}$/,
    lastname:    /^[^;]{3,30}$/,
    displayName: /^[^;]{3,30}$/,
    phone:       /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
    country:     /^[^;]+$/,
    email:       /^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/,
    password:    /^.{7,100}$/
}