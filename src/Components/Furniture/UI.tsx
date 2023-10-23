import { Color } from 'three';
import useLightStore from '../../store/LightStore';
import useAppStore from '../../store/AppStore';

export default function UI() {
  // const {
  //   isLightActive,
  //   setLightActive,
  //   lightColor,
  //   lightIntensity,
  //   setIntensity,
  //   setColor,
  // } = useLightContext();

  const {
    isLightActive,
    lightColor,
    lightIntensity,
    setColor,
    setIntensity,
    setLightActive,
  } = useLightStore();
  // console.log(store);
  const { isDay } = useAppStore();

  return (
    <div className='flex flex-col gap-3 my-3'>
      <label
        htmlFor='active'
        className='flex gap-2 items-center'>
        <input
          type='checkbox'
          name='active'
          id='active'
          checked={isLightActive && !isDay}
          className='w-4 h-4'
          onChange={() => {
            setLightActive(!isDay ? !isLightActive : false);
          }}
        />
        Active
      </label>
      <label
        htmlFor='intensity'
        className='flex gap-2 items-center'>
        <input
          type='range'
          name='intensity'
          id='intensity'
          min={0}
          max={10}
          step={0.1}
          value={lightIntensity}
          onChange={(e) => {
            setIntensity(!isDay ? parseFloat(e.target.value) : lightIntensity);
          }}
        />
        Intensity
      </label>
      <label
        htmlFor='lightColor'
        className='flex gap-2 items-center'>
        <input
          type='color'
          name='lightColor'
          id='lightColor'
          value={'#' + lightColor.getHexString()}
          onChange={(e) => {
            setColor(isDay ? lightColor : new Color(e.target.value));
          }}
        />
        Color
      </label>
    </div>
  );
}
