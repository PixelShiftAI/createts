"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Style = exports.TextBorderPosition = exports.Overflow = exports.Display = exports.Position = exports.TextAlign = exports.BoxSizing = void 0;

var _Animation = require("../animation/Animation");

var _BaseValue = require("../base/BaseValue");

var _Color = require("../base/Color");

var _EnumUtils = require("../utils/EnumUtils");

var _StringUtils = require("../utils/StringUtils");

var _Background = require("./Background");

var _Border = require("./Border");

var _Font = require("./Font");

var _LineHeight = require("./LineHeight");

var _Shadow = require("./Shadow");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var BoxSizing;
exports.BoxSizing = BoxSizing;

(function (BoxSizing) {
  BoxSizing["CONTENT_BOX"] = "content-box";
  BoxSizing["BORDER_BOX"] = "border-box";
})(BoxSizing || (exports.BoxSizing = BoxSizing = {}));

var TextAlign;
exports.TextAlign = TextAlign;

(function (TextAlign) {
  TextAlign["LEFT"] = "left";
  TextAlign["RIGHT"] = "right";
  TextAlign["CENTER"] = "center";
})(TextAlign || (exports.TextAlign = TextAlign = {}));

var Position;
exports.Position = Position;

(function (Position) {
  Position["STATIC"] = "static";
  Position["RELATIVE"] = "relative";
  Position["ABSOLUTE"] = "absolute";
  Position["FIXED"] = "fixed";
})(Position || (exports.Position = Position = {}));

var Display;
exports.Display = Display;

(function (Display) {
  Display["INLINE"] = "inline";
  Display["BLOCK"] = "block";
  Display["NONE"] = "none";
})(Display || (exports.Display = Display = {}));

var Overflow;
exports.Overflow = Overflow;

(function (Overflow) {
  Overflow["VISIBLE"] = "visible";
  Overflow["HIDDEN"] = "hidden";
})(Overflow || (exports.Overflow = Overflow = {}));

var TextBorderPosition;
exports.TextBorderPosition = TextBorderPosition;

(function (TextBorderPosition) {
  TextBorderPosition["OUTER"] = "outer";
  TextBorderPosition["INNER"] = "inner";
})(TextBorderPosition || (exports.TextBorderPosition = TextBorderPosition = {}));

var REG_ATTRS = /([^\s:;]+)[\s]*:[\s]*([^;]+)/gm;

