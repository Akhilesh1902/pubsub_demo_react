import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Color } from 'three';
import Model from '../Furniture/Model';

export default function CanvasWrapper() {
  return (
    <Canvas
      scene={{ background: new Color(0x000) }}
      camera={{ position: [.5, 2, -3] }}
      shadows>
      <ambientLight intensity={1} />
      <OrbitControls />
      <Model />
    </Canvas>
  );
}
