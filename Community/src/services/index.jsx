export { createDeuda, getAllDeudas, getDeudaById, getDeudaByResidenciaId} from './cuentas/DeudaService';
export { createGasto, getAllGastos, getGastoById, getGastoByCondominioId} from './cuentas/GastoService';
export { createPago, getAllPagos, getPagoById, getPagoByDeudaId, getPagoByUsuarioId, getPagoByContableId} from './cuentas/PagoService';
export { createParametro, getAllParametros, getParametroById, getParametroByTipoId, getParametroByActivo} from './cuentas/ParametroService';