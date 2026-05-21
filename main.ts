// LOGGING
function enablePrint() {
    game.consoleOverlay.setVisible(true, 1);
}

function print(message: any, value?: any) {
    if (value != null) {
        console.logValue(message, value);
    } else {
        console.log(message);
    }
}

// MIXIN
namespace SpriteKind {
    export const RenderElement = SpriteKind.create();
    export const Placeholder = SpriteKind.create();
    export const GuiElement = SpriteKind.create();
}

// SYSTEM
namespace Exception {
    export function of(reason: string): string {
        return reason;
    }
}

namespace Dispatcher {
    export function fetchScene(): scene.Scene {
        return game.currentScene();
    }
}

class Camera {
    private core: scene.Camera;

    public constructor() {
        this.core = Dispatcher.fetchScene().camera;
    }

    public redirect(x: number, y: number) {
        this.core.offsetX = x;
        this.core.offsetY = y;
        this.draw();
    }

    public shake(amplitude: number, duration: number) {
        this.core.shake(amplitude, duration);
    }

    public centerOnSprite(sprite: Sprite) {
        this.core.sprite = sprite;
    }

    public draw() {
        this.core.drawOffsetX;
        this.core.drawOffsetY;
    }

    public static getInstance(): Camera {
        return new Camera();
    }
}

class Scene {
    private core: scene.Scene;

    public constructor() {
        this.core = Dispatcher.fetchScene();
    }

    public extract(): scene.Scene {
        return this.core;
    }

    public static getInstance(): Scene {
        return new Scene();
    }
}

// BUILDING
class GameMetaData {
    private author: string;
    private version: number;
    private license: string;
    private desc: string;

    public constructor(json: any) {
        this.author = json.author;
        this.version = json.version;
        this.license = json.license;
        this.desc = json.desc;
    }

    public getAuthor(): string {
        return this.author;
    }

    public getVersion(): number {
        return this.version;
    }

    public getLicense(): string {
        return this.license;
    }

    public getDesc(): string {
        return this.desc;
    }

    public export(): any {
        return {
            author: this.getAuthor(),
            version: this.getVersion(),
            license: this.getLicense(),
            desc: this.getDesc()
        }
    }

    public static import(json: any): GameMetaData {
        return new GameMetaData(json);
    }
}

class Game {
    private name: string;
    private data: GameMetaData;

    public constructor(name: string, information: any) {
        this.name = name;
        this.data = GameMetaData.import(information);
    }

    public getName(): string {
        return this.name;
    }

    public getMetaData(): GameMetaData {
        return this.data;
    }

    public run(s: () => void) {
        s();
    }
}

namespace MetaDataBuilder {
    export function build(author: string, version: number, license: string, desc: string): any {
        return {
            author: author,
            version: version,
            license: license,
            desc: desc
        }
    }
}

// REGISTRATION
class RegistryEntry<V> {
    private id: string;
    private obj: V;

    public constructor(id: string, obj: V) {
        this.id = id;
        this.obj = obj;
    }

    public getId(): string {
        return this.id;
    }

    public getObj(): V {
        return this.obj;
    }
}

class Quilt {
    private entries: RegistryEntry<any>[];

    public constructor() {
        this.entries = [];
    }

    public register<V>(id: string, obj: V): V {
        let packedEntry = new RegistryEntry<V>(id, obj);
        this.entries.push(packedEntry);
        return obj;
    }

    public getEntries(): RegistryEntry<any>[] {
        return this.entries;
    }

    public findEntry(id: string): any {
        for (let e of this.entries) {
            if (e.getId() == id) {
                return id;
                break;
            }
        }

        return null;
    }

    public sprite(name: string, image: Image, kind?: number): Sprite {
        return this.register(name, sprites.create(image, kind));
    }
}

// DATA
class DataCompound {
    private prefix: string;

    public constructor(prefix: string) {
        this.prefix = prefix;
    }

    public finalize(path: string): string {
        return this.prefix + "#" + path;
    }

    public write(path: string, data: any) {
        let packedEntry = {
            data: data
        };

        settings.writeJSON(
            this.finalize(path),
            packedEntry
        );
    }

    public read(path: string): any {
        return settings.readJSON(this.prefix + "#" + path).data;
    }

    public export(): String[] {
        return settings.list(this.prefix);
    }
}

namespace DataHelper {
    export function getPrefixedPath(path: string, prefix: string): string {
        return prefix + "#" + path;
    }

    export function readAnon(path: string, prefix: string): any {
        return settings.readJSON(getPrefixedPath(path, prefix)).data;
    }

    export function readSrc(path: string, source: DataCompound): any {
        return source.read(path);
    }

    export function clearAll(prefix: string) {
        settings.clear();
    }

    export function targetedClear(path: string, prefix: string) {
        settings.remove(getPrefixedPath(path, prefix));
    }
}

// IMAGERY
class RenderLayer {
    private image: Image;
    private holder: Sprite;

    public constructor(width: number, height: number) {
        this.image = image.create(width, height);

        this.holder = sprites.create(
            this.image,
            SpriteKind.RenderElement
        );
    }

    public extract(): Image {
        return this.image;
    }

    public access(): Sprite {
        return this.holder;
    }
}

class ExecutableRenderLayer {
    private image: Image;
    private holder: Sprite;

    private renderState: boolean;

    public constructor(width: number, height: number) {
        this.image = image.create(width, height);

        this.renderState = false;
    }

    public extract(): Image {
        return this.image;
    }

    public access(): Sprite {
        if (this.holder != null) {
            return this.holder;
        }
        return null;
    }

    public execute(state: boolean) {
        if (state) {
            if (this.holder == null) {
                this.holder = sprites.create(this.image, SpriteKind.RenderElement);
                this.renderState = true;
            } else {
                throw Exception.of("Attempting to create existing ExecutableRenderLayer!");
            }
        } else {
            if (this.holder != null) {
                sprites.destroy(this.holder);
                this.renderState = false;
            } else {
                throw Exception.of("Attempting to destroy non-existing ExecutableRenderLayer!");
            }
        }
    }

    public getRenderState(): boolean {
        return this.renderState;
    }
}

function createImage(width: number, height: number, preColor?: number) {
    let toReturn = image.create(width, height);
    toReturn.fill(preColor);
    return toReturn;
}

// TIME
class Countdown {
    private duration: number;

    private end: () => void;
    private tick: () => void;

    public constructor(duration: number) {
        this.duration = duration;
    }

    public onTick(f: () => void) {
        this.tick = f;
    }

    public onEnd(f: () => void) {
        this.end = f;
    }

    public begin() {
        forever(function () {
            if (this.duration > 0) {
                this.duration -= 1;
                if (this.tick != null) {
                    this.tick();
                }

                if (this.duration == 0) {
                    if (this.end != null) {
                        this.end();
                    }
                }
            }
        });
    }

    public getCurrentDuration(): number {
        return this.duration;
    }

    public pauseUntilCompleted() {
        pause(this.duration);
    }
}

// END
const Coil = new Game(
    "Coil",
    {
        author: "Chemthunder",
        version: 1.2,
        license: "ARR",
        desc: "A compact library of commonly used utilities by Chemthunder."
    }
);