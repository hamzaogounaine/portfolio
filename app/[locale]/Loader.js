"use client"
import { LoaderIcon } from 'lucide-react'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Loader = () => {
  const pathname = usePathname()
  const [loading , setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    const timeout = setTimeout(() => setLoading(false), 500);

    return () => clearTimeout(timeout);

  }, [pathname])

  return (<>
  {loading && <div className='min-h-screen min-w-fit flex items-center justify-center'><LoaderIcon className='animate-spin'/></div>}
  </>
  )
}

export default Loader
