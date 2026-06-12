// BUILDERS
namespace Builders {
    /**
     * Builds a text display from the given parameters.
     */
    export class TextBuilder {
        private text: string;
        private textColor: number;
        private textSize: number;
        private centered: boolean;
        private textPos: Vec3;
        private font: image.Font;

        public constructor() { }

        public withText(val: string): TextBuilder {
            this.text = val;
            return this;
        }
        public withColor(val: number): TextBuilder {
            this.textColor = val;
            return this;
        }
        public withSize(val: number): TextBuilder {
            this.textSize = val;
            return this;
        }
        public withCentered(val: boolean): TextBuilder {
            this.centered = val;
            return this;
        }
        public withPos(x: number, y: number, z?: number): TextBuilder {
            this.textPos = new Vec3(x, y, z != null ? z : 1);
            return this;
        }
        public withFont(val: image.Font): TextBuilder {
            this.font = val;
            return this;
        }

        public build(): TextDisplay {
            return new TextDisplay(
                this.text != null ? this.text : "undefined",
                this.textColor != null ? this.textColor : 1,
                this.textSize != null ? this.textSize : 1,
                this.textPos != null ? this.textPos : new Vec3(screen.width, screen.height, 1),
                this.centered != null ? this.centered : true,
                this.font != null ? this.font : image.font8
            );
        }
    }

    /**
     * Builds a sprite from the given parameters.
     */
    export class SpriteBuilder {
        private image: Image;
        private kind: number;

        private moveSpeed: Vec2;
        private acceleration: Vec2;
        private velocity: Vec2;
        private position: Vec3;
        private scale: Vec2;
        private friction: Vec2;
        private lifespan: number;

        private flags: SpriteFlag[];

        public constructor() {
            this.flags = [];
        }

        public withImage(val: Image): SpriteBuilder {
            this.image = val;
            return this;
        }

        public withKind(val: number): SpriteBuilder {
            this.kind = val;
            return this;
        }

        public withMoveSpeed(x: number, y: number): SpriteBuilder {
            this.moveSpeed = new Vec2(x, y);
            return this;
        }

        public withAcceleration(x: number, y: number): SpriteBuilder {
            this.acceleration = new Vec2(x, y);
            return this;
        }

        public withVelocity(x: number, y: number): SpriteBuilder {
            this.velocity = new Vec2(x, y);
            return this;
        }

        public withPosition(x: number, y: number, z?: number): SpriteBuilder {
            this.position = new Vec3(x, y, z != null ? z : null);
            return this;
        }

        public withFlag(val: SpriteFlag): SpriteBuilder {
            this.flags.push(val);
            return this;
        }

        public withScale(x: number, y: number): SpriteBuilder {
            this.scale = new Vec2(x, y);
            return this;
        }

        public withFriction(x: number, y: number): SpriteBuilder {
            this.friction = new Vec2(x, y);
            return this;
        }

        public withLifespan(val: number): SpriteBuilder {
            this.lifespan = val;
            return this;
        }

        public build(): Sprite {
            const built = sprites.create(
                this.image,
                this.kind
            );

            if (this.acceleration != null) {
                built.ax = this.acceleration.getX();
                built.ay = this.acceleration.getY();
            }

            if (this.position != null) {
                built.setPosition(
                    this.position.getX(),
                    this.position.getY()
                );

                built.z = this.position.getZ();
            }

            applyFlags(
                built,
                this.flags
            );

            if (this.moveSpeed != null) {
                controller.moveSprite(
                    built,
                    this.moveSpeed.getX(),
                    this.moveSpeed.getY()
                );
            }

            if (this.velocity != null) {
                built.setVelocity(
                    this.velocity.getX(),
                    this.velocity.getY()
                );
            }

            if (this.scale != null) {
                built.sx = this.scale.getX();
                built.sy = this.scale.getY();
            }

            if (this.friction != null) {
                built.fx = this.friction.getX();
                built.fy = this.friction.getY();
            }

            if (this.lifespan != null) built.lifespan = this.lifespan;
            return built;
        }
    }
}

namespace Editor {
    /**
     * Allows easy editing of images
     */
    export class ImageEditor {
        private core: Image;

        private operations: Payload;

        public constructor(core: Image) {
            this.core = core;
            this.operations = new Payload();
        }

        public drawLine(start: Vec2, end: Vec2, color: number): ImageEditor {
            this.operations.attach(() => this.core.drawLine(
                start.getX(),
                start.getY(),
                end.getX(),
                end.getY(),
                color
            ));
            return this;
        }

        public drawRect(pos: Vec2, dimensions: Vec2, color: number): ImageEditor {
            this.operations.attach(() => this.core.drawRect(
                pos.getX(),
                pos.getY(),
                dimensions.getX(),
                dimensions.getY(),
                color
            ));
            return this;
        }

        public drawCircle(pos: Vec2, radius: number, color: number): ImageEditor {
            this.operations.attach(() => this.core.drawCircle(
                pos.getX(),
                pos.getY(),
                radius,
                color
            ));
            return this;
        }

        public drawImage(i: Image, pos: Vec2): ImageEditor {
            this.operations.attach(() => this.core.drawImage(
                i,
                pos.getX(),
                pos.getY()
            ));
            return this;
        }

        public fill(color: number): ImageEditor {
            this.operations.attach(() => this.core.fill(color));
            return this;
        }

        public fillRect(pos: Vec2, dimensions: Vec2, color: number): ImageEditor {
            this.operations.attach(() => this.core.fillRect(
                pos.getX(),
                pos.getY(),
                dimensions.getX(),
                dimensions.getY(),
                color
            ));
            return this;
        }

