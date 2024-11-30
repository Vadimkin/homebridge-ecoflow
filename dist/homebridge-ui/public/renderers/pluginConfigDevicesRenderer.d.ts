import { IContext } from '../interfaces/contracts';
import { ComponentRenderer } from './componentRenderer';
import { PluginConfigRendererBase } from './pluginConfigRendererBase';
export declare class PluginConfigDevicesRenderer extends PluginConfigRendererBase {
    private form;
    private readonly $tabs;
    private readonly $tabPanels;
    private readonly _hideDeviceSettingsPerModel;
    constructor(componentRenderer: ComponentRenderer);
    get hideDeviceSettingsPerModel(): Record<string, string[]>;
    render(context: IContext): void;
    private renderDevicesSettings;
    private renderDeviceTabs;
    private clearDeviceTabs;
    private renderAddNewDeviceTab;
    private renderDeviceTabPanel;
    private renderModelDropDown;
    private renderRemoveButton;
    private renderForm;
    private getDefaultDeviceConfiguration;
    private applyChanges;
}
