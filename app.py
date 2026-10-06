import streamlit as st
import streamlit.components.v1 as components

# Set the page layout to wide
st.set_page_config(page_title="Uni House Sim", layout="wide")

# Inject CSS to hide Streamlit's default UI, remove all padding, and force fullscreen
st.markdown("""
    <style>
        /* Hide the top header and bottom footer */
        header {visibility: hidden;}
        footer {visibility: hidden;}
        
        /* Remove padding around the main app container */
        .block-container {
            padding-top: 0rem !important;
            padding-bottom: 0rem !important;
            padding-left: 0rem !important;
            padding-right: 0rem !important;
            max-width: 100% !important;
        }
    </style>
""", unsafe_allow_html=True)

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
components.html(combined_html, height=760, scrolling=False)
