"""Generate responsive WebP variants + blur placeholders.

Masters live in assets-src/. Output goes to src/assets/img/ and
src/data/imageMeta.json. Run: python scripts/optimize-images.py  (needs Pillow)
"""
import base64, io, json, pathlib
from PIL import Image

ROOT = pathlib.Path(__file__).resolve().parent.parent
SRC = ROOT / 'assets-src'
OUT = ROOT / 'src' / 'assets' / 'img'
META = ROOT / 'src' / 'data' / 'imageMeta.json'
WIDTHS = [480, 800, 1280]
HERO_WIDTHS = [480, 800, 1200, 1600]
QUALITY = 74

OUT.mkdir(parents=True, exist_ok=True)
for old in OUT.glob('*.webp'):
    old.unlink()

meta = {}
for path in sorted(SRC.glob('*.webp')):
    name = path.stem
    im = Image.open(path).convert('RGB')
    w, h = im.size
    widths = [x for x in (HERO_WIDTHS if name == 'hero' else WIDTHS) if x <= w]
    for target in widths:
        resized = im.resize((target, round(h * target / w)), Image.LANCZOS)
        resized.save(OUT / f'{name}-{target}.webp', 'WEBP', quality=QUALITY, method=6)
    tiny = im.resize((24, max(1, round(24 * h / w))), Image.LANCZOS)
    buf = io.BytesIO()
    tiny.save(buf, 'WEBP', quality=40, method=6)
    meta[name] = {
        'width': w,
        'height': h,
        'widths': widths,
        'lqip': 'data:image/webp;base64,' + base64.b64encode(buf.getvalue()).decode(),
    }

META.write_text(json.dumps(meta, indent=1))
total = sum(f.stat().st_size for f in OUT.glob('*.webp'))
print(f'{len(meta)} images, {len(list(OUT.glob("*.webp")))} files, {total // 1024} KB total')
