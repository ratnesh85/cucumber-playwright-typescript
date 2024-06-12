import basePage from "../../../utils/basePage";
import { faker } from '@faker-js/faker';

export default class workspacePage extends basePage {
    //#region selectors
    private menu_workspace = "//a[@id='testing']";
    private link_editInput = "//a[normalize-space()='Edit']";
    private textbox_fullName = "#fullName";

    //#endregion

    async clickWorkspace(){
        await this.click(this.menu_workspace);
    }

    async clickEditInput(){
        await this.click(this.link_editInput);
    }

    async enterFullName(){
        await this.type(this.textbox_fullName, faker.person.fullName());
    }
    
}