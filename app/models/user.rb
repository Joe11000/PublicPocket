class User < ActiveRecord::Base
  validates_presence_of   :name, :password
  # validates_uniqueness_of :name, :password

  has_many :sites, inverse_of: :user
end
