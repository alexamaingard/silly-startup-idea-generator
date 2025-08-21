import './App.css'
import { StartupIdeaGeneratorCard } from './components/StartupIdeaGeneratorCard';

export const App = () => {
  return (
    <div className='flex flex-col justify-between h-[50vh] min-h-max gap-y-12'>
      <div className='flex flex-col gap-y-8'>
        <h1 className='text-4xl font-semibold mb-2'>
          Startup Idea Generator
        </h1>
        <div className='text-lg text-pink-500'>
          Generate quirky, unexpected startup concepts with a touch of AI magic and eco-friendly flair.
        </div>
      </div>
      <StartupIdeaGeneratorCard />
    </div>
  )
};
