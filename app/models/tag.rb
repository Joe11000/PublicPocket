class Tag < ActiveRecord::Base
  has_many :sites_tags
  has_many :sites, through: :sites_tags, dependent: :destroy
end
