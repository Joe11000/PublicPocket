class Site < ActiveRecord::Base
	belongs_to :user, inverse_of: :sites
end
