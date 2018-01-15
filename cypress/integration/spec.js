/* eslint-env mocha */
/* global cy */
const addScript = (document, src) => {
  // force immediate load
  document.write(`<script src="${src}"></script>`)
}
// load es6 module bundler from
// https://github.com/ModuleLoader/browser-es-module-loader
// we built the "dist" folder ourselves
beforeEach(() => {
  cy.visit('index.html', {
    onBeforeLoad: win => {
      addScript(win.document, 'dist/babel-browser-build.js') // must be first
      addScript(win.document, 'dist/browser-es-module-loader.js')
    }
  })
})

it('loads', () => {
  cy.contains('h1', '0')
  cy
    .contains('+')
    .click()
    .click()
  cy.contains('h1', '2')
})
