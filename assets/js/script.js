/**
 * AgroVida - Script do Vendedor Online
 * Desenvolvido seguindo boas práticas de segurança e performance.
 */

(function () {
    'use strict';

    // Configurações Globais (Centralize dados sensíveis ou mutáveis aqui)
    const CONFIG = {
        // Substitua pelo número real da AgroVida (com DDD e código do país)
        numeroWhatsApp: "5514997787170" 
    };

    /**
     * Inicializa a lógica do WhatsApp Inteligente
     */
    function gerenciarWhatsAppInteligente() {
        const botoesOrcamento = document.querySelectorAll('.btn-orcamento');

        if (!botoesOrcamento.length) return; // Segurança: se não houver botões na página, o script para silenciosamente sem gerar erros.

        botoesOrcamento.forEach(botao => {
            botao.addEventListener('click', function (evento) {
                evento.preventDefault(); // Previne qualquer comportamento padrão inesperado do navegador

                // Captura e sanitiza o atributo para evitar injeção de scripts maliciosos (XSS básico)
                const nomeDoItem = this.getAttribute('data-item');
                
                if (!nomeDoItem) return; // Segurança: ignora cliques se o atributo estiver vazio

                // Monta a mensagem estruturada profissionalmente
                const textoMensagem = `Olá! Estava navegando no site da AgroVida e gostaria de mais informações ou um orçamento sobre: *${nomeDoItem.trim()}*.`;
                
                // Converte caracteres especiais com segurança para formato de URL
                const mensagemFormatada = encodeURIComponent(textoMensagem);
                const linkFinal = `https://wa.me/${CONFIG.numeroWhatsApp}?text=${mensagemFormatada}`;
                
                // Abre em nova aba protegendo contra vulnerabilidades de engenharia social (Tabnabbing)
                const novaAba = window.open(linkFinal, '_blank');
                if (novaAba) {
                    novaAba.opener = null;
                }
            });
        });
    }

    /**
     * Inicializa o efeito de rolagem suave (Scroll Reveal)
     */
    /**
     * Inicializa o efeito de rolagem contínuo (Scroll Reveal Infinito)
     */
    function gerenciarEfeitoScroll() {
        const sections = document.querySelectorAll('.efeito-scroll');
        
        if (!sections.length) return;

        const observerOptions = {
            root: null,
            // Ajustamos o threshold para 0.15 para dar um tempo confortável 
            // do elemento entrar na tela antes de disparar a animação
            threshold: 0.15 
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Quando a seção ENTRA na tela, adiciona a classe que mostra o conteúdo
                    entry.target.classList.add('visivel');
                } else {
                    // MODIFICAÇÃO AQUI: Quando a seção SAI da tela (subindo ou descendo),
                    // removemos a classe para que ela fique pronta para animar de novo.
                    entry.target.classList.remove('visivel');
                }
            });
        }, observerOptions);

        sections.forEach(section => observer.observe(section));
    }

    // Executa as funções assim que o documento HTML estiver totalmente carregado e seguro
    document.addEventListener('DOMContentLoaded', () => {
        gerenciarWhatsAppInteligente();
        gerenciarEfeitoScroll();
    });

})();