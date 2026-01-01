#!/bin/bash
# social-images.sh
# Generate social media images for multiple platforms from a base OG image
# Compatible with older Bash (macOS default)
# Usage: ./social-images.sh base-image.png

BASE_IMAGE=$1

if [ -z "$BASE_IMAGE" ]; then
  echo "Usage: $0 base-image.png"
  exit 1
fi

# Output folder
OUTPUT_DIR="social-images"
mkdir -p $OUTPUT_DIR

# Platform names
platforms=("twitter" "facebook" "linkedin" "discord" "slack" "mastodon" "bluesky")
# Corresponding sizes (width x height)
sizes=("1200x675" "1200x630" "1200x630" "1024x512" "1024x512" "1200x630" "1200x630")

# Loop and generate
for i in "${!platforms[@]}"; do
  platform=${platforms[$i]}
  dimensions=${sizes[$i]}
  OUTPUT_FILE="$OUTPUT_DIR/og-$platform.webp"
  echo "Generating $OUTPUT_FILE ($dimensions)..."
  magick "$BASE_IMAGE" -resize $dimensions -quality 90 "$OUTPUT_FILE"
done

echo "All social images generated in $OUTPUT_DIR/"
