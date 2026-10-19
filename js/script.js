
const formulario = document.getElementById("formulario");

formulario.addEventListener("submit", function(event) {
    event.preventDefault();
    buscarCEP();
});

async function buscarCEP() {
    const cep = document.getElementById("cep").value
        .replace(/\D/g, "");

    const mensagem = document.getElementById("mensagem");
    const resultado = document.getElementById("resultado");

    resultado.hidden = true;
    mensagem.textContent = "";

    if (cep.length !== 8) {
        mensagem.textContent = "Digite um CEP válido com 8 números.";
        return;
    }

    try {
        mensagem.textContent = "Buscando endereço...";

        const resposta = await fetch(
            `https://viacep.com.br/ws/${cep}/json/`
        );

        if (!resposta.ok) {
            throw new Error("Erro na requisição");
        }

        const dados = await resposta.json();

        if (dados.erro) {
            throw new Error("CEP não encontrado");
        }

        document.getElementById("rua").textContent =
            dados.logradouro || "Não informado";

        document.getElementById("bairro").textContent =
            dados.bairro || "Não informado";

        document.getElementById("cidade").textContent =
            dados.localidade || "Não informado";

        document.getElementById("estado").textContent =
            dados.uf || "Não informado";

        resultado.hidden = false;
        mensagem.textContent = "Endereço encontrado com sucesso!";

    } catch (erro) {
        mensagem.textContent =
            "Não foi possível encontrar o CEP. Confira os números ou tente novamente.";
    }
}
