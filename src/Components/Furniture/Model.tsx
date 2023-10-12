import { useGLTF, Plane } from '@react-three/drei';
import { Color, DoubleSide, PointLight } from 'three';
import { degToRad } from 'three/src/math/MathUtils.js';
import { useAppContext } from '../../Context/AppContext';
import { useLightContext } from '../../Context/lightContext';

import { useEffect } from 'react';
import { useThree } from '@react-three/fiber';

export default function Model() {
  const { isLightActive, lightColor, lightIntensity } = useLightContext();
  const { isDay } = useAppContext();

  const { scene } = useThree();

  const model = useGLTF(
    'https://d3t7cnf9sa42u5.cloudfront.net/compressed_models/Tables/Table_Automatic_01_v01.glb'
  );

  const light = model.scene.getObjectByName(
    'Desktop_Lamp_Light002'
  ) as PointLight;
  light.castShadow = true;

  model.scene.traverse((i) => {
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
  }, [isDay, isLightActive, lightColor, lightIntensity, light]);

  return (
    <>
      <primitive object={model.scene}></primitive>
      <Plane
        args={[10, 10]}
        rotation={[degToRad(90), 0, 0]}
        receiveShadow={true}>
        <meshStandardMaterial side={DoubleSide} />
      </Plane>
    </>
  );
}
