class TagsController < ApplicationController
  def add
    site = Site.where(url: params[:url]).first

    site_has_tag = site.tags.where(name: params[:tag]).size != 0
    tag_exists = Tag.where(name: params[:tag]).size != 0

    if(site_has_tag == false)
      if(tag_exists == false) # Tag Does Not Exist Yet
        site.tags.create(name: params[:tag])

      else # tag exists, but isn't associated with site
        site.tags << Tag.find_by(name: params[:tag])
      end
    end

    render json: ""
  end

  def remove
    site = Site.where(url: params[:url]).first

    if(site)
      site.tags.where(name: params[:tag]).destroy_all # removes SiteTag association
    end
    render json: ""
  end
end
