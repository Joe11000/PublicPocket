require 'rails_helper'

RSpec.describe ChromeExtensionsController, :type => :controller do
  describe "Chrome Extention" do

    context "Saved Web Page" do

      before(:all) do
        @site =  FactoryGirl.create(:site_with_one_tag)
        @tag = @site.tags.first
      end



      # let(:site) { FactoryGirl.create(:site) }

      it "has a 200 status code" do
        debugger
        @request.env['HTTP_ACCEPT'] = "text/javascript"
        debugger

        get :get_saved_or_unsaved_page, url: @site.url
        debugger

        expect(response).to eq 200
      end

      it "renders saved partial "

      it "uses chrome extensions layout"

      # expect(response).to eq 200


      it "receives the correct variables"

      it "renders the SAVED page when Site DOES exists"
    end

    context "Unsaved Web Page" do

      it "has a 200 status code"

      it "uses chrome extensions layout"

      it "renders saved partial "


      it "receives the correct variables"


      it "renders the UNSAVED page when Site DOESN'T exists"
    end
  end
end
