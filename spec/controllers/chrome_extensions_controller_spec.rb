require 'rails_helper'

RSpec.describe ChromeExtensionsController, :type => :controller do
  describe "Chrome Extention" do

      before(:all) do
        2.times { |num| FactoryGirl.create(:site_with_one_tag, url: "http://random_thing_i_dont_care_about_at_the_moment" + num.to_s) }
      end

      after(:all) do
        Site.delete_all
        Tag.delete_all
      end

    context "Saved Web Page" do

      before(:all) do
        @existing_site =  FactoryGirl.create(:site_with_one_tag)
        @existing_tag = @existing_site.tags.first

      end

      after(:all) do
        @existing_site.destroy
        @existing_tag.destroy
      end

      before :each do
        @request.env['HTTP_ACCEPT'] = "text/javascript"
        get :get_saved_or_unsaved_page, url: @existing_site.url
      end

      it "has a 200 status code" do
        expect(@response).to have_http_status 200
      end

      it "gives view the correct variables" do
        #expect @site to be of correct type
        expect(@assigns["site"]).to be_an ActiveRecord::Relation

        # expect only one ActiveModel Site in @site variable
        expect(@assigns["site"].size).to eq 1

        # expect @site to have one ActiveRecord::Relation to ActiveModel Tag
        expect(@assigns["site"].first.tags.size).to eq 1

        # expect the
        expect(@assigns["site"].first.tags.first).to eq @existing_tag
      end
    end

    context "Unsaved Web Page", focus: true do

      before(:all) do
        @new_site =  FactoryGirl.build_stubbed(:site, url: "http://fdasipnfeawbofiabvnoweaevew4455%%%%.com")
      end

      before :each do
        @request.env['HTTP_ACCEPT'] = "text/javascript"
        get :get_saved_or_unsaved_page, url: @new_site.url
      end

      it "has a 200 status code" do
        expect(@response).to have_http_status 200
      end

      it "receives the correct variables" do
        expect(@assigns["site"].size).to eq 0
      end
    end
  end
end
