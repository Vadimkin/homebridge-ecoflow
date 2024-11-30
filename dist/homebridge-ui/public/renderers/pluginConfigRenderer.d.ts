import { IContext, IRenderer } from '../interfaces/contracts';
export declare class PluginConfigRenderer {
    private readonly renderers;
    constructor(renderers: IRenderer[]);
    render(context: IContext): void;
}
