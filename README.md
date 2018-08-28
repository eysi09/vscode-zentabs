# VSCode Zentabs

A super simple VSCode extension, intended to simulate the Vim behavior of opening new files in the current window/editor.

When a new file is opened, the previous editor is immediately closed if the file it contains is clean. If the previous file is dirty, the new file will open in a new tab as usual.

When coupled with auto-save, it _feels_ like the content in the editor
is simply replaced with the new file content.

> Note: Despite the name, this is not like Atom's [ZenTabs](https://atom.io/packages/zentabs) which enables users to limit the number of open tabs. Rather, this extension is for users that only want a single open file in any given window.

## Install

This extension is not yet available on the VSCode market place. To use it with VSCode you'll therefore need to clone it into your local VSCode extensions folder.

For macOS/Linux users:

```sh
git clone https://github.com/eysi09/vscode-zentabs.git $HOME/.vscode/extensions
```
For Windows users:
```sh
git clone https://github.com/eysi09/vscode-zentabs.git %USERPROFILE%\.vscode\extensions
```

 ## Motivation

As a long time Vim user, when opening a new file I expect it to replace the file in the current window, assuming the buffer is not dirty.

With VSCode however, files always open in a new tab and there's no way of limiting the maximum number of open tabs (like e.g. with Atom's [ZenTabs](https://atom.io/packages/zentabs)). So the tabs just pile up as the coding session wears on, until an effort is made to close them.

See also this [issue](https://github.com/Microsoft/vscode/issues/9872).

With this extension, every time a new file is opened, all other files within that window pane are closed, assuming there are no unsaved changes. If there are unsaved changes, the new file will open in a new tab as usual.

## Extension Settings

Toggle `zentabs.enabled` to activate/deactivate.

## Tips

In your `settings.json`:

* Set `"workbench.editor.showTabs"` to `false` to hide the now redundant tabs bar and get back some of that valuable screen real estate. As an added bonus, the top bar now also shows the full file path. (Note that if the previous file was unsaved it won't be visible in the tabs bar although it's still there.)
* Set `"files.autoSave"` to `"afterDelay"` or `"onFocusChange"` to prevent new files opening in a new tab in case the current one was dirty. This ensures that there's always only one open editor per window pane.

## Known issues

The issues below are only relevant when auto-save is **not** set to `onFocusChange` or `afterDelay` (with the delay reasonably small).

#### All clean tabs within window pane are closed on active editor change event

There doesn't appear to be a way to only close the previous active editor. Instead, _all_ editors except the active one are closed. So if, hypothetically, a user were to have multiple open tabs (perhaps because of opening a new file before auto-save kicked in), those tabs would all close on the next active editor change event if they were saved in the meantime (perhaps because auto-save finally kicked in).

#### New file opens in a new tab even though previous file is clean

I've yet to take a better look at this one but it might be that the editor instance is undefined or that a clean file is mistaken for a dirty one.