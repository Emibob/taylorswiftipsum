(function() {
  "use strict";

  var $fixture;

  beforeEach(function() {
    $fixture = $("<div id='fixture' />").appendTo(document.body);
  });

  afterEach(function() {
    $fixture.remove();
  });

  jasmine.setFixture = function setFixture(element) {
    $fixture.html(element);
  };

  jasmine.getHtml2jsFixture = function getHtml2jsFixture(fixtureName) {
    var fullPath = 'test/helpers/fixtures/' + fixtureName,
      fixture = window.__html__[fullPath];

    if (/\.json$/.test(fullPath)) {
      fixture = JSON.parse(fixture);
    }

    return fixture;
  };
})();