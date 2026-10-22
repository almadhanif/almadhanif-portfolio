# AL logo — usage guide

**Idea.** "AL" written in a single rounded stroke, taken from a finger-drawn "AL" on a misted car window. The orange
crossbar that runs past the A's left leg is the one ownable detail; keep it in every colour version.

## Files (`design/logo/kit/`)

| File | Use |
| --- | --- |
| `al-symbol.svg` | Main mark on light backgrounds (navy + orange) |
| `al-symbol-reversed.svg` | On navy or dark photos (white + orange) |
| `al-symbol-navy.svg`, `-black.svg`, `-white.svg` | One-colour: print, stamps, embroidery |
| `al-tile.svg` | Navy tile for favicon, navbar, avatar (heavier strokes, readable at 16 px) |
| `al-tile-orange.svg` | Alternate tile for special uses only |
| `al-lockup.svg` / `-reversed.svg` / `-black.svg` | Symbol + "Almadhani" wordmark (Plus Jakarta Sans ExtraBold, outlined) |
| `favicon.ico`, `icon-*.png`, `maskable-512.png`, `apple-touch-icon.png` | Web icons |

All SVGs are filled paths (strokes converted with picosvg) — no live text, no strokes, no rasters.

## Colour

| Name | HEX | RGB |
| --- | --- | --- |
| Navy | `#1E3A8A` | 30, 58, 138 |
| Orange | `#EE5533` | 238, 85, 51 |
| White | `#FFFFFF` | 255, 255, 255 |

Orange is only for the crossbar. Text in orange on white uses `#D94526` for contrast.

## Size & space

- Minimum: symbol 20 px tall on screen; below 24 px use `al-tile.svg`.
- Clear space: the height of the crossbar's stroke × 2 on every side.
- Lockup: do not change the gap or the size ratio between symbol and wordmark.

## Don't

- Recolour the strokes beyond the versions above, or swap navy and orange.
- Add shadows, outlines, gradients or effects.
- Straighten or "clean up" the hand-drawn curves.
- Put the colour symbol on mid-tone backgrounds; use the reversed or one-colour version.

## Rebuild

    pip install picosvg fonttools
    python design/logo/build_kit.py --font PlusJakartaSans[wght].ttf   # Google Fonts, OFL
    node design/logo/render-icons.cjs
