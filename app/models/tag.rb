class Tag < ActiveRecord::Base
  has_many :site_tags
  has_many :sites, through: :site_tags, dependent: :destroy

  def valid_attribute?(attribute_name)
    self.valid?
    self.errors[attribute_name].blank?
  end
end
