# Changelog

## 2026-03-01

### Changed
- Hero alignment rebuilt from restored baseline in [src/components/JHName.vue]:
  - Implemented deterministic width-locking so `h1` (name) and `h2` (title) share the same left and right X bounds.
  - Added responsive scaling with `scaleX(...)` from `transform-origin: left center` for both lines.
  - Added runtime recalculation on mount, next animation frame, font-ready event (`document.fonts.ready`), window resize, and element resize (`ResizeObserver`).
  - Kept desktop and mobile responsive typography using `clamp(...)` sizes while preserving exact edge alignment.

## 2026-02-28

### Added
- Home cinematic borders in [src/views/HomeView.vue]:
  - Added fixed black top and bottom bars.
  - Added entry animations:
    - Top border drops from above.
    - Bottom border rises from below.
  - Added a delay to both animations (`300ms`).

### Changed
- Home border sizing in [src/views/HomeView.vue]:
  - Replaced ratio-based sizing with a consistent cinematic letterbox height.
  - Current behavior uses `7.5vh` clamped between `44px` and `96px`, so borders remain visible on desktop and mobile.

- Hero typography in [src/components/JHName.vue]:
  - Reworked layout so name/title can align on the same horizontal span.
  - Added width-sync logic for desktop (`title` scales to match `name` width).
  - Switched hero font to `Space Grotesk` with fallbacks for a style closer to the Richard Mattka reference.
  - Added mobile-specific behavior so name/title use full available screen width.

- Global font availability in [src/assets/base.css]:
  - Added Google Fonts import for `Space Grotesk`.
