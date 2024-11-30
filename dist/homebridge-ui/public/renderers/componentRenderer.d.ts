import { ChangedCallbackHandler } from '../interfaces/contracts';
import { PluginConfigSchemaEnum, PluginConfigSchemaObject } from '../interfaces/homebridge';
export declare class ComponentRenderer {
    renderTextBox($parent: JQuery, id: string, schemaProperty: PluginConfigSchemaObject, value: string, onChangeCallback: ChangedCallbackHandler): void;
    renderDropDown($parent: JQuery, id: string, schemaProperty: PluginConfigSchemaEnum, value: string, onChangeCallback: ChangedCallbackHandler): void;
}
