class User < ActiveRecord::Base
  # validates_presence_of   :name, :password
  # validates_uniqueness_of :name, :password

  # has_many :sites, inverse_of: :user

  def valid_attribute?(attribute_name)
    self.valid?
    self.errors[attribute_name].blank?
  end
end
