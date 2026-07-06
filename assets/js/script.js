(function () {
    "use strict";

    const CONFIG = {
        numeroWhatsApp: "5514997787170"
    };

    function abrirWhatsAppComItem() {
        const botoes = document.querySelectorAll(".btn-orcamento");

        botoes.forEach((botao) => {
            botao.addEventListener("click", () => {
                const item = botao.getAttribute("data-item");

                if (!item) return;

                const mensagem = `Olá! Vim pelo site da AgroVida e gostaria de atendimento sobre ${item.trim()}.`;
                const link = `https://wa.me/${CONFIG.numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;
                const novaAba = window.open(link, "_blank");

                if (novaAba) {
                    novaAba.opener = null;
                }
            });
        });
    }

    function revelarConteudoAoRolar() {
        const elementos = document.querySelectorAll(".efeito-scroll");

        if (!elementos.length) return;

        const observador = new IntersectionObserver((entradas) => {
            entradas.forEach((entrada) => {
                if (entrada.isIntersecting) {
                    entrada.target.classList.add("visivel");
                    observador.unobserve(entrada.target);
                }
            });
        }, {
            threshold: 0.16
        });

        elementos.forEach((elemento) => observador.observe(elemento));
    }

    document.addEventListener("DOMContentLoaded", () => {
        abrirWhatsAppComItem();
        revelarConteudoAoRolar();
    });
})();
