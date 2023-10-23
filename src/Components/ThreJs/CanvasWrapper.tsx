import { OrbitControls, CameraControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Color } from 'three';
import Model from '../Furniture/Model';
import useAppStore from '../../store/AppStore';

export default function CanvasWrapper() {
  const { isDay } = useAppStore();
  console.log(isDay);
  return (
    <Canvas
      eventSource={document.getElementById('root')!}
      eventPrefix='client'
      scene={{ background: isDay ? new Color(0xffffff) : new Color(0x000000) }}
      camera={{ position: [0.5, 2, -3] }}
      shadows>
      <ambientLight intensity={isDay ? 1 : 0.5} />
      {/* <OrbitControls makeDefault /> */}
      {/* <CameraControls
        minPolarAngle={0}
        maxPolarAngle={Math.PI}
        minAzimuthAngle={0}
        maxAzimuthAngle={Math.PI * 2}
        domElement={document.getElementById('root')!}
      /> */}
      <CameraControls makeDefault />
      <Model />
    </Canvas>
  );
}
