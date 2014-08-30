class TagsController < ApplicationController
  def add
    # debugger
    # debugger
    site = Site.where(url: params[:location]).first

    site_has_tag = site.tags.where(name: params[:tag]).size != 0
    tag_exists = Tag.where(name: params[:tag]).size != 0

    if(site_has_tag == false)
      if(tag_exists == false) # Tag Does Not Exist Yet
        # debugger
        site.tags.create(name: params[:tag])
        # debugger

      else # tag exists, but isn't associated with site
        # debugger
        site.tags << Tag.find_by(name: params[:tag])
        # debugger
      end
    end

    render json: ""
  end

  def remove
    # debugger
    site = Site.where(url: params[:location]).first

    if(site)
      site.tags.where(name: params[:tag]).destroy_all # removes SiteTag association
    end
    # debugger
    # debugger
    render json: ""
  end
end
