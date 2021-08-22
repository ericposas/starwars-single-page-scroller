window.onload = function() {

  window.addEventListener('resize', function() {
    if (location.hash && location.hash != '') {
      console.log('resize triggered', 'window location: ', location.hash);
      let substring = location.hash.substr(1, location.hash.length);
      let elt = document.getElementById(substring);
      window.scrollTo(elt.offsetLeft, elt.offsetTop);
    } else {
      window.scrollTo(
        document.getElementById('section-1').offsetLeft,
        document.getElementById('section-1').offsetTop
      );
    }
  });

  (function(){
    kettle_app = {
      section: 'section-1',
      linkHistory: []
    };
    let navBtns = document.querySelectorAll('header nav ul li a');
    let sectionHeaders = document.querySelectorAll('main section h3');
    handleScroll(); // call once to set active menu item
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
      console.log(scrollPositions);
      scrollPositions.forEach(function(pos, idx) {
        if (window.scrollY > scrollPositions[idx] - 200) {
          console.log(window.scrollY);
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
    // handle scroll active states
    window.addEventListener('scroll', handleScroll);
    function tweenScrollElement(element) {
      let tweenObj = { steps: 0, position: 0 };
      scrollTo(element.offsetLeft, window.scrollY);
      tweenObj.position = window.scrollY;
      TweenLite.to(tweenObj, 1, {
        position: element.offsetTop,
        onUpdate: function() {
          scrollTo(element.offsetLeft, tweenObj.position);
        },
        ease: Power3.easeOut
      });
    }
    // handle button-click active states
    Array.prototype.forEach.call(navBtns, function(btn) {
      function onclick(event) {
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