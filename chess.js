let possibleMoves = [];

// --- Chess piece SVGs (from files) ---
const PIECE_SVGS = {
  wK: `<?xml version="1.0" encoding="UTF-8" standalone="no"?>\n<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">\n<svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" width=\"64\" height=\"64\" viewBox=\"0 0 45 45\">\n\t<g fill=\"#FFF\" stroke=\"#000\" stroke-width=\"1.5\" stroke-linejoin=\"round\">\n\t\t<path fill=\"none\" stroke-linecap=\"round\" d=\"M 22.5,11.63 L 22.5,6 M 20,8 L 25,8\"/>\n\t\t<path d=\"M 22.5,25 C 22.5,25 27,17.5 25.5,14.5 C 25.5,14.5 24.5,12 22.5,12 C 20.5,12 19.5,14.5 19.5,14.5 C 18,17.5 22.5,25 22.5,25\"/>\n\t\t<path d=\"M 11.5,37 C 17,40.5 27,40.5 32.5,37 L 32.5,30 C 32.5,30 41.5,25.5 38.5,19.5 C 34.5,13 25,16 22.5,23.5 L 22.5,27 L 22.5,23.5 C 19,16 9.5,13 6.5,19.5 C 3.5,25.5 11.5,29.5 11.5,29.5 L 11.5,37\"/>\n\t</g>\n\t<g fill=\"none\" stroke=\"#000\" stroke-width=\"1.5\" stroke-linecap=\"round\">\n\t\t<path d=\"M 11.5,30 C 17,27 27,27 32.5,30\"/>\n\t\t<path d=\"M 11.5,33.5 C 17,30.5 27,30.5 32.5,33.5\"/>\n\t\t<path d=\"M 11.5,37 C 17,34 27,34 32.5,37\"/>\n\t</g>\n</svg>`,
  wQ: `<?xml version="1.0" encoding="UTF-8" standalone="no"?>\n<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">\n<svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" width=\"64\" height=\"64\" viewBox=\"0 0 45 45\">\n\t<g fill=\"#FFF\" stroke=\"#000\" stroke-width=\"1.5\" stroke-linejoin=\"round\">\n\t\t<path d=\"M 9,26 C 17.5,24.5 30,24.5 36,26 L 38.5,13.5 L 31,25 L 30.7,10.9 L 25.5,24.5 L 22.5,10 L 19.5,24.5 L 14.3,10.9 L 14,25 L 6.5,13.5 L 9,26 Z\"/>\n\t\t<circle cx=\"6\"    cy=\"12\" r=\"2\"/>\n\t\t<circle cx=\"14\"   cy=\"9\"  r=\"2\"/>\n\t\t<circle cx=\"22.5\" cy=\"8\"  r=\"2\"/>\n\t\t<circle cx=\"31\"   cy=\"9\"  r=\"2\"/>\n\t\t<circle cx=\"39\"   cy=\"12\" r=\"2\"/>\n\t\t<path d=\"M 9,26 C 9,28 10.5,28 11.5,30 C 12.5,31.5 12.5,31 12,33.5 C 10.5,34.5 10.5,36 10.5,36 C 9,37.5 11,38.5 11,38.5 C 17.5,39.5 27.5,39.5 34,38.5 C 34,38.5 36,37.5 34.5,36 C 34.5,36 34.5,34.5 33,33.5 C 32.5,31 32.5,31.5 33.5,30 C 34.5,28 36,28 36,26 C 27.5,24.5 17.5,24.5 9,26 Z\"/>\n\t</g>\n\t<g fill=\"none\" stroke=\"#000\" stroke-width=\"1.5\" stroke-linecap=\"round\">\n\t\t<path d=\"M 11.5,30 C 15,29 30,29 33.5,30\"/>\n\t\t<path d=\"M 12,33.5 C 18,32.5 27,32.5 33,33.5\"/>\n\t</g>\n</svg>`,
  wR: `<?xml version="1.0" encoding="UTF-8" standalone="no"?>\n<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">\n<svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" width=\"64\" height=\"64\" viewBox=\"0 0 45 45\">\n\t<g fill=\"#FFF\" stroke=\"#000\" stroke-width=\"1.5\" stroke-linejoin=\"round\">\n\t\t<path d=\"M 11,14 L 11,9 L 15,9 L 15,11 L 20,11 L 20,9 L 25,9 L 25,11 L 30,11 L 30,9 L 34,9 L 34,14 L 31,17 L 31,29.5 L 33,32 L 33,36 L 12,36 L 12,32 L 14,29.5 L 14,17 Z\"/>\n\t\t<path d=\"M 9,39 L 36,39 L 36,36 L 9,36 L 9,39 z\"/>\n\t</g>\n\t<g fill=\"none\" stroke=\"#000\" stroke-linecap=\"round\">\n\t\t<line stroke-width=\"1.2\" x1=\"11\" y1=\"14.0\" x2=\"34\" y2=\"14.0\"/>\n\t\t<line stroke-width=\"0.8\" x1=\"14\" y1=\"17.0\" x2=\"31\" y2=\"17.0\"/>\n\t\t<line stroke-width=\"0.8\" x1=\"14\" y1=\"29.5\" x2=\"31\" y2=\"29.5\"/>\n\t\t<line stroke-width=\"1.2\" x1=\"12\" y1=\"32.0\" x2=\"33\" y2=\"32.0\"/>\n\t</g>\n</svg>`,
  wB: `<?xml version="1.0" encoding="UTF-8" standalone="no"?>\n<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">\n<svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" width=\"64\" height=\"64\" viewBox=\"0 0 45 45\">\n\t<g fill=\"#FFF\" stroke=\"#000\" stroke-width=\"1.5\" stroke-linejoin=\"round\">\n\t\t<circle cx=\"22.5\" cy=\"8\" r=\"2.5\"/>\n\t\t<path d=\"M 15,32 C 17.5,34.5 27.5,34.5 30,32 C 30.5,30.5 30,30 30,30 C 30,27.5 27.5,26 27.5,26 C 33,24.5 33.5,14.5 22.5,10.5 C 11.5,14.5 12,24.5 17.5,26 C 17.5,26 15,27.5 15,30 C 15,30 14.5,30.5 15,32 Z\"/>\n\t\t<path d=\"M 9,36 C 12.39,35.03 19.11,36.43 22.5,34 C 25.89,36.43 32.61,35.03 36,36 C 36,36 37.65,36.54 39,38 C 38.32,38.97 37.35,38.99 36,38.5 C 32.61,37.53 25.89,38.96 22.5,37.5 C 19.11,38.96 12.39,37.53 9,38.5 C 7.646,38.99 6.677,38.97 6,38 C 7.354,36.06 9,36 9,36 Z\"/>\n\t</g>\n\t<g fill=\"none\" stroke=\"#000\" stroke-width=\"1.5\" stroke-linecap=\"round\">\n\t\t<path d=\"M 17.5,26 L 27.5,26\"/>\n\t\t<path d=\"M 15.0,30 L 30.0,30\"/>\n\t\t<path d=\"M 22.5,15 L 22.5,22 M 20,17.5 L 25,17.5\"/>\n\t</g>\n</svg>`,
  wN: `<?xml version="1.0" encoding="UTF-8" standalone="no"?>\n<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">\n<svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" width=\"64\" height=\"64\" viewBox=\"0 0 45 45\">\n\t<g fill=\"#FFF\" stroke=\"#000\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n\t\t<path d=\"M 22,10 C 32.5,11 38.5,18 38,39 L 15,39 C 15,30 25,32.5 23,18\"/>\n\t\t<path d=\"M 24,18 C 24.38,20.91 18.45,25.37 16,27 C 13,29 13.18,31.34 11,31 C 9.958,30.06 12.41,27.96 11,28 C 10,28 11.19,29.23 10,30 C 9,30 5.997,31 6,26 C 6,24 12,14 12,14 C 12,14 13.89,12.1 14,10.5 C 13.27,9.506 13.5,8.5 13.5,7.5 C 14.5,6.5 16.5,10 16.5,10 L 18.5,10 C 18.5,10 19.28,8.008 21,7 C 22,7 22,10 22,10\"/>\n\t</g>\n\t<g fill=\"#000\" stroke=\"#000\" stroke-width=\"1.5\" stroke-linejoin=\"round\">\n\t\t<path d=\"M 9.5,25.5 A 0.5,0.5,0 1,1 8.5,25.5 A 0.5,0.5,0 1,1 9.5,25.5 Z\"/>\n\t\t<path d=\"M 15.25,14.2 A 0.5,1.5,30 1,1 13.75,16.8 A 0.5,1.5,30 1,1 15.25,14.2 Z\"/>\n\t</g>\n</svg>`,
  wP: `<?xml version="1.0" encoding="UTF-8" standalone="no"?>\n<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">\n<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"64\" height=\"64\" viewBox=\"0 0 45 45\">\n\t<g fill=\"#FFF\" stroke=\"#000\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"miter\">\n\t\t<path d=\"M 22.5,9 C 20.29,9 18.5,10.79 18.5,13 C 18.5,13.89 18.79,14.71 19.28,15.38 C 17.33,16.5 16,18.59 16,21 C 16,23.03 16.94,24.84 18.41,26.03 C 15.41,27.09 11,31.58 11,39.5 L 34,39.5 C 34,31.58 29.59,27.09 26.59,26.03 C 28.06,24.84 29,23.03 29,21 C 29,18.59 27.67,16.5 25.72,15.38 C 26.21,14.71 26.5,13.89 26.5,13 C 26.5,10.79 24.71,9 22.5,9 Z\"/>\n\t</g>\n</svg>`,
  bK: `<?xml version="1.0" encoding="UTF-8" standalone="no"?>\n<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">\n<svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" width=\"64\" height=\"64\" viewBox=\"0 0 45 45\">\n\t<g fill=\"#000\" stroke=\"#000\" stroke-width=\"1.5\" stroke-linejoin=\"round\">\n\t\t<path fill=\"none\" stroke-linecap=\"round\" d=\"M 22.5,11.63 L 22.5,6 M 20,8 L 25,8\"/>\n\t\t<path d=\"M 22.5,25 C 22.5,25 27,17.5 25.5,14.5 C 25.5,14.5 24.5,12 22.5,12 C 20.5,12 19.5,14.5 19.5,14.5 C 18,17.5 22.5,25 22.5,25\"/>\n\t\t<path d=\"M 11.5,37 C 17,40.5 27,40.5 32.5,37 L 32.5,30 C 32.5,30 41.5,25.5 38.5,19.5 C 34.5,13 25,16 22.5,23.5 L 22.5,27 L 22.5,23.5 C 19,16 9.5,13 6.5,19.5 C 3.5,25.5 11.5,29.5 11.5,29.5 L 11.5,37\"/>\n\t</g>\n\t<g fill=\"none\" stroke=\"#FFF\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n\t\t<path stroke-linecap=\"square\" d=\"M 22.5,20 C 22.5,20 25.75,17 24.5,14.5 C 24.5,14.5 24,13 22.5,13 C 21,13 20.5,14.5 20.5,14.5 C 19.25,17 22.5,20 22.5,20\"/>\n\t\t<path d=\"M 32,29.5 C 32,29.5 40.5,25.5 38.03,19.85 C 34.15,14 25,18 22.5,24.5 L 22.51,26.6 L 22.5,24.5 C 20,18 9.906,14 6.997,19.85 C 4.5,25.5 11.85,28.85 11.85,28.85\"/>\n\t\t<path d=\"M 11.5,30 C 17,27 27,27 32.5,30\"/>\n\t\t<path d=\"M 11.5,33.5 C 17,30.5 27,30.5 32.5,33.5\"/>\n\t\t<path d=\"M 11.5,37 C 17,34 27,34 32.5,37\"/>\n\t</g>\n</svg>`,
  bQ: `<?xml version="1.0" encoding="UTF-8" standalone="no"?>\n<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">\n<svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" width=\"64\" height=\"64\" viewBox=\"0 0 45 45\">\n\t<g fill=\"#000\" stroke=\"#000\" stroke-width=\"1.5\" stroke-linejoin=\"round\">\n\t\t<path d=\"M 9,26 C 17.5,24.5 30,24.5 36,26 L 38.5,13.5 L 31,25 L 30.7,10.9 L 25.5,24.5 L 22.5,10 L 19.5,24.5 L 14.3,10.9 L 14,25 L 6.5,13.5 L 9,26 Z\"/>\n\t\t<circle cx=\"6\"    cy=\"12\" r=\"2\"/>\n\t\t<circle cx=\"14\"   cy=\"9\"  r=\"2\"/>\n\t\t<circle cx=\"22.5\" cy=\"8\"  r=\"2\"/>\n\t\t<circle cx=\"31\"   cy=\"9\"  r=\"2\"/>\n\t\t<circle cx=\"39\"   cy=\"12\" r=\"2\"/>\n\t\t<path d=\"M 9,26 C 9,28 10.5,28 11.5,30 C 12.5,31.5 12.5,31 12,33.5 C 10.5,34.5 10.5,36 10.5,36 C 9,37.5 11,38.5 11,38.5 C 17.5,39.5 27.5,39.5 34,38.5 C 34,38.5 36,37.5 34.5,36 C 34.5,36 34.5,34.5 33,33.5 C 32.5,31 32.5,31.5 33.5,30 C 34.5,28 36,28 36,26 C 27.5,24.5 17.5,24.5 9,26 Z\"/>\n\t</g>\n\t<g fill=\"none\" stroke=\"#FFF\" stroke-width=\"1.5\" stroke-linecap=\"round\">\n\t\t<path d=\"M 9,26 C 17.5,24.5 30,24.5 36,26\"/>\n\t\t<path d=\"M 11.5,30 C 15,29 30,29 33.5,30\"/>\n\t\t<path d=\"M 12,33.5 C 18,32.5 27,32.5 33,33.5\"/>\n\t</g>\n</svg>`,
  bR: `<?xml version="1.0" encoding="UTF-8" standalone="no"?>\n<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">\n<svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" width=\"64\" height=\"64\" viewBox=\"0 0 45 45\">\n\t<g fill=\"#000\" stroke=\"#000\" stroke-width=\"1.5\" stroke-linejoin=\"round\">\n\t\t<path d=\"M 11,14 L 11,9 L 15,9 L 15,11 L 20,11 L 20,9 L 25,9 L 25,11 L 30,11 L 30,9 L 34,9 L 34,14 L 31,17 L 31,29.5 L 33,32 L 33,36 L 12,36 L 12,32 L 14,29.5 L 14,17 Z\"/>\n\t\t<path d=\"M 9,39 L 36,39 L 36,36 L 9,36 L 9,39 z\"/>\n\t</g>\n\t<g fill=\"none\" stroke=\"#FFF\" stroke-linecap=\"round\">\n\t\t<line stroke-width=\"1.2\" x1=\"11\" y1=\"14.0\" x2=\"34\" y2=\"14.0\"/>\n\t\t<line stroke-width=\"0.8\" x1=\"14\" y1=\"17.0\" x2=\"31\" y2=\"17.0\"/>\n\t\t<line stroke-width=\"0.8\" x1=\"14\" y1=\"29.5\" x2=\"31\" y2=\"29.5\"/>\n\t\t<line stroke-width=\"1.2\" x1=\"12\" y1=\"32.0\" x2=\"33\" y2=\"32.0\"/>\n\t\t<line stroke-width=\"1.2\" x1=\"12\" y1=\"35.5\" x2=\"33\" y2=\"35.5\"/>\n\t</g>\n</svg>`,
  bB: `<?xml version="1.0" encoding="UTF-8" standalone="no"?>\n<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">\n<svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" width=\"64\" height=\"64\" viewBox=\"0 0 45 45\">\n\t<g fill=\"#000\" stroke=\"#000\" stroke-width=\"1.5\" stroke-linejoin=\"round\">\n\t\t<circle cx=\"22.5\" cy=\"8\" r=\"2.5\"/>\n\t\t<path d=\"M 15,32 C 17.5,34.5 27.5,34.5 30,32 C 30.5,30.5 30,30 30,30 C 30,27.5 27.5,26 27.5,26 C 33,24.5 33.5,14.5 22.5,10.5 C 11.5,14.5 12,24.5 17.5,26 C 17.5,26 15,27.5 15,30 C 15,30 14.5,30.5 15,32 Z\"/>\n\t\t<path d=\"M 9,36 C 12.39,35.03 19.11,36.43 22.5,34 C 25.89,36.43 32.61,35.03 36,36 C 36,36 37.65,36.54 39,38 C 38.32,38.97 37.35,38.99 36,38.5 C 32.61,37.53 25.89,38.96 22.5,37.5 C 19.11,38.96 12.39,37.53 9,38.5 C 7.646,38.99 6.677,38.97 6,38 C 7.354,36.06 9,36 9,36 Z\"/>\n\t</g>\n\t<g fill=\"none\" stroke=\"#FFF\" stroke-width=\"1.5\" stroke-linecap=\"round\">\n\t\t<path d=\"M 17.5,26 L 27.5,26\"/>\n\t\t<path d=\"M 15.0,30 L 30.0,30\"/>\n\t\t<path d=\"M 22.5,15 L 22.5,22 M 20,17.5 L 25,17.5\"/>\n\t</g>\n</svg>`,
  bN: `<?xml version="1.0" encoding="UTF-8" standalone="no"?>\n<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">\n<svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" width=\"64\" height=\"64\" viewBox=\"0 0 45 45\">\n\t<g fill=\"#000\" stroke=\"#000\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n\t\t<path d=\"M 22,10 C 32.5,11 38.5,18 38,39 L 15,39 C 15,30 25,32.5 23,18\"/>\n\t\t<path d=\"M 24,18 C 24.38,20.91 18.45,25.37 16,27 C 13,29 13.18,31.34 11,31 C 9.958,30.06 12.41,27.96 11,28 C 10,28 11.19,29.23 10,30 C 9,30 5.997,31 6,26 C 6,24 12,14 12,14 C 12,14 13.89,12.1 14,10.5 C 13.27,9.506 13.5,8.5 13.5,7.5 C 14.5,6.5 16.5,10 16.5,10 L 18.5,10 C 18.5,10 19.28,8.008 21,7 C 22,7 22,10 22,10\"/>\n\t</g>\n\t<g fill=\"#FFF\" stroke=\"#FFF\" stroke-width=\"1.5\" stroke-linejoin=\"round\">\n\t\t<path stroke=\"none\" d=\"M 24.55,10.4 L 24.1,11.85 L 24.6,12 C 27.75,13 30.25,14.49 32.5,18.75 C 34.75,23.01 35.75,29.06 35.25,39 L 35.2,39.5 L 37.45,39.5 L 37.5,39 C 38,28.94 36.62,22.15 34.25,17.66 C 31.88,13.17 28.46,11.02 25.06,10.5 L 24.55,10.4 Z\"/>\n\t\t<path d=\"M 9.5,25.5 A 0.5,0.5,0 1,1 8.5,25.5 A 0.5,0.5,0 1,1 9.5,25.5 Z\"/>\n\t\t<path d=\"M 15.25,14.2 A 0.5,1.5,30 1,1 13.75,16.8 A 0.5,1.5,30 1,1 15.25,14.2 Z\"/>\n\t</g>\n</svg>`,
  bP: `<?xml version="1.0" encoding="UTF-8" standalone="no"?>\n<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">\n<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"64\" height=\"64\" viewBox=\"0 0 45 45\">\n\t<g fill=\"#000\" stroke=\"#000\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"miter\">\n\t\t<path d=\"M 22.5,9 C 20.29,9 18.5,10.79 18.5,13 C 18.5,13.89 18.79,14.71 19.28,15.38 C 17.33,16.5 16,18.59 16,21 C 16,23.03 16.94,24.84 18.41,26.03 C 15.41,27.09 11,31.58 11,39.5 L 34,39.5 C 34,31.58 29.59,27.09 26.59,26.03 C 28.06,24.84 29,23.03 29,21 C 29,18.59 27.67,16.5 25.72,15.38 C 26.21,14.71 26.5,13.89 26.5,13 C 26.5,10.79 24.71,9 22.5,9 Z\"/>\n\t</g>\n</svg>`
};

