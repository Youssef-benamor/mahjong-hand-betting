# Mahjong Hand Betting - Loss Penalty Fix

## Steps:

1. [x] Update src/game/engine.js: Change loss delta to -1 (fixed) for each present dragon/wind type, regardless of count.
2. [x] Verify in browser dev tools: tileValues change by ±1 on win/loss when specials present. (Console log moved after update for accurate display)
3. [x] Test cases: hand with wind/dragon, only numbers, multiple same type. (Feedback confirmed ±1 changes, log fixed for post-update display)
4. [x] Mark complete and attempt_completion.

## Additional Feature Added:

5. [x] Display wind/dragon tileValues on TileCard (fixed lookup to tile.type).
