class SitesController < ApplicationController
	def create

    if Site.find_by_url(params[:location])
      render json: 'site already saved' and return
    end

    site = Site.create(url: params[:location], secret: false)
    size = User.first.sites.size
    User.first.sites << site
    render text: ( !!(User.first.sites.size == size + 1) ? "successful saved" : "unsuccessful saved" ) and return
	end

	def index
    @sites = Site.all
	end

  def update
    site = Site.find_by_url(params[:location])
    site.update_attributes(status: params[:select_value])


    if site.status == params[:select_value]
      render text: 'successful update'
    else
      render text: 'unsuccessful update'
    end
  end

	def destroy
    # render( text: 'sucessful delete', header: 200)

    respond_to do |format|
			format.js do

        site = Site.find_by_url(params['location'])
        render text: 'url not in db' and return  if site.nil?

        if site.try(:destroy)
          debugger
          render text: 'sucessful delete'
        else
          debugger
          render text: 'unsucessful delete'
        end
      end

      format.html do
        site = Site.find_by_url(params[:location]) || Site.find(params[:id])
        site.destroy
        redirect_to :back and return
      end
		end
	end

	def has_url_saved
    site = Site.where(url: params[:location]).try(:first) # get only the first occurance of this location

		if site.nil?
      render text: 'not_saved' and return
    else
      case site.status
        when 'unread' then render text: 'unread'  and return
        when 'read'   then render text: 'read'    and return
        else; render text: 'unknown', header: 501 and return
      end
    end
	end
end
