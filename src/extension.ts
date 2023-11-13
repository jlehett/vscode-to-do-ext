import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('my-to-do.showTodo', () => {
        const panel = vscode.window.createWebviewPanel(
            'todoList', // Identifies the type of the webview
            'Todo List', // Title of the panel displayed to the user
            vscode.ViewColumn.One, // Editor column to show the new webview panel in
            {
                enableScripts: true // Enable JavaScript in the webview
            }
        );

        panel.webview.html = getWebviewContent(panel.webview, context.extensionUri);
    });

    context.subscriptions.push(disposable);
}

function deactivate() {}

function getWebviewContent(webview: vscode.Webview, extensionUri: vscode.Uri) {
    const scriptPathOnDisk = vscode.Uri.joinPath(extensionUri, 'out', 'bundle.js');
    const scriptUri = webview.asWebviewUri(scriptPathOnDisk);

    return `<!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Todo List</title>
      </head>
      <body>
          <div id="root"></div>
          <script src="${scriptUri}"></script>
      </body>
      </html>`;
}



module.exports = {
    activate,
    deactivate
};
