import { useState, useEffect, useCallback } from 'react'

interface UseCodeExecutionProps {
  code: string
  canvas: HTMLCanvasElement | null
  width: number
  height: number
}

interface UseCodeExecutionReturn {
  error: string | null
  isExecuting: boolean
  executeCode: () => void
}

export const useCodeExecution = ({
  code,
  canvas,
  width,
  height
}: UseCodeExecutionProps): UseCodeExecutionReturn => {
  const [error, setError] = useState<string | null>(null)
  const [isExecuting, setIsExecuting] = useState(false)

  const executeCode = useCallback(() => {
    if (!canvas || !code.trim()) {
      setError(null)
      return
    }

    setIsExecuting(true)
    setError(null)

    try {
      // Clear the canvas
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        
        // Set canvas size
        canvas.width = width
        canvas.height = height
      }

      // Create a safe execution context
      const sandboxGlobals = {
        document: {
          getElementById: (id: string) => id === 'canvas' ? canvas : null
        },
        console: {
          log: (...args: any[]) => console.log('[Canvas]', ...args),
          error: (...args: any[]) => console.error('[Canvas]', ...args),
          warn: (...args: any[]) => console.warn('[Canvas]', ...args)
        },
        Math,
        Date,
        JSON,
        parseInt,
        parseFloat,
        isNaN,
        isFinite,
        setTimeout: (fn: Function, delay: number) => {
          // Limit setTimeout to prevent infinite loops
          if (delay < 10) delay = 10
          return window.setTimeout(fn, Math.min(delay, 5000))
        },
        setInterval: () => {
          throw new Error('setInterval is not allowed for security reasons')
        },
        // Prevent access to dangerous globals
        window: undefined,
        global: undefined,
        process: undefined,
        require: undefined,
        module: undefined,
        exports: undefined
      }

      // Create function with limited scope
      const func = new Function(
        ...Object.keys(sandboxGlobals),
        `
        "use strict";
        try {
          ${code}
        } catch (e) {
          throw e;
        }
        `
      )

      // Execute with sandboxed globals
      func(...Object.values(sandboxGlobals))
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err)
      setError(errorMessage)
      console.error('Canvas execution error:', err)
    } finally {
      setIsExecuting(false)
    }
  }, [code, canvas, width, height])

  // Auto-execute when code changes
  useEffect(() => {
    executeCode()
  }, [executeCode])

  return {
    error,
    isExecuting,
    executeCode
  }
}
