class PipelineDepo {
    private lines: Pipeline[];

    public constructor() {
        this.lines = [];
    }

    public getPipelines(): Pipeline[] {
        return this.lines;
    }

    public bootstrapNew(l: Pipeline) {
        this.lines.push(l);
    }

    public import(pipelines: Pipeline[]) {
        pipelines.forEach(pipeline => {
            this.bootstrapNew(pipeline);
        });
    }

    public lockAndLoad() {
        this.lines.forEach(pipeline => {
            pipeline.assemble();
        });

        this.lines[0].getPayloads().forEach(load => {
            load.deploy();
        });
    }
}

interface Pipeline {
    getDeployDepo(): PipelineDepo;

    getPayloads(): Payload[];
    getId(): string;

    assemble(): void;
}