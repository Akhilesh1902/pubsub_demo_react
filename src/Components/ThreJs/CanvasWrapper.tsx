import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Color } from 'three';
import Model from '../Furniture/Model';
import { useAppContext } from '../../Context/AppContext';

export default function CanvasWrapper() {
  const { isDay } = useAppContext();
  return (
    <Canvas
      scene={{ background: isDay ? new Color(0xffffff) : new Color(0x000000) }}
      camera={{ position: [0.5, 2, -3] }}
      shadows>
      <ambientLight intensity={1} />
      <OrbitControls />
      <Model />
    </Canvas>
  );
}
