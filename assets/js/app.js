

;(function () {

    var lazyLoadInstance = new LazyLoad({
        elements_selector: ".lazy"
      });

})();
;(function () {

    var ibg = document.querySelectorAll(".ibg");
    for (var i = 0; i < ibg.length; i++) {
        if (ibg[i].querySelector('img')) {
            ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';
        }
    }

})();

;(function () {

    window.myLib = {};
    
    window.myLib.body = document.querySelector('body');
    
    
    window.myLib.closestAttr = function (item, attr) {
        var node = item;
    
        while (node) {
            var attrValue = node.getAttribute(attr);
            if (attrValue) {
                return attrValue;
            }
            node = node.parentElement;
    
    
        }
    
        return null;
    };
    
    
    window.myLib.closestItemByClass = function (item, className) {
        var node = item;
    
        while (node) {
            if (node.classList.contains(className)) {
                return node;
            }
            node = node.parentElement;
        }
    
        return null;
    };
    
    window.myLib.toggleScroll = function () {
        myLib.body.classList.toggle('no-scroll');
    };

})();

;(function () {

      
    
        if (window.matchMedia('(max-width: 992px)').matches) {
          return;
        }
      
        var headerPage = document.querySelector('.header');
      
        window.addEventListener('scroll', function() {
          if (window.pageYOffset > 0) {
            headerPage.classList.add('is-active');
          } else {
            headerPage.classList.remove('is-active');
          }
        });

})();
;(function () {

    
    
    var showPopup = function (target) {
        target.classList.add('is-active');
    };
    var closePopup = function (target) {
        target.classList.remove('is-active');
    };
    
    myLib.body.addEventListener('click', function (e) {
        var target = e.target;
        var popupClass = myLib.closestAttr(target, 'data-popup');
    
        if (popupClass === null) {
            return;
        }
    
        e.preventDefault();
        var popup = document.querySelector('.' + popupClass);
    
        if (popup) {
            showPopup(popup);
            myLib.toggleScroll();
        };
    
    
    });
    
    myLib.body.addEventListener('click', function (e) {
        var target = e.target;
    
        if (target.classList.contains('popup-close') ||
            target.classList.contains('popup__inner')) {
    
            var popup = myLib.closestItemByClass(target, 'popup');
            
            closePopup(popup);
            myLib.toggleScroll();
    
        }
    
    });
    
    myLib.body.addEventListener('keydown', function (e) {
        if (e.keyCode !== 27) {
            return;
        }
    
        var popup = document.querySelector('.popup.is-active');
    
        if (popup) {
            closePopup(popup);
            myLib.toggleScroll();
        }
    
    });

})();

;(function () {

    
    
    
    
    
    var scroll = function(target) {
        var targetTop = target.getBoundingClientRect().top;
        var scrollTop = window.pageXOffset;
        var targetOffsetTop = targetTop + scrollTop;
        var headerOffset = document.querySelector('.header').clientHeight;
    
        window.scrollTo(0, targetOffsetTop - headerOffset)
        
        
    }
    myLib.body.addEventListener('click', function(e) {
        var target = e.target;
        var scrollToItemClass = myLib.closestAttr(target, 'data-scroll-to');
        if (scrollToItemClass === null) {
            return;
        }
    
        e.preventDefault();
        var scrollToItem = document.querySelector('.' +  scrollToItemClass);
    
        if (scrollToItem) {
            scroll(scrollToItem);
        }
        
    
    
        
    });

})();

;(function () {

    
    
    var catalogSection = document.querySelector('.section-catalog');
    
    if (catalogSection === null) {
        return;
    }
    var removeChildren = function(item) {
        while (item.firstChild) {
            item.removeChild(item.firstChild);
        }
    };
    var updateChildren = function(item, children) {
        
        
        removeChildren(item);
        for (var i = 0; i < children.length; i += 1) {
            item.appendChild(children[i]);
        }
    };
    var catalog = catalogSection.querySelector('.section-catalog__item');
    var catalogNav = catalogSection.querySelector('.catalog__filter');
    var catalogItems = catalogSection.querySelectorAll('.catalog__item');
    
    catalogNav.addEventListener('click', function(e) {
        var target = e.target;
        var item = myLib.closestItemByClass(target, 'filter__btn');
        
    
        if (item === null || item.classList.contains('is-activ')) {
            return;
        }
        
        e.preventDefault();
        var filterValue = item.getAttribute('data-filter');
        var previousBtnActive = catalogNav.querySelector('.filter__btn.is-active');
    
        previousBtnActive.classList.remove('is-active');
        item.classList.add('is-active');
        
        if (filterValue ==='all') {
            updateChildren(catalog, catalogItems);
            return;
        }
        var filteredItems = [];
        for (var i = 0; i < catalogItems.length; i +=1) {
            var current = catalogItems[i];
            if (current.getAttribute('data-category') === filterValue) {
                filteredItems.push(current);
            }
        }
    
        updateChildren(catalog, filteredItems);
    });

})();

