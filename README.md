# Rive State Tester

A tiny chat-style web app for testing the `dytto_loader` Rive animation across all of its states. Type a message, watch the loader cycle through `idle → submitted → reasoning → streaming → ready → idle`. There is no real LLM — sending a message kicks off a ~5-second dummy flow that streams Lorem Ipsum, just enough to exercise every state.

## What it tests

The app drives the Rive view-model `ChatLoaderVM.state` (string) and lets you verify the `Chat Loader SM` state machine reacts correctly to each value:

| App state   | Rive `state` value |
|-------------|--------------------|
| idle        | `idle`             |
| submitted   | `submitted`        |
| reasoning   | `reasoning`        |
| streaming   | `streaming`        |
| ready       | `ready`            |
| error       | `err`              |

You can also click the state pills in the top bar to jump directly to any state without sending a message.

## Requirements

- Python 3.9+
- `pip install flask`
- A modern browser (uses ES modules + `@rive-app/canvas-single` from a CDN, so no JS build step)

## Running it

```bash
pip install flask
python3 server.py
```

Then open <http://localhost:3000>.

Set `PORT=4000 python3 server.py` to use a different port.

## Project layout

```
.
├── server.py                 # Flask server (serves index.html + the latest .riv)
├── public/
│   └── index.html            # Chat UI + Rive loader + inspector panel
├── dytto_loader_v06.riv      # Current loader animation (latest wins)
├── dytto_loader_v05.riv      # …older versions kept for reference
└── …
```

## Swapping in a new Rive file

The server picks the **highest-numbered** `dytto_loader*v<NN>*.riv` in the project root and serves it as `/loader.riv` with no-cache headers. To test a new export:

1. Drop the new file in the project root (any filename matching the regex `dytto_loader.*v(\d+).*\.riv` works — e.g. `dytto_loader_v07.riv` or `dytto_loader (test v07).riv`).
2. Hard-reload the browser (⌘⇧R).

No server restart needed unless `server.py` itself changed.

> Why not read directly from `~/Documents/...`? macOS' sandbox blocks the Flask interpreter from reading user folders unless Full Disk Access is granted to the Python binary. Keeping the .riv inside the project sidesteps that.

## How the Rive integration works

`public/index.html` does roughly:

1. Loads `/loader.riv` with `stateMachines: ['Chat Loader SM']`.
2. Binds the default `ChatLoaderVM` view-model instance to the artboard **and** the state machine (both bindings are needed in some Rive runtime versions).
3. On every app state change, writes the new value to `ChatLoaderVM.state` (string property) and pings `riveInst.play()` to make sure the SM is running.

The inspector panel in the top right shows live values for `state` and `isVisible` so you can confirm the writes are landing.

### Expectations for the `.riv` file

For the app to work, the .riv file must contain:

- An artboard with a state machine named **`Chat Loader SM`**.
- A view model named **`ChatLoaderVM`** with at least these properties:
  - `state` — **string**
  - `isVisible` — **boolean**
- State nodes in the SM named `idle`, `submitted`, `reasoning`, `streaming`, `ready`, `err`.
- Transitions: `Any State → <each named state>` with the condition `ChatLoaderVM.state == "<state name>"`. No `Has Exit Time`. No direct transitions between named states (those auto-fire on animation end and cause the SM to loop autonomously).
- Each looping animation (`submitted`, `reasoning`, `streaming`) set to **Loop** in the animation inspector. `idle`, `ready`, `error` are usually fine as One-Shot.

## Troubleshooting

**Animation cycles through all states on its own**
Transitions in the .riv aren't conditioned on `ChatLoaderVM.state`. Open the file in the Rive editor, click each `Any State → X` transition, and confirm its condition is `ChatLoaderVM.state == "X"` with `Has Exit Time` unchecked.

**`[Rive] couldn't drive state "…"` in the console**
The runtime couldn't find the `state` property on `ChatLoaderVM`. Check that the VM exists and the property is named exactly `state` (case-sensitive) of type `string`.

**Browser shows the old animation after replacing the .riv**
Hard-reload (⌘⇧R). The server sends `Cache-Control: no-store`, but the browser may still hold an in-memory copy until a hard refresh.

**Server logs `PermissionError: Operation not permitted`**
You're trying to read a .riv from outside the project root (e.g. `~/Documents`). Either move the file into the project or grant Full Disk Access to your Python binary in System Settings → Privacy & Security.

## License

Internal tool — no license attached. Do whatever you want with it inside the team.
