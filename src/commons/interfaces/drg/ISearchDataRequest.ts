export interface ISearchDataRequest {
  dataUltimaAlteracao?: string,
  ids?: number[],
  numeroAtendimento?: string[],
  numeroAutorizacao?: string[],
  dataAltaInicial?: string,
  dataAltaFinal?: string,
  dataInternacaoInicial?: string,
  dataInternacaoFinal?: string,
  dataCadastroInicial?: string,
  dataCadastroFinal?: string,
  dataCadastroAltaInicial?: string,
  dataCadastroAltaFinal?: string,
  page?: number
}