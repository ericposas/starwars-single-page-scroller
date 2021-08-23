window.onload = function() {
  
  (function(){

    const kettle_app = {
      section: null,
      linkHistory: [],
      buttonClick: false
    };

    if (kettle_app.section === null) {
      tweenScrollElement(document.getElementById('section-1'));
    }

    let navBtns = document.querySelectorAll('header nav ul li a');
    let footerBtns = document.querySelectorAll('footer nav ul li a');
    let sectionHeaders = document.querySelectorAll('main section h3');

    window.addEventListener('resize', function() {
      if (location.hash && location.hash != '') {
        // console.log('resize triggered', 'window location: ', location.hash);
        let substring = location.hash.substr(1, location.hash.length);
        let elt = document.getElementById(substring);
        window.scrollTo(elt.offsetLeft, elt.offsetTop - calcGap());
      } else {
        let section1 = document.getElementById('section-1');
        window.scrollTo(section1.offsetLeft, section1.offsetTop - calcGap());
      }
    });
    
    window.addEventListener('hashchange', function(e) {
      e.preventDefault();
      if (kettle_app.buttonClick === false) {
        let selector = location.hash.substr(1, location.hash.length);
        let element = document.getElementById(selector);
        console.log(selector);
        if (selector !== 'section-1') {
          scrollTo(element.offsetLeft, element.offsetTop - calcGap());
        } else {
          tweenScrollElement(element);
        }
      }
    });

    // handle scroll active states
    window.addEventListener('scroll', handleScroll);

    Array.prototype.forEach.call(footerBtns, function(btn) {
      btn.onclick = function(e) {
        e.preventDefault();
        kettle_app.buttonClick = true;
        let element = document.getElementById(btn.href.substr(-9, 9));
        scrollTo(element.offsetLeft, element.offsetTop - calcGap());
        kettle_app.buttonClick = false;
      };
    });

    function setActiveBtn(btn) {
      // remove all active btn classes 
      Array.prototype.forEach.call(navBtns, function(_btn){
        _btn.classList.remove('btn-active');
        _btn.parentNode.classList.remove('btn-active');
      });
      // set active 
      btn.classList.add('btn-active');
      btn.parentNode.classList.add('btn-active');
    }

    function setActiveSection(header) {
      Array.prototype.forEach.call(sectionHeaders, function(section) {
        section.classList.remove('section-header-active');
      });
      header.parentElement.getElementsByTagName('h3')[0].classList.add('section-header-active');
    }

    function handleScroll() {
      let scrollPositions = Array.prototype.map.call(sectionHeaders, function(header) {
        return header.offsetTop
      });
      // console.log(scrollPositions);
      scrollPositions.forEach(function(pos, idx) {
        if (window.scrollY > scrollPositions[idx] - 100 - calcGap()) {
          // console.log(window.scrollY);
          setActiveBtn(navBtns[idx]);
          setActiveSection(sectionHeaders[idx]);
          let sectionString = sectionHeaders[idx].parentElement.getElementsByTagName('a')[0].id;
          kettle_app.linkHistory.push(sectionString);
          kettle_app.section = sectionString;
        }
      })
      // set timeout to know when scrolling is done
      if (location.hash != `#${kettle_app.section}`) {
        if(history.pushState) {
          history.pushState(null, null, `#${kettle_app.section}`);
        } else {
          location.hash = `#${kettle_app.section}`;
        }
      }
    }

    function calcGap() {
      if (innerWidth > 1025) {
        return 325;
      }
      if (innerWidth > 768) {
        return 100;
      }
      return 160;
    }

    function tweenScrollElement(element) {
      let tweenObj = { steps: 0, position: 0 };
      scrollTo(element.offsetLeft, window.scrollY + calcGap());
      tweenObj.position = window.scrollY;
      TweenLite.to(tweenObj, 1, {
        position: element.offsetTop,
        onStart: function() {
          kettle_app.buttonClick = true;
        },
        onUpdate: function() {
          scrollTo(element.offsetLeft, tweenObj.position - calcGap());
        },
        onComplete: function() {
          kettle_app.buttonClick = false;
        },
        ease: Power3.easeOut
      });
    }

    // handle button-click active states
    Array.prototype.forEach.call(navBtns, function(btn) {
      function onclick(event) {
        event.preventDefault();
        let btn = event.target;
        setActiveBtn(btn);
        // tween scrolling
        let id = event.target.href.substr(-9, 9); // id to scroll to
        let scrollToElement = document.getElementById(id);
        setActiveSection(scrollToElement);
        let history = kettle_app.linkHistory;
        tweenScrollElement(scrollToElement);
        history.push(id);
      };
      btn.addEventListener('click', onclick.bind(btn));
    });

  }());

};