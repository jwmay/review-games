export default function AppLoading() {
  return (
    <main className='flex h-screen items-center justify-center'>
      <div className='flex flex-col items-center gap-16'>
        <header className='flex flex-col items-center gap-9'>
          <h1 className='leading text-8xl text-center font-bold text-gray-800 dark:text-gray-100'>
            Review Games
          </h1>
          <div className='flex gap-8'>
            <div className='skeleton h-[560px] w-96'></div>
            <div className='skeleton h-[560px] w-96'></div>
            <div className='skeleton h-[560px] w-96'></div>
          </div>
        </header>
      </div>
    </main>
  )
}
