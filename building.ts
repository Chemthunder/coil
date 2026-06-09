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
        pipelines.forEach(pipeline => {
            this.loadSingular(pipeline);
        });
    }

    public bootstrap() {
        this.lines.forEach(pipeline => {
            pipeline.assemble();
        });

        this.lines[0].getPayloads().forEach(load => {
            load.deploy();
        });
    }

    public bootstrapSpecific(id: number) {
        this.lines.forEach(pipeline => {
            pipeline.assemble();
        });

        this.lines[id].getPayloads().forEach(load => {
            load.deploy();
        });
    }
}

interface Pipeline {
    getPayloads(): Payload[];
    assemble(): void;
}