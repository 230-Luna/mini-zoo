import { emojiAnimalFaceList } from "pages/sequence-memory-game/common/constants/emojiAnimalFaceList";

export function getRandomAnimalIcon(): string {
  if (emojiAnimalFaceList.length === 0) return "";
  const index = Math.floor(Math.random() * emojiAnimalFaceList.length);
  return emojiAnimalFaceList[index];
}
