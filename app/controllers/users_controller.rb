class UsersController < ApplicationController
	def new
		response.headers['Access-Control-Allow-Origin'] = '*'
		response.headers['X-Frame_Options'] = ""
		render text: "It worked from #{params[:location]}" and return
	end
end


# var xhr = new XMLHttpRequest();
# xhr.open("get", "http://pure-ravine-3133.herokuapp.com/users/new", true);
# xhr.setRequestHeader('Access-Control-Allow-Origin','*')
# xhr.onload = function(info){console.log(info)}
# xhr.send({'location': "http://www.video.nhl.com"})