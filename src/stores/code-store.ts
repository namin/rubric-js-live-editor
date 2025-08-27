import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

interface CodeState {
  code: string
  isExecuting: boolean
  error: string | null
  lastExecutedCode: string | null
}

interface CodeActions {
  setCode: (code: string) => void
  executeCode: () => void
  clearError: () => void
  reset: () => void
}

type CodeStore = CodeState & CodeActions

const DEFAULT_CODE = `// Welcome to the JavaScript Live Editor!
// Draw on the canvas using these functions:

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Set canvas size
canvas.width = 400;
canvas.height = 300;

// Draw a colorful rectangle
ctx.fillStyle = '#4A90E2';
ctx.fillRect(50, 50, 100, 80);

// Draw a circle
ctx.beginPath();
ctx.arc(200, 100, 40, 0, 2 * Math.PI);
ctx.fillStyle = '#F5A623';
ctx.fill();

// Draw some text
ctx.fillStyle = '#333';
ctx.font = '16px Arial';
ctx.fillText('Hello Canvas!', 50, 200);`

export const useCodeStore = create<CodeStore>()(
  immer((set, get) => ({
    // State
    code: DEFAULT_CODE,
    isExecuting: false,
    error: null,
    lastExecutedCode: null,

    // Actions
    setCode: (code: string) => {
      set((state) => {
        state.code = code
        // Clear error when code changes
        if (state.error) {
          state.error = null
        }
      })
      
      // Save to localStorage for persistence
      try {
        localStorage.setItem('js-live-editor-code', code)
      } catch (e) {
        // Ignore localStorage errors
      }
    },

    executeCode: () => {
      const { code } = get()
      set((state) => {
        state.isExecuting = true
        state.error = null
        state.lastExecutedCode = code
      })
      
      // Execution will be handled by the canvas component
      // This just updates the state to trigger re-execution
      setTimeout(() => {
        set((state) => {
          state.isExecuting = false
        })
      }, 100)
    },

    clearError: () => {
      set((state) => {
        state.error = null
      })
    },

    reset: () => {
      set((state) => {
        state.code = DEFAULT_CODE
        state.isExecuting = false
        state.error = null
        state.lastExecutedCode = null
      })
      
      try {
        localStorage.removeItem('js-live-editor-code')
      } catch (e) {
        // Ignore localStorage errors
      }
    }
  }))
)

// Initialize from localStorage on app start
try {
  const savedCode = localStorage.getItem('js-live-editor-code')
  if (savedCode) {
    useCodeStore.getState().setCode(savedCode)
  }
} catch (e) {
  // Ignore localStorage errors
}
