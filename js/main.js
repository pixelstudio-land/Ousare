// ==========================================
// LÓGICA PRINCIPAL — OUSARE REVESTIMENTOS
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
    inicializarDadosEstruturais();
});

// 1. POPULA OS DADOS VISUAIS (Logo, Nomes, Selects, Bônus)
function inicializarDadosEstruturais() {
    // 1.1 Nome da Marca Dinâmico
    const brandElements = document.querySelectorAll('.dynamic-brand');
    brandElements.forEach(el => {
        el.innerHTML = `${CONFIG.empresa.nome1} <span class="gold-gradient">${CONFIG.empresa.nome2}</span>`;
    });

    const h2BrandElements = document.querySelectorAll('.dynamic-feature-brand');
    h2BrandElements.forEach(el => {
        el.innerHTML = `<span class="gold-gradient">${CONFIG.empresa.nome1} ${CONFIG.empresa.nome2}</span>`;
    });

    // 1.2 Whatsapp Header Link
    const headerZapBtn = document.getElementById('headerZapBtn');
    if (headerZapBtn) {
        headerZapBtn.href = `https://wa.me/${CONFIG.empresa.whatsapp}`;
    }

    // 1.3 Popular Opções de Piso Atual
    const pisoAtualSelect = document.getElementById('pisoAtual');
    if (pisoAtualSelect) {
        pisoAtualSelect.innerHTML = '';
        CONFIG.opcoesPisoAtual.forEach(op => {
            const tempOption = document.createElement('option');
            tempOption.value = op.valor;
            tempOption.innerText = op.texto;
            pisoAtualSelect.appendChild(tempOption);
        });
    }

    // 1.4 Popular Select de Modelos de Piso com Categorias
    const modeloSelect = document.getElementById('modelo');
    if (modeloSelect) {
        modeloSelect.innerHTML = '';

        // Agrupar por categorias
        const categorias = [...new Set(CONFIG.pisos.map(item => item.categoria))];

        categorias.forEach(cat => {
            const optgroup = document.createElement('optgroup');
            optgroup.label = cat;

            const pisosDaCategoria = CONFIG.pisos.filter(p => p.categoria === cat);
            pisosDaCategoria.forEach(piso => {
                const tempOption = document.createElement('option');
                const isSobConsulta = piso.sobConsulta || piso.preco === null;
                tempOption.value = JSON.stringify({
                    preco: piso.preco,
                    descricao: piso.descricao,
                    nome: piso.nome,
                    sobConsulta: isSobConsulta
                });

                if (isSobConsulta) {
                    tempOption.innerText = `${piso.nome} — Sob Consulta (Solicitar Cotação)`;
                } else {
                    tempOption.innerText = `${piso.nome} — R$ ${piso.preco.toFixed(2).replace('.', ',')}/m² (Tudo Incluso)`;
                }
                optgroup.appendChild(tempOption);
            });

            modeloSelect.appendChild(optgroup);
        });
    }

    // 1.5 Popular Lista de Bônus no Modal
    const bonusListContainer = document.getElementById('bonusListRenderer');
    if (bonusListContainer) {
        bonusListContainer.innerHTML = '';
        CONFIG.bonus.forEach(bonus => {
            const div = document.createElement('div');
            div.className = 'bonus-item';

            const badgeClass = bonus.gratis ? (bonus.strike ? 'badge-courtesy' : 'badge-included') : 'badge-optional';
            const iconClass = bonus.gratis ? 'fa-check-circle' : 'fa-info-circle';
            let strikeHtml = bonus.strike ? `<span class="strike">${bonus.strike}</span> ` : '';

            div.innerHTML = `
                <div class="bonus-item-title">
                    <i class="fas ${iconClass}"></i>
                    <span>${bonus.titulo}</span>
                </div>
                <div class="bonus-item-status">
                    ${strikeHtml}<span class="bonus-badge ${badgeClass}">${bonus.subtitulo}</span>
                </div>
            `;
            bonusListContainer.appendChild(div);
        });
    }
}

