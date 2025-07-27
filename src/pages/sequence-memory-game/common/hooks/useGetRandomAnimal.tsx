import { useEffect, useState } from "react";
import { emojiAnimalFaceList } from "pages/sequence-memory-game/common/constants/emojiAnimalFaceList";

export const useGetRandomAnimalIcon = () => {
  const [randomAnimal, setRandomAnimal] = useState<string>("");

  useEffect(() => {
    if (emojiAnimalFaceList.length === 0) return;
    const randomIndex = Math.floor(Math.random() * emojiAnimalFaceList.length);
    setRandomAnimal(emojiAnimalFaceList[randomIndex]);
  }, []);

  return randomAnimal;
};
