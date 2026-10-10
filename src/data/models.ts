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
  }
];
