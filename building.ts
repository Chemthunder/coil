class PipelineDepo {
    private lines: Pipeline[];

    public constructor() {

    }

    public getPipelines(): Pipeline[] {
        return this.lines;
    }

    public bootstrapNew(l: Pipeline) {
        this.lines.push(l);
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

const Liner = new PipelineDepo();

class PostPipeline implements Pipeline {
    public constructor() {
        this.getDeployDepo().bootstrapNew(this);
    }

    public static StartPayload = new Payload();

    public getDeployDepo(): PipelineDepo {
        return Liner;
    }

    public getPayloads(): Payload[] {
        return [
            PostPipeline.StartPayload
        ];
    }

    public getId(): string {
        return "post";
    }

    public assemble() {
        PostPipeline.StartPayload.attach(function primaryThread() {
            enablePrint()
            print("Hi!");
        });
    }
}