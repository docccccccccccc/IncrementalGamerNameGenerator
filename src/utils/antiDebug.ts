const handleKeyDown = (e: KeyboardEvent) => {
  const { key, ctrlKey, shiftKey, metaKey, altKey } = e

  // F12
  if (key === 'F12') {
    e.preventDefault()
  }

  // Shift + Ctrl + I / J / C
  if (shiftKey && ctrlKey && ['I', 'J', 'C'].includes(key)) {
    e.preventDefault()
  }

  // Command + Option + I in Mac
  if (metaKey && altKey && key === 'I') {
    e.preventDefault()
  }
}

const handleContextMenu = (e: MouseEvent) => {
  e.preventDefault()
}

let intervalID: number | null = null

export const initAntiDebug = () => {
  if (import.meta.env.PROD) {
    // Production environment only

    // Prevent hotkeys
    window.addEventListener('keydown', handleKeyDown)

    // Prevent context menu
    window.addEventListener('contextmenu', handleContextMenu)

    const checkDevTools = () => {
      const startTime = new Date().getTime()

      ;(() => {
        debugger /* oxlint-disable-line oxc(eslint(no-debugger)) */
      })()

      const endTime = new Date().getTime()

      const isOpen = endTime - startTime > 100

      if (isOpen) {
        window.location.reload()
      }
    }

    intervalID = setInterval(checkDevTools, 1000)
  }
}

export const destroyAntiDebug = () => {
  window.removeEventListener('keydown', handleKeyDown)
  window.removeEventListener('contextmenu', handleContextMenu)
  if (intervalID !== null) {
    clearInterval(intervalID)
    intervalID = null
  }
}
