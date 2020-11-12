/// <reference types="cypress" />

describe("Test with backend", () => {
  beforeEach("Login to the app", () => {
      cy.server()
      cy.route('GET', '**/tags', 'fixture:tags.json')
    cy.loginToApp();
  });

  it("verfiy correct request and response", () => {
    //we start a server, then listen to post request on endpoint that would end with articles, then we save it as postArticles object

    cy.server();
    cy.route("POST", "**/articles").as("postArticles");

    cy.contains("New Article").click();
    cy.get('[formcontrolname="title"]').type("this is a title");
    cy.get('[formcontrolname="description"]').type("this is description");
    cy.get('[formcontrolname="body"]').type("this is the body of the article");
    cy.contains("Publish Article").click();

    //important not to forget the @
    cy.wait("@postArticles");
    cy.get("@postArticles").then((xhr) => {
      expect(xhr.status).to.equal(200);
      expect(xhr.request.body.article.body).to.equal(
        "this is the body of the article"
      );
      expect(xhr.response.body.article.description).to.equal("this is description")
    });
  });

  it('should give tags with routing object', ()=> {
      cy.get('.tag-list')
      .should('contain', 'red')
      .and('contain', 'blue')
      .and('contain', 'green')
  })

  it('verify global feed likes count', ()=> {
      cy.route('GET', '**/articles/feed*', '{"articles":[],"articlesCount":0}')
      cy.route('GET', '**/articles*', 'fixture:articles.json')

      cy.contains('Global Feed').click()

      cy.get('app-article-list button').then( listOfButtons => {
          expect(listOfButtons[0]).to.contain('1')
          expect(listOfButtons[1]).to.contain('5')
      })

      cy.fixture('articles').then( file => {
          const articleLink = file.articles[1].slug
          cy.route('POST', '**/articles/'+articleLink+'/favorite', file)

          cy.get('app-article-list button').eq(1).click().should('contain', '6')
      })
  })

  it('create a new article and delete it from a global feed', ()=> {
    const userCredentials = {
      "user": {
        "email": "meow@cat.com",
        "password": "passwordmeow"
      }
    }

    const bodyRequest = {
      "article": {
        "tagList": [],
        "title": "meowwwmwooowmmmmeeeow",
        "description": "this is a description",
        "body":"this is the body of the article"
      }
    }

    cy.get('@token').then( token => {
      
      cy.request({
        url: Cypress.env('apiUrl') + 'api/articles',
        headers: {
          'Authorization': 'Token '+ token
        },
        method: "POST",
        body:bodyRequest
      }).then( res => {
        expect(res.status).to.equal(200)
      })

      cy.contains('Global Feed').click()
      cy.get('.article-preview').first().click()
      cy.get('.article-actions').contains('Delete Article').click()

      cy.request({
        url:Cypress.env('apiUrl') + 'api/articles?limit=10&offset=0',
        headers: {
          'Authorization': 'Token ' + token
        },
        method: 'GET'
      }).its('body').then( body => {
        expect(body.articles[0].title).not.to.equal('meowwwmwooowmmmmeeeow')
      })
    })
  })
});
