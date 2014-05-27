10.times do |i|
  u = User.create(name: "a#{i}", password: 1234)
  u.sites << (i % 2 == 0 ? Site.create(url: "http://www.chicagobears.com", secret: "false") : Site.create(url: "http://www.nfl.com", , secret: "false"))
end