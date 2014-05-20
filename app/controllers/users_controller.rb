class UsersController < ApplicationController
	def new
		render text: "It worked from #{params[:location]}" and return
	end
end
