class Site < ActiveRecord::Base
	belongs_to :user, inverse_of: :sites

  has_many :sites_tags
  has_many :tags, through: :sites_tags, dependent: :destroy

end
