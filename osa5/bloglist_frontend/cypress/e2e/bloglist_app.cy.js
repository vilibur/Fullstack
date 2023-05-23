describe('Blog app', function() {

    beforeEach(function() {
        cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
        const user = {
            name: 'Vili Kurppa',
            username: 'vilibur',
            password: 'salainen'
        }
        cy.request('POST', `${Cypress.env('BACKEND')}/users/`, user)
        cy.visit('')
    })

    it('Login form is shown', function() {
        cy.contains('login')
    })
    
    describe('Login', function() {
        beforeEach(function() {
            
        })
        it('succeeds with correct credentials', function() {
            cy.contains('login').click()
            cy.get('#username').type('vilibur')
            cy.get('#password').type('salainen')
            cy.get('#login-button').click()

            cy.contains('Vili Kurppa logged in')
        })
        it('fails with wrong credentials', function() {
            cy.contains('login').click()
            cy.get('#username').type('vilibur')
            cy.get('#password').type('eitama')
            cy.get('#login-button').click()

            cy.get('.error').should('contain', 'wrong username or password')
        })
        describe('When logged in', function() {
            
            beforeEach(function() {
                cy.login(
                    {
                        username: 'vilibur',
                        password: 'salainen'
                    }
                )
            })

            it('A blog can be created', function() {
                cy.contains('create new blog').click()
                cy.get('#title').type('How to test with Cypress')
                cy.get('#author').type('hackerman')
                cy.get('#url').type('www.google.com')
                cy.get('#addblog').click()

                cy.contains('How to test with Cypress') 
            })
            
                describe('Bloglist', function() {

                    beforeEach(function() {
                        cy.createBlog({
                            title: 'How to test with Cypress',
                            author: 'hackerman',
                            url: 'www.google.com'
                        })
                    })
                    
                    it('A blog can be liked', function() {
                        cy.contains('view').click()
                        cy.get('.likebutton').click()
                        cy.contains('likes 1')
                    })

                    it('User can remove their own blog', function() {
                        cy.contains('view').click()
                        cy.get('.removebutton').click() 
                    })

                    it('Users cant see remove buttons of each others blogs', function() {
                        cy.contains('logout').click()

                        const user = {
                            name: 'Vili Kurppa2',
                            username: 'toinenkayttaja',
                            password: 'salainen'
                        }
                        cy.request('POST', `${Cypress.env('BACKEND')}/users/`, user)

                        cy.login(
                            {
                                username: 'toinenkayttaja',
                                password: 'salainen'
                            }
                        )

                        cy.contains('view').click()
                        cy.get('.removebutton').should('not.be.visible')
                    })
                    
                    it('Is arranged by number of likes', function() {
                        
                        cy.createBlog({
                            title: 'Should be second',
                            author: 'hackerman',
                            url: 'www.google.com'
                        })
                        
                        cy.createBlog({
                            title: 'Should be first',
                            author: 'hackerman',
                            url: 'www.google.com'
                        })

                        cy.contains('Should be second hackerman')

                        cy.get('.viewbutton').click({ multiple: true })
                        cy.contains('Should be first').find('.likebutton').click().click()
                        cy.contains('Should be second').find('.likebutton').click()
                        cy.visit('')

                        cy.get('.blog').eq(0).should('contain', 'Should be first')
                        cy.get('.blog').eq(1).should('contain', 'Should be second')
                    })
                })
          
            
        })
    })
})