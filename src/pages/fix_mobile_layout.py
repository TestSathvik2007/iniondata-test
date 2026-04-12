#!/usr/bin/env python3
"""
fix_mobile_layout.py
Run from your src/ directory (or wherever your page files live):
    python3 fix_mobile_layout.py
Patches all 5 files in-place.
"""
import os, sys

FILES = ["About.jsx", "Services.jsx", "ServicesCarousel.jsx", "AIEnablement.jsx", "Contact.jsx"]

PATCHES = [
    # 1. Container — 92vw → 100%
    ("--container:min(1600px,92vw);",
     "--container:min(1600px,100%);"),

    # 2. html rule — add overflow-x:hidden  (compact form, used in 4 of the files)
    ("html{height:100%;scroll-behavior:smooth;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility}",
     "html{height:100%;scroll-behavior:smooth;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility;overflow-x:hidden}"),

    # 3. Container padding — clamp so mobile gets proper breathing room
    #    Compact form (About/Services/AIEnablement/Contact)
    ("  .container{width:100%;max-width:var(--container);margin:0 auto;padding:0 var(--pad)}",
     "  .container{width:100%;max-width:var(--container);margin:0 auto;padding:0 clamp(12px,4vw,var(--pad))}"),

    # 4. ServicesCarousel has a spaced-out version of the same header max-width
    ("    max-width: min(1600px, 92vw);",
     "    max-width: min(1600px, 100%);"),

    # 5. ServicesCarousel svc-persp — contain 3D transforms
    ("  .svc-persp {\n    perspective: 1400px;\n    perspective-origin: 50% 38%;\n  }",
     "  .svc-persp {\n    perspective: 1400px;\n    perspective-origin: 50% 38%;\n    overflow: hidden;\n  }"),

    # 6. ServicesCarousel svc-track — add isolation
    ("  .svc-track {\n    display: flex;\n    gap: 20px;\n    will-change: transform;\n  }",
     "  .svc-track {\n    display: flex;\n    gap: 20px;\n    will-change: transform;\n    isolation: isolate;\n  }"),
]

changed = []
for fname in FILES:
    if not os.path.exists(fname):
        print(f"  SKIP  {fname} — not found")
        continue
    with open(fname, "r", encoding="utf-8") as f:
        src = f.read()
    original = src
    for old, new in PATCHES:
        src = src.replace(old, new)
    if src != original:
        with open(fname, "w", encoding="utf-8") as f:
            f.write(src)
        changed.append(fname)
        print(f"  FIXED {fname}")
    else:
        print(f"  CLEAN {fname} — no matching strings found (may already be fixed)")

print(f"\nDone. {len(changed)} file(s) updated.")