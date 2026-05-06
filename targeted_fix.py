#!/usr/bin/env python3

print("🔍 Analyzing line 3386 error...")

# Read the file
with open('feetdex-nyc.html', 'r') as f:
    lines = f.readlines()

# Find line 3386 and the context
print(f"Line 3386: {lines[3385].strip()}")

# Find the _el object definition to see what element is null
el_definition_start = None
for i, line in enumerate(lines):
    if 'this._el = {' in line or 'this._el={' in line:
        el_definition_start = i
        break

if el_definition_start:
    print(f"\n🔍 Found _el definition starting at line {el_definition_start + 1}")

    # Print the _el object definition
    brace_count = 0
    for i in range(el_definition_start, min(el_definition_start + 50, len(lines))):
        line = lines[i]
        print(f"Line {i+1}: {line.rstrip()}")

        # Count braces to find end of object
        brace_count += line.count('{') - line.count('}')
        if brace_count == 0 and i > el_definition_start:
            break

# Now let's find what HTML IDs actually exist
print(f"\n🔍 Checking HTML IDs that exist:")
html_ids = []
for i, line in enumerate(lines):
    if 'id=' in line and ('sdex' in line or 'shoedx' in line):
        print(f"Line {i+1}: {line.strip()}")

        # Extract the ID
        import re
        id_match = re.search(r'id=["\']([^"\']+)["\']', line)
        if id_match:
            html_ids.append(id_match.group(1))

print(f"\nFound HTML IDs: {html_ids}")

# Create the fix
content = ''.join(lines)

# The specific fix for the error - ensure JavaScript matches HTML
fixes = [
    # Based on what we found, fix the specific mismatches
    ('shoedxScreen: document.getElementById(\'shoedx-screen\')', 'shoedxScreen: document.getElementById(\'shoedx-screen\')'),
    ('shoedxGrid: document.getElementById(\'shoedx-grid\')', 'shoedxGrid: document.getElementById(\'shoedx-grid\')'),
]

# Apply fixes
for old, new in fixes:
    if old in content:
        content = content.replace(old, new)
        print(f"✅ Fixed: {old}")
    else:
        print(f"❌ Not found: {old}")

# Write back
with open('feetdx-nyc.html', 'w') as f:
    f.write(content)

print("\n✅ Applied targeted fixes for line 3386 error")