import streamlit as st
import streamlit.components.v1 as components

st.set_page_config(page_title="Uni House Sim", layout="wide")

# Read your static files
with open("style.css", "r", encoding="utf-8") as f:
    css = f.read()
with open("game.js", "r", encoding="utf-8") as f:
    js = f.read()
with open("index.html", "r", encoding="utf-8") as f:
    html = f.read()

# Inject the CSS and JS directly into the HTML head and body
combined_html = html.replace(
    '</head>', f'<style>{css}</style></head>'
).replace(
    '</body>', f'<script>{js}</script></body>'
)

# Render the game inside Streamlit
components.html(combined_html, height=800, scrolling=False)
