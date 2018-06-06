const validator = event => {
    let name = event.target.name;
    let value = event.target.value;
    let newValue
    
    if (!value) return value

    switch (name) {
        case 'razon':
            newValue = value;
            break;

        case 'nombre_entrega':
            newValue = value.toUpperCase();
            break;

        case 'numero_referencia':
            newValue = value;
            break;

        default:
            break
    }

    return newValue;
}

export default validator;