10.times do |i|
  u = User.create(name: "a#{i}", password: 1234)

  if i.even? do
    u.sites << Site.create(title: "Da Bears", url: "http://www.chicagobears.com", secret: "false")
  else
    Site.create(url: "http://www.nfl.com", secret: "false"))
  end

  10.times { |loop_num| u.sites.first.tags.create(name: "s#{i}#{loop_num}") }
end
