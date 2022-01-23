export const getApiGeneralProblem = (problem) => {
    if (!problem) return 'Error'
    switch (problem) {
        case 401:
        case 403:
            return 'no tiene los permisos para completar la acción.'
        case 404:
            return 'Ocurrio un error inesperado, por favor intente nuevamente en unos minutos.'
        case 409:
            return 'La entidad no se puede eliminar porque tiene entidades asociadas.'
        case 500:
            return 'Ocurrio un error interno en el servidor. Intente nuevamente en unos minutos.'
        default:
            return 'Ocurrio un error inesperado, por favor intente nuevamente en unos minutos.'
    }
}
