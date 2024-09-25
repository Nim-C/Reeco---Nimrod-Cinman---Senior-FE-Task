import { useMemo } from "react";
import { nanoid } from "nanoid";

import Carousel from "@/components/Carousel";
import Card from "@/components/Card";
import Chip from "@/components/Chip";

import DummyData from "@/assets/dummy-data.json";

import styles from "./App.module.css";

function App() {
  const cards = useMemo(() => {
    return DummyData.map((item) => {
      const { name, description, image } = item;
      return (
        <Card
          key={nanoid()}
          name={name}
          description={description}
          image={image}
        />
      );
    });
  }, []);

  const chips = useMemo(() => {
    return DummyData.map((item) => {
      const { name, image } = item;
      return <Chip key={nanoid()} label={name} image={image} />;
    });
  }, []);

  return (
    <main>
      <Carousel className={styles["cards-carousel"]}>{cards}</Carousel>
      <Carousel className={styles["chips-carousel"]}>{chips}</Carousel>
    </main>
  );
}

export default App;
