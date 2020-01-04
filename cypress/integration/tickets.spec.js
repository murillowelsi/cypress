describe("Tickets", () => {
    beforeEach(() => cy.visit("https://bit.ly/2XSuwCW"))

    it("fills all the text input fields", () => {
        const firstName = "Murillo Welsi";
        const lastName = "de Souza Pereira";

        cy.get("#first-name").type(firstName);
        cy.get("#last-name").type(lastName);
        cy.get("#email").type("murillo.welsi@gmail.com");
        cy.get("#requests").type("Vegetarian");
        cy.get("#signature").type(`${firstName} ${lastName}`);
    });

    it("select two tickets", () => {
        cy.get("#ticket-quantity").select("2")
    });

    it("select VIP Ticket type", () => {
        cy.get("#vip").check();
    });

    it("selects all checkboxes,then uncheck social-media", () => {
        cy.get("#friend").check();
        cy.get("#publication").check();
        cy.get("#social-media").check();
        cy.get("#social-media").uncheck();
    });

    it("has 'TICKETBOX' header's heading", () => {
        cy.get("header h1").should("contain", "TICKETBOX");
    });

    it("alerts invalid e-mail", () => {
        cy.get("#email")
          .as("email")
          .type("murillo.welsi-gmail.com");

        cy.get("#email.invalid")
          .as("invalidEmail")
          .should("exist");

        cy.get("@email")
          .clear()
          .type("murillo.welsi@gmail.com")

        cy.get("invalidEmail").should("not.exist");
    });

    it("End to end test that fills and reset the form", () => {
        const firstName = "Murillo Welsi";
        const lastName = "de Souza Pereira";
        const fullName = `${firstName} ${lastName}`

        cy.get("#first-name").type(firstName);
        cy.get("#last-name").type(lastName);
        cy.get("#email").type("murillo.welsi@gmail.com");
        cy.get("#ticket-quantity").select("2")
        cy.get("#vip").check();
        cy.get("#friend").check();
        cy.get("#publication").check();
        cy.get("#requests").type("IPA beer");
        cy.get("#agree").click(); //pode usar o check também
        cy.get("#signature").type(fullName);

        cy.get(".agreement p").should(
            "contain",
            `I, ${fullName}, wish to buy 2 VIP tickets.`
        );

        cy.get("button[type='submit']")
          .as("submitButton")
          .should("not.be.disabled");

        cy.get("button[type='reset']").click();

        cy.get("@submitButton").should("be.disabled");
    });

    it("fills mandatory fields using support commands", () => {
        const customer = {
            firstName: "Murillo",
            lastName: "Welsi",
            email: "murillo.welsi@gmail.com"
        };

        cy.fillMandatoryFields(customer);

        cy.get("button[type='submit']")
          .as("submitButton")
          .should("not.be.disabled");

        cy.get("#agree").uncheck();

        cy.get("@submitButton").should("be.disabled");
    });
});