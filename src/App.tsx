import { useAppContext } from './Context/AppContext';
import ThreeJs from './Components/ThreJs/CanvasWrapper';
import UI from './Components/Furniture/UI';

function App() {
  const { isDay, updateDayLight } = useAppContext();
  return (
    <>
      <div className='h-screen flex flex-col md:flex-row gap-4 p-5'>
        <div className='canvasWrapper w-full aspect-square outline-dashed'>
          <ThreeJs />
        </div>
        <div className='UI_wrapper w-full  '>
          <button
            className='bg-slate-500 px-6 py-2 rounded-md text-slate-50 '
            onClick={() => {
              updateDayLight(!isDay);
            }}>
            {isDay ? 'Day' : 'Night'}
          </button>
          <UI />
        </div>
      </div>
    </>
  );
}

export default App;
