(function() {
  L.TileLayer.Common = L.TileLayer.extend({
    initialize: function(options) {
      return L.TileLayer.prototype.initialize.call(this, this.url, options);
    }
  });

  L.TileLayer.MapBox = L.TileLayer.Common.extend({
    url: "http://{s}.tiles.mapbox.com/v3/{user}.{map}/{z}/{x}/{y}.png"
  });

  this.initMap = function() {
    var icon;
    window.map = L.map('map');
    window.tileLayer = new L.TileLayer.MapBox({
      user: 'rowanhogan',
      map: 'map-an41br4y'
    });
    tileLayer.addTo(map);
    icon = L.divIcon({
      className: 'location'
    });
    return $.getJSON("points.json", function(data) {
      var points;
      points = data.points;
      window.layer = L.featureGroup();
      $.each(points, function(i, point) {
        var marker;
        marker = L.marker([point.coordinates[1], point.coordinates[0]], {
          icon: icon
        });
        marker.addTo(layer);
        return marker.bindPopup("<div class='background' style='url(" + point.data.image + ")''><h1>" + point.data.title + "</h1></div>");
      });
      layer.addTo(map);
      return map.fitBounds(layer.getBounds());
    });
  };

  $(function() {});

}).call(this);

(function() {
  var firstClick;

  this.photos = function() {
    var apiKey, flickrApiBase, photosetID, target;
    flickrApiBase = 'http://api.flickr.com/services/rest/';
    apiKey = 'b47d066411e56d0ca5b62ce20331f15b';
    photosetID = '72157640706108265';
    target = document.getElementById('gallery');
    window.spinner = new Spinner({
      width: 6
    }).spin(target);
    window.carousel = $('#carousel').swiper({
      loop: true,
      initialSlide: 0,
      keyboardControl: true,
      mousewheelControl: true,
      mousewheelControlForceToAxis: true,
      onSlideChangeEnd: function() {
        $(".thumb").removeClass('active');
        return $(".thumb[data-index=" + carousel.activeIndex + "]").addClass('active');
      }
    });
    return $.getJSON(flickrApiBase + '?method=flickr.photosets.getPhotos&api_key=' + apiKey + '&photoset_id=' + photosetID + '&privacy_filter=5&format=json&jsoncallback=?', function(data) {
      $("#gallery, #carousel .swiper-wrapper").html('');
      return $.each(data.photoset.photo, function(i, photo) {
        var imgUrl, photoData, slide;
        imgUrl = 'http://farm' + photo.farm + '.static.flickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret;
        photoData = {};
        photoData.thumb = imgUrl + '_z.jpg';
        photoData.large = imgUrl + '_b.jpg';
        photoData.href = "http://www.flickr.com/photos/" + data.photoset.owner + "/" + photo.id;
        $("#gallery").append("<div class='thumb' data-index='" + i + "' style='background-image: url(" + photoData.thumb + ");'><img src='about:blank'></div>");
        slide = carousel.createSlide("<div style='background-image: url(" + photoData.large + ");'></div>");
        return slide.append();
      });
    });
  };

  $(function() {
    FastClick.attach(document.body);
    photos();
    return $(window).load(function() {
      spinner.stop();
      return typeof console !== "undefined" && console !== null ? console.log('images loaded') : void 0;
    });
  });

  firstClick = true;

  $(document).on('click', '.thumb', function(e) {
    var $this, index;
    $this = $(this);
    index = parseInt($this.data('index'));
    $('.carousel-container').show();
    if (firstClick) {
      carousel.reInit();
      firstClick = false;
    }
    $(".thumb", "#gallery").removeClass('active');
    $this.addClass('active');
    return carousel.swipeTo(index, 0);
  });

  $(document).on('click', '.toggle-carousel', function(e) {
    return $('.carousel-container').toggle();
  });

  $(document).on('keyup', function(e) {
    if (e.keyCode === 27) {
      return $('.carousel-container').toggle();
    }
  });

  $(document).on('click', '#prev-slide', function(e) {
    return carousel.swipePrev();
  });

  $(document).on('click', '#next-slide', function(e) {
    return carousel.swipeNext();
  });

}).call(this);