// --- Initial board state ---
const INITIAL_BOARD = [
  ["bR", "bN", "bB", "bQ", "bK", "bB", "bN", "bR"],
  ["bP", "bP", "bP", "bP", "bP", "bP", "bP", "bP"],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  ["wP", "wP", "wP", "wP", "wP", "wP", "wP", "wP"],
  ["wR", "wN", "wB", "wQ", "wK", "wB", "wN", "wR"],
];

let board = JSON.parse(JSON.stringify(INITIAL_BOARD));
let selected = null;
let turn = "w"; // 'w' for white, 'b' for black
window.turn = turn;
window.selected = selected;
window.possibleMoves = possibleMoves;
window.onSquareClick = onSquareClick;
window.getLegalMoves = getLegalMoves;

// Track castling rights
let castlingRights = {
  wK: true, // white king can castle
  wR0: true, // white rook queenside
  wR7: true, // white rook kingside
  bK: true, // black king can castle
  bR0: true, // black rook queenside
  bR7: true  // black rook kingside
};

let enPassantTarget = null;

let gameOver = false;

let promotionPending = null; // {row, col, color}
let promotionCallback = null;

function showPromotionUI(color, callback) {
  // Remove any existing UI
  let old = document.getElementById('promotion-ui');
  if (old) old.remove();
  // Create UI
  const container = document.createElement('div');
  container.id = 'promotion-ui';
  container.style.display = 'flex';
  container.style.justifyContent = 'center';
  container.style.gap = '16px';
  container.style.margin = '16px 0';
  container.style.position = 'relative';
  container.style.zIndex = '10';
  // Piece order: Q, R, B, N
  const pieces = ['Q','R','B','N'];
  pieces.forEach(type => {
    const btn = document.createElement('button');
    btn.innerHTML = PIECE_SVGS[color+type];
    btn.style.background = 'none';
    btn.style.border = '2px solid #b58863';
    btn.style.borderRadius = '8px';
    btn.style.padding = '4px';
    btn.style.cursor = 'pointer';
    btn.addEventListener('click', () => {
      callback(type);
      container.remove();
    });
    container.appendChild(btn);
  });
  // Insert above board
  const boardContainer = document.getElementById('chessboard-container');
  boardContainer.parentNode.insertBefore(container, boardContainer);
}

