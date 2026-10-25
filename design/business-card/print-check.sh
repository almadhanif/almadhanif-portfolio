#!/usr/bin/env bash
# Konversi PDF cetak ke CMYK lalu periksa: raster (harus ±600 ppi), font, ukuran halaman.
# Jangan pakai -dMaxShadingBitmapSize/-r: kombinasi itu membuat Ghostscript membuang gradien.
# Pakai: bash design/business-card/print-check.sh   (butuh ghostscript + poppler)
set -euo pipefail
cd "$(dirname "$0")/print"
gs_cmyk() {
  gs -q -dSAFER -dBATCH -dNOPAUSE -sDEVICE=pdfwrite \
    -sColorConversionStrategy=CMYK -sProcessColorModel=DeviceCMYK -dPDFSETTINGS=/prepress \
    -dEmbedAllFonts=true -dSubsetFonts=true -dAutoRotatePages=/None \
    -dDownsampleColorImages=false -dAutoFilterColorImages=false -dColorImageFilter=/FlateEncode \
    -o "$2" "$1"
}
for f in print cropmarks; do gs_cmyk "almadhani-card-$f-rgb.pdf" "almadhani-card-$f-cmyk.pdf"; done
for f in *.pdf; do
  imgs=$(pdfimages -list "$f" | tail -n +3 | awk '{printf "%sx%s@%sppi ", $4, $5, $13}')
  fonts=$(pdffonts "$f" | tail -n +3 | awk '{print $2}' | sort -u | tr '\n' ' ')
  size=$(pdfinfo "$f" | awk -F': *' '/Page size/{print $2}')
  echo "$f | raster: $imgs | font: $fonts| $size"
done
