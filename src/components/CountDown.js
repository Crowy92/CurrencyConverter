import React, { useEffect, useState, useRef } from 'react'

export default function CountDown({seconds, setDisplayCurrency}) {
    const [countdown, setCountDown] = useState(seconds)
    const timerId = useRef()

    useEffect(() => {
        timerId.current = setInterval(() => {
            setCountDown(prev => prev -1)
        }, 1000)
        return () => clearInterval(timerId.current)
    }, [])

    useEffect(() => {
        if (countdown <=0) {
            clearInterval(timerId.current)
            setDisplayCurrency('')
        }
    })
  return (
    <p className='countdown'>Expires in: {countdown} seconds</p>
  )
}