function isCastlingMove(piece, from, to) {
  if (piece[1] !== 'K') return false;
  if (piece[0] === 'w' && from.row === 7 && from.col === 4) {
    if (to.row === 7 && to.col === 6) return 'wkingside';
    if (to.row === 7 && to.col === 2) return 'wqueenside';
  }
  if (piece[0] === 'b' && from.row === 0 && from.col === 4) {
    if (to.row === 0 && to.col === 6) return 'bkingside';
    if (to.row === 0 && to.col === 2) return 'bqueenside';
  }
  return false;
}

function canCastle(color, side) {
  if (color === 'w') {
    if (side === 'kingside') {
      return castlingRights.wK && castlingRights.wR7 &&
        !board[7][5] && !board[7][6];
    } else {
      return castlingRights.wK && castlingRights.wR0 &&
        !board[7][1] && !board[7][2] && !board[7][3];
    }
  } else {
    if (side === 'kingside') {
      return castlingRights.bK && castlingRights.bR7 &&
        !board[0][5] && !board[0][6];
    } else {
      return castlingRights.bK && castlingRights.bR0 &&
        !board[0][1] && !board[0][2] && !board[0][3];
    }
  }
}

function getPossibleMoves(row, col) {
  const piece = board[row][col];
  if (!piece) return [];
  const color = piece[0];
  const type = piece[1];
  let moves = [];

  // Helper to check if a square is empty or occupied by opponent
  function canMove(r, c) {
    return r >= 0 && r < 8 && c >= 0 && c < 8 && !board[r][c];
  }
  function canCapture(r, c) {
    return r >= 0 && r < 8 && c >= 0 && c < 8 && board[r][c] && board[r][c][0] !== color;
  }

  if (type === 'P') {
    // Pawn
    const dir = color === 'w' ? -1 : 1;
    // Move forward
    if (canMove(row + dir, col)) moves.push({row: row + dir, col});
    // First move double
    if ((color === 'w' && row === 6) || (color === 'b' && row === 1)) {
      if (canMove(row + dir, col) && canMove(row + 2 * dir, col)) moves.push({row: row + 2 * dir, col, double: true});
    }
    // Captures
    if (canCapture(row + dir, col - 1)) moves.push({row: row + dir, col: col - 1, capture: true});
    if (canCapture(row + dir, col + 1)) moves.push({row: row + dir, col: col + 1, capture: true});
    // En passant
    if (enPassantTarget) {
      if (row === (color === 'w' ? 3 : 4)) {
        if (enPassantTarget.row === row + dir && enPassantTarget.col === col - 1) {
          moves.push({row: row + dir, col: col - 1, enPassant: true});
        }
        if (enPassantTarget.row === row + dir && enPassantTarget.col === col + 1) {
          moves.push({row: row + dir, col: col + 1, enPassant: true});
        }
      }
    }
  } else if (type === 'R') {
    // Rook
    for (let d = 1; row + d < 8; d++) {
      if (canMove(row + d, col)) moves.push({row: row + d, col});
      else { if (canCapture(row + d, col)) moves.push({row: row + d, col, capture: true}); break; }
    }
    for (let d = 1; row - d >= 0; d++) {
      if (canMove(row - d, col)) moves.push({row: row - d, col});
      else { if (canCapture(row - d, col)) moves.push({row: row - d, col, capture: true}); break; }
    }
    for (let d = 1; col + d < 8; d++) {
      if (canMove(row, col + d)) moves.push({row, col: col + d});
      else { if (canCapture(row, col + d)) moves.push({row, col: col + d, capture: true}); break; }
    }
    for (let d = 1; col - d >= 0; d++) {
      if (canMove(row, col - d)) moves.push({row, col: col - d});
      else { if (canCapture(row, col - d)) moves.push({row, col: col - d, capture: true}); break; }
    }
  } else if (type === 'N') {
    // Knight
    const jumps = [
      [2, 1], [1, 2], [-1, 2], [-2, 1],
      [-2, -1], [-1, -2], [1, -2], [2, -1]
    ];
    for (const [dr, dc] of jumps) {
      const r = row + dr, c = col + dc;
      if (canMove(r, c)) moves.push({row: r, col: c});
      else if (canCapture(r, c)) moves.push({row: r, col: c, capture: true});
    }
  } else if (type === 'B') {
    // Bishop
    for (let d = 1; row + d < 8 && col + d < 8; d++) {
      if (canMove(row + d, col + d)) moves.push({row: row + d, col: col + d});
      else { if (canCapture(row + d, col + d)) moves.push({row: row + d, col: col + d, capture: true}); break; }
    }
    for (let d = 1; row + d < 8 && col - d >= 0; d++) {
      if (canMove(row + d, col - d)) moves.push({row: row + d, col: col - d});
      else { if (canCapture(row + d, col - d)) moves.push({row: row + d, col: col - d, capture: true}); break; }
    }
    for (let d = 1; row - d >= 0 && col + d < 8; d++) {
      if (canMove(row - d, col + d)) moves.push({row: row - d, col: col + d});
      else { if (canCapture(row - d, col + d)) moves.push({row: row - d, col: col + d, capture: true}); break; }
    }
    for (let d = 1; row - d >= 0 && col - d >= 0; d++) {
      if (canMove(row - d, col - d)) moves.push({row: row - d, col: col - d});
      else { if (canCapture(row - d, col - d)) moves.push({row: row - d, col: col - d, capture: true}); break; }
    }
  } else if (type === 'Q') {
    // Queen = Rook + Bishop
    moves = moves.concat(getPossibleMovesRook(row, col, color));
    moves = moves.concat(getPossibleMovesBishop(row, col, color));
  } else if (type === 'K') {
    // King
    for (let dr = -1; dr <= 1; dr++) {
      for (let dc = -1; dc <= 1; dc++) {
        if (dr === 0 && dc === 0) continue;
        const r = row + dr, c = col + dc;
        if (canMove(r, c)) moves.push({row: r, col: c});
        else if (canCapture(r, c)) moves.push({row: r, col: c, capture: true});
      }
    }
    // Castling (with check on the way)
    if (color === 'w' && row === 7 && col === 4) {
      // Kingside
      if (canCastle('w', 'kingside')) {
        // Check squares: e1 (7,4), f1 (7,5), g1 (7,6)
        if (!isSquareAttacked(board, 7, 4, 'b') &&
            !isSquareAttacked(board, 7, 5, 'b') &&
            !isSquareAttacked(board, 7, 6, 'b')) {
          moves.push({row: 7, col: 6, castling: true});
        }
      }
      // Queenside
      if (canCastle('w', 'queenside')) {
        // Check squares: e1 (7,4), d1 (7,3), c1 (7,2)
        if (!isSquareAttacked(board, 7, 4, 'b') &&
            !isSquareAttacked(board, 7, 3, 'b') &&
            !isSquareAttacked(board, 7, 2, 'b')) {
          moves.push({row: 7, col: 2, castling: true});
        }
      }
    }
    if (color === 'b' && row === 0 && col === 4) {
      // Kingside
      if (canCastle('b', 'kingside')) {
        // Check squares: e8 (0,4), f8 (0,5), g8 (0,6)
        if (!isSquareAttacked(board, 0, 4, 'w') &&
            !isSquareAttacked(board, 0, 5, 'w') &&
            !isSquareAttacked(board, 0, 6, 'w')) {
          moves.push({row: 0, col: 6, castling: true});
        }
      }
      // Queenside
      if (canCastle('b', 'queenside')) {
        // Check squares: e8 (0,4), d8 (0,3), c8 (0,2)
        if (!isSquareAttacked(board, 0, 4, 'w') &&
            !isSquareAttacked(board, 0, 3, 'w') &&
            !isSquareAttacked(board, 0, 2, 'w')) {
          moves.push({row: 0, col: 2, castling: true});
        }
      }
    }
  }
  return moves;
}

