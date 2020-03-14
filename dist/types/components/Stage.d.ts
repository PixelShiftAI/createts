import { Animation } from '../animation/Animation';
import { AnimationFactory } from '../animation/AnimationFactory';
import { TouchItem } from '../base/TouchItem';
import { ResourceRegistry } from '../resource/ResourceRegistry';
import { Ticker } from '../Ticker';
import { Container } from './Container';
import { XObject } from './XObject';
export declare enum StageLayoutPolicy {
    NEVER = "never",
    ALWAYS = "always"
}
export declare enum StageUpdatePolicy {
    NEVER = "never",
    IN_ANIMATION = "in_animation",
    ALWAYS = "always"
}
export declare type StageOptions = {
    fps?: number;
    layoutPolicy?: StageLayoutPolicy;
    updatePolicy?: StageUpdatePolicy;
    autoClear?: boolean;
    style?: {
        [key: string]: string | number;
    };
};
export declare class Stage extends Container {
    canvas: HTMLCanvasElement;
    readonly ticker: Ticker;
    readonly animationFactory: AnimationFactory;
    readonly resourceRegistry: ResourceRegistry;
    readonly option: StageOptions;
    private touchedChildren;
    private hoverChildren;
    private started;
    private needUpdate;
    constructor(canvas: HTMLCanvasElement, option?: StageOptions);
    updateOnce(): void;
    start(): void;
    enableEvents(): void;
    handleMouseEvent(type: string, touches: TouchItem[], e: any): void;
    update(): void;
    calculateSize(): void;
    animate(element: XObject, override?: boolean): Animation;
    toString(): string;
    private dispatchTouchEvent;
    private dispatchNonCancellableTouchEvent;
    private onTouchMove;
    private handleTouchStartEvent;
    private handleTouchEndEvent;
}
//# sourceMappingURL=Stage.d.ts.map