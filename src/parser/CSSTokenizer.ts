type Func = {
  name: string;
  arguments: string[];
};

enum State {
  START = 0,
  VALUE = 1,
  FUNC = 2
}

/**
 * This class provides an util function to tokenize a string to a list of token (string).
 */
export class CSSTokenizer {
  private splitter: string = '';

  constructor(splitter: string = '') {
    this.splitter = splitter;
  }
  /**
   * Checks whether a character is blank.
   * @param ch the character to be checked.
   * @returns true if the character is one of ' ', '\t', '\r', '\n'; false otherwise.
   */
  private isSplitter(ch: string): boolean {
    return (
      ch === ' ' || ch === '\t' || ch === '\r' || ch === '\n' || this.splitter.indexOf(ch) >= 0
    );
  }

  /**
   * Convert the input string to a Func object.
   * @param content the input string.
   * @param [silent] if ture, ignore warning for an invalid value.
   * @returns a Func object for valid content, undefined otherwise.
   */
  public tokenize(content: string): string[] {
    const len = content.length;
    const result: string[] = [];

    let state = State.START;
    let tokenQuota = '';
    let start = 0;

    for (let i = 0; i < len; ++i) {
      const ch = content[i];
      switch (state) {
        case State.START:
          if (!this.isSplitter(ch)) {
            start = i;
            state = State.VALUE;
            if (ch === "'" || ch === '"') {
              tokenQuota = ch;
            } else {
              tokenQuota = '';
            }
          }
          break;
        case State.VALUE:
          if (tokenQuota !== '') {
            if (ch === tokenQuota) {
              state = State.START;
              result.push(content.substring(start + 1, i));
            }
          } else if (ch === '(') {
            state = State.FUNC;
          } else if (this.isSplitter(ch)) {
            state = State.START;
            result.push(content.substring(start, i));
          }
          break;
        case State.FUNC:
          if (ch === ')') {
            state = State.START;
            result.push(content.substring(start, i + 1));
          }
          break;
      }
    }
    if (state !== State.START) {
      if (tokenQuota === '') {
        result.push(content.substring(start));
      } else {
        result.push(content.substring(start + 1));
      }
    }
    return result;
  }
}
