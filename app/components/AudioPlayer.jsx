import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVolumeHigh, faVolumeXmark } from '@fortawesome/free-solid-svg-icons'

const useAudio = (src, autoplay) => {
  const [audio] = useState(new Audio(src))
  const [playing, setPlaying] = useState(autoplay || false)

  const toggle = () => setPlaying(!playing)

  useEffect(() => {
    playing ? audio.play() : audio.pause()
  }, [audio, playing])

  useEffect(() => {
    audio.addEventListener('ended', () => setPlaying(false))

    return () => {
      audio.removeEventListener('ended', () => setPlaying(false))
    }
  }, [audio])

  return [playing, toggle]
}

export default function AudioPlayer({ autoplay, hidden, src }) {
  const [playing, toggle] = useAudio(src, autoplay)

  if (hidden) return null

  return (
    <div
      className='text-gray-400 cursor-pointer hover:text-black'
      onClick={toggle}
    >
      {playing ? (
        <FontAwesomeIcon icon={faVolumeHigh} size='lg' fixedWidth />
      ) : (
        <FontAwesomeIcon icon={faVolumeXmark} size='lg' fixedWidth />
      )}
    </div>
  )
}
