class SitesController < ApplicationController
  before_action :set_site, only: [:update, :destroy]

	def create
    debugger
    if Site.find_by_url(sites_params[:url])
      render json: 'site already saved' and return
    end

    site = Site.create(url: sites_params[:url], secret: false)
    size = set_user.sites.size
    set_user.sites << site
    render text: ( !!(set_user.sites.size == size + 1) ? "successful saved" : "unsuccessful saved" ) and return
	end

  def new
    debugger
    @site = Site.new
  end

  def show
    #show the site with all the tags attached
  end

	def index
    # debugger
    @unread_sites = Site.where(read_status: "unread").order(title: :asc).includes(:tags)
    @reading_sites = Site.where(read_status: "reading").order(title: :asc).includes(:tags)
    @readed_sites = Site.where(read_status: "readed").order(title: :asc).includes(:tags)
	end

  def update
    debugger
    site = Site.find_by_url(sites_params[:url])
    site.update(read_status: sites_params[:read_status])

    if site.read_status == sites_params[:read_status]
      render text: 'successful update'
    else
      render text: 'unsuccessful update'
    end
  end

	def destroy
    debugger
    respond_to do |format|
			format.js do

        site = Site.find_by_url(sites_params['url'])
        render text: 'url not in db' and return  if site.nil?

        if site.try(:destroy)
          render text: 'sucessful delete'
        else
          render text: 'unsucessful delete'
        end
      end

      format.html do
        site = Site.find_by_url(sites_params[:url]) || Site.find(sites_params[:id])
        site.destroy
        redirect_to :back and return
      end
		end
	end

	def has_url_saved
    site = Site.where(url: sites_params[:url]).try(:first) # get only the first occurance of this url

		if site.nil?
      render text: 'not_saved' and return
    else
      case site.read_status
        when 'unread' then render text: 'unread'  and return
        when 'read'   then render text: 'read'    and return
        else; render text: 'unknown', header: 501 and return
      end
    end
	end


  private
    def sites_params
      params.require(:sites).permit(:url, :title, :read_status)
    end

    def set_site
      debugger
      @user = Site.find(sites_params[:url])
    end
end
