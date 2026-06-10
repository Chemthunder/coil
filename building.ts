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

function input(btn: controller.Button, handler: () => void) {
    btn.onEvent(ControllerButtonEvent.Pressed, handler);
}

function tile(color?: number): Image {
    return createImage(16, 16, color != null ? color : game.Color.Transparent);
}

namespace tiles {
    export function getCurrentTilemap(): TileMap {
        return Dispatcher.fetchScene().tileMap;
    }
}