        public fillCircle(pos: Vec2, radius: number, color: number): ImageEditor {
            this.operations.attach(() => this.core.fillCircle(
                pos.getX(),
                pos.getY(),
                radius,
                color
            ));
            return this;
        }

        public fillTriangle(first: Vec2, second: Vec2, end: Vec2, color: number): ImageEditor {
            this.operations.attach(() => this.core.fillTriangle(
                first.getX(),
                first.getY(),
                second.getX(),
                second.getY(),
                end.getX(),
                end.getY(),
                color
            ));
            return this;
        }

        public fillPoly4(first: Vec2, second: Vec2, third: Vec2, end: Vec2, color: number): ImageEditor {
            this.operations.attach(() => this.core.fillPolygon4(
                first.getX(),
                first.getY(),
                second.getX(),
                second.getY(),
                third.getX(),
                third.getY(),
                end.getX(),
                end.getY(),
                color
            ));
            return this;
        }

        public scroll(val: Vec2): ImageEditor {
            this.operations.attach(() => this.core.scroll(val.getX(), val.getY()));
            return this;
        }

        public transpose(): ImageEditor {
            this.operations.attach(() => this.core.transposed());
            return this;
        }

        public flip(axis: Axis): ImageEditor {
            this.operations.attach(() => axis == Axis.X ? this.core.flipX() : this.core.flipY());
            return this;
        }

        public stretch(axis?: Axis): ImageEditor {
            this.operations.attach(() => {
                if (axis != null) {
                    if (axis == Axis.X) {
                        this.core.doubledX();
                    } else {
                        this.core.doubledY();
                    }
                } else {
                    this.core.doubled();
                }
            });
            return this;
        }

        public setPixel(pos: Vec2, color: number): ImageEditor {
            this.operations.attach(() => this.core.setPixel(pos.getX(), pos.getY(), color));
            return this;
        }

        public apply(): Image {
            this.operations.deploy();
            return this.core;
        }
    }

    /**
     * Allows easy editing of the scene's settings.
     */
    export class SceneEditor {
        private bgColor: number;
        private bgImage: Image;

        private infoBgC: number;
        private infoFontC: number;
        private infoBorderC: number;
        private lifeImage: Image;

        private followedSprite: Sprite;

        private showScore: boolean;
        private showLife: boolean;
        private showCountdown: boolean;

        public constructor() { }

        public withBackgroundColor(val: number): SceneEditor {
            this.bgColor = val;
            return this;
        }

        public withBackgroundImage(val: Image): SceneEditor {
            this.bgImage = val;
            return this;
        }

        public withInfoBackgroundColor(val: number): SceneEditor {
            this.infoBgC = val;
            return this;
        }

        public withInfoFontColor(val: number): SceneEditor {
            this.infoFontC = val;
            return this;
        }

        public withInfoBorderColor(val: number): SceneEditor {
            this.infoBorderC = val;
            return this;
        }

        public withInfoLifeImage(val: Image): SceneEditor {
            this.lifeImage = val;
            return this;
        }

        public withFollowedSprite(val: Sprite): SceneEditor {
            this.followedSprite = val;
            return this;
        }

        public withShowScore(val: boolean): SceneEditor {
            this.showScore = val;
            return this;
        }

        public withShowLife(val: boolean): SceneEditor {
            this.showLife = val;
            return this;
        }

        public withShowCountdown(val: boolean): SceneEditor {
            this.showCountdown = val;
            return this;
        }

        public apply() {
            if (this.bgColor != null) scene.setBackgroundColor(this.bgColor);
            if (this.bgImage != null) scene.setBackgroundImage(this.bgImage);

            if (this.followedSprite != null) scene.cameraFollowSprite(this.followedSprite);

            if (this.infoBgC != null) info.setBackgroundColor(this.infoBgC);
            if (this.infoFontC != null) info.setFontColor(this.infoFontC);
            if (this.infoBorderC != null) info.setBorderColor(this.infoBorderC);
            if (this.lifeImage != null) info.setLifeImage(this.lifeImage);

            if (this.showScore != null) info.showScore(this.showScore);
            if (this.showLife != null) info.showLife(this.showLife);
            if (this.showCountdown != null) info.showCountdown(this.showCountdown);
        }
    }

    enum Axis { X, Y };
}

// PIPELINE
/**
 * The depo used to run and store pipelines.
 */
class PipelineDepo {
    private lines: Pipeline[];

    public constructor() {
        this.lines = [];
    }

    public getPipelines(): Pipeline[] {
        return this.lines;
    }

    public loadSingular(l: Pipeline) {
        this.lines.push(l);
    }

    public load(pipelines: Pipeline[]) {
        pipelines.forEach(pipeline => this.loadSingular(pipeline));
    }

    protected construct(pipeline: Pipeline) {
        this.lines.forEach(pipeline => pipeline.assemble());
        pipeline.getPayloads().forEach(load => load.deploy());
    }

    public bootstrap() {
        this.construct(this.lines[0]);
    }

    public bootstrapNumeric(id: number) {
        this.construct(this.lines[id]);
    }

    public bootstrapId(id: string) {
        for (let pipeline of this.lines) {
            if (pipeline.getId() == id) {
                this.construct(pipeline);
                break;
            }
        }
    }
}

/**
 * The base interface for pipelines. Must be implemented in all pipelines.
 */
interface Pipeline {
    getPayloads(): Payload[];
    assemble(): void;

    getId?(): string;
}