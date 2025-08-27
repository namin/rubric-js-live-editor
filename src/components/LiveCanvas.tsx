import React, { useState } from 'react'
import clsx from 'clsx'
import { useCodeExecution } from '../hooks/useCodeExecution'
import styles from '../styles/LiveCanvas.module.css'

interface LiveCanvasProps {
  code: string
  className?: string
  width?: number
  height?: number
}

export const LiveCanvas = React.memo<LiveCanvasProps>(({
  code,
  className,
  width = 400,
  height = 300
}) => {
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null)
  
  // Callback ref to capture canvas when it mounts
  const canvasRef = React.useCallback((node: HTMLCanvasElement | null) => {
    setCanvas(node)
  }, [])
  
  const { error } = useCodeExecution({
    code,
    canvas,
    width,
    height
  })

  const hasCode = code.trim().length > 0

  return (
    <div className={clsx(styles.canvas, className)} role="region" aria-label="Live canvas output">
      <div className={styles.header}>
        <h2 className={styles.title}>Canvas Output</h2>
      </div>
      
      <div className={styles.canvasContainer}>
        {error && (
          <div className={styles.error} role="alert" aria-label="Execution error">
            Error: {error}
          </div>
        )}
        
        {!hasCode && !error && (
          <div className={styles.placeholder} aria-label="No code to execute">
            Write some JavaScript code in the editor to see the output here
          </div>
        )}
        
        <canvas
          ref={canvasRef}
          className={styles.canvasElement}
          width={width}
          height={height}
          id="canvas"
          role="img"
          aria-label="JavaScript execution canvas"
        />
      </div>
    </div>
  )
})
