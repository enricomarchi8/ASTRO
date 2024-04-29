import { Canvas } from "@react-three/fiber";
//import { Perf } from "r3f-perf";
import { HomeBackground } from "../components/HomeBackground";
import { Container } from "react-bootstrap";

export default function Home() {
  return (
    <Container className="full-width">
      <h1 className="home-title mt-3">
        <strong>ASTRO</strong>
      </h1>
      <h2 className="home-subtitle">
        [Der. del gr. ástron, da astèr "stella", lat. astrum] [ASF] Denomin.
        generica di qualsiasi oggetto luminoso sulla sfera celeste: stelle,
        Sole, pianeti, comete, ecc.
      </h2>
      <Canvas
        camera={{
          fov: 100,
          near: 0.1,
          far: 200,
          // position: [15, 5, 5],
        }}
      >
        <HomeBackground />
      </Canvas>
    </Container>
  );
}
