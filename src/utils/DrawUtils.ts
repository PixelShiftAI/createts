import { Color } from '../base/Color';
import { Rect } from '../base/Rect';
import { RoundRect } from '../base/RoundRect';
import { BitmapTextSheet } from '../components/BitmapText';
import { SpriteFrame, SpriteSheet } from '../components/Sprite';
import { XObject } from '../components/XObject';
import { ResourceRegistry } from '../resource/ResourceRegistry';
import { Overflow } from '../style/Style';

/**
 * A class contains static draw util methods.
 */
export class DrawUtils {
  /**
   * Prevent creating instance.
   */
  private constructor() {}

  /**
   * Draws an element to canvas, it takes 3 steps:
   *
   * 1. Draw background (if any).
   * 1. Draw border and calculate the clip.
   * 1. Draw content.
   *
   * @param element The element to be drawn.
   * @param ctx The rendering context of target canvas.
   */
  public static drawElement(element: XObject, ctx: CanvasRenderingContext2D) {
    const style = element.style;
    if (style.compositeOperation) {
      ctx.globalCompositeOperation = style.compositeOperation;
    }

    // Step 1, calculate border.
    const topWidth = style.borderTop ? style.borderTop.width : 0;
    const rightWidth = style.borderRight ? style.borderRight.width : 0;
    const bottomWidth = style.borderBottom ? style.borderBottom.width : 0;
    const leftWidth = style.borderLeft ? style.borderLeft.width : 0;
    const outerRect = new RoundRect()
      .applySize(element.rect.width, element.rect.height)
      .applyRadius(
        style.borderTopLeftRadius,
        style.borderTopRightRadius,
        style.borderBottomLeftRadius,
        style.borderBottomRightRadius
      );
    let innerRect: RoundRect;
    if (topWidth > 0 || rightWidth > 0 || bottomWidth > 0 || leftWidth > 0) {
      innerRect = outerRect.applyBorder(topWidth, rightWidth, bottomWidth, leftWidth);
    } else {
      innerRect = outerRect;
    }

    // Step 2, draw shadow.
    if (style.shadow && style.shadow.isEnable()) {
      ctx.save();
      ctx.shadowBlur = style.shadow.blur;
      ctx.shadowColor = style.shadow.color.toString();
      ctx.shadowOffsetX = style.shadow.offsetX;
      ctx.shadowOffsetY = style.shadow.offsetY;

      const x = Math.abs(style.shadow.offsetX) + style.shadow.blur;
      const y = Math.abs(style.shadow.offsetY) + style.shadow.blur;
      const shadowRect = new RoundRect(
        outerRect.x1 - x,
        outerRect.y1 - y,
        outerRect.x2 + x,
        outerRect.y2 + y
      );

      ctx.beginPath();
      shadowRect.makePath(ctx, true, true);
      outerRect.makePath(ctx, false, false);
      ctx.closePath();
      ctx.clip();

      ctx.fillStyle = 'black';
      ctx.beginPath();
      outerRect.makePath(ctx, true, true);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }

    // Step 3, draw background.
    ctx.save();
    element.drawBackground(ctx, outerRect, innerRect);
    ctx.restore();

    // Step 4, draw border
    if (topWidth > 0 || rightWidth > 0 || bottomWidth > 0 || leftWidth > 0) {
      const topColor = style.borderTop ? style.borderTop.color : undefined;
      const rightColor = style.borderRight ? style.borderRight.color : undefined;
      const bottomColor = style.borderBottom ? style.borderBottom.color : undefined;
      const leftColor = style.borderLeft ? style.borderLeft.color : undefined;

      const colors: Color[] = [];
      if (topColor) {
        colors.push(topColor);
      }
      if (rightColor) {
        colors.push(rightColor);
      }
      if (bottomColor) {
        colors.push(bottomColor);
      }
      if (leftColor) {
        colors.push(leftColor);
      }
      const color = colors[0];
      let sameColor = true;
      for (let i = 1; i < colors.length; ++i) {
        if (!color.equals(colors[i])) {
          sameColor = false;
        }
      }

      if (sameColor) {
        ctx.beginPath();
        outerRect.makePath(ctx, true, true);
        innerRect.makePath(ctx, false, false);
        ctx.closePath();
        ctx.fillStyle = color.toString();
        ctx.fill();
      } else {
        if (leftColor) {
          ctx.save();
          ctx.beginPath();
          ctx.moveTo(outerRect.x1, outerRect.y1);
          if (!topColor) {
            ctx.lineTo(innerRect.x1 + innerRect.leftTopRadiusX, outerRect.y1);
          }
          ctx.lineTo(
            innerRect.x1 + innerRect.leftTopRadiusX,
            innerRect.y1 + innerRect.leftTopRadiusY
          );
          ctx.lineTo(
            innerRect.x1 + innerRect.leftBottomRadiusX,
            innerRect.y2 - innerRect.leftBottomRadiusY
          );
          if (!bottomColor) {
            ctx.lineTo(innerRect.x1 + innerRect.leftBottomRadiusX, outerRect.y2);
          }
          ctx.lineTo(outerRect.x1, outerRect.y2);
          ctx.closePath();
          ctx.clip();

          ctx.beginPath();
          outerRect.makePath(ctx, true, true);
          innerRect.makePath(ctx, false, false);
          ctx.closePath();
          ctx.fillStyle = leftColor.toString();
          ctx.fill();
          ctx.restore();
        }
        if (topColor) {
          ctx.save();
          ctx.beginPath();
          ctx.moveTo(outerRect.x2, outerRect.y1);
          if (!rightColor) {
            ctx.lineTo(outerRect.x2, outerRect.y1 + outerRect.rightTopRadiusY);
          }
          ctx.lineTo(
            innerRect.x2 - innerRect.rightTopRadiusX,
            innerRect.y1 + innerRect.rightTopRadiusY
          );
          ctx.lineTo(
            innerRect.x1 + innerRect.leftTopRadiusX,
            innerRect.y1 + innerRect.leftTopRadiusY
          );
          if (!leftColor) {
            ctx.lineTo(outerRect.x1, outerRect.y1 + outerRect.leftTopRadiusY);
          }
          ctx.lineTo(outerRect.x1, outerRect.y1);
          ctx.closePath();
          ctx.clip();

          ctx.beginPath();
          outerRect.makePath(ctx, true, true);
          innerRect.makePath(ctx, false, false);
          ctx.closePath();
          ctx.fillStyle = topColor.toString();
          ctx.fill();
          ctx.restore();
        }
        if (rightColor) {
          ctx.save();
          ctx.beginPath();
          ctx.moveTo(outerRect.x2, outerRect.y2);
          if (!bottomColor) {
            ctx.lineTo(outerRect.x2 - outerRect.rightBottomRadiusX, outerRect.y2);
          }
          ctx.lineTo(
            innerRect.x2 - innerRect.rightBottomRadiusX,
            innerRect.y2 - innerRect.rightBottomRadiusY
          );
          ctx.lineTo(
            innerRect.x2 - innerRect.rightTopRadiusX,
            innerRect.y1 + innerRect.rightTopRadiusY
          );
          if (!topColor) {
            ctx.lineTo(innerRect.x2 - innerRect.rightTopRadiusX, outerRect.y1);
          }
          ctx.lineTo(outerRect.x2, outerRect.y1);
          ctx.closePath();
          ctx.clip();

          ctx.beginPath();
          outerRect.makePath(ctx, true, true);
          innerRect.makePath(ctx, false, false);
          ctx.closePath();
          ctx.fillStyle = rightColor.toString();
          ctx.fill();
          ctx.restore();
        }
        if (bottomColor) {
          ctx.save();
          ctx.beginPath();
          ctx.moveTo(outerRect.x1, outerRect.y2);
          if (!leftColor) {
            ctx.lineTo(outerRect.x1, outerRect.y2 - outerRect.leftBottomRadiusY);
          }
          ctx.lineTo(
            innerRect.x1 + innerRect.leftBottomRadiusX,
            innerRect.y2 - innerRect.leftBottomRadiusY
          );
          ctx.lineTo(
            innerRect.x2 - innerRect.rightBottomRadiusX,
            innerRect.y2 - innerRect.rightBottomRadiusY
          );
          if (!rightColor) {
            ctx.lineTo(outerRect.x2, outerRect.y2 - outerRect.rightBottomRadiusY);
          }
          ctx.lineTo(outerRect.x2, outerRect.y2);
          ctx.closePath();
          ctx.clip();

          ctx.beginPath();
          outerRect.makePath(ctx, true, true);
          innerRect.makePath(ctx, false, false);
          ctx.closePath();
          ctx.fillStyle = bottomColor.toString();
          ctx.fill();
          ctx.restore();
        }
      }
    }

    // Step 6, draw content
    if (element.style.overflow === Overflow.HIDDEN) {
      ctx.save();
      innerRect.clip(ctx);
      element.drawContent(ctx);
      ctx.restore();
    } else {
      element.drawContent(ctx);
    }
  }

