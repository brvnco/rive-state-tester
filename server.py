import os
import re
from pathlib import Path
from flask import Flask, send_from_directory, send_file

BASE = Path(__file__).parent
PUBLIC = BASE / "public"
RIVE_DIR = BASE  # scan project folder — macOS sandbox blocks Documents/
RIVE_PATTERN = re.compile(r"dytto_loader.*?v(\d+).*?\.riv$", re.IGNORECASE)

app = Flask(__name__)


def latest_rive_file():
    candidates = []
    if RIVE_DIR.exists():
        for p in RIVE_DIR.iterdir():
            m = RIVE_PATTERN.match(p.name)
            if m:
                candidates.append((int(m.group(1)), p))
    if not candidates:
        return None
    candidates.sort(key=lambda t: t[0], reverse=True)
    return candidates[0][1]


@app.route("/")
def index():
    return send_file(PUBLIC / "index.html")


@app.route("/loader.riv")
def rive_file():
    latest = latest_rive_file()
    if latest is None:
        return ("No dytto_loader (test vNN).riv found in ~/Documents/Dytto/Rive/", 404)
    print(f"[rive] serving {latest.name}")
    resp = send_file(latest, mimetype="application/octet-stream")
    resp.headers["Cache-Control"] = "no-store, must-revalidate"
    resp.headers["Pragma"] = "no-cache"
    return resp


@app.route("/<path:path>")
def static_files(path):
    return send_from_directory(PUBLIC, path)


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 3000))
    print(f"\n🚀  http://localhost:{port}\n")
    app.run(port=port, debug=False, threaded=True)
