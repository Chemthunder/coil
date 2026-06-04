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

        print(`Loaded pipeline`, this.lines[0].getId());
    }
}

interface Pipeline {
    getDeployDepo(): PipelineDepo;

    getPayloads(): Payload[];
    getId(): string;

    assemble(): void;
}

// const Liner = new PipelineDepo();

// class PostPipeline implements Pipeline {
//     public StartPayload = new Payload();

//     public constructor() {
//         this.getDeployDepo().bootstrapNew(this);
//     }

//     public getDeployDepo(): PipelineDepo {
//         return Liner;
//     }

//     public getPayloads(): Payload[] {
//         return [
//             this.StartPayload
//         ];
//     }

//     public getId(): string {
//         return "post";
//     }

//     public assemble() {
//         this.StartPayload.attach(function primaryThread() {
//             enablePrint()
//             print("Hi!");
//         });
//     }
// }