import { Component, h, render } from 'vue'

export function useDialog() {
  const divId = 'dialog-container-content-1';

  const closeDialog = (id?: string) => {
    const container = document.getElementById(id || divId)
    if (container) {
      container.remove()
    }
  }

  const openDialog = (component: Component, props: any, id?: string) => {
    if (document.getElementById(id || divId)) {
      closeDialog()
    }

    const app = h(component, props)
    let dialog: any = document.createElement('dialog')

    dialog.addEventListener('click', (e: any) => {
      if (e.target === dialog) {
        closeDialog()
        dialog = null
      }
    })

    dialog.id = id || divId
    document.body.appendChild(dialog)
    render(app, dialog)
  }


  return {
    openDialog,
    closeDialog
  }
}