;(function () {

    var catalog = document.querySelector('.section-catalog__item');
    
    if (catalog === null) {
        return;
    }
    var updateProductPrice = function (product, price) {
        var productPrice = product.querySelector('.item__price');
        productPrice.textContent = price;
    };
    
    var changeProductSize = function (target) {
    
        var product = myLib.closestItemByClass(target, 'catalog__item');
        var previousBtnActive = product.querySelector('.size__btn.is-active');
        var newPrice = target.getAttribute('data-product-size-price')
    
        previousBtnActive.classList.remove('is-active');
        target.classList.add('is-active');
        updateProductPrice(product, newPrice);
    };
    
    var changeProductOrderInfo = function (target) {
        var product = myLib.closestItemByClass(target, 'catalog__item');
        var order = document.querySelector('.popup__order');
    
    
        var productTitle = product.querySelector('.item__title').textContent;
        var productSize = product.querySelector('.size__btn.is-active').textContent;
        var productPrice = product.querySelector('.item__price').textContent;
        var productImgSrc = product.querySelector('.item__img-src').getAttribute('src');
    
    
        order.querySelector('.order__info-title').setAttribute('value', productTitle);
        order.querySelector('.order__info-size').setAttribute('value', productSize);
        order.querySelector('.order__info-price').setAttribute('value', productPrice);
    
    
        order.querySelector('.order__product-title').textContent = productTitle;
        order.querySelector('.order__product-price').textContent = productPrice;
        order.querySelector('.order__info-title').textContent = productSize;
        order.querySelector('.order__img-src').setAttribute('src', productImgSrc);
    };
    catalog.addEventListener('click', function (e) {
        var target = e.target;
    
        if (target.classList.contains('size__btn')) {
    
            e.preventDefault();
            changeProductSize(target);
        }
    
        if (target.classList.contains('item__btn') && !target.classList.contains('is-active')) {
            e.preventDefault();
            changeProductOrderInfo(target);
        }
    });

})();

;
(function () {

    
    var sectionContacts = document.querySelector('.map');
    
      var ymapInit = function() {
        if (typeof ymaps === 'undefined') {
          return;
        }
      
        ymaps.ready(function () {
          var myMap = new ymaps.Map('ymap', {
                  center: [55.755241, 37.617779],
                  zoom: 16
              }, {
                  searchControlProvider: 'yandex#search'
              }),
      
              myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
                  balloonContent: 'г. Москва, Преображенская площадь, 8'
              }, {
                  iconLayout: 'default#image',
                  iconImageHref: 'assets/img/map/pizza.svg',
                  iconImageSize: [40, 63.2],
                  iconImageOffset: [-50, -38]
              });
      
          myMap.geoObjects.add(myPlacemark);
      
          myMap.behaviors.disable('scrollZoom');
        });
      };
    
      var ymapLoad = function() {
        var script = document.createElement('script');
        script.src = 'https://api-maps.yandex.ru/2.1/?lang=en_RU';
        myLib.body.appendChild(script);
        script.addEventListener('load', ymapInit);
      };
    
      var checkYmapInit = function() {
        var sectionContactsTop = sectionContacts.getBoundingClientRect().top;
        var scrollTop = window.pageYOffset;
        var sectionContactsOffsetTop = scrollTop + sectionContactsTop;
    
        if (scrollTop + window.innerHeight > sectionContactsOffsetTop) {
          ymapLoad();
          window.removeEventListener('scroll', checkYmapInit);
        }
      };
    
      window.addEventListener('scroll', checkYmapInit);
      checkYmapInit();

})();


;(function () {

    ;
    (function () {
        var forms = document.querySelectorAll('.form-send');
    
        if (forms.length === 0) {
            return;
        }
    
        var serialize = function (form) {
            var items = form.querySelectorAll('input, select, textarea');
            var str = '';
            for (var i = 0; i < items.length; i += 1) {
                var item = items[i];
                var name = item.name;
                var value = item.value;
                var separator = i === 0 ? '' : '&';
    
                if (value) {
                    str += separator + name + '=' + value;
                }
            }
            return str;
        };
    
        var formSend = function (form) {
            var data = serialize(form);
            var xhr = new XMLHttpRequest();
            var url = 'assets/mail/mail.php';
    
            xhr.open('POST', url);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    
            xhr.onload = function () {
                var activePopup = document.querySelector('.popup.is-active');
    
                if (activePopup) {
                    activePopup.classList.remove('is-active');
                } else {
                    myLib.toggleScroll();
                }
    
                if (xhr.response === 'success') {
                    document.querySelector('.popup__successfully').classList.add('is-active');
                } else {
                    document.querySelector('.popup__error').classList.add('is-active');
                }
    
                form.reset();
            };
    
            xhr.send(data);
        };
    
        for (var i = 0; i < forms.length; i += 1) {
            forms[i].addEventListener('submit', function (e) {
                e.preventDefault();
                var form = e.currentTarget;
                formSend(form);
            });
        }
    })();

})();