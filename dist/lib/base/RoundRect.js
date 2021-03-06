"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoundRect = void 0;

var _Rect = require("../base/Rect");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * This class represents an rectangle object which contains start point (x, y) and size (width, height) with radius in
 * four corners.
 */
var RoundRect = /*#__PURE__*/function () {
  /**
   * The X coordinate of the left-top corner of the Rect.
   */

  /**
   * The Y coordinate of the left-top corner of the Rect.
   */

  /**
   * The X coordinate of the right-bottom corner of the Rect.
   */

  /**
   * The Y coordinate of the right-bottom corner of the Rect.
   */

  /**
   * The X radius of the left-top corner of the Rect.
   */

  /**
   * The Y radius of the left-top corner of the Rect.
   */

  /**
   * The X radius of the right-top corner of the Rect.
   */

  /**
   * The Y radius of the right-top corner of the Rect.
   */

  /**
   * The X radius of the right-bottom corner of the Rect.
   */

  /**
   * The Y radius of the right-bottom corner of the Rect.
   */

  /**
   * The X radius of the left-bottom corner of the Rect.
   */

  /**
   * The Y radius of the left-bottom corner of the Rect.
   */
  function RoundRect() {
    var x1 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var y1 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var x2 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var y2 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

    _classCallCheck(this, RoundRect);

    this.x1 = 0;
    this.y1 = 0;
    this.x2 = 0;
    this.y2 = 0;
    this.leftTopRadiusX = 0;
    this.leftTopRadiusY = 0;
    this.rightTopRadiusX = 0;
    this.rightTopRadiusY = 0;
    this.rightBottomRadiusX = 0;
    this.rightBottomRadiusY = 0;
    this.leftBottomRadiusX = 0;
    this.leftBottomRadiusY = 0;
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
  }
  /**
   * Convert current RoundRect object to a Rect object by dropping radius.
   *
   * @returns a Rect object with same position and size.
   */


  _createClass(RoundRect, [{
    key: "toRect",
    value: function toRect() {
      return new _Rect.Rect(this.x1, this.y1, this.x2 - this.x1 + 1, this.y2 - this.y1 + 1);
    }
    /**
     * Apply the given size.
     * @param width width of new size.
     * @param height height of new size.
     * @returns The current instance. Useful for chaining method calls
     */

  }, {
    key: "applySize",
    value: function applySize(width, height) {
      this.x2 = this.x1 + width - 1;
      this.y2 = this.y1 + height - 1;
      return this;
    }
    /**
     * Apply the given radius of 4 corners.
     * @param borderTopLeftRadius radius in top-left corner.
     * @param borderTopRightRadius height in top-right corner.
     * @param borderBottomLeftRadius radius in bottom-right corner.
     * @param borderBottomRightRadius radius in bottom-left corner.
     * @returns The current instance. Useful for chaining method calls.
     */

  }, {
    key: "applyRadius",
    value: function applyRadius(borderTopLeftRadius, borderTopRightRadius, borderBottomLeftRadius, borderBottomRightRadius) {
      var width = this.x2 - this.x1 + 1;
      var height = this.y2 - this.y1 + 1;

      if (borderTopLeftRadius) {
        this.leftTopRadiusX = borderTopLeftRadius.value1.getValue(width);
        this.leftTopRadiusY = borderTopLeftRadius.value2.getValue(height);
      }

      if (borderTopRightRadius) {
        this.rightTopRadiusX = borderTopRightRadius.value1.getValue(width);
        this.rightTopRadiusY = borderTopRightRadius.value2.getValue(height);
      }

      if (borderBottomLeftRadius) {
        this.leftBottomRadiusX = borderBottomLeftRadius.value1.getValue(width);
        this.leftBottomRadiusY = borderBottomLeftRadius.value2.getValue(height);
      }

      if (borderBottomRightRadius) {
        this.rightBottomRadiusX = borderBottomRightRadius.value1.getValue(width);
        this.rightBottomRadiusY = borderBottomRightRadius.value2.getValue(height);
      }

      if (this.leftTopRadiusX + this.rightTopRadiusX > width) {
        var scale = width / (this.leftTopRadiusX + this.rightTopRadiusX);
        this.leftTopRadiusX *= scale;
        this.rightTopRadiusX *= scale;
      }

      if (this.leftBottomRadiusX + this.rightBottomRadiusX > width) {
        var _scale = width / (this.leftBottomRadiusX + this.rightBottomRadiusX);

        this.leftBottomRadiusX *= _scale;
        this.rightBottomRadiusX *= _scale;
      }

      if (this.leftTopRadiusY + this.leftBottomRadiusY > height) {
        var _scale2 = height / (this.leftTopRadiusY + this.leftBottomRadiusY);

        this.leftTopRadiusY *= _scale2;
        this.leftBottomRadiusY *= _scale2;
      }

      if (this.rightTopRadiusY + this.rightBottomRadiusY > height) {
        var _scale3 = height / (this.rightTopRadiusY + this.rightBottomRadiusY);

        this.rightTopRadiusY *= _scale3;
        this.rightBottomRadiusY *= _scale3;
      }

      return this;
    }
    /**
     * Calculate the inner RoundRect by current instance and give borders in 4 directions.
     * @param top top border.
     * @param right right border.
     * @param bottom bottom border.
     * @param left left border.
     * @returns The current instance if all borders are 0, or a new RoundRect object which presents the result of current
     * instance applies the borders.
     */

  }, {
    key: "applyBorder",
    value: function applyBorder(top, right, bottom, left) {
      if (top === 0 && right === 0 && bottom === 0 && left === 0) {
        return this;
      }

      var rect = new RoundRect();
      rect.x1 = this.x1 + left;
      rect.y1 = this.y1 + top;
      rect.x2 = this.x2 - right;
      rect.y2 = this.y2 - bottom;
      rect.leftTopRadiusX = Math.max(0, this.leftTopRadiusX - left);
      rect.leftTopRadiusY = Math.max(0, this.leftTopRadiusY - top);

      if (rect.leftTopRadiusX === 0 || rect.leftTopRadiusY === 0) {
        rect.leftTopRadiusX = rect.leftTopRadiusY = 0;
      }

      rect.rightTopRadiusX = Math.max(0, this.rightTopRadiusX - right);
      rect.rightTopRadiusY = Math.max(0, this.rightTopRadiusY - top);

      if (rect.rightTopRadiusX === 0 || rect.rightTopRadiusY === 0) {
        rect.rightTopRadiusX = rect.rightTopRadiusY = 0;
      }

      rect.rightBottomRadiusX = Math.max(0, this.rightBottomRadiusX - right);
      rect.rightBottomRadiusY = Math.max(0, this.rightBottomRadiusY - bottom);

      if (rect.rightBottomRadiusX === 0 || rect.rightBottomRadiusY === 0) {
        rect.rightBottomRadiusX = rect.rightBottomRadiusY = 0;
      }

      rect.leftBottomRadiusX = Math.max(0, this.leftBottomRadiusX - left);
      rect.leftBottomRadiusY = Math.max(0, this.leftBottomRadiusY - bottom);

      if (rect.leftBottomRadiusX === 0 || rect.leftBottomRadiusY === 0) {
        rect.leftBottomRadiusX = rect.leftBottomRadiusY = 0;
      }

      return rect;
    }
    /**
     * Makes a path of current RouncRect object.
     * @param ctx The rendering context of target canvas.
     * @param newPath If true, start a new path, otherwise continue the previous path.
     * @param clockwise The directions of the path.
     */

  }, {
    key: "makePath",
    value: function makePath(ctx, newPath, clockwise) {
      var x1 = this.x1;
      var y1 = this.y1;
      var x2 = this.x2 + 1;
      var y2 = this.y2 + 1;

      if (clockwise) {
        if (newPath) {
          ctx.moveTo(x1, y1 + this.leftTopRadiusY);
        } else {
          ctx.lineTo(x1, y1 + this.leftTopRadiusY);
        }

        this.arcTo(x1, y1 + this.leftTopRadiusY, x1 + this.leftTopRadiusX, y1, clockwise, ctx);
        this.arcTo(x2 - this.rightTopRadiusX, y1, x2, y1 + this.rightTopRadiusY, clockwise, ctx);
        this.arcTo(x2, y2 - this.rightBottomRadiusY, x2 - this.rightBottomRadiusX, y2, clockwise, ctx);
        this.arcTo(x1 + this.leftBottomRadiusX, y2, x1, y2 - this.leftBottomRadiusY, clockwise, ctx);

        if (this.leftTopRadiusX !== 0 && this.leftTopRadiusY !== 0) {
          ctx.lineTo(x1, y1 + this.leftTopRadiusY);
        } else {
          ctx.lineTo(x1, y1);
        }
      } else {
        if (newPath) {
          ctx.moveTo(x1, y1 + this.leftTopRadiusY);
        } else {
          ctx.lineTo(x1, y1 + this.leftTopRadiusY);
        }

        this.arcTo(x1, y2 - this.leftBottomRadiusY, x1 + this.leftBottomRadiusX, y2, clockwise, ctx);
        this.arcTo(x2 - this.rightBottomRadiusX, y2, x2, y2 - this.rightBottomRadiusY, clockwise, ctx);
        this.arcTo(x2, y1 + this.rightTopRadiusY, x2 - this.rightTopRadiusX, y1, clockwise, ctx);
        this.arcTo(x1 + this.leftTopRadiusX, y1, x1, y1 + this.leftTopRadiusY, clockwise, ctx);
      }
    }
    /**
     * Make a clip of current RoundRect object to a canvas.
     * @param ctx The rendering context of target canvas.
     * @returns The current instance. Useful for chaining method calls.
     */

  }, {
    key: "clip",
    value: function clip(ctx) {
      ctx.beginPath();
      this.makePath(ctx, true, true);
      ctx.closePath();
      ctx.clip();
      return this;
    }
    /**
     * Adds a circular arc to the current sub-path, using the given control points and radius.
     * @param x1 The X coordinate of the source point.
     * @param y1 The Y coordinate of the source point.
     * @param x2 The X coordinate of the destination point.
     * @param y2 The Y coordinate of the destination point.
     * @param ctx The rendering context of target canvas.
     * @returns The current instance. Useful for chaining method calls.
     */

  }, {
    key: "arcTo",
    value: function arcTo(x1, y1, x2, y2, clockwise, ctx) {
      ctx.lineTo(x1, y1);
      var dx = Math.abs(x1 - x2);
      var dy = Math.abs(y1 - y2);
      var min = 0.000001;

      if (dx < min && dy < min) {
        return;
      } else if (dx < min || dy < min) {
        ctx.lineTo(x2, y2);
      } else {
        var startAngle;
        var cx;
        var cy;

        if (clockwise) {
          if (x1 < x2 && y1 < y2) {
            startAngle = -Math.PI / 2;
            cx = x1;
            cy = y2;
          } else if (x1 > x2 && y1 < y2) {
            startAngle = 0;
            cx = x2;
            cy = y1;
          } else if (x1 > x2 && y1 > y2) {
            startAngle = Math.PI / 2;
            cx = x1;
            cy = y2;
          } else {
            startAngle = Math.PI;
            cx = x2;
            cy = y1;
          }
        } else {
          if (x1 < x2 && y1 < y2) {
            startAngle = Math.PI;
            cx = x2;
            cy = y1;
          } else if (x1 > x2 && y1 < y2) {
            startAngle = -Math.PI / 2;
            cx = x1;
            cy = y2;
          } else if (x1 > x2 && y1 > y2) {
            startAngle = 0;
            cx = x2;
            cy = y1;
          } else {
            startAngle = Math.PI / 2;
            cx = x1;
            cy = y2;
          }
        }

        ctx.ellipse(cx, cy, dx, dy, 0, startAngle, startAngle + (clockwise ? Math.PI / 2 : -Math.PI / 2), !clockwise);
      }
    }
  }]);

  return RoundRect;
}();

exports.RoundRect = RoundRect;