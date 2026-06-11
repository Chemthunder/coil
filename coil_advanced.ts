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