  /**
   * Returns the image instance while drawing the frame.
   * @param frame The current frame.
   * @param parent The top level configuration.
   * @returns The image instance for this frame.
   */
  public static getFrameImage(
    frame: SpriteFrame,
    parent: SpriteSheet | BitmapTextSheet
  ): HTMLImageElement | undefined {
    if (frame.image) {
      return frame.image;
    } else if (frame.url) {
      return ResourceRegistry.DefaultInstance.get(frame.url);
    } else if (parent.image) {
      return parent.image;
    } else if (parent.url) {
      return ResourceRegistry.DefaultInstance.get(parent.url);
    }
    return undefined;
  }

  /**
   * Calculate the size of each frame.
   * @param frame The current frame.
   * @param parent The top level configuration.
   * @returns The size of current frame.
   */
  public static getFrameSize(
    frame: SpriteFrame,
    parent: SpriteSheet | BitmapTextSheet
  ): { width: number; height: number } {
    const size = { width: 0, height: 0 };
    if (parent.width !== undefined) {
      size.width = parent.width;
    } else if (frame.destWidth !== undefined) {
      size.width = frame.destWidth + (frame.destX || 0);
    } else if (frame.srcWidth !== undefined) {
      size.width = frame.srcWidth;
    } else {
      const image = this.getFrameImage(frame, parent);
      if (image) {
        size.width = image.width;
      }
    }
    if (parent.height !== undefined) {
      size.height = parent.height;
    } else if (frame.destHeight !== undefined) {
      size.height = frame.destHeight + (frame.destY || 0);
    } else if (frame.srcHeight !== undefined) {
      size.height = frame.srcHeight;
    } else {
      const image = this.getFrameImage(frame, parent);
      if (image) {
        size.height = image.height;
      }
    }
    return size;
  }

