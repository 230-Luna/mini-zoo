import { useEffect, useState } from "react";
import { getRandomPosition } from "utils/position";
import { ShowFirstAnimal } from "./ShowFirstAnimal";
import { ShowSecondAnimal } from "./ShowSecondAnimal";

export const PracticeGaameStage = () =>
  //   {
  //   onDone,
  // }: {
  //   onDone: () => void;
  // }
  {
    const [showFirst, setShowFirst] = useState(true);
    const [firstAnimalPosition, setFirstAnimalPosition] = useState<{
      x: number;
      y: number;
    } | null>(null);
    const [secondAnimalPosition, setSecondAnimalPosition] = useState<{
      x: number;
      y: number;
    } | null>(null);

    useEffect(() => {
      const firstTimer = setTimeout(() => {
        setFirstAnimalPosition(getRandomPosition());
      }, 1000);

      const secondTimer = setTimeout(() => {
        setSecondAnimalPosition(getRandomPosition());
      }, 3000);
      return () => {
        clearTimeout(firstTimer);
        clearTimeout(secondTimer);
      };
    }, []);

    return (
      <div
        style={{
          position: "relative",
          width: "100vw",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        {firstAnimalPosition === null || showFirst === null ? null : (
          <ShowFirstAnimal
            x={firstAnimalPosition.x}
            y={firstAnimalPosition.y}
            onDone={() => setShowFirst(false)}
          />
        )}
        {secondAnimalPosition === null ? null : (
          <ShowSecondAnimal
            x={secondAnimalPosition.x}
            y={secondAnimalPosition.y}
          />
        )}
      </div>
    );
  };
