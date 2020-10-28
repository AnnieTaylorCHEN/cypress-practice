/// <reference types="cypress" />

describe('our first suite', ()=> {
    it('first test', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        //by tag name
        cy.get('input')

        //by id
        cy.get('#inputEmail1')

        //by class name
        cy.get('.input-full-width')

        //by attribute name
        cy.get('[placeholder]')

        //by class attribute name and value
        cy.get('[placeholder="Email"]')

        //by class value
        cy.get('[class="input-full-width size-medium shape-rectangle"]')

        //by tag name and attribute with value
        cy.get('input[placeholder="Email')

        //by two different attributes
        cy.get('input[placeholder="Email"]#inputEmail1.input-full-width')

        //the most recommended by Cypress is to create your own data-cy values
        cy.get('[data-cy="imputEmail1"]')
    })
})