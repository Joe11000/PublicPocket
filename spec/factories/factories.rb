
FactoryGirl.define do

  factory :user do
    sequence(:name) { |n| "guest_#{n}" }
    sequence(:password) { |n| "pwd_#{n}" }
  end

  factory :site do
    user # association :user, strategy: :build_stubbed
    url             "http://www.google.com"
    secret          false
    read_status     "unread"
    title           "The Googs"
    rating          8

    factory :site_with_one_tag, parent: :site do
      tags {[FactoryGirl.create(:tag)]}
    end
  end


  factory :site_tag do
    site
    tag
  end

  factory :tag do
    sequence(:name) { |n| "tag_#{n}" }
  end
end


###########################################################################
    # factory :site_with_tags, parent: :site do
    #   tags {[FactoryGirl.create(:tag)]}
    # end

    # OR

    # factory :site_with_one_tag, parent: :site do
    #   # tags { [FactoryGirl.create(:tag)] }

    #   ignore do
    #     tag { FactoryGirl.create(:tag) }
    #   end

    #   after(:create) do |site, evaluator|
    #     site.tags << evaluator.tag
    #   end
    # end
