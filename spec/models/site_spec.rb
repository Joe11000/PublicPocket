require 'rails_helper'

RSpec.describe Site, :type => :model do
  describe "factory" do
    it "is valid" do
      expect(FactoryGirl.create(:site)).to be_valid
    end
  end

  it { is_expected.to belong_to(:user).inverse_of(:sites)}
  it { is_expected.to have_many(:tags).through(:site_tags)}
  it { is_expected.to have_many(:site_tags)}

  # it { is_expected.to validate_acceptance_of(:read_status)}
  # it { is_expected.to validate_presence_of(:title).accept(%w[ unread reading readed ])}



  describe "instance" do
    subject { FactoryGirl.create(:site)}

  end

    # t.string   "url"
    # t.boolean  "secret",      default: false
    # t.string   "read_status", default: "unread"
    # t.integer  "user_id"
    # t.datetime "created_at"
    # t.datetime "updated_at"
    # t.string   "title"
    # t.integer  "rating"


end
