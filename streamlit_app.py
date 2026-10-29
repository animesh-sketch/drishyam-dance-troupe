"""Streamlit wrapper for the Drishyam static site.

Inlines css/js/images into index.html and renders it full-screen.
Run locally: streamlit run streamlit_app.py
"""
import base64
import mimetypes
import re
from pathlib import Path

import streamlit as st
import streamlit.components.v1 as components

ROOT = Path(__file__).parent

st.set_page_config(page_title="Drishyam Dance Troupe", page_icon="💃", layout="wide",
                   initial_sidebar_state="collapsed")

# Hide Streamlit chrome and let the site fill the whole window.
st.markdown("""
<style>
  header, footer, #MainMenu, [data-testid="stToolbar"], [data-testid="stDecoration"],
  [data-testid="stStatusWidget"] { display: none !important; }
  html, body, .stApp { background: #0b0a09; overflow: hidden; }
  .block-container, [data-testid="stMainBlockContainer"] { padding: 0 !important; max-width: 100% !important; }
  [data-testid="stAppViewContainer"] > section, [data-testid="stMain"] { padding: 0 !important; }
  iframe { position: fixed; inset: 0; width: 100vw !important; height: 100vh !important; height: 100dvh !important; border: 0; }
</style>
""", unsafe_allow_html=True)


def data_uri(path: Path) -> str:
    mime = mimetypes.guess_type(path.name)[0] or "application/octet-stream"
    return f"data:{mime};base64,{base64.b64encode(path.read_bytes()).decode()}"


def inline_assets(js: str) -> str:
    """Swap 'assets/...' image paths for data URIs; missing files keep their path (placeholder shows)."""
    def repl(m):
        p = ROOT / m.group(2)
        return f"{m.group(1)}{data_uri(p)}{m.group(1)}" if p.is_file() else m.group(0)
    return re.sub(r"""(["'])(assets/[^"']+\.(?:jpe?g|png|webp|svg))\1""", repl, js)


@st.cache_data(show_spinner=False)
def build_page(mtime: float) -> str:
    html = (ROOT / "index.html").read_text(encoding="utf-8")
    css = (ROOT / "css/styles.css").read_text(encoding="utf-8")
    content = inline_assets((ROOT / "js/content.js").read_text(encoding="utf-8"))
    main = (ROOT / "js/main.js").read_text(encoding="utf-8")
    html = html.replace('<link rel="stylesheet" href="css/styles.css" />', f"<style>{css}</style>")
    html = html.replace('<script src="js/content.js"></script>', f"<script>{content}</script>")
    html = html.replace('<script src="js/main.js"></script>', f"<script>{main}</script>")
    html = html.replace('href="assets/favicon.svg"', f'href="{data_uri(ROOT / "assets/favicon.svg")}"')
    return html


mtime = max(p.stat().st_mtime for p in [ROOT / "index.html", ROOT / "css/styles.css",
                                        ROOT / "js/content.js", ROOT / "js/main.js",
                                        *(ROOT / "assets/images").glob("*")])
components.html(build_page(mtime), height=900, scrolling=True)