// Helper for Queen
function getPossibleMovesRook(row, col, color) {
  let moves = [];
  function canMove(r, c) { return r >= 0 && r < 8 && c >= 0 && c < 8 && !board[r][c]; }
  function canCapture(r, c) { return r >= 0 && r < 8 && c >= 0 && c < 8 && board[r][c] && board[r][c][0] !== color; }
  for (let d = 1; row + d < 8; d++) { if (canMove(row + d, col)) moves.push({row: row + d, col}); else { if (canCapture(row + d, col)) moves.push({row: row + d, col, capture: true}); break; } }
  for (let d = 1; row - d >= 0; d++) { if (canMove(row - d, col)) moves.push({row: row - d, col}); else { if (canCapture(row - d, col)) moves.push({row: row - d, col, capture: true}); break; } }
  for (let d = 1; col + d < 8; d++) { if (canMove(row, col + d)) moves.push({row, col: col + d}); else { if (canCapture(row, col + d)) moves.push({row, col: col + d, capture: true}); break; } }
  for (let d = 1; col - d >= 0; d++) { if (canMove(row, col - d)) moves.push({row, col: col - d}); else { if (canCapture(row, col - d)) moves.push({row, col: col - d, capture: true}); break; } }
  return moves;
}
function getPossibleMovesBishop(row, col, color) {
  let moves = [];
  function canMove(r, c) { return r >= 0 && r < 8 && c >= 0 && c < 8 && !board[r][c]; }
  function canCapture(r, c) { return r >= 0 && r < 8 && c >= 0 && c < 8 && board[r][c] && board[r][c][0] !== color; }
  for (let d = 1; row + d < 8 && col + d < 8; d++) { if (canMove(row + d, col + d)) moves.push({row: row + d, col: col + d}); else { if (canCapture(row + d, col + d)) moves.push({row: row + d, col: col + d, capture: true}); break; } }
  for (let d = 1; row + d < 8 && col - d >= 0; d++) { if (canMove(row + d, col - d)) moves.push({row: row + d, col: col - d}); else { if (canCapture(row + d, col - d)) moves.push({row: row + d, col: col - d, capture: true}); break; } }
  for (let d = 1; row - d >= 0 && col + d < 8; d++) { if (canMove(row - d, col + d)) moves.push({row: row - d, col: col + d}); else { if (canCapture(row - d, col + d)) moves.push({row: row - d, col: col + d, capture: true}); break; } }
  for (let d = 1; row - d >= 0 && col - d >= 0; d++) { if (canMove(row - d, col - d)) moves.push({row: row - d, col: col - d}); else { if (canCapture(row - d, col - d)) moves.push({row: row - d, col: col - d, capture: true}); break; } }
  return moves;
}


