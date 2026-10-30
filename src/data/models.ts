import { DeclarationModel } from '../types/declaration';
import { formatBrazilianDate } from '../utils/masks';

export const DECLARATION_MODELS: DeclarationModel[] = [
  {
    id: 'residencia',
    slug: 'declaracao-de-residencia',
    title: 'Declaração de Residência',
    shortTitle: 'Residência',
    category: 'residencia',
    badge: 'Mais Utilizada',
    description:
      'Serve para quem não possui comprovante de endereço no próprio nome (mora com pais, cônjuge, parentes ou aluguel informal sem contrato). Tem plena eficácia legal em bancos, faculdades e cadastros públicos.',
    whenToUse:
      'Utilize ao abrir conta em banco, fazer matrícula em escola/universidade, cadastros no SUS, DETRAN ou concursos públicos quando as contas de luz ou água estão no nome de terceiros.',
    legalBase: 'Lei Federal nº 7.115, de 29 de agosto de 1983 e Art. 299 do Código Penal.',
    fields: [
      { id: 'nome', label: 'Nome Completo do Declarante', type: 'text', placeholder: 'Ex: Maria da Silva Souza', required: true, gridSpan: 'full' },
      { id: 'nacionalidade', label: 'Nacionalidade', type: 'text', placeholder: 'brasileiro(a)', defaultValue: 'brasileiro(a)', required: true, gridSpan: 'half' },
      { id: 'estadoCivil', label: 'Estado Civil', type: 'select', options: [
        { value: 'solteiro(a)', label: 'Solteiro(a)' },
        { value: 'casado(a)', label: 'Casado(a)' },
        { value: 'em união estável', label: 'União Estável' },
        { value: 'divorciado(a)', label: 'Divorciado(a)' },
        { value: 'viúvo(a)', label: 'Viúvo(a)' }
      ], defaultValue: 'solteiro(a)', required: true, gridSpan: 'half' },
      { id: 'profissao', label: 'Profissão / Ocupação', type: 'text', placeholder: 'Ex: Vendedora autônoma', required: true, gridSpan: 'half' },
      { id: 'rg', label: 'Número do RG / Órgão Emissor', type: 'text', placeholder: 'Ex: 1.234.567 SSP/RO', required: true, gridSpan: 'half' },
      { id: 'cpf', label: 'CPF', type: 'cpf', placeholder: '000.000.000-00', required: true, gridSpan: 'half' },
      { id: 'logradouro', label: 'Endereço (Rua / Avenida / Travessa)', type: 'text', placeholder: 'Ex: Rua das Flores, 450, Apto 102', required: true, gridSpan: 'full' },
      { id: 'bairro', label: 'Bairro', type: 'text', placeholder: 'Ex: Centro', required: true, gridSpan: 'half' },
      { id: 'cep', label: 'CEP', type: 'cep', placeholder: '00000-000', required: true, gridSpan: 'half' },
      { id: 'cidade', label: 'Cidade', type: 'text', placeholder: 'Ex: Porto Velho', required: true, gridSpan: 'half' },
      { id: 'estado', label: 'Estado (UF)', type: 'text', placeholder: 'RO', defaultValue: 'RO', required: true, gridSpan: 'half' },
      { id: 'motivo', label: 'Situação da Moradia (opcional)', type: 'select', options: [
        { value: 'resido no imóvel de terceiros/familiares', label: 'Resido com familiares / terceiros' },
        { value: 'resido em imóvel alugado diretamente com o proprietário', label: 'Aluguel direto sem contrato' },
        { value: 'resido como comodatário / cedido', label: 'Imóvel cedido' },
        { value: 'resido no endereço acima especificado', label: 'Apenas afirmo que resido no endereço' }
      ], defaultValue: 'resido no endereço acima especificado', gridSpan: 'full' },
    ],
    generateText: (v) => {
      const city = v.cidade || 'Porto Velho';
      const uf = v.estado || 'RO';
      return {
        title: 'DECLARAÇÃO DE RESIDÊNCIA',
        body: [
          `Eu, ${v.nome || '_______________________'}, nacionalidade ${v.nacionalidade || 'brasileira'}, estado civil ${v.estadoCivil || 'solteiro(a)'}, profissão ${v.profissao || '________________'}, portador(a) da cédula de identidade RG nº ${v.rg || '____________'} e inscrito(a) no CPF sob o nº ${v.cpf || '___________'},`,
          `DECLARO, para os devidos fins e sob as penas da Lei, especialmente em conformidade com o disposto na Lei Federal nº 7.115, de 29 de agosto de 1983, que ${v.motivo || 'resido no endereço acima especificado'}, situado na:`,
          `${v.logradouro || '________________________'}, Bairro: ${v.bairro || '__________'}, CEP: ${v.cep || '________'}, na cidade de ${city} - ${uf}.`,
          `Declaro ainda estar ciente de que a falsidade das informações aqui prestadas configurará crime de falsidade ideológica, previsto no Artigo 299 do Código Penal Brasileiro, sujeitando o infrator às sanções civis, criminais e administrativas cabíveis.`,
          `Por ser a expressão fiel da verdade, firmo a presente declaração para que surta seus jurídicos e legais efeitos.`
        ],
        cityDateLine: `${city} - ${uf}, ${formatBrazilianDate()}.`,
        signers: [
          {
            name: v.nome || 'Nome do Declarante',
            document: `CPF: ${v.cpf || '000.000.000-00'} | RG: ${v.rg || 'Documento'}`,
            role: 'Declarante'
          }
        ],
        notes: 'Fundamentada na Lei Federal nº 7.115/1983. Presume-se verdadeira a declaração firmada pelo interessado perante qualquer órgão público ou entidade privada.'
      };
    },
    faqs: [
      {
        question: 'Preciso reconhecer firma em cartório da Declaração de Residência?',
        answer: 'Na maioria das situações, não! A Lei Federal nº 13.726/2018 (Lei da Desburocratização) proibiu a exigência de reconhecimento de firma perante órgãos públicos federais, estaduais e municipais, bastando a comparação da assinatura com o seu documento de identificação com foto. Alguns bancos privados ainda podem solicitar de forma discricionária, mas a regra geral é a assinatura simples ou digital via Gov.br.'
      },
      {
        question: 'Essa declaração é válida para abrir conta bancária e faculdade?',
        answer: 'Sim. A Lei nº 7.115/1983 foi criada justamente para resguardar os cidadãos que moram com familiares, alugam direto ou não possuem contas de consumo no próprio nome. Faculdades (como para o Prouni/FIES), cadastros sociais (CadÚnico/CRAS) e instituições financeiras aceitam esse modelo perfeitamente.'
      },
      {
        question: 'Posso assinar pelo Gov.br gratuitamente?',
        answer: 'Com certeza! Você pode baixar a declaração em PDF neste portal e assinar com sua conta Gov.br (prata ou ouro) em assinador.iti.br, tendo validade jurídica equivalente à assinatura de próprio punho com firma reconhecida.'
      }
    ]
  },
  {
    id: 'residencia-terceiro',
    slug: 'declaracao-de-residencia-terceiro',
    title: 'Declaração de Residência por Terceiro',
    shortTitle: 'Residência por Terceiro',
    category: 'residencia',
    badge: 'Comprovante em Nome de Outro',
    description:
      'Preenchida pelo titular do comprovante (proprietário do imóvel, mãe, pai ou amigo) atestando que outra pessoa mora com ele no mesmo endereço.',
    whenToUse:
      'Quando o órgão exige que o dono da conta de luz ou o locador declare que você reside no imóvel com ele.',
    legalBase: 'Lei Federal nº 7.115/1983 e Art. 299 do Código Penal.',
    fields: [
      { id: 'nomeDono', label: 'Nome do Titular do Imóvel / Conta de Luz', type: 'text', placeholder: 'Ex: Carlos Alberto Pereira', required: true, gridSpan: 'full' },
      { id: 'cpfDono', label: 'CPF do Titular', type: 'cpf', placeholder: '000.000.000-00', required: true, gridSpan: 'half' },
      { id: 'rgDono', label: 'RG do Titular', type: 'text', placeholder: 'Ex: 987654 SSP/RO', required: true, gridSpan: 'half' },
      { id: 'nomeMorador', label: 'Nome da Pessoa que Mora com Você (Morador)', type: 'text', placeholder: 'Ex: Jessica Lima Santos', required: true, gridSpan: 'full' },
      { id: 'cpfMorador', label: 'CPF do Morador', type: 'cpf', placeholder: '000.000.000-00', required: true, gridSpan: 'half' },
      { id: 'parentesco', label: 'Grau de Parentesco / Relação', type: 'text', placeholder: 'Ex: Filho(a), Inquilino(a), Irmão(ã)', defaultValue: 'Reside como morador(a)', required: true, gridSpan: 'half' },
      { id: 'logradouro', label: 'Endereço Completo', type: 'text', placeholder: 'Rua das Oliveiras, 100', required: true, gridSpan: 'full' },
      { id: 'bairro', label: 'Bairro', type: 'text', placeholder: 'Floresta', required: true, gridSpan: 'half' },
      { id: 'cep', label: 'CEP', type: 'cep', placeholder: '00000-000', required: true, gridSpan: 'half' },
      { id: 'cidade', label: 'Cidade', type: 'text', placeholder: 'Porto Velho', required: true, gridSpan: 'half' },
      { id: 'estado', label: 'Estado (UF)', type: 'text', placeholder: 'RO', defaultValue: 'RO', required: true, gridSpan: 'half' }
    ],
    generateText: (v) => {
      const city = v.cidade || 'Porto Velho';
      const uf = v.estado || 'RO';
      return {
        title: 'DECLARAÇÃO DE RESIDÊNCIA FIRMADA POR TERCEIRO',
        body: [
          `Eu, ${v.nomeDono || '_______________________'}, titular do comprovante de endereço deste imóvel, portador(a) do RG nº ${v.rgDono || '____________'} e inscrito(a) no CPF sob o nº ${v.cpfDono || '___________'},`,
          `DECLARO, sob as penas da Lei nº 7.115/1983 e do Art. 299 do Código Penal Brasileiro, que ${v.nomeMorador || '_______________________'}, inscrito(a) no CPF nº ${v.cpfMorador || '___________'}, na qualidade de ${v.parentesco || 'morador(a)'},`,
          `RESIDE ATUALMENTE COMIGO no imóvel de minha titularidade, situado no endereço:`,
          `${v.logradouro || '________________________'}, Bairro: ${v.bairro || '__________'}, CEP: ${v.cep || '________'}, no município de ${city} - ${uf}.`,
          `Anexo a esta declaração a cópia do comprovante de residência em meu nome (conta de energia, água ou telefone) para comprovação fática.`,
          `Por ser a expressão límpida da verdade, firmo a presente.`
        ],
        cityDateLine: `${city} - ${uf}, ${formatBrazilianDate()}.`,
        signers: [
          {
            name: v.nomeDono || 'Nome do Titular do Imóvel',
            document: `CPF: ${v.cpfDono || '000.000.000-00'}`,
            role: 'Titular do Imóvel / Declarador'
          },
          {
            name: v.nomeMorador || 'Nome do Residente',
            document: `CPF: ${v.cpfMorador || '000.000.000-00'}`,
            role: 'Morador Declarado'
          }
        ]
      };
    },
    faqs: [
      {
        question: 'Preciso anexar a conta de luz junto com esta declaração?',
        answer: 'Sim, é altamente recomendável anexar a cópia simples da conta de água ou luz recente que esteja no nome do titular que assinou a declaração.'
      }
    ]
  },
  {
    id: 'renda-autonomo',
    slug: 'declaracao-de-renda-autonomo',
    title: 'Declaração de Renda Informal / Autônomo',
    shortTitle: 'Renda Autônomo',
    category: 'renda',
    badge: 'Comprovação Financeira',
    description:
      'Comprova ganhos mensais de trabalhadores sem carteira assinada, diaristas, motoristas de aplicativo, pedreiros, pequenos comerciantes, manicures e prestadores de serviço.',
    whenToUse:
      'Imprescindível para aluguel de imóveis, financiamentos, crediários, processos seletivos do Prouni, FIES, auxílios estudantis e benefícios governamentais.',
    legalBase: 'Artigo 299 do Código Penal Brasileiro.',
    fields: [
      { id: 'nome', label: 'Nome Completo', type: 'text', placeholder: 'Ex: José Raimundo dos Santos', required: true, gridSpan: 'full' },
      { id: 'cpf', label: 'CPF', type: 'cpf', placeholder: '000.000.000-00', required: true, gridSpan: 'half' },
      { id: 'rg', label: 'RG / Órgão Emissor', type: 'text', placeholder: 'Ex: 345678 SSP/RO', required: true, gridSpan: 'half' },
      { id: 'profissao', label: 'Atividade Desenvolvida', type: 'text', placeholder: 'Ex: Motorista por aplicativo / Diarista', required: true, gridSpan: 'half' },
      { id: 'rendaMedia', label: 'Média de Rendimento Mensal (R$)', type: 'currency', placeholder: 'R$ 2.800,00', required: true, gridSpan: 'half' },
      { id: 'tempoAtividade', label: 'Tempo que Exerce a Atividade', type: 'text', placeholder: 'Ex: 2 anos e 4 meses', defaultValue: 'Mais de 1 ano', gridSpan: 'half' },
      { id: 'logradouro', label: 'Endereço Residencial', type: 'text', placeholder: 'Av. Jorge Teixeira, 1200', required: true, gridSpan: 'full' },
      { id: 'cidade', label: 'Cidade', type: 'text', placeholder: 'Porto Velho', required: true, gridSpan: 'half' },
      { id: 'estado', label: 'Estado (UF)', type: 'text', placeholder: 'RO', defaultValue: 'RO', required: true, gridSpan: 'half' }
    ],
    generateText: (v) => {
      const city = v.cidade || 'Porto Velho';
      const uf = v.estado || 'RO';
      return {
        title: 'DECLARAÇÃO DE RENDIMENTOS DE TRABALHADOR AUTÔNOMO',
        body: [
          `Eu, ${v.nome || '_______________________'}, inscrito(a) no CPF sob o nº ${v.cpf || '___________'}, portador(a) do RG nº ${v.rg || '____________'}, residente e domiciliado(a) na ${v.logradouro || '________________________'}, ${city} - ${uf},`,
          `DECLARO, para os devidos fins de comprovação de rendimentos e sob as penas da Lei, que exerço a atividade profissional autônoma de ${v.profissao || 'trabalhador(a) autônomo(a)'}, atuando no ramo há aproximadamente ${v.tempoAtividade || 'mais de 1 ano'}, sem vínculo empregatício formal regido pela CLT.`,
          `Declaro ainda que obtenho com minha atividade profissional um rendimento médio mensal bruto estimado em ${v.rendaMedia || 'R$ 0,00'}.`,
          `Declaro ter pleno conhecimento de que prestar declaração falsa perante a administração pública ou privada caracteriza crime de falsidade ideológica (Art. 299 do Código Penal), passível de responsabilização legal.`,
          `Por ser a expressão verídica dos fatos, firmo a presente declaração.`
        ],
        cityDateLine: `${city} - ${uf}, ${formatBrazilianDate()}.`,
        signers: [
          {
            name: v.nome || 'Nome do Autônomo',
            document: `CPF: ${v.cpf || '000.000.000-00'}`,
            role: 'Declarante / Trabalhador Autônomo'
          }
        ]
      };
    },
    faqs: [
      {
        question: 'Quem é autônomo precisa apresentar extrato bancário junto?',
        answer: 'Em muitas instituições (como imobiliárias ou comissões do Prouni), anexar os últimos 3 extratos bancários simples complementa e fortalece a aceitação da sua declaração.'
      },
      {
        question: 'Essa declaração substitui o Decore do contador?',
        answer: 'Para a imensa maioria dos cadastros comuns (escola, bolsa, aluguel, compras), sim! Apenas grandes financiamentos imobiliários exigem DECORE com certificado digital de contador.'
      }
    ]
  },
  {
    id: 'uniao-estavel',
    slug: 'declaracao-de-uniao-estavel',
    title: 'Declaração Simples de União Estável',
    shortTitle: 'União Estável',
    category: 'familia',
    badge: 'Direito de Família',
    description:
      'Formaliza a convivência pública, contínua e duradoura entre duas pessoas com o objetivo de constituir família (Artigo 1.723 do Código Civil Brasileiro).',
    whenToUse:
      'Usada para incluir companheiro(a) em convênios médicos, odontológicos, clubes, previdência privada, sindicatos, faculdades e trâmites de dependência.',
    legalBase: 'Art. 1.723 da Lei nº 10.406/2002 (Código Civil) e Art. 226 da Constituição Federal.',
    requiresWitnesses: true,
    fields: [
      { id: 'nome1', label: 'Nome do 1º Companheiro(a)', type: 'text', placeholder: 'Ex: Marcos Vinícius Ferreira', required: true, gridSpan: 'half' },
      { id: 'cpf1', label: 'CPF do 1º Companheiro(a)', type: 'cpf', placeholder: '000.000.000-00', required: true, gridSpan: 'half' },
      { id: 'rg1', label: 'RG do 1º Companheiro(a)', type: 'text', placeholder: '123456 SSP/RO', required: true, gridSpan: 'half' },
      { id: 'estadoCivil1', label: 'Estado Civil do 1º', type: 'text', placeholder: 'Solteiro(a) / Divorciado(a)', defaultValue: 'Solteiro(a)', required: true, gridSpan: 'half' },

      { id: 'nome2', label: 'Nome do 2º Companheiro(a)', type: 'text', placeholder: 'Ex: Amanda Soares Rocha', required: true, gridSpan: 'half' },
      { id: 'cpf2', label: 'CPF do 2º Companheiro(a)', type: 'cpf', placeholder: '000.000.000-00', required: true, gridSpan: 'half' },
      { id: 'rg2', label: 'RG do 2º Companheiro(a)', type: 'text', placeholder: '654321 SSP/RO', required: true, gridSpan: 'half' },
      { id: 'estadoCivil2', label: 'Estado Civil do 2º', type: 'text', placeholder: 'Solteiro(a) / Divorciado(a)', defaultValue: 'Solteiro(a)', required: true, gridSpan: 'half' },

      { id: 'dataInicio', label: 'Convivência desde (mês/ano ou data aproximada)', type: 'text', placeholder: 'Ex: março de 2021', required: true, gridSpan: 'half' },
      { id: 'regimeBens', label: 'Regime de Bens Adotado', type: 'select', options: [
        { value: 'Comunhão Parcial de Bens (padrão legal)', label: 'Comunhão Parcial de Bens' },
        { value: 'Separação Total de Bens', label: 'Separação Total de Bens' }
      ], defaultValue: 'Comunhão Parcial de Bens (padrão legal)', gridSpan: 'half' },
      { id: 'logradouro', label: 'Endereço do Domicílio Conjugal', type: 'text', placeholder: 'Rua das Palmeiras, 300', required: true, gridSpan: 'full' },
      { id: 'cidade', label: 'Cidade', type: 'text', placeholder: 'Porto Velho', required: true, gridSpan: 'half' },
      { id: 'estado', label: 'Estado (UF)', type: 'text', placeholder: 'RO', defaultValue: 'RO', required: true, gridSpan: 'half' }
    ],
    generateText: (v) => {
      const city = v.cidade || 'Porto Velho';
      const uf = v.estado || 'RO';
      return {
        title: 'DECLARAÇÃO DE UNIÃO ESTÁVEL',
        body: [
          `NÓS,`,
          `PRIMEIRO(A) DECLARANTE: ${v.nome1 || '_______________________'}, estado civil ${v.estadoCivil1 || 'solteiro(a)'}, inscrito(a) no CPF nº ${v.cpf1 || '___________'} e portador(a) do RG nº ${v.rg1 || '____________'}, e`,
          `SEGUNDO(A) DECLARANTE: ${v.nome2 || '_______________________'}, estado civil ${v.estadoCivil2 || 'solteiro(a)'}, inscrito(a) no CPF nº ${v.cpf2 || '___________'} e portador(a) do RG nº ${v.rg2 || '____________'},`,
          `ambos residentes e domiciliados na ${v.logradouro || '________________________'}, no município de ${city} - ${uf},`,
          `DECLARAMOS, sob as penas da Lei e nos termos do Artigo 1.723 da Lei Federal nº 10.406/2002 (Código Civil Brasileiro), que convivemos em UNIÃO ESTÁVEL de forma pública, contínua, duradoura e notória, com o objetivo firme de constituir entidade familiar, desde ${v.dataInicio || 'data indeterminada'}.`,
          `Declaramos ainda que adotamos como regime patrimonial o de ${v.regimeBens || 'Comunhão Parcial de Bens'}, não existindo entre nós quaisquer dos impedimentos matrimoniais previstos no Art. 1.521 do Código Civil.`,
          `Estando cientes de que a falsidade desta declaração ensejará as sanções penais cominadas no Artigo 299 do Código Penal, assinamos o presente instrumento juntamente com duas testemunhas idôneas.`
        ],
        cityDateLine: `${city} - ${uf}, ${formatBrazilianDate()}.`,
        signers: [
          { name: v.nome1 || 'Companheiro(a) 1', document: `CPF: ${v.cpf1 || '000.000.000-00'}`, role: 'Primeiro Convivente' },
          { name: v.nome2 || 'Companheiro(a) 2', document: `CPF: ${v.cpf2 || '000.000.000-00'}`, role: 'Segundo Convivente' }
        ],
        witnesses: [
          { name: '1ª Testemunha: ____________________________________', document: 'CPF: ___________________  RG: ___________________' },
          { name: '2ª Testemunha: ____________________________________', document: 'CPF: ___________________  RG: ___________________' }
        ]
      };
    },
    faqs: [
      {
        question: 'A declaração particular de união estável vale perante planos de saúde?',
        answer: 'Sim! A grande maioria dos convênios médicos e odontológicos aceita a declaração particular assinada pelo casal (muitas vezes com reconhecimento de firma por semelhança ou assinatura no Gov.br).'
      },
      {
        question: 'Precisa registrar em cartório?',
        answer: 'A escritura pública em cartório é opcional. O documento particular já gera efeitos jurídicos plenos entre as partes para fins previdenciários e contratuais.'
      }
    ]
  },
  {
    id: 'desemprego',
    slug: 'declaracao-de-desemprego',
    title: 'Declaração de Desemprego / Sem Renda',
    shortTitle: 'Desemprego',
    category: 'renda',
    badge: 'Programas Sociais',
    description:
      'Atesta formalmente que a pessoa não possui vínculo empregatício formal nem exerce trabalho remunerado no momento presente.',
    whenToUse:
      'Para solicitação de isenção de taxa de inscrição em vestibulares, concursos públicos, FIES, Prouni e benefícios sociais.',
    legalBase: 'Lei Federal nº 7.115/1983 e Art. 299 do Código Penal.',
    fields: [
      { id: 'nome', label: 'Nome Completo', type: 'text', placeholder: 'Ex: Luciana Beatriz Silveira', required: true, gridSpan: 'full' },
      { id: 'cpf', label: 'CPF', type: 'cpf', placeholder: '000.000.000-00', required: true, gridSpan: 'half' },
      { id: 'rg', label: 'RG', type: 'text', placeholder: 'Ex: 456789 SSP/RO', required: true, gridSpan: 'half' },
      { id: 'tempoDesemprego', label: 'Desempregado(a) desde (mês/ano ou tempo)', type: 'text', placeholder: 'Ex: janeiro de 2024', defaultValue: 'os últimos 6 meses', required: true, gridSpan: 'half' },
      { id: 'fonteSubsistencia', label: 'Como se mantém atualmente', type: 'text', placeholder: 'Ex: Auxílio familiar / Economias anteriores', defaultValue: 'Ajuda de familiares', required: true, gridSpan: 'half' },
      { id: 'cidade', label: 'Cidade', type: 'text', placeholder: 'Porto Velho', required: true, gridSpan: 'half' },
      { id: 'estado', label: 'Estado (UF)', type: 'text', placeholder: 'RO', defaultValue: 'RO', required: true, gridSpan: 'half' }
    ],
    generateText: (v) => {
      const city = v.cidade || 'Porto Velho';
      const uf = v.estado || 'RO';
      return {
        title: 'DECLARAÇÃO DE DESEMPREGO E INEXISTÊNCIA DE RENDA',
        body: [
          `Eu, ${v.nome || '_______________________'}, inscrito(a) no CPF sob o nº ${v.cpf || '___________'}, portador(a) da cédula de identidade RG nº ${v.rg || '____________'},`,
          `DECLARO para os devidos fins, sob as penas da Lei nº 7.115/1983 e do Art. 299 do Código Penal Brasileiro, que me encontro DESEMPREGADO(A) e NÃO EXERÇO qualquer atividade remunerada, seja com vínculo formal de emprego (CLT ou estatutário) ou de natureza autônoma/informal, desde ${v.tempoDesemprego || 'período recente'}.`,
          `Declaro que no presente momento sobrevivo mediante: ${v.fonteSubsistencia || 'ajuda de familiares'}, não auferindo renda mensal individual própria.`,
          `Comprometo-me a comunicar imediatamente qualquer alteração em minha situação ocupacional e autorizo os órgãos competentes a averiguar a veracidade dos dados ora prestados.`
        ],
        cityDateLine: `${city} - ${uf}, ${formatBrazilianDate()}.`,
        signers: [
          { name: v.nome || 'Nome do Declarante', document: `CPF: ${v.cpf || '000.000.000-00'}`, role: 'Declarante Desempregado(a)' }
        ]
      };
    },
    faqs: [
      {
        question: 'Posso usar para pedir isenção de vestibular do Enem ou faculdade pública?',
        answer: 'Sim, a declaração de desemprego acompanhada da cópia da carteira de trabalho (frente, verso e última página com rescisão ou em branco) é o documento oficial exigido por editais.'
      }
    ]
  },
  {
    id: 'dependencia-economica',
    slug: 'declaracao-de-dependencia-economica',
    title: 'Declaração de Dependência Econômica',
    shortTitle: 'Dependência Econômica',
    category: 'familia',
    badge: 'Benefícios e Planos',
    description:
      'Comprova que uma pessoa (filho, enteado, pai, mãe ou parente) depende financeiramente do declarante para sua subsistência.',
    whenToUse:
      'Utilizada para inclusão em plano de saúde, dedução no Imposto de Renda (IRPF), concessão de benefícios previdenciários e auxílios sindicais.',
    legalBase: 'Lei Federal nº 7.115/1983 e regulamentos da Receita Federal / ANS.',
    fields: [
      { id: 'nomeTitular', label: 'Nome do Responsável / Mantenedor', type: 'text', placeholder: 'Ex: Paulo Sérgio Machado', required: true, gridSpan: 'full' },
      { id: 'cpfTitular', label: 'CPF do Responsável', type: 'cpf', placeholder: '000.000.000-00', required: true, gridSpan: 'half' },
      { id: 'rgTitular', label: 'RG do Responsável', type: 'text', placeholder: '123456 SSP/RO', required: true, gridSpan: 'half' },
      { id: 'nomeDependente', label: 'Nome do Dependente', type: 'text', placeholder: 'Ex: Matheus Machado', required: true, gridSpan: 'full' },
      { id: 'cpfDependente', label: 'CPF do Dependente', type: 'cpf', placeholder: '000.000.000-00', required: true, gridSpan: 'half' },
      { id: 'grauParentesco', label: 'Grau de Parentesco / Relação', type: 'text', placeholder: 'Ex: Filho(a), Enteado(a), Mãe', required: true, gridSpan: 'half' },
      { id: 'logradouro', label: 'Endereço da Residência Familiar', type: 'text', placeholder: 'Rua Afonso Pena, 80', required: true, gridSpan: 'full' },
      { id: 'cidade', label: 'Cidade', type: 'text', placeholder: 'Porto Velho', required: true, gridSpan: 'half' },
      { id: 'estado', label: 'Estado (UF)', type: 'text', placeholder: 'RO', defaultValue: 'RO', required: true, gridSpan: 'half' }
    ],
    generateText: (v) => {
      const city = v.cidade || 'Porto Velho';
      const uf = v.estado || 'RO';
      return {
        title: 'DECLARAÇÃO DE DEPENDÊNCIA ECONÔMICA',
        body: [
          `Eu, ${v.nomeTitular || '_______________________'}, inscrito(a) no CPF nº ${v.cpfTitular || '___________'} e portador(a) do RG nº ${v.rgTitular || '____________'}, residente na ${v.logradouro || '________________________'}, ${city} - ${uf},`,
          `DECLARO, para todos os efeitos de direito e sob as penas da Lei nº 7.115/1983, que:`,
          `${v.nomeDependente || '_______________________'}, inscrito(a) no CPF nº ${v.cpfDependente || '___________'}, na qualidade de meu(minha) ${v.grauParentesco || 'dependente'},`,
          `VIVE SOB MINHA TOTAL DEPENDÊNCIA ECONÔMICA E FINANCEIRA, sendo sustentado(a) exclusivamente pelos meus proventos, não dispondo de recursos próprios suficientes para o seu sustento.`,
          `Declaro plena consciência das penalidades do Art. 299 do Código Penal em caso de declaração fraudulenta.`
        ],
        cityDateLine: `${city} - ${uf}, ${formatBrazilianDate()}.`,
        signers: [
          { name: v.nomeTitular || 'Nome do Mantenedor', document: `CPF: ${v.cpfTitular || '000.000.000-00'}`, role: 'Declarante / Responsável Financeiro' }
        ]
      };
    },
    faqs: [
      {
        question: 'Quem pode ser declarado como dependente econômico?',
        answer: 'Filhos e enteados até 21 anos (ou até 24 se universitários), cônjuges, companheiros, pais e avós que não possuam renda suficiente, além de irmãos ou netos sob guarda judicial.'
      }
    ]
  },
  {
    id: 'nao-possui-imovel',
    slug: 'declaracao-de-nao-possuir-outro-imovel',
    title: 'Declaração de Não Possuir Outro Imóvel',
    shortTitle: 'Sem Imóvel Próprio',
    category: 'habitacao',
    badge: 'Habitação Popular',
    description:
      'Documento exigido pela Caixa Econômica Federal e programas habitacionais (Minha Casa Minha Vida) para comprovar que o interessado não tem casa própria.',
    whenToUse:
      'Programas habitacionais municipais, estaduais e federais, sorteios de lotes populares, auxílio moradia e descontos em emolumentos de 1º imóvel.',
    legalBase: 'Lei Federal nº 6.015/1973 (Art. 290) e Lei nº 7.115/1983.',
    fields: [
      { id: 'nome', label: 'Nome Completo', type: 'text', placeholder: 'Ex: Francisco Costa da Silva', required: true, gridSpan: 'full' },
      { id: 'cpf', label: 'CPF', type: 'cpf', placeholder: '000.000.000-00', required: true, gridSpan: 'half' },
      { id: 'rg', label: 'RG', type: 'text', placeholder: 'Ex: 123789 SSP/RO', required: true, gridSpan: 'half' },
      { id: 'estadoCivil', label: 'Estado Civil', type: 'text', placeholder: 'Casado(a) / Solteiro(a)', defaultValue: 'Solteiro(a)', gridSpan: 'half' },
      { id: 'nomeConjuge', label: 'Nome do Cônjuge/Companheiro(a) (se houver)', type: 'text', placeholder: 'Deixe em branco se solteiro', gridSpan: 'half' },
      { id: 'cidade', label: 'Cidade', type: 'text', placeholder: 'Porto Velho', required: true, gridSpan: 'half' },
      { id: 'estado', label: 'Estado (UF)', type: 'text', placeholder: 'RO', defaultValue: 'RO', required: true, gridSpan: 'half' }
    ],
    generateText: (v) => {
      const city = v.cidade || 'Porto Velho';
      const uf = v.estado || 'RO';
      const conjugeText = v.nomeConjuge ? ` bem como meu(minha) companheiro(a)/cônjuge ${v.nomeConjuge},` : '';
      return {
        title: 'DECLARAÇÃO DE INEXISTÊNCIA DE BEM IMÓVEL',
        body: [
          `Eu, ${v.nome || '_______________________'}, estado civil ${v.estadoCivil || 'solteiro(a)'}, inscrito(a) no CPF nº ${v.cpf || '___________'} e portador(a) do RG nº ${v.rg || '____________'},`,
          `DECLARO, sob as penas da Lei nº 7.115/1983 e do Art. 299 do Código Penal, que EU${conjugeText} NÃO SOU e NEM NUNCA FUI proprietário(a), cessionário(a), posseiro(a) ou promitente comprador(a) de qualquer bem imóvel urbano ou rural em todo o território nacional.`,
          `Declaro ainda não ter sido beneficiado(a) anteriormente por nenhum programa habitacional de interesse social operado pelo Governo Federal, Estadual ou Municipal.`,
          `A presente declaração é firmada para fins de cadastramento habitacional e comprovação junto aos órgãos públicos e agentes financeiros competentes.`
        ],
        cityDateLine: `${city} - ${uf}, ${formatBrazilianDate()}.`,
        signers: [
          { name: v.nome || 'Nome do Declarante', document: `CPF: ${v.cpf || '000.000.000-00'}`, role: 'Declarante' }
        ]
      };
    },
    faqs: [
      {
        question: 'Dá direito a 50% de desconto no cartório de registro?',
        answer: 'Sim! De acordo com o Art. 290 da Lei de Registros Públicos (Lei 6.015/73), a aquisição do primeiro imóvel residencial pelo SFH tem 50% de desconto nos emolumentos cartorários.'
      }
    ]
  },
  {
    id: 'nao-convivencia',
    slug: 'declaracao-de-nao-convivencia',
    title: 'Declaração de Separação de Fato / Não Convivência',
    shortTitle: 'Não Convivência',
    category: 'familia',
    badge: 'Separação de Fato',
    description:
      'Declara que os cônjuges ou ex-companheiros não moram mais juntos e romperam o vínculo conjugal de fato, mesmo antes do divórcio legal no papel.',
    whenToUse:
      'Atualização do CadÚnico, comprovação de composição familiar individual para programas sociais, financiamentos e processos de partilha.',
    legalBase: 'Art. 1.571 e 1.723 do Código Civil Brasileiro.',
    fields: [
      { id: 'nome', label: 'Seu Nome Completo', type: 'text', placeholder: 'Ex: Renata Martins Alencar', required: true, gridSpan: 'full' },
      { id: 'cpf', label: 'Seu CPF', type: 'cpf', placeholder: '000.000.000-00', required: true, gridSpan: 'half' },
      { id: 'rg', label: 'Seu RG', type: 'text', placeholder: '789012 SSP/RO', required: true, gridSpan: 'half' },
      { id: 'nomeEx', label: 'Nome do(a) Ex-Cônjuge ou Ex-Companheiro(a)', type: 'text', placeholder: 'Ex: Fernando Dias Castro', required: true, gridSpan: 'full' },
      { id: 'tempoSeparacao', label: 'Separados de fato desde (mês/ano)', type: 'text', placeholder: 'Ex: agosto de 2023', required: true, gridSpan: 'half' },
      { id: 'cidade', label: 'Cidade', type: 'text', placeholder: 'Porto Velho', required: true, gridSpan: 'half' },
      { id: 'estado', label: 'Estado (UF)', type: 'text', placeholder: 'RO', defaultValue: 'RO', required: true, gridSpan: 'half' }
    ],
    generateText: (v) => {
      const city = v.cidade || 'Porto Velho';
      const uf = v.estado || 'RO';
      return {
        title: 'DECLARAÇÃO DE SEPARAÇÃO DE FATO E NÃO CONVIVÊNCIA',
        body: [
          `Eu, ${v.nome || '_______________________'}, inscrito(a) no CPF nº ${v.cpf || '___________'} e portador(a) do RG nº ${v.rg || '____________'},`,
          `DECLARO, para todos os efeitos de direito e sob as penalidades do Art. 299 do Código Penal, que me encontro SEPARADO(A) DE FATO de ${v.nomeEx || '_______________________'} desde ${v.tempoSeparacao || 'data pregressa'},`,
          `NÃO MAIS CONVIVENDO sob o mesmo teto nem mantendo qualquer vínculo de natureza conjugal ou de união estável, não constituindo nossa relação atual entidade familiar de qualquer espécie.`,
          `Declaro que resido em domicílio próprio e autônomo, não compartilhando despesas ordinárias nem rendimentos comuns.`
        ],
        cityDateLine: `${city} - ${uf}, ${formatBrazilianDate()}.`,
        signers: [
          { name: v.nome || 'Nome do Declarante', document: `CPF: ${v.cpf || '000.000.000-00'}`, role: 'Declarante' }
        ]
      };
    },
    faqs: [
      {
        question: 'O CadÚnico aceita a separação de fato?',
        answer: 'Sim! Para os assistentes sociais do CRAS, o que importa é a composição familiar de quem realmente mora junto e divide a mesa, independentemente de haver averbação de divórcio formal.'
      }
    ]
  },
  {
    id: 'extravio-documento',
    slug: 'declaracao-de-extravio-de-documento',
    title: 'Declaração de Perda / Extravio de Documento',
    shortTitle: 'Extravio de Documento',
    category: 'bens',
    badge: 'Segurança e 2ª Via',
    description:
      'Atesta formalmente a perda, extravio, furto ou destruição de documento pessoal (RG, CPF, CNH, Certidão, Carteira de Trabalho ou Título).',
    whenToUse:
      'Para solicitar 2ª via de documentos em órgãos públicos, Poupatempo, TudoAqui ou justificar ausência perante instituições.',
    legalBase: 'Lei Federal nº 7.115/1983.',
    fields: [
      { id: 'nome', label: 'Nome Completo', type: 'text', placeholder: 'Ex: Anderson Silva Ribeiro', required: true, gridSpan: 'full' },
      { id: 'cpf', label: 'CPF', type: 'cpf', placeholder: '000.000.000-00', required: true, gridSpan: 'half' },
      { id: 'documentoPerdido', label: 'Documento Extraviado / Perdido', type: 'text', placeholder: 'Ex: Carteira de Identidade (RG) e CNH', required: true, gridSpan: 'half' },
      { id: 'dataFato', label: 'Data aproximada do extravio', type: 'text', placeholder: 'Ex: 15 de setembro de 2026', required: true, gridSpan: 'half' },
      { id: 'localFato', label: 'Local aproximado onde ocorreu', type: 'text', placeholder: 'Ex: Transporte público / Centro', defaultValue: 'Local incerto', gridSpan: 'half' },
      { id: 'cidade', label: 'Cidade', type: 'text', placeholder: 'Porto Velho', required: true, gridSpan: 'half' },
      { id: 'estado', label: 'Estado (UF)', type: 'text', placeholder: 'RO', defaultValue: 'RO', required: true, gridSpan: 'half' }
    ],
    generateText: (v) => {
      const city = v.cidade || 'Porto Velho';
      const uf = v.estado || 'RO';
      return {
        title: 'DECLARAÇÃO DE EXTRAVIO / PERDA DE DOCUMENTO',
        body: [
          `Eu, ${v.nome || '_______________________'}, inscrito(a) no CPF sob o nº ${v.cpf || '___________'},`,
          `DECLARO, sob as penas da Lei nº 7.115/1983 e do Art. 299 do Código Penal, que EXTRAVIEI / PERDI involuntariamente o seguinte documento de minha titularidade:`,
          `>> ${v.documentoPerdido || 'Documento pessoal'},`,
          `fato este ocorrido aproximadamente em ${v.dataFato || 'data recente'}, no seguinte local: ${v.localFato || 'local incerto'}.`,
          `Declaro que realizei todas as buscas cabíveis e, até a presente data, não logrei êxito na sua localização. Firmo a presente para instruir a emissão de 2ª via junto ao órgão expedidor.`
        ],
        cityDateLine: `${city} - ${uf}, ${formatBrazilianDate()}.`,
        signers: [
          { name: v.nome || 'Nome do Declarante', document: `CPF: ${v.cpf || '000.000.000-00'}`, role: 'Declarante' }
        ]
      };
    },
    faqs: [
      {
        question: 'Preciso registrar Boletim de Ocorrência (B.O.) na polícia?',
        answer: 'Em caso de furto ou roubo (quando alguém subtraiu seus documentos), é fundamental registrar o B.O. online na Polícia Civil. Para perda simples ou extravio acidental, esta declaração atende plenamente os órgãos expedidores.'
      }
    ]
  },
  {
    id: 'isencao-irpf',
    slug: 'declaracao-de-isencao-de-imposto-de-renda',
    title: 'Declaração de Isenção de Imposto de Renda (IRPF)',
    shortTitle: 'Isenção IRPF',
    category: 'renda',
    badge: 'Receita Federal',
    description:
      'Substitui a antiga "Declaração Anual de Isento" e atesta que o cidadão auferiu rendimentos anuais abaixo da faixa obrigatória de declaração do IRPF.',
    whenToUse:
      'Bancos, cartórios, processos de inventário, matrículas em faculdades com cota de renda e programas sociais.',
    legalBase: 'Instruções Normativas da Receita Federal do Brasil e Lei nº 7.115/1983.',
    fields: [
      { id: 'nome', label: 'Nome Completo', type: 'text', placeholder: 'Ex: Vanessa Ribeiro Lima', required: true, gridSpan: 'full' },
      { id: 'cpf', label: 'CPF', type: 'cpf', placeholder: '000.000.000-00', required: true, gridSpan: 'half' },
      { id: 'rg', label: 'RG', type: 'text', placeholder: 'Ex: 234567 SSP/RO', required: true, gridSpan: 'half' },
      { id: 'anoBase', label: 'Ano-Calendário de Referência', type: 'text', placeholder: '2025 / 2026', defaultValue: '2025/2026', required: true, gridSpan: 'half' },
      { id: 'cidade', label: 'Cidade', type: 'text', placeholder: 'Porto Velho', required: true, gridSpan: 'half' },
      { id: 'estado', label: 'Estado (UF)', type: 'text', placeholder: 'RO', defaultValue: 'RO', required: true, gridSpan: 'half' }
    ],
    generateText: (v) => {
      const city = v.cidade || 'Porto Velho';
      const uf = v.estado || 'RO';
      return {
        title: 'DECLARAÇÃO DE ISENÇÃO DE IMPOSTO DE RENDA PESSOA FÍSICA',
        body: [
          `Eu, ${v.nome || '_______________________'}, inscrito(a) no CPF sob o nº ${v.cpf || '___________'} e portador(a) do RG nº ${v.rg || '____________'},`,
          `DECLARO, para os devidos fins de direito, em consonância com as normas emanadas pela Secretaria Especial da Receita Federal do Brasil e sob as penas da Lei nº 7.115/1983, que:`,
          `ESTOU DESOBRIGADO(A) DA APRESENTAÇÃO DA DECLARAÇÃO DE AJUSTE ANUAL DO IMPOSTO DE RENDA PESSOA FÍSICA referente ao exercício e ano-calendário ${v.anoBase || 'recente'}, em razão de não ter me enquadrado em nenhuma das hipóteses de obrigatoriedade fixadas pela legislação tributária federal em vigor.`,
          `Declaro ter ciência de que prestar declaração inverídica é conduta tipificada no Art. 299 do Código Penal Brasileiro.`
        ],
        cityDateLine: `${city} - ${uf}, ${formatBrazilianDate()}.`,
        signers: [
          { name: v.nome || 'Nome do Declarante', document: `CPF: ${v.cpf || '000.000.000-00'}`, role: 'Declarante Isento(a)' }
        ]
      };
    },
    faqs: [
      {
        question: 'A Receita Federal ainda emite Certidão de Isento?',
        answer: 'Não. A antiga Declaração Anual de Isento (DAI) foi extinta em 2008. Hoje em dia, a comprovação é feita através da presente declaração firmada pelo próprio contribuinte, nos termos da Lei 7.115/83.'
      }
    ]
  },
  {
    id: 'venda-veiculo',
    slug: 'declaracao-de-venda-e-recibo-de-veiculo',
    title: 'Declaração de Venda e Recibo Simples de Veículo',
    shortTitle: 'Venda de Veículo',
    category: 'bens',
    badge: 'Compra e Venda',
    description:
      'Garante que a entrega do veículo (carro, moto ou caminhão) foi efetuada e declara a quitação financeira do valor acordado entre particulares.',
    whenToUse:
      'Na negociação particular de carro ou moto, resguardando o vendedor quanto a multas e responsabilidades a partir da data e hora da entrega.',
    legalBase: 'Artigos 481 e 490 da Lei Federal nº 10.406/2002 (Código Civil).',
    fields: [
      { id: 'nomeVendedor', label: 'Nome do Vendedor', type: 'text', placeholder: 'Ex: Rodrigo Andrade Martins', required: true, gridSpan: 'full' },
      { id: 'cpfVendedor', label: 'CPF do Vendedor', type: 'cpf', placeholder: '000.000.000-00', required: true, gridSpan: 'half' },
      { id: 'rgVendedor', label: 'RG do Vendedor', type: 'text', placeholder: '567890 SSP/RO', required: true, gridSpan: 'half' },

      { id: 'nomeComprador', label: 'Nome do Comprador', type: 'text', placeholder: 'Ex: Leonardo Silva Gomes', required: true, gridSpan: 'full' },
      { id: 'cpfComprador', label: 'CPF do Comprador', type: 'cpf', placeholder: '000.000.000-00', required: true, gridSpan: 'half' },
      { id: 'rgComprador', label: 'RG do Comprador', type: 'text', placeholder: '098765 SSP/RO', required: true, gridSpan: 'half' },

      { id: 'veiculoModelo', label: 'Marca / Modelo / Ano', type: 'text', placeholder: 'Ex: Honda Civic LXS 2018/2018', required: true, gridSpan: 'full' },
      { id: 'placa', label: 'Placa do Veículo', type: 'text', placeholder: 'Ex: ABC-1D23', required: true, gridSpan: 'half' },
      { id: 'renavam', label: 'Código RENAVAM', type: 'text', placeholder: 'Ex: 00123456789', required: true, gridSpan: 'half' },
      { id: 'valorVenda', label: 'Valor Negociado e Quitado (R$)', type: 'currency', placeholder: 'R$ 45.000,00', required: true, gridSpan: 'half' },
      { id: 'horaEntrega', label: 'Horário da Entrega das Chaves', type: 'text', placeholder: 'Ex: 14:30h', defaultValue: '14:00h', gridSpan: 'half' },
      { id: 'cidade', label: 'Cidade', type: 'text', placeholder: 'Porto Velho', required: true, gridSpan: 'half' },
      { id: 'estado', label: 'Estado (UF)', type: 'text', placeholder: 'RO', defaultValue: 'RO', required: true, gridSpan: 'half' }
    ],
    generateText: (v) => {
      const city = v.cidade || 'Porto Velho';
      const uf = v.estado || 'RO';
      return {
        title: 'DECLARAÇÃO DE VENDA, QUITAÇÃO E ENTREGA DE VEÍCULO',
        body: [
          `VENDEDOR(A): ${v.nomeVendedor || '_______________________'}, inscrito(a) no CPF nº ${v.cpfVendedor || '___________'} e RG nº ${v.rgVendedor || '____________'},`,
          `COMPRADOR(A): ${v.nomeComprador || '_______________________'}, inscrito(a) no CPF nº ${v.cpfComprador || '___________'} e RG nº ${v.rgComprador || '____________'}.`,
          `Pelo presente instrumento, o(a) VENDEDOR(A) declara que VENDEU e TRANSFERIU ao(à) COMPRADOR(A) a posse e a propriedade do veículo a seguir caracterizado:`,
          `Marca/Modelo/Ano: ${v.veiculoModelo || '________________________'} | Placa: ${v.placa || '__________'} | RENAVAM: ${v.renavam || '__________'}.`,
          `DECLARA O VENDEDOR ter recebido nesta data a quantia integral e líquida de ${v.valorVenda || 'R$ 0,00'}, conferindo a mais ampla, geral e irrestrita quitação de preço.`,
          `DECLARA O COMPRADOR que recebeu as chaves e o veículo no estado de conservação em que se encontra às ${v.horaEntrega || 'horário acordado'}, assumindo a partir deste instante integral responsabilidade civil, criminal e administrativa por eventuais multas, sinistros ou infrações de trânsito.`
        ],
        cityDateLine: `${city} - ${uf}, ${formatBrazilianDate()}.`,
        signers: [
          { name: v.nomeVendedor || 'Vendedor', document: `CPF: ${v.cpfVendedor || '000.000.000-00'}`, role: 'Vendedor (Transmitente)' },
          { name: v.nomeComprador || 'Comprador', document: `CPF: ${v.cpfComprador || '000.000.000-00'}`, role: 'Comprador (Adquirente)' }
        ]
      };
    },
    faqs: [
      {
        question: 'Essa declaração substitui a comunicação de venda no DETRAN?',
        answer: 'Não. Você ainda deve assinar a ATPV-e (ou DUT em cartório) e comunicar a venda no DETRAN ou aplicativo Carteira Digital de Trânsito. Esta declaração serve como recibo imediato de quitação e prova irrefutável da hora exata da entrega para multas supervenientes.'
      }
    ]
  },
  {
    id: 'guarda-menor',
    slug: 'declaracao-de-guarda-de-fato-de-menor',
    title: 'Declaração de Guarda e Responsabilidade de Fato de Menor',
    shortTitle: 'Guarda de Fato',
    category: 'familia',
    badge: 'Proteção ao Menor',
    description:
      'Declara que uma criança ou adolescente reside sob os cuidados diários de avós, tios ou responsável de fato.',
    whenToUse:
      'Para matrículas em creches, escolas, postos de saúde da família e atendimentos comunitários quando os pais trabalham fora.',
    legalBase: 'Estatuto da Criança e do Adolescente (Lei nº 8.069/1990) e Lei nº 7.115/1983.',
    fields: [
      { id: 'nomeResponsavel', label: 'Nome do(a) Responsável de Fato', type: 'text', placeholder: 'Ex: Sebastiana Maria Dias', required: true, gridSpan: 'full' },
      { id: 'cpfResponsavel', label: 'CPF do(a) Responsável', type: 'cpf', placeholder: '000.000.000-00', required: true, gridSpan: 'half' },
      { id: 'rgResponsavel', label: 'RG do(a) Responsável', type: 'text', placeholder: '345678 SSP/RO', required: true, gridSpan: 'half' },
      { id: 'nomeMenor', label: 'Nome da Criança / Menor', type: 'text', placeholder: 'Ex: Enzo Gabriel Dias', required: true, gridSpan: 'full' },
      { id: 'dataNascimentoMenor', label: 'Data de Nascimento do Menor', type: 'text', placeholder: 'Ex: 12/04/2018', required: true, gridSpan: 'half' },
      { id: 'parentesco', label: 'Grau de Parentesco com o Menor', type: 'text', placeholder: 'Ex: Avó Materna, Tia', required: true, gridSpan: 'half' },
      { id: 'logradouro', label: 'Endereço da Residência', type: 'text', placeholder: 'Rua Imigrantes, 550', required: true, gridSpan: 'full' },
      { id: 'cidade', label: 'Cidade', type: 'text', placeholder: 'Porto Velho', required: true, gridSpan: 'half' },
      { id: 'estado', label: 'Estado (UF)', type: 'text', placeholder: 'RO', defaultValue: 'RO', required: true, gridSpan: 'half' }
    ],
    generateText: (v) => {
      const city = v.cidade || 'Porto Velho';
      const uf = v.estado || 'RO';
      return {
        title: 'DECLARAÇÃO DE GUARDA E RESPONSABILIDADE DE FATO',
        body: [
          `Eu, ${v.nomeResponsavel || '_______________________'}, inscrito(a) no CPF sob o nº ${v.cpfResponsavel || '___________'} e portador(a) do RG nº ${v.rgResponsavel || '____________'}, residente na ${v.logradouro || '________________________'}, ${city} - ${uf},`,
          `DECLARO, para fins escolares, médicos e assistenciais, sob as penas da Lei nº 7.115/1983 e do Estatuto da Criança e do Adolescente (Lei nº 8.069/1990), que detenho a GUARDA E RESPONSABILIDADE DE FATO do(a) menor:`,
          `>> ${v.nomeMenor || '_______________________'}, nascido(a) em ${v.dataNascimentoMenor || '__/__/____'}, meu(minha) ${v.parentesco || 'parente'},`,
          `exercendo em caráter integral a assistência material, moral e educacional cotidiana do menor no endereço acima informado.`
        ],
        cityDateLine: `${city} - ${uf}, ${formatBrazilianDate()}.`,
        signers: [
          { name: v.nomeResponsavel || 'Responsável', document: `CPF: ${v.cpfResponsavel || '000.000.000-00'}`, role: 'Responsável de Fato' }
        ]
      };
    },
    faqs: [
      {
        question: 'Essa declaração substitui a guarda judicial dada pelo Juiz da Infância?',
        answer: 'Não substitui a guarda judicial definitiva expedida pelo Poder Judiciário. Todavia, no dia a dia da comunidade, escolas públicas, creches municipais e postos de saúde costumam aceitar essa declaração para não deixar a criança desassistida de vacina ou matrícula escolar.'
      }
    ]
  },
  {
    id: 'prestacao-servicos',
    slug: 'declaracao-de-prestacao-de-servicos',
    title: 'Declaração de Prestação de Serviços e Recibo',
    shortTitle: 'Prestação de Serviços',
    category: 'trabalho',
    badge: 'Recibo / RPA Simples',
    description:
      'Declaração mútua entre contratante e prestador autônomo descrevendo o serviço realizado e o valor avençado.',
    whenToUse:
      'Pinturas, reformas, manutenções residenciais, consultorias, serviços gráficos, informática e mão de obra independente.',
    legalBase: 'Artigos 593 a 609 do Código Civil Brasileiro.',
    fields: [
      { id: 'nomeContratante', label: 'Nome do Tomador / Contratante', type: 'text', placeholder: 'Ex: Juliana Monteiro', required: true, gridSpan: 'full' },
      { id: 'cpfContratante', label: 'CPF / CNPJ do Contratante', type: 'text', placeholder: '000.000.000-00', required: true, gridSpan: 'half' },
      { id: 'nomePrestador', label: 'Nome do Prestador / Trabalhador', type: 'text', placeholder: 'Ex: Rogério Barbosa Santos', required: true, gridSpan: 'full' },
      { id: 'cpfPrestador', label: 'CPF do Prestador', type: 'cpf', placeholder: '000.000.000-00', required: true, gridSpan: 'half' },
      { id: 'servicoDescricao', label: 'Descrição do Serviço Prestado', type: 'textarea', placeholder: 'Ex: Pintura externa da casa e conserto do telhado', required: true, gridSpan: 'full' },
      { id: 'valorServico', label: 'Valor Total do Serviço (R$)', type: 'currency', placeholder: 'R$ 1.500,00', required: true, gridSpan: 'half' },
      { id: 'formaPagamento', label: 'Forma de Quitação', type: 'text', placeholder: 'Ex: PIX à vista / Dinheiro', defaultValue: 'Transferência PIX', gridSpan: 'half' },
      { id: 'cidade', label: 'Cidade', type: 'text', placeholder: 'Porto Velho', required: true, gridSpan: 'half' },
      { id: 'estado', label: 'Estado (UF)', type: 'text', placeholder: 'RO', defaultValue: 'RO', required: true, gridSpan: 'half' }
    ],
    generateText: (v) => {
      const city = v.cidade || 'Porto Velho';
      const uf = v.estado || 'RO';
      return {
        title: 'DECLARAÇÃO DE PRESTAÇÃO DE SERVIÇOS E RECIBO DE QUITAÇÃO',
        body: [
          `Pelo presente instrumento particular, as partes abaixo identificadas:`,
          `TOMADOR(A) DO SERVIÇO: ${v.nomeContratante || '_______________________'}, documento nº ${v.cpfContratante || '___________'};`,
          `PRESTADOR(A) AUTÔNOMO(A): ${v.nomePrestador || '_______________________'}, inscrito(a) no CPF nº ${v.cpfPrestador || '___________'}.`,
          `DECLARAM que o(a) Prestador(a) executou com zelo e perfeição o seguinte serviço:`,
          `"${v.servicoDescricao || 'Serviços gerais contratados'}",`,
          `tendo o(a) Contratante efetuado o pagamento integral no montante de ${v.valorServico || 'R$ 0,00'} através de ${v.formaPagamento || 'PIX'}, conferindo o prestador plena e irrevogável quitação pelas obrigações decorrentes deste trabalho.`
        ],
        cityDateLine: `${city} - ${uf}, ${formatBrazilianDate()}.`,
        signers: [
          { name: v.nomePrestador || 'Prestador de Serviço', document: `CPF: ${v.cpfPrestador || '000.000.000-00'}`, role: 'Prestador de Serviços' },
          { name: v.nomeContratante || 'Contratante / Pagador', document: `CPF/CNPJ: ${v.cpfContratante || '000.000.000-00'}`, role: 'Contratante' }
        ]
      };
    },
    faqs: [
      {
        question: 'Serve como comprovante contábil ou fiscal?',
        answer: 'Serve perfeitamente como recibo de pagamento entre pessoas físicas ou para instruir contabilidade de MEI e livro caixa do profissional liberal.'
      }
    ]
  },
  {
    id: 'cessao-imovel-comodato',
    slug: 'declaracao-de-cessao-de-imovel-comodato',
    title: 'Declaração de Cessão Gratuita de Imóvel (Comodato Verbal)',
    shortTitle: 'Cessão de Imóvel',
    category: 'habitacao',
    badge: 'Moradia Cedida',
    description:
      'Declara que o dono do imóvel autorizou gratuitamente um terceiro ou familiar a morar no local sem cobrança de aluguel (imóvel cedido de favor).',
    whenToUse:
      'Para cadastros no CRAS, comprovação de gastos no CadÚnico ou benefícios habitacionais comprovando que não paga aluguel.',
    legalBase: 'Artigos 579 a 585 do Código Civil Brasileiro.',
    fields: [
      { id: 'nomeCedente', label: 'Nome do Proprietário (Cedente)', type: 'text', placeholder: 'Ex: Manoel Francisco Ribeiro', required: true, gridSpan: 'full' },
      { id: 'cpfCedente', label: 'CPF do Proprietário', type: 'cpf', placeholder: '000.000.000-00', required: true, gridSpan: 'half' },
      { id: 'nomeBeneficiario', label: 'Nome de Quem Ocupa o Imóvel (Beneficiário)', type: 'text', placeholder: 'Ex: Tatiana Souza', required: true, gridSpan: 'full' },
      { id: 'cpfBeneficiario', label: 'CPF do Beneficiário', type: 'cpf', placeholder: '000.000.000-00', required: true, gridSpan: 'half' },
      { id: 'logradouro', label: 'Endereço do Imóvel Cedido', type: 'text', placeholder: 'Rua Calama, 420', required: true, gridSpan: 'full' },
      { id: 'cidade', label: 'Cidade', type: 'text', placeholder: 'Porto Velho', required: true, gridSpan: 'half' },
      { id: 'estado', label: 'Estado (UF)', type: 'text', placeholder: 'RO', defaultValue: 'RO', required: true, gridSpan: 'half' }
    ],
    generateText: (v) => {
      const city = v.cidade || 'Porto Velho';
      const uf = v.estado || 'RO';
      return {
        title: 'DECLARAÇÃO DE CESSÃO GRATUITA DE IMÓVEL RESIDENCIAL',
        body: [
          `Eu, ${v.nomeCedente || '_______________________'}, inscrito(a) no CPF sob o nº ${v.cpfCedente || '___________'}, na qualidade de legítimo(a) possuidor(a)/proprietário(a) do imóvel situado na ${v.logradouro || '________________________'}, ${city} - ${uf},`,
          `DECLARO, para todos os efeitos legais e perante quaisquer órgãos públicos ou privados, que CEDI GRATUITAMENTE a posse direta do aludido imóvel para residência de ${v.nomeBeneficiario || '_______________________'}, inscrito(a) no CPF nº ${v.cpfBeneficiario || '___________'},`,
          `sob regime de comodato verbal, sem qualquer cobrança de aluguel, taxa de ocupação ou remuneração mensal equivalente.`
        ],
        cityDateLine: `${city} - ${uf}, ${formatBrazilianDate()}.`,
        signers: [
          { name: v.nomeCedente || 'Proprietário Cedente', document: `CPF: ${v.cpfCedente || '000.000.000-00'}`, role: 'Proprietário / Comodante' },
          { name: v.nomeBeneficiario || 'Ocupante Beneficiário', document: `CPF: ${v.cpfBeneficiario || '000.000.000-00'}`, role: 'Morador / Comodatário' }
        ]
      };
    },
    faqs: [
      {
        question: 'O ocupante pode alegar usucapião se tiver essa declaração?',
        answer: 'Não! Essa declaração é uma das melhores garantias jurídicas para o proprietário, pois comprova que a posse é decorrente de mera tolerância e empréstimo gratuito (comodato), afastando intenção de usucapião.'
      }
    ]
  },
  {
    id: 'autorizacao-viagem',
    slug: 'declaracao-de-autorizacao-de-viagem-hospedagem-menor',
    title: 'Autorização de Viagem / Hospedagem de Menor',
    shortTitle: 'Viagem / Hospedagem Menor',
    category: 'familia',
    badge: 'ECA / Hotéis e Voos',
    description:
      'Autorização dos pais ou tutores legais para que o menor de idade viaje no território nacional ou hospede-se em hotel desacompanhado dos genitores.',
    whenToUse:
      'Viagens interestaduais de ônibus, companhias aéreas e check-in em hotéis/pousadas acompanhado de tios, avós ou amigos da família.',
    legalBase: 'Artigos 82 e 83 do Estatuto da Criança e do Adolescente (Lei nº 8.069/1990).',
    fields: [
      { id: 'nomePaiMae', label: 'Nome do Pai ou Mãe Autorizante', type: 'text', placeholder: 'Ex: Cláudia Regina Barbosa', required: true, gridSpan: 'full' },
      { id: 'cpfPaiMae', label: 'CPF do Genitor(a)', type: 'cpf', placeholder: '000.000.000-00', required: true, gridSpan: 'half' },
      { id: 'rgPaiMae', label: 'RG do Genitor(a)', type: 'text', placeholder: '123456 SSP/RO', required: true, gridSpan: 'half' },
      { id: 'nomeMenor', label: 'Nome da Criança / Adolescente', type: 'text', placeholder: 'Ex: Gabriel Barbosa', required: true, gridSpan: 'full' },
      { id: 'dataNascimentoMenor', label: 'Data de Nasc. do Menor', type: 'text', placeholder: 'Ex: 05/08/2014', required: true, gridSpan: 'half' },
      { id: 'nomeAcompanhante', label: 'Nome do Acompanhante Responsável', type: 'text', placeholder: 'Ex: Tio João Batista Barbosa', required: true, gridSpan: 'full' },
      { id: 'cpfAcompanhante', label: 'CPF do Acompanhante', type: 'cpf', placeholder: '000.000.000-00', required: true, gridSpan: 'half' },
      { id: 'cidadeDestino', label: 'Cidade / Estado de Destino', type: 'text', placeholder: 'Ex: Curitiba - PR', required: true, gridSpan: 'half' },
      { id: 'periodoViagem', label: 'Período da Viagem', type: 'text', placeholder: 'Ex: De 10 a 25 de janeiro de 2027', required: true, gridSpan: 'half' },
      { id: 'cidade', label: 'Cidade', type: 'text', placeholder: 'Porto Velho', required: true, gridSpan: 'half' },
      { id: 'estado', label: 'Estado (UF)', type: 'text', placeholder: 'RO', defaultValue: 'RO', required: true, gridSpan: 'half' }
    ],
    generateText: (v) => {
      const city = v.cidade || 'Porto Velho';
      const uf = v.estado || 'RO';
      return {
        title: 'AUTORIZAÇÃO DE VIAGEM E HOSPEDAGEM NACIONAL DE MENOR',
        body: [
          `Eu, ${v.nomePaiMae || '_______________________'}, inscrito(a) no CPF nº ${v.cpfPaiMae || '___________'} e RG nº ${v.rgPaiMae || '____________'}, na qualidade de genitor(a) e detentor(a) do poder familiar sobre o(a) menor:`,
          `>> ${v.nomeMenor || '_______________________'}, nascido(a) em ${v.dataNascimentoMenor || '__/__/____'},`,
          `AUTORIZO expressamente que o(a) menor supramencionado(a) VIAGE para a localidade de ${v.cidadeDestino || 'território nacional'} no período de ${v.periodoViagem || 'período programado'}, bem como HOSPEDE-SE em estabelecimentos hoteleiros, devidamente acompanhado(a) de:`,
          `>> ${v.nomeAcompanhante || '_______________________'}, portador(a) do CPF nº ${v.cpfAcompanhante || '___________'}, maior e capaz.`,
          `A presente autorização é outorgada em estrita conformidade com os Arts. 82 e 83 da Lei Federal nº 8.069/1990 (ECA).`
        ],
        cityDateLine: `${city} - ${uf}, ${formatBrazilianDate()}.`,
        signers: [
          { name: v.nomePaiMae || 'Genitor(a) Autorizante', document: `CPF: ${v.cpfPaiMae || '000.000.000-00'}`, role: 'Pai / Mãe / Responsável Legal' }
        ]
      };
    },
    faqs: [
      {
        question: 'Precisa reconhecer firma em cartório?',
        answer: 'Para hospedagem em hotéis e viagens de ônibus/avião, companhias e pousadas quase sempre exigem firma reconhecida por semelhança dos genitores ou assinatura eletrônica avançada pelo sistema oficial Gov.br.'
      }
    ]
  },
  {
    id: 'ausencia-bens',
    slug: 'declaracao-de-ausencia-de-bens-a-partilhar',
    title: 'Declaração de Inexistência de Bens a Partilhar',
    shortTitle: 'Sem Bens a Partilhar',
    category: 'familia',
    badge: 'Divórcio / Dissolução',
    description:
      'Declara que o casal durante a união ou casamento não amealhou bens patrimoniais móveis ou imóveis sujeitos a partilha.',
    whenToUse:
      'Processos de divórcio consensual em cartório, dissolução de união estável ou homologações judiciais simplificadas.',
    legalBase: 'Código de Processo Civil e Código Civil Brasileiro.',
    fields: [
      { id: 'nome1', label: 'Nome da 1ª Parte', type: 'text', placeholder: 'Ex: Gilberto Antunes', required: true, gridSpan: 'half' },
      { id: 'cpf1', label: 'CPF da 1ª Parte', type: 'cpf', placeholder: '000.000.000-00', required: true, gridSpan: 'half' },
      { id: 'nome2', label: 'Nome da 2ª Parte', type: 'text', placeholder: 'Ex: Marlene Souza Antunes', required: true, gridSpan: 'half' },
      { id: 'cpf2', label: 'CPF da 2ª Parte', type: 'cpf', placeholder: '000.000.000-00', required: true, gridSpan: 'half' },
      { id: 'cidade', label: 'Cidade', type: 'text', placeholder: 'Porto Velho', required: true, gridSpan: 'half' },
      { id: 'estado', label: 'Estado (UF)', type: 'text', placeholder: 'RO', defaultValue: 'RO', required: true, gridSpan: 'half' }
    ],
    generateText: (v) => {
      const city = v.cidade || 'Porto Velho';
      const uf = v.estado || 'RO';
      return {
        title: 'DECLARAÇÃO CONJUNTA DE INEXISTÊNCIA DE BENS A PARTILHAR',
        body: [
          `NÓS,`,
          `PRIMEIRO(A) DECLARANTE: ${v.nome1 || '_______________________'}, inscrito(a) no CPF sob o nº ${v.cpf1 || '___________'}, e`,
          `SEGUNDO(A) DECLARANTE: ${v.nome2 || '_______________________'}, inscrito(a) no CPF sob o nº ${v.cpf2 || '___________'},`,
          `DECLARAMOS, expressamente e de mútuo consentimento, sob as penas do Artigo 299 do Código Penal Brasileiro, que durante o período de nossa convivência/casamento NÃO ADQUIRIMOS qualquer patrimônio comum suscetível de partilha, não havendo imóveis, veículos, contas bancárias conjuntas ou quaisquer outros bens ativos ou passivos (dívidas) a serem partilhados entre nós.`,
          `Declaramos que cada parte proverá sua própria subsistência, renunciando a pedido de pensão alimentícia entre si.`
        ],
        cityDateLine: `${city} - ${uf}, ${formatBrazilianDate()}.`,
        signers: [
          { name: v.nome1 || 'Primeira Parte', document: `CPF: ${v.cpf1 || '000.000.000-00'}`, role: 'Declarante' },
          { name: v.nome2 || 'Segunda Parte', document: `CPF: ${v.cpf2 || '000.000.000-00'}`, role: 'Declarante' }
        ]
      };
    },
    faqs: [
      {
        question: 'Agiliza o divórcio em cartório?',
        answer: 'Sim, acelera expressivamente a escritura pública de divórcio, reduzindo os custos de emolumentos para a taxa mínima de divórcio sem partilha de bens.'
      }
    ]
  },
  {
    id: 'pensao-alimenticia',
    slug: 'declaracao-de-pensao-alimenticia',
    title: 'Declaração de Recebimento de Pensão Alimentícia',
    shortTitle: 'Recebimento de Pensão',
    category: 'familia',
    badge: 'Família & Alimentos',
    description:
      'Comprova o recebimento mensal de pensão alimentícia para sustento de filho(s) ou dependente, seja fixada judicialmente ou por acordo verbal entre os pais.',
    whenToUse:
      'Indispensável para composição de renda familiar em editais do Prouni, FIES, CadÚnico (Bolsa Família), matrículas em creches e solicitações de bolsa de estudo.',
    legalBase: 'Lei Federal nº 7.115/1983 e Artigo 1.694 da Lei nº 10.406/2002 (Código Civil).',
    fields: [
      { id: 'nomeRecebedor', label: 'Nome de Quem Recebe (Mãe/Pai ou Responsável)', type: 'text', placeholder: 'Ex: Tatiana de Oliveira Santos', required: true, gridSpan: 'full' },
      { id: 'cpfRecebedor', label: 'CPF do(a) Responsável', type: 'cpf', placeholder: '000.000.000-00', required: true, gridSpan: 'half' },
      { id: 'rgRecebedor', label: 'RG do(a) Responsável', type: 'text', placeholder: '123456 SSP/RO', required: true, gridSpan: 'half' },
      { id: 'nomeFilho', label: 'Nome do(s) Filho(s) / Beneficiário(s)', type: 'text', placeholder: 'Ex: Lucas Oliveira Santos (menor)', required: true, gridSpan: 'full' },
      { id: 'nomePagador', label: 'Nome do(a) Alimentante (Quem Paga)', type: 'text', placeholder: 'Ex: Marcelo Henrique Santos', required: true, gridSpan: 'full' },
      { id: 'cpfPagador', label: 'CPF de Quem Paga (se souber)', type: 'cpf', placeholder: '000.000.000-00', gridSpan: 'half' },
      { id: 'valorMensal', label: 'Valor Mensal Recebido (R$)', type: 'currency', placeholder: 'R$ 600,00', required: true, gridSpan: 'half' },
      { id: 'formaPagamento', label: 'Forma de Recebimento', type: 'select', options: [
        { value: 'Transferência Bancária / PIX', label: 'Transferência Bancária / PIX' },
        { value: 'Dinheiro em Espécie', label: 'Dinheiro em Espécie' },
        { value: 'Desconto em Folha de Pagamento', label: 'Desconto em Folha de Pagamento' },
        { value: 'Depósito em Conta Corrente/Poupança', label: 'Depósito em Conta' }
      ], defaultValue: 'Transferência Bancária / PIX', required: true, gridSpan: 'half' },
      { id: 'tipoAcordo', label: 'Origem da Pensão', type: 'select', options: [
        { value: 'Acordo verbal e voluntário entre as partes', label: 'Acordo verbal / informal' },
        { value: 'Decisão / Homologação Judicial', label: 'Processo Judicial' },
        { value: 'Escritura Pública de Cartório', label: 'Escritura Pública' }
      ], defaultValue: 'Acordo verbal e voluntário entre as partes', gridSpan: 'half' },
      { id: 'logradouro', label: 'Endereço da Residência', type: 'text', placeholder: 'Rua das Mangueiras, 210', required: true, gridSpan: 'full' },
      { id: 'cidade', label: 'Cidade', type: 'text', placeholder: 'Porto Velho', required: true, gridSpan: 'half' },
      { id: 'estado', label: 'Estado (UF)', type: 'text', placeholder: 'RO', defaultValue: 'RO', required: true, gridSpan: 'half' }
    ],
    generateText: (v) => {
      const city = v.cidade || 'Porto Velho';
      const uf = v.estado || 'RO';
      const pagadorCpf = v.cpfPagador ? `, inscrito(a) no CPF nº ${v.cpfPagador}` : '';
      return {
        title: 'DECLARAÇÃO DE RECEBIMENTO DE PENSÃO ALIMENTÍCIA',
        body: [
          `Eu, ${v.nomeRecebedor || '_______________________'}, inscrito(a) no CPF sob o nº ${v.cpfRecebedor || '___________'} e portador(a) do RG nº ${v.rgRecebedor || '____________'}, residente e domiciliado(a) na ${v.logradouro || '________________________'}, ${city} - ${uf},`,
          `DECLARO, para os devidos fins de comprovação de renda e sob as penas da Lei nº 7.115/1983 e do Artigo 299 do Código Penal Brasileiro, que RECEBO mensalmente a quantia de:`,
          `>> ${v.valorMensal || 'R$ 0,00'}, mediante ${v.formaPagamento || 'PIX'},`,
          `paga por ${v.nomePagador || '_______________________'}${pagadorCpf}, a título de PENSÃO ALIMENTÍCIA para a manutenção e sustento de ${v.nomeFilho || 'nosso(s) filho(s)'}, fruto de ${v.tipoAcordo || 'acordo entre as partes'}.`,
          `Declaro que o valor supracitado corresponde à integralidade do montante recebido periodicamente para tal finalidade, assumindo total responsabilidade pela veracidade das informações ora declaradas.`
        ],
        cityDateLine: `${city} - ${uf}, ${formatBrazilianDate()}.`,
        signers: [
          { name: v.nomeRecebedor || 'Nome do Recebedor', document: `CPF: ${v.cpfRecebedor || '000.000.000-00'}`, role: 'Declarante / Representante Legal' }
        ]
      };
    },
    faqs: [
      {
        question: 'O Prouni e o CadÚnico aceitam pensão recebida por acordo verbal?',
        answer: 'Sim! As comissões do MEC e assistentes sociais do CRAS aceitam plenamente a declaração assinada pelo genitor responsável nos termos da Lei 7.115/83, quando não há processo na Justiça.'
      }
    ]
  },
  {
    id: 'pagamento-pensao-alimenticia',
    slug: 'declaracao-de-pagamento-de-pensao-alimenticia',
    title: 'Declaração de Pagamento de Pensão Alimentícia',
    shortTitle: 'Pagamento de Pensão',
    category: 'familia',
    badge: 'Dedução de Renda',
    description:
      'Comprova que o declarante paga mensalmente alimentos a filho(s) ou ex-cônjuge, permitindo abater essa despesa do cálculo da renda bruta familiar.',
    whenToUse:
      'Processos seletivos do Prouni, FIES, pedidos de isenção, assistência social e comprovações de gastos obrigatórios mensais.',
    legalBase: 'Lei Federal nº 7.115/1983 e Artigo 1.694 do Código Civil.',
    fields: [
      { id: 'nomePagador', label: 'Nome do Alimentante (Quem Paga)', type: 'text', placeholder: 'Ex: Fernando Mendes Silveira', required: true, gridSpan: 'full' },
      { id: 'cpfPagador', label: 'CPF do Pagador', type: 'cpf', placeholder: '000.000.000-00', required: true, gridSpan: 'half' },
      { id: 'rgPagador', label: 'RG do Pagador', type: 'text', placeholder: '345678 SSP/RO', required: true, gridSpan: 'half' },
      { id: 'nomeBeneficiario', label: 'Nome do Filho(a) ou Alimentando', type: 'text', placeholder: 'Ex: Giovanna Silveira (filha)', required: true, gridSpan: 'full' },
      { id: 'nomeFavorecido', label: 'Nome de Quem Recebe o Valor (Ex: Mãe da criança)', type: 'text', placeholder: 'Ex: Camila Ferreira Rocha', required: true, gridSpan: 'full' },
      { id: 'valorMensal', label: 'Valor Mensal Pago (R$)', type: 'currency', placeholder: 'R$ 550,00', required: true, gridSpan: 'half' },
      { id: 'formaPagamento', label: 'Forma de Pagamento', type: 'text', placeholder: 'Ex: Transferência PIX / Dinheiro', defaultValue: 'Transferência PIX', gridSpan: 'half' },
      { id: 'cidade', label: 'Cidade', type: 'text', placeholder: 'Porto Velho', required: true, gridSpan: 'half' },
      { id: 'estado', label: 'Estado (UF)', type: 'text', placeholder: 'RO', defaultValue: 'RO', required: true, gridSpan: 'half' }
    ],
    generateText: (v) => {
      const city = v.cidade || 'Porto Velho';
      const uf = v.estado || 'RO';
      return {
        title: 'DECLARAÇÃO DE PAGAMENTO DE PENSÃO ALIMENTÍCIA',
        body: [
          `Eu, ${v.nomePagador || '_______________________'}, inscrito(a) no CPF nº ${v.cpfPagador || '___________'} e portador(a) do RG nº ${v.rgPagador || '____________'},`,
          `DECLARO, para todos os fins de direito e especialmente para instrução de cadastros socioeconômicos, sob as penas da Lei Federal nº 7.115/1983 e do Art. 299 do Código Penal, que PAGO mensalmente a quantia de:`,
          `>> ${v.valorMensal || 'R$ 0,00'}, mediante ${v.formaPagamento || 'PIX'},`,
          `a título de PENSÃO ALIMENTÍCIA para a manutenção do(a) alimentando(a) ${v.nomeBeneficiario || 'meu(minha) filho(a)'}, sendo o valor repassado diretamente a ${v.nomeFavorecido || 'o(a) genitor(a) guardião(ã)'}.`,
          `Declaro que o pagamento constitui obrigação regular ininterrupta, impactando diretamente na composição de minha receita disponível.`
        ],
        cityDateLine: `${city} - ${uf}, ${formatBrazilianDate()}.`,
        signers: [
          { name: v.nomePagador || 'Nome do Pagador', document: `CPF: ${v.cpfPagador || '000.000.000-00'}`, role: 'Alimentante / Pagador' }
        ]
      };
    },
    faqs: [
      {
        question: 'Essa declaração reduz minha renda per capita no Prouni?',
        answer: 'Sim, comprovar despesa com pensão alimentícia oficial ou formalmente declarada é aceito pelos comitês para demonstrar a real capacidade financeira da família.'
      }
    ]
  },
  {
    id: 'escolaridade',
    slug: 'declaracao-de-escolaridade',
    title: 'Declaração de Escolaridade e Ensino Público',
    shortTitle: 'Escolaridade',
    category: 'escolaridade',
    badge: 'Educação & Cotas',
    description:
      'Declara que o estudante cursou todo o Ensino Fundamental ou Médio em escola pública ou com bolsa integral, requisito básico para cotas no SiSU, Prouni e vestibulares.',
    whenToUse:
      'Inscrição e matrícula em cotas sociais de Universidades Públicas (SiSU), Institutos Federais (IFs), Prouni e isenção de taxas de inscrição do Enem e vestibulares.',
    legalBase: 'Lei Federal nº 12.711/2012 (Lei de Cotas) e Lei Federal nº 7.115/1983.',
    fields: [
      { id: 'nomeAluno', label: 'Nome Completo do Aluno', type: 'text', placeholder: 'Ex: Lucas Gabriel Moreira', required: true, gridSpan: 'full' },
      { id: 'cpfAluno', label: 'CPF do Aluno', type: 'cpf', placeholder: '000.000.000-00', required: true, gridSpan: 'half' },
      { id: 'rgAluno', label: 'RG do Aluno', type: 'text', placeholder: '123456 SSP/RO', required: true, gridSpan: 'half' },
      { id: 'nivelEnsino', label: 'Nível de Ensino Cursado', type: 'select', options: [
        { value: 'Ensino Médio completo', label: 'Ensino Médio completo' },
        { value: 'Ensino Fundamental completo', label: 'Ensino Fundamental completo' },
        { value: 'Ensino Fundamental e Médio integrais', label: 'Fundamental e Médio integrais' }
      ], defaultValue: 'Ensino Médio completo', required: true, gridSpan: 'half' },
      { id: 'tipoInstituicao', label: 'Tipo de Instituição', type: 'select', options: [
        { value: 'integralmente em Escola Pública da rede municipal/estadual/federal', label: 'Integralmente em Escola Pública' },
        { value: 'em Escola Particular na condição de bolsista integral (100%)', label: 'Escola Particular com Bolsa 100%' }
      ], defaultValue: 'integralmente em Escola Pública da rede municipal/estadual/federal', required: true, gridSpan: 'half' },
      { id: 'nomeEscola', label: 'Nome da Escola / Colégio', type: 'text', placeholder: 'Ex: E.E.E.F.M. Marechal Rondon', required: true, gridSpan: 'full' },
      { id: 'cidadeEscola', label: 'Cidade da Escola', type: 'text', placeholder: 'Porto Velho', required: true, gridSpan: 'half' },
      { id: 'estadoEscola', label: 'UF da Escola', type: 'text', placeholder: 'RO', defaultValue: 'RO', required: true, gridSpan: 'half' },
      { id: 'cidade', label: 'Cidade de Emissão', type: 'text', placeholder: 'Porto Velho', required: true, gridSpan: 'half' },
      { id: 'estado', label: 'Estado (UF)', type: 'text', placeholder: 'RO', defaultValue: 'RO', required: true, gridSpan: 'half' }
    ],
    generateText: (v) => {
      const city = v.cidade || 'Porto Velho';
      const uf = v.estado || 'RO';
      return {
        title: 'DECLARAÇÃO DE ESCOLARIDADE EM REDE PÚBLICA DE ENSINO',
        body: [
          `Eu, ${v.nomeAluno || '_______________________'}, inscrito(a) no CPF sob o nº ${v.cpfAluno || '___________'} e portador(a) do RG nº ${v.rgAluno || '____________'},`,
          `DECLARO, para fins de comprovação perante comissões de heteroidentificação, análise socioeconômica e bancas de matrícula universitária, sob as penas da Lei Federal nº 7.115/1983 e em estrita consonância com a Lei nº 12.711/2012 (Lei de Cotas), que cursei o:`,
          `>> ${v.nivelEnsino || 'Ensino Médio'}, ${v.tipoInstituicao || 'integralmente em Escola Pública'},`,
          `tendo realizado meus estudos no estabelecimento de ensino: ${v.nomeEscola || 'Escola da Rede Pública'}, situado no município de ${v.cidadeEscola || city} - ${v.estadoEscola || uf}.`,
          `Declaro estar ciente de que a comprovação falsa sujeitará o candidato ao cancelamento imediato de sua matrícula e à responsabilização criminal nos termos do Art. 299 do Código Penal.`
        ],
        cityDateLine: `${city} - ${uf}, ${formatBrazilianDate()}.`,
        signers: [
          { name: v.nomeAluno || 'Nome do Estudante', document: `CPF: ${v.cpfAluno || '000.000.000-00'}`, role: 'Declarante / Estudante' }
        ]
      };
    },
    faqs: [
      {
        question: 'Quem estudou em colégio militar ou federal tem direito a cotas?',
        answer: 'Sim! Colégios militares e Institutos Federais (IFs) integram a rede pública de ensino para todos os efeitos da Lei nº 12.711/2012.'
      }
    ]
  },
  {
    id: 'estado-civil',
    slug: 'declaracao-de-estado-civil',
    title: 'Declaração de Estado Civil',
    shortTitle: 'Estado Civil',
    category: 'familia',
    badge: 'Identificação Civil',
    description:
      'Declara solenemente a condição de solteiro(a), viúvo(a), separado(a) ou divorciado(a), atestando a inexistência de casamento ou união estável impeditiva.',
    whenToUse:
      'Financiamentos na Caixa Econômica, aquisição de imóveis, abertura de empresas em Juntas Comerciais e concursos públicos.',
    legalBase: 'Lei Federal nº 7.115/1983 e Artigo 1.511 do Código Civil Brasileiro.',
    fields: [
      { id: 'nome', label: 'Nome Completo', type: 'text', placeholder: 'Ex: Rodrigo Medeiros da Costa', required: true, gridSpan: 'full' },
      { id: 'cpf', label: 'CPF', type: 'cpf', placeholder: '000.000.000-00', required: true, gridSpan: 'half' },
      { id: 'rg', label: 'RG / Órgão Emissor', type: 'text', placeholder: '123456 SSP/RO', required: true, gridSpan: 'half' },
      { id: 'estadoCivilAtual', label: 'Estado Civil a Declarar', type: 'select', options: [
        { value: 'SOLTEIRO(A)', label: 'Solteiro(a)' },
        { value: 'DIVORCIADO(A)', label: 'Divorciado(a)' },
        { value: 'VIÚVO(A)', label: 'Viúvo(a)' },
        { value: 'SEPARADO(A) JUDICIALMENTE', label: 'Separado(a) Judicialmente' }
      ], defaultValue: 'SOLTEIRO(A)', required: true, gridSpan: 'half' },
      { id: 'mantemUniao', label: 'Possui União Estável?', type: 'select', options: [
        { value: 'não mantenho qualquer convivência sob regime de união estável', label: 'Não possuo união estável' },
        { value: 'vivo em união estável sem casamento civil', label: 'Vivo em união estável' }
      ], defaultValue: 'não mantenho qualquer convivência sob regime de união estável', required: true, gridSpan: 'half' },
      { id: 'logradouro', label: 'Endereço Residencial', type: 'text', placeholder: 'Av. Pinheiro Machado, 890', required: true, gridSpan: 'full' },
      { id: 'cidade', label: 'Cidade', type: 'text', placeholder: 'Porto Velho', required: true, gridSpan: 'half' },
      { id: 'estado', label: 'Estado (UF)', type: 'text', placeholder: 'RO', defaultValue: 'RO', required: true, gridSpan: 'half' }
    ],
    generateText: (v) => {
      const city = v.cidade || 'Porto Velho';
      const uf = v.estado || 'RO';
      return {
        title: 'DECLARAÇÃO DE ESTADO CIVIL',
        body: [
          `Eu, ${v.nome || '_______________________'}, inscrito(a) no CPF sob o nº ${v.cpf || '___________'} e portador(a) da cédula de identidade RG nº ${v.rg || '____________'}, residente na ${v.logradouro || '________________________'}, ${city} - ${uf},`,
          `DECLARO, para todos os efeitos jurídicos perante quaisquer instituições financeiras, cartorárias ou administrativas, sob as penas da Lei nº 7.115/1983 e do Art. 299 do Código Penal, que meu estado civil é:`,
          `>> ${v.estadoCivilAtual || 'SOLTEIRO(A)'},`,
          `e que ${v.mantemUniao || 'não mantenho qualquer convivência sob regime de união estável'}, não havendo impedimento matrimonial nem regime de bens compartilhado com terceiros que vincule meu patrimônio pessoal.`,
          `Por ser a expressão incontestável da verdade, firmo a presente declaração.`
        ],
        cityDateLine: `${city} - ${uf}, ${formatBrazilianDate()}.`,
        signers: [
          { name: v.nome || 'Nome do Declarante', document: `CPF: ${v.cpf || '000.000.000-00'}`, role: 'Declarante' }
        ]
      };
    },
    faqs: [
      {
        question: 'Quem é divorciado no papel mas mora com outra pessoa precisa declarar?',
        answer: 'Sim, o estado civil formal da certidão continua sendo divorciado, mas é prudente informar a existência da união estável se o negócio envolver financiamento de imóvel.'
      }
    ]
  },
  {
    id: 'ausencia-residencia',
    slug: 'declaracao-de-ausencia-de-residencia-fixa',
    title: 'Declaração de Ausência de Residência Fixa / Itinerante',
    shortTitle: 'Sem Residência Fixa',
    category: 'residencia',
    badge: 'Moradia Transitória',
    description:
      'Atesta que a pessoa exerce atividade transitória ou itinerante e não possui domicílio residencial fixo no momento.',
    whenToUse:
      'Trabalhadores rurais em safra, prestadores de serviços em obras rodoviárias/florestais, caminhoneiros, artistas e cadastros de assistência social.',
    legalBase: 'Artigo 73 da Lei nº 10.406/2002 (Código Civil) e Lei Federal nº 7.115/1983.',
    fields: [
      { id: 'nome', label: 'Nome Completo', type: 'text', placeholder: 'Ex: Valdemar de Souza Neves', required: true, gridSpan: 'full' },
      { id: 'cpf', label: 'CPF', type: 'cpf', placeholder: '000.000.000-00', required: true, gridSpan: 'half' },
      { id: 'rg', label: 'RG', type: 'text', placeholder: 'Ex: 234567 SSP/RO', required: true, gridSpan: 'half' },
      { id: 'profissao', label: 'Atividade / Ocupação', type: 'text', placeholder: 'Ex: Motorista carreteiro / Trabalhador rural', required: true, gridSpan: 'half' },
      { id: 'motivoTransito', label: 'Motivo da Ausência de Residência Fixa', type: 'text', placeholder: 'Ex: Atividade profissional itinerante e constantes deslocamentos', defaultValue: 'constantes deslocamentos profissionais e alojamento temporário', required: true, gridSpan: 'full' },
      { id: 'pontoContato', label: 'Local ou Ponto de Contato / Correspondência', type: 'text', placeholder: 'Ex: Alojamento da Empresa / Casa de familiares no Centro', required: true, gridSpan: 'full' },
      { id: 'cidade', label: 'Cidade de Referência', type: 'text', placeholder: 'Porto Velho', required: true, gridSpan: 'half' },
      { id: 'estado', label: 'Estado (UF)', type: 'text', placeholder: 'RO', defaultValue: 'RO', required: true, gridSpan: 'half' }
    ],
    generateText: (v) => {
      const city = v.cidade || 'Porto Velho';
      const uf = v.estado || 'RO';
      return {
        title: 'DECLARAÇÃO DE AUSÊNCIA DE RESIDÊNCIA FIXA',
        body: [
          `Eu, ${v.nome || '_______________________'}, inscrito(a) no CPF nº ${v.cpf || '___________'} e portador(a) do RG nº ${v.rg || '____________'}, de profissão ${v.profissao || 'trabalhador(a)'},`,
          `DECLARO, para os devidos fins de direito e em consonância com o Artigo 73 do Código Civil Brasileiro ("Ter-se-á por domicílio da pessoa natural, que não tiver residência habitual, o lugar onde for encontrada"), sob as penas da Lei nº 7.115/1983, que:`,
          `NÃO POSSUO RESIDÊNCIA FIXA OU DOMICÍLIO HABITUAL no presente momento, em virtude de: ${v.motivoTransito || 'constantes deslocamentos e alojamento temporário'}, residindo temporariamente onde me encontro a trabalho.`,
          `Indico como ponto de referência para comunicações e correspondências: ${v.pontoContato || 'endereço temporário'}, no município de ${city} - ${uf}.`,
          `Declaro ter ciência das penas de crime de falsidade ideológica (Art. 299 do Código Penal) caso preste declaração inverídica.`
        ],
        cityDateLine: `${city} - ${uf}, ${formatBrazilianDate()}.`,
        signers: [
          { name: v.nome || 'Nome do Declarante', document: `CPF: ${v.cpf || '000.000.000-00'}`, role: 'Declarante em Trânsito' }
        ]
      };
    },
    faqs: [
      {
        question: 'O Código Civil prevê a situação de quem não tem moradia fixa?',
        answer: 'Sim! O Artigo 73 do Código Civil Brasileiro estabelece expressamente que o domicílio da pessoa que não possui residência fixa é o local onde ela for encontrada.'
      }
    ]
  },
  {
    id: 'hipossuficiencia',
    slug: 'declaracao-de-hipossuficiencia',
    title: 'Declaração de Hipossuficiência Econômica / Justiça Gratuita',
    shortTitle: 'Hipossuficiência (Justiça Gratuita)',
    category: 'renda',
    badge: 'Art. 98 CPC / Justiça Gratuita',
    description:
      'Atesta a insuficiência de recursos financeiros para pagar custas processuais, taxas judiciárias e honorários sem prejuízo do sustento próprio e da família.',
    whenToUse:
      'Ações judiciais na Justiça Estadual, Federal ou Trabalhista, Juizados Especiais Cíveis (JEC), atendimento na Defensoria Pública e isenção de taxas cartorárias.',
    legalBase: 'Art. 98 e 99 da Lei nº 13.105/2015 (CPC), Lei Federal nº 1.060/1950, Art. 5º, LXXIV da CF/88 e Lei Federal nº 7.115/1983.',
    fields: [
      { id: 'nome', label: 'Nome Completo do Declarante', type: 'text', placeholder: 'Ex: Maria de Fátima Albuquerque', required: true, gridSpan: 'full' },
      { id: 'cpf', label: 'CPF', type: 'cpf', placeholder: '000.000.000-00', required: true, gridSpan: 'half' },
      { id: 'rg', label: 'RG / Órgão Emissor', type: 'text', placeholder: '123456 SSP/RO', required: true, gridSpan: 'half' },
      { id: 'nacionalidade', label: 'Nacionalidade', type: 'text', placeholder: 'Brasileira', defaultValue: 'Brasileira', required: true, gridSpan: 'half' },
      { id: 'estadoCivil', label: 'Estado Civil', type: 'select', options: [
        { value: 'solteiro(a)', label: 'Solteiro(a)' },
        { value: 'casado(a)', label: 'Casado(a)' },
        { value: 'em união estável', label: 'Em união estável' },
        { value: 'divorciado(a)', label: 'Divorciado(a)' },
        { value: 'viúvo(a)', label: 'Viúvo(a)' }
      ], defaultValue: 'solteiro(a)', required: true, gridSpan: 'half' },
      { id: 'profissao', label: 'Profissão / Ocupação', type: 'text', placeholder: 'Ex: Auxiliar de serviços gerais', required: true, gridSpan: 'half' },
      { id: 'rendaMensalAprox', label: 'Renda Mensal Líquida Aproximada', type: 'text', placeholder: 'Ex: R$ 1.600,00 ou Não possuo renda fixa', defaultValue: 'R$ 1.500,00', required: true, gridSpan: 'half' },
      { id: 'orgaoJuizo', label: 'Órgão / Juízo / Vara Destinatária', type: 'text', placeholder: 'Ex: Juizado Especial Cível da Comarca / Defensoria Pública do Estado', required: true, gridSpan: 'full' },
      { id: 'processoNumero', label: 'Número dos Autos / Processo (se já houver)', type: 'text', placeholder: 'Ex: 0001234-56.2026.8.22.0001 ou Deixar em branco', gridSpan: 'full' },
      { id: 'logradouro', label: 'Endereço Residencial Completo', type: 'text', placeholder: 'Rua das Flores, 450, Bairro Esperança', required: true, gridSpan: 'full' },
      { id: 'cidade', label: 'Cidade', type: 'text', placeholder: 'Porto Velho', required: true, gridSpan: 'half' },
      { id: 'estado', label: 'Estado (UF)', type: 'text', placeholder: 'RO', defaultValue: 'RO', required: true, gridSpan: 'half' }
    ],
    generateText: (v) => {
      const city = v.cidade || 'Porto Velho';
      const uf = v.estado || 'RO';
      const processoInfo = v.processoNumero && v.processoNumero.trim() ? ` (Processo nº ${v.processoNumero.trim()})` : '';
      return {
        title: 'DECLARAÇÃO DE HIPOSSUFICIÊNCIA ECONÔMICA (JUSTIÇA GRATUITA)',
        body: [
          `Eu, ${v.nome || '_______________________'}, nacionalidade ${v.nacionalidade || 'brasileira'}, estado civil ${v.estadoCivil || 'solteiro(a)'}, profissão ${v.profissao || 'trabalhador(a)'}, inscrito(a) no Cadastro de Pessoas Físicas (CPF) sob o nº ${v.cpf || '___________'} e portador(a) do RG nº ${v.rg || '____________'}, domiciliado(a) e residente na ${v.logradouro || '________________________'}, município de ${city} - ${uf},`,
          `DECLARO perante ${v.orgaoJuizo || 'o Poder Judiciário / Defensoria Pública'}${processoInfo}, para todos os fins de direito e sob as expressas cominações da Lei, que:`,
          `NÃO POSSUO CONDIÇÕES FINANCEIRAS de suportar o pagamento das custas processuais, despesas com emolumentos judiciais, certidões e honorários advocatícios sem gravame severo ou prejuízo do sustento próprio e de minha família, em virtude de minha renda mensal aproximada de ${v.rendaMensalAprox || 'rendimento insuficiente'}.`,
          `Por tal razão, REQUEIRO a concessão dos benefícios da GRATUIDADE DA JUSTIÇA, em estrita consonância com o Artigo 5º, inciso LXXIV da Constituição Federal de 1988, com os Artigos 98 e 99 da Lei Federal nº 13.105/2015 (Código de Processo Civil) e com a Lei Federal nº 1.060/1950.`,
          `Declaro estar ciente de que o Artigo 99, § 3º, do CPC estabelece a presunção legal de veracidade da alegação de insuficiência deduzida por pessoa natural, e de que a afirmação falsa enseja responsabilização civil e criminal na forma do Artigo 299 do Código Penal.`
        ],
        cityDateLine: `${city} - ${uf}, ${formatBrazilianDate()}.`,
        signers: [
          { name: v.nome || 'Nome do Requerente', document: `CPF: ${v.cpf || '000.000.000-00'}`, role: 'Declarante / Requerente da Justiça Gratuita' }
        ]
      };
    },
    faqs: [
      {
        question: 'Quem tem direito ao benefício da Justiça Gratuita?',
        answer: 'Qualquer pessoa física brasileira ou estrangeira com insuficiência de recursos para pagar custas e honorários. Pelo Artigo 99, § 3º do CPC, a declaração de insuficiência assinada pela pessoa natural tem presunção legal de veracidade.'
      },
      {
        question: 'Precisa reconhecer firma em cartório da declaração de hipossuficiência?',
        answer: 'Não. Pela Lei 13.726/2018 e pelo próprio Código de Processo Civil, a assinatura simples ou eletrônica pelo Gov.br é suficiente para juntada aos autos pelo advogado ou Defensoria Pública.'
      }
    ]
  },
  {
    id: 'etnico-racial',
    slug: 'autodeclaracao-etnico-racial',
    title: 'Autodeclaração Étnico-Racial (Preto, Pardo ou Indígena)',
    shortTitle: 'Autodeclaração Étnico-Racial',
    category: 'escolaridade',
    badge: 'Lei 12.711 / Cotas Raciais',
    description:
      'Declaração oficial e voluntária de pertencimento à população negra (preto ou pardo) ou indígena para bancas de heteroidentificação e cotas.',
    whenToUse:
      'Inscrição e matrícula em cotas sociais e raciais no SiSU, Prouni, Institutos Federais, vestibulares e concursos públicos federais (Lei 12.990/14), estaduais e municipais.',
    legalBase: 'Lei Federal nº 12.711/2012, Lei Federal nº 12.990/2014, Estatuto da Igualdade Racial (Lei nº 12.288/2010) e Portaria Normativa nº 4/2018 MPDG.',
    fields: [
      { id: 'nome', label: 'Nome Completo do Candidato(a)', type: 'text', placeholder: 'Ex: Thiago Henrique dos Santos', required: true, gridSpan: 'full' },
      { id: 'cpf', label: 'CPF', type: 'cpf', placeholder: '000.000.000-00', required: true, gridSpan: 'half' },
      { id: 'rg', label: 'RG / Órgão Emissor', type: 'text', placeholder: '123456 SSP/RO', required: true, gridSpan: 'half' },
      { id: 'corRaca', label: 'Cor ou Raça Autodeclarada', type: 'select', options: [
        { value: 'PRETO(A)', label: 'Preto(a)' },
        { value: 'PARDO(A)', label: 'Pardo(a)' },
        { value: 'INDÍGENA', label: 'Indígena' }
      ], defaultValue: 'PARDO(A)', required: true, gridSpan: 'half' },
      { id: 'etniaIndigena', label: 'Nome da Comunidade / Povo Indígena (se aplicável)', type: 'text', placeholder: 'Ex: Povo Karipuna / Deixar em branco se preto ou pardo', gridSpan: 'half' },
      { id: 'instituicaoBanca', label: 'Instituição de Ensino / Órgão ou Banca Examinadora', type: 'text', placeholder: 'Ex: Universidade Federal de Rondônia - UNIR / CEBRASPE', required: true, gridSpan: 'full' },
      { id: 'editalNumero', label: 'Número do Edital / Concurso / Processo Seletivo', type: 'text', placeholder: 'Ex: Edital nº 01/2026 - SiSU / Vestibular', required: true, gridSpan: 'half' },
      { id: 'cargoOuCurso', label: 'Curso de Graduação ou Cargo Pretendido', type: 'text', placeholder: 'Ex: Medicina / Analista Judiciário', required: true, gridSpan: 'half' },
      { id: 'logradouro', label: 'Endereço Residencial', type: 'text', placeholder: 'Rua das Oliveiras, 120', required: true, gridSpan: 'full' },
      { id: 'cidade', label: 'Cidade', type: 'text', placeholder: 'Porto Velho', required: true, gridSpan: 'half' },
      { id: 'estado', label: 'Estado (UF)', type: 'text', placeholder: 'RO', defaultValue: 'RO', required: true, gridSpan: 'half' }
    ],
    generateText: (v) => {
      const city = v.cidade || 'Porto Velho';
      const uf = v.estado || 'RO';
      const raca = v.corRaca || 'PARDO(A)';
      const etniaDet = raca === 'INDÍGENA' && v.etniaIndigena ? ` do povo/comunidade indígena ${v.etniaIndigena}` : '';
      return {
        title: 'AUTODECLARAÇÃO ÉTNICO-RACIAL',
        body: [
          `Eu, ${v.nome || '_______________________'}, inscrito(a) no Cadastro de Pessoas Físicas (CPF) sob o nº ${v.cpf || '___________'} e portador(a) da Cédula de Identidade RG nº ${v.rg || '____________'}, domiciliado(a) e residente na ${v.logradouro || '________________________'}, município de ${city} - ${uf},`,
          `Candidato(a) inscrito(a) no Processo Seletivo regido pelo Edital: ${v.editalNumero || 'Edital Vigente'}, concorrendo à vaga de: ${v.cargoOuCurso || 'Vaga Reservada'}, perante a instituição: ${v.instituicaoBanca || 'Banca Examinadora / Instituição de Ensino'},`,
          `DECLARO SOLENEMENTE, sob as penas da Lei e para fins específicos de concorrência às vagas reservadas para ações afirmativas de políticas de cotas étnico-raciais, que:`,
          `ME AUTODECLARO PESSOA ${raca}${etniaDet}, nos termos da classificação oficial do Instituto Brasileiro de Geografia e Estatística (IBGE), do Estatuto da Igualdade Racial (Lei nº 12.288/2010) e da legislação aplicável (Lei nº 12.711/2012 e Lei nº 12.990/2014).`,
          `Declaro estar plenamente ciente de que a presente autodeclaração será submetida à Comissão de Heteroidentificação e que a constatação de falsidade ensejará a eliminação imediata do certame, anulação de matrícula ou exoneração do cargo, sem prejuízo de sanções criminais por falsidade ideológica (Art. 299 do Código Penal).`
        ],
        cityDateLine: `${city} - ${uf}, ${formatBrazilianDate()}.`,
        signers: [
          { name: v.nome || 'Nome do Candidato(a)', document: `CPF: ${v.cpf || '000.000.000-00'}`, role: 'Declarante / Candidato(a)' }
        ]
      };
    },
    faqs: [
      {
        question: 'Quem é considerado pardo para a autodeclaração?',
        answer: 'De acordo com o IBGE e as comissões de heteroidentificação, pardo é a pessoa que possui fenótipo negro (características físicas como traços faciais, cabelo e tom de pele decorrentes da ancestralidade negra).'
      },
      {
        question: 'A autodeclaração substitui a banca de heteroidentificação?',
        answer: 'A autodeclaração é o documento inicial obrigatório. Em concursos federais e vestibulares de federais, o candidato também passa por procedimento de verificação presencial ou por teleconferência pela comissão.'
      }
    ]
  },
  {
    id: 'veracidade-documentos',
    slug: 'declaracao-de-veracidade-de-documentos',
    title: 'Declaração de Veracidade e Autenticidade de Documentos',
    shortTitle: 'Veracidade de Documentos',
    category: 'geral',
    badge: 'Lei 13.726/18 Desburocratização',
    description:
      'Atesta sob as penas da lei que as cópias de documentos físicos ou digitais apresentados conferem fielmente com os originais, dispensando cartório.',
    whenToUse:
      'Apresentação de documentos em órgãos públicos federais, estaduais, municipais, conselhos profissionais, universidades e bancos com dispensa de firma/cópia autenticada.',
    legalBase: 'Artigo 3º, inciso II da Lei Federal nº 13.726/2018 (Lei da Desburocratização) e Artigo 299 do Código Penal.',
    fields: [
      { id: 'nome', label: 'Nome Completo do Apresentante', type: 'text', placeholder: 'Ex: Carlos Alberto Miranda', required: true, gridSpan: 'full' },
      { id: 'cpf', label: 'CPF', type: 'cpf', placeholder: '000.000.000-00', required: true, gridSpan: 'half' },
      { id: 'rg', label: 'RG / Órgão Emissor', type: 'text', placeholder: '123456 SSP/RO', required: true, gridSpan: 'half' },
      { id: 'instituicaoDestino', label: 'Órgão / Empresa / Instituição Destinatária', type: 'text', placeholder: 'Ex: Prefeitura Municipal / Secretaria de Educação / Banco', required: true, gridSpan: 'full' },
      { id: 'processoOuEdital', label: 'Número de Processo / Protocolo / Matrícula (opcional)', type: 'text', placeholder: 'Ex: Protocolo nº 9876/2026', gridSpan: 'full' },
      { id: 'documentosRelacionados', label: 'Relação dos Documentos Apresentados', type: 'textarea', placeholder: 'Ex: 1) Cópia da Cédula de Identidade RG e CPF;\n2) Cópia do Comprovante de Residência;\n3) Cópia do Histórico Escolar e Certificado de Conclusão;\n4) Cópia da Certidão de Casamento.', required: true, gridSpan: 'full' },
      { id: 'logradouro', label: 'Endereço Residencial', type: 'text', placeholder: 'Av. Jorge Teixeira, 1400', required: true, gridSpan: 'full' },
      { id: 'cidade', label: 'Cidade', type: 'text', placeholder: 'Porto Velho', required: true, gridSpan: 'half' },
      { id: 'estado', label: 'Estado (UF)', type: 'text', placeholder: 'RO', defaultValue: 'RO', required: true, gridSpan: 'half' }
    ],
    generateText: (v) => {
      const city = v.cidade || 'Porto Velho';
      const uf = v.estado || 'RO';
      const prot = v.processoOuEdital ? ` (Referência / Protocolo: ${v.processoOuEdital})` : '';
      return {
        title: 'DECLARAÇÃO DE VERACIDADE E AUTENTICIDADE DE DOCUMENTOS',
        body: [
          `Eu, ${v.nome || '_______________________'}, inscrito(a) no Cadastro de Pessoas Físicas (CPF) sob o nº ${v.cpf || '___________'} e portador(a) do RG nº ${v.rg || '____________'}, domiciliado(a) e residente na ${v.logradouro || '________________________'}, município de ${city} - ${uf},`,
          `DECLARO, para os devidos fins de direito perante ${v.instituicaoDestino || 'o Órgão / Entidade Destinatária'}${prot}, com fundamento expresso no Artigo 3º, inciso II, da Lei Federal nº 13.726/2018 (Lei da Desburocratização e Simplificação de Atos Administrativos):`,
          `Que todos os documentos físicos entregues em cópia ou arquivos eletrônicos anexados no formato digital, relacionados a seguir, SÃO CÓPIAS FIÉIS, VERÍDICAS E AUTÊNTICAS de seus respectivos originais, os quais se encontram sob minha posse e guarda para eventual confronto:`,
          `DOCUMENTOS APRESENTADOS:`,
          v.documentosRelacionados || 'Documentos pessoais e comprovantes de praxe.',
          `Declaro ter pleno conhecimento de que a prestação de declaração falsa sujeita o infrator às sanções administrativas e à responsabilização penal pelo crime de falsidade ideológica (Art. 299 do Código Penal), além de cancelamento de quaisquer atos praticados com fundamento nos aludidos documentos.`
        ],
        cityDateLine: `${city} - ${uf}, ${formatBrazilianDate()}.`,
        signers: [
          { name: v.nome || 'Nome do Declarante', document: `CPF: ${v.cpf || '000.000.000-00'}`, role: 'Declarante / Apresentante' }
        ]
      };
    },
    faqs: [
      {
        question: 'A Lei 13.726/2018 realmente dispensa a cópia autenticada?',
        answer: 'Sim! O Artigo 3º, inciso II da Lei nº 13.726/2018 proíbe órgãos públicos federais, estaduais e municipais de exigirem autenticação de cópia de documento em cartório quando o cidadão apresentar a declaração de autenticidade.'
      }
    ]
  },
  {
    id: 'uso-imagem',
    slug: 'autorizacao-de-uso-de-imagem',
    title: 'Autorização e Termo de Cessão de Uso de Imagem e Voz',
    shortTitle: 'Uso de Imagem e Voz',
    category: 'geral',
    badge: 'Art. 20 CC / LGPD',
    description:
      'Autorização expressa para captação, fixação e veiculação de fotos, vídeos e áudios para fins institucionais, educativos, artísticos ou promocionais.',
    whenToUse:
      'Escolas, faculdades, produtoras audiovisuais, empresas, palestras, academias e campanhas de redes sociais, em estrita conformidade com a LGPD e o Código Civil.',
    legalBase: 'Art. 5º, incisos X e XXVIII da CF/88, Art. 20 do Código Civil (Lei 10.406/2002) e Lei Geral de Proteção de Dados (Lei 13.709/2018).',
    fields: [
      { id: 'tipoTitular', label: 'Titular da Imagem', type: 'select', options: [
        { value: 'em meu próprio nome', label: 'A própria pessoa (maior de 18 anos)' },
        { value: 'na qualidade de representante legal de menor', label: 'Pai/Mãe/Responsável por menor de idade' }
      ], defaultValue: 'em meu próprio nome', required: true, gridSpan: 'half' },
      { id: 'nomeCedente', label: 'Nome Completo do Declarante / Responsável', type: 'text', placeholder: 'Ex: Juliana Castro Guimarães', required: true, gridSpan: 'half' },
      { id: 'cpfCedente', label: 'CPF', type: 'cpf', placeholder: '000.000.000-00', required: true, gridSpan: 'half' },
      { id: 'rgCedente', label: 'RG', type: 'text', placeholder: '123456 SSP/RO', required: true, gridSpan: 'half' },
      { id: 'nomeMenor', label: 'Nome do Menor de Idade (se for o caso)', type: 'text', placeholder: 'Ex: Arthur Castro Guimarães (deixar em branco se for você)', gridSpan: 'full' },
      { id: 'nomeCessionario', label: 'Nome da Empresa / Escola / Produtora Autorizada', type: 'text', placeholder: 'Ex: Colégio Futuro Ltda / Agência Criativa', required: true, gridSpan: 'full' },
      { id: 'cnpjCessionario', label: 'CNPJ ou CPF do Cessionário', type: 'text', placeholder: '00.000.000/0001-00', required: true, gridSpan: 'half' },
      { id: 'finalidadeUso', label: 'Finalidade da Utilização da Imagem/Voz', type: 'text', placeholder: 'Ex: Divulgação institucional, redes sociais, website oficial e material educativo', defaultValue: 'Divulgação institucional, redes sociais, website e material educativo', required: true, gridSpan: 'full' },
      { id: 'prazoVigencia', label: 'Prazo de Vigência da Autorização', type: 'select', options: [
        { value: 'por prazo indeterminado', label: 'Prazo Indeterminado' },
        { value: 'pelo prazo de 12 (doze) meses', label: '12 meses (1 ano)' },
        { value: 'pelo prazo de 24 (vinte e quatro) meses', label: '24 meses (2 anos)' },
        { value: 'pelo prazo de 5 (cinco) anos', label: '5 anos' }
      ], defaultValue: 'por prazo indeterminado', required: true, gridSpan: 'half' },
      { id: 'caraterCessao', label: 'Caráter da Cessão', type: 'select', options: [
        { value: 'a título gratuito, livre de royalties ou cachê', label: 'Gratuita (sem cachê ou royalties)' },
        { value: 'vinculada ao contrato de prestação de serviços', label: 'Vinculada a contrato de prestação' }
      ], defaultValue: 'a título gratuito, livre de royalties ou cachê', required: true, gridSpan: 'half' },
      { id: 'cidade', label: 'Cidade', type: 'text', placeholder: 'Porto Velho', required: true, gridSpan: 'half' },
      { id: 'estado', label: 'Estado (UF)', type: 'text', placeholder: 'RO', defaultValue: 'RO', required: true, gridSpan: 'half' }
    ],
    generateText: (v) => {
      const city = v.cidade || 'Porto Velho';
      const uf = v.estado || 'RO';
      const isMenor = v.tipoTitular && v.tipoTitular.includes('menor');
      const titularTexto = isMenor && v.nomeMenor
        ? `na qualidade de representante legal e genitor(a) do(a) menor ${v.nomeMenor}`
        : 'em nome próprio';
      return {
        title: 'TERMO DE AUTORIZAÇÃO E CESSÃO DE USO DE IMAGEM E VOZ',
        body: [
          `Eu, ${v.nomeCedente || '_______________________'}, portador(a) do RG nº ${v.rgCedente || '____________'} e inscrito(a) no CPF nº ${v.cpfCedente || '___________'}, ${titularTexto},`,
          `AUTORIZO expressamente a entidade/empresa ${v.nomeCessionario || '_______________________'}, inscrita no CNPJ/CPF sob o nº ${v.cnpjCessionario || '_________________'}, a captar, fixar, reproduzir, editar e veicular minha imagem (e/ou a do menor supramencionado), bem como a respectiva voz, em fotografias, gravações audiovisuais, filmagens e materiais correlatos.`,
          `A presente concessão destina-se exclusivamente para a finalidade de: ${v.finalidadeUso || 'Divulgação institucional e redes sociais'}, abrangendo publicações em sítios eletrônicos da internet, canais de streaming, redes sociais oficiais, informativos, catálogos e materiais institucionais impressos ou digitais.`,
          `A cessão dos direitos sobre a imagem e voz é outorgada ${v.caraterCessao || 'a título gratuito, livre de royalties'}, ${v.prazoVigencia || 'por prazo indeterminado'}, renunciando o(a) cedente a qualquer indenização financeira posterior relativa ao uso autorizado, nos termos do Artigo 20 da Lei Federal nº 10.406/2002 e da Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018).`
        ],
        cityDateLine: `${city} - ${uf}, ${formatBrazilianDate()}.`,
        signers: [
          { name: v.nomeCedente || 'Nome do Cedente / Responsável', document: `CPF: ${v.cpfCedente || '000.000.000-00'}`, role: isMenor ? 'Responsável Legal do Menor' : 'Cedente / Titular da Imagem' }
        ]
      };
    },
    faqs: [
      {
        question: 'É obrigatório ter termo de imagem assinado para postar fotos nas redes sociais?',
        answer: 'Sim! O Artigo 20 do Código Civil e a LGPD exigem consentimento prévio e expresso do titular (ou dos pais, no caso de crianças) para veiculação pública de fotografias e vídeos, prevenindo passivos indenizatórios.'
      }
    ]
  },
  {
    id: 'renda-mei',
    slug: 'comprovante-de-renda-mei',
    title: 'Comprovante e Declaração de Renda de Microempreendedor Individual (MEI)',
    shortTitle: 'Declaração de Renda MEI',
    category: 'renda',
    badge: 'LC 123/2006 / Faturamento MEI',
    description:
      'Declaração formal do faturamento bruto médio mensal e do rendimento líquido retirado pelo titular do MEI a título de lucro isento e pró-labore.',
    whenToUse:
      'Comprovação de rendimentos para abertura de conta corrente, empréstimos bancários, cartões, financiamentos habitacionais (Caixa/MCMV), locação de imóveis e Prouni/CadÚnico.',
    legalBase: 'Lei Complementar nº 123/2006 (Art. 18-A), Resolução CGSN nº 140/2018, Lei nº 7.115/1983 e Art. 299 do Código Penal.',
    fields: [
      { id: 'nomeTitular', label: 'Nome Completo do Titular do MEI', type: 'text', placeholder: 'Ex: Márcio Silveira Batista', required: true, gridSpan: 'full' },
      { id: 'cpfTitular', label: 'CPF do Titular', type: 'cpf', placeholder: '000.000.000-00', required: true, gridSpan: 'half' },
      { id: 'rgTitular', label: 'RG', type: 'text', placeholder: '123456 SSP/RO', required: true, gridSpan: 'half' },
      { id: 'razaoSocial', label: 'Razão Social / Nome Empresarial MEI', type: 'text', placeholder: 'Ex: Márcio Silveira Batista 12345678900', required: true, gridSpan: 'full' },
      { id: 'cnpjMei', label: 'CNPJ do MEI', type: 'text', placeholder: '00.000.000/0001-00', required: true, gridSpan: 'half' },
      { id: 'atividadePrincipal', label: 'Atividade Principal / Ramo (CNAE)', type: 'text', placeholder: 'Ex: Serviços de manutenção elétrica / Comércio varejista', required: true, gridSpan: 'half' },
      { id: 'faturamentoBrutoMensal', label: 'Faturamento Bruto Médio Mensal (R$)', type: 'currency', placeholder: 'R$ 5.500,00', required: true, gridSpan: 'half' },
      { id: 'despesasOperacionais', label: 'Despesas e Custos Operacionais Mensais (R$)', type: 'currency', placeholder: 'R$ 1.500,00', required: true, gridSpan: 'half' },
      { id: 'rendimentoLiquido', label: 'Rendimento Líquido Médio Mensal Retirado (R$)', type: 'currency', placeholder: 'R$ 4.000,00', required: true, gridSpan: 'half' },
      { id: 'periodoReferencia', label: 'Período de Referência da Média', type: 'text', placeholder: 'Ex: Últimos 6 meses / Exercício corrente de 2026', defaultValue: 'Últimos 6 meses', required: true, gridSpan: 'half' },
      { id: 'enderecoEmpresa', label: 'Endereço Comercial / Sede do MEI', type: 'text', placeholder: 'Av. Nações Unidas, 350', required: true, gridSpan: 'full' },
      { id: 'cidade', label: 'Cidade', type: 'text', placeholder: 'Porto Velho', required: true, gridSpan: 'half' },
      { id: 'estado', label: 'Estado (UF)', type: 'text', placeholder: 'RO', defaultValue: 'RO', required: true, gridSpan: 'half' }
    ],
    generateText: (v) => {
      const city = v.cidade || 'Porto Velho';
      const uf = v.estado || 'RO';
      return {
        title: 'DECLARAÇÃO DE FATURAMENTO E RENDIMENTO LÍQUIDO DE MEI',
        body: [
          `Eu, ${v.nomeTitular || '_______________________'}, titular inscrito(a) no Cadastro de Pessoas Físicas (CPF) sob o nº ${v.cpfTitular || '___________'} e portador(a) do RG nº ${v.rgTitular || '____________'}, na qualidade de titular e responsável legal pelo Microempreendedor Individual:`,
          `>> RAZÃO SOCIAL: ${v.razaoSocial || 'Microempreendedor Individual'}, CNPJ nº ${v.cnpjMei || '00.000.000/0001-00'}, situado na ${v.enderecoEmpresa || 'endereço sede'}, ${city} - ${uf}, atuando no ramo de: ${v.atividadePrincipal || 'Prestação de Serviços'},`,
          `DECLARO, para os devidos fins de comprovação de capacidade financeira e renda perante instituições bancárias, imobiliárias, estabelecimentos de crédito ou órgãos públicos, sob as penas da Lei Federal nº 7.115/1983 e do Art. 299 do Código Penal, que no período correspondente a ${v.periodoReferencia || 'últimos meses'}:`,
          `1. O FATURAMENTO BRUTO MÉDIO MENSAL da empresa totalizou: ${v.faturamentoBrutoMensal || 'R$ 0,00'};`,
          `2. As DESPESAS OPERACIONAIS MÉDIAS MENSAIS (custos operacionais, insumos e manutenção da atividade) totalizaram: ${v.despesasOperacionais || 'R$ 0,00'};`,
          `3. O RENDIMENTO LÍQUIDO MÉDIO MENSAL efetivamente retirado por este titular (a título de lucro isento e pró-labore disponível para subsistência familiar) foi de: ${v.rendimentoLiquido || 'R$ 0,00'}.`,
          `Declaro ainda que o faturamento acumulado no ano-calendário respeita os limites estabelecidos pelo Artigo 18-A da Lei Complementar nº 123/2006.`
        ],
        cityDateLine: `${city} - ${uf}, ${formatBrazilianDate()}.`,
        signers: [
          { name: v.nomeTitular || 'Titular do MEI', document: `CPF: ${v.cpfTitular || '000.000.000-00'} | MEI: ${v.cnpjMei || '00.000.000/0001-00'}`, role: 'Microempreendedor Individual Declarante' }
        ]
      };
    },
    faqs: [
      {
        question: 'Os bancos aceitam essa declaração de renda do MEI?',
        answer: 'Sim! Como o MEI não é obrigado por lei a manter contabilidade formal nem emitir balanço patrimonial, as instituições financeiras aceitam a declaração assinada pelo titular acompanhada do CCMEI (Certificado da Condição de Microempreendedor Individual) e extratos bancários.'
      }
    ]
  },
  {
    id: 'comodato',
    slug: 'declaracao-de-comodato',
    title: 'Declaração de Comodato de Imóvel ou Bem (Cessão Gratuita)',
    shortTitle: 'Declaração de Comodato',
    category: 'habitacao',
    badge: 'Arts. 579-585 Código Civil',
    description:
      'Formaliza a cessão gratuita e o empréstimo não oneroso de imóvel residencial/comercial ou bem móvel (veículo ou maquinário), fixando deveres e afastando usucapião.',
    whenToUse:
      'Cadastros no CRAS, comprovação de gastos no CadÚnico/Bolsa Família, residência médica, cessão de salas comerciais de parentes, tratores, maquinários ou veículos.',
    legalBase: 'Artigos 579 a 585 da Lei Federal nº 10.406/2002 (Código Civil Brasileiro) e Lei Federal nº 7.115/1983.',
    fields: [
      { id: 'nomeComodante', label: 'Nome do Proprietário (Comodante)', type: 'text', placeholder: 'Ex: Antônio Carlos Pereira', required: true, gridSpan: 'half' },
      { id: 'cpfComodante', label: 'CPF do Proprietário', type: 'cpf', placeholder: '000.000.000-00', required: true, gridSpan: 'half' },
      { id: 'rgComodante', label: 'RG do Proprietário', type: 'text', placeholder: '123456 SSP/RO', required: true, gridSpan: 'half' },
      { id: 'nomeComodatario', label: 'Nome de Quem Ocupa / Usa o Bem (Comodatário)', type: 'text', placeholder: 'Ex: Fabiana Souza Pereira', required: true, gridSpan: 'half' },
      { id: 'cpfComodatario', label: 'CPF do Comodatário', type: 'cpf', placeholder: '000.000.000-00', required: true, gridSpan: 'half' },
      { id: 'rgComodatario', label: 'RG do Comodatário', type: 'text', placeholder: '654321 SSP/RO', required: true, gridSpan: 'half' },
      { id: 'tipoBem', label: 'Espécie de Bem Cedido', type: 'select', options: [
        { value: 'Imóvel Residencial Urbano (casa/apartamento)', label: 'Imóvel Residencial Urbano' },
        { value: 'Imóvel Comercial / Sala / Galpão', label: 'Imóvel Comercial / Sala' },
        { value: 'Imóvel Rural / Sítio / Chácara', label: 'Imóvel Rural / Chácara' },
        { value: 'Veículo Automotor / Utilitário / Caminhonete', label: 'Veículo Automotor' },
        { value: 'Máquinas e Equipamentos de Trabalho', label: 'Máquinas e Equipamentos' }
      ], defaultValue: 'Imóvel Residencial Urbano (casa/apartamento)', required: true, gridSpan: 'half' },
      { id: 'prazoComodato', label: 'Prazo do Comodato', type: 'select', options: [
        { value: 'por prazo indeterminado, rescindível mediante prévia notificação', label: 'Prazo Indeterminado' },
        { value: 'pelo prazo determinado de 12 (doze) meses', label: '12 meses (1 ano)' },
        { value: 'pelo prazo determinado de 24 (vinte e quatro) meses', label: '24 meses (2 anos)' }
      ], defaultValue: 'por prazo indeterminado, rescindível mediante prévia notificação', required: true, gridSpan: 'half' },
      { id: 'descricaoBem', label: 'Endereço Completo do Imóvel ou Descrição do Bem', type: 'text', placeholder: 'Ex: Rua Rio de Janeiro, 1280, Apto 202, Bairro Centro', required: true, gridSpan: 'full' },
      { id: 'responsabilidadeDespesas', label: 'Responsabilidade por Taxas / Despesas de Consumo', type: 'select', options: [
        { value: 'O Comodatário assume integralmente as despesas de consumo (água, luz, internet) e taxas ordinárias', label: 'Comodatário paga contas de água/luz/manutenção' },
        { value: 'O Comodante mantém o pagamento das contas e taxas sob sua responsabilidade', label: 'Comodante mantém o pagamento das despesas' }
      ], defaultValue: 'O Comodatário assume integralmente as despesas de consumo (água, luz, internet) e taxas ordinárias', required: true, gridSpan: 'full' },
      { id: 'cidade', label: 'Cidade', type: 'text', placeholder: 'Porto Velho', required: true, gridSpan: 'half' },
      { id: 'estado', label: 'Estado (UF)', type: 'text', placeholder: 'RO', defaultValue: 'RO', required: true, gridSpan: 'half' }
    ],
    generateText: (v) => {
      const city = v.cidade || 'Porto Velho';
      const uf = v.estado || 'RO';
      return {
        title: 'DECLARAÇÃO DE COMODATO (CESSÃO GRATUITA)',
        body: [
          `PELO PRESENTE INSTRUMENTO DE DECLARAÇÃO,`,
          `DE UM LADO, COMODANTE: ${v.nomeComodante || '_______________________'}, inscrito(a) no CPF sob o nº ${v.cpfComodante || '___________'} e RG nº ${v.rgComodante || '____________'}, na qualidade de legítimo(a) proprietário(a)/possuidor(a); e`,
          `DE OUTRO LADO, COMODATÁRIO(A): ${v.nomeComodatario || '_______________________'}, inscrito(a) no CPF sob o nº ${v.cpfComodatario || '___________'} e RG nº ${v.rgComodatario || '____________'};`,
          `DECLARAM solenemente, nos termos dos Artigos 579 a 585 da Lei Federal nº 10.406/2002 (Código Civil Brasileiro) e sob as penas da Lei nº 7.115/1983:`,
          `1. O(A) Comodante CEDE GRATUITAMENTE, a título de comodato não oneroso, ao(à) Comodatário(a), a posse direta do seguinte bem: ${v.tipoBem || 'Imóvel Residencial'}, localizado/identificado em: ${v.descricaoBem || 'endereço do bem'}, para seu uso pessoal e familiar.`,
          `2. A cessão é outorgada ${v.prazoComodato || 'por prazo indeterminado'}, sem qualquer cobrança de aluguel ou contraprestação pecuniária.`,
          `3. ${v.responsabilidadeDespesas || 'O comodatário assume as despesas ordinárias de consumo'}, obrigando-se a zelar pela conservação do bem e a restituí-lo quando findo o comodato no estado em que o recebeu.`,
          `4. Fica expressamente consignado que a presente posse decorre de mera permissão e tolerância gratuita, não gerando posse com ânimo de dono nem ensejando direito a usucapião.`
        ],
        cityDateLine: `${city} - ${uf}, ${formatBrazilianDate()}.`,
        signers: [
          { name: v.nomeComodante || 'Nome do Comodante', document: `CPF: ${v.cpfComodante || '000.000.000-00'}`, role: 'Comodante (Proprietário)' },
          { name: v.nomeComodatario || 'Nome do Comodatário', document: `CPF: ${v.cpfComodatario || '000.000.000-00'}`, role: 'Comodatário (Beneficiário)' }
        ]
      };
    },
    faqs: [
      {
        question: 'O comodato evita que a pessoa tome o imóvel por usucapião?',
        answer: 'Sim! O Artigo 1.208 do Código Civil determina que atos de mera tolerância ou permissão não induzem posse. O termo de comodato é a prova documental mais segura de que o morador não possui intenção de usucapir o imóvel.'
      }
    ]
  },
  {
    id: 'anuencia',
    slug: 'declaracao-de-anuencia',
    title: 'Declaração de Anuência de Vizinhos e Confrontantes',
    shortTitle: 'Declaração de Anuência',
    category: 'habitacao',
    badge: 'Art. 213 Lei 6.015/73',
    description:
      'Manifestação formal e incontestável de vizinho confrontante expressando concordância com obra, muro na divisa, reforma ou retificação de área.',
    whenToUse:
      'Exigida por Secretarias Municipais de Obras para liberação de alvará de construção, aprovação de projetos em condomínios e Cartórios de Registro de Imóveis para retificação de divisas.',
    legalBase: 'Artigo 213, inciso II da Lei Federal nº 6.015/1973 (Lei de Registros Públicos) e Artigos 1.277 a 1.313 do Código Civil Brasileiro.',
    fields: [
      { id: 'nomeConfrontante', label: 'Nome do Vizinho Confrontante (Anuente)', type: 'text', placeholder: 'Ex: Roberto Silveira Martins', required: true, gridSpan: 'half' },
      { id: 'cpfConfrontante', label: 'CPF do Vizinho', type: 'cpf', placeholder: '000.000.000-00', required: true, gridSpan: 'half' },
      { id: 'rgConfrontante', label: 'RG do Vizinho', type: 'text', placeholder: '123456 SSP/RO', required: true, gridSpan: 'half' },
      { id: 'enderecoImovelVizinho', label: 'Endereço do Imóvel do Vizinho (Lote / Casa)', type: 'text', placeholder: 'Ex: Rua dos Pioneiros, 452 (Lote 12, Quadra 04)', required: true, gridSpan: 'half' },
      { id: 'nomeRequerente', label: 'Nome do Proprietário da Obra (Requerente)', type: 'text', placeholder: 'Ex: Daniel Alves Pereira', required: true, gridSpan: 'half' },
      { id: 'cpfRequerente', label: 'CPF do Titular da Obra', type: 'cpf', placeholder: '000.000.000-00', required: true, gridSpan: 'half' },
      { id: 'enderecoImovelObra', label: 'Endereço do Imóvel da Obra / Confrontante', type: 'text', placeholder: 'Ex: Rua dos Pioneiros, 450 (Lote 11, Quadra 04)', required: true, gridSpan: 'full' },
      { id: 'objetoAnuencia', label: 'Objeto da Concordância / Intervenção', type: 'select', options: [
        { value: 'construção / reconstrução de muro de arrimo ou muro divisório na linha de divisa entre os lotes', label: 'Construção de muro na linha de divisa' },
        { value: 'execução de obra / reforma predial com alinhamento na divisa conforme projeto aprovado', label: 'Obra / reforma predial na divisa' },
        { value: 'retificação administrativa de área, medidas perimétricas e demarcação topográfica de divisas', label: 'Retificação de medidas e divisas (Cartório)' },
        { value: 'passagem de servidão de tubulação de água, esgoto ou cabeamento subterrâneo', label: 'Servidão de tubulação / cabos subterrâneos' }
      ], defaultValue: 'construção / reconstrução de muro de arrimo ou muro divisório na linha de divisa entre os lotes', required: true, gridSpan: 'full' },
      { id: 'detalhesObra', label: 'Especificações ou Observações Adicionais (opcional)', type: 'text', placeholder: 'Ex: Conforme planta técnica e medição realizada pelo engenheiro responsável', gridSpan: 'full' },
      { id: 'cidade', label: 'Cidade', type: 'text', placeholder: 'Porto Velho', required: true, gridSpan: 'half' },
      { id: 'estado', label: 'Estado (UF)', type: 'text', placeholder: 'RO', defaultValue: 'RO', required: true, gridSpan: 'half' }
    ],
    generateText: (v) => {
      const city = v.cidade || 'Porto Velho';
      const uf = v.estado || 'RO';
      const detalhes = v.detalhesObra && v.detalhesObra.trim() ? ` Observação técnica complementar: ${v.detalhesObra.trim()}.` : '';
      return {
        title: 'DECLARAÇÃO DE ANUÊNCIA DE VIZINHO CONFRONTANTE',
        body: [
          `Eu, ${v.nomeConfrontante || '_______________________'}, inscrito(a) no Cadastro de Pessoas Físicas (CPF) sob o nº ${v.cpfConfrontante || '___________'} e portador(a) do RG nº ${v.rgConfrontante || '____________'}, na condição de legítimo(a) proprietário(a)/possuidor(a) do imóvel confrontante localizado na ${v.enderecoImovelVizinho || 'endereço do vizinho'},`,
          `DECLARO, para todos os efeitos de direito perante a Prefeitura Municipal, Cartório de Registro de Imóveis, Crea/CAU e demais autoridades administrativas competentes, que:`,
          `1. Tenho pleno e irrestrito conhecimento da intervenção pretendida pelo(a) confrontante ${v.nomeRequerente || '_______________________'}, inscrito(a) no CPF nº ${v.cpfRequerente || '___________'}, titular do imóvel lindeiro situado na ${v.enderecoImovelObra || 'endereço da obra'};`,
          `2. MANIFESTO MINHA EXPRESSA E TOTAL ANUÊNCIA E CONCORDÂNCIA com a ${v.objetoAnuencia || 'obra e intervenção na divisa'}, declarando nada ter a opor, reclamar ou embargar quanto às medidas perimétricas, localização das divisas ou método construtivo acordado entre as partes.${detalhes}`,
          `Por ser a expressão espontânea da verdade, assino a presente declaração.`
        ],
        cityDateLine: `${city} - ${uf}, ${formatBrazilianDate()}.`,
        signers: [
          { name: v.nomeConfrontante || 'Nome do Vizinho Anuente', document: `CPF: ${v.cpfConfrontante || '000.000.000-00'}`, role: 'Vizinho Confrontante Anuente' }
        ]
      };
    },
    faqs: [
      {
        question: 'A declaração de anuência do vizinho dispensa o alvará da prefeitura?',
        answer: 'Não. Ela é um dos documentos fundamentais exigidos pela Prefeitura para liberar o alvará de obras limítrofes e pelo Cartório de Registro de Imóveis para averbações de área.'
      }
    ]
  },
  {
    id: 'bons-antecedentes',
    slug: 'declaracao-de-bons-antecedentes',
    title: 'Declaração de Bons Antecedentes e Idoneidade Moral',
    shortTitle: 'Bons Antecedentes',
    category: 'geral',
    badge: 'Lei 7.115/83 / Idoneidade',
    description:
      'Declaração sob as penas da lei atestando reputação ilibada, idoneidade moral e inexistência de condenação criminal transitada em julgado.',
    whenToUse:
      'Processos de admissão de trabalho, contratações em empresas, posse em cargos públicos, habilitação em conselhos de classe, entidades beneficentes e federações.',
    legalBase: 'Lei Federal nº 7.115/1983 (Art. 1º), Artigo 5º, inciso LVII da Constituição Federal e Artigo 299 do Código Penal.',
    fields: [
      { id: 'nome', label: 'Nome Completo do Declarante', type: 'text', placeholder: 'Ex: Leonardo Silva Albuquerque', required: true, gridSpan: 'full' },
      { id: 'cpf', label: 'CPF', type: 'cpf', placeholder: '000.000.000-00', required: true, gridSpan: 'half' },
      { id: 'rg', label: 'RG / Órgão Emissor', type: 'text', placeholder: '123456 SSP/RO', required: true, gridSpan: 'half' },
      { id: 'profissao', label: 'Profissão', type: 'text', placeholder: 'Ex: Engenheiro Civil / Administrador', required: true, gridSpan: 'half' },
      { id: 'estadoCivil', label: 'Estado Civil', type: 'select', options: [
        { value: 'solteiro(a)', label: 'Solteiro(a)' },
        { value: 'casado(a)', label: 'Casado(a)' },
        { value: 'em união estável', label: 'Em união estável' },
        { value: 'divorciado(a)', label: 'Divorciado(a)' },
        { value: 'viúvo(a)', label: 'Viúvo(a)' }
      ], defaultValue: 'solteiro(a)', required: true, gridSpan: 'half' },
      { id: 'instituicaoDestino', label: 'Empresa / Órgão / Entidade Destinatária', type: 'text', placeholder: 'Ex: Empresa Brasileira de Infraestrutura / Tribunal / Associação', required: true, gridSpan: 'full' },
      { id: 'finalidade', label: 'Finalidade da Apresentação', type: 'text', placeholder: 'Ex: Processo de admissão funcional / Posse em cargo público / Inscrição em conselho', defaultValue: 'Processo seletivo e admissão funcional', required: true, gridSpan: 'full' },
      { id: 'logradouro', label: 'Endereço Residencial Completo', type: 'text', placeholder: 'Rua Lauro Sodré, 900', required: true, gridSpan: 'full' },
      { id: 'cidade', label: 'Cidade', type: 'text', placeholder: 'Porto Velho', required: true, gridSpan: 'half' },
      { id: 'estado', label: 'Estado (UF)', type: 'text', placeholder: 'RO', defaultValue: 'RO', required: true, gridSpan: 'half' }
    ],
    generateText: (v) => {
      const city = v.cidade || 'Porto Velho';
      const uf = v.estado || 'RO';
      return {
        title: 'DECLARAÇÃO DE BONS ANTECEDENTES E IDONEIDADE MORAL',
        body: [
          `Eu, ${v.nome || '_______________________'}, estado civil ${v.estadoCivil || 'solteiro(a)'}, profissão ${v.profissao || 'trabalhador(a)'}, inscrito(a) no Cadastro de Pessoas Físicas (CPF) sob o nº ${v.cpf || '___________'} e portador(a) da Cédula de Identidade RG nº ${v.rg || '____________'}, domiciliado(a) e residente na ${v.logradouro || '________________________'}, município de ${city} - ${uf},`,
          `DECLARO, para os devidos fins de direito perante ${v.instituicaoDestino || 'a Instituição Destinatária'}, para fins específicos de ${v.finalidade || 'admissão funcional'}, e com espeque no Artigo 1º da Lei Federal nº 7.115/1983 ("A declaração destinada a fazer prova de vida, residência, pobreza, dependência econômica, homonímia ou bons antecedentes, quando firmada pelo próprio interessado ou por procurador bastante, presume-se verdadeira"):`,
          `Que possuo CONDUTA ILIBADA, IDONEIDADE MORAL e BONS ANTECEDENTES, não constando em meu desfavor condenação penal transitada em julgado em qualquer instância da Justiça Comum ou Militar, cumprindo integralmente as exigências éticas e legais vigentes.`,
          `Declaro ter pleno conhecimento de que a prestação de declaração falsa sujeita o declarante às sanções administrativas e à responsabilidade penal tipificada no Artigo 299 do Código Penal (Falsidade Ideológica).`
        ],
        cityDateLine: `${city} - ${uf}, ${formatBrazilianDate()}.`,
        signers: [
          { name: v.nome || 'Nome do Declarante', document: `CPF: ${v.cpf || '000.000.000-00'}`, role: 'Declarante' }
        ]
      };
    },
    faqs: [
      {
        question: 'A declaração substitui a Certidão de Antecedentes Criminais da Polícia?',
        answer: 'Para cadastros simples e seleções preliminares de emprego, sim, em virtude da Lei nº 7.115/1983. Já para posse formal em cargos públicos ou portes regulamentados, o órgão poderá requerer concomitantemente a certidão de nada consta emitida gratuitamente pelo site da Polícia Federal e do Tribunal de Justiça.'
      }
    ]
  },
  {
    id: 'declaracao-trabalho',
    slug: 'declaracao-de-trabalho',
    title: 'Declaração de Trabalho e Vínculo Laboral',
    shortTitle: 'Declaração de Trabalho',
    category: 'trabalho',
    badge: 'Vínculo Laboral / CLT e PJ',
    description:
      'Atestado emitido por empregador ou empresa declarando que o profissional exerce suas funções na organização, com jornada, horário e remuneração.',
    whenToUse:
      'Comprovação de horário para matrículas e vagas em creches municipais, abono de faltas em faculdades noturnas, solicitação de vale-transporte e abertura de contas.',
    legalBase: 'Consolidação das Leis do Trabalho (CLT), Lei Federal nº 7.115/1983 e Artigo 299 do Código Penal.',
    fields: [
      { id: 'nomeEmpregador', label: 'Nome da Empresa / Razão Social ou Empregador', type: 'text', placeholder: 'Ex: Comercial Norte de Alimentos Ltda', required: true, gridSpan: 'full' },
      { id: 'cnpjOuCpfEmpregador', label: 'CNPJ ou CPF do Empregador', type: 'text', placeholder: '00.000.000/0001-00', required: true, gridSpan: 'half' },
      { id: 'cargoResponsavel', label: 'Cargo do Responsável que Assina', type: 'text', placeholder: 'Ex: Gerente de Recursos Humanos / Administrador', defaultValue: 'Gerente de Recursos Humanos', required: true, gridSpan: 'half' },
      { id: 'nomeTrabalhador', label: 'Nome Completo do Trabalhador(a)', type: 'text', placeholder: 'Ex: Jéssica Maria Ramos', required: true, gridSpan: 'full' },
      { id: 'cpfTrabalhador', label: 'CPF do Trabalhador(a)', type: 'cpf', placeholder: '000.000.000-00', required: true, gridSpan: 'half' },
      { id: 'rgTrabalhador', label: 'RG do Trabalhador(a)', type: 'text', placeholder: '123456 SSP/RO', required: true, gridSpan: 'half' },
      { id: 'funcaoCargo', label: 'Cargo / Função Desempenhada', type: 'text', placeholder: 'Ex: Assistente Administrativo / Vendedora', required: true, gridSpan: 'half' },
      { id: 'dataAdmissao', label: 'Data de Início das Atividades', type: 'text', placeholder: 'Ex: 10/02/2024', required: true, gridSpan: 'half' },
      { id: 'diasEHorarioTrabalho', label: 'Jornada e Horário Semanal de Trabalho', type: 'text', placeholder: 'Ex: De segunda a sexta-feira, das 08h00 às 17h00', defaultValue: 'De segunda a sexta-feira, das 08h00 às 17h00', required: true, gridSpan: 'full' },
      { id: 'tipoVinculo', label: 'Regime de Trabalho', type: 'select', options: [
        { value: 'empregado(a) com registro e contrato de trabalho regido pela CLT', label: 'Empregado CLT (com registro formal)' },
        { value: 'prestador(a) regular de serviços autônomo / PJ', label: 'Prestador de Serviços / PJ' },
        { value: 'colaborador(a) em período de contratação e experiência', label: 'Contratação / Experiência' }
      ], defaultValue: 'empregado(a) com registro e contrato de trabalho regido pela CLT', required: true, gridSpan: 'half' },
      { id: 'salarioRemuneracao', label: 'Remuneração / Salário Mensal (R$)', type: 'currency', placeholder: 'R$ 2.400,00', required: true, gridSpan: 'half' },
      { id: 'enderecoEmpresa', label: 'Endereço da Empresa / Local da Prestação', type: 'text', placeholder: 'Av. Guaporé, 2300, Bairro Lagoa', required: true, gridSpan: 'full' },
      { id: 'cidade', label: 'Cidade', type: 'text', placeholder: 'Porto Velho', required: true, gridSpan: 'half' },
      { id: 'estado', label: 'Estado (UF)', type: 'text', placeholder: 'RO', defaultValue: 'RO', required: true, gridSpan: 'half' }
    ],
    generateText: (v) => {
      const city = v.cidade || 'Porto Velho';
      const uf = v.estado || 'RO';
      return {
        title: 'DECLARAÇÃO DE TRABALHO E VÍNCULO LABORAL',
        body: [
          `Pela presente declaração, a empresa/empregador(a):`,
          `>> ${v.nomeEmpregador || 'NOME DA EMPRESA / EMPREGADOR'}, inscrita no CNPJ/CPF sob o nº ${v.cnpjOuCpfEmpregador || '00.000.000/0001-00'}, estabelecida na ${v.enderecoEmpresa || 'endereço da empresa'}, ${city} - ${uf}, neste ato representada por seu(sua) ${v.cargoResponsavel || 'Representante Legal'},`,
          `DECLARA, para os devidos fins de direito perante estabelecimentos de ensino, creches municipais, faculdades, concessionárias de transporte público ou órgãos judiciais, que:`,
          `O(A) Sr.(a) ${v.nomeTrabalhador || '_______________________'}, inscrito(a) no CPF sob o nº ${v.cpfTrabalhador || '___________'} e portador(a) do RG nº ${v.rgTrabalhador || '____________'}, integra o quadro de colaboradores desta organização na condição de ${v.tipoVinculo || 'colaborador(a)'}, admitido(a) em ${v.dataAdmissao || '__/__/____'}, exercendo a função de:`,
          `>> CARGO / FUNÇÃO: ${v.funcaoCargo || 'Colaborador(a)'},`,
          `>> JORNADA DE TRABALHO: ${v.diasEHorarioTrabalho || 'Horário comercial integral'},`,
          `>> REMUNERAÇÃO MENSAL: ${v.salarioRemuneracao || 'R$ 0,00'}.`,
          `A presente declaração é a expressão fiel da verdade, assumindo este emitente responsabilidade pelas informações prestadas na forma da Lei.`
        ],
        cityDateLine: `${city} - ${uf}, ${formatBrazilianDate()}.`,
        signers: [
          { name: v.nomeEmpregador || 'Nome do Empregador / Empresa', document: `CNPJ/CPF: ${v.cnpjOuCpfEmpregador || '00.000.000/0001-00'}`, role: v.cargoResponsavel || 'Representante Legal da Empresa' }
        ]
      };
    },
    faqs: [
      {
        question: 'Essa declaração serve para conseguir vaga de creche em período integral?',
        answer: 'Sim! As secretarias de educação municipal exigem comprovação de trabalho dos pais com especificação dos dias e horários para priorização de vagas em creches de período integral.'
      },
      {
        question: 'Quem não tem carteira assinada pode pedir essa declaração ao patrão?',
        answer: 'Sim! A declaração atesta o fato do trabalho e horário cumprido pelo trabalhador, servindo perante creches, escolas e juizados mesmo quando a carteira ainda está em fase de homologação.'
      }
    ]
  },
  {
    id: 'homonimia',
    slug: 'declaracao-de-homonimia',
    title: 'Declaração de Homonímia',
    shortTitle: 'Homonímia',
    category: 'geral',
    badge: 'Lei 7.115/83',
    description:
      'Serve para quem possui o mesmo nome de um devedor, réu ou condenado e está sofrendo restrições indevidas no CPF perante bancos, SPC/Serasa, cartórios ou concursos.',
    whenToUse:
      'Utilize quando seu nome for confundido com o de outra pessoa (homônimo) que possui dívidas, protestos em cartório ou processos judiciais em que você não é parte.',
    legalBase: 'Lei Federal nº 7.115, de 29 de agosto de 1983 e Artigo 299 do Código Penal Brasileiro.',
    fields: [
      { id: 'nome', label: 'Seu Nome Completo (Declarante)', type: 'text', placeholder: 'Ex: José da Silva Santos', required: true, gridSpan: 'full' },
      { id: 'cpf', label: 'Seu CPF', type: 'cpf', placeholder: '000.000.000-00', required: true, gridSpan: 'half' },
      { id: 'rg', label: 'Seu RG / Órgão Emissor', type: 'text', placeholder: 'Ex: 1.234.567 SSP/RO', required: true, gridSpan: 'half' },
      { id: 'nacionalidade', label: 'Nacionalidade', type: 'text', placeholder: 'brasileiro(a)', defaultValue: 'brasileiro(a)', required: true, gridSpan: 'half' },
      { id: 'estadoCivil', label: 'Estado Civil', type: 'select', options: [
        { value: 'solteiro(a)', label: 'Solteiro(a)' },
        { value: 'casado(a)', label: 'Casado(a)' },
        { value: 'em união estável', label: 'União Estável' },
        { value: 'divorciado(a)', label: 'Divorciado(a)' },
        { value: 'viúvo(a)', label: 'Viúvo(a)' }
      ], defaultValue: 'solteiro(a)', required: true, gridSpan: 'half' },
      { id: 'filiacaoMae', label: 'Nome Completo da sua Mãe', type: 'text', placeholder: 'Ex: Maria José da Silva', required: true, gridSpan: 'full' },
      { id: 'filiacaoPai', label: 'Nome Completo do seu Pai', type: 'text', placeholder: 'Ex: Antônio dos Santos', required: false, gridSpan: 'full' },
      { id: 'dataNascimento', label: 'Sua Data de Nascimento', type: 'date', required: true, gridSpan: 'half' },
      { id: 'entidadeDestino', label: 'Órgão / Empresa onde consta a restrição indevida', type: 'text', placeholder: 'Ex: Serasa Experian / Cartório do 1º Ofício / Banco do Brasil', required: true, gridSpan: 'half' },
      { id: 'dadosHomonimo', label: 'Identificação da Restrição / Processo Indevido', type: 'textarea', placeholder: 'Ex: Apontamento de débito nº 12345/2023 no valor de R$ 1.500,00 registrado indevidamente sob nome homônimo.', required: true, gridSpan: 'full' },
      { id: 'cidade', label: 'Cidade', type: 'text', placeholder: 'Porto Velho', required: true, gridSpan: 'half' },
      { id: 'estado', label: 'Estado (UF)', type: 'text', placeholder: 'RO', defaultValue: 'RO', required: true, gridSpan: 'half' }
    ],
    generateText: (v) => {
      const city = v.cidade || 'Porto Velho';
      const uf = v.estado || 'RO';
      return {
        title: 'DECLARAÇÃO DE HOMONÍMIA',
        body: [
          `Eu, ${v.nome || '_______________________'}, nacionalidade ${v.nacionalidade || 'brasileira'}, estado civil ${v.estadoCivil || 'solteiro(a)'}, nascido(a) em ${v.dataNascimento ? formatBrazilianDate(v.dataNascimento) : '__/__/____'}, filho(a) de ${v.filiacaoMae || '______________________'}${v.filiacaoPai ? ` e de ${v.filiacaoPai}` : ''}, portador(a) da cédula de identidade RG nº ${v.rg || '____________'} e inscrito(a) no CPF sob o nº ${v.cpf || '___________'}, residente e domiciliado(a) na cidade de ${city} - ${uf},`,
          `DECLARO, sob as penas da Lei, para todos os fins de direito e em conformidade estrita com a Lei Federal nº 7.115, de 29 de agosto de 1983, perante ${v.entidadeDestino || 'o órgão/empresa competente'}, que:`,
          `NÃO SOU A PESSOA envolvida ou responsável pela seguinte restrição, pendência financeira, processo judicial ou título protestado:`,
          `>> DETALHES DO APONTAMENTO DO HOMÔNIMO: "${v.dadosHomonimo || 'Registro indevido decorrente de homonímia com terceira pessoa'}"`,
          `Declaro categoricamente que se trata de manifesto caso de HOMONÍMIA (pessoas que possuem o mesmo prenome e sobrenome), não existindo qualquer relação jurídica, comercial, contratual ou pessoal entre a minha pessoa e o débito/fato indicado.`,
          `Declaro estar plenamente ciente de que a falsidade na presente declaração configurará crime de falsidade ideológica, previsto no Artigo 299 do Código Penal Brasileiro, ensejando a devida responsabilização civil e criminal.`,
          `Por ser a fiel expressão da verdade, firmo e dato o presente instrumento para que produza os seus legais e jurídicos efeitos.`
        ],
        cityDateLine: `${city} - ${uf}, ${formatBrazilianDate()}.`,
        signers: [
          { name: v.nome || 'Nome do Declarante', document: `CPF: ${v.cpf || '000.000.000-00'} | RG: ${v.rg || 'Documento'}`, role: 'Declarante (Afetado por Homonímia)' }
        ],
        notes: 'Fundamentada na Lei Federal nº 7.115/1983. Presume-se verdadeira a declaração de homonímia firmada pelo próprio interessado.'
      };
    },
    faqs: [
      {
        question: 'O que é uma declaração de homonímia?',
        answer: 'É o documento oficial pelo qual o cidadão declara, sob as penas da lei, que não é a pessoa homônima (com o mesmo nome) que praticou infrações, possui cheques sem fundos, dívidas ativas ou processos judiciais.'
      },
      {
        question: 'A declaração de homonímia é aceita em bancos e cadastros de crédito?',
        answer: 'Sim! Com base na Lei 7.115/1983, órgãos de proteção ao crédito (como Serasa e SPC), cartórios de protesto e instituições financeiras aceitam a declaração acompanhada de cópia de documentos que demonstrem a divergência de filiação, data de nascimento ou CPF.'
      }
    ]
  },
  {
    id: 'coabitacao',
    slug: 'declaracao-de-coabitacao',
    title: 'Declaração de Coabitação e Composição Familiar',
    shortTitle: 'Coabitação e Família',
    category: 'residencia',
    badge: 'CadÚnico e Prouni',
    description:
      'Comprova quem são os membros que vivem na mesma casa e formam o grupo familiar, essencial para concessão de bolsas no ProUni, FIES, CadÚnico e programas sociais.',
    whenToUse:
      'Utilize em universidades para concessão de bolsas Prouni/FIES, ou em órgãos de assistência social (CRAS, CadÚnico, Auxílio Brasil) para comprovar quem mora na casa e a renda por pessoa.',
    legalBase: 'Lei Federal nº 7.115/1983, Lei nº 8.742/1993 (LOAS) e Decreto nº 6.135/2007.',
    fields: [
      { id: 'nomeResponsavel', label: 'Nome do Responsável Familiar (Declarante)', type: 'text', placeholder: 'Ex: Sandra Regina de Souza', required: true, gridSpan: 'full' },
      { id: 'cpfResponsavel', label: 'CPF do Responsável', type: 'cpf', placeholder: '000.000.000-00', required: true, gridSpan: 'half' },
      { id: 'rgResponsavel', label: 'RG do Responsável', type: 'text', placeholder: 'Ex: 123456 SSP/RO', required: true, gridSpan: 'half' },
      { id: 'logradouro', label: 'Endereço da Residência Familiar', type: 'text', placeholder: 'Rua das Camélias, nº 120, Bairro Esperança', required: true, gridSpan: 'full' },
      { id: 'finalidade', label: 'Finalidade da Comprovação', type: 'select', options: [
        { value: 'processo seletivo de bolsa de estudos ProUni / FIES', label: 'Bolsa Prouni / FIES' },
        { value: 'inscrição e atualização no CadÚnico / CRAS / Programas Sociais', label: 'CadÚnico / CRAS / Benefícios Sociais' },
        { value: 'isenção de taxa em vestibulares e concursos públicos', label: 'Isenção de Taxa de Concurso / Vestibular' },
        { value: 'fins gerais de comprovação de grupo familiar', label: 'Outros fins gerais' }
      ], defaultValue: 'processo seletivo de bolsa de estudos ProUni / FIES', required: true, gridSpan: 'full' },
      { id: 'membrosFamilia', label: 'Relação dos Moradores (Nome, Parentesco, Idade e Ocupação/Renda)', type: 'textarea', placeholder: '1. Sandra Regina de Souza (Mãe, 45 anos, Costureira, R$ 1.500,00)\n2. Lucas de Souza Lima (Filho, 19 anos, Estudante, R$ 0,00)\n3. Mariana de Souza Lima (Filha, 12 anos, Estudante, R$ 0,00)', required: true, gridSpan: 'full' },
      { id: 'rendaTotal', label: 'Renda Bruta Familiar Total Somada (R$)', type: 'currency', placeholder: 'R$ 1.500,00', required: true, gridSpan: 'half' },
      { id: 'totalMembros', label: 'Número Total de Pessoas que Moram na Casa', type: 'number', placeholder: '3', defaultValue: '3', required: true, gridSpan: 'half' },
      { id: 'cidade', label: 'Cidade', type: 'text', placeholder: 'Porto Velho', required: true, gridSpan: 'half' },
      { id: 'estado', label: 'Estado (UF)', type: 'text', placeholder: 'RO', defaultValue: 'RO', required: true, gridSpan: 'half' }
    ],
    generateText: (v) => {
      const city = v.cidade || 'Porto Velho';
      const uf = v.estado || 'RO';
      return {
        title: 'DECLARAÇÃO DE COABITAÇÃO E COMPOSIÇÃO FAMILIAR',
        body: [
          `Eu, ${v.nomeResponsavel || '_______________________'}, inscrito(a) no CPF sob o nº ${v.cpfResponsavel || '___________'} e portador(a) do RG nº ${v.rgResponsavel || '____________'}, na qualidade de Responsável pela Unidade Familiar, residente e domiciliado(a) na ${v.logradouro || 'endereço da residência'}, ${city} - ${uf},`,
          `DECLARO, para os devidos fins de comprovação perante a comissão examinadora de ${v.finalidade || 'processo seletivo e cadastral'}, sob as penas da Lei Federal nº 7.115/1983 e do Artigo 299 do Código Penal, que o meu grupo familiar é composto por ${v.totalMembros || '___'} pessoa(s) que coabitam sob o mesmo teto e compartilham despesas, conforme relação detalhada a seguir:`,
          `>> MEMBROS DO GRUPO FAMILIAR COABITANTE:`,
          `${v.membrosFamilia || '1. Declarante e demais dependentes que residem no imóvel.'}`,
          `Declaro ainda que a Renda Bruta Mensal Total do grupo familiar somado corresponde a ${v.rendaTotal || 'R$ 0,00'}, correspondendo exatamente à realidade socioeconômica da família.`,
          `Declaro estar ciente de que a omissão de membros familiares ou a prestação de informações inverídicas implicará o cancelamento imediato de eventuais benefícios/bolsas obtidos, sem prejuízo da responsabilização civil e criminal cabível.`
        ],
        cityDateLine: `${city} - ${uf}, ${formatBrazilianDate()}.`,
        signers: [
          { name: v.nomeResponsavel || 'Nome do Responsável Familiar', document: `CPF: ${v.cpfResponsavel || '000.000.000-00'}`, role: 'Declarante / Responsável Familiar' }
        ],
        notes: 'Documento regulamentado pela Lei nº 7.115/1983. Presume-se verdadeira a composição familiar informada pelo titular sob responsabilidade legal.'
      };
    },
    faqs: [
      {
        question: 'Quem deve assinar a declaração de coabitação?',
        answer: 'Deve ser assinada pelo chefe ou responsável familiar (ou pelo próprio estudante/candidato maior de idade que está prestando as informações para a faculdade ou órgão assistencial).'
      },
      {
        question: 'A declaração é aceita no Prouni quando não há certidão de nascimento de parentes?',
        answer: 'Sim! As portarias normativas do MEC autorizam a comprovação de membros do grupo familiar e união estável mediante declaração escrita assinada pelo candidato ou seu representante legal.'
      }
    ]
  },
  {
    id: 'acumulo-cargos',
    slug: 'declaracao-de-acumulo-de-cargos',
    title: 'Declaração de Não Acúmulo de Cargos Públicos',
    shortTitle: 'Acúmulo de Cargos',
    category: 'trabalho',
    badge: 'Concurso Público',
    description:
      'Documento obrigatório na posse de cargos públicos civis ou militares para atestar o cumprimento do Art. 37, XVI da Constituição Federal sobre acumulação remunerada.',
    whenToUse:
      'Obrigatória na entrega de documentos para posse em concursos públicos municipais, estaduais ou federais.',
    legalBase: 'Artigo 37, incisos XVI e XVII da Constituição Federal de 1988 e Lei Federal nº 8.112/1990.',
    fields: [
      { id: 'nomeServidor', label: 'Nome Completo do Convocado/Servidor', type: 'text', placeholder: 'Ex: Rafael Henrique de Oliveira', required: true, gridSpan: 'full' },
      { id: 'cpfServidor', label: 'CPF', type: 'cpf', placeholder: '000.000.000-00', required: true, gridSpan: 'half' },
      { id: 'rgServidor', label: 'RG / Órgão Emissor', type: 'text', placeholder: 'Ex: 456789 SSP/RO', required: true, gridSpan: 'half' },
      { id: 'cargoPretendido', label: 'Cargo / Função em que está tomando Posse', type: 'text', placeholder: 'Ex: Técnico Judiciário / Professor de Ensino Fundamental', required: true, gridSpan: 'half' },
      { id: 'orgaoPretendido', label: 'Órgão / Ente Público Contratante', type: 'text', placeholder: 'Ex: Tribunal de Justiça do Estado de Rondônia / Prefeitura Municipal', required: true, gridSpan: 'half' },
      { id: 'situacaoAcumulo', label: 'Situação de Acumulação', type: 'select', options: [
        { value: 'não exerço e não acumulo nenhum outro cargo, emprego ou função pública remunerada em âmbito federal, estadual ou municipal, nem percebo proventos de inatividade inacumuláveis', label: 'NÃO ACUMULO nenhum outro cargo ou função pública (Padrão)' },
        { value: 'acumulo licitamente outro cargo amparado pelas alíneas do Art. 37, XVI da CF/88 (dois cargos de professor, ou um de professor com outro técnico/científico, ou dois cargos da saúde)', label: 'ACUMULO LICITAMENTE (Dois de professor / Saúde / Técnico-científico)' }
      ], defaultValue: 'não exerço e não acumulo nenhum outro cargo, emprego ou função pública remunerada em âmbito federal, estadual ou municipal, nem percebo proventos de inatividade inacumuláveis', required: true, gridSpan: 'full' },
      { id: 'detalhesCargo2', label: 'Caso acumule licitamente, informe órgão, cargo e horários', type: 'textarea', placeholder: 'Ex: Cargo de Professor na SEDUC-RO, 20h semanais no turno matutino, com compatibilidade integral de horários com o cargo da posse.', required: false, gridSpan: 'full' },
      { id: 'cidade', label: 'Cidade', type: 'text', placeholder: 'Porto Velho', required: true, gridSpan: 'half' },
      { id: 'estado', label: 'Estado (UF)', type: 'text', placeholder: 'RO', defaultValue: 'RO', required: true, gridSpan: 'half' }
    ],
    generateText: (v) => {
      const city = v.cidade || 'Porto Velho';
      const uf = v.estado || 'RO';
      return {
        title: 'DECLARAÇÃO DE NÃO ACÚMULO DE CARGOS PÚBLICOS',
        body: [
          `Eu, ${v.nomeServidor || '_______________________'}, inscrito(a) no CPF sob o nº ${v.cpfServidor || '___________'} e portador(a) da cédula de identidade RG nº ${v.rgServidor || '____________'}, convocado(a) para tomar posse e entrar em exercício no cargo de ${v.cargoPretendido || '__________________'} perante ${v.orgaoPretendido || 'o Órgão Público Competente'},`,
          `DECLARO, para os devidos fins de atendimento aos requisitos de investidura previstos no Artigo 37, incisos XVI e XVII da Constituição Federal de 1988 e legislação estatutária aplicável, sob as penas da Lei e da responsabilidade administrativa e funcional, que:`,
          `>> SITUAÇÃO FUNCIONAL: ${v.situacaoAcumulo || 'Não exerço e não acumulo nenhum outro cargo, emprego ou função pública remunerada.'}`,
          v.detalhesCargo2 ? `>> DETALHAMENTO DA ACUMULAÇÃO LÍCITA / COMPATIBILIDADE: ${v.detalhesCargo2}` : `Declaro expressamente que não ocupo outro cargo, emprego ou função pública na Administração Pública Direta ou Indireta da União, dos Estados, do Distrito Federal ou dos Municípios, incluindo autarquias, fundações, empresas públicas e sociedades de economia mista, nem percebo benefício de aposentadoria inacumulável.`,
          `Declaro ter pleno conhecimento de que prestar declaração falsa perante a Administração Pública configurará ato ilícito grave, acarretando a nulidade do ato de posse e apuração nos termos do Artigo 299 do Código Penal (Falsidade Ideológica) e da Lei de Improbidade Administrativa.`
        ],
        cityDateLine: `${city} - ${uf}, ${formatBrazilianDate()}.`,
        signers: [
          { name: v.nomeServidor || 'Nome do Servidor / Convocado', document: `CPF: ${v.cpfServidor || '000.000.000-00'}`, role: `Candidato(a) ao cargo de ${v.cargoPretendido || 'Servidor Público'}` }
        ],
        notes: 'Em conformidade com a Constituição Federal de 1988 e Lei nº 8.112/1990.'
      };
    },
    faqs: [
      {
        question: 'Quem é obrigado a apresentar essa declaração?',
        answer: 'Todos os cidadãos aprovados em concursos públicos civis ou militares para posse em prefeituras, governos estaduais, tribunais e autarquias federais.'
      },
      {
        question: 'Professor ou médico pode acumular dois cargos públicos?',
        answer: 'Sim! A Constituição Federal permite excepcionalmente o acúmulo de: dois cargos de professor; um cargo de professor com outro técnico ou científico; ou dois cargos privativos de profissionais de saúde com profissões regulamentadas, desde que haja compatibilidade de horários.'
      }
    ]
  },
  {
    id: 'hospedagem-menor',
    slug: 'autorizacao-de-hospedagem-de-menor',
    title: 'Autorização de Hospedagem de Menores',
    shortTitle: 'Hospedagem de Menor',
    category: 'familia',
    badge: 'ECA - Lei 8.069/90',
    description:
      'Autorização formal assinada pelos pais ou responsáveis legais para que menores de 18 anos possam se hospedar em hotéis, pousadas ou resorts acompanhados de terceiros ou parentes.',
    whenToUse:
      'Exigida por hotéis e pousadas quando a criança ou adolescente viaja e vai se hospedar com avós, tios, irmãos maiores, amigos da família ou excursão.',
    legalBase: 'Artigo 82 da Lei Federal nº 8.069, de 13 de julho de 1990 (Estatuto da Criança e do Adolescente - ECA).',
    fields: [
      { id: 'nomePaiOuMae', label: 'Nome do Pai, Mãe ou Responsável Legal', type: 'text', placeholder: 'Ex: Luciana Alves Ferreira', required: true, gridSpan: 'full' },
      { id: 'cpfPaiOuMae', label: 'CPF do Responsável', type: 'cpf', placeholder: '000.000.000-00', required: true, gridSpan: 'half' },
      { id: 'rgPaiOuMae', label: 'RG do Responsável', type: 'text', placeholder: 'Ex: 123456 SSP/RO', required: true, gridSpan: 'half' },
      { id: 'grauParentesco', label: 'Grau de Parentesco com o Menor', type: 'select', options: [
        { value: 'mãe', label: 'Mãe' },
        { value: 'pai', label: 'Pai' },
        { value: 'tutor(a) / guardião(ã) legal', label: 'Tutor / Guardião Legal' }
      ], defaultValue: 'mãe', required: true, gridSpan: 'half' },
      { id: 'nomeMenor', label: 'Nome Completo da Criança / Adolescente (Menor)', type: 'text', placeholder: 'Ex: Arthur Alves Ferreira', required: true, gridSpan: 'half' },
      { id: 'documentoMenor', label: 'RG ou Certidão de Nascimento do Menor', type: 'text', placeholder: 'Ex: RG 789456 SSP/RO ou Certidão Termo 12345', required: true, gridSpan: 'half' },
      { id: 'dataNascMenor', label: 'Data de Nascimento do Menor', type: 'date', required: true, gridSpan: 'half' },
      { id: 'nomeAcompanhante', label: 'Nome Completo do Adulto que Irá Acompanhar', type: 'text', placeholder: 'Ex: Valéria Alves Ferreira (Tia)', required: true, gridSpan: 'full' },
      { id: 'cpfAcompanhante', label: 'CPF do Acompanhante', type: 'cpf', placeholder: '000.000.000-00', required: true, gridSpan: 'half' },
      { id: 'rgAcompanhante', label: 'RG do Acompanhante', type: 'text', placeholder: 'Ex: 654321 SSP/RO', required: true, gridSpan: 'half' },
      { id: 'estabelecimentoHospedagem', label: 'Nome do Hotel / Pousada / Estabelecimento', type: 'text', placeholder: 'Ex: Hotel Pousada das Águas / Qualquer estabelecimento no destino', required: true, gridSpan: 'full' },
      { id: 'periodoHospedagem', label: 'Período da Hospedagem', type: 'text', placeholder: 'Ex: De 15/07/2026 a 22/07/2026', defaultValue: 'Período da referida viagem', required: true, gridSpan: 'full' },
      { id: 'cidade', label: 'Cidade', type: 'text', placeholder: 'Porto Velho', required: true, gridSpan: 'half' },
      { id: 'estado', label: 'Estado (UF)', type: 'text', placeholder: 'RO', defaultValue: 'RO', required: true, gridSpan: 'half' }
    ],
    generateText: (v) => {
      const city = v.cidade || 'Porto Velho';
      const uf = v.estado || 'RO';
      return {
        title: 'AUTORIZAÇÃO DE HOSPEDAGEM DE MENOR',
        body: [
          `Eu, ${v.nomePaiOuMae || '_______________________'}, inscrito(a) no CPF sob o nº ${v.cpfPaiOuMae || '___________'} e portador(a) do RG nº ${v.rgPaiOuMae || '____________'}, na qualidade de ${v.grauParentesco || 'responsável legal'},`,
          `AUTORIZO, com fundamento expresso no Artigo 82 da Lei Federal nº 8.069/1990 (Estatuto da Criança e do Adolescente - ECA), a hospedagem de meu(minha) filho(a) / tutelado(a):`,
          `>> MENOR: ${v.nomeMenor || '_______________________'}, nascido(a) em ${v.dataNascMenor ? formatBrazilianDate(v.dataNascMenor) : '__/__/____'}, portador(a) do documento nº ${v.documentoMenor || 'RG/Certidão'},`,
          `Para que possa se hospedar no estabelecimento: ${v.estabelecimentoHospedagem || 'estabelecimento hoteleiro'}, durante o período de: ${v.periodoHospedagem || 'vigência da viagem'}, DEVIDAMENTE ACOMPANHADO(A) do(a) seguinte adulto responsável:`,
          `>> ACOMPANHANTE AUTORIZADO(A): ${v.nomeAcompanhante || '_______________________'}, inscrito(a) no CPF sob o nº ${v.cpfAcompanhante || '___________'} e RG nº ${v.rgAcompanhante || '____________'}.`,
          `O(A) acompanhante ora indicado(a) fica investido(a) de poderes para zelar pela integridade, bem-estar e segurança do(a) menor durante toda a permanência no estabelecimento.`
        ],
        cityDateLine: `${city} - ${uf}, ${formatBrazilianDate()}.`,
        signers: [
          { name: v.nomePaiOuMae || 'Nome do Pai / Mãe ou Responsável Legal', document: `CPF: ${v.cpfPaiOuMae || '000.000.000-00'}`, role: `Responsável Legal (${v.grauParentesco || 'Pai/Mãe'})` }
        ],
        notes: 'Obrigatória conforme o Art. 82 do Estatuto da Criança e do Adolescente (ECA). Hotéis são proibidos por lei de hospedar menores sem autorização expressa.'
      };
    },
    faqs: [
      {
        question: 'O hotel pode recusar a hospedagem se não tiver essa autorização?',
        answer: 'Sim! O Artigo 82 do Estatuto da Criança e do Adolescente proíbe expressamente a hospedagem de crianças ou adolescentes desacompanhados dos pais ou sem autorização expressa destes, sob pena de multa pesada e interdição do hotel.'
      },
      {
        question: 'A autorização pode ser assinada digitalmente pelo Gov.br?',
        answer: 'Sim! Hotéis aceitam a autorização impressa ou assinada digitalmente com a conta Gov.br com validade jurídica garantida pela Lei 14.063/2020.'
      }
    ]
  },
  {
    id: 'infracao-condutor',
    slug: 'declaracao-de-indicacao-de-condutor-infrator',
    title: 'Declaração de Indicação de Condutor Infrator e Responsabilidade por Multas',
    shortTitle: 'Condutor Infrator',
    category: 'bens',
    badge: 'DETRAN e Multas',
    description:
      'Transfere formalmente a pontuação na CNH e a responsabilidade pelo pagamento de infração de trânsito para a pessoa que estava efetivamente na direção do veículo.',
    whenToUse:
      'Utilize perante o DETRAN, PRF ou órgão municipal de trânsito quando outra pessoa cometeu a infração dirigindo seu carro/moto.',
    legalBase: 'Artigo 257, § 7º da Lei Federal nº 9.503/1997 (Código de Trânsito Brasileiro - CTB).',
    fields: [
      { id: 'nomeProprietario', label: 'Nome do Proprietário do Veículo', type: 'text', placeholder: 'Ex: Marcos Vinícius Teixeira', required: true, gridSpan: 'full' },
      { id: 'cpfProprietario', label: 'CPF do Proprietário', type: 'cpf', placeholder: '000.000.000-00', required: true, gridSpan: 'half' },
      { id: 'rgProprietario', label: 'RG do Proprietário', type: 'text', placeholder: 'Ex: 987654 SSP/RO', required: true, gridSpan: 'half' },
      { id: 'placaVeiculo', label: 'Placa do Veículo', type: 'text', placeholder: 'Ex: ABC-1234 ou ABC1D23', required: true, gridSpan: 'half' },
      { id: 'renavamVeiculo', label: 'Número do RENAVAM', type: 'text', placeholder: 'Ex: 00123456789', required: true, gridSpan: 'half' },
      { id: 'marcaModelo', label: 'Marca / Modelo do Veículo', type: 'text', placeholder: 'Ex: Chevrolet Onix 1.0', required: true, gridSpan: 'full' },
      { id: 'autoInfracao', label: 'Número do Auto de Infração / Notificação', type: 'text', placeholder: 'Ex: A012345678', required: true, gridSpan: 'half' },
      { id: 'dataInfracao', label: 'Data e Hora da Infração', type: 'text', placeholder: 'Ex: 14/05/2026 às 15h30', required: true, gridSpan: 'half' },
      { id: 'nomeCondutor', label: 'Nome do Real Condutor Infrator (Quem Dirigia)', type: 'text', placeholder: 'Ex: Thiago Fernandes Silva', required: true, gridSpan: 'full' },
      { id: 'cpfCondutor', label: 'CPF do Condutor Infrator', type: 'cpf', placeholder: '000.000.000-00', required: true, gridSpan: 'half' },
      { id: 'cnhCondutor', label: 'Número da CNH do Condutor Infrator', type: 'text', placeholder: 'Ex: 01234567890 (Registro CNH)', required: true, gridSpan: 'half' },
      { id: 'cidade', label: 'Cidade', type: 'text', placeholder: 'Porto Velho', required: true, gridSpan: 'half' },
      { id: 'estado', label: 'Estado (UF)', type: 'text', placeholder: 'RO', defaultValue: 'RO', required: true, gridSpan: 'half' }
    ],
    generateText: (v) => {
      const city = v.cidade || 'Porto Velho';
      const uf = v.estado || 'RO';
      return {
        title: 'DECLARAÇÃO DE INDICAÇÃO DE REAL CONDUTOR INFRATOR',
        body: [
          `Pelo presente instrumento particular, o(a) Sr.(a) ${v.nomeProprietario || 'NOME DO PROPRIETÁRIO'}, inscrito(a) no CPF sob o nº ${v.cpfProprietario || '___________'} e RG nº ${v.rgProprietario || '____________'}, na qualidade de LEGÍTIMO(A) PROPRIETÁRIO(A) do veículo automotor:`,
          `>> VEÍCULO: ${v.marcaModelo || 'Marca/Modelo'}, Placa: ${v.placaVeiculo || 'PLACA'}, RENAVAM nº ${v.renavamVeiculo || '00000000000'},`,
          `DECLARA, com amparo no Artigo 257, § 7º da Lei Federal nº 9.503/1997 (Código de Trânsito Brasileiro - CTB) e resoluções do CONTRAN, perante a autoridade de trânsito competente, que na data de ${v.dataInfracao || '__/__/____'}, por ocasião do Auto de Infração nº ${v.autoInfracao || '__________'}, NÃO ESTAVA na condução do referido veículo.`,
          `E eu, ${v.nomeCondutor || 'NOME DO CONDUTOR INFRATOR'}, inscrito(a) no CPF sob o nº ${v.cpfCondutor || '___________'} e portador(a) da CNH de Registro nº ${v.cnhCondutor || '__________'}, DECLARO QUE ERA O(A) REAL CONDUTOR(A) do veículo no momento da autuação, ASSUMINDO TOTAL RESPONSABILIDADE pelo cômputo dos pontos decorrentes da infração na minha Carteira Nacional de Habilitação, bem como pelos encargos pecuniários incidentes.`,
          `Ambas as partes declaram estar cientes de que a indicação falsa de condutor configura crime de falsidade ideológica (Art. 299 do Código Penal), com pena de reclusão de 1 a 5 anos e multa.`
        ],
        cityDateLine: `${city} - ${uf}, ${formatBrazilianDate()}.`,
        signers: [
          { name: v.nomeProprietario || 'Proprietário do Veículo', document: `CPF: ${v.cpfProprietario || '000.000.000-00'}`, role: 'Proprietário do Veículo' },
          { name: v.nomeCondutor || 'Condutor Infrator', document: `CPF: ${v.cpfCondutor || '000.000.000-00'} | CNH: ${v.cnhCondutor || '00000000000'}`, role: 'Real Condutor Infrator' }
        ],
        notes: 'Fundamentada no Art. 257, § 7º do Código de Trânsito Brasileiro (CTB). Exige a assinatura tanto do proprietário quanto do condutor indicado.'
      };
    },
    faqs: [
      {
        question: 'Qual é o prazo para indicar o condutor infrator no DETRAN?',
        answer: 'O prazo legal é de 30 (trinta) dias corridos contados a partir da data de notificação da autuação, conforme estipulado pelo Código de Trânsito Brasileiro.'
      },
      {
        question: 'Precisa da assinatura das duas pessoas?',
        answer: 'Sim! Para ter validade perante os órgãos de trânsito (DETRAN, Polícia Rodoviária Federal ou Prefeituras), tanto o proprietário do veículo quanto o condutor que assume a pontuação devem assinar a declaração.'
      }
    ]
  },
  {
    id: 'aptidao-fisica-parq',
    slug: 'declaracao-de-aptidao-fisica-parq',
    title: 'Declaração de Aptidão Física (Questionário PAR-Q)',
    shortTitle: 'Aptidão Física (PAR-Q)',
    category: 'geral',
    badge: 'Academias e Esporte',
    description:
      'Questionário de Prontidão para Atividade Física (PAR-Q) internacionalmente reconhecido e aceito em academias e estúdios para prática desportiva segura.',
    whenToUse:
      'Utilize para efetuar matrícula em academias, boxes de crossfit, estúdios de pilates, natação e corridas que aceitam termo de responsabilidade e aptidão física.',
    legalBase: 'Leis Estaduais de Desburocratização de Academias e Lei Federal nº 7.115/1983.',
    fields: [
      { id: 'nomePraticante', label: 'Nome Completo do Aluno/Praticante', type: 'text', placeholder: 'Ex: Amanda Cristina Rocha', required: true, gridSpan: 'full' },
      { id: 'cpfPraticante', label: 'CPF', type: 'cpf', placeholder: '000.000.000-00', required: true, gridSpan: 'half' },
      { id: 'rgPraticante', label: 'RG / Órgão Emissor', type: 'text', placeholder: 'Ex: 345678 SSP/RO', required: true, gridSpan: 'half' },
      { id: 'dataNascimento', label: 'Data de Nascimento', type: 'date', required: true, gridSpan: 'half' },
      { id: 'nomeAcademia', label: 'Nome da Academia / Estabelecimento Esportivo', type: 'text', placeholder: 'Ex: Academia Corpo e Saúde Ltda', required: true, gridSpan: 'half' },
      { id: 'modalidadeEsportiva', label: 'Modalidade / Atividade Desejada', type: 'text', placeholder: 'Ex: Musculação / Pilates / Natação', defaultValue: 'Musculação e Treinamento Funcional', required: true, gridSpan: 'full' },
      { id: 'problemaCoracao', label: 'Seu médico já disse que você possui algum problema cardíaco?', type: 'select', options: [
        { value: 'NÃO', label: 'NÃO' },
        { value: 'SIM', label: 'SIM' }
      ], defaultValue: 'NÃO', required: true, gridSpan: 'half' },
      { id: 'dorNoPeito', label: 'Você sente dores no peito durante a prática de exercícios?', type: 'select', options: [
        { value: 'NÃO', label: 'NÃO' },
        { value: 'SIM', label: 'SIM' }
      ], defaultValue: 'NÃO', required: true, gridSpan: 'half' },
      { id: 'tonturaDesmaio', label: 'Você perde o equilíbrio ou desmaia durante esforço físico?', type: 'select', options: [
        { value: 'NÃO', label: 'NÃO' },
        { value: 'SIM', label: 'SIM' }
      ], defaultValue: 'NÃO', required: true, gridSpan: 'half' },
      { id: 'problemaArticular', label: 'Você possui problema ósseo ou articular que piore com atividade?', type: 'select', options: [
        { value: 'NÃO', label: 'NÃO' },
        { value: 'SIM', label: 'SIM' }
      ], defaultValue: 'NÃO', required: true, gridSpan: 'half' },
      { id: 'cidade', label: 'Cidade', type: 'text', placeholder: 'Porto Velho', required: true, gridSpan: 'half' },
      { id: 'estado', label: 'Estado (UF)', type: 'text', placeholder: 'RO', defaultValue: 'RO', required: true, gridSpan: 'half' }
    ],
    generateText: (v) => {
      const city = v.cidade || 'Porto Velho';
      const uf = v.estado || 'RO';
      return {
        title: 'DECLARAÇÃO DE APTIDÃO FÍSICA E QUESTIONÁRIO PAR-Q',
        body: [
          `Eu, ${v.nomePraticante || '_______________________'}, inscrito(a) no CPF sob o nº ${v.cpfPraticante || '___________'} e RG nº ${v.rgPraticante || '____________'}, nascido(a) em ${v.dataNascimento ? formatBrazilianDate(v.dataNascimento) : '__/__/____'}, para fins de inscrição e prática esportiva perante ${v.nomeAcademia || 'a academia/estabelecimento esportivo'},`,
          `DECLARO, para os devidos fins de direito, sob as penas da Lei Federal nº 7.115/1983, que respondi conscientemente ao Questionário de Prontidão para Atividade Física (Physical Activity Readiness Questionnaire - PAR-Q), conforme segue:`,
          `1. Algum médico já disse que possui problema de coração e recomendou apenas atividades sob supervisão? Resposta: [ ${v.problemaCoracao || 'NÃO'} ]`,
          `2. Você sente dores no peito provocadas pela prática de atividade física? Resposta: [ ${v.dorNoPeito || 'NÃO'} ]`,
          `3. No último mês, você sentiu dor no peito sem estar praticando atividades físicas? Resposta: [ NÃO ]`,
          `4. Você perde o equilíbrio em virtude de tonturas ou desmaios? Resposta: [ ${v.tonturaDesmaio || 'NÃO'} ]`,
          `5. Você possui algum problema ósseo ou articular que pode ser agravado por alterações em sua atividade física? Resposta: [ ${v.problemaArticular || 'NÃO'} ]`,
          `6. O seu médico prescreve medicamentos para a sua pressão arterial ou coração? Resposta: [ NÃO ]`,
          `7. Você tem conhecimento de qualquer outra razão pela qual não deva praticar atividades físicas? Resposta: [ NÃO ]`,
          `Em face das respostas negativas acima, DECLARO estar em plenas condições físicas e de saúde para a prática regular de ${v.modalidadeEsportiva || 'exercícios físicos'}, assumindo inteira responsabilidade por eventuais omissões quanto ao meu real estado de saúde.`
        ],
        cityDateLine: `${city} - ${uf}, ${formatBrazilianDate()}.`,
        signers: [
          { name: v.nomePraticante || 'Nome do Praticante / Aluno', document: `CPF: ${v.cpfPraticante || '000.000.000-00'}`, role: 'Declarante / Praticante de Atividade Física' }
        ],
        notes: 'Em conformidade com a legislação desportiva e os padrões do Questionário Internacional PAR-Q.'
      };
    },
    faqs: [
      {
        question: 'O PAR-Q dispensa o atestado médico em academias?',
        answer: 'Na maioria dos estados e municípios que desregulamentaram a exigência de atestado médico obrigatório para assintomáticos, a resposta negativa a todas as perguntas do questionário PAR-Q é legalmente suficiente para autorizar a prática de musculação e condicionamento físico.'
      },
      {
        question: 'E se eu tiver respondido SIM a alguma pergunta?',
        answer: 'Caso você responda SIM a uma ou mais perguntas do PAR-Q, é altamente recomendado consultar um médico antes de iniciar ou intensificar seus treinos.'
      }
    ]
  },
  {
    id: 'dispensa-vale-transporte',
    slug: 'declaracao-de-dispensa-de-vale-transporte',
    title: 'Declaração de Dispensa / Renúncia de Vale-Transporte',
    shortTitle: 'Dispensa de Vale-Transporte',
    category: 'trabalho',
    badge: 'Recursos Humanos / CLT',
    description:
      'Termo pelo qual o colaborador declara que utiliza condução própria para ir ao trabalho e renuncia formalmente ao recebimento de vale-transporte e ao desconto em folha.',
    whenToUse:
      'Apresente ao RH ou departamento pessoal da empresa na contratação ou quando decidir ir ao trabalho com moto, carro particular, a pé ou carona.',
    legalBase: 'Lei Federal nº 7.418, de 16 de dezembro de 1985 e Artigo 7º, § 3º do Decreto Federal nº 95.247/1987.',
    fields: [
      { id: 'nomeColaborador', label: 'Nome Completo do Colaborador(a)', type: 'text', placeholder: 'Ex: Fernando Henrique Lima', required: true, gridSpan: 'full' },
      { id: 'cpfColaborador', label: 'CPF do Colaborador', type: 'cpf', placeholder: '000.000.000-00', required: true, gridSpan: 'half' },
      { id: 'rgColaborador', label: 'RG do Colaborador', type: 'text', placeholder: 'Ex: 876543 SSP/RO', required: true, gridSpan: 'half' },
      { id: 'ctpsColaborador', label: 'Número da CTPS / Série (ou CTPS Digital)', type: 'text', placeholder: 'Ex: CTPS Digital vinculada ao CPF', defaultValue: 'CTPS Digital vinculada ao CPF', required: true, gridSpan: 'half' },
      { id: 'cargoColaborador', label: 'Cargo / Função na Empresa', type: 'text', placeholder: 'Ex: Assistente Financeiro', required: true, gridSpan: 'half' },
      { id: 'nomeEmpresa', label: 'Nome da Empresa / Empregador', type: 'text', placeholder: 'Ex: Distribuidora Central Ltda', required: true, gridSpan: 'full' },
      { id: 'cnpjEmpresa', label: 'CNPJ ou CPF do Empregador', type: 'text', placeholder: '00.000.000/0001-00', required: true, gridSpan: 'half' },
      { id: 'meioTransporte', label: 'Meio de Locomoção Utilizado', type: 'select', options: [
        { value: 'veículo automotor próprio (carro ou motocicleta)', label: 'Veículo Próprio (Carro ou Moto)' },
        { value: 'deslocamento a pé por residir próximo ao local de trabalho', label: 'A pé (Mora perto do trabalho)' },
        { value: 'bicicleta própria', label: 'Bicicleta Própria' },
        { value: 'carona regular / condução privada de terceiros', label: 'Carona / Transporte de terceiros' }
      ], defaultValue: 'veículo automotor próprio (carro ou motocicleta)', required: true, gridSpan: 'half' },
      { id: 'cidade', label: 'Cidade', type: 'text', placeholder: 'Porto Velho', required: true, gridSpan: 'half' },
      { id: 'estado', label: 'Estado (UF)', type: 'text', placeholder: 'RO', defaultValue: 'RO', required: true, gridSpan: 'half' }
    ],
    generateText: (v) => {
      const city = v.cidade || 'Porto Velho';
      const uf = v.estado || 'RO';
      return {
        title: 'DECLARAÇÃO DE DISPENSA E RENÚNCIA DE VALE-TRANSPORTE',
        body: [
          `À empresa: ${v.nomeEmpresa || 'NOME DA EMPRESA'}, inscrita no CNPJ sob o nº ${v.cnpjEmpresa || '00.000.000/0001-00'},`,
          `Eu, ${v.nomeColaborador || '_______________________'}, inscrito(a) no CPF sob o nº ${v.cpfColaborador || '___________'}, portador(a) do RG nº ${v.rgColaborador || '____________'} e Carteira de Trabalho ${v.ctpsColaborador || 'Digital'}, exercendo a função de ${v.cargoColaborador || 'colaborador(a)'},`,
          `DECLARO, para os devidos fins de direito e em observância ao disposto na Lei Federal nº 7.418, de 16 de dezembro de 1985, e no Artigo 7º, § 3º do Decreto Federal nº 95.247/1987, que:`,
          `OPTO POR NÃO UTILIZAR O BENEFÍCIO DO VALE-TRANSPORTE para o trajeto de ida e volta residência-trabalho-residência, tendo em vista que me desloco por meios próprios, qual seja:`,
          `>> MEIO DE LOCOMOÇÃO UTILIZADO: ${v.meioTransporte || 'Meio de locomoção próprio'}.`,
          `Em virtude desta opção livre e voluntária, RENUNCIO expressamente ao recebimento do benefício do Vale-Transporte, bem como AUTORIZO A NÃO REALIZAÇÃO do respectivo desconto legal de até 6% (seis por cento) sobre o meu salário-base em folha de pagamento.`,
          `Comprometo-me a comunicar formalmente ao Departamento de Recursos Humanos caso ocorra alteração no meu endereço ou no meio de transporte utilizado que justifique a necessidade futura do benefício.`
        ],
        cityDateLine: `${city} - ${uf}, ${formatBrazilianDate()}.`,
        signers: [
          { name: v.nomeColaborador || 'Nome do Empregado / Colaborador', document: `CPF: ${v.cpfColaborador || '000.000.000-00'}`, role: 'Empregado(a) Declarante' }
        ],
        notes: 'Fundamentada na Lei nº 7.418/1985 e Decreto nº 95.247/1987. Isenta a empresa do fornecimento e desonera o trabalhador do desconto legal.'
      };
    },
    faqs: [
      {
        question: 'O empregado pode ser obrigado a receber o vale-transporte?',
        answer: 'Não. O benefício do Vale-Transporte é um direito do trabalhador, mas não uma imposição. Se ele preferir ir de carro, moto, bicicleta ou morar perto, pode assinar este termo de dispensa.'
      },
      {
        question: 'Se eu assinar a dispensa, a empresa não descontará nada do meu salário?',
        answer: 'Exatamente! Ao renunciar ao benefício, a empresa fica proibida de efetuar o desconto de até 6% referente ao vale-transporte no seu holerite.'
      }
    ]
  }
];

