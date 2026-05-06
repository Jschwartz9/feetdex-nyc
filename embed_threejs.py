#!/usr/bin/env python3
import re

# Read the Three.js library
with open('../three.min.js', 'r') as f:
    threejs_content = f.read()

# Read the HTML file
with open('feetdex-nyc.html', 'r') as f:
    html_content = f.read()

# Replace the CDN script tag with embedded content
cdn_pattern = r'<script src="https://cdn\.jsdelivr\.net/npm/three@0\.168\.0/build/three\.min\.js"></script>'
embedded_script = f'<script>\n{threejs_content}\n</script>'

# Replace the CDN reference (using string replacement to avoid regex issues)
cdn_string = '<script src="https://cdn.jsdelivr.net/npm/three@0.168.0/build/three.min.js"></script>'
html_content = html_content.replace(cdn_string, embedded_script)

# Write the modified HTML
with open('feetdex-nyc.html', 'w') as f:
    f.write(html_content)

print("Successfully embedded Three.js into HTML file")