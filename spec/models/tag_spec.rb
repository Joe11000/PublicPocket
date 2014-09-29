require 'rails_helper'

RSpec.describe Tag, :type => :model do
  describe "factory" do
    it "is valid", smoke: true do
      debugger
      expect(FactoryGirl.build_stubbed(:tag)).to be_valid
    end

# a = FactoryGirl.create(:site_with_one_tag)

  end
end
