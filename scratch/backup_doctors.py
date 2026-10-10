import os
import glob
from PIL import Image, ImageDraw, ImageFilter
import numpy as np

dir_path = r'c:\Users\jasim\Web Project\Enterprises\Dental\Dento Care\public\images\doctors'
backup_dir = r'c:\Users\jasim\Web Project\Enterprises\Dental\Dento Care\public\images\doctors\backup_before_shoukath_align'
os.makedirs(backup_dir, exist_ok=True)

# First, backup current images
for f in glob.glob(os.path.join(dir_path, '*.jpg')):
    b_name = os.path.basename(f)
    dest = os.path.join(backup_dir, b_name)
    if not os.path.exists(dest):
        Image.open(f).save(dest)
print("Backup complete.")
