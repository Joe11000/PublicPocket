class ChromeExtensionsController < ApplicationController

  # layout 'chrome_extension'

  def get_saved_or_unsaved_page
    respond_to do |format|
      format.js do
        # debugger

        @location = params[:location]

        @site = Site.includes(:tags).where(sites: {url: params[:url]})

        render :get_saved_or_unsaved_page, layout: "layouts/chrome_extension"
      end

      format.html do
        debugger

        @location = params[:location]

        @site = Site.includes(:tags).where(sites: {url: params[:url]})

        render :get_saved_or_unsaved_page, layout: "layouts/chrome_extension"
      end
    end
  end
end
