#!/bin/sh
# Fetch the two brand faces for the OG image generator. Run once.
# Gitignored: they are build-time only, not served from the site.
cd "$(dirname "$0")" && mkdir -p fonts && cd fonts
curl -sfL -o "CormorantGaramond[wght].ttf" \
  "https://raw.githubusercontent.com/google/fonts/main/ofl/cormorantgaramond/CormorantGaramond%5Bwght%5D.ttf"
curl -sfL -o "CormorantGaramond-Italic[wght].ttf" \
  "https://raw.githubusercontent.com/google/fonts/main/ofl/cormorantgaramond/CormorantGaramond-Italic%5Bwght%5D.ttf"
curl -sfL -o "Inter[opsz,wght].ttf" \
  "https://raw.githubusercontent.com/google/fonts/main/ofl/inter/Inter%5Bopsz%2Cwght%5D.ttf"
ls -l
