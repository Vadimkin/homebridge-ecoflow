import { IContext, IRenderer } from '../interfaces/contracts';
import { ComponentRenderer } from './componentRenderer';
export declare abstract class PluginConfigRendererBase implements IRenderer {
    protected readonly componentRenderer: ComponentRenderer;
    constructor(componentRenderer: ComponentRenderer);
    abstract render(context: IContext): void;
    protected updatePluginConfig(context: IContext): Promise<void>;
    protected clone<TObject>(obj: TObject): TObject;
}
