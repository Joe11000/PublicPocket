FactoryGirl.define do
  factory :site do
    # user # association :user, strategy: :build_stubbed
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
