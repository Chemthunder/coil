// LOGGING
/**
 * Enables the on-screen console for printing.
 */
function enablePrint() {
    game.consoleOverlay.setVisible(
        true,
        1
    );

    OnPrintEnabled.deploy();
}

/**
 * Prints a value to the console.
 * @param message The message to print.
 */
function print(message: any, value?: any) {
    if (value != null) {
        console.logValue(
            message,
            value
        );
    } else {
        console.log(message);
    }

    OnPrint.deploy();
}

// MIXIN
namespace SpriteKind {
    export const RenderElement = SpriteKind.create();
    export const Placeholder = SpriteKind.create();
    export const GuiElement = SpriteKind.create();
}

// SYSTEM
namespace Exception {
    /**
     * Completes and throws an Exception when combined with throw.
     * @param reason The reason for the Exception to be thrown.
     */
    export function of(reason: string): string {
        return reason;
    }
}

namespace Dispatcher {
    /**
     * Gets the current game scene.
     */
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
        this.core.shake(
            amplitude,
            duration
        );
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
    /**
     * Creates and returns game meta data as a json.
     * @param author The author of the game.
     * @param version The version of the game.
     * @param license The license of the game.
     * @param desc The description of the game.
     */
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

class Entries {
    private entries: RegistryEntry<any>[];

    private constructor() {
        this.entries = [];
    }

    public static create() {
        return new Entries();
    }

    public register<V>(id: string, obj: V): V {
        let packedEntry = new RegistryEntry<V>(
            id,
            obj
        );

        this.entries.push(packedEntry);
        OnRegister.deploy();
        return obj;
    }

    public getCoreEntries(): RegistryEntry<any>[] {
        return this.entries;
    }

    public getEntries(): any[] {
        let l: any[] = [];

        this.entries.forEach(value => {
            l.push(value.getObj());
        });
        
        return l;
    }

    public lookup(id: string): any {
        for (let e of this.entries) {
            if (e.getId() == id) {
                return e.getObj();
                break;
            }
        }

        return null;
    }

    public sprite(name: string, image: Image, kind?: number): Sprite {
        return this.register(
            name,
            sprites.create(
                image,
                kind
            )
        );
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
        return settings.readJSON(
            this.prefix + "#" + path
        ).data;
    }

    public export(): String[] {
        return settings.list(this.prefix);
    }
}

namespace DataHelper {
    /**
     * Returns a prefixed data path.
     * @param path The path to use.
     * @param prefix The prefix for the path.
     */
    export function getPrefixedPath(path: string, prefix: string): string {
        return prefix + "#" + path;
    }

    /**
     * Gets the value of a Data Compound bit.
     * @param path The path to check.
     * @param prefix The prefix of the Data Compound.
     */
    export function read(path: string, prefix: string): any {
        return settings.readJSON(
            getPrefixedPath(
                path,
                prefix
            )
        ).data;
    }

    /**
     * Clears all saved settings.
     */
    export function clearAll() {
        settings.clear();
    }

    /**
     * Clears a specific Data Compound bit.
     * @param path The bit to clear.
     * @param prefix The prefix of the Data Compound.
     */
    export function targetedClear(path: string, prefix: string) {
        settings.remove(
            getPrefixedPath(
                path,
                prefix
            )
        );
    }
}

// IMAGERY
/**
 * Creates and renders an image on the screen.
 */
class ScreenImage {
    private image: Image;
    private holder: Sprite;