let gameMessage = '';

function isKingInCheck(boardState, color) {
  // Find king position
  let kingPos = null;
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      if (boardState[r][c] === color + 'K') {
        kingPos = { row: r, col: c };
        break;
      }
    }
  }
  if (!kingPos) return false;
  // Check if any enemy piece attacks king
  const enemy = color === 'w' ? 'b' : 'w';
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      if (boardState[r][c] && boardState[r][c][0] === enemy) {
        const moves = getPossibleMovesForCheck(boardState, r, c);
        if (moves.some(m => m.row === kingPos.row && m.col === kingPos.col)) {
          return true;
        }
      }
    }
  }
  return false;
}

function getPossibleMovesForCheck(boardState, row, col) {
  // Like getPossibleMoves, but for check detection (ignores turn, castling, en passant, etc.)
  const piece = boardState[row][col];
  if (!piece) return [];
  const color = piece[0];
  const type = piece[1];
  let moves = [];
  function canMove(r, c) { return r >= 0 && r < 8 && c >= 0 && c < 8 && !boardState[r][c]; }
  function canCapture(r, c) { return r >= 0 && r < 8 && c >= 0 && c < 8 && boardState[r][c] && boardState[r][c][0] !== color; }
  if (type === 'P') {
    const dir = color === 'w' ? -1 : 1;
    if (canCapture(row + dir, col - 1)) moves.push({row: row + dir, col: col - 1});
    if (canCapture(row + dir, col + 1)) moves.push({row: row + dir, col: col + 1});
  } else if (type === 'R') {
    for (let d = 1; row + d < 8; d++) { if (canMove(row + d, col)) moves.push({row: row + d, col}); else { if (canCapture(row + d, col)) moves.push({row: row + d, col}); break; } }
    for (let d = 1; row - d >= 0; d++) { if (canMove(row - d, col)) moves.push({row: row - d, col}); else { if (canCapture(row - d, col)) moves.push({row: row - d, col}); break; } }
    for (let d = 1; col + d < 8; d++) { if (canMove(row, col + d)) moves.push({row, col: col + d}); else { if (canCapture(row, col + d)) moves.push({row, col: col + d}); break; } }
    for (let d = 1; col - d >= 0; d++) { if (canMove(row, col - d)) moves.push({row, col: col - d}); else { if (canCapture(row, col - d)) moves.push({row, col: col - d}); break; } }
  } else if (type === 'N') {
    const jumps = [ [2, 1], [1, 2], [-1, 2], [-2, 1], [-2, -1], [-1, -2], [1, -2], [2, -1] ];
    for (const [dr, dc] of jumps) {
      const r = row + dr, c = col + dc;
      if (canMove(r, c) || canCapture(r, c)) moves.push({row: r, col: c});
    }
  } else if (type === 'B') {
    for (let d = 1; row + d < 8 && col + d < 8; d++) { if (canMove(row + d, col + d)) moves.push({row: row + d, col: col + d}); else { if (canCapture(row + d, col + d)) moves.push({row: row + d, col: col + d}); break; } }
    for (let d = 1; row + d < 8 && col - d >= 0; d++) { if (canMove(row + d, col - d)) moves.push({row: row + d, col: col - d}); else { if (canCapture(row + d, col - d)) moves.push({row: row + d, col: col - d}); break; } }
    for (let d = 1; row - d >= 0 && col + d < 8; d++) { if (canMove(row - d, col + d)) moves.push({row: row - d, col: col + d}); else { if (canCapture(row - d, col + d)) moves.push({row: row - d, col: col + d}); break; } }
    for (let d = 1; row - d >= 0 && col - d >= 0; d++) { if (canMove(row - d, col - d)) moves.push({row: row - d, col: col - d}); else { if (canCapture(row - d, col - d)) moves.push({row: row - d, col: col - d}); break; } }
  } else if (type === 'Q') {
    // Queen = Rook + Bishop (copy logic, do not recurse)
    // Rook moves
    for (let d = 1; row + d < 8; d++) { if (canMove(row + d, col)) moves.push({row: row + d, col}); else { if (canCapture(row + d, col)) moves.push({row: row + d, col}); break; } }
    for (let d = 1; row - d >= 0; d++) { if (canMove(row - d, col)) moves.push({row: row - d, col}); else { if (canCapture(row - d, col)) moves.push({row: row - d, col}); break; } }
    for (let d = 1; col + d < 8; d++) { if (canMove(row, col + d)) moves.push({row, col: col + d}); else { if (canCapture(row, col + d)) moves.push({row, col: col + d}); break; } }
    for (let d = 1; col - d >= 0; d++) { if (canMove(row, col - d)) moves.push({row, col: col - d}); else { if (canCapture(row, col - d)) moves.push({row, col: col - d}); break; } }
    // Bishop moves
    for (let d = 1; row + d < 8 && col + d < 8; d++) { if (canMove(row + d, col + d)) moves.push({row: row + d, col: col + d}); else { if (canCapture(row + d, col + d)) moves.push({row: row + d, col: col + d}); break; } }
    for (let d = 1; row + d < 8 && col - d >= 0; d++) { if (canMove(row + d, col - d)) moves.push({row: row + d, col: col - d}); else { if (canCapture(row + d, col - d)) moves.push({row: row + d, col: col - d}); break; } }
    for (let d = 1; row - d >= 0 && col + d < 8; d++) { if (canMove(row - d, col + d)) moves.push({row: row - d, col: col + d}); else { if (canCapture(row - d, col + d)) moves.push({row: row - d, col: col + d}); break; } }
    for (let d = 1; row - d >= 0 && col - d >= 0; d++) { if (canMove(row - d, col - d)) moves.push({row: row - d, col: col - d}); else { if (canCapture(row - d, col - d)) moves.push({row: row - d, col: col - d}); break; } }
  } else if (type === 'K') {
    for (let dr = -1; dr <= 1; dr++) {
      for (let dc = -1; dc <= 1; dc++) {
        if (dr === 0 && dc === 0) continue;
        const r = row + dr, c = col + dc;
        if (canMove(r, c) || canCapture(r, c)) moves.push({row: r, col: c});
      }
    }
  }
  return moves;
}

