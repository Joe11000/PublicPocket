# require 'rails_helper'

# RSpec.describe User, :type => :model do
#   describe "factory" do
#     it "user is valid" do
#       expect(FactoryGirl.create(:user)).to be_valid
#     end

#     it { is_expected.to have_many(:sites).inverse_of(:user)}

#     context "#valid_attribute" do

#       it "returns true if valid" do
#         user = FactoryGirl.build(:user)
#         attrs = FactoryGirl.attributes_for(:user).keys

#         attrs.each do |attribute|
#           expect(user.valid_attribute?(attribute)).to eq true
#         end
#       end

#       it "returns true if invalid" do
#         user = FactoryGirl.build(:user, name: nil, password: nil)
#         attrs = FactoryGirl.attributes_for(:user).keys

#         attrs.each do |attribute|
#           expect(user.valid_attribute?(attribute)).to eq false
#         end
#       end
#     end
#   end
# end
