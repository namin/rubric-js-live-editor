import { useEffect } from 'react'
import { JavaScriptEditor } from './components/JavaScriptEditor'
import { LiveCanvas } from './components/LiveCanvas'
import { useCodeStore } from './stores/code-store'
import styles from './styles/App.module.css'

export default function App() {
  const { code, setCode, executeCode, clearError } = useCodeStore()

  useEffect(() => {
    // Listen for editor execute events (Ctrl/Cmd + Enter)
    const handleExecute = () => {
      executeCode()
    }

    window.addEventListener('editor-execute', handleExecute)
    return () => {
      window.removeEventListener('editor-execute', handleExecute)
    }
  }, [executeCode])

  const handleCodeChange = (newCode: string) => {
    setCode(newCode)
    // Clear any previous errors when code changes
    clearError()
  }

  return (
    <div className={styles.app} role="main" aria-label="JavaScript Live Editor Application">
      <div className={styles.container}>
        <div className={styles.editorPanel} role="region" aria-label="Code editor panel">
          <JavaScriptEditor
            code={code}
            onChange={handleCodeChange}
          />
        </div>
        
        <div className={styles.canvasPanel} role="region" aria-label="Canvas output panel">
          <LiveCanvas
            code={code}
            width={400}
            height={300}
          />
        </div>
      </div>
    </div>
  )
}