var Style =
/*#__PURE__*/
function () {
  function Style() {
    _classCallCheck(this, Style);

    this.width = void 0;
    this.height = void 0;
    this.position = Position.STATIC;
    this.display = Display.INLINE;
    this.left = void 0;
    this.right = void 0;
    this.top = void 0;
    this.bottom = void 0;
    this.paddingTop = void 0;
    this.paddingRight = void 0;
    this.paddingBottom = void 0;
    this.paddingLeft = void 0;
    this.marginTop = void 0;
    this.marginRight = void 0;
    this.marginBottom = void 0;
    this.marginLeft = void 0;
    this.perspectiveOriginX = _BaseValue.BaseValue.of('50%');
    this.perspectiveOriginY = _BaseValue.BaseValue.of('50%');
    this.transformX = _BaseValue.BaseValue.of('0');
    this.transformY = _BaseValue.BaseValue.of('0');
    this.alpha = 1;
    this.rotation = 0;
    this.scaleX = 1;
    this.scaleY = 1;
    this.skewX = 0;
    this.skewY = 0;
    this.shadow = void 0;
    this.visible = true;
    this.background = void 0;
    this.boxSizing = BoxSizing.CONTENT_BOX;
    this.color = _Color.Color.BLACK;
    this.font = void 0;
    this.lineHeight = void 0;
    this.textAlign = TextAlign.LEFT;
    this.borderRadiusTop = void 0;
    this.borderRadiusRight = void 0;
    this.borderRadiusBottom = void 0;
    this.borderRadiusLeft = void 0;
    this.borderTop = void 0;
    this.borderRight = void 0;
    this.borderBottom = void 0;
    this.borderLeft = void 0;
    this.overflow = Overflow.VISIBLE;
    this.compositeOperation = void 0;
    this.aspectRatio = void 0;
    this.filter = void 0;
    this.cursor = void 0;
    this.textBorder = void 0;
    this.textBorderPosition = TextBorderPosition.OUTER;
    this.textShadow = void 0;
  }

  _createClass(Style, [{
    key: "apply",
    value: function apply(attrs) {
      for (var k in attrs) {
        var _key = this.normalize(k);

        var value = attrs[k] + '';

        switch (_key) {
          case 'width':
          case 'height':
            this[_key] = _BaseValue.BaseValue.of(value);
            break;

          case 'position':
            this.position = _EnumUtils.EnumUtils.fromString(Position, value, Position.STATIC);
            break;

          case 'display':
            this.display = _EnumUtils.EnumUtils.fromString(Display, value, Display.INLINE);
            break;

          case 'left':
          case 'right':
          case 'top':
          case 'bottom':
            this[_key] = _BaseValue.BaseValue.of(value);
            break;

          case 'padding':
            var paddings = Style.parse4Dirs(value);

            if (paddings) {
              this.paddingTop = paddings[0];
              this.paddingRight = paddings[1];
              this.paddingBottom = paddings[2];
              this.paddingLeft = paddings[3];
            }

            break;

          case 'paddingTop':
          case 'paddingRight':
          case 'paddingBottom':
          case 'paddingLeft':
            this[_key] = _BaseValue.BaseValue.of(value);
            break;

          case 'margin':
            var margins = Style.parse4Dirs(value);

            if (margins) {
              this.marginTop = margins[0];
              this.marginRight = margins[1];
              this.marginBottom = margins[2];
              this.marginLeft = margins[3];
            }

            break;

          case 'marginTop':
          case 'marginRight':
          case 'marginBottom':
          case 'marginLeft':
            this[_key] = _BaseValue.BaseValue.of(value);
            break;

          case 'perspectiveOrigin':
            {
              var pieces = value.split(/\s+/);

              if (pieces.length === 1) {
                if (value === 'auto') {
                  this.perspectiveOriginX = _BaseValue.BaseValue.of('50%');
                  this.perspectiveOriginY = _BaseValue.BaseValue.of('50%');
                } else {
                  this.perspectiveOriginX = _BaseValue.BaseValue.of(value);
                  this.perspectiveOriginY = _BaseValue.BaseValue.of(value);
                }
              } else if (pieces.length > 1) {
                this.perspectiveOriginX = pieces[0] === 'auto' ? _BaseValue.BaseValue.of('50%') : _BaseValue.BaseValue.of(pieces[0]);
                this.perspectiveOriginY = pieces[1] === 'auto' ? _BaseValue.BaseValue.of('50%') : _BaseValue.BaseValue.of(pieces[1]);
              }

              break;
            }

          case 'transform':
            {
              var _pieces = value.split(/\s+/);

              if (_pieces.length === 1) {
                if (value === 'auto') {
                  this.transformX = _BaseValue.BaseValue.of('50%');
                  this.transformY = _BaseValue.BaseValue.of('50%');
                } else {
                  this.transformX = _BaseValue.BaseValue.of(value);
                  this.transformY = _BaseValue.BaseValue.of(value);
                }
              } else if (_pieces.length > 1) {
                this.transformX = _pieces[0] === 'auto' ? _BaseValue.BaseValue.of('50%') : _BaseValue.BaseValue.of(_pieces[0]);
                this.transformY = _pieces[1] === 'auto' ? _BaseValue.BaseValue.of('50%') : _BaseValue.BaseValue.of(_pieces[1]);
              }

              break;
            }

          case 'perspectiveOriginX':
          case 'perspectiveOriginY':
          case 'transformX':
          case 'transformY':
            this[_key] = value === 'auto' ? _BaseValue.BaseValue.of('50%') : _BaseValue.BaseValue.of(value);
            break;

          case 'scaleX':
          case 'scaleY':
          case 'skewX':
          case 'skewY':
          case 'alpha':
          case 'aspectRatio':
          case 'rotation':
            {
              var numberValue = parseFloat(value);

              if (isNaN(numberValue)) {
                console.warn("invalid ".concat(_key, " value: ").concat(value));
              } else {
                this[_key] = numberValue;
              }

              break;
            }

          case 'scale':
            {
              var _numberValue = parseFloat(value);

              if (isNaN(_numberValue)) {
                console.warn("invalid ".concat(_key, " value: ").concat(value));
              } else {
                this.scaleX = this.scaleY = _numberValue;
              }

              break;
            }

          case 'visible':
            this.visible = value === 'true';
            break;

          case 'background':
            this.background = _Background.Background.of(value);
            break;

          case 'backgroundClip':
            if (!this.background) {
              this.background = new _Background.Background();
            }

            this.background.setClip(value);
            break;

          case 'backgroundColor':
            if (!this.background) {
              this.background = new _Background.Background();
            }

            this.background.setColor(value);
            break;

          case 'backgroundAttachment':
            if (!this.background) {
              this.background = new _Background.Background();
            }

            this.background.setAttachment(value);
            break;

          case 'backgroundImage':
            if (!this.background) {
              this.background = new _Background.Background();
            }

            this.background.setImage(value);
            break;

          case 'backgroundRepeat':
            if (!this.background) {
              this.background = new _Background.Background();
            }

            this.background.setRepeat(value);
            break;

          case 'backgroundOrigin':
            if (!this.background) {
              this.background = new _Background.Background();
            }

            this.background.setOrigin(value);
            break;

          case 'backgroundSize':
            if (!this.background) {
              this.background = new _Background.Background();
            }

            this.background.setSize(value);
            break;

          case 'backgroundPosition':
            if (!this.background) {
              this.background = new _Background.Background();
            }

            this.background.setPosition(value);
            break;

          case 'boxSizing':
            this.boxSizing = _EnumUtils.EnumUtils.fromString(BoxSizing, value, BoxSizing.CONTENT_BOX);
            break;

          case 'color':
            {
              var color = _Color.Color.of(value);

              if (color) {
                this.color = color;
              }

              break;
            }

          case 'font':
            this.font = _Font.Font.of(value);
            break;

          case 'fontFamily':
            if (!this.font) {
              this.font = new _Font.Font();
            }

            this.font.family = value;
            break;

          case 'fontWeight':
            if (!this.font) {
              this.font = new _Font.Font();
            }

            this.font.weight = _EnumUtils.EnumUtils.fromString(_Font.FontWeight, value, _Font.FontWeight.NORMAL);
            break;

          case 'fontStyle':
            if (!this.font) {
              this.font = new _Font.Font();
            }

            this.font.style = _EnumUtils.EnumUtils.fromString(_Font.FontStyle, value, _Font.FontStyle.NORMAL);
            break;

          case 'fontVariant':
            if (!this.font) {
              this.font = new _Font.Font();
            }

            this.font.variant = _EnumUtils.EnumUtils.fromString(_Font.FontVariant, value, _Font.FontVariant.NORMAL);
            break;

          case 'fontSize':
            {
              var _numberValue2 = parseFloat(value);

              if (isNaN(_numberValue2)) {
                console.warn("invalid ".concat(_key, " value: ").concat(value));
              } else {
                if (!this.font) {
                  this.font = new _Font.Font();
                }

                this.font.size = _numberValue2;
              }

              break;
            }

          case 'lineHeight':
            this.lineHeight = _LineHeight.LineHeight.of(value);

          case 'textAlign':
            this.textAlign = _EnumUtils.EnumUtils.fromString(TextAlign, value, TextAlign.LEFT);
            break;

          case 'borderRadius':
            var borderRadius = Style.parse4Dirs(value);

            if (borderRadius) {
              this.borderRadiusTop = borderRadius[0];
              this.borderRadiusRight = borderRadius[1];
              this.borderRadiusBottom = borderRadius[2];
              this.borderRadiusLeft = borderRadius[3];
            }

            break;

          case 'borderRadiusTop':
          case 'borderRadiusRight':
          case 'borderRadiusBottom':
          case 'borderRadiusLeft':
            this[_key] = _BaseValue.BaseValue.of(value);
            break;

          case 'border':
            this.borderTop = this.borderRight = this.borderLeft = this.borderBottom = _Border.Border.of(value);
            break;

          case 'borderTop':
          case 'borderRight':
          case 'borderLeft':
          case 'borderBottom':
          case 'textBorder':
            this[_key] = _Border.Border.of(value);
            break;

          case 'overflow':
            this.overflow = _EnumUtils.EnumUtils.fromString(Overflow, value, Overflow.VISIBLE);
            break;

          case 'compositeOperation':
            this.compositeOperation = value;
            break;

          case 'filter':
            this.filter = value;
            break;

          case 'shadow':
          case 'textShadow':
            this[_key] = _Shadow.Shadow.of(value);
            break;

          case 'textBorderPosition':
            this.textBorderPosition = _EnumUtils.EnumUtils.fromString(TextBorderPosition, value, TextBorderPosition.OUTER);
            break;

          case 'cursor':
            this.cursor = value;
            break;

          default:
            console.warn('unknown style:' + k + ' value:' + value);
            break;
        }
      }

      return this;
    }
  }, {
    key: "getSnapshotForAnimation",
    value: function getSnapshotForAnimation(target, props) {
      var result = {};

      for (var name in props) {
        this.fillSnapshotForAnimation(target, name, props[name], result);
      }

      return result;
    }
  }, {
    key: "clone",
    value: function clone() {
      var cloned = new Style();
      cloned.width = this.width;
      cloned.height = this.height;
      cloned.position = this.position;
      cloned.display = this.display;
      cloned.left = this.left;
      cloned.right = this.right;
      cloned.top = this.top;
      cloned.bottom = this.bottom;

      if (this.paddingTop) {
        cloned.paddingTop = this.paddingTop.clone();
      }

      if (this.paddingRight) {
        cloned.paddingRight = this.paddingRight.clone();
      }

      if (this.paddingBottom) {
        cloned.paddingBottom = this.paddingBottom.clone();
      }

      if (this.paddingLeft) {
        cloned.paddingLeft = this.paddingLeft.clone();
      }

      if (this.marginTop) {
        cloned.marginTop = this.marginTop.clone();
      }

      if (this.marginRight) {
        cloned.marginRight = this.marginRight.clone();
      }

      if (this.marginBottom) {
        cloned.marginBottom = this.marginBottom.clone();
      }

      if (this.marginLeft) {
        cloned.marginLeft = this.marginLeft.clone();
      }

      cloned.perspectiveOriginX = this.perspectiveOriginX;
      cloned.perspectiveOriginY = this.perspectiveOriginY;
      cloned.transformX = this.transformX;
      cloned.transformY = this.transformY;
      cloned.alpha = this.alpha;
      cloned.rotation = this.rotation;
      cloned.scaleX = this.scaleX;
      cloned.scaleY = this.scaleY;
      cloned.skewX = this.skewX;
      cloned.skewY = this.skewY;

      if (this.shadow) {
        cloned.shadow = this.shadow.clone();
      }

      if (this.textShadow) {
        cloned.textShadow = this.textShadow.clone();
      }

      cloned.textBorderPosition = this.textBorderPosition;

      if (this.textBorder) {
        cloned.textBorder = this.textBorder.clone();
      }

      cloned.visible = this.visible;

      if (this.background) {
        cloned.background = this.background.clone();
      }

      cloned.boxSizing = this.boxSizing;
      cloned.color = this.color.clone();

      if (this.font) {
        cloned.font = this.font.clone();
      }

      cloned.lineHeight = this.lineHeight;
      cloned.textAlign = this.textAlign;

      if (this.borderTop) {
        cloned.borderTop = this.borderTop.clone();
      }

      if (this.borderRight) {
        cloned.borderRight = this.borderRight.clone();
      }

      if (this.borderBottom) {
        cloned.borderBottom = this.borderBottom.clone();
      }

      if (this.borderLeft) {
        cloned.borderLeft = this.borderLeft.clone();
      }

      if (this.borderRadiusTop) {
        cloned.borderRadiusTop = this.borderRadiusTop.clone();
      }

      if (this.borderRadiusRight) {
        cloned.borderRadiusRight = this.borderRadiusRight.clone();
      }

      if (this.borderRadiusBottom) {
        cloned.borderRadiusBottom = this.borderRadiusBottom.clone();
      }

      if (this.borderRadiusLeft) {
        cloned.borderRadiusLeft = this.borderRadiusLeft.clone();
      }

      cloned.overflow = this.overflow;
      cloned.compositeOperation = this.compositeOperation;
      cloned.aspectRatio = this.aspectRatio;
      cloned.filter = this.filter;
      cloned.cursor = this.cursor;
      return cloned;
    }
  }, {
    key: "fillSnapshotForAnimation",
    value: function fillSnapshotForAnimation(target, name, to, result) {
      var key = this.normalize(name);

      switch (key) {
        case 'scaleX':
        case 'scaleY':
        case 'alpha':
        case 'rotation':
        case 'skewX':
        case 'skewY':
        case 'aspectRatio':
          var numberTo = typeof to === 'string' ? parseFloat(to) : to;

          if (!isNaN(numberTo)) {
            result[key] = {
              from: this[key],
              to: numberTo,
              type: _Animation.AnimationValueType.NUMBER
            };
          }

          break;

        case 'transformX':
        case 'width':
        case 'left':
        case 'right':
        case 'perspectiveOriginX':
          {
            var tb = _BaseValue.BaseValue.of(to);

            var from = this[key] || _BaseValue.BaseValue.of(0);

            if (tb.unit === _BaseValue.BaseValueUnit.PERCENTAGE) {
              result[key] = {
                from: from.toPercentage(target.getWidth()),
                to: tb,
                type: _Animation.AnimationValueType.BASEVALUE
              };
            } else {
              result[key] = {
                from: from.toAbsolute(target.getWidth()),
                to: tb,
                type: _Animation.AnimationValueType.BASEVALUE
              };
            }

            break;
          }

        case 'transformY':
        case 'height':
        case 'top':
        case 'bottom':
        case 'perspectiveOriginY':
          {
            var _tb = _BaseValue.BaseValue.of(to);

            var _from = this[key] || _BaseValue.BaseValue.of(0);

            if (_tb.unit === _BaseValue.BaseValueUnit.PERCENTAGE) {
              result[key] = {
                from: _from.toPercentage(target.getHeight()),
                to: _tb,
                type: _Animation.AnimationValueType.BASEVALUE
              };
            } else {
              result[key] = {
                from: _from.toAbsolute(target.getHeight()),
                to: _tb,
                type: _Animation.AnimationValueType.BASEVALUE
              };
            }

            break;
          }

        case 'color':
          {
            var color = _Color.Color.of(to + '');

            if (color) {
              result[key] = {
                from: this[key],
                to: color,
                type: _Animation.AnimationValueType.COLOR
              };
            }

            break;
          }

        case 'backgroundColor':
          {
            var _color = _Color.Color.of(to + '');

            if (_color) {
              result[key] = {
                from: this.background && this.background.color || _Color.Color.WHITE,
                to: _color,
                type: _Animation.AnimationValueType.COLOR
              };
            }

            break;
          }

        case 'paddingTop':
        case 'paddingRight':
        case 'paddingBottom':
        case 'paddingLeft':
        case 'marginTop':
        case 'marginRight':
        case 'marginBottom':
        case 'marginLeft':
        case 'borderRadiusTop':
        case 'borderRadiusRight':
        case 'borderRadiusBottom':
        case 'borderRadiusLeft':
          result[key] = {
            from: this[key],
            to: _BaseValue.BaseValue.of(to + ''),
            type: _Animation.AnimationValueType.BASEVALUE
          };
          break;

        case 'padding':
          this.fillSnapshotForAnimation(target, 'paddingTop', to, result);
          this.fillSnapshotForAnimation(target, 'paddingRight', to, result);
          this.fillSnapshotForAnimation(target, 'paddingBottom', to, result);
          this.fillSnapshotForAnimation(target, 'paddingLeft', to, result);
          break;

        case 'margin':
          this.fillSnapshotForAnimation(target, 'marginTop', to, result);
          this.fillSnapshotForAnimation(target, 'marginRight', to, result);
          this.fillSnapshotForAnimation(target, 'marginBottom', to, result);
          this.fillSnapshotForAnimation(target, 'marginLeft', to, result);
          break;

        case 'perspectiveOrigin':
          this.fillSnapshotForAnimation(target, 'perspectiveOriginX', to, result);
          this.fillSnapshotForAnimation(target, 'perspectiveOriginY', to, result);
          break;

        case 'transform':
          this.fillSnapshotForAnimation(target, 'transformX', to, result);
          this.fillSnapshotForAnimation(target, 'transformY', to, result);
          break;

        case 'scale':
          this.fillSnapshotForAnimation(target, 'scaleX', to, result);
          this.fillSnapshotForAnimation(target, 'scaleY', to, result);
          break;

        case 'borderRadius':
          this.fillSnapshotForAnimation(target, 'borderRadiusTop', to, result);
          this.fillSnapshotForAnimation(target, 'borderRadiusRight', to, result);
          this.fillSnapshotForAnimation(target, 'borderRadiusBottom', to, result);
          this.fillSnapshotForAnimation(target, 'borderRadiusLeft', to, result);
          break;

        case 'borderLeft':
        case 'borderRight':
        case 'borderTop':
        case 'borderBottom':
        case 'textBorder':
          result[key] = {
            from: this[key] || _Border.Border.DEFAULT,
            to: _Border.Border.of(to + '') || _Border.Border.DEFAULT,
            type: _Animation.AnimationValueType.BORDER
          };
          break;

        case 'border':
          this.fillSnapshotForAnimation(target, 'borderLeft', to, result);
          this.fillSnapshotForAnimation(target, 'borderRight', to, result);
          this.fillSnapshotForAnimation(target, 'borderTop', to, result);
          this.fillSnapshotForAnimation(target, 'borderBottom', to, result);
          break;

        case 'shadow':
        case 'textShadow':
          result[key] = {
            from: this[key] || new _Shadow.Shadow(0, 0, 0, _Color.Color.WHITE),
            to: _Shadow.Shadow.of(to + '') || new _Shadow.Shadow(0, 0, 0, _Color.Color.WHITE),
            type: _Animation.AnimationValueType.SHADOW
          };
          break;

        default:
          console.warn('unsupported animation attribute:' + name);
          break;
      }
    }
  }, {
    key: "normalize",
    value: function normalize(key) {
      var pieces = key.split(/-/);
      var normalized = '';
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = pieces[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var piece = _step.value;

          if (normalized === '') {
            normalized = piece;
          } else {
            normalized += piece.substring(0, 1).toUpperCase() + piece.substring(1);
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return normalized;
    }
  }], [{
    key: "of",
    value: function of(value) {
      var style = new Style();
      var attrs = {};

      var matches = _StringUtils.StringUtils.matchAll(value, REG_ATTRS);

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = matches[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var match = _step2.value;
          attrs[match[1].toLowerCase()] = match[2];
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
            _iterator2["return"]();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      return style.apply(attrs);
    }
  }, {
    key: "parse4Dirs",
    value: function parse4Dirs(value) {
      var pieces = value.split(/\s+/);

      if (pieces.length === 1) {
        return [_BaseValue.BaseValue.of(pieces[0]), _BaseValue.BaseValue.of(pieces[0]), _BaseValue.BaseValue.of(pieces[0]), _BaseValue.BaseValue.of(pieces[0])];
      } else if (pieces.length === 2) {
        return [_BaseValue.BaseValue.of(pieces[0]), _BaseValue.BaseValue.of(pieces[1]), _BaseValue.BaseValue.of(pieces[0]), _BaseValue.BaseValue.of(pieces[1])];
      } else if (pieces.length === 3) {
        return [_BaseValue.BaseValue.of(pieces[0]), _BaseValue.BaseValue.of(pieces[1]), _BaseValue.BaseValue.of(pieces[2]), _BaseValue.BaseValue.of(pieces[1])];
      } else if (pieces.length === 4) {
        return [_BaseValue.BaseValue.of(pieces[0]), _BaseValue.BaseValue.of(pieces[1]), _BaseValue.BaseValue.of(pieces[2]), _BaseValue.BaseValue.of(pieces[3])];
      } else {
        return undefined;
      }
    }
  }]);

  return Style;
}();

exports.Style = Style;