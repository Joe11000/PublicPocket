class SitesController < ApplicationController
	def create
    if Site.find_by_url(params[:location])
      render json: 'site already saved' and return
    end

		debugger
    site = Site.create(url: params[:location], secret: false)
    size = User.first.sites.size
    User.first.sites << site
    render json: !!(User.first.sites.size == size + 1) and return
	end

	def index
		# debugger
    @sites = Site.all
	end

  def update
    debugger
    debugger

    site = Site.find_by_url(params[:location])
    site.update_attributes(status: select_value)
    render
  end

	def destroy
    respond_to do |format|
			format.js do
        site = Site.find_by_url(params[:location])

        render text: 'url not in db' and return  if site.nil?

        if site.try(:destroy)
          render text: 'deleted sucessfully' and return
        else
          debugger
          render text: 'unsucessful delete' and return
        end
      end

      format.html do
        site = Site.find_by_url(params[:location]) || Site.find(params[:id])
        debugger
        site.destroy
        redirect_to :back and return
      end
		end
	end

	def has_url_saved
		# debugger
    site = Site.where(url: params[:location]).try(:first) # get only the first occurance of this location

		if not site.nil?
			# debugger
      case site.status
        when 'unread' then render text: 'unread'  and return
        when 'read'   then render text: 'read'    and return
        else; render text: 'unknown', header: 501 and return
      end
    else
    	# debugger
      render text: 'not_saved' and return
    end
	end
end
