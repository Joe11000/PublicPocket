class SiteTag < ActiveRecord::Base
  belongs_to :site
  belongs_to :tag
end
