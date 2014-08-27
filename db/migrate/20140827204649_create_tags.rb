class CreateTags < ActiveRecord::Migration
  def change
    create_table :tags do |t|
      t.belongs_to :user_tag
      t.timestamps
    end
  end
end