function getLegalMoves(row, col) {
  // Filter out moves that leave own king in check
  const piece = board[row][col];
  if (!piece) return [];
  const moves = getPossibleMoves(row, col);
  const color = piece[0];
  let legal = [];
  for (const move of moves) {
    // Simulate move
    const newBoard = JSON.parse(JSON.stringify(board));
    newBoard[move.row][move.col] = newBoard[row][col];
    newBoard[row][col] = null;
    // Pawn promotion
    if (piece[1] === 'P' && (move.row === 0 || move.row === 7)) {
      newBoard[move.row][move.col] = piece[0] + 'Q';
    }
    if (!isKingInCheck(newBoard, color)) {
      legal.push(move);
    }
  }
  return legal;
}

function hasAnyLegalMove(color) {
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      if (board[r][c] && board[r][c][0] === color) {
        if (getLegalMoves(r, c).length > 0) return true;
      }
    }
  }
  return false;
}

function checkGameEnd() {
  // Check for checkmate/stalemate for the player whose turn it is now
  const color = turn;
  if (isKingInCheck(board, color)) {
    if (!hasAnyLegalMove(color)) {
      gameMessage = (color === 'w' ? 'Black' : 'White') + ' wins by checkmate!';
      gameOver = true;
      return;
    } else {
      gameMessage = 'Check!';
    }
  } else {
    if (!hasAnyLegalMove(color)) {
      gameMessage = 'Stalemate! Draw.';
      gameOver = true;
      return;
    } else {
      gameMessage = '';
    }
  }
}

