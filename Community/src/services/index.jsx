export { createDeuda, getAllDeudas, getDeudaById, getDeudaByResidenciaId} from './contabilidad/DeudaService';
export { createGasto, getAllGastos, getGastoById, getGastoByCondominioId} from './contabilidad/GastoService';
export { createPago, getAllPagos, getPagoById, getPagoByDeudaId, getPagoByUsuarioId, getPagoByContableId} from './contabilidad/PagoService';
export { createParametro, getAllParametros, getParametroById, getParametroByTipoId, getParametroByActivo} from './contabilidad/ParametroService';