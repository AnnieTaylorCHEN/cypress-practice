import { navigateTo } from "../support/page_objects/navigationPage";
import { onFormLayoutsPage } from "../support/page_objects/formLayoutsPage";
import { onDatepickerPage } from "../support/page_objects/datepickerPage";
import { onSmartTablePage } from "../support/page_objects/smartTablePage";

describe("Test with Page Objects", () => {
  beforeEach("open application", () => {
    cy.openHomePage();
  });

  it("verify navigations across the pages", () => {
    navigateTo.formLayoutPage();
    navigateTo.datepickerPage();
    navigateTo.smartTablePage();
    navigateTo.tooltipPage();
    navigateTo.toasterPage();
  });

  it.only("should submit Inline and Basic form and selection tomorrow date in the calendar", () => {
    navigateTo.formLayoutPage();
    onFormLayoutsPage.submitInlineFormwithNameAndEmail(
      "Ashley",
      "ashley@bean.com"
    );
    onFormLayoutsPage.submitBasicFormwithEmailAndPassword(
      "ashely@bean.com",
      "password"
    );
    navigateTo.datepickerPage();
    onDatepickerPage.selectCommonDatepickerDateFromToday(7);
    onDatepickerPage.selectDatepickerWithRangeFromToday(7, 14);
    navigateTo.smartTablePage();
    onSmartTablePage.addNewRecordWithFirstAndLastName("Ashley", "Bean");
    onSmartTablePage.updateAgeByFirstName("Ashley", 20);
    onSmartTablePage.deleteRowByIndex(1);
  });
});
