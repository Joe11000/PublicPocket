class Site < ActiveRecord::Base
	belongs_to :user, inverse_of: :sites
  has_many :site_tags

  has_many :tags, through: :site_tags, dependent: :destroy

  validate :title, presence: true


  validate :read_status, acceptance: { accept: %w[ unread reading readed ] }

  def valid_attribute?(attribute_name)
    self.valid?
    self.errors[attribute_name].blank?
  end

end
