const fs = require('fs');
const path = require('path');

function listTsFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      listTsFiles(filePath, fileList);
    } else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

function writeFilesToTxt(fileList, outputFilePath) {
  const output = fileList.map(filePath => {
    const content = fs.readFileSync(filePath, 'utf-8');
    return `${filePath}:\n${content}\n`;
  }).join('\n');

  fs.writeFileSync(outputFilePath, output, 'utf-8');
}

const directoryPath = path.join(__dirname, '../src'); // 相对于脚本文件的路径
const tsFiles = listTsFiles(directoryPath);
const outputFilePath = path.join(__dirname, 'output.txt');

writeFilesToTxt(tsFiles, outputFilePath);

console.log(`TypeScript and TSX files have been written to ${outputFilePath}`);