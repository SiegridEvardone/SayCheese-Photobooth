
const lyrics = [
  "Tumingin ka sa akin",
  "Gusto kong linawin",
  "Naiilang ka ba 'pag tayo lang dal'wa?",
  "Sinasabi ko nga na atin ang mundo",
  "Walang ibang tulad mo.."
];

const typeLine = (line, callback) => {
  let i = 0;
  const typing = setInterval(() => {
    process.stdout.write(line[i]);
    i++;
    if (i >= line.length) {
      clearInterval(typing);
      process.stdout.write('\n');
      setTimeout(callback, 500); 
    }
  }, 100); 
};

const typeAllLines = (lines, index = 0) => {
  if (index < lines.length) {
    typeLine(lines[index], () => typeAllLines(lines, index + 1));
  }
};

typeAllLines(lyrics);