function renderBoard() {
  const container = document.getElementById("chessboard-container");
  container.innerHTML = "";
  // Dodaj litery tylko pod planszą
  const files = ['a','b','c','d','e','f','g','h'];

  let kingInCheck = null;
  if (isKingInCheck(board, turn)) {
    // Find king position
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        if (board[r][c] === turn + 'K') {
          kingInCheck = { row: r, col: c };
        }
      }
    }
  }
  for (let row = 0; row < 8; row++) {
    const rowDiv = document.createElement('div');
    rowDiv.className = 'board-row';
    // Cyfra po lewej
    const leftLabel = document.createElement('div');
    leftLabel.className = 'board-label board-label-left';
    leftLabel.textContent = 8 - row;
    rowDiv.appendChild(leftLabel);
    for (let col = 0; col < 8; col++) {
      const square = document.createElement("div");
      square.className =
        "square " + ((row + col) % 2 === 0 ? "light" : "dark");
      square.dataset.row = row;
      square.dataset.col = col;
      if (selected && selected.row === row && selected.col === col) {
        square.classList.add("selected");
      }
      // Highlight possible moves
      const move = possibleMoves.find(m => m.row === row && m.col === col);
      if (move) {
        if (move.capture) {
          square.classList.add("capture");
        } else {
          square.classList.add("move-dot");
        }
      }
      // Podświetlenie króla w szachu
      if (kingInCheck && kingInCheck.row === row && kingInCheck.col === col) {
        square.classList.add("in-check");
      }
      const piece = board[row][col];
      if (piece) {
        square.innerHTML = PIECE_SVGS[piece];
      }
      square.addEventListener("click", onSquareClick);
      rowDiv.appendChild(square);
    }
    container.appendChild(rowDiv);
  }
  // Dodaj litery pod planszą
  const bottomLabels = document.createElement('div');
  bottomLabels.className = 'board-labels board-labels-bottom';
  for (let i = 0; i < 8; i++) {
    const label = document.createElement('div');
    label.className = 'board-label';
    label.textContent = files[i];
    bottomLabels.appendChild(label);
  }
  container.appendChild(bottomLabels);
  // Show game message
  document.getElementById("game-message").textContent = gameMessage;
  // Hide turn indicator if game over
  const turnIndicator = document.getElementById("turn-indicator");
  if (gameOver) {
    turnIndicator.classList.add("hidden");
  } else {
    turnIndicator.classList.remove("hidden");
  }
}