    public constructor(width: number, height: number) {
        this.image = image.create(
            width,
            height
        );

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

/**
 * Same as ${@link ScreenImage}, but can be toggled on or off.
 */
class ToggleableScreenImage {
    private image: Image;
    private holder: Sprite;

    private renderState: boolean;

    public constructor(width: number, height: number) {
        this.image = image.create(
            width,
            height
        );

        this.renderState = false;
    }

    public extract(): Image {
        return this.image;
    }

    public access(): Sprite {
        return this.holder != null ? this.holder : null;
    }

    public execute(state: boolean) {
        if (state) {
            if (this.holder == null) {
                this.holder = sprites.create(
                    this.image,
                    SpriteKind.RenderElement
                );

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

        OnToggleableExecuted.deploy();
    }

    public getRenderState(): boolean {
        return this.renderState;
    }
}

/**
 * Creates an image from the given parameters.
 * @param width The width of the image.
 * @param height The height of the image.
 */
function createImage(width: number, height: number, preColor?: number) {
    let toReturn = image.create(
        width,
        height
    );

    toReturn.fill(preColor);
    return toReturn;
}

/**
 * Replaces all pixels of the target color with the attached color.
 * @param img The image to set.
 * @param target The color to target.
 * @param attach The color to replace with.
 */
function replaceColor(img: Image, target: number, attach: number) {
    for (let w = 0; w < img.width; w++) {
        for (let h = 0; h < img.height; h++) {
            const pixel = img.getPixel(
                w,
                h
            );

            if (pixel == target) {
                img.setPixel(
                    w,
                    h,
                    attach
                );
            }
        }
    }
}

/**
 * Replaces all non-transparent pixels with a given color.
 * @param img The image to set.
 * @param toSet The color to apply.
 */
function replaceAllNonTransparent(img: Image, toSet: number) {
    for (let w = 0; w < img.width; w++) {
        for (let h = 0; h < img.height; h++) {
            const pixel = img.getPixel(
                w,
                h
            );

            if (pixel != game.Color.Transparent) {
                img.setPixel(
                    w,
                    h,
                    toSet
                );
            }
        }
    }
}

// SPRITE
/**
 * Applies the given flags to a sprite.
 * @param sprite The sprite to apply to.
 * @param flags The flags to apply.
 */
function applyFlags(sprite: Sprite, flags: SpriteFlag[]) {
    for (let flag of flags) {
        sprite.setFlag(
            flag,
            true
        );
    }
}

// CONFIG
/**
 * A property for config.
 */
class Property<T> {
    private name: string;
    private value: T;

    public constructor(name: string, value: T) {
        this.name = name;
        this.value = value;
    }

    public getName(): string {
        return this.name;
    }

    public getValue(): T {
        return this.value;
    }

    public static of<T>(name: string, value: T): Property<T> {
        return new Property<T>(
            name,
            value
        );
    }
}

/**
 * A configuration menu that can be exported as a JSON.
 */
class Config {
    private values: Property<any>[];
    private core: any;

    public constructor() {
        this.values = [];

        this.core = {};
    }

    public write<T>(s: string, v: T): void {
        this.values.push(
            Property.of(
                s,
                v
            )
        );
        OnConfigWritten.deploy();
    }

    public writeEntries(p: Property<any>[]) {
        this.values = p;

        p.forEach(value => {
            OnConfigWritten.deploy();
        });
    }

    public sync(): void {
        let loader = new JsonObject();

        this.values.forEach(value => {
            loader.import(
                value.getName(),
                value.getValue()
            );
        });

        this.core = loader.export();
    }

    public fetch(id: string) {
        return this.core[id];
    }

    public dispatch(): any {
        return this.core;
    }
}

// OTHER
/**
 * A function that can be stored with code, then run at any time.
 */
class Runnable {
    private toRun: () => void;

    public constructor(toRun: () => void) {
        this.toRun = toRun;
    }

    public run() {
        this.toRun();
    }
}

/**
 * A collection of functions that can all be run at any time.
 */
class Payload {
    private operations: Function[];

    public constructor() {
        this.operations = [];
    }

    public attach(value: () => void) {
        this.operations.push(value);
    }

    public deploy() {
        this.operations.forEach(value => {
            value();
        });
    }
}

/**
 * Used to build a JSON from parameters.
 */
class JsonObject {
    private core: any;

    public constructor() {
        this.core = {};
    }

    public import(id: string, value: any) {
        this.core[id] = value;
    }

    public delete(id: string) {
        delete this.core[id];
    }

    public export() {
        return this.core;
    }
}

/**
 * If the given value is null, runs the function. Otherwise, returns the value.
 * @param value The value to check.
 * @param ifNull The function to run if the value is null.
 */
function requireNonNull<T>(value: T, ifNull: () => void): T {
    if (value == null) {
        ifNull();
        return null;
    } else {
        return value;
    }
}

// EVENTS
const OnRegister = new Payload();
const OnToggleableExecuted = new Payload();
const OnConfigWritten = new Payload();
const OnPrint = new Payload();
const OnPrintEnabled = new Payload();

scene.createRenderable(5, handler => {
    let size = 30;

    handler.fillCircle(
        screen.width / 2,
        screen.height / 2,
        size + (size / 6) + 5,
        5
    );
    
    handler.fillCircle(
        screen.width / 2,
        screen.height / 2,
        size + (size / 6),
        1
    );

    handler.fillCircle(
        screen.width / 2,
        screen.height / 2,
        size,
        15
    );

});