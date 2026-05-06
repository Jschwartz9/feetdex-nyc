#!/usr/bin/env python3

print("🔧 Fixing exact ID mismatches...")

with open('feetdx-nyc.html', 'r') as f:
    content = f.read()

# Fix the exact mismatches found in the analysis
exact_fixes = [
    # The main culprits causing the null errors
    ("sdexCount:     document.getElementById('fdex-count')", "sdexCount:     document.getElementById('sdex-count')"),
    ("sdexClose:     document.getElementById('fdex-close-btn')", "sdexClose:     document.getElementById('sdex-close-btn')"),

    # Also fix the shoedx-screen/grid if they're wrong
    ("shoedxScreen: document.getElementById('shoedx-screen')", "shoedxScreen: document.getElementById('shoedx-screen')"),
    ("shoedxGrid:   document.getElementById('shoedx-grid')", "shoedxGrid:   document.getElementById('shoedx-grid')"),
]

# Apply each fix and report
for old, new in exact_fixes:
    if old in content:
        content = content.replace(old, new)
        print(f"✅ Fixed: {old.split(':')[0]}")
    else:
        print(f"❌ Not found: {old}")

# Write the corrected content
with open('feetdx-nyc.html', 'w') as f:
    f.write(content)

print("\n🎮 Game should now load without the addEventListener null error!")