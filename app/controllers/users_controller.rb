class UsersController < ApplicationController
	def new
		response.headers['Access-Control-Allow-Origin'] = '*'
		render text: "It worked from #{params[:location]}" and return
	end
end
