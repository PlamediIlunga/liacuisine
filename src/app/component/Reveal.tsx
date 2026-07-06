'use client'
import { useEffect, useRef, useState } from 'react'

type RevealVariant = 'up' | 'left' | 'right' | 'zoom'

export default function Reveal({
    children,
    variant = 'up',
    delay = 0,
    className = '',
}: {
    children: React.ReactNode
    variant?: RevealVariant
    delay?: number
    className?: string
}) {
    const ref = useRef<HTMLDivElement>(null)
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const node = ref.current
        if (!node) return

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true)
                    observer.disconnect()
                }
            },
            { threshold: 0.15 }
        )

        observer.observe(node)
        return () => observer.disconnect()
    }, [])

    return (
        <div
            ref={ref}
            className={`reveal reveal--${variant}${visible ? ' is-visible' : ''} ${className}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    )
}