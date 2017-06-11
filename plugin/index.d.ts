export interface InitalizeOptions {
    logLevel?: string;
    containerId: string;
}

export function initalize(options: InitalizeOptions): void;
export function log(options: any): void;