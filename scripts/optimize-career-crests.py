from pathlib import Path
from PIL import Image


SOURCE = Path(__file__).resolve().parent.parent / "assets" / "crests-v2"
MAX_SIZE = (128, 128)


for source in sorted(SOURCE.glob("*.png")):
    destination = source.with_suffix(".webp")
    with Image.open(source) as image:
        image = image.convert("RGBA")
        image.thumbnail(MAX_SIZE, Image.Resampling.LANCZOS)
        image.save(destination, "WEBP", quality=82, method=3, exact=True)
    print(f"{source.name} -> {destination.name}")