  /**
   * Draws content of this element to targeted canvas.
   * @param ctx The canvas rendering context of targeted canvas.
   */
  public static drawFrame(
    ctx: CanvasRenderingContext2D,
    rect: Rect,
    frame: SpriteFrame,
    parent: SpriteSheet | BitmapTextSheet
  ) {
    // Get image
    const image = this.getFrameImage(frame, parent);
    if (!image) {
      return;
    }
    const size = this.getFrameSize(frame, parent);
    const scaleX = rect.width / size.width;
    const scaleY = rect.height / size.height;

    const destX = frame.destX !== undefined ? frame.destX : 0;
    const destY = frame.destY !== undefined ? frame.destY : 0;
    const destWidth = frame.destWidth !== undefined ? frame.destWidth : size.width - destX;
    const destHeight = frame.destHeight !== undefined ? frame.destHeight : size.height - destY;

    const srcX = frame.srcX !== undefined ? frame.srcX : 0;
    const srcY = frame.srcY !== undefined ? frame.srcY : 0;
    const srcWidth = frame.srcWidth !== undefined ? frame.srcWidth : destWidth;
    const srcHeight = frame.srcHeight !== undefined ? frame.srcHeight : destHeight;

    try {
      ctx.drawImage(
        image,
        srcX,
        srcY,
        srcWidth,
        srcHeight,
        destX * scaleX + rect.x,
        destY * scaleY + rect.y,
        destWidth * scaleX,
        destHeight * scaleY
      );
    } catch (e) {
      return;
    }
  }
}
