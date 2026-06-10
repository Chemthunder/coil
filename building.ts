class Vec2 {
    private x: number;
    private y: number;

    public constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public getX(): number {
        return this.x;
    }

    public getY(): number {
        return this.y;
    }

    public setX(x: number) {
        this.x = x;
    }

    public setY(y: number) {
        this.y = y;
    }
}

class Vec3 {
    private x: number;
    private y: number;
    private z: number;

    public constructor(x: number, y: number, z: number) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    public getX(): number {
        return this.x;
    }

    public getY(): number {
        return this.y;
    }

    public getZ(): number {
        return this.z;
    }

    public setX(x: number) {
        this.x = x;
    }

    public setY(y: number) {
        this.y = y;
    }

    public setZ(z: number) {
        this.z = z;
    }
}

class SpriteBuilder {
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

        if (this.lifespan != null) {
            built.lifespan = this.lifespan;
        }
        return built;
    }
}

function input(btn: controller.Button, handler: () => void) {
    btn.onEvent(ControllerButtonEvent.Pressed, handler);
}
//