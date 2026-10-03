import os
from PIL import Image

os.makedirs('public/images/products', exist_ok=True)

def save_crop(img, fname):
    rgb = img.convert('RGB')
    rgb.save(os.path.join('public/images/products', fname), quality=92)

# Image 1 (3 items):
im1 = Image.open(r'C:/Users/Usuario/.gemini/antigravity/brain/e3c06969-3ed0-4b6c-8903-ea23b5f4492d/.user_uploaded/media_1790462852898.png')
card_boxes_im1 = [
    ("arabians-tonka.jpg", (107, 70, 388, 350)),
    ("erba-pura.jpg", (404, 70, 686, 350)),
    ("fame-parfum.jpg", (703, 70, 986, 350))
]
for fname, box in card_boxes_im1:
    save_crop(im1.crop(box), fname)

# Image 2 (3 items):
im2 = Image.open(r'C:/Users/Usuario/.gemini/antigravity/brain/e3c06969-3ed0-4b6c-8903-ea23b5f4492d/.user_uploaded/media_1790462864004.png')
card_boxes_im2 = [
    ("leau-kenzo.jpg", (76, 34, 358, 324)),
    ("la-bomba.jpg", (376, 34, 658, 324)),
    ("la-vie-est-belle.jpg", (676, 34, 958, 324))
]
for fname, box in card_boxes_im2:
    save_crop(im2.crop(box), fname)

# Image 3 (7 items):
im3 = Image.open(r'C:/Users/Usuario/.gemini/antigravity/brain/e3c06969-3ed0-4b6c-8903-ea23b5f4492d/.user_uploaded/media_1790462879831.png')
im3_items = [
    ("le-male-elixir.jpg", (44, 12, 140, 108)),
    ("light-blue.jpg", (144, 12, 240, 108)),
    ("nitro-red.jpg", (244, 12, 340, 108)),
    ("phantom.jpg", (44, 165, 140, 260)),
    ("polo-red.jpg", (144, 165, 240, 260)),
    ("stronger-with-you.jpg", (244, 165, 340, 260)),
    ("valentino-uomo.jpg", (44, 318, 140, 412))
]
for fname, box in im3_items:
    save_crop(im3.crop(box), fname)

# Image 4 (18 items):
im4 = Image.open(r'C:/Users/Usuario/.gemini/antigravity/brain/e3c06969-3ed0-4b6c-8903-ea23b5f4492d/.user_uploaded/media_1790462903615.png')
im4_names = [
    ["qaed-lattafa.jpg", "9pm-afnan.jpg", "9pm-black.jpg"],
    ["9pm-night-dive.jpg", "9pm-rebel.jpg", "ajwad-lattafa.jpg"],
    ["amber-oud-aqua-dubai.jpg", "amber-oud-blue.jpg", "amber-oud-carbon.jpg"],
    ["amber-oud-dubai-night.jpg", "amber-oud-gold-24k.jpg", "amber-oud-gold-120.jpg"],
    ["amber-oud-gold-60.jpg", "amber-oud-ruby.jpg", "amber-oud-tobacco.jpg"],
    ["ameer-al-oudh.jpg", "ana-abiyedh.jpg", "ana-abiyedh-rouge.jpg"]
]
w4, h4 = im4.size
row_h4 = (h4 - 24) / 6.0
col_w4 = w4 / 3.0

for r in range(6):
    for c in range(3):
        x1 = int(c * col_w4 + 5)
        x2 = int((c + 1) * col_w4 - 5)
        y1 = int(24 + r * row_h4 + 2)
        y2 = int(24 + r * row_h4 + row_h4 * 0.65)
        save_crop(im4.crop((x1, y1, x2, y2)), im4_names[r][c])

# Image 5 (21 items):
im5 = Image.open(r'C:/Users/Usuario/.gemini/antigravity/brain/e3c06969-3ed0-4b6c-8903-ea23b5f4492d/.user_uploaded/media_1790462920367.png')
im5_names = [
    ["angham-lattafa.jpg", "angham-gold.jpg", "angham-rose.jpg"],
    ["ansaam-gold.jpg", "al-qiam-silver.jpg", "al-noble-safeer.jpg"],
    ["asad-lattafa.jpg", "asad-zanzibar.jpg", "asad-collection-set.jpg"],
    ["asad-dark-mamba.jpg", "al-nashama-caprice.jpg", "badee-al-oud-sublime.jpg"],
    ["ansaam-silver.jpg", "al-qiam-gold.jpg", "badee-al-oud-amethyst.jpg"],
    ["badee-al-oud-honor-glory.jpg", "badee-al-oud-sublime-red.jpg", "badee-al-oud-noble-blush.jpg"],
    ["badee-al-oud-oud-for-glory.jpg", "khamrah-lattafa.jpg", "khamrah-qahwa.jpg"]
]
w5, h5 = im5.size
row_h5 = h5 / 7.0
col_w5 = w5 / 3.0

for r in range(7):
    for c in range(3):
        x1 = int(c * col_w5 + 5)
        x2 = int((c + 1) * col_w5 - 5)
        y1 = int(r * row_h5 + 2)
        y2 = int(r * row_h5 + row_h5 * 0.65)
        save_crop(im5.crop((x1, y1, x2, y2)), im5_names[r][c])

print("Successfully cropped and saved all 49 product images!")
