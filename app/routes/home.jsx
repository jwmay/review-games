import { GameSelector } from '../components/GameSelector/GameSelector'

export function meta() {
  return [
    { title: 'Review Games' },
    {
      name: 'description',
      content: 'A collection of simple review games to use in your classroom.',
    },
  ]
}

export default function Home() {
  return (
    <main className='flex h-screen items-center justify-center'>
      <div className='flex flex-col items-center gap-16'>
        <header className='flex flex-col items-center gap-9'>
          <h1 className='leading text-8xl text-center font-bold text-gray-800 dark:text-gray-100'>
            Review Games
          </h1>
          <GameSelector />
        </header>
      </div>
    </main>
  )
}
