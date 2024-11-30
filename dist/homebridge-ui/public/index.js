(()=>{"use strict";var e={999:(e,i)=>{Object.defineProperty(i,"__esModule",{value:!0}),i.ComponentRenderer=void 0,i.ComponentRenderer=class{renderTextBox(e,i,n,r,t){const o='\n    <div class="form-group">\n      <label for="device{id}" class="{requiredClass}">{title}</label>\n      <input type="text" class="form-control" id="device{id}" placeholder="{description}" required="{required}" />\n    </div>'.replace(/{id}/g,i).replace(/{title}/g,n.title).replace(/{description}/g,n.description??"").replace(/{requiredClass}/g,n.required?"required-label":"").replace(/{required}/g,(n.required??!1).toString());e.append(o);const a=e.find(`#device${i}`);a.val(r),a.on("change",(()=>t(a.val()?.toString()||"")))}renderDropDown(e,i,n,r,t){const o='\n    <div class="form-group">\n      <label for="device{id}" class="{requiredClass}">{title}</label>\n      <select class="form-control" id="device{id}" required="{required}"></select>\n    </div>'.replace(/{id}/g,i).replace(/{title}/g,n.title).replace(/{requiredClass}/g,n.required?"required-label":"").replace(/{required}/g,(n.required??!1).toString());e.append(o);const a=e.find(`#device${i}`);n.enum.forEach((e=>{const i=$("<option>").val(e).text(e);a.append(i)})),a.val(r),a.on("change",(()=>t(a.val()?.toString()||"")))}}},84:(e,i,n)=>{Object.defineProperty(i,"__esModule",{value:!0}),i.PluginConfigDevicesRenderer=void 0;const r=n(536);class t extends r.PluginConfigRendererBase{form;$tabs;$tabPanels;_hideDeviceSettingsPerModel;constructor(e){super(e),this.$tabs=$("#devicesTabs"),this.$tabPanels=$("#devicesPanels"),this._hideDeviceSettingsPerModel={"Delta 2":["powerStream"],"Delta 2 Max":["powerStream"],"Delta Pro":["powerStream"],"Delta Pro Ultra":["powerStream"],PowerStream:["battery"]}}get hideDeviceSettingsPerModel(){return this._hideDeviceSettingsPerModel}render(e){this.renderDevicesSettings({homebridgeProvider:e.homebridgeProvider,configSchema:e.configSchema,configuration:e.configuration,hideDeviceSettingsPerModel:this.hideDeviceSettingsPerModel})}renderDevicesSettings(e,i){$("#devicesLabel").text(e.configSchema.schema.properties.devices.title);const n=!i||i<0?0:i;this.renderDeviceTabs(e,n)}renderDeviceTabs(e,i){this.clearDeviceTabs();const n='\n      <li class="nav-item">\n        <a class="nav-link {activeClass}" data-toggle="tab" href="#deviceTabPanel{index}" id="deviceTab{index}">{name}</a>\n      </li>\n    ';e.configuration.devices.forEach(((r,t)=>{const o=n.replace(/{activeClass}/g,t===i?"active":"").replace(/{index}/g,t.toString()).replace(/{name}/g,r.name??`Device${t+1}`);this.$tabs.append(o),this.renderDeviceTabPanel(e,r,t,i,this.$tabs.find(`#deviceTab${t}`))})),this.renderAddNewDeviceTab(n,e)}clearDeviceTabs(){this.$tabs.empty(),this.$tabPanels.empty(),this.form?.end()}renderAddNewDeviceTab(e,i){const n=e.replace(/{activeClass}/g,"").replace(/{index}/g,"Add").replace(/{name}/g,"Add Device");this.$tabs.append(n),this.$tabs.find("#deviceTabAdd").on("click",(()=>{i.configuration.devices.push(this.getDefaultDeviceConfiguration(i.configSchema)),this.renderDevicesSettings(i,i.configuration.devices.length-1)}))}renderDeviceTabPanel(e,i,n,r,t){const o='\n    <div class="tab-pane container fade {activeClass} card card-body list-group-item" id="deviceTabPanel{index}">\n      <button type="button" class="close pull-right" id="deviceTabPanelClose{index}">\n        <span>×</span>\n        <span class="sr-only">Close</span>\n      </button>\n    </div>\n  '.replace(/{activeClass}/g,n===r?"in show active":"").replace(/{index}/g,n.toString());this.$tabPanels.append(o);const a=this.$tabPanels.find(`#deviceTabPanel${n}`),s=this.clone(e.configSchema.schema.properties.devices.items),d=s.properties.model;this.renderModelDropDown(t,a,n,e,s,d,i),this.renderRemoveButton(a,n,e),this.renderForm(t,n,r,e,s,i)}renderModelDropDown(e,i,n,r,t,o,a){this.componentRenderer.renderDropDown(i,"model"+n,o,a.model,(i=>{a.model=i,this.renderForm(e,n,n,r,t,a)}))}renderRemoveButton(e,i,n){e.find(`#deviceTabPanelClose${i}`).on("click",(()=>{n.configuration.devices.splice(i,1),this.renderDevicesSettings(n,i-1)}))}renderForm(e,i,n,r,t,o){delete(t=this.clone(t)).properties.model,r.hideDeviceSettingsPerModel[o.model].forEach((e=>{delete t.properties[e]})),e.off("click").on("click",(()=>{this.form?.end(),this.form=r.homebridgeProvider.createForm({schema:t},o),this.form.onChange((async n=>{const t=r.configuration.devices[i].name;this.applyChanges(r.configuration.devices[i],n,["model"]),await this.updatePluginConfig(r),n.name!==t&&e.text(n.name)}))})),i===n&&e.trigger("click")}getDefaultDeviceConfiguration(e){const i={},n=e.schema.properties.devices.items.properties;return Object.keys(n).filter((e=>!!n[e]?.default)).forEach((e=>{i[e]=n[e]?.default})),i}applyChanges(e,i,n){Object.assign(e,i);for(const r in e)void 0!==i[r]||n.includes(r)||delete e[r]}}i.PluginConfigDevicesRenderer=t},102:(e,i,n)=>{Object.defineProperty(i,"__esModule",{value:!0}),i.PluginConfigNameRenderer=void 0;const r=n(536);class t extends r.PluginConfigRendererBase{render(e){this.componentRenderer.renderTextBox($("#generalSettings"),"name",e.configSchema.schema.properties.name,e.configuration.name,(async i=>{e.configuration.name=i,await this.updatePluginConfig(e)}))}}i.PluginConfigNameRenderer=t},653:(e,i)=>{Object.defineProperty(i,"__esModule",{value:!0}),i.PluginConfigRenderer=void 0,i.PluginConfigRenderer=class{renderers;constructor(e){this.renderers=e}render(e){void 0===e.configuration&&(e.configuration={name:void 0,devices:[]}),this.renderers.forEach((i=>i.render(e)))}}},536:(e,i)=>{Object.defineProperty(i,"__esModule",{value:!0}),i.PluginConfigRendererBase=void 0,i.PluginConfigRendererBase=class{componentRenderer;constructor(e){this.componentRenderer=e}async updatePluginConfig(e){const i=this.clone(e.configuration);delete i.platform,await e.homebridgeProvider.updatePluginConfig([i])}clone(e){return JSON.parse(JSON.stringify(e))}}}},i={};function n(r){var t=i[r];if(void 0!==t)return t.exports;var o=i[r]={exports:{}};return e[r](o,o.exports,n),o.exports}(()=>{const e=n(999),i=n(84),r=n(102),t=n(653);window.renderEcoFlowPluginConfig=async function(n){const o=await n.getPluginConfig(),a=await n.getPluginConfigSchema(),s=o[0],d=new e.ComponentRenderer;new t.PluginConfigRenderer([new r.PluginConfigNameRenderer(d),new i.PluginConfigDevicesRenderer(d)]).render({homebridgeProvider:n,configuration:s,configSchema:a})}})()})();