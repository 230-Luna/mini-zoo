import { useEffect, useState } from "react";
import { Icon } from "components/Icon";
import { emojiAnimalFaceList } from "emojiAnimalFaceList";

export const useGetRandomAnimalIcon = () => {
  const [randomAnimal, setRandomAnimal] = useState<string>("");

  useEffect(() => {
    if (emojiAnimalFaceList.length === 0) return;
    const randomIndex = Math.floor(Math.random() * emojiAnimalFaceList.length);
    setRandomAnimal(emojiAnimalFaceList[randomIndex]);
  }, []);

  return <Icon name={`animal/face/${randomAnimal}`} />;
};
