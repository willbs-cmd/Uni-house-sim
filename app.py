import streamlit as st
import streamlit.components.v1 as components

st.set_page_config(
    page_title="Uni House Sim — Adult Edition",
    page_icon="🏠",
    layout="wide",
    initial_sidebar_state="collapsed",
)

st.markdown("""
<style>
header, footer, [data-testid="stToolbar"] { visibility: hidden; height: 0; }
.block-container { padding: 0 !important; max-width: 100% !important; }
.stApp { background: #11151c; }
iframe { width: 100% !important; border: 0 !important; }
</style>
""", unsafe_allow_html=True)

base = Path(__file__).parent
html = (base / "index.html").read_text(encoding="utf-8")
css = (base / "style.css").read_text(encoding="utf-8")
js = (base / "game.js").read_text(encoding="utf-8")

combined = html.replace("</head>", f"<style>{css}</style></head>")
combined = combined.replace("</body>", f"<script>{js}</script></body>")

components.html(combined, height=1080, scrolling=True)
