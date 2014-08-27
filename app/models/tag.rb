class Tag < ActiveRecord::Base
  has_many :site_tags
  has_many :sites, through: :site_tags, dependent: :destroy
end
