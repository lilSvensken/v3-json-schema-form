export function getStyleGrid(grid, windowSize) {
  if (grid) {
    let { column, row, media } = grid;

    if (media) {
      Object.entries(media).forEach(([mediaSize, val]) => {
        if (windowSize >= +mediaSize) {
          if (val.column) {
            column = val.column;
          }
          if (val.row) {
            row = val.row;
          }
        }
      });
    }

    return { gridColumn: column, gridRow: row };
  }
  return null;
}