// 2. FUNÇÃO DE CALCULAR E ABRIR MODAL
function calcular() {
    const metragemInput = document.getElementById('metragem').value;
    const metragem = parseFloat(metragemInput.replace(',', '.'));

    const modeloEl = document.getElementById('modelo');
    const modeloData = JSON.parse(modeloEl.value);
    const modeloPreco = modeloData.preco;
    const modeloNome = modeloData.nome;
    const modeloDescricao = modeloData.descricao;

    const pisoAtual = document.getElementById('pisoAtual');
    const pisoAtualNome = pisoAtual.options[pisoAtual.selectedIndex].text;

    const nivelamentoEl = document.getElementById('nivelamento');
    const nivelamentoNome = nivelamentoEl.options[nivelamentoEl.selectedIndex].text;

    if (isNaN(metragem) || metragem < 1) {
        alert("Por favor, digite uma metragem válida.");
        return;
    }

    const isSobConsulta = modeloData.sobConsulta || modeloData.preco === null || modeloData.preco === undefined;
    const totalLabel = document.querySelector('.total-label');
    const valorFinal = document.getElementById('valorFinal');
    const linkZap = document.getElementById('linkZap');
    const btnSpan = linkZap ? linkZap.querySelector('span') : null;

    let valorFormatado = "";
    let textoZap = "";
    let total = 0;

    if (isSobConsulta) {
        valorFormatado = "SOB CONSULTA";
        if (totalLabel) totalLabel.innerText = "Condição do Pacote";
        if (valorFinal) {
            valorFinal.innerHTML = `<span style="font-size: 1.85rem; font-weight: 800; letter-spacing: 0.5px; color: var(--gold-light);">SOB CONSULTA</span>`;
        }
        if (btnSpan) {
            btnSpan.innerText = "SOLICITAR PROPOSTA EXCLUSIVA NO WHATSAPP";
        }

        textoZap = `Olá! Realizei uma simulação de orçamento na Ousare Revestimentos e gostaria de solicitar uma proposta exclusiva para este pacote:\n\n` +
            `📐 *Metragem:* ${metragem}m²\n` +
            `✨ *Linha Selecionada:* ${modeloNome}\n` +
            `📋 *Escopo:* ${modeloDescricao}\n` +
            `💰 *Investimento:* Sob Consulta (Proposta Personalizada)\n\n` +
            `🏠 *Condições do Local:*\n` +
            `- Piso Atual: ${pisoAtualNome}\n` +
            `- Nivelamento da Base: ${nivelamentoNome}\n\n` +
            `🛡️ *Garantia Ousare:* 10 anos de garantia no produto | Equipe 100% própria especializada.\n\n` +
            `Gostaria de receber o orçamento oficial e agendar a visita técnica de cortesia!`;
    } else {
        total = metragem * modeloPreco;
        valorFormatado = total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

        if (totalLabel) totalLabel.innerText = "Investimento Estimado (Tudo Incluso)";
        if (valorFinal) {
            valorFinal.innerText = valorFormatado;
        }
        if (btnSpan) {
            btnSpan.innerText = "CONFIRMAR ORÇAMENTO NO WHATSAPP";
        }

        textoZap = `Olá! Realizei uma simulação de orçamento na Ousare Revestimentos:\n\n` +
            `📐 *Metragem:* ${metragem}m²\n` +
            `✨ *Linha Selecionada:* ${modeloNome}\n` +
            `📋 *Escopo:* ${modeloDescricao}\n` +
            `💰 *Investimento Estimado:* ${valorFormatado} (Materiais + Mão de obra própria inclusos)\n\n` +
            `🏠 *Condições do Local:*\n` +
            `- Piso Atual: ${pisoAtualNome}\n` +
            `- Nivelamento da Base: ${nivelamentoNome}\n\n` +
            `🛡️ *Garantia Ousare:* 10 anos de garantia no produto | Equipe 100% própria especializada.\n\n` +
            `Gostaria de confirmar essa condição e agendar a visita técnica de cortesia!`;
    }

    const modalSubtitle = document.getElementById('modalSubtitle');
    if (modalSubtitle) {
        modalSubtitle.innerText = modeloDescricao;
    }

    const link = `https://wa.me/${CONFIG.empresa.whatsapp}?text=${encodeURIComponent(textoZap)}`;
    if (linkZap) linkZap.href = link;

    // Abre modal
    document.getElementById('modalResult').style.display = 'flex';

    // Dispara Evento pro Pixel
    if (typeof trackLead === 'function') {
        trackLead(total);
    }
}

// 3. FECHAR MODAL
function fecharModal() {
    document.getElementById('modalResult').style.display = 'none';
}

window.onclick = function (event) {
    const modal = document.getElementById('modalResult');
    if (event.target == modal) {
        modal.style.display = "none";
    }
};
