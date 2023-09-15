import { Chess } from "chess.js";

const cutStringToPenultimateSpace = (inputString) =>
  inputString.substring(
    0,
    inputString.lastIndexOf(" ", inputString.lastIndexOf(" ") - 1)
  );

class ChessProcessor {
  constructor() {
    this.currentFEN = "";
    this.fensObj = {};
    this.games = [];
  }

  async getTree(rows) {
    this.games = rows;
    const fensPromises = rows.map((row) => this.getFENs(row));

    const fensArray = await Promise.all(fensPromises);
    const fensObj = this.mergeFensArray(fensArray);
    this.fensObj = fensObj;
  }

  mergeFensArray(fensArray) {
    const fensObj = {};
    for (const fens of fensArray) {
      for (const fen in fens) {
        if (fen in fensObj) {
          fensObj[fen].indexes.push(...fens[fen].indexes);
          for (const move in fens[fen]) {
            if (move !== "indexes") {
              if (fensObj[fen][move]) {
                fensObj[fen][move].games += fens[fen][move].games;
                fensObj[fen][move].last = Math.max(
                  fensObj[fen][move].last,
                  fens[fen][move].last
                );
                fensObj[fen][move].points += fens[fen][move].points;
              } else {
                fensObj[fen][move] = { ...fens[fen][move] };
              }
            }
          }
        } else {
          fensObj[fen] = { ...fens[fen] };
        }
      }
    }

    return fensObj;
  }

  async getFENs(row) {
    const moves = row.moves.match(
      /\b(?:[NBRQK]?[a-h]?[1-8]?x?[a-h][1-8]|[NBRQK][a-h]?[1-8]?x?[a-h][1-8]|O-O-O|O-O|\+\+|#)\b/g
    );
    const points = row.Result === "1-0" ? 1 : row.Result === "0-1" ? 0 : 0.5;

    let chess = new Chess();
    const fens = {};

    for (const move of moves) {
      try {
        const result = this.processMove(chess, move, points, row.Year);
        if (result.fen) {
          const fen = result.fen;
          if (fen in fens) {
            if (fens[fen][move]) {
              fens[fen][move].games += 1;
              fens[fen][move].last = Math.max(
                fens[fen][move].last,
                result.data.last
              );
              fens[fen][move].points += result.data.points;
            } else {
              fens[fen][move] = result.data;
            }
          } else {
            fens[fen] = { [move]: result.data, indexes: [row.id] };
          }
        }
      } catch (error) {
        break;
      }
    }

    return fens;
  }

  processMove(chess, move, points, year) {
    const raw_fen = chess.fen();
    const fen = cutStringToPenultimateSpace(raw_fen);

    chess.move(move);

    return {
      fen,
      data: {
        games: 1,
        last: year,
        points,
      },
    };
  }

  async searchFEN(
    fen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
  ) {
    if (fen.trim() === "") {
      fen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
    }

    fen = cutStringToPenultimateSpace(fen);

    fen = fen.trim();
    if (fen === "") {
      fen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
    }
    const fens = this.fensObj[fen];
    const moves = [];
    for (const key in fens) {
      if (key !== "indexes") {
        const move = fens[key];
        move.move = key;
        moves.push(move);
      }
    }

    const games = this.games.filter((game) =>
      (fens?.indexes || []).includes(game.id)
    );

    moves.sort((a, b) => {
      return b.games - a.games;
    });

    return {
      fens,
      games,
      moves,
    };
  }

  static moveSan(san, board) {
    const moves = board.base.chess.moves({ verbose: true });
    for (const move of moves) {
      if (move.san.replace(/\+|#/g, "") === san) {
        board.base.manualMove(move);
      }
    }
  }
}

export default ChessProcessor;
