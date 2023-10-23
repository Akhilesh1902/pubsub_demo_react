import { useGLTF, Plane, Html } from '@react-three/drei';
import { Color, DoubleSide, Group, Mesh, PointLight } from 'three';
import { degToRad } from 'three/src/math/MathUtils.js';

import { useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import UI from './UI';
import useLightStore from '../../store/LightStore';
import useAppStore from '../../store/AppStore';

export default function Model() {
  // const { isLightActive, lightColor, lightIntensity, setLightActive } =
  //   useLightContext();
  const {
    isLightActive,
    lightColor,
    lightIntensity,
    // setColor,
    // setIntensity,
    setLightActive,
  } = useLightStore();

  const { isDay } = useAppStore();

  const { scene, camera } = useThree();

  const model = useGLTF(
    'https://d3t7cnf9sa42u5.cloudfront.net/compressed_models/Tables/Table_Automatic_01_v01.glb'
  );

  const light = model.scene.getObjectByName(
    'Desktop_Lamp_Light002'
  ) as PointLight;
  const lamp = model.scene.getObjectByName('Lamp0_Selectable') as Group;

  light.castShadow = true;
  model.scene.traverse((i) => {
    // console.log(i);
    if (i.isMesh) {
      i.castShadow = true;
      i.receiveShadow = true;
    }
  });

  useEffect(() => {
    if (isLightActive && !isDay) {
      light.intensity = lightIntensity;
      light.color = lightColor;
    } else {
      light.intensity = 0;
    }
    scene.background = isDay ? new Color(0xffffff) : new Color(0x000000);
  }, [isDay, isLightActive, lightColor, lightIntensity, light, scene]);

  const planeRef = useRef<React.MutableRefObject<Mesh>>();

  useFrame(() => {
    planeRef.current?.lookAt(camera.position);
  });

  return (
    <>
      <primitive object={model.scene}></primitive>

      {/* <mesh
        ref={planeRef}
        position={[1, 1, 1]}
        onClick={() => {
          console.log('here');
          setLightActive(!isLightActive);
        }}>
        <planeGeometry />
        <meshBasicMaterial side={DoubleSide} />
      </mesh> */}

      <Html
        position={[1.1, 1, 0.1]}
        geometry={<planeGeometry args={[1.66, 0.47, 0.24]} />}
        material={<meshBasicMaterial color={new Color(0xff0000)} />}
        distanceFactor={3}
        className='flex flex-col gap-2'>
        <div
          className='bg-blue-500 p-2 px-4 rounded-full font-bold text-white whitespace-nowrap'
          onClick={() => {
            setLightActive(!isLightActive);
          }}>
          Toggle Lamp
        </div>
        {isLightActive && (
          <div className='bg-white p-2 px-4 rounded-xl'>
            <UI />
          </div>
        )}
      </Html>

      <Plane
        args={[10, 10]}
        rotation={[degToRad(90), 0, 0]}
        receiveShadow={true}>
        <meshStandardMaterial side={DoubleSide} />
      </Plane>
    </>
  );
}
