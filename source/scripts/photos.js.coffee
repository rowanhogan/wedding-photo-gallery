
@photos = ->
  flickrApiBase = 'http://api.flickr.com/services/rest/'
  apiKey = 'b47d066411e56d0ca5b62ce20331f15b'
  photosetID = '72157640716177975'

  target = document.getElementById('gallery')
  window.spinner = new Spinner({
    lines: 9
    length: 14
    width: 5
    radius: 15
    corners: 1
    speed: 1
    trail: 60
    color: "#521600"
  }).spin(target)

  window.carousel = $('#carousel').swiper
    loop: true
    initialSlide: 0
    keyboardControl: true
    mousewheelControl: true
    mousewheelControlForceToAxis: true
    onSlideChangeEnd: ->
      $(".thumb").removeClass('active')
      $(".thumb[data-index=#{carousel.activeIndex}]").addClass('active')

  $.getJSON flickrApiBase + '?method=flickr.photosets.getPhotos&api_key=' + apiKey + '&photoset_id=' + photosetID + '&privacy_filter=5&format=json&jsoncallback=?', (data) ->
    $("#gallery, #carousel .swiper-wrapper").html('');

    $.each data.photoset.photo, (i, photo) ->
      imgUrl = 'http://farm' + photo.farm + '.static.flickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret
      photoData = {}
      photoData.thumb = imgUrl + '_z.jpg'
      photoData.large = imgUrl + '_b.jpg'
      photoData.href = "http://www.flickr.com/photos/" + data.photoset.owner + "/" + photo.id

      $("#gallery").append "<div class='thumb' data-index='#{i}' style='background-image: url(#{photoData.thumb});'><img src='about:blank'></div>"

      slide = carousel.createSlide "<div style='background-image: url(#{photoData.large});'></div>"
      slide.append()
$ ->
  FastClick.attach(document.body);
  photos()

  $(window).load ->
    spinner.stop()
    console?.log 'All images loaded.'

firstClick = true

$(document).on 'click', '.thumb', (e) ->
  $this = $(this)
  index = parseInt($this.data('index'))

  $('.carousel-container').show()

  if firstClick
    carousel.reInit()
    firstClick = false

  $(".thumb", "#gallery").removeClass('active')
  $this.addClass('active')

  carousel.swipeTo(index, 0)


$(document).on 'click', '.toggle-carousel', (e) ->
  $('.carousel-container').toggle()

$(document).on 'keyup', (e) ->
  if e.keyCode is 27
    $('.carousel-container').toggle()


$(document).on 'click', '#prev-slide', (e) ->
  carousel.swipePrev()

$(document).on 'click', '#next-slide', (e) ->
  carousel.swipeNext()

