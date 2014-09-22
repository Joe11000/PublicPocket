10.times do |i|
  u = User.create(name: "a#{i}", password: 1234)
  u.sites << (i.even? ? Site.create(title: "Da Bears", url: "http://www.chicagobears.com", secret: "false") : Site.create(url: "http://www.nfl.com", secret: "false"))

  u.sites.first.tags.create(name: "s#{i}")
end
