import * as vscode from 'vscode'

function isEnabled() {
  return vscode.workspace.getConfiguration('zentabs').get('enabled')
}

export function activate(context: vscode.ExtensionContext) {
  let enabled = isEnabled()
  let previousEditor = vscode.window.activeTextEditor

  vscode.workspace.onDidChangeConfiguration(() => {
    enabled = isEnabled()
  })

  vscode.window.onDidChangeActiveTextEditor(async editor => {
    const isDirty = previousEditor && previousEditor.document.isDirty

    if (!editor || !enabled || isDirty) {
      return
    }

    // There doesn't seem to be a way to just close the previous editor (instead of all other editors)
    await vscode.commands.executeCommand('workbench.action.closeOtherEditorsInGroup')
    previousEditor = editor
  }, null, context.subscriptions)
}

// this method is called when your extension is deactivated
export function deactivate() {
}