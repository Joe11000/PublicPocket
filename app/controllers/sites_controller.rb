class SitesController < ApplicationController
	def create
		debugger
    s = Site.create(url: params[:location], secret: false)
    size = User.first.sites.size
    User.first.sites << s
    render json: !!(User.first.sites.size == size + 1) and return
	end

	def index
		# debugger
    @sites = Site.all
	end

	def destroy
		debugger
    s = Site.find(params[:location]).destroy
    render json: s.destroyed? and return # redirect_to :back and return #, status: 303 and return
	end

	# def show

	# end

	def has_url_saved
		# debugger
    render json: !!Site.find_by_url(params[:location]) and return
	end
end
