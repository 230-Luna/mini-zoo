import fs from "fs";
import path from "path";

const emojiDir = path.join(__dirname, "../public/emoji/animal/face");
const outputFile = path.join(__dirname, "../src/emojiAnimalFaceList.ts");

const files = fs
  .readdirSync(emojiDir)
  .filter((file) => file.endsWith(".svg"))
  .map((file) => path.basename(file, ".svg"));

const content = `// 자동 생성 파일 - 수정하지 마세요
export const emojiAnimalFaceList: string[] = ${JSON.stringify(
  files,
  null,
  2
)};\n`;

fs.writeFileSync(outputFile, content);
console.log(`emojiAnimalFaceList.ts 파일이 생성되었습니다: ${files.length}개`);
