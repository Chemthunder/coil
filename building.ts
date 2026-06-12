class TextDisplay {
    private text: string;

    private holder: Sprite;
    private render: Image;

    private textParams: Vec2;

    private textPos: Vec3;

    private font: image.Font;

    public constructor(text: string, textColor: number, textSize: number, pos: Vec3, centered: boolean, font: image.Font) {
        this.text = text;
        this.textParams = new Vec2(textColor, textSize);
        this.textPos = pos;
        this.font = font;

        this.render = createImage(text.length * 15, 90);
        this.holder = sprites.create(this.render, TextDisplay.Text);

        this.holder.setPosition(pos.getX(), pos.getY());

        this.holder.scale = textSize;

        this.draw(centered);
    }

    private draw(center: boolean) {
        if (center) {
            this.render.printCenter(
                this.text,
                this.render.height / 2,
                this.getTextColor(),
                this.font
            );
        } else {
            this.render.print(
                this.text,
                this.render.width / 2,
                this.render.height / 2,
                this.getTextColor(),
                this.font
            );
        }
    }

    public getText(): string {
        return this.text;
    }

    public getTextColor(): number {
        return this.textParams.getX();
    }

    public getTextSize(): number {
        return this.textParams.getY();
    }

    public getTextPos(): Vec3 {
        return this.textPos;
    }

    public static readonly Text = SpriteKind.create();
}
class TextBuilder {
    private text: string;
    private textColor: number;
    private textSize: number;
    private centered: boolean;
    private textPos: Vec3;
    private font: image.Font;

    public constructor() {}

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
        return null;
    }
}
scene.setBackgroundColor(4)
let a = new TextDisplay("test", 1, 3, new Vec3(screen.width / 2, 40, 5), true, image.font12);