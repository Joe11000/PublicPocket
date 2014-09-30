class ChromeExtensionsController < ApplicationController

  # before_action :current_user, only: [:get_saved_or_unsaved_page]


  layout 'chrome_extension'

  def get_saved_or_unsaved_page
    respond_to do |format|
      format.js do
          debugger

        @site = Site.includes(:tags).where(sites: {url: params[:url]})

        if @site
          debugger
        end
          render :get_saved_or_unsaved_page
      end
    end
  end
end
