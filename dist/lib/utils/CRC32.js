"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CRC32 = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * A class that can be used to compute the CRC-32 of an Uint8Array.
 */
var CRC32 =
/*#__PURE__*/
function () {
  function CRC32() {
    _classCallCheck(this, CRC32);
  }

  _createClass(CRC32, null, [{
    key: "init",

    /**
     * Lookup table.
     */

    /**
     * Initialize the lookup table.
     */
    value: function init() {
      for (var i = 0; i < 256; i++) {
        var c = i;

        for (var k = 0; k < 8; k++) {
          // tslint:disable-next-line: no-bitwise
          c = (c & 1) !== 0 ? 0xedb88320 ^ c >>> 1 : c >>> 1;
        }

        this.TABLE[i] = c;
      }
    }
    /**
     * Calculate the CRC-32 checksum with the specified array of bytes.
     * @param bytes the byte array to update the checksum with.
     * @param start the start offset of the data.
     * @param length the number of bytes to use for the update.
     * @returns a number whose lowest 4 bytes presents CRC-32 checksum.
     */

  }, {
    key: "calculate",
    value: function calculate(bytes) {
      var start = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var length = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : bytes.length - start;
      var crc = -1;

      for (var i = start, l = start + length; i < l; i++) {
        // tslint:disable-next-line: no-bitwise
        crc = crc >>> 8 ^ this.TABLE[(crc ^ bytes[i]) & 0xff];
      } // tslint:disable-next-line: no-bitwise


      return crc ^ -1;
    }
  }]);

  return CRC32;
}();

exports.CRC32 = CRC32;
CRC32.TABLE = new Uint32Array(256);
CRC32.init();