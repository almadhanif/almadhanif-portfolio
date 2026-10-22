"""Bangun kit logo "AL" (opsi 1 — tulisan tangan) dari satu sumber geometri.

Goresan (stroke) diubah menjadi bentuk isi (fill) dengan picosvg agar logo tampil sama di semua renderer,
lalu wordmark "Almadhani" dibuat dari outline Plus Jakarta Sans ExtraBold (fonttools).

Butuh: pip install picosvg fonttools; font variabel Plus Jakarta Sans (path lewat --font).
Pakai: python build_kit.py --font PlusJakartaSans.ttf
"""
import argparse
from pathlib import Path

from fontTools.pens.boundsPen import BoundsPen
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer
from picosvg.svg import SVG

NAVY, ORANGE, WHITE, BLACK = '#1E3A8A', '#EE5533', '#FFFFFF', '#000000'
OUT = Path(__file__).parent / 'kit'

# Geometri master (kanvas 256): kaki A, palang A (menjorok ke kiri), L dengan ekor naik ke kanan.
A_LEGS = 'M40 204 Q70 128 98 64 Q103 52 109 62 Q118 128 122 200'
A_BAR = 'M34 142 Q72 136 112 134'
L_STROKE = 'M166 48 Q158 118 152 168 Q148 194 172 186 Q200 176 224 158'
# Versi kecil untuk ubin/favicon: goresan lebih tebal, sedikit dirapatkan ke tengah
T_LEGS = 'M58 196 Q82 132 104 82 Q109 70 115 80 Q122 132 125 192'
T_BAR = 'M50 150 Q82 145 117 143'
T_L = 'M166 72 Q160 128 155 166 Q152 188 172 182 Q192 175 210 162'


def stroke_svg(parts, bg=None):
    rect = f'<rect width="256" height="256" rx="60" fill="{bg}"/>' if bg else ''
    paths = ''.join(
        f'<path d="{d}" fill="none" stroke="{c}" stroke-width="{w}" stroke-linecap="round" stroke-linejoin="round"/>'
        for d, c, w in parts
    )
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">{rect}{paths}</svg>'


def to_fills(svg_text: str) -> str:
    """Ubah semua stroke jadi path isi (picosvg), hasilkan SVG bersih tanpa stroke."""
    return SVG.fromstring(svg_text).topicosvg().tostring(pretty_print=True)


def symbol(a=NAVY, bar=ORANGE, l=NAVY, weight=19):
    return to_fills(stroke_svg([(A_LEGS, a, weight), (A_BAR, bar, weight - 2), (L_STROKE, l, weight)]))


def tile(bg=NAVY, fg=WHITE, bar=ORANGE):
    return to_fills(stroke_svg([(T_LEGS, fg, 24), (T_BAR, bar, 22), (T_L, fg, 24)], bg=bg))


def wordmark_path(font_path: str, text: str, weight: int = 800):
    """Outline teks sebagai path SVG (y ke bawah), plus lebar & tinggi cap untuk tata letak."""
    font = instancer.instantiateVariableFont(TTFont(font_path), {'wght': weight})
    gs, cmap, hmtx = font.getGlyphSet(), font.getBestCmap(), font['hmtx']
    upm = font['head'].unitsPerEm
    pen = SVGPathPen(gs)
    x = 0
    for ch in text:
        name = cmap[ord(ch)]
        gs[name].draw(TransformPen(pen, (1, 0, 0, -1, x, 0)))
        x += hmtx[name][0]
    bp = BoundsPen(gs)
    gs[cmap[ord('A')]].draw(bp)
    cap = bp.bounds[3]
    return pen.getCommands(), x, cap, upm


def lockup(font_path: str, color_text=NAVY, a=NAVY, bar=ORANGE, l=NAVY):
    """Simbol + wordmark mendatar. Tinggi kanvas 256; wordmark setinggi ~42% simbol, sejajar baseline L."""
    d, width, cap, _ = wordmark_path(font_path, 'Almadhani')
    scale = 92 / cap  # tinggi huruf kapital wordmark = 92 unit
    sym_inner = symbol(a, bar, l)
    inner = sym_inner.split('>', 1)[1].rsplit('</svg>', 1)[0]
    tx = 276
    w_total = tx + width * scale + 12
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w_total:.0f} 256">'
        f'<g>{inner}</g>'
        f'<path fill="{color_text}" transform="translate({tx} 192) scale({scale:.5f})" d="{d}"/>'
        f'</svg>'
    )


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--font', required=True)
    font = ap.parse_args().font
    OUT.mkdir(exist_ok=True)
    files = {
        'al-symbol.svg': symbol(),
        'al-symbol-navy.svg': symbol(NAVY, NAVY, NAVY),
        'al-symbol-black.svg': symbol(BLACK, BLACK, BLACK),
        'al-symbol-white.svg': symbol(WHITE, WHITE, WHITE),
        'al-symbol-reversed.svg': symbol(WHITE, ORANGE, WHITE),
        'al-tile.svg': tile(),
        'al-tile-orange.svg': tile(bg=ORANGE, fg=WHITE, bar=NAVY),
        'al-lockup.svg': lockup(font),
        'al-lockup-reversed.svg': lockup(font, WHITE, WHITE, ORANGE, WHITE),
        'al-lockup-black.svg': lockup(font, BLACK, BLACK, BLACK, BLACK),
    }
    for name, svg in files.items():
        (OUT / name).write_text(svg)
        print('ok', name)


if __name__ == '__main__':
    main()
