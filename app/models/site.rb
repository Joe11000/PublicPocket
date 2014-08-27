class Site < ActiveRecord::Base
	belongs_to :user, inverse_of: :sites

  has_many :site_tags
  has_many :tags, through: :site_tags, dependent: :destroy
end
