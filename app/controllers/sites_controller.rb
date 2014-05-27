class SitesController < ApplicationController
	def create
		debugger
    s = Site.create(params[:location])
    User.first.sites << s
	end

	def index
    @sites = Site.all
	end

	def destroy
		# debugger
    Site.find(params[:id]).destroy
    redirect_to :back and return #, status: 303 and return
	end

	# def show

	# end

	def has_url
		debugger
    render json: !!Site.find_by_url(params[:location]) and return
	end
end
