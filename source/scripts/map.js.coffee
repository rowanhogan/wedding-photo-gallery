L.TileLayer.Common = L.TileLayer.extend
  initialize: (options) ->
    L.TileLayer::initialize.call this, @url, options

L.TileLayer.MapBox = L.TileLayer.Common.extend(url: "http://{s}.tiles.mapbox.com/v3/{user}.{map}/{z}/{x}/{y}.png")


@initMap = ->
  window.map = L.map('map')
  window.tileLayer = new L.TileLayer.MapBox({user: 'rowanhogan', map: 'map-an41br4y'})
  # tileLayer = new L.TileLayer.Stamen({style: 'toner-background'})
  tileLayer.addTo(map)

  icon = L.divIcon({className: 'location'})

  $.getJSON "points.json", (data) ->
    points = data.points
    window.layer = L.featureGroup()

    $.each points, (i, point) ->
      marker = L.marker [point.coordinates[1], point.coordinates[0]], icon: icon
      marker.addTo layer
      marker.bindPopup("<div class='background' style='url(#{point.data.image})''><h1>#{point.data.title}</h1></div>")

    layer.addTo(map)
    map.fitBounds layer.getBounds()

$ ->
  # initMap()
