import fs from "fs";
import natural from "natural";

const filePath = "./data/faq.json";

const faq = JSON.parse(fs.readFileSync(filePath, "utf-8"));

const similarityModel = new natural.TfIdf();

faq.forEach((item) => {
  similarityModel.addDocument(item.question);
});

const userQuestion = "O que fazer após perder o prazo de matrícula?";

const resultList = [];

similarityModel.tfidfs(userQuestion, (i, measure) => {
  const result = {
    index: i,
    score: measure,
  };

  console.log("---------");
  console.log("Score:", measure);
  console.log(faq[i].question);
  console.log("---------");

  resultList.push(result);
});

resultList.sort((a, b) => b.score - a.score);

const threeBestResultList = resultList.slice(0, 3);

const MIN_SCORE = 0.3;

const filteredResultList = threeBestResultList.filter(
  (item) => item.score > MIN_SCORE,
);

console.log();
console.log();
console.log();
console.log("Pergunta: ", userQuestion);

if (filteredResultList.length === 0) {
  console.log("Nenhuma resposta relevante encontrada.");
} else {
  filteredResultList.forEach((item) => {
    console.log("---------");
    console.log(`Resposta (score: ${item.score.toFixed(2)})`);
    console.log(faq[item.index].answer);
    console.log("---------");
  });
}

// const bestAnswer = faq[bestIndex].answer;

// console.log("Pergunta: ", userQuestion);
// console.log("Resposta: ", bestAnswer);
// console.log("Score: ", bestScore);