function onSquareClick(e) {
  if (window.selected) selected = window.selected;
  if (window.possibleMoves) possibleMoves = window.possibleMoves;
  if (gameOver) return;
  const row = parseInt(e.currentTarget.dataset.row);
  const col = parseInt(e.currentTarget.dataset.col);
  const piece = board[row][col];

  if (!selected) {
    if (piece && piece[0] === turn) {
      selected = { row, col };
      possibleMoves = getLegalMoves(row, col);
    } else {
      selected = null;
      possibleMoves = [];
    }
    window.selected = selected;
    window.possibleMoves = possibleMoves;
    renderBoard();
    return;
  }

  if (piece && piece[0] === turn) {
    selected = { row, col };
    possibleMoves = getLegalMoves(row, col);
    window.selected = selected;
    window.possibleMoves = possibleMoves;
    renderBoard();
    return;
  }

  const move = possibleMoves.find(m => m.row === row && m.col === col);
  if (!move) {
    selected = null;
    possibleMoves = [];
    window.selected = selected;
    window.possibleMoves = possibleMoves;
    renderBoard();
    return;
  }

  const from = { row: selected.row, col: selected.col };
  const to = { row, col };
  const movingPiece = board[from.row][from.col];
  const castling = isCastlingMove(movingPiece, from, to);
  if (castling) {
    if (castling === 'wkingside') {
      board[7][4] = null; board[7][6] = 'wK'; board[7][7] = null; board[7][5] = 'wR';
    } else if (castling === 'wqueenside') {
      board[7][4] = null; board[7][2] = 'wK'; board[7][0] = null; board[7][3] = 'wR';
    } else if (castling === 'bkingside') {
      board[0][4] = null; board[0][6] = 'bK'; board[0][7] = null; board[0][5] = 'bR';
    } else if (castling === 'bqueenside') {
      board[0][4] = null; board[0][2] = 'bK'; board[0][0] = null; board[0][3] = 'bR';
    }
    if (turn === 'w') { castlingRights.wK = false; castlingRights.wR0 = false; castlingRights.wR7 = false; }
    else { castlingRights.bK = false; castlingRights.bR0 = false; castlingRights.bR7 = false; }
  } else {
    if (move.enPassant) {
      board[to.row][to.col] = movingPiece;
      board[from.row][from.col] = null;
      board[from.row][to.col] = null;
    } else {
      board[to.row][to.col] = movingPiece;
      board[from.row][from.col] = null;
    }
    if (movingPiece === 'wK') castlingRights.wK = false;
    if (movingPiece === 'bK') castlingRights.bK = false;
    if (movingPiece === 'wR' && from.row === 7 && from.col === 0) castlingRights.wR0 = false;
    if (movingPiece === 'wR' && from.row === 7 && from.col === 7) castlingRights.wR7 = false;
    if (movingPiece === 'bR' && from.row === 0 && from.col === 0) castlingRights.bR0 = false;
    if (movingPiece === 'bR' && from.row === 0 && from.col === 7) castlingRights.bR7 = false;
  }
  if (movingPiece[1] === 'P' && Math.abs(to.row - from.row) === 2) {
    enPassantTarget = { row: (from.row + to.row) / 2, col: from.col };
  } else {
    enPassantTarget = null;
  }
  if (movingPiece[1] === 'P' && (to.row === 0 || to.row === 7)) {
    promotionPending = { row: to.row, col: to.col, color: movingPiece[0] };
    promotionCallback = function(type) {
      board[to.row][to.col] = movingPiece[0] + type;
      promotionPending = null;
      promotionCallback = null;
      selected = null;
      possibleMoves = [];
      window.selected = selected;
      window.possibleMoves = possibleMoves;
      turn = (turn === 'w' ? 'b' : 'w');
      window.turn = turn;
      checkGameEnd();
      renderBoard();
      if (typeof window.onTurnChange === 'function') window.onTurnChange(turn);
    };
    showPromotionUI(movingPiece[0], promotionCallback);
    return;
  }
  selected = null;
  possibleMoves = [];
  window.selected = selected;
  window.possibleMoves = possibleMoves;
  turn = (turn === 'w' ? 'b' : 'w');
  window.turn = turn;
  checkGameEnd();
  renderBoard();
  if (typeof window.onTurnChange === 'function') window.onTurnChange(turn);
}

function resetGame() {
  board = JSON.parse(JSON.stringify(INITIAL_BOARD));
  selected = null;
  possibleMoves = [];
  turn = "w";
  window.turn = turn;
  castlingRights = {
    wK: true,
    wR0: true,
    wR7: true,
    bK: true,
    bR0: true,
    bR7: true
  };
  enPassantTarget = null;
  gameOver = false;
  document.getElementById("turn-indicator").textContent = "White's turn";
  renderBoard();
}

document.getElementById("reset-btn").addEventListener("click", resetGame);

window.onload = () => {
  renderBoard();
};

// Add a game message element if not present
if (!document.getElementById('game-message')) {
  const msg = document.createElement('div');
  msg.id = 'game-message';
  msg.style.marginTop = '12px';
  msg.style.fontWeight = 'bold';
  msg.style.fontSize = '20px';
  document.getElementById('root').appendChild(msg);
} 

// Helper: is a square attacked by the given color?
function isSquareAttacked(boardState, row, col, byColor) {
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      if (boardState[r][c] && boardState[r][c][0] === byColor) {
        const moves = getPossibleMovesForCheck(boardState, r, c);
        if (moves.some(m => m.row === row && m.col === col)) {
          return true;
        }
      }
    }
  }
  return false;
} 