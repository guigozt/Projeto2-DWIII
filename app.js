// Importa módulos necessários
import fs from "fs/promises";
import chalk from "chalk";

// Expressão Regular para capturar [NOME](URL)
const regex = /\[([^\]]*)\]\((https?:\/\/[^$#\s].[^\s]*)\)/g;

// Função principal
async function extrairReferencias(caminhoArquivo) {
  try {
    // Leitura assíncrona do arquivo
    const conteudo = await fs.readFile(caminhoArquivo, "utf-8");

    // Aplica RegEx
    const resultados = [...conteudo.matchAll(regex)];

    if (resultados.length === 0) {
      console.log(chalk.yellow("⚠ Nenhuma referência encontrada."));
      return;
    }

    // Exibe saída formatada
    resultados.forEach((match, index) => {
      const nome = match[1];
      const url = match[2];
      console.log(`Referência ${index + 1}: ${nome} | Link: ${url}`);
    });

  } catch (erro) {
    // Tratamento de erro com chalk
    console.log(chalk.bgRed.white(" Erro ao ler o arquivo:"), erro.message);
  }
}

// Executa função
extrairReferencias("./Projeto2_arquivo.md");
