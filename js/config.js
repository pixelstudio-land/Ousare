// ==========================================
// CONFIGURAÇÃO OUSARE REVESTIMENTOS
// Região: Içara, Criciúma e Sul Catarinense
// ==========================================

const CONFIG = {
    // 1. DADOS DA EMPRESA E ATENDIMENTO
    empresa: {
        nome1: "OUSARE",
        nome2: "REVESTIMENTOS",
        cidade: "Içara, Criciúma e Região — SC",
        whatsapp: "554892468739", // WhatsApp oficial atualizado (+55 48 9246-8739)
        telefoneExibicao: "(48) 9246-8739"
    },

    // 2. OPÇÕES DE PISOS E PREÇOS (CONFORME BRIEFING OFICIAL)
    // ⚠️ Valores base com piso + materiais de instalação + mão de obra especializada própria inclusos
    pisos: [
        {
            categoria: "Pisos Vinílicos de Alto Padrão",
            nome: "Piso Vinílico Colado (Tarkett / Ruffino / Kapazi)",
            preco: 130.00,
            sobConsulta: false,
            // Incluso conforme briefing: R$ 130/m² materiais de instalação e mão de obra inclusos
            descricao: "Pacote Completo: Piso Vinílico Nobre + Massa de Nivelamento/Regularização + Cola Especial + Mão de Obra Própria Especializada. Garantia de 10 anos do produto."
        },
        {
            categoria: "Pisos Vinílicos de Alto Padrão",
            nome: "Piso Vinílico Clicado SPC Acústico (Stato / Vexa)",
            preco: 165.00,
            sobConsulta: false,
            descricao: "Pacote Completo: Piso Vinílico SPC Rígido com Manta Acústica Integrada + Perfis de Transição + Mão de Obra Própria Especializada. 100% resistente à água e máximo conforto acústico."
        },
        {
            categoria: "Pisos Vinílicos de Alto Padrão",
            nome: "Piso Vinílico Paginação Especial (Chevron / Espinha de Peixe)",
            preco: null,
            sobConsulta: true,
            descricao: "Pacote de Alto Padrão Arquitetônico: Paginação autoral Chevron ou Espinha de Peixe com cortes angulares milimétricos e acabamento nobre. Consulte disponibilidade de padrões."
        },
        {
            categoria: "Pisos Laminados Premium",
            nome: "Piso Laminado Nobre (Durafloor / Quick-Step)",
            preco: 110.00,
            sobConsulta: false,
            // Incluso conforme briefing: R$ 110/m² materiais de instalação e mão de obra inclusos
            descricao: "Pacote Completo: Piso Laminado de Alta Resistência + Manta Térmica/Acústica + Perfis de Dilatação + Mão de Obra Própria Especializada. Garantia de 10 anos do produto."
        },
        {
            categoria: "Pisos Laminados Premium",
            nome: "Piso Laminado Resistente à Água (Quick-Step Impressive)",
            preco: null,
            sobConsulta: true,
            descricao: "Pacote Especial: Tecnologia HydroSeal com proteção contra infiltrações e umidade, alta resistência a riscos e manchas. Padrões de madeira autêntica."
        }
    ],

    // 3. OPÇÕES DE PISO ATUAL NO LOCAL
    opcoesPisoAtual: [
        { valor: "Contrapiso", texto: "Contrapiso de Cimento (Seco)" },
        { valor: "Ceramica", texto: "Cerâmica ou Porcelanato Existente" },
        { valor: "Madeira", texto: "Madeira / Taco / Assoalho Antigo" },
        { valor: "Vinilico", texto: "Vinílico ou Laminado Existente" },
        { valor: "Outro", texto: "Outro / Não sei informar com exatidão" }
    ],

    // 4. BÔNUS E INCLUSÕES NO ORÇAMENTO (MODAL DE PROPOSTA EXECUTIVA)
    bonus: [
        { titulo: "Mão de Obra 100% Própria (+10 anos de experiência)", subtitulo: "INCLUSO", strike: "", gratis: true },
        { titulo: "Garantia de 10 Anos no Produto (Fabricante)", subtitulo: "INCLUSO", strike: "", gratis: true },
        { titulo: "Massa de Regularização / Nivelamento (Pacote Vinílico)", subtitulo: "INCLUSO", strike: "", gratis: true },
        { titulo: "Cola Especial ou Manta Acústica (Conforme Linha)", subtitulo: "INCLUSO", strike: "", gratis: true },
        { titulo: "Visita Técnica e Medição no Local (Içara, Criciúma e Região)", subtitulo: "CORTESIA*", strike: "R$ 180", gratis: true },
        { titulo: "Condição Especial: Desconto à Vista", subtitulo: "DISPONÍVEL", strike: "", gratis: true },
        { titulo: "Rodapés e Cortinas Sob Medida", subtitulo: "Sob Medida", strike: "", gratis: false }
    ]
};
