interface IInstituicao {
  codigo: number,
  nome: string
}

interface IHospital {
  codigo: number,
  nome: string,
  cnes: number
}

interface IBeneficiario {
  codigoPaciente: string,
  plano: string,
  dataNascimento: string,
  sexo: "M" | "F" | "I",
  recemNascido: "S" | "N",
  particular: "S" | "N",
  idadeEmAnos: number,
  idadeEmMeses: number,
  idadeEmDias: number
}

interface IMedico {
  nome: string,
  uf: string,
  crm: string,
  codigoEspecialidade: number,
  especialidade: string,
  medicoResponsavel: "S" | "N",
  tipoAtuacao: "I" | "C" | "R"
}

interface ICidPrimario {
  codigo: string,
  descricao: string,
  sensivelCuidadoPrimario: "S" | "N"

}

interface ICidSecundario {
  codigo: string,
  descricao: string
}

interface IProcedimento {
  codigo: string,
  nome: string,
  porte: string,
  dataAutorizacao: string,
  dataSolicitacao: string,
  dataExecucao: string,
  dataExecucaoFinal: string,
  medico: IMedico[]
  tipoAtuacaoProcedimento: "A" | "A2" | "A3" | "R"
}

interface ICTI {
  dataInicial: string,
  dataFinal: string,
  condicaoAlta: string,
  tipo: string,
  permanenciaPrevistaNaAlta: number,
  permanenciaReal: number,
  leito: string,
  medico: IMedico,
  hospital: IHospital,
  cidPrincipal: ICidPrimario,
  drgBrasilRefinado: IDrgBrasilRefinado,
  drgBrasil: IDrgBrasil,
}

interface IDrgBrasil {
  codigo: number,
  descricao: string,
  permanenciaPrevistaNaInternacao: number,
  permanenciaPrevistaNaAlta: number,
  tipo: string,
  peso: number,
  mdc: IMdc,
}

interface IDrgBrasilRefinado {
  codigo: number,
  descricao: string,
  tipo: string,
  peso: number,
  mdc: IMdc
}

interface IMdc {
  codigo: string,
  descricao: string
}

interface IRn {
  pesoNascimento: number,
  idadeGestacional: number,
  comprimento: number,
  sexo: "M" | "F" | "I",
  nascidoVivo: "S" | "N",
  tocotraumatismo: "S" | "N",
  apgar: "S" | "N",
  apgarQuintoMinuto: number,
  alta48horas: "S" | "N",
}

interface ICondicaoAdquirida {
  codigo: string,
  descricao: string,
  dataOcorrencia: string,
  dataManifestacao: string,
  Medico: IMedico,
  grave: 'S' | 'N',
}

interface IAltaAdministrativa {
  numeroAtendimento: string,
  numeroAutorizacao: string,
  dataAutorizacao: string,
  dataAtendimentoInicial: string,
  dataAtendimentoFinal: string
}

interface IAnaliseCritica {
  dataAnalise: string,
  analiseCritica: string,
}

interface ISuporteVentilatorio {
  tipo: string,
  tipoInvasivo: string,
  local: string,
  dataInicial: string,
  dataFinal: string,
  condicaoAdquiridaSuporteVentilatorio: any,
}

interface ISondaVesicalDeDemora {
  local: string,
  dataInicial: string,
  dataFinal: string,
  condicaoAdquiridaSondaVesicalDeDemora: ICondicaoAdquiridaSondaVesicalDeDemora
}

interface ICondicaoAdquiridaSondaVesicalDeDemora {
  codigo: string,
  descricao: string,
  dataOcorrencia: string,
}

interface ICateterVascularCentral {
  local: string,
  dataInicial: string,
  dataFinal: string,
  condicaoAdquiridaCateterVascularCentral: ICondicaoAdquiridaCateterVascularCentral,
}

interface ICondicaoAdquiridaCateterVascularCentral {
  codigo: string,
  descricao: string,
  dataOcorrencia: string,
}

interface IPartoAdequado {
  classificacaoRobson: string
}

interface IDrgAdmissional {
  codigo: string,
  descricao: string
}

interface ICausaExterna {
  descricao: string,
  tempo: string,
  dataInicial: string,
  dataFinal: string,
}

interface IVariaveis {
  caGrave: "S" | "N",
  gerenciavelAtencaoPrimaria: "S" | "N",
  gerenciavelEmergencia: "S" | "N"
}

export interface DataItem {
  id: number,
  situacao: "1" | "2" | "3" | "4",
  caraterInternacao: "1" | "2" | "3" | "4" | "9",
  numeroOperadora: string,
  numeroRegistro: string,
  numeroAtendimento: string,
  numeroAutorizacao: string,
  dataInternacao: string,
  dataAlta: string,
  condicaoAlta: "A" | "I" | "D" | "P" | "C" | "L" | "O" | "E",
  dataAutorizacao: string,
  internadoOutrasVezes: "S" | "N",
  hospitalInternacaoAnterior: "O" | "N",
  reinternacao: "S" | "N",
  recaida: "S" | "N",
  origemReadmissao30Dias: "S" | "N" | "Não completou prazo de 30 dias",
  origemRecaida30Dias: "S" | "N" | "Não completou prazo de 30 dias",
  idInternacaoRecaida: number,
  dataPrevistaAlta: string,
  permanenciaPrevistaNaInternacao: number,
  permanenciaPrevistaNaAlta: number,
  permanenciaReal: number,
  percentil: string,
  procedencia: "M" | "I" | "D" | "C" | "L" | "R" | "U",
  ventilacaoMecanica: "S" | "N",
  totalHorasVentilacaoMecanica: "A" | "B",
  modalidadeInternacao: "H" | "D",
  dataCadastro: string,
  usuarioCadastro: string,
  dataCadastroAlta: string,
  usuarioCadastroAlta: string,
  dataUltimaAlteracao: string,
  usuarioUltimaAlteracao: string,
  correcaoRegistro: "S" | "N",
  usuarioCorrecao: string,
  dataUltimoRecalculo: string,
  leito: string,
  condicaoAdquiridaGrave: "S" | "N",
  registroPacienteMae: number,
  maeNaoIdentificada: 'S' | 'N',
  estado: string,
  cidade: string,
  instituicao: IInstituicao,
  hospital: IHospital,
  beneficiario: IBeneficiario,
  medico: IMedico[],
  cidSecundario: ICidSecundario[],
  procedimento: IProcedimento[],
  cti: ICTI[],
  rn: IRn[],
  condicaoAdquirida: ICondicaoAdquirida[],
  altaAdministrativa: IAltaAdministrativa[],
  analiseCritica: IAnaliseCritica[],
  suporteVentilatorio: ISuporteVentilatorio[],
  cidPrincipal: ICidPrimario,
  drgBrasilRefinado: IDrgBrasilRefinado,
  drgBrasil: IDrgBrasil,
  sondaVesicalDeDemora: ISondaVesicalDeDemora[],
  cateterVascularCentral: ICateterVascularCentral[],
  partoAdequado: IPartoAdequado,
  drgAdmissional: IDrgAdmissional,
  causaExterna: ICausaExterna[],
  variaveis: IVariaveis
}

export interface ISearchDataResponse {
  total: number,
  items: DataItem[